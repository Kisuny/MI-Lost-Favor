BlockEvents.rightClicked("immersiveengineering:sample_drill", event => {
    if (event.getHand() == "OFF_HAND") return
    let {player, level, block} = event
    if (player.getMainHandItem().id != "immersiveengineering:high_power_biodiesel_bucket") return
    if (level.getBlock(block.pos.below() ).id != "minecraft:bedrock") return
    let blockEntity = level.getBlockEntity(block.pos) 
    if (blockEntity.isRunning){
        event.player.tell("what")

        let ores = getAllOreIdsInRadius(level, player, 16)

        console.log(ores)

        
    }
    
})

function getAllOreIdsInRadius(level, player, radius) {
    let worldTargets = $WorldTargets.get(level)
    let playerPos = player.blockPosition()
    let foundOreIds = new $HashSet()

    const DEPOSIT_TO_ORE = (() => {
        let map = new $HashMap()
        for (let oreId in ORE_ID_TO_DEPOSIT_NAMES) {
            for (let depositName of ORE_ID_TO_DEPOSIT_NAMES[oreId]) {
                map.put(depositName, oreId)
            }
        }
        return map
    })()

    let radiusSq = radius * radius

    worldTargets.generated()
        .entrySet()
        .stream()
        .forEach(entry => {
            let pos = entry.getKey()
            let target = entry.getValue()

            let dx = pos.getX() - playerPos.getX()
            let dz = pos.getZ() - playerPos.getZ()
            let distanceSq = (dx * dx) + (dz * dz)


            if (distanceSq <= radiusSq) {
                let oreId = DEPOSIT_TO_ORE.get(target.name)
                if (oreId) {
                    foundOreIds.add(oreId)
                }
            }
        })

    return foundOreIds
}

