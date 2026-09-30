
// reward for Forge Hammer
FTBQuestsEvents.customReward('0DC887212398806D', event => {
    let player = event.entity;
    let dimension = player.getLevel().getDimension()
    event.server.runCommandSilent(`/playsound immersiveengineering:birthday_party ambient ${player.profile.name} ${player.x} ${player.y} ${player.z}`)
    event.server.runCommandSilent(`/execute in ${dimension} run particle minecraft:witch ${player.x} ${player.y} ${player.z} 8 8 8 1 5000 normal`)
    sendImmersiveMessageWithSubtext(Text.translate('milf.stage.congratulations'), Text.translate('milf.stage.bronze_age'), event.player, DEFAULT_NEW_AGE_NOTIFICATION_STYLE, DEFAULT_NEW_AGE_SUBTEXT_STYLE, event.server)
});

// Milestone rewards - add stages + show notification
const milestone_rewards = [
    { quest_id: "7EF0A7794783232F", stages: "tier_1_access_ore" }, // Bronze Plate (First steps)
    { quest_id: "4178A18CA2E5A74F", stages: "monsterplus_mobs" }, // toxony:alchemical_forge_part (root whispering)
    { quest_id: "19304AD673874503", stages: "eidolon_mobs" }, // Ars Ecclesia (root whispering)
    { quest_id: "20165DF8F49E8177", stages: ["mowziesmobs_mobs", "mythsandlegends_mobs"] }, // haven gate
    { quest_id: "224D85127D80FED8", stages: ["cataclysm_mobs", "rottencreatures_mobs", "enderzoology_mobs"] }, // vanilla bosses
    { quest_id: "16B46238FC936637", stages: ["grimoireofgaia_mobs"] }, // bomd and fdbosses bosses
    { quest_id: "74E5C7C4B8A33E55", stages: ["minecraft_mobs", "variants_and_ventures_mobs", "creeperoverhaul_mobs", "endermanoverhaul_mobs"] }, // Iron Bloom
    { quest_id: "670CBE4973B6F390", stages: ["early_items", "blast_furnace", "mythsandlegends_mobs", "royalvariations_mobs"] }, // Steel Ingot
]

milestone_rewards.forEach(entry => {
    const quest_id = entry.quest_id
    const stages = entry.stages
    FTBQuestsEvents.customReward(quest_id, event => {
        addStagesToTeamMembers(event, stages)
        defaultMilestoneNotification(event, Array.isArray(stages) ? stages[0] : stages)
    })
})

// Simple stage rewards - add stages only, no notification
const simple_stage_rewards = [
    { quest_id: "4002784F5F537B2D", stage: ["post_iron", "goblin_traders_mobs"] }, // Iron Ingot
    { quest_id: "26A2544BCF0C603E", stage: ["iron_tools_and_armors_everywhere", "bucket_everywhere", "enigmaticlegacyplus_everywhere", "relics_everywhere"] }, // Iron Ingot
    { quest_id: "76D62EF7E386F07D", stage: ["diamond_tools_and_armors_everywhere", "simplyswords_swords_everywhere"] }, // diamond set 
    { quest_id: "4F76CA5E86C00635", stage: "enchanted_book_everywhere" }, // ench. table craft
    { quest_id: "0DC1BAE9C1D023E7", stage: "gems_everywhere" }, // bronze plate 
    { quest_id: "4C183945FE934E50", stage: ["netherite_tools_and_armors_everywhere", "netherite_scrap_everywhere"] }, // nether portal
    { quest_id: "7C41108E48C9E62D", stage: ["simplyswords_uniques_swords_everywhere", "any_tools_and_armors_everywhere"] }, // Haven gateway
    { quest_id: "7650FE6CA0220DA3", stage: "the_nether_access" }, // flint and steel
    { quest_id: "0A8447D787E641E3", stage: "void_access" }, // void portal craft
    { quest_id: "015382CFC13FFB7A", stage: "deeper_down_access" }, // deeper down portal opening
    { quest_id: "2BD4B3CA5BEDBA19", stage: "the_end_access" }, // 12 end eyes
    { quest_id: "5EBDE634D224C573", stage: "crimson_veil_accses" }, // crimson veil elixir
    { quest_id: "4BA1212AF4BD3432", stage: "apotheosis_augmenting_table" },
    { quest_id: "2F509B489C343BD7", stage: "apotheosis_reforging_table" },
    { quest_id: "6E3C09D7543B99D1", stage: "apotheosis_simple_reforging_table" },
    { quest_id: "4D0EBC927D8AD01D", stage: "xaeromap" },
]

simple_stage_rewards.forEach(entry => {
    const quest_id = entry.quest_id
    const stage = entry.stage
    FTBQuestsEvents.customReward(quest_id, event => {
        addStagesToTeamMembers(event, stage)
    })
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

    syncTeamStages(event.getPlayer())
}