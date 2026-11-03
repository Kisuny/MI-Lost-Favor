// ring, charm, feet, shoulders, bracelet, bundle, brooch, hands, back, head, pouch, face,
// necklace, an_focus, deep_learner, body, pin, belt, adv_pattern_encoder, pigment_palette,
// crafting_on_a_stick
const trinkets_slot_list_reward = [
    { id: 'milf:trinket/bundle_curio_bag', trinket_slot: 'bundle' },
    { id: 'milf:trinket/hands_bronze_plate', trinket_slot: 'hands' },
    { id: 'milf:trinket/belt_bronze_plate', trinket_slot: 'belt' },
    { id: 'milf:trinket/back_steel_ingot', trinket_slot: 'back' },
    { id: 'milf:trinket/pouch_devices_pouch', trinket_slot: 'pouch' },
    { id: 'milf:trinket/belt_take_off_belt', trinket_slot: 'belt' },
    { id: 'milf:trinket/face_glow_vision_goggles', trinket_slot: 'face' },
    { id: 'milf:trinket/palette_pigment_palette', trinket_slot: 'palette' },
    { id: 'milf:trinket/focus_mark_of_mastery', trinket_slot: 'focus' },
    { id: 'milf:trinket/adv_pattern_encoder', trinket_slot: 'adv_pattern_encoder' },
    { id: 'milf:trinket/body_world_tier_frontier', trinket_slot: 'body' },
    { id: 'milf:trinket/brooch_runic_brooch', trinket_slot: 'brooch' },
    { id: 'milf:trinket/deep_learner', trinket_slot: 'deep_learner' },
    { id: 'milf:trinket/pin_liquid_crystal_bucket', trinket_slot: 'pin' },
    { id: 'milf:trinket/ring_liquid_crystal_bucket', trinket_slot: 'ring' },
    { id: 'milf:trinket/feet_steel_ingot', trinket_slot: 'feet' },
    { id: 'milf:trinket/rune_runic_workbench', trinket_slot: 'rune' },
    { id: 'milf:trinket/shoulders_robot_auto_feeder', trinket_slot: 'shoulders' },
    { id: 'milf:trinket/charm_world_tier_frontier', trinket_slot: 'charm' },
    { id: 'milf:trinket/ring_world_tier_frontier', trinket_slot: 'ring' },
    { id: 'milf:trinket/bracelet_world_tier_ascent', trinket_slot: 'bracelet' },
    { id: 'milf:trinket/charm_world_tier_ascent', trinket_slot: 'charm' },
    { id: 'milf:trinket/hands_world_tier_summit', trinket_slot: 'hands' },
    { id: 'milf:trinket/ring_world_tier_summit', trinket_slot: 'ring' },
    { id: 'milf:trinket/feet_world_tier_summit', trinket_slot: 'feet' },
    { id: 'milf:trinket/ring_world_tier_pinnacle', trinket_slot: 'ring' },
    { id: 'milf:trinket/ring_first_steps', trinket_slot: 'ring' },
    { id: 'milf:trinket/hands_world_tier_pinnacle', trinket_slot: 'hands' },
    { id: 'milf:trinket/charm_world_tier_pinnacle', trinket_slot: 'charm' },
    { id: 'milf:trinket/crafting_on_a_stick', trinket_slot: 'crafting_on_a_stick' },
    { id: 'milf:trinket/time_sand_pouch', trinket_slot: 'time_sand_pouch' },
    { id: 'milf:trinket/amulet_first_steps', trinket_slot: 'amulet' },
]

trinkets_slot_list_reward.forEach(reward => {
    EmbersQuestingEvents.customReward(reward.id, event => {
        let player = event.player
        let pData = player.persistentData
        let player_name = player.profile.name
        let pDataName = player_name + "_trinket_reward_" + reward.trinket_slot + "_" + reward.id

        if (!pData.getBoolean(pDataName)) {
            pData.putBoolean(pDataName, true)

            player.server.runCommandSilent(`/curios add ${reward.trinket_slot} ${player_name} 1`)
        }
    });
});
