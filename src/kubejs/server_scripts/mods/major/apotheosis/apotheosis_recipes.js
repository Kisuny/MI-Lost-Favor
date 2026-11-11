ServerEvents.recipes(event => {
    event.remove({
        output: [
            'apotheosis:potion_charm',
            'apothic_enchanting:flimsy_ender_lead',
            'apothic_enchanting:ender_lead',
            'apothic_enchanting:occult_ender_lead',
            "apothic_enchanting:scrap_tome",
            "apothic_enchanting:improved_scrap_tome",
            "apothic_enchanting:extraction_tome",
            "apothic_enchanting:ender_library",
            "apothic_enchanting:library",
            "apotheosis:simple_reforging_table",
            "apotheosis:reforging_table",
            "apotheosis:augmenting_table",
        ]
    })


    const tomeRecipes = [
        {
            tome: 'other_tome', count: 6, rune: 'milf:rune_of_diversity', crystals: { ordo: 1, perditio: 1 },
            pattern: ['www', 'www', 'q  ']
        },
        {
            tome: 'fishing_tome', count: 2, rune: 'milf:rune_of_fishing', crystals: { aqua: 2 },
            pattern: ['  q', ' ew', 'e w']
        },
        {
            tome: 'pickaxe_tome', count: 3, rune: 'milf:rune_of_mining', crystals: { terra: 2 },
            pattern: ['www', ' q ', ' e ']
        },
        {
            tome: 'bow_tome', count: 3, rune: 'milf:rune_of_piercing', crystals: { aer: 2 },
            pattern: [' ew', 'q w', ' ew']
        },
        {
            tome: 'weapon_tome', count: 2, rune: 'milf:rune_of_bloodshed', crystals: { ignis: 1, perditio: 1 },
            pattern: [' w ', ' w ', ' q ']
        },
        {
            tome: 'helmet_tome', count: 5, rune: 'milf:rune_of_armor', crystals: { terra: 1, ordo: 1 },
            pattern: ['www', 'wqw', '   ']
        },
        {
            tome: 'chestplate_tome', count: 8, rune: 'milf:rune_of_armor', crystals: { terra: 1, ordo: 1 },
            pattern: ['wqw', 'www', 'www']
        },
        {
            tome: 'leggings_tome', count: 7, rune: 'milf:rune_of_armor', crystals: { terra: 1, ordo: 1 },
            pattern: ['www', 'wqw', 'w w']
        },
        {
            tome: 'boots_tome', count: 4, rune: 'milf:rune_of_armor', crystals: { terra: 1, ordo: 1 },
            pattern: ['wqw', 'w w', '   ']
        },
    ]

    tomeRecipes.forEach(tome => {
        customThaumArcaneCraft(event, {
            pattern: tome.pattern,
            key: Object.entries({ q: tome.rune, w: 'minecraft:book', e: 'minecraft:stick' })
                .filter(([k]) => tome.pattern.some(row => row.includes(k)))
                .reduce((key, [k, v]) => { key[k] = v; return key }, {}),
            crystals: tome.crystals,
            vis: 5,
            research: 'thaumaturge:unlock_infusion',
            result: { id: `apothic_enchanting:${tome.tome}`, count: tome.count },
            id: `thaumaturge:arcane_workbench/${tome.tome}`,
            removeOutput: true
        })
    })

    milfShaped(event, {
        pattern: [
            "OSN",
            "SCS",
            "NSO"
        ],
        key: {
            C: { item: "minecraft:cobweb" },
            S: { item: "minecraft:prismarine_shard" },
            N: { item: "spectrum:moonstruck_nectar" },
            O: { item: "spectrum:onyx_powder" }
        },
        outputItems: [[{ id: "apothic_enchanting:prismatic_web" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "PPP",
            "SCS",
            "WWW"
        ],
        key: {
            C: { item: "modern_industrialization:forge_hammer" },
            P: { item: "modern_industrialization:steel_large_plate" },
            S: { item: "apotheosis:gem_dust" },
            W: { item: "embers:sealed_planks" }
        },
        outputItems: [[{ id: "apotheosis:salvaging_table" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "PPP",
            "WSW",
            "WWW"
        ],
        key: {
            P: { item: "milf:steel_infused_glass" },
            S: { item: "apotheosis:gem_dust" },
            W: { item: "embers:sealed_planks" }
        },
        outputItems: [[{ id: "apotheosis:gem_case" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "PPP",
            "WSW",
            "W W"
        ],
        key: {
            P: { item: "modern_industrialization:steel_large_plate" },
            S: { item: "apotheosis:gem_dust" },
            W: { item: "embers:sealed_planks" }
        },
        outputItems: [[{ id: "apotheosis:gem_cutting_table" }, 1]],
        removeRecipe: true
    })

    pedestalFromRecipe(event, {
        id: "apothic_enchanting:hellshelf",
        replace: [
            { from: "#c:bookshelves", to: "apothic_enchanting:seashelf" }
        ],
        tier: "advanced",
        time: 200,
        citrine: 8,
        topaz: 8,
        onyx: 4,
        experience: 4.0,
        advancement: "spectrum:create_onyx_shard"
    });
    pedestalFromRecipe(event, {
        id: "apothic_enchanting:sightshelf",
        tier: "advanced",
        time: 200,
        citrine: 8,
        topaz: 8,
        onyx: 4,
        experience: 4.0,
        advancement: "spectrum:create_onyx_shard"
    });
    pedestalFromRecipe(event, {
        id: "apothic_enchanting:beeshelf",
        tier: "advanced",
        time: 200,
        citrine: 8,
        topaz: 8,
        onyx: 4,
        experience: 4.0,
        advancement: "spectrum:create_onyx_shard"
    });
    pedestalFromRecipe(event, {
        id: "apothic_enchanting:geode_shelf",
        tier: "advanced",
        time: 200,
        citrine: 16,
        topaz: 16,
        amethyst: 16,
        onyx: 12,
        experience: 4.0,
        advancement: "spectrum:create_onyx_shard"
    });

    customEnchantingApparatusCraft(event, {
        reagent: { "tag": "c:bookshelves" },
        pedestalItems: [
            { "item": "malum:refined_brilliance" },
            { "item": "malum:refined_brilliance" },
            { "item": "malum:refined_brilliance" },
            { "item": "minecraft:cracked_deepslate_tiles" },
            { "item": "minecraft:cracked_deepslate_tiles" },
            { "item": "minecraft:cracked_deepslate_tiles" },
        ],
        output: "apothic_enchanting:dormant_deepshelf",
        amount: 1,
        sourceCost: 1000,
        keepNbtOfReagent: false,
        removeRecipe: true
    });
    customEnchantingApparatusCraft(event, {
        reagent: { "item": "milf:miasma_orb" },
        pedestalItems: [
            { "item": "eidolon_repraised:shadow_gem" },
            { "item": "eidolon_repraised:shadow_gem" },
            { "item": "apothic_enchanting:deepshelf" },
            { "item": "apothic_enchanting:deepshelf" },
            { "item": "spectrum:midnight_chip" },
            { "item": "thaumaturge:primordial_pearl" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "malum:hallowed_gold_ingot" },
        ],
        output: "apothic_enchanting:treasure_shelf",
        amount: 1,
        sourceCost: 5000,
        keepNbtOfReagent: false,
        removeRecipe: true
    });
    customEnchantingApparatusCraft(event, {
        reagent: { "item": "malum:prismatic_focus_lens" },
        pedestalItems: [
            { "item": "apothic_enchanting:infused_seashelf" },
            { "item": "apothic_enchanting:infused_seashelf" },
            { "item": "sophisticatedstorage:advanced_filter_upgrade" },
            { "item": "minecraft:prismarine_bricks" },
            { "item": "minecraft:prismarine_bricks" },
            { "item": "malum:cthonic_gold_fragment" },
            { "item": "malum:cthonic_gold_fragment" },
        ],
        output: "apothic_enchanting:filtering_shelf",
        amount: 1,
        sourceCost: 1000,
        keepNbtOfReagent: false,
        removeRecipe: true
    });

    customThaumArcaneCraft(event, {
        pattern: [
            "GNG",
            "SES",
            "SSS"
        ],
        key: {
            G: 'apotheosis:gem_dust',
            N: 'thaumaturge:nugget_void',
            E: 'apotheosis:gem_fused_slate',
            S: 'apotheosis:spawner_chain'
        },
        crystals: { ordo: 1, perditio: 1 },
        vis: 20,
        research: 'thaumaturge:base_eldritch',
        result: { id: 'apotheosis:spawner_rune', count: 1 },
        id: 'thaumaturge:arcane_workbench/spawner_rune',
        removeOutput: true
    })

    const spawnerRunes = [
        { rune: 'frontier_spawner_upgrade_rune', vis: 25, crystals: { terra: 1, ordo: 1 } },
        { rune: 'ascent_spawner_upgrade_rune', vis: 40, crystals: { terra: 2, ordo: 2 } },
        { rune: 'summit_spawner_upgrade_rune', vis: 60, crystals: { terra: 2, ordo: 3, ignis: 2 } },
        { rune: 'pinnacle_spawner_upgrade_rune', vis: 100, crystals: { terra: 3, ordo: 4, ignis: 3, aer: 3 } },
        { rune: 'spawn_range_spawner_rune', vis: 15, crystals: { aer: 2 } },
        { rune: 'redstone_control_spawner_rune', vis: 15, crystals: { ordo: 2 } },
        { rune: 'ignore_light_spawner_rune', vis: 15, crystals: { perditio: 2 } },
        { rune: 'silent_spawner_rune', vis: 15, crystals: { aer: 1, perditio: 1 } },
        { rune: 'youthful_spawner_rune', vis: 15, crystals: { aqua: 2 } },
        { rune: 'burning_spawner_rune', vis: 15, crystals: { ignis: 2 } },
        { rune: 'initial_health_spawner_rune', vis: 15, crystals: { perditio: 1, aqua: 1 } },
        { rune: 'no_ai_spawner_rune', vis: 40, crystals: { ordo: 2, perditio: 2 } },
        { rune: 'ignore_conditions_spawner_rune', vis: 40, crystals: { perditio: 3, ordo: 1 } },
        { rune: 'ignore_players_spawner_rune', vis: 40, crystals: { aer: 3, ordo: 1 } },
        { rune: 'echoing_spawner_rune', vis: 50, crystals: { aqua: 2, ordo: 2 } },
    ]
    spawnerRunes.forEach(r => {
        arcaneFromRecipe(event, {
            id: `apotheosis:${r.rune}`,
            vis: r.vis,
            crystals: r.crystals,
            research: 'thaumaturge:base_eldritch'
        })
    })

    customThaumInfusion(event, {
        catalyst: 'apothic_enchanting:apothic_enchanting_table',
        components:
        [
            'minecraft:anvil',
            'thaumaturge:plate_thaumium',
            'thaumaturge:plate_thaumium',
            'apotheosis:gem_dust',
            'apotheosis:gem_dust',
            'apotheosis:mysterious_scrap_metal',
            'thaumaturge:stone_arcane_brick',
            'thaumaturge:stone_arcane_brick',
        ],
        aspects: { permutatio: 50, fabrico: 50, metallum: 25, praecantatio: 25 },
        instability: 10, 
        research: 'thaumaturge:infusion',
        result: 'apotheosis:simple_reforging_table',
        removeOutput: true,
    })

})


