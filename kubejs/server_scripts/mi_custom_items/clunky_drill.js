let $SteamDrillItem = Java.loadClass("aztech.modern_industrialization.items.SteamDrillItem")

NetworkEvents.dataReceived('milf_clunky_drill_change_mode', (event) => {

    let {player} = event

    let item = player.getMainHandItem().item

    if (item instanceof $SteamDrillItem) {
        item.changeMode()
    }

    sendImmersiveMessage(Text.translatable("milf.clunky_drill.mode"), player, DEFAULT_CHUNK_CLAIM_NOTIFICATION_STYLE, event.server)

})