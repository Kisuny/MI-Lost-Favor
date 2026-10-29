function yTechShaped ( event, args) {
    let recipe = {
        type: "ytech:remaining_shaped_crafting",
        category: "misc",
        key: args.key,
        pattern: args.pattern,
        result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
    }
    if (!args.compatOff) {
        let itemInputs = getItemInputsFromYTechShaped(args)
        miMachineRecipe(event, {
            energy: 2, time: 200, machine: "modern_industrialization:assembler",
            inputItems: itemInputs,
            outputItems: [[{ item: recipe.result.id }, recipe.result.count]]
        })
    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
    event.custom(recipe)
}

function getItemInputsFromYTechShaped(args) {
    let itemInputs = []
    let patternString = args.pattern.join("")

    Object.entries(args.key).forEach(m => {
        //let regex = new RegExp(m[0],"g")
        if (m[0] == "#" || m[0] == "@") {
            if (m[1].tag == "c:hammers" || m[1].tag == "c:saws" || m[1].tag == "c:files") return
            itemInputs.push([m[1], (patternString.split(m[0])).length - 1, 0])
            return
        } 
        itemInputs.push([m[1], (patternString.split(m[0])).length - 1])
    })
    return itemInputs
}

function yTechShapeless(/**@type {$RecipesKubeEvent_}*/ event, args) {
    let ingredients = []
    args.inputItems.forEach(item => { ingredients.push(Object.assign({}, item[0], { count: item[1] || 1 })) })
    let recipe = {
        type: "ytech:remaining_shapeless_crafting",
        category: args.category || "misc",
        ingredients: ingredients,
        result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || args.outputItems[0][0].count || 1 }),
    }
    if (!args.compatOff) {
        miMachineRecipe(event, {
            energy: 2, time: 200, machine: "modern_industrialization:assembler",
            inputItems: args.inputItems,
            outputItems: [[{ item: recipe.result.id }, recipe.result.count]]
        })
    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    yTechShapeless(event, {
        outputItems: [[{ "id": "ytech:bronze_hoe" }, 1]],
        inputItems: [
            [{ "item": "minecraft:stick" }, 1],
            [{ "tag": "ytech:parts/hoe_heads/bronze" }, 1],
            [{ "tag": "c:hammers" }, 1],
        ],
        category: "equipment",
        removeRecipe: true
    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "ytech:lead_hoe" }, 1]],
        inputItems: [
            [{ "item": "minecraft:stick" }, 1],
            [{ "tag": "ytech:parts/hoe_heads/lead" }, 1],
            [{ "tag": "c:hammers" }, 1],
        ],
        category: "equipment",
        removeRecipe: true
    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "ytech:lead_hammer" }, 1]],
        inputItems: [
            [{ "item": "minecraft:stick" }, 1],
            [{ "item": "milf:lead_hammer_head" }, 1],
            [{ "tag": "c:hammers" }, 1],
        ],
        category: "equipment",
        removeRecipe: true
    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "ytech:bronze_hammer" }, 1]],
        inputItems: [
            [{ "item": "minecraft:stick" }, 1],
            [{ "item": "milf:bronze_hammer_head" }, 1],
            [{ "tag": "c:hammers" }, 1],
        ],
        category: "equipment",
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            'W#W',
            ' W ',
            '   '
        ],
        key: {
            W: { tag: "minecraft:planks" },
            "#": { tag: "milf:knives" }
        },
        outputItems: [[{ id: "minecraft:bowl" }, 3]],
        compatOff: true,
        removeRecipeType: "ytech:remaining_shaped_crafting" 
    })

    yTechShaped(event, {
        pattern: [
            ' N ',
            ' WB',
            '   '
        ],
        key: {
            W: { "tag": "c:leathers" },
            B: { "tag": "milf:knives" },
            N: { "tag": "ytech:bone_needles" }
        },
        outputItems: [[{ id: "ytech:leather_strips" }, 2]],
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            'BPB',
            'PPP',
            'BPB'
        ],
        key: {
            P: { "item": "ytech:wooden_plate" },
            B: { "item": "modern_industrialization:lead_bolt" },
        },
        outputItems: [[{ id: "ytech:brick_mold" }, 1]],
        removeRecipe: true
    })


    yTechShaped(event, {
        pattern: [
            ' T ',
            'TNT',
            ' T '
        ],
        key: {
            T: { "item": "ytech:grass_twine" },
            N: { "tag": "ytech:bone_needles" }
        },
        outputItems: [[{ id: "ytech:twine_mesh" }, 1]],
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            ' #R',
            ' R ',
            'S  '
        ],
        key: {
            R: { "item": "modern_industrialization:lead_rod" },
            S: { "item": "minecraft:stick" },
            "#": { "tag": "c:hammers" }
        },
        outputItems: [[{ id: "ytech:lead_file" }, 1]],
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            ' #R',
            ' R ',
            'S  '
        ],
        key: {
            R: { "item": "modern_industrialization:bronze_rod" },
            S: { "item": "minecraft:stick" },
            "#": { "tag": "c:hammers" }
        },
        outputItems: [[{ id: "ytech:bronze_file" }, 1]],
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            '  R',
            'BR ',
            'S  '
        ],
        key: {
            R: { "item": "modern_industrialization:lead_plate" },
            S: { "item": "minecraft:stick" },
            B: { "item": "ytech:wooden_bolt" }
        },
        outputItems: [[{ id: "ytech:lead_saw" }, 1]],
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            '  R',
            'BR ',
            'S  '
        ],
        key: {
            R: { "item": "modern_industrialization:bronze_plate" },
            S: { "item": "minecraft:stick" },
            B: { "item": "ytech:wooden_bolt" }
        },
        outputItems: [[{ id: "ytech:bronze_saw" }, 1]],
        removeRecipe: true
    })

    Object.entries({
        "modern_industrialization:bronze_rod": "modern_industrialization:bronze_bolt",
        "modern_industrialization:copper_rod": "modern_industrialization:copper_bolt",
        "modern_industrialization:gold_rod": "modern_industrialization:gold_bolt",
        "modern_industrialization:lead_rod": "modern_industrialization:lead_bolt",
        "modern_industrialization:tin_rod": "modern_industrialization:tin_bolt"
    }).forEach(([rod, bolt]) => {
        yTechShaped(event, {
            pattern: [
                '   ',
                '#  ',
                'S  '
            ],
            key: {
                "#": { "tag": "c:files" },
                S: { "item": rod },
            },
            outputItems: [[{ id: bolt }, 2]],
            compatOff: true
        })
    })

    yTechShaped(event, {
        pattern: [
            ' # ',
            '   ',
            ' S '
        ],
        key: {
            "#": { "tag": "minecraft:axes" },
            S: { "item": "minecraft:stick" }
        },
        outputItems: [[{ id: "ytech:wooden_bolt" }, 2]],
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            ' # ',
            '   ',
            ' S '
        ],
        key: {
            "#": { "tag": "c:saws" },
            S: { "item": "minecraft:stick" }
        },
        outputItems: [[{ id: "ytech:wooden_bolt" }, 4]],
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            ' ST',
            ' #S',
            '   '
        ],
        key: {
            "#": { "tag": "minecraft:axes" },
            T: { "item": "ytech:grass_twine" },
            S: { "tag": "milf:sticks" }
        },
        outputItems: [[{ id: "ytech:crafting_workspace" }, 1]],
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            '   ',
            'WBW',
            'WWW'
        ],
        key: {
            W: { tag: "minecraft:logs" },
            B: { item: "ytech:wooden_box" }
        },
        outputItems: [[{ id: "ytech:strainer" }, 1]],
        removeRecipe: true
    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "ytech:bronze_shovel" }, 1]],
        inputItems: [
            [{ "item": "minecraft:stick" }, 1],
            [{ "tag": "ytech:parts/shovel_heads/bronze" }, 1],
            [{ "tag": "c:hammers" }, 1],
        ],
        category: "equipment",
        removeRecipe: true

    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "ytech:lead_shovel" }, 1]],
        inputItems: [
            [{ "item": "minecraft:stick" }, 1],
            [{ "tag": "ytech:parts/shovel_heads/lead" }, 1],
            [{ "tag": "c:hammers" }, 1],
        ],
        category: "equipment",
        removeRecipe: true

    })



    event.replaceInput({ output: 'minecraft:leather' }, '#ytech:sharp_flints', '#milf:knives')
    event.replaceInput({ input: '#c:knives' }, '#c:knives', '#milf:knives')

    let replaceStick = [
        "ytech:flint_knife", 
        "ytech:flint_axe", "ytech:flint_spear", 
        "ytech:crafting_workspace",
        "ytech:divining_rod"
    ]

    replaceStick.forEach(output => {
        event.replaceInput({ input: 'minecraft:stick', output: output}, 'minecraft:stick', '#milf:sticks')
    })

    

    // event.custom({
    //     "type": "ytech:remaining_shapeless_crafting",
    //     "category": "misc",
    //     "ingredients": [
    //         { "tag": "c:bricks" },
    //         { "tag": "c:mortar_and_pestles" }
    //     ],
    //     "result": { "id": "modern_industrialization:brick_dust", "count": 1 }
    // })

    event.remove({ type: "map_atlases:crafting_atlas" })

    milfShaped(event, {
        pattern: [
            "QQ",
            "WW"
        ],
        key: {
            Q: { item: "immersiveengineering:hemp_fiber" },
            W: { item: "minecraft:stick" }
        },
        outputItems: [[{ id: "ytech:crafting_workspace" }, 2]],
        //removeRecipeType:"minecraft:crafting_shaped"
    })

    milfShaped(event, {
        pattern: [
            "FF",
            "FF"
        ],
        key: {
            F: { item: "supplementaries:flax" }
        },
        outputItems: [[{ id: "ytech:grass_twine" }, 2]],
        compatOff:true
    })

    milfShaped(event, {
        pattern: [
            "FF",
            "SS"
        ],
        key: {
            F: { item: "ytech:grass_fibers" },
            S: { item: "ytech:thatch_slab" }
        },
        outputItems: [[{ id: "ytech:grass_bed" }, 1]],
        removeRecipe:true
    })


    milfShaped(event, {
        pattern: [
            "FF",
            "FF"
        ],
        key: {
            F: { item: "ytech:grass_fibers" },
        },
        outputItems: [[{ id: "ytech:thatch" }, 1]],
        removeRecipe: true
    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "ytech:thatch_slab" }, 2]],
        inputItems: [
            [{ "item": "ytech:thatch" }, 1],
            [{ "tag": "ytech:sharp_flints" }, 1],
        ],
        compatOff:true
    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "ytech:shell_beads" }, 1]],
        inputItems: [
            [{ "item": "minecraft:nautilus_shell" }],
            [{ "item": "minecraft:nautilus_shell" }],
            [{ "item": "minecraft:string" }],
            [{ tag: "milf:knives" }],
        ],
        compatOff:true,
        removeRecipe: true
    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "minecraft:stick" }, 1]],
        inputItems: [
            [{ "item": "milf:twig" }],
            [{ tag: "milf:knives" }],
        ],
        compatOff: true
    })

    milfShaped(event, {
        pattern: [
            "F ",
            "S "
        ],
        key: {
            F: { item: "ytech:mammoth_tusk" },
            S: { tag: "milf:knives" }
        },
        outputItems: [[{ id: "ytech:venus_of_hohle_fels" }, 1]],
        removeRecipe:true
    })

    milfShaped(event, {
        pattern: [
            "F ",
            "S "
        ],
        key: {
            F: { item: "ytech:rhino_horn" },
            S: { tag: "milf:knives" }
        },
        outputItems: [[{ id: "ytech:lion_man" }, 1]],
        removeRecipe:true
    })

    milfShaped(event, {
        pattern: [
            "F ",
            "S "
        ],
        key: {
            F: { item: "milf:stone_rod" },
            S: { item: "milf:stone_basin" }
        },
        outputItems: [[{ id: "ytech:stone_mortar_and_pestle" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "F ",
            "SR"
        ],
        key: {
            F: { item: "ytech:mammoth_tusk" },
            S: { tag: "milf:knives" },
            R: { item: "ytech:rhino_horn" },
        },
        outputItems: [[{ id: "ytech:wild_horse" }, 1]],
        removeRecipe:true
    })

    milfShaped(event, {
        pattern: [
            " TF",
            " ST",
            "S  "
        ],
        key: {
            F: { item: "ytech:sharp_flint" },
            T: { item: "ytech:grass_twine" },
            S: { tag: "milf:sticks" }
        },
        outputItems: [[{ id: "ytech:flint_spear" }, 1]],
        removeRecipe: true
    })

    // milfShapeless(event, {
    //     inputItems: [
    //         [{ "tag": "minecraft:sand" }, 1],
    //         [neoCompound([
    //             { item: "minecraft:brick"},
    //             { item: "modern_industrialization:fire_clay_brick" }
    //         ]), 1]
    //     ],
    //     outputItems: [[{ "id": "ytech:ingot_sand_mold" }]],
    //     removeRecipe: true
    // })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:cutting_machine",
        inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
        inputItems: [[{ tag: "milf:sticks" }, 1]],
        outputItems: [[{ item: "ytech:wooden_bolt" }, 2]],
        //removeRecipeType: "modern_industrialization:cutting_machine",
    })

})

milfDisableRecipesById([
    "ytech:bronze_ingot_from_alloying",
    /ytech:(\w+)_mold/,
    /ytech:(\w+)_from_smelting/,
    /ytech:(\w+)_sand_mold/,
    /ytech:(\w+)_head_mold/,
    /ytech:(\w+)_hammer/,
    /ytech:(\w+)_ingot/,
    /ytech:(\w+)_bolt/,
    /ytech:(\w+)_rod/,
    /ytech:crushed_(\w+)\b/,
    /ytech:raw_(\w+)\b/,
    /ytech:tin_(\w+)\b/,
    /ytech:copper_(\w+)\b/,
    /ytech:gold_(\w+)\b/,
    "ytech:bronze_anvil",
    "ytech:primitive_alloy_smelter",
    "ytech:primitive_smelter",
    "ytech:unlit_torch"
    
])