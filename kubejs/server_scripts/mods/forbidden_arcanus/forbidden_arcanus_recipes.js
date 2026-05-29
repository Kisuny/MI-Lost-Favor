ServerEvents.recipes(event => {

    const removing_by_recipe_id = [
    ]

    removing_by_recipe_id.forEach(id => {
        event.remove({ id: id })
    });

    event.remove({
        output: [
            "forbidden_arcanus:mundabitur_dust",
            "forbidden_arcanus:clibano_core",
        ]
    })

    event.shapeless(Item.of("forbidden_arcanus:mundabitur_dust", 4), [
        "minecraft:gunpowder",
        "minecraft:phantom_membrane",
        "minecraft:bone_meal",
        "forbidden_arcanus:arcane_crystal_dust",
        "minecraft:redstone",
        "minecraft:blaze_powder",
        "occultism:echo_dust",
    ]);

    customPedestalCraft(event, {
        tier: "advanced", onyx: 8, citrine: 32, time: 600, experience: 8.0, yield_upgrades: true,
        pattern: [
            'qqq',
            'qwq',
            'qqq'
        ],
        key: {
            q: 'forbidden_arcanus:darkstone',
            w: 'minecraft:blast_furnace'
        },
        result: {
            "id": "forbidden_arcanus:clibano_core",
            "count": 1
        },
        advancement: "spectrum:create_onyx_shard"
    })
    customPedestalCraft(event, {
        tier: "simple", citrine: 12, topaz: 48, time: 600, experience: 8.0, yield_upgrades: true,
        pattern: [
            'rqr',
            'rwr',
            'rer'
        ],
        key: {
            q: 'companions:relic_gold',
            w: 'eidolon_repraised:unholy_symbol',
            e: 'minecraft:netherite_block',
            r: 'forbidden_arcanus:obsidiansteel_ingot'
        },
        result: {
            "id": "forbidden_arcanus:maledictus_pact",
            "count": 1
        },
        advancement: "spectrum:craft_cmy_pedestal"
    })

    const addAdditionItemInShapelessPairs = [
        ["forbidden_arcanus:corrupti_dust", "spectrum:onyx_powder"],
    ]


    addAdditionItemInShapelessPairs.forEach(([output, newItem]) => {
        event.forEachRecipe({ output: output }, recipe => {

            const rJSON = JSON.parse(recipe.json)
            const ingredients = rJSON.ingredients
            const result = rJSON.result

            ingredients.push({ item: newItem })
            const inputItems = ingredients.map(ingredient => [ingredient])

            milfShapeless(event, {
                inputItems: inputItems,
                outputItems: [[{ id: result.id }]],
                removeRecipe: true
            })
        })
    })

});