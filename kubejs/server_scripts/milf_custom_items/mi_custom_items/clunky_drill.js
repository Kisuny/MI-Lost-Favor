
NetworkEvents.dataReceived('milf_clunky_drill_change_mode', (event) => {

    let {player} = event

    let stack = player.getMainHandItem()

    if (stack.item instanceof $SteamDrillItem) {
        let data = stack.getCustomData()
        let isHorizontal = data.getBoolean("milf:isHorizontal")
        let compoundTag = new $CompoundTag()
        compoundTag.putBoolean("milf:isHorizontal", !isHorizontal)
        let newData = data.merge(compoundTag)
        stack.set($DataComponents.CUSTOM_DATA, newData)

        //console.log(newData);
        
    }

    sendImmersiveMessage(Text.translatable("milf.clunky_drill.mode"), player, DEFAULT_CHUNK_CLAIM_NOTIFICATION_STYLE, event.server)

})