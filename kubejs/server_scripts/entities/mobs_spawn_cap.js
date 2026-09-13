
NativeEvents.onEvent($FinalizeSpawnEvent, event => {
    let level = event.getLevel()
    if (level.isClientSide()) return
        
    if (!event.getEntity().ambientCreature) return

    let chunkPos = new $ChunkPos(event.getEntity().getBlock().pos)

    let aabb = AABB.of(
        chunkPos.getMinBlockX(), level.getMinBuildHeight(), chunkPos.getMinBlockZ(),
        chunkPos.getMaxBlockX(), level.getMaxBuildHeight(), chunkPos.getMaxBlockZ()
    )

    let ambientEntitiesInChunk = level["getEntities(net.minecraft.world.entity.Entity,net.minecraft.world.phys.AABB,java.util.function.Predicate)"](
        null, 
        aabb, 
        entity => entity.ambientCreature
    ).size()

    if (ambientEntitiesInChunk > 4){
        event.setSpawnCancelled(true)
        event.setCanceled(true)
    }
    
})