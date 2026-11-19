const atlas_bundle = { id: "Atlas", title: "Atlas", icon: "minecraft:filled_map" }

const atlas_actions = [
    { parentId: "Atlas", key_name: "key.embersatlas.new_marker", action_name: "New Marker", icon: "minecraft:filled_map" },
    { parentId: "Atlas", key_name: "key.embersatlas.marker_list", action_name: "Marker List", icon: "minecraft:filled_map" },
    { parentId: "Atlas", key_name: "key.embersatlas.toggle_minimap", action_name: "Toggle Minimap", icon: "minecraft:filled_map" },
    { parentId: "Atlas", key_name: "key.embersatlas.open_settings", action_name: "Atlas Settings", icon: "minecraft:filled_map" },
]

function sendAtlasRadial(player) {
    sendEzBundle(player, atlas_bundle)
    atlas_actions.forEach(a => sendEzAction(player, a))
}

EmbersQuestingEvents.customReward('milf:radial/xaeromap', event => {
    sendAtlasRadial(event.player)
});


const radial_menu_buttons = [
    { id: 'milf:radial/money_pouch', stage: 'radial_money_pouch', action_name: 'Open Money Pouch', key_name: 'key.devices.open_pouch', icon: "devices:devices_pouch" },
    { id: 'milf:radial/trinket_pouch', stage: 'radial_trinket_pouch', action_name: 'Open Trinket Pouch', key_name: 'key.ars_elemental.open_pouch', icon: "ars_elemental:curio_bag" },
    { id: 'milf:radial/sail', stage: 'radial_sail', action_name: 'Toggle Sail', key_name: 'key.smallships.ship_sail', icon: "smallships:cotton_sails" },
    { id: 'milf:radial/world_tier', stage: 'radial_world_tier', action_name: 'World Tier Select', key_name: 'key.apotheosis.open_world_tier_select', icon: "apotheosis:boss_summoner" },
    { id: 'milf:radial/chunk_loaders', stage: 'chunkloaders_open_screen', action_name: 'View Chunk Loaders', key_name: 'chunkloaders.keys.open_screen', icon: "chunkloaders:basic_chunk_loader" },
]

radial_menu_buttons.forEach(element => {
    EmbersQuestingEvents.customReward(element.id, event => {
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
            sendAtlasRadial(player)
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
