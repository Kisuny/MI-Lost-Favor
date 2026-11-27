const CHUNK_FLAG = "milf:chunk_flag"
const FLAG_BLOCKED_HINT_COOLDOWN = 20

let flagClaimInProgress = false
let flagBlockedHintTicks = {}

function flagApply(player, level, blockPos, action, team) {
    let chunks = new $ArrayList()
    chunks.add(new $ChunkPos(blockPos))
    flagClaimInProgress = true
    let outcome = $EmbersServerClaims.apply(player, level, chunks, action, team)
    flagClaimInProgress = false
    if (outcome.ok() > 0) return null
    let failures = outcome.failures()
    if (failures.isEmpty()) return Text.translatable("milf.flags.use_flag")
    return failures.keySet().iterator().next().message()
}

function flagClaim(player, level, blockPos) {
    return flagApply(player, level, blockPos, $EmbersClaimAction.CLAIM, $EmbersServerTeams.teamOf(player))
}

function flagUnclaim(player, level, blockPos, claim) {
    return flagApply(player, level, blockPos, $EmbersClaimAction.UNCLAIM, getClaimTeam(player.server, claim))
}

function flagClaimedStyle(server, claim) {
    let color = 0xFF000000 | getClaimTeamColor(server, claim)
    return Object.assign({}, DEFAULT_FLAG_NOTIFICATION_STYLE, {background:{borderTopColor:color}})
}

function flagRefuse(event, message) {
    sendImmersiveMessage(message, event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
    let playerInventory = event.player.inventoryMenu
    event.server.scheduleInTicks(1, _ => playerInventory.broadcastFullState())
    event.cancel()
}

EmbersClaimsEvents.claim(event => {
    if (flagClaimInProgress) return
    if (event.action != "claim" && event.action != "unclaim") return
    let player = event.player
    if (player) {
        let uuid = String(player.uuid)
        let last = flagBlockedHintTicks[uuid]
        if (last == null || player.tickCount - last > FLAG_BLOCKED_HINT_COOLDOWN || player.tickCount < last) {
            flagBlockedHintTicks[uuid] = player.tickCount
            sendImmersiveMessage(Text.translatable("milf.flags.use_flag"), player, DEFAULT_WARN_NOTIFICATION_STYLE, player.server)
        }
    }
    event.cancel()
})

BlockEvents.rightClicked(CHUNK_FLAG, event => {
    if (event.getHand() == "OFF_HAND") {
        event.cancel()
        return
    }
    let player = event.player
    let pos = event.block.pos
    let claim = getClaimAt(event.level, pos)

    if (player.getMainHandItem().id == CHUNK_FLAG && claim) {
        flagRefuse(event, Text.translatable("milf.flags.occupied").append(Component.of(getClaimTeamName(event.server, claim))))
        return
    }

    if (event.block.getProperties().enabled == "false") {
        let error = flagClaim(player, event.level, pos)
        if (error) {
            sendImmersiveMessage(error, player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
            return
        }
        event.block.set(event.block.id, Object.assign({}, event.block.getProperties(), {enabled:true}))
        sendImmersiveMessage(Text.translatable("milf.flags.claimed"), player, flagClaimedStyle(event.server, getClaimAt(event.level, pos)), event.server)
    } else if (event.block.getProperties().enabled == "true") {
        if (!claim || !isOwnClaim(player, claim)) return
        let error = flagUnclaim(player, event.level, pos, claim)
        if (error) {
            sendImmersiveMessage(error, player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
            return
        }
        event.block.set(event.block.id, Object.assign({}, event.block.getProperties(), {enabled:false}))
        sendImmersiveMessage(Text.translatable("milf.flags.unclaimed"), player, DEFAULT_FLAG_NOTIFICATION_STYLE, event.server)
    }
})

BlockEvents.placed(CHUNK_FLAG, event => {
    let player = event.player
    let pos = event.block.pos
    let claim = getClaimAt(event.level, pos)

    if (claim) {
        flagRefuse(event, Text.translatable("milf.flags.occupied").append(Component.of(getClaimTeamName(event.server, claim))))
        return
    }

    let error = flagClaim(player, event.level, pos)
    if (error) {
        flagRefuse(event, error)
        return
    }

    let flagLevel = event.level
    event.server.scheduleInTicks(1, _ => {
        let placedBlock = flagLevel.getBlock(pos)
        if (placedBlock.id == CHUNK_FLAG) placedBlock.set(CHUNK_FLAG, Object.assign({}, placedBlock.getProperties(), {enabled:true}))
    })
    sendImmersiveMessage(Text.translatable("milf.flags.claimed"), player, flagClaimedStyle(event.server, getClaimAt(event.level, pos)), event.server)
})

BlockEvents.broken(CHUNK_FLAG, event => {
    let player = event.player
    let pos = event.block.pos
    let claim = getClaimAt(event.level, pos)
    if (!claim || event.block.getProperties().enabled != "true" || !isOwnClaim(player, claim)) return
    let error = flagUnclaim(player, event.level, pos, claim)
    if (error) {
        sendImmersiveMessage(error, player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        event.cancel()
        return
    }
    sendImmersiveMessage(Text.translatable("milf.flags.unclaimed"), player, DEFAULT_FLAG_NOTIFICATION_STYLE, event.server)
})
