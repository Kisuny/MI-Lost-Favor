// Custom quest rewards: stages and milestone notifications.
// Ember's Questing refuses to claim a quest whose custom reward has no handler, so every id needs one.

// reward for Forge Hammer
// EmbersQuestingEvents.customReward('milf:milestone/forge_hammer', event => {
//     let player = event.player
//     let server = player.server
//     let dimension = player.getLevel().getDimension()
//     server.runCommandSilent(`/playsound immersiveengineering:birthday_party ambient ${player.profile.name} ${player.x} ${player.y} ${player.z}`)
//     server.runCommandSilent(`/execute in ${dimension} run particle minecraft:witch ${player.x} ${player.y} ${player.z} 8 8 8 1 5000 normal`)
//     sendImmersiveMessageWithSubtext(Text.translate('milf.stage.congratulations'), Text.translate('milf.stage.bronze_age'), player, DEFAULT_NEW_AGE_NOTIFICATION_STYLE, DEFAULT_NEW_AGE_SUBTEXT_STYLE, server)
// });

// Milestone rewards - add stages + show notification
// const milestone_rewards = [
//     { id: 'milf:milestone/bronze_plate', stages: "tier_1_access_ore" },
//     { id: 'milf:milestone/alchemical_forge_part', stages: "monsterplus_mobs" }, // toxony:alchemical_forge_part (root whispering)
//     { id: 'milf:milestone/codex', stages: "eidolon_mobs" }, // Ars Ecclesia (root whispering)
//     { id: 'milf:milestone/gate_pearl', stages: ["mowziesmobs_mobs", "mythsandlegends_mobs"] }, // haven gate
//     { id: 'milf:milestone/world_tier_ascent', stages: ["cataclysm_mobs", "rottencreatures_mobs", "enderzoology_mobs"] }, 
//     { id: 'milf:milestone/world_tier_summit', stages: ["grimoireofgaia_mobs"] },
//     { id: 'milf:milestone/iron_bloom', stages: ["minecraft_mobs", "variants_and_ventures_mobs", "creeperoverhaul_mobs", "endermanoverhaul_mobs", "legendary_monsters_mobs", "darkerdepths_mobs"] },
//     { id: 'milf:milestone/steel_ingot', stages: ["early_items", "blast_furnace", "mythsandlegends_mobs"] },
// ]

Object.entries({
    "milf:milestone/bronze_plate" : {
        stages: ["tier_1_access_ore"]
    },
    "milf:milestone/alchemical_forge_part": {
        stages: ["monsterplus_mobs"]
    },
    "milf:milestone/codex": {
        stages: ["eidolon_mobs"]
    },
    "milf:milestone/gate_pearl": {
        stages: ["mowziesmobs_mobs", "mythsandlegends_mobs"]
    },
    "milf:milestone/world_tier_ascent": {
        stages: ["cataclysm_mobs", "rottencreatures_mobs", "enderzoology_mobs"]
    },
    "milf:milestone/world_tier_summit": {
        stages: ["grimoireofgaia_mobs"]
    },
    "milf:milestone/iron_bloom": {
        stages: ["minecraft_mobs", "variants_and_ventures_mobs", "creeperoverhaul_mobs", "endermanoverhaul_mobs", "legendary_monsters_mobs", "darkerdepths_mobs"]
    },
    "milf:milestone/steel_ingot": {
        stages: ["early_items", "blast_furnace", "mythsandlegends_mobs"]
    },
    "milf:milestone/forge_hammer": {
        callback: (event) => {
            let player = event.player
            milfPlaySound(event, "immersiveengineering:birthday_party")

            event.player.getLevel().spawnParticles(
                "minecraft:witch",
                false,
                player.x,
                player.y,
                player.z,
                7.1, 7.1, 7.1, 
                109 * 14, 1
            )

            sendImmersiveMessageWithSubtext(
                Text.translate('milf.stage.congratulations'), 
                Text.translate('milf.stage.bronze_age'), 
                player, 
                DEFAULT_NEW_AGE_NOTIFICATION_STYLE, 
                DEFAULT_NEW_AGE_SUBTEXT_STYLE, 
                player.server
            )
        }
    }

}).forEach(([questId, data]) => {

    let { stages, callback } = data

    EmbersQuestingEvents.customReward(questId, event => {
        if (stages) {
            addStagesToTeamMembers(event.player, stages)
            defaultMilestoneNotification(event.player, stages[0])
        }

        if(callback) callback(event)
    })
})

// Simple stage rewards - add stages only, no notification
// const simple_stage_rewards = [
//     { id: 'milf:stage/iron_ingot', stage: ["post_iron", "goblin_traders_mobs", "anvils_everywhere"] }, // Iron Ingot
//     { id: 'milf:stage/iron_ingot_loot', stage: ["iron_tools_and_armors_everywhere", "bucket_everywhere", "enigmaticlegacyplus_everywhere", "relics_everywhere"] }, // Iron Ingot
//     { id: 'milf:stage/diamond_helmet', stage: ["diamond_tools_and_armors_everywhere", "simplyswords_swords_everywhere"] }, // diamond set
//     { id: 'milf:stage/apothic_enchanting_table', stage: "enchanted_book_everywhere" }, // ench. table craft
//     { id: 'milf:stage/bronze_plate', stage: "gems_everywhere" }, // bronze plate
//     { id: 'milf:stage/netherite_loot', stage: ["netherite_tools_and_armors_everywhere", "netherite_scrap_everywhere"] }, // nether portal
//     { id: 'milf:stage/gate_pearl', stage: ["simplyswords_uniques_swords_everywhere", "any_tools_and_armors_everywhere"] }, // Haven gateway
//     { id: 'milf:stage/flint_and_steel', stage: "the_nether_access" }, // flint and steel
//     { id: 'milf:stage/portal_block', stage: "void_access" }, // void portal craft
//     { id: 'milf:stage/deeper_down_access', stage: "deeper_down_access" }, // deeper down portal opening
//     { id: 'milf:stage/the_end', stage: "the_end_access" }, // 12 end eyes
//     { id: 'milf:stage/crimson_veil_elixir', stage: "crimson_veil_accses" }, // crimson veil elixir
//     { id: 'milf:stage/augmenting_table', stage: "apotheosis_augmenting_table" },
//     { id: 'milf:stage/reforging_table', stage: "apotheosis_reforging_table" },
//     { id: 'milf:stage/simple_reforging_table', stage: "apotheosis_simple_reforging_table" },
//     { id: 'milf:radial/xaeromap', stage: "xaeromap" },
//     { id: 'milf:stage/salis_mundus', stage: "thaumaturge_mobs" }, // salis mundus
// ]

Object.entries({

    "milf:stage/crafting_table": {
        stages: ["crafting_table"]
    },

    "milf:stage/furnace": {
        stages: ["furnace"]
    },

    "milf:stage/smooth_stone": {
        stages: ["smooth_stone"]
    },

    "milf:stage/stonecutter": {
        stages: ["stonecutter"]
    },

    "milf:stage/mixing_cauldron": {
        stages: ["mixing_cauldron"]
    },

    "milf:stage/farmersdelight_blocks": {
        stages: ["farmersdelight_blocks"]
    },

    "milf:stage/ie_blocks": {
        stages: ["ie_blocks"]
    },

    "milf:stage/metal_blocks": {
        stages: ["metal_blocks"]
    },

    "milf:stage/lead_ore": {
        stages: ["lead_ore"]
    },

    "milf:stage/tin_ore": {
        stages: ["tin_ore"]
    },

    "milf:stage/copper_ore": {
        stages: ["copper_ore"]
    },

    "milf:stage/iron_ore": {
        stages: ["iron_ore"]
    },

    "milf:stage/coal_ore": {
        stages: ["coal_ore"]
    },

    "milf:stage/redstone_ore": {
        stages: ["redstone_ore"]
    },

    "milf:stage/lapis_ore": {
        stages: ["lapis_ore"]
    },

    "milf:stage/gold_ore": {
        stages: ["gold_ore"]
    },

    "milf:stage/quartz_ore": {
        stages: ["quartz_ore"]
    },

    "milf:stage/salt_ore": {
        stages: ["salt_ore"]
    },

    "milf:stage/emerald_ore": {
        stages: ["emerald_ore"]
    },

    "milf:stage/diamond_ore": {
        stages: ["diamond_ore"]
    },

    "milf:stage/nickel_ore": {
        stages: ["nickel_ore"]
    },

    "milf:stage/nether_quartz_ore": {
        stages: ["nether_quartz_ore"]
    },

    "milf:stage/antimony_ore": {
        stages: ["antimony_ore"]
    },

    "milf:stage/ancient_debris_ore": {
        stages: ["ancient_debris_ore"]
    },

    "milf:stage/bauxite_ore": {
        stages: ["bauxite_ore"]
    },

    "milf:stage/uranium_ore": {
        stages: ["uranium_ore"]
    },

    "milf:stage/monazite_ore": {
        stages: ["monazite_ore"]
    },

    "milf:stage/titanium_ore": {
        stages: ["titanium_ore"]
    },

    "milf:stage/platinum_ore": {
        stages: ["platinum_ore"]
    },

    "milf:stage/tungsten_ore": {
        stages: ["tungsten_ore"]
    },

    "milf:stage/iridium_ore": {
        stages: ["iridium_ore"]
    },

    "milf:stage/iron_ingot": {
        stages: ["post_iron", "goblin_traders_mobs", "anvils_everywhere"]
    },
    "milf:stage/iron_ingot_loot": {
        stages: ["iron_tools_and_armors_everywhere", "bucket_everywhere", "enigmaticlegacyplus_everywhere", "relics_everywhere"] 
    },
    "milf:stage/diamond_helmet": {
        stages: ["diamond_tools_and_armors_everywhere", "simplyswords_swords_everywhere"]
    },
    "milf:stage/apothic_enchanting_table": {
        stages: ["enchanted_book_everywhere"]
    },
    "milf:stage/bronze_plate": {
        stages: ["gems_everywhere"]
    },
    "milf:stage/netherite_loot": {
        stages: ["netherite_tools_and_armors_everywhere", "netherite_scrap_everywhere"]
    },
    "milf:stage/gate_pearl": {
        stages: ["simplyswords_uniques_swords_everywhere", "any_tools_and_armors_everywhere"]
    },
    "milf:stage/flint_and_steel": {
        stages: ["the_nether_access"]
    },
    "milf:stage/portal_block": {
        stages: ["void_access"]
    },
    "milf:stage/deeper_down_access": {
        stages: ["deeper_down_access"]
    },
    "milf:stage/the_end": {
        stages: ["the_end_access"]
    },
    "milf:stage/crimson_veil_elixir": {
        stages: ["crimson_veil_accses"]
    },
    "milf:stage/augmenting_table": {
        stages: ["apotheosis_augmenting_table"]
    },
    "milf:stage/reforging_table": {
        stages: ["apotheosis_reforging_table"]
    },
    "milf:stage/simple_reforging_table": {
        stages: ["apotheosis_simple_reforging_table"]
    },
    "milf:radial/xaeromap": {
        stages: ["xaeromap"]
    },
    "milf:stage/salis_mundus": {
        stages: ["thaumaturge_mobs"]
    }

}).forEach(([questId, data]) => {

    let { stages } = data

    EmbersQuestingEvents.customReward(questId, event => {
        addStagesToTeamMembers(event.player, stages)
    })
})

// simple_stage_rewards.forEach(entry => {
//     EmbersQuestingEvents.customReward(entry.id, event => {
//         addStagesToTeamMembers(event.player, entry.stage)
//     })
// })

function defaultMilestoneNotification(player, stage) {
    let server = player.server
    let teamManager = $FTBTeamsAPI.getManager()
    let team = teamManager.getTeamForPlayer(player).get()
    let teamMembers = team.getOnlineMembers()
    teamMembers.forEach(member => {
        sendImmersiveMessageWithSubtext(Text.translate('milf.stage.something_changed'), Text.translate(`milf.stage.${stage}`), member, DEFAULT_MILESTONE_NOTIFICATION_STYLE, DEFAULT_MILESTONE_SUBTEXT_STYLE, server)
        server.scheduleInTicks(DEFAULT_MILESTONE_SUBTEXT_STYLE.delay * 20, _ => {
            server.runCommandSilent(`/playsound immersiveengineering:spark ambient ${member.profile.name} ${member.x} ${member.y} ${member.z}`)
            member.tell(Text.translate(`milf.stage.${stage}`))
        })
    })
}

function addStagesToTeamMembers(player, stages) {

    let teamManager = $FTBTeamsAPI.getManager()

    let team = teamManager.getTeamForPlayer(player).get()
    let teamMembers = team.getOnlineMembers()
    stages = Array.isArray(stages) ? stages : [stages]

    teamMembers.forEach(member => {
        //console.log(member);
        for (const stage of stages) {
            AStages.addStageToPlayer(stage, member)
        }
    })

    syncTeamStages(player)
}
