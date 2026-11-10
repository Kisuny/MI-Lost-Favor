const FLAG_PREVIEW_FREE_COLOR = 0x55FF55
const FLAG_PREVIEW_FOREIGN_COLOR = 0xFF5555

PlayerEvents.tick(event => {
    let player = event.player
    if (player.tickCount % 10 != 0) return
    if (player.mainHandItem.id != CHUNK_FLAG && player.offhandItem.id != CHUNK_FLAG) return

    let chunk = $FTBChunksAPI.getManager().getChunk($ChunkDimPos(player))
    let color = FLAG_PREVIEW_FREE_COLOR
    let message = Text.translatable("milf.flags.preview.free")

    if (chunk) {
        let team = chunk.teamData.team
        if (team.getRankForPlayer(player.uuid).isAllyOrBetter()) {
            let teamColor = team.coloredName.getStyle().getColor()
            color = teamColor ? teamColor.getValue() : FLAG_PREVIEW_FREE_COLOR
            message = Text.translatable("milf.flags.preview.own")
        } else {
            color = FLAG_PREVIEW_FOREIGN_COLOR
            message = Text.translatable("milf.flags.preview.foreign").append(team.getName())
        }
    }

    player.setStatusMessage(message)
    drawChunkOutline(player, color)
})

function drawChunkOutline(player, color) {
    let dust = new $DustParticleOptions(new $Vector3f(((color >> 16) & 255) / 255, ((color >> 8) & 255) / 255, (color & 255) / 255), 1.5)
    let minX = (Math.floor(player.x) >> 4) << 4
    let minZ = (Math.floor(player.z) >> 4) << 4
    let y = player.y + 1

    for (let i = 0; i <= 16; i++) {
        player.level.sendParticles(player, dust, true, minX + i, y, minZ, 1, 0, 0, 0, 0)
        player.level.sendParticles(player, dust, true, minX + i, y, minZ + 16, 1, 0, 0, 0, 0)
        player.level.sendParticles(player, dust, true, minX, y, minZ + i, 1, 0, 0, 0, 0)
        player.level.sendParticles(player, dust, true, minX + 16, y, minZ + i, 1, 0, 0, 0, 0)
    }
}
