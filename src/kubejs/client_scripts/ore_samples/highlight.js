ClientEvents.highlight(event => {
    if (!event.client.hitResult) return
    if (event.client.hitResult.type != $HitResult$Type.BLOCK) return
    let levelBlock = Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos)
    let block = levelBlock.blockState.block
    if (!block.hasTag("milf:ore_samples")) return

    let sampleId = block.getId()

    let sampleEntry = global.oresWithSamples.find(object => `milf:${object.itemName}_ore_sample`  == sampleId)

    if (sampleEntry){
        event.addTargetBlock(sampleEntry.color)
    }
})