ClientEvents.highlight(event =>{
    if (event.player.mainHandItem.id != "modern_industrialization:steel_rod") return
    if (event.client.hitResult.type != $HitResult$Type.BLOCK) return
    if (Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos).blockState.block.getId() != "immersiveengineering:concrete") return
    
    event.addTargetBlock(0xc6b2db)
})