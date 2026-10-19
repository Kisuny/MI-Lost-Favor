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

})


