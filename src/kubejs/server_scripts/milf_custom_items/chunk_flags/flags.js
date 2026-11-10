const CHUNK_FLAG = "milf:chunk_flag"

let flagClaimInProgress = false

function flagClaim(player, dimension, chunkPos) {
    flagClaimInProgress = true
    $FTBChunksAPI.claimAsPlayer(player, dimension, chunkPos, false)
    flagClaimInProgress = false
}

function flagUnclaim(chunk, player) {
    flagClaimInProgress = true
    chunk.unclaim(player.createCommandSourceStack(), true)
    flagClaimInProgress = false
}

const blockManualClaim = event => {
    if (flagClaimInProgress) return
    event.setCustomResult("milf.flags.use_flag")
    event.cancel()
}

FTBChunksEvents.before("claim", blockManualClaim)
FTBChunksEvents.before("unclaim", blockManualClaim)

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
        flagClaim(event.player, event.level.dimension, blockChunkPos)
        let color = chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.coloredName.getStyle().getColor().getArgb()

        sendImmersiveMessage(Text.translatable("milf.flags.claimed"), event.getPlayer(), Object.assign({}, DEFAULT_FLAG_NOTIFICATION_STYLE, {background:{borderTopColor:color}}) , event.server)
        
    } else if (event.block.getProperties().enabled == "true"){
        if (chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos))){
            if (chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.getRankForPlayer(event.player.uuid).isAllyOrBetter()) {
                flagUnclaim(chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)), event.player)
                event.block.set(event.block.id, Object.assign({}, event.block.getProperties(), {enabled:false}))
                sendImmersiveMessage(Text.translatable("milf.flags.unclaimed"), event.getPlayer(), DEFAULT_FLAG_NOTIFICATION_STYLE, event.server)
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

    flagClaim(event.player, event.level.dimension, blockChunkPos)
    let flagLevel = event.level
    let flagPos = event.block.pos
    event.server.scheduleInTicks(1, _ => {
        let placedBlock = flagLevel.getBlock(flagPos)
        if (placedBlock.id == CHUNK_FLAG) placedBlock.set(CHUNK_FLAG, Object.assign({}, placedBlock.getProperties(), {enabled:true}))
    })
    let color = chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.coloredName.getStyle().getColor().getArgb()
    //console.log(chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.coloredName.getStyle().getColor().getIntValue())
    sendImmersiveMessage(Text.translatable("milf.flags.claimed"), event.getPlayer(), Object.assign({}, DEFAULT_FLAG_NOTIFICATION_STYLE, {background:{borderTopColor:color}}) , event.server)    
})

BlockEvents.broken(CHUNK_FLAG, event =>{
    const chunkManager = $FTBChunksAPI.getManager()
    event.block.set(event.block.id, Object.assign({}, event.block.getProperties(), {enabled:false}))
    if (chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos))){
        if (chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.getRankForPlayer(event.player.uuid).isAllyOrBetter()) {
            flagUnclaim(chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)), event.player)
            sendImmersiveMessage(Text.translatable("milf.flags.unclaimed"), event.getPlayer(), DEFAULT_FLAG_NOTIFICATION_STYLE, event.server)
        }
    }     
    
})

function gradientToMutableComponent(component, from, to){
    return Component.ofString(`<grad from=${from} to=${to} hue uni>`).append(component).append(Text.ofString(`</grad>`))
}
