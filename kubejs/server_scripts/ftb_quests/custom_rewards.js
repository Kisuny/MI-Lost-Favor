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
    const stage = "tier_1_access_ore"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});
// pigment pedestal malum ore access
FTBQuestsEvents.customReward('0FCAF2E23A025C18', event => {
    const stage = "malum_access_ore"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});

// reward for toxony:alchemical_forge_part (root whispering chapter)
FTBQuestsEvents.customReward('4178A18CA2E5A74F', event => {
    const stage = "monsterplus_mobs"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});
// reward for Ars Ecclesia (root whispering chapter)
FTBQuestsEvents.customReward('19304AD673874503', event => {
    const stage = "eidolon_mobs"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});

// reward for killing black charro (journeys chapter)
FTBQuestsEvents.customReward('69335E0ACAA9C440', event => {
    const stage = "mythsandlegends_mobs"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});

// reward for killing umvuthi, the sunbird (journeys chapter)
FTBQuestsEvents.customReward('50FF5C99CD671DD3', event => {
    const stage = "mowziesmobs_mobs"
    addStagesToTeamMembers(event, stage)
    defaultMilestoneNotification(event, stage)
});

// reward for killing vanilla bosses (journeys chapter)
FTBQuestsEvents.customReward('224D85127D80FED8', event => {
    const stages = ["cataclysm_mobs", "netherskeletons_mobs", "rottencreatures_mobs", "enderzoology_mobs"]
    addStagesToTeamMembers(event, stages)
    defaultMilestoneNotification(event, stages[0])
});

// reward for killing bomd and fdbosses bosses (journeys chapter)
FTBQuestsEvents.customReward('16B46238FC936637', event => {

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
})

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