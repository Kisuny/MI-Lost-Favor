let MI_REPLACEABLE = global.MI_REPLACEABLE

ServerEvents.tags('block', event => {

    for (let replaceable of Object.keys(MI_REPLACEABLE)) {
        event.add('milf:replaceable', replaceable)
    }
})

NetworkEvents.dataReceived('milf_mi_replacer_replace', (event) => {

    let data = event.data

    // console.log(data);

    let blockPosTag = data.getList("blocksToUpgradePositions", $Tag.TAG_INT_ARRAY)
    let upgradeToId = data.getString("upgradeToId")
    let posArray = []

    blockPosTag.forEach(tag => {
        let tempCompound = new $CompoundTag()
        tempCompound.putIntArray("pos", tag)
        $NbtUtils.readBlockPos(tempCompound, "pos").ifPresent(pos => posArray.push(pos))

    })
    let tempCompound = new $CompoundTag()
    tempCompound.putIntArray("pos", data.get("targetBlockPos"))
    let targetPos = null
    $NbtUtils.readBlockPos(tempCompound, "pos").ifPresent(pos => targetPos = pos)

    let newBlock = $BuiltInRegistries.BLOCK.get(upgradeToId).defaultBlockState()


    posArray.sort((pos1, pos2) => pos1.distSqr(targetPos) - pos2.distSqr(targetPos))

    posArray.forEach((blockPos, index) => {
        event.server.scheduleInTicks(index, callback => {
            event.level.setBlockAndUpdate(blockPos, newBlock)
            particleFrame(PARTICLES.dispersed, blockPos, { x: 1, y: 1, z: 1 }, event)
            let pitch = Math.min(0.7 + index * 0.02, 1.5)
            milfPlaySound(event, "immersive_machinery:hatch_open", { pos: blockPos, pitch: pitch, volume: 0.75 })
        })
        
    })
    

})

function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min
}
