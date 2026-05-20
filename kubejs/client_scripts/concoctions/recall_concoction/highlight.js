ClientEvents.highlight(event =>{
    if (!event.client.hitResult) return
    if (event.client.hitResult.type != $HitResult$Type.BLOCK) return
    let levelBlock = Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos)
    let block = levelBlock.blockState.block
    if (event.player.mainHandItem.isEmpty() || event.player.mainHandItem.id != "milf:recall_concoction") return
    if (!block.hasTag("milf:recall_concoction_block")) return


    let color = 0xc6b2db
    event.addTargetBlock(color)
})