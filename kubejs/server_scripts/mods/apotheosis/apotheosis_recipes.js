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

})


