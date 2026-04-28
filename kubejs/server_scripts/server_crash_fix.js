// So far, I haven't come up with any better ideas for how to fix crash zones during world generation

// PlayerEvents.loggedIn(event => {

//     const { player, server } = event
//     let player_name = player.getName().getString()


//     if (player_name !== "Midorishun") return
//     if (!player || player.persistentData.getBoolean('fix_end_crash')) return
//     player.persistentData.putBoolean('fix_end_crash', true)

//     server.runCommandSilent(`/execute in minecraft:overworld run tp ${player_name} 100 86 100`)
// })