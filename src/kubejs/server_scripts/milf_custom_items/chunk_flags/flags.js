const CHUNK_FLAG = "milf:chunk_flag"

const flagState = global.chunkFlags
flagState.claimInProgress = false

function flagClaim(player, dimension, chunkPos) {
    flagState.claimInProgress = true
    $FTBChunksAPI.claimAsPlayer(player, dimension, chunkPos, false)
    flagState.claimInProgress = false
}

function flagUnclaim(chunk, player) {
    flagState.claimInProgress = true
    chunk.unclaim(player.createCommandSourceStack(), true)
    flagState.claimInProgress = false
}

flagState.blockManualClaim = () => {
    if (flagState.claimInProgress) return $CompoundEventResult.pass()
    return $CompoundEventResult.interruptFalse($ClaimResult.customProblem("milf.flags.use_flag"))
}

function registerClaimListener() {
    const listener = new $ClaimedChunkEventBefore({
        before: (source, chunk) => flagState.blockManualClaim()
    })
    $ClaimedChunkEvent.BEFORE_CLAIM.register(listener)
    $ClaimedChunkEvent.BEFORE_UNCLAIM.register(listener)
    flagState.listenerRegistered = true
}

if (!flagState.listenerRegistered) registerClaimListener()

BlockEvents.rightClicked(CHUNK_FLAG, event =>{
    if(event.getHand()=="OFF_HAND") {
        event.cancel()
        return
    }
    const chunkManager = $FTBChunksAPI.getManager()
    if (event.player.getMainHandItem().id == CHUNK_FLAG && chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos))){
        sendImmersiveMessage(Text.translatable("milf.flags.occupied").append(Component.of(chunkManager.getChunk($ChunkDimPos(event.level, event.block.pos)).teamData.team.getName())), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        let playerInventory = event.player.inventoryMenu
        event.server.scheduleInTicks(1, _ =>  playerInventory.broadcastFullState())
        event.cancel()
        return
    }
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
        return
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
