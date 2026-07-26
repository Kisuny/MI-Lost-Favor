let $ChunkPos = Java.loadClass("net.minecraft.world.level.ChunkPos")
const CHUNK_FLAG = "milf:chunk_flag"

BlockEvents.rightClicked(CHUNK_FLAG, event =>{
    if(event.getHand()=="OFF_HAND") event.cancel()
    const chunkManager = $FTBChunksAPI.getManager()
    if (event.player.getMainHandItem().id == CHUNK_FLAG && chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos))){
        sendImmersiveMessage(Text.translatable("milf.flags.occupied").append(Component.of(chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.getName())), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        let playerInventory = event.player.inventoryMenu
        event.server.scheduleInTicks(1, _ =>  playerInventory.broadcastFullState())
        event.cancel()
        
    }  
    const currentChunk = chunkManager.getChunk($ChunkDimPos(event.player))
    const blockChunkPos = new $ChunkPos(event.block.getPos())
    if(event.block.getProperties().enabled == "false"){
        event.block.set(event.block.id, Object.assign({}, event.block.getProperties(), {enabled:true}))
        //chunkManager.getChunk($ChunkDimPos(event.player)).teamData.claim(event.player, $ChunkDimPos(event.player), true)
        $FTBChunksAPI.claimAsPlayer(event.player, event.level.dimension, blockChunkPos, false);
        let color = chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.coloredName.getStyle().getColor().getArgb()

        sendImmersiveMessage(Text.translatable("milf.flags.claimed"), event.getPlayer(), Object.assign({}, DEFAULT_CHUNK_CLAIM_NOTIFICATION_STYLE, {background:{borderTopColor:color}}) , event.server)
        
    } else if (event.block.getProperties().enabled == "true"){
        if (chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos))){
            if (chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.getRankForPlayer(event.player.uuid).isAllyOrBetter()) {
                chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).unclaim(event.player.createCommandSourceStack(), true)
                event.block.set(event.block.id, Object.assign({}, event.block.getProperties(), {enabled:false}))
                sendImmersiveMessage(Text.translatable("milf.flags.unclaimed"), event.getPlayer(), DEFAULT_CHUNK_CLAIM_NOTIFICATION_STYLE, event.server)
            }
        }
    }
})

BlockEvents.placed(CHUNK_FLAG, event =>{
    const chunkManager = $FTBChunksAPI.getManager()
    const blockChunkPos = new $ChunkPos(event.block.getPos())

    if (chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos))){
        sendImmersiveMessage(Text.translatable("milf.flags.occupied").append(Component.of(chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.getName())), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        let playerInventory = event.player.inventoryMenu
        event.server.scheduleInTicks(1, _ =>  playerInventory.broadcastFullState())
        event.cancel()
        
    }   

    $FTBChunksAPI.claimAsPlayer(event.player, event.level.dimension, blockChunkPos, false);
    let color = chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.coloredName.getStyle().getColor().getArgb()
    //console.log(chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.coloredName.getStyle().getColor().getIntValue())
    sendImmersiveMessage(Text.translatable("milf.flags.claimed"), event.getPlayer(), Object.assign({}, DEFAULT_CHUNK_CLAIM_NOTIFICATION_STYLE, {background:{borderTopColor:color}}) , event.server)    
})

BlockEvents.broken(CHUNK_FLAG, event =>{
    const chunkManager = $FTBChunksAPI.getManager()
    event.block.set(event.block.id, Object.assign({}, event.block.getProperties(), {enabled:false}))
    if (chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos))){
        if (chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.getRankForPlayer(event.player.uuid).isAllyOrBetter()) {
            chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).unclaim(event.player.createCommandSourceStack(), true)
            sendImmersiveMessage(Text.translatable("milf.flags.unclaimed"), event.getPlayer(), DEFAULT_CHUNK_CLAIM_NOTIFICATION_STYLE, event.server)
        }
    }     
    
})

function gradientToMutableComponent(component, from, to){
    return Component.ofString(`<grad from=${from} to=${to} hue uni>`).append(component).append(Text.ofString(`</grad>`))
}
