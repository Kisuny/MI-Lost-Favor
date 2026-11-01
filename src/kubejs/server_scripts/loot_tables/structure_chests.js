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

    function addItems(pool, ids, count, empties) {
        ids.forEach(id => pool.addEntry(count ? LootEntry.of(id, count) : LootEntry.of(id)))
        for (let i = 0; i < empties; i++) pool.addEntry(LootEntry.empty())
    }

    structuresLootTable.common.forEach(table => {
        event
            .addTableModifier(table)
            .pool(pool => {
                pool.when(c => c.randomChance(0.05))
                addItems(pool, global.milfRunes, null, 3)
            })
            .pool(pool => {
                pool.when(c => c.randomChance(0.05))
                addItems(pool, ["milf:amber_visage"], null, 1)
            })
            .pool(pool => {
                pool.when(c => c.randomChance(0.05))
                addItems(pool, global.milfOrbs, [1, 3], 8)
            })
    })

    structuresLootTable.rare.forEach(table => {
        event
            .addTableModifier(table)
            .pool(pool => {
                pool.when(c => c.randomChance(0.1))
                addItems(pool, global.milfRunes, null, 4)
            })
            .pool(pool => {
                pool.when(c => c.randomChance(0.1))
                addItems(pool, ["milf:amber_visage"], null, 0)
            })
            .pool(pool => {
                pool.when(c => c.randomChance(0.1))
                addItems(pool, global.milfOrbs, [1, 5], 8)
            })
    })

    structuresLootTable.epic.forEach(table => {
        event
            .addTableModifier(table)
            .pool(pool => {
                pool.when(c => c.randomChance(0.3))
                addItems(pool, global.milfRunes, [1, 2], 4)
            })
            .pool(pool => {
                pool.when(c => c.randomChance(0.3))
                addItems(pool, ["milf:amber_visage"], null, 0)
            })
            .pool(pool => {
                pool.when(c => c.randomChance(0.1))
                addItems(pool, ["milf:recall_concoction", "milf:grecall_concoction_t1"], null, 1)
            })
            .pool(pool => {
                pool.when(c => c.randomChance(0.2))
                addItems(pool, global.milfOrbs, [2, 5], 8)
            })
    })

    event.addTableModifier("spectrum:chests/ruined_pedestal_stone").addLoot("milf:old_tablet")
    event.addTableModifier("spectrum:chests/ruined_pedestal_deepslate").addLoot("milf:old_tablet")
    event.addTableModifier("spectrum:chests/ancient_ruins_main").addLoot("milf:old_diary").setCount([1, 1])
    event.addTableModifier("spectrum:chests/city_below/moonstone_temple_roof_ridge").addLoot("milf:holy_book_of_color").setCount([1, 1])

})
