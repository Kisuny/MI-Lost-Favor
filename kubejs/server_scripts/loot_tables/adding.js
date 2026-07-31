LootJS.modifiers(event => {


    const structuresLootTable = {
        common: [
            /.*:chests\/village\/.*/,
            /.*:village\/.*/,
            /spectrum:chests\/.*/,
            /dungeons_arise:chests\/.*/,
            /dungeons_arise_seven_seas:chests\/.*/,
            'minecraft:chests/shipwreck_supply',
            'artifacts:chests/campsite_barrel',
            'artifacts:chests/campsite_chest',
            'terralith:ruin/glacial/junk',
            'terralith:spire/common',
            'terralith:spire/junk',
            /mvs:.*/,
            /kaisyn:.*/,
            /the_bumblezone:structures\/.*/,
            'friendsandfoes:barrels/illusioner_shack_attic',
            'betterstrongholds:chests/common'
        ],
        rare: [
            /.*:chests\/stronghold_.*/,
            /.*:chests\/underwater_ruin_.*/,
            'minecraft:chests/ruined_portal',
            'minecraft:chests/bastion_other',
            'minecraft:chests/bastion_bridge',
            'minecraft:chests/nether_bridge',
            'minecraft:chests/simple_dungeon',
            'terralith:ruin/glacial/main_cs',
            'terralith:spire/rare',
            'terralith:underground/chest',
            'mvs:cartographer_tower',
            'mvs:cathedral_rare',
            'mvs:houses_rare',
            'mvs:large_carts',
            'mvs:large_carts_2',
            'mvs:jungle_tower',
            'mvs:rare',
            'dungeons_arise:chests/abandoned_temple/abandoned_temple_map',
            'dungeons_arise:chests/aviary/aviary_normal',
            'friendsandfoes:barrels/illusioner_shack_basement',
            'betterstrongholds:chests/prison_lg',
            'betterstrongholds:chests/grand_library',
            'underground_bunkers:chests/underground_bunker/underground_bunker_normal',
        ],
        epic: [
            /.*chests\/.*treasure.*$/,
            /.*spire\/treasure$/,
            'betterstrongholds:chests/trap',
            'betterstrongholds:chests/crypt',
            'betterstrongholds:chests/armoury',
            'betterstrongholds:chests/library_md',
            'minecraft:chests/abandoned_mineshaft',
            'minecraft:chests/pillager_outpost',
            'minecraft:chests/jungle_temple',
            'minecraft:chests/desert_pyramid',
            'minecraft:chests/woodland_mansion',
            'mvs:crystal',
            'probablychests:chests/gold_pc_chests',
            'dungeons_arise:chests/abandoned_temple/abandoned_temple_top',
            'friendsandfoes:chests/illusioner_shack',
            'rottencreatures:entities/dead_beard',
            'rottencreatures:entities/immortal',
            'minecraft:chests/igloo_chest',
            'minecraft:chests/ancient_city',
            'mansions:mansion_treasure'
        ],
        //Not yet used 
        mines_pools: [
            /dungeons_arise:chests\/mushroom_mines\/mushroom_mines_.*/,
            /dungeons_arise:chests\/scorched_mines\/scorched_mines_.*/,
            /dungeons_arise:chests\/mines_treasure_.*/,
            'minecraft:chests/village/village_weaponsmith',
            'minecraft:chests/village/village_toolsmith',
            'minecraft:chests/village/village_armorer',
            'betterstrongholds:chests/mess',
            'underground_bunkers:chests/underground_bunker/underground_bunker_supply'
        ]
    }

    // devices loot addons for ALL chest loot tables
    const devicesLootTiers = { tier1: 0.2, tier2: 0.1, tier3: 0.05 }

    Object.entries(devicesLootTiers).forEach(([tier, chance]) => {
        // regex excludes archaeology tables (e.g. minecraft:archaeology/desert_pyramid), which don't contain "chests/" in their id
        event.addTableModifier(/.*chests\/.*/).pool(pool => {
            pool.when(c => c.randomChance(chance))
            pool.addEntry(LootEntry.reference(`devices:loot_addons/chest/${tier}`))
        })
    })

    // Any loot table that already rolls an iron/gold ingot
    // gets a chance to also drop raw_tin/raw_copper
    const ironOrGoldFilter = ItemFilter.anyOf(
        ItemFilter.item("minecraft:iron_ingot", false),
        ItemFilter.item("minecraft:gold_ingot", false),
    )

    const oreAddonLootTypes = [LootType.CHEST, LootType.ENTITY, LootType.FISHING, LootType.ARCHAEOLOGY, LootType.VAULT, LootType.GIFT, LootType.PIGLIN_BARTER, LootType.GENERIC]

    oreAddonLootTypes.forEach(type => {
        event.addTableModifier(type).group(group => {
            group.containsLoot(ironOrGoldFilter)
            group.pool(pool => {
                pool.when(c => c.randomChance(0.3))
                pool.addEntry(LootEntry.of("modern_industrialization:raw_tin", [1, 10]))
            })
            group.pool(pool => {
                pool.when(c => c.randomChance(0.3))
                pool.addEntry(LootEntry.of("minecraft:raw_copper", [1, 10]))
            })
        })
    })

    structuresLootTable.common.forEach(table => {
        event
            .addTableModifier(table)
            .pool((pool) => {
                pool.when(conditions => {
                    conditions.randomChance(0.05)
                })
                pool.addEntry(LootEntry.of("milf:rune_of_piercing"))
                pool.addEntry(LootEntry.of("milf:rune_of_armor"))
                pool.addEntry(LootEntry.of("milf:rune_of_bloodshed"))
                pool.addEntry(LootEntry.of("milf:rune_of_diversity"))
                pool.addEntry(LootEntry.of("milf:rune_of_fishing"))
                pool.addEntry(LootEntry.of("milf:rune_of_mining"))
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
            })
            .pool((pool) => {
                pool.when(conditions => {
                    conditions.randomChance(0.05)
                })
                pool.addEntry(LootEntry.of("milf:amber_visage"))
                pool.addEntry(LootEntry.empty())
            })
            .pool((pool) => {
                pool.when(conditions => {
                    conditions.randomChance(0.05)
                })
                pool.addEntry(LootEntry.of("milf:transmutation_orb", [1, 3]))
                pool.addEntry(LootEntry.of("milf:regal_orb", [1, 3]))
                pool.addEntry(LootEntry.of("milf:divine_orb", [1, 3]))
                pool.addEntry(LootEntry.of("milf:orb_of_alchemy", [1, 3]))
                pool.addEntry(LootEntry.of("milf:orb_of_chance", [1, 3]))
                pool.addEntry(LootEntry.of("milf:orb_of_annulment", [1, 3]))
                pool.addEntry(LootEntry.of("milf:orb_of_regret", [1, 3]))
                pool.addEntry(LootEntry.of("milf:orb_of_corruption", [1, 3]))
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
            })
    });

    structuresLootTable.rare.forEach(table => {
        event
            .addTableModifier(table)
            .pool((pool) => {
                pool.when(conditions => {
                    conditions.randomChance(0.1)
                })
                pool.addEntry(LootEntry.of("milf:rune_of_piercing"))
                pool.addEntry(LootEntry.of("milf:rune_of_armor"))
                pool.addEntry(LootEntry.of("milf:rune_of_bloodshed"))
                pool.addEntry(LootEntry.of("milf:rune_of_diversity"))
                pool.addEntry(LootEntry.of("milf:rune_of_fishing"))
                pool.addEntry(LootEntry.of("milf:rune_of_mining"))
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
            })
            .pool((pool) => {
                pool.when(conditions => {
                    conditions.randomChance(0.1)
                })
                pool.addEntry(LootEntry.of("milf:amber_visage"))
            })
            .pool((pool) => {
                pool.when(conditions => {
                    conditions.randomChance(0.1)
                })
                pool.addEntry(LootEntry.of("milf:transmutation_orb", [1, 5]))
                pool.addEntry(LootEntry.of("milf:regal_orb", [1, 5]))
                pool.addEntry(LootEntry.of("milf:divine_orb", [1, 5]))
                pool.addEntry(LootEntry.of("milf:orb_of_alchemy", [1, 5]))
                pool.addEntry(LootEntry.of("milf:orb_of_chance", [1, 5]))
                pool.addEntry(LootEntry.of("milf:orb_of_annulment", [1, 5]))
                pool.addEntry(LootEntry.of("milf:orb_of_regret", [1, 5]))
                pool.addEntry(LootEntry.of("milf:orb_of_corruption", [1, 5]))
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
            })
    });

    structuresLootTable.epic.forEach(table => {
        event
            .addTableModifier(table)
            .pool((pool) => {
                pool.when(conditions => {
                    conditions.randomChance(0.3)
                })
                pool.addEntry(LootEntry.of("milf:rune_of_piercing", [1, 2]))
                pool.addEntry(LootEntry.of("milf:rune_of_armor", [1, 2]))
                pool.addEntry(LootEntry.of("milf:rune_of_bloodshed", [1, 2]))
                pool.addEntry(LootEntry.of("milf:rune_of_diversity", [1, 2]))
                pool.addEntry(LootEntry.of("milf:rune_of_fishing", [1, 2]))
                pool.addEntry(LootEntry.of("milf:rune_of_mining", [1, 2]))
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
            })
            .pool((pool) => {
                pool.when(conditions => {
                    conditions.randomChance(0.3)
                })
                pool.addEntry(LootEntry.of("milf:amber_visage"))
            })
            .pool((pool) => {
                pool.when(conditions => {
                    conditions.randomChance(0.1)
                })
                pool.addEntry(LootEntry.of("milf:recall_concoction"))
                pool.addEntry(LootEntry.of("milf:grecall_concoction_t1"))
                pool.addEntry(LootEntry.empty())
            })
            .pool((pool) => {
                pool.when(conditions => { 
                    conditions.randomChance(0.2)
                })
                pool.addEntry(LootEntry.of("milf:transmutation_orb", [2, 5]))
                pool.addEntry(LootEntry.of("milf:regal_orb", [2, 5]))
                pool.addEntry(LootEntry.of("milf:divine_orb", [2, 5]))
                pool.addEntry(LootEntry.of("milf:orb_of_alchemy", [2, 5]))
                pool.addEntry(LootEntry.of("milf:orb_of_chance", [2, 5]))
                pool.addEntry(LootEntry.of("milf:orb_of_annulment", [2, 5]))
                pool.addEntry(LootEntry.of("milf:orb_of_regret", [2, 5]))
                pool.addEntry(LootEntry.of("milf:orb_of_corruption", [2, 5]))
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
                pool.addEntry(LootEntry.empty())
            })
    });

    // CreeperOverhaul creepers drop creeper_heart when killed with arthana (same as vanilla creeper)
    const creeperOverhaulCreepers = [
        "creeperoverhaul:badlands_creeper",
        "creeperoverhaul:bamboo_creeper",
        "creeperoverhaul:beach_creeper",
        "creeperoverhaul:birch_creeper",
        "creeperoverhaul:cave_creeper",
        "creeperoverhaul:dark_oak_creeper",
        "creeperoverhaul:desert_creeper",
        "creeperoverhaul:dripstone_creeper",
        "creeperoverhaul:hills_creeper",
        "creeperoverhaul:jungle_creeper",
        "creeperoverhaul:mushroom_creeper",
        "creeperoverhaul:ocean_creeper",
        "creeperoverhaul:savannah_creeper",
        "creeperoverhaul:snowy_creeper",
        "creeperoverhaul:spruce_creeper",
        "creeperoverhaul:swamp_creeper",
    ]

    creeperOverhaulCreepers.forEach(creeper => {
        event.addEntityModifier(creeper).pool(pool => {
            pool.when(c => c.matchMainHand("enchanted:arthana").randomChanceWithEnchantment("minecraft:looting", [0.2, 0.4, 0.6, 0.8, 1.0, 1.0, 1.0, 1.0, 1.0]))
            pool.addEntry(LootEntry.of("enchanted:creeper_heart"))
        })
    })

    event.addTableModifier("spectrum:chests/ruined_pedestal_stone").addLoot("milf:old_tablet")
    event.addTableModifier("spectrum:chests/ruined_pedestal_deepslate").addLoot("milf:old_tablet")
    event.addTableModifier("spectrum:chests/ancient_ruins_main").addLoot("milf:old_diary").setCount([1, 1])
    event.addTableModifier("spectrum:chests/city_below/moonstone_temple_roof_ridge").addLoot("milf:holy_book_of_color").setCount([1, 1])

    const blaze_core_bosses = [
        "companions:sacred_pontiff",
        "mythsandlegends:black_charro",
        "mowziesmobs:umvuthi",
        "mowziesmobs:frostmaw",
        "mowziesmobs:ferrous_wroughtnaut",
        "cataclysm:amethyst_crab",
    ]

    const electronic_ender_core_bosses = [
        "bosses_of_mass_destruction:gauntlet",
        "bosses_of_mass_destruction:lich",
        "bosses_of_mass_destruction:obsidilith",
        "bosses_of_mass_destruction:void_blossom",
        "fdbosses:geburah",
        "fdbosses:chesed",
        "fdbosses:malkuth",
    ]
    blaze_core_bosses.forEach(boss => {
        event.addEntityModifier(boss).addLoot("milf:blaze_core").matchMainHand("#c:tools/wrench").randomChance(0.5)
    });

    electronic_ender_core_bosses.forEach(boss => {
        event.addEntityModifier(boss).addLoot("milf:electronic_ender_core").matchMainHand("#c:tools/wrench").randomChance(0.5)
    });

    event.addEntityModifier("hexerei:crow").addLoot("eidolon_repraised:raven_feather").applyEnchantmentBonus("minecraft:looting", [0, 1])

    //Add items only if player is cursed from enigmatic legacy
    event.addEntityModifier([
        "minecraft:cat", 
        "minecraft:axolotl", 
        "cnb:lilytad", 
        "cnb:little_grebe", 
        "cnb:minipad", 
        "cnb:sporeling", 
        "crittersandcompanions:otter",
        "crittersandcompanions:dumbo_octopus",
        "crittersandcompanions:ferret",
        "crittersandcompanions:ladybug",
        "crittersandcompanions:red_panda",
        "crittersandcompanions:shima_enaga"
    ]).pool(pool => {
        pool.when(c => c.killedByPlayer().matchPlayerCustom(player => {
            const cursed = $EnigmaticHandler.isTheCursedOne(player)
            // console.log(`isCursed = ${cursed}`)
            return cursed
        }))
        pool.addEntry(LootEntry.of("milf:soul_of_the_helpless").applyEnchantmentBonus("minecraft:looting", [0, 1]))
    })



})