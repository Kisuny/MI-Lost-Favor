// ring, charm, feet, shoulders, bracelet, bundle, brooch, hands, back, head, pouch, face, 
// necklace, an_focus, deep_learner, body, pin, belt, adv_pattern_encoder, pigment_palette,
// crafting_on_a_stick
const trinkets_slot_list_reward = [
    { quest_id: '73D93A782AD2E4AE', trinket_slot: 'bundle' },
    { quest_id: '1700ECB1400F81BB', trinket_slot: 'hands' },
    { quest_id: '1816E9C04215E83A', trinket_slot: 'belt' },
    { quest_id: '401FEBCB5849F6DE', trinket_slot: 'back' },
    { quest_id: '094072146D87AD84', trinket_slot: 'pouch' },
    { quest_id: '3F447B6AF92AB2A6', trinket_slot: 'belt' },
    { quest_id: '0E39813C84812910', trinket_slot: 'face' },
    { quest_id: '79B3DCBD3C3D36DB', trinket_slot: 'head' },
    { quest_id: '40AC6BC01A9ED62B', trinket_slot: 'palette' },
    { quest_id: '084C079A765DC32C', trinket_slot: 'focus' },
    { quest_id: '184E78B18B597C06', trinket_slot: 'adv_pattern_encoder' },
    { quest_id: '5B2F20AA1D77D9D7', trinket_slot: 'body' },
    { quest_id: '764351AE4ACC7FEA', trinket_slot: 'brooch' },
    { quest_id: '70FAD5B8BC6CD8CC', trinket_slot: 'deep_learner' },
    { quest_id: '12D16D8D384FB0D8', trinket_slot: 'pin' },
    { quest_id: '7CEACC8595E86D03', trinket_slot: 'ring' },
    { quest_id: '058FD5B700A2EB20', trinket_slot: 'feet' },
    { quest_id: '1F1063A9E62215F0', trinket_slot: 'rune' },
    { quest_id: '66F76B515E0CC819', trinket_slot: 'shoulders' },
    { quest_id: '19B52AC9AC1571C5', trinket_slot: 'charm' },
    { quest_id: '2C80D8BA9B69917E', trinket_slot: 'ring' },
    { quest_id: '43989D93EEEBE7E7', trinket_slot: 'bracelet' },
    { quest_id: '797984527B88CB21', trinket_slot: 'charm' },
    { quest_id: '20BA335B5255AB60', trinket_slot: 'hands' },
    { quest_id: '4489C7C10E7A49EF', trinket_slot: 'ring' },
    { quest_id: '4C184C19BA719B4F', trinket_slot: 'feet' },
    { quest_id: '5BD3DB1BBF7C043E', trinket_slot: 'ring' },
    { quest_id: '04B7B3AE59A69B54', trinket_slot: 'ring' },
    { quest_id: '116FEA5302E15B7D', trinket_slot: 'hands' },
    { quest_id: '6C1E7006967265FC', trinket_slot: 'charm' },
    { quest_id: '4847BCB4A0147A6D', trinket_slot: 'crafting_on_a_stick' },
    { quest_id: '6D760C6378680C1F', trinket_slot: 'time_sand_pouch' },
    { quest_id: '610453008A85C538', trinket_slot: 'amulet' },
]

trinkets_slot_list_reward.forEach(reward => {
    FTBQuestsEvents.customReward(reward.quest_id, event => {
        let pData = event.player.persistentData
        let player = event.entity;
        let player_name = player.profile.name
        let pDataName = player_name + "_trinket_reward_" + reward.trinket_slot + "_" + reward.quest_id

        if (!pData.getBoolean(pDataName)) {
            pData.putBoolean(pDataName, true)

            event.server.runCommandSilent(`/curios add ${reward.trinket_slot} ${player_name} 1`)
        }
    });
});