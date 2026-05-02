const xaero_bundle = { id: "Xaeromap", title: "Xaeromap", icon: "minecraft:map" }

const xaero_actions = [
    { parentId: "Xaeromap", key_name: "gui.xaero_new_waypoint",     action_name: "New Waypoint",         icon: "minecraft:map" },
    { parentId: "Xaeromap", key_name: "gui.xaero_waypoints_key",    action_name: "Open Waypoint Screen", icon: "minecraft:map" },
    { parentId: "Xaeromap", key_name: "gui.xaero_minimap_settings", action_name: "Minimap Settings",     icon: "minecraft:map" },
]

function sendXaeroRadial(player) {
    sendEzBundle(player, xaero_bundle)
    xaero_actions.forEach(a => sendEzAction(player, a))
}

FTBQuestsEvents.customReward('4D0EBC927D8AD01D', event => {
    sendXaeroRadial(event.player)
});


const radial_menu_buttons = [
    { quest_id: '7108991BE6DD4A51', stage: 'radial_money_pouch',   action_name: 'Open Money Pouch',   key_name: 'key.devices.open_pouch',                   icon: "devices:devices_pouch" },
    { quest_id: '472BCEE94E93C2FF', stage: 'radial_trinket_pouch', action_name: 'Open Trinket Pouch', key_name: 'key.ars_elemental.open_pouch',              icon: "ars_elemental:curio_bag" },
    { quest_id: '0A58BA17068FCA2C', stage: 'radial_sail',          action_name: 'Toggle Sail',        key_name: 'key.smallships.ship_sail',                 icon: "smallships:sail" },
    { quest_id: '631ABDA3AFF1EE5B', stage: 'radial_world_tier',    action_name: 'World Tier Select',  key_name: 'key.apotheosis.open_world_tier_select',    icon: "apotheosis:boss_summoner" },
]

radial_menu_buttons.forEach(element => {
    FTBQuestsEvents.customReward(element.quest_id, event => {
        AStages.addStageToPlayer(element.stage, event.player)
        sendEzAction(event.player, element)
    });
});


PlayerEvents.loggedIn(event => {
    const player = event.getPlayer()
    const playerStagesRaw = AStages.getStagesFromPlayer(player)
    const playerStages = new Set()
    for (const s of playerStagesRaw) playerStages.add(s)

    // console.log('[EzRadial] ' + player.name + ' logged in, stages: [' + Array.from(playerStages).join(', ') + ']')

    event.server.scheduleInTicks(200, () => {
        // console.log(`[EzRadial] sending radial data to ${player.name}`)

        if (playerStages.has('xaeromap')) {
            // console.log(`[EzRadial] sending xaeromap bundle`)
            sendXaeroRadial(player)
        }


        radial_menu_buttons.forEach(element => {
            if (playerStages.has(element.stage)) {
                // console.log(`[EzRadial] sending action: ${element.action_name} (stage: ${element.stage})`)
                sendEzAction(player, element)
            } else {
                // console.log(`[EzRadial] skip action: ${element.action_name} — stage "${element.stage}" not found`)
            }
        })
    })
})


function sendEzAction(player, args) {
    player.sendData("ez_action", {
        args: args
    })
}

function sendEzBundle(player, args) {
    player.sendData("ez_bundle", {
        args: args
    })
}
