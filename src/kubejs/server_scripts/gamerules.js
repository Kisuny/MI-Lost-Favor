ServerEvents.loaded(event => {
    const { server, server: { persistentData } } = event
    if (!persistentData.firstLoad) {
        persistentData.firstLoad = true

        server.runCommandSilent('gamerule doInsomnia false')
        server.runCommandSilent('gamerule coinDropPercent 0')
        server.runCommandSilent('gamerule doPatrolSpawning false')
        server.runCommandSilent('gamerule playersSleepingPercentage 40')
        server.runCommandSilent('gamerule doFireTick false')
    }
})