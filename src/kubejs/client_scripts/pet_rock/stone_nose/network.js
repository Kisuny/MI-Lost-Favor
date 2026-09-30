
NetworkEvents.dataReceived('milf_stone_nose_used', (event) => {

    milfPlayGUISound("mowziesmobs:umvuthana.inhale")
    let data = event.data
    const STONE_NOSE_SCAN_DURATION = 654
    data.putInt("scan_duration", STONE_NOSE_SCAN_DURATION)
    Client.player.sendData("milf_pet_rock_deposits_to_scan", data)

})

NetworkEvents.dataReceived('milf_stone_nose_start_sound', (event) => {

    milfPlayGUISound("minecraft:entity.sniffer.sniffing")

})

NetworkEvents.dataReceived('milf_stone_nose_sound_interrupted', (event) => {

    //bleh

    //refactor with AbstractTickableSoundInstance in the future

})
