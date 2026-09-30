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


    const runes = [
        'milf:rune_of_piercing',
        'milf:rune_of_armor',
        'milf:rune_of_bloodshed',
        'milf:rune_of_diversity',
        'milf:rune_of_fishing',
        'milf:rune_of_mining'
    ]


    customPedestalCraft(event, {
        time: 200,
        tier: "basic",
        experience: 2.0,
        citrine: 2,
        topaz: 4,
        pattern: [
            'www',
            'www',
            'q  '
        ],
        key: {
            q: 'milf:rune_of_diversity',
            w: 'minecraft:book'
        },
        result: {
            "id": "apothic_enchanting:other_tome",
            "count": 6
        },
        advancement: "spectrum:craft_cmy_pedestal",
        yield_upgrades: true,
        removeRecipe: true
    })

    customPedestalCraft(event, {
        time: 200,
        tier: "basic",
        experience: 2.0,
        citrine: 2,
        topaz: 4,
        pattern: [
            '  q',
            ' ew',
            'e w'
        ],
        key: {
            q: 'milf:rune_of_fishing',
            w: 'minecraft:book',
            e: "minecraft:stick"
        },
        result: {
            "id": "apothic_enchanting:fishing_tome",
            "count": 2
        },
        advancement: "spectrum:craft_cmy_pedestal",
        yield_upgrades: true,
        removeRecipe: true
    })
    customPedestalCraft(event, {
        time: 200,
        tier: "basic",
        experience: 2.0,
        citrine: 2,
        topaz: 4,
        pattern: [
            'www',
            ' q ',
            ' e '
        ],
        key: {
            q: 'milf:rune_of_mining',
            w: 'minecraft:book',
            e: "minecraft:stick"
        },
        result: {
            "id": "apothic_enchanting:pickaxe_tome",
            "count": 3
        },
        advancement: "spectrum:craft_cmy_pedestal",
        yield_upgrades: true,
        removeRecipe: true
    })
    customPedestalCraft(event, {
        time: 200,
        tier: "basic",
        experience: 2.0,
        citrine: 2,
        topaz: 4,
        pattern: [
            ' ew',
            'q w',
            ' ew'
        ],
        key: {
            q: 'milf:rune_of_piercing',
            w: 'minecraft:book',
            e: "minecraft:stick"
        },
        result: {
            "id": "apothic_enchanting:bow_tome",
            "count": 3
        },
        advancement: "spectrum:craft_cmy_pedestal",
        yield_upgrades: true,
        removeRecipe: true
    })
    customPedestalCraft(event, {
        time: 200,
        tier: "basic",
        experience: 2.0,
        citrine: 2,
        topaz: 4,
        pattern: [
            ' w ',
            ' w ',
            ' q '
        ],
        key: {
            q: 'milf:rune_of_bloodshed',
            w: 'minecraft:book'
        },
        result: {
            "id": "apothic_enchanting:weapon_tome",
            "count": 2
        },
        advancement: "spectrum:craft_cmy_pedestal",
        yield_upgrades: true,
        removeRecipe: true
    })
    customPedestalCraft(event, {
        time: 200,
        tier: "basic",
        experience: 2.0,
        citrine: 2,
        topaz: 4,
        pattern: [
            'www',
            'wqw',
            '   '
        ],
        key: {
            q: 'milf:rune_of_armor',
            w: 'minecraft:book'
        },
        result: {
            "id": "apothic_enchanting:helmet_tome",
            "count": 5
        },
        advancement: "spectrum:craft_cmy_pedestal",
        yield_upgrades: true,
        removeRecipe: true
    })
    customPedestalCraft(event, {
        time: 200,
        tier: "basic",
        experience: 2.0,
        citrine: 2,
        topaz: 4,
        pattern: [
            'wqw',
            'www',
            'www'
        ],
        key: {
            q: 'milf:rune_of_armor',
            w: 'minecraft:book'
        },
        result: {
            "id": "apothic_enchanting:chestplate_tome",
            "count": 8
        },
        advancement: "spectrum:craft_cmy_pedestal",
        yield_upgrades: true,
        removeRecipe: true
    })
    customPedestalCraft(event, {
        time: 200,
        tier: "basic",
        experience: 2.0,
        citrine: 2,
        topaz: 4,
        pattern: [
            'www',
            'wqw',
            'w w'
        ],
        key: {
            q: 'milf:rune_of_armor',
            w: 'minecraft:book'
        },
        result: {
            "id": "apothic_enchanting:leggings_tome",
            "count": 7
        },
        advancement: "spectrum:craft_cmy_pedestal",
        yield_upgrades: true,
        removeRecipe: true
    })
    customPedestalCraft(event, {
        time: 200,
        tier: "basic",
        experience: 2.0,
        citrine: 2,
        topaz: 4,
        pattern: [
            'wqw',
            'w w',
            '   '
        ],
        key: {
            q: 'milf:rune_of_armor',
            w: 'minecraft:book'
        },
        result: {
            "id": "apothic_enchanting:boots_tome",
            "count": 4
        },
        advancement: "spectrum:craft_cmy_pedestal",
        yield_upgrades: true,
        removeRecipe: true
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


