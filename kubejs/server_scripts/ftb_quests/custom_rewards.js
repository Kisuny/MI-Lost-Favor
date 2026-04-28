// TODO: refactor in future
let $FTBTeamsAPI = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI").api()

// reward for Forge Hammer
FTBQuestsEvents.customReward('0DC887212398806D', event => {
    let player = event.entity;
    let dimension = player.getLevel().getDimension()
    event.server.runCommandSilent(`/playsound immersiveengineering:birthday_party ambient ${player.profile.name} ${player.x} ${player.y} ${player.z}`)
    event.server.runCommandSilent(`/execute in ${dimension} run particle minecraft:witch ${player.x} ${player.y} ${player.z} 8 8 8 1 5000 normal`)
    sendImmersiveMessageWithSubtext(Text.translate('milf.stage.congratulations'), Text.translate('milf.stage.bronze_age'), event.player, DEFAULT_NEW_AGE_NOTIFICATION_STYLE, DEFAULT_NEW_AGE_SUBTEXT_STYLE, event.server)
});

// reward for Bronze Plate (First steps)
FTBQuestsEvents.customReward('7EF0A7794783232F', event => {
    let player = event.entity;
    let player_name = player.profile.name

    const stage = "tier_1_access_ore"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});
// reward for toxony:alchemical_forge_part (root whispering chapter)
FTBQuestsEvents.customReward('4178A18CA2E5A74F', event => {
    let player = event.entity;
    let player_name = player.profile.name

    const stage = "monsterplus_mobs"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});
// reward for Ars Ecclesia (root whispering chapter)
FTBQuestsEvents.customReward('19304AD673874503', event => {
    let player = event.entity;
    let player_name = player.profile.name

    const stage = "eidolon_mobs"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});

// reward for killing black charro (journeys chapter)
FTBQuestsEvents.customReward('69335E0ACAA9C440', event => {
    let player = event.entity;
    let player_name = player.profile.name

    const stage = "mythsandlegends_mobs"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});

// reward for killing umvuthi, the sunbird (journeys chapter)
FTBQuestsEvents.customReward('50FF5C99CD671DD3', event => {
    let player = event.entity;
    let player_name = player.profile.name

    const stage = "mowziesmobs_mobs"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});

// reward for killing vanilla bosses (journeys chapter)
FTBQuestsEvents.customReward('224D85127D80FED8', event => {
    let player = event.entity;
    let player_name = player.profile.name

    const stages = ["cataclysm_mobs", "netherskeletons_mobs", "rottencreatures_mobs", "enderzoology_mobs"]
    addStagesToTeamMembers(event, stages)
    defaultMilestoneNotification(event, stages[0])
});

// reward for killing bomd and fdbosses bosses (journeys chapter)
FTBQuestsEvents.customReward('16B46238FC936637', event => {
    let player = event.entity;
    let player_name = player.profile.name

    const stages = ["grimoireofgaia_mobs", "born_in_chaos_v1_mobs"]
    addStagesToTeamMembers(event, stages)
    defaultMilestoneNotification(event, stages[0])
});


// reward for Iron Bloom
FTBQuestsEvents.customReward('74E5C7C4B8A33E55', event => {
    const stages = ["minecraft_mobs", "variants_and_ventures_mobs", "creeperoverhaul_mobs", "endermanoverhaul_mobs"]
    addStagesToTeamMembers(event, stages)
    defaultMilestoneNotification(event, stages[0])
});

// reward for Steel Ingot
FTBQuestsEvents.customReward('670CBE4973B6F390', event => {
    const stages = ["early_items", "blast_furnace", "mythsandlegends_mobs", "royalvariations_mobs"]
    addStagesToTeamMembers(event, stages)
    defaultMilestoneNotification(event, stages[0])
});

// reward for Iron Ingot
FTBQuestsEvents.customReward('4002784F5F537B2D', event => {
    const stage = ["post_iron", "goblin_traders_mobs"]
    addStagesToTeamMembers(event, stage)
});

// reward for Enter in Eternal Starlight
FTBQuestsEvents.customReward('3922C9ACA47723BA', event => {
    const stage = "forbidden_arcanus_mobs"
    addStagesToTeamMembers(event, stage)
});

// reward for flint and steel
FTBQuestsEvents.customReward('7650FE6CA0220DA3', event => {
    const stage = "the_nether_access"
    addStagesToTeamMembers(event, stage)
});

// reward for void portal craft
FTBQuestsEvents.customReward('0A8447D787E641E3', event => {
    const stage = "void_access"
    addStagesToTeamMembers(event, stage)
});

// reward for deeper down portal opening
FTBQuestsEvents.customReward('015382CFC13FFB7A', event => {
    const stage = "deeper_down_access"
    addStagesToTeamMembers(event, stage)
});

// reward for 12 eyes
FTBQuestsEvents.customReward('2BD4B3CA5BEDBA19', event => {
    const stage = "the_end_access"
    addStagesToTeamMembers(event, stage)
});

// Simple stage reward
const simple_stage_rewards = [
    { quest_id: "4BA1212AF4BD3432", stage: "apotheosis_augmenting_table" },
    { quest_id: "2F509B489C343BD7", stage: "apotheosis_reforging_table" },
    { quest_id: "6E3C09D7543B99D1", stage: "apotheosis_simple_reforging_table" },
    { quest_id: "4D0EBC927D8AD01D", stage: "xaeromap" },
]

simple_stage_rewards.forEach(element => {
    FTBQuestsEvents.customReward(element.quest_id, event => {
        addStagesToTeamMembers(event, element.stage)
    });
});


//TODO: add back, belt, hands
// ring, charm, feet, shoulders, bracelet, bundle, brooch, hands, back, head, pouch, face, 
// necklace, an_focus, deep_learner, body, pin, belt, adv_pattern_encoder, pigment_palette
const trinkets_slot_list_reward = [
    { quest_id: '73D93A782AD2E4AE', trinket_slot: 'bundle' },
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
    { quest_id: '331CC21E0A6E3F3F', trinket_slot: 'feet' },
    { quest_id: '1F1063A9E62215F0', trinket_slot: 'rune' },
    { quest_id: '66F76B515E0CC819', trinket_slot: 'shoulders' },
    { quest_id: '19B52AC9AC1571C5', trinket_slot: 'charm' },
    { quest_id: '2C80D8BA9B69917E', trinket_slot: 'ring' },
    { quest_id: '43989D93EEEBE7E7', trinket_slot: 'bracelet' },
    { quest_id: '797984527B88CB21', trinket_slot: 'charm' },
    { quest_id: '20BA335B5255AB60', trinket_slot: 'hands' },
    { quest_id: '4489C7C10E7A49EF', trinket_slot: 'ring' },
    { quest_id: '20BD33A01D4A91E7', trinket_slot: 'rings' },
    { quest_id: '4C184C19BA719B4F', trinket_slot: 'feet' },
    { quest_id: '5BD3DB1BBF7C043E', trinket_slot: 'ring' },
    { quest_id: '116FEA5302E15B7D', trinket_slot: 'hands' },
    { quest_id: '6C1E7006967265FC', trinket_slot: 'charm' },
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

function defaultMilestoneNotification(event, stage) {
    let teamManager = $FTBTeamsAPI.getManager()
    let team = teamManager.getTeamForPlayer(event.getPlayer()).get()
    let teamMembers = team.getOnlineMembers()
    teamMembers.forEach(player => {
        sendImmersiveMessageWithSubtext(Text.translate('milf.stage.something_changed'), Text.translate(`milf.stage.${stage}`), player, DEFAULT_MILESTONE_NOTIFICATION_STYLE, DEFAULT_MILESTONE_SUBTEXT_STYLE, event.server)
        event.server.scheduleInTicks(DEFAULT_MILESTONE_SUBTEXT_STYLE.delay * 20, _ => {
            event.server.runCommandSilent(`/playsound immersiveengineering:spark ambient ${player.profile.name} ${player.x} ${player.y} ${player.z}`)
            player.tell(Text.translate(`milf.stage.${stage}`))
        })
    })
}

function addStagesToTeamMembers(event, stages) {

    let teamManager = $FTBTeamsAPI.getManager()

    let team = teamManager.getTeamForPlayer(event.getPlayer()).get()
    let teamMembers = team.getOnlineMembers()
    stages = Array.isArray(stages) ? stages : [stages]

    teamMembers.forEach(member => {
        //console.log(member);
        for (const stage of stages) {
            AStages.addStageToPlayer(stage, member)
        }
    })
}