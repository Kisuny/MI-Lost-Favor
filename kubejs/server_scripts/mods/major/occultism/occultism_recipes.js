ServerEvents.recipes(event => {

    event.remove({
        output: [
            "occultism:raw_silver_block",
            "occultism:silver_ingot",
            "occultism:silver_block",
            "occultism:silver_nugget",
            "occultism:raw_silver",
        ]
    })
    event.replaceOutput({ output: 'occultism:netherite_dust' }, 'occultism:netherite_dust', 'extended_industrialization:netherite_dust')
    customAlchemicalForgeCraft(event, {
        affinities: [
            "toxony:moon",
            "toxony:soul",
            "toxony:wind"
        ],
        auxiliary: [
            {
                "item": "enchanted:spirit_of_otherwhere"
            },
            {
                "item": "neovitae:animus_mote"
            }
        ],
        main: {
            "tag": "c:seeds"
        },
        result: "occultism:datura_seeds"
    })


    event.replaceInput({ output: "occultism:spirit_attuned_gem" }, "occultism:spirit_attuned_gem", "eidolon_repraised:soul_shard")

    const addAdditionItemInShapelessPairs = [
        ["occultism:chalk_yellow_impure", "modern_industrialization:bronze_dust"],
        ["occultism:chalk_orange_impure", "modern_industrialization:bronze_dust"],
        ["occultism:chalk_purple_impure", "modern_industrialization:battery_alloy_dust"],
        ["occultism:chalk_light_blue_impure", "modern_industrialization:aluminum_dust"],
        ["occultism:chalk_black_impure", "modern_industrialization:steel_dust"],
        ["occultism:chalk_magenta_impure", "modern_industrialization:titanium_dust"],
        ["occultism:chalk_cyan_impure", "modern_industrialization:carbon_steel_dust"],
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

   
    milfShaped(event, {
        pattern: [
            " FF",
            "FS#",
            "S  "
        ],
        key: {
            S: { item: "minecraft:stick" },
            F: { item: `modern_industrialization:iron_plate` },
            "#": { tag: "c:hammers" },
        },
        outputItems: [[{ id: `occultism:butcher_knife` }, 1]],
        removeRecipe: true
    })
    
})


KubeJSTweaks.beforeRecipes(event => {

    const disableByRecipeID = [
        "occultism:blasting/netherite_ingot_from_dust",
        "occultism:blasting/iron_ingot_from_dust",
        "occultism:blasting/gold_ingot_from_dust",
        "occultism:blasting/copper_ingot_from_dust",

        "occultism:smelting/netherite_ingot_from_dust",
        "occultism:smelting/silver_ingot_from_ore",
        "occultism:smelting/silver_ingot_from_dust",
        "occultism:smelting/silver_ingot_from_raw",
        "occultism:smelting/gold_ingot_from_dust",
        "occultism:smelting/iron_ingot_from_dust",
        "occultism:smelting/copper_ingot_from_dust"
    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })


})