AStageEvents.added("xaeromap", event => {
    let player = event.entity;
    let dimension = player.getLevel().getDimension()

    EmbersAtlas.unlockTier(player, "cartographer")

    event.server.runCommandSilent(`/playsound immersiveengineering:birthday_party ambient ${player.profile.name} ${player.x} ${player.y} ${player.z}`)
    event.server.runCommandSilent(`/execute in ${dimension} run particle minecraft:witch ${player.x} ${player.y} ${player.z} 8 8 8 1 5000 normal`)
})

PlayerEvents.loggedIn(event => {
    const { player } = event
    if (!AStages.playerHasStage("xaeromap", player)) return
    if (EmbersAtlas.tier(player) == "cartographer") return
    EmbersAtlas.unlockTier(player, "cartographer")
})
