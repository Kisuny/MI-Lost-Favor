function cuttingBoardRecipe(/**@type {$RecipesKubeEvent_}*/ event, args){
    let ingredients = []
    args.inputItems.forEach(item => { ingredients.push(Object.assign({}, item[0], { count: item[1] || 1 })) })
    let result = []
    args.outputItems.forEach(item => { result.push({item : Object.assign({}, item[0], { count: item[1] || 1 })}) })
    let recipe = {
        type: "farmersdelight:cutting",
        tool: args.tool || { tag: "c:tools/knife"},
        ingredients: ingredients,
        result: result,
    }
    if (!args.compatOff) {
        miMachineCraft(event, {
            energy: 2, time: 200, machine: "modern_industrialization:cutting_machine",
            inputItems: args.inputItems,
            inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
            outputItems: args.outputItems
        })
    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    const materials = ["diamond", "iron", "gold"];

    materials.forEach(material => {
        const outputId = material === "gold"
            ? "farmersdelight:golden_knife"
            : `farmersdelight:${material}_knife`;

        yTechShaped(event, {
            pattern: [
                "#d ",
                " s ",
                "   ",
            ],
            key: {
                "#": { "tag": "c:files" },
                "s": { "item": "minecraft:stick" },
                "d": { "item": `modern_industrialization:${material}_plate` },
            },
            outputItems: [[{ id: outputId }, 1]],
            removeRecipeType: "minecraft:crafting_shaped"
        });
    });

    event.shapeless('farmersdelight:wheat_dough', [
        'minecraft:wheat',
        'ytech:water_clay_bucket'
    ]).keepIngredient('ytech:water_clay_bucket').id('milf:wheat_dough_from_water_clay_bucket')
    
    event.shapeless('farmersdelight:wheat_dough', [
        'minecraft:wheat',
        'minecraft:water_bucket'
    ]).keepIngredient('minecraft:water_bucket').id('milf:wheat_dough_from_water_bucket')

    cuttingBoardRecipe(event, {
        inputItems: [[{ item: "minecraft:quartz_block" }, 1]],
        outputItems: [[{ id: "minecraft:quartz" }, 2]],
        removeRecipeType: "farmersdelight:cutting",
        tool: { tag: "minecraft:pickaxes" },
        compatOff: true
    })

    milfShaped(event, {
        pattern: [
            'PBP',
            'BPB',
            'PBP'
        ],
        key: {
            P: { item: "ytech:wooden_plate" },
            B: { item: "modern_industrialization:copper_bolt" },
        },
        outputItems: [[{ id: "farmersdelight:cutting_board" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'BSB',
            'P P',
            'PPP'
        ],
        key: {
            S: { item: "minecraft:wooden_shovel" },
            B: { item: "minecraft:brick" },
            P: { item: "modern_industrialization:iron_plate" },
        },
        outputItems: [[{ id: "farmersdelight:cooking_pot" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            ' PL',
            ' BP',
            'B  '
        ],
        key: {
            B: { item: "minecraft:brick" },
            L: { item: "modern_industrialization:iron_large_plate" },
            P: { item: "modern_industrialization:iron_plate" },
        },
        outputItems: [[{ id: "farmersdelight:skillet" }, 1]],
        removeRecipe: true
    })

    event.forEachRecipe({ output: "#farmersdelight:cabinets", input: "#minecraft:wooden_slabs"}, recipe => {        
        transformShapedRecipe(event, recipe, 
            originalPattern => {
                originalPattern[1] = originalPattern[1].replace(" ", "B")
                return originalPattern
            },
            originalKey => {
                originalKey.B = { item: "ytech:wooden_box" }
                return originalKey
            }
        )
    })

    transformShapedRecipesForAll(
        event,
        [
            "farmersdelight:wooden_basket", 
            "farmersdelight:bamboo_basket", 
            "eidolon_edoni:illwood_cabinet",
            "eidolon_edoni:polished_cabinet"

        ], 
        originalPattern => {
            originalPattern[1] = originalPattern[1].replace(" ", "B")
            return originalPattern
        },
        originalKey => {
            originalKey.B = { item: "ytech:wooden_box" }
            return originalKey
        }
    )

    // event.forEachRecipe({ or: [{ output: "farmersdelight:wooden_basket" }, { output: "farmersdelight:bamboo_basket" }] }, recipe => {
    //     transformShapedRecipe(event, recipe,
    //         originalPattern => {
    //             originalPattern[1] = originalPattern[1].replace(" ", "B")
    //             return originalPattern
    //         },
    //         originalKey => {
    //             originalKey.B = { item: "ytech:wooden_box" }
    //             return originalKey
    //         }
    //     )
    // })

})

