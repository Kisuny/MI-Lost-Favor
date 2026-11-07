Object.entries({

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
    "milf:milestone/steel_ingot": {
        stages: ["early_items", "blast_furnace", "mythsandlegends_mobs"]
    },
    "milf:milestone/forge_hammer": {
        stages: ["minecraft_mobs", "variants_and_ventures_mobs", "creeperoverhaul_mobs", "endermanoverhaul_mobs", "legendary_monsters_mobs", "darkerdepths_mobs"],
        defaultNotificationDelay: 10.5,
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

    let { stages, callback, defaultNotificationDelay } = data

    EmbersQuestingEvents.customReward(questId, event => {
        if (stages) {
            let player = event.player
            addStagesToTeamMembers(player, stages)
            if (defaultNotificationDelay) {
                player.server.scheduleInTicks(defaultNotificationDelay * 20 | 0, _ => defaultMilestoneNotification(player, stages[0]))
            } else {
                defaultMilestoneNotification(player, stages[0])
            }
        }

        if(callback) callback(event)
    })
})

Object.entries({

    //#region block restrictions

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

    "milf:stage/iron_blocks": {
        stages: ["iron_blocks"]
    },

    "milf:stage/everburning_roots": {
        stages: ["everburning_roots"]
    },

    //#endregion

    //#region ore restrictions

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

    "milf:stage/wip_ores": {
        stages: ["monazite_ore", "titanium_ore", "platinum_ore", "tungsten_ore", "iridium_ore"]
    },

    // "milf:stage/titanium_ore": {
    //     stages: ["titanium_ore"]
    // },

    // "milf:stage/platinum_ore": {
    //     stages: ["platinum_ore"]
    // },

    // "milf:stage/tungsten_ore": {
    //     stages: ["tungsten_ore"]
    // },

    // "milf:stage/iridium_ore": {
    //     stages: ["iridium_ore"]
    // },

    //#endregion

    //#region item restrictions

    "milf:stage/iron_items_1": {
        stages: ["iron_items_1"]
    },

    //#endregion

    //#region what?

    "milf:stage/iron_anvil": {
        stages: ["iron_items_2","goblin_traders_mobs"]
    },

    "milf:stage/iron_ingot_loot": {
        stages: [ "enigmaticlegacyplus_everywhere", "relics_everywhere"] 
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

    //#endregion

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
