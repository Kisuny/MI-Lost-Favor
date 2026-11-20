
NetworkEvents.dataReceived('milf_stone_nose_used', (event) => {

    milfPlayGUISound("mowziesmobs:umvuthana.inhale")
    let data = event.data
    const STONE_NOSE_SCAN_DURATION = 654
    data.putInt("scan_duration", STONE_NOSE_SCAN_DURATION)

    let markerNames = new $CompoundTag()
    let oresToScan = data.getList("oresToScan", $Tag.TAG_STRING)
    for (let i = 0; i < oresToScan.size(); i++) {
        let oreId = oresToScan.getString(i)
        markerNames.putString(oreId, Item.of(oreId).hoverName.string)
    }
    data.put("map_marker_names", markerNames)
    Client.player.sendData("milf_pet_rock_deposits_to_scan", data)

})

NetworkEvents.dataReceived('milf_stone_nose_start_sound', (event) => {

    milfPlayGUISound("minecraft:entity.sniffer.sniffing")

})

NetworkEvents.dataReceived('milf_stone_nose_sound_interrupted', (event) => {

    //bleh

    //refactor with AbstractTickableSoundInstance in the future

})
