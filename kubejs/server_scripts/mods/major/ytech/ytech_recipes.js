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

    yTechShaped(event, {
        pattern: [
            ' E ',
            '   ',
            '  H'
        ],
        key: {
            E: { tag: "milf:knives" },
            H: { tag: "ytech:beeswaxes" }
        },
        outputItems: [[{ id: "milf:hoe_head_pattern" }, 1]],
        compatOff: true
    })

    yTechShaped(event, {
        pattern: [
            ' E ',
            '   ',
            ' H '
        ],
        key: {
            E: { tag: "milf:knives" },
            H: { tag: "ytech:beeswaxes" }
        },
        outputItems: [[{ id: "milf:shovel_head_pattern" }, 1]],
        compatOff: true
    })

    yTechShaped(event, {
        pattern: [
            'BBB',
            'B#B',
            'BBB'
        ],
        key: {
            B: { item: "minecraft:clay_ball" },
            "#": { tag: "ytech:brick_molds" }
        },
        outputItems: [[{ id: "ytech:unfired_brick" }, 12]],
        compatOff: true,
        removeRecipe: true
    })

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
        outputItems: [[{ "id": "ytech:leather_strips" }, 4]],
        inputItems: [
            [{ "tag": "c:leathers" }, 1],
            [{ "tag": "milf:knives" }, 1],
        ],
        category: "equipment",
        removeRecipeType: "ytech:remaining_shapeless_crafting",
        compatOff:true
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


    event.recipes.ytech.hammering("heavy_weighted_pressure_plate", "iron_block")
        .tool("#c:hammers");

    // event.replaceInput({ output: 'ytech:reinforced_bricks' }, 'modern_industrialization:copper_bolt', 'modern_industrialization:fire_clay_brick')
    // event.replaceInput({ output: 'ytech:reinforced_bricks' }, 'modern_industrialization:copper_plate', 'modern_industrialization:fire_clay_brick')
    // event.replaceInput({ input: 'ytech:crushed_copper' }, 'ytech:crushed_copper', 'milf:crushed_copper')
    // event.replaceInput({ input: 'ytech:crushed_gold' }, 'ytech:crushed_gold', 'milf:crushed_gold')
    // event.replaceInput({ input: 'ytech:crushed_iron' }, 'ytech:crushed_iron', 'milf:crushed_iron')
    // event.replaceInput({ input: 'ytech:crushed_galena' }, 'ytech:crushed_galena', 'milf:crushed_lead')
    // event.replaceInput({ input: 'ytech:crushed_cassiterite' }, 'ytech:crushed_cassiterite', 'milf:crushed_tin')
    // event.replaceInput({ input: 'ytech:raw_galena' }, 'ytech:raw_galena', 'modern_industrialization:raw_lead')
    // event.replaceInput({ input: 'ytech:raw_cassiterite' }, 'ytech:raw_cassiterite', 'modern_industrialization:raw_tin')
    // event.replaceOutput({ output: 'ytech:crushed_gold' }, 'ytech:crushed_gold', 'milf:crushed_gold')
    // event.replaceOutput({ output: 'ytech:crushed_cassiterite' }, 'ytech:crushed_cassiterite', 'milf:crushed_tin')
    // event.replaceOutput({ output: 'ytech:crushed_galena' }, 'ytech:crushed_galena', 'milf:crushed_lead')
    // event.replaceOutput({ output: 'ytech:crushed_copper' }, 'ytech:crushed_copper', 'milf:crushed_copper')
    // event.replaceOutput({ output: 'ytech:crushed_iron' }, 'ytech:crushed_iron', 'milf:crushed_iron')
    // event.replaceOutput({ output: 'ytech:bronze_ingot' }, 'ytech:bronze_ingot', 'modern_industrialization:bronze_ingot')
    // event.replaceOutput({ output: 'ytech:tin_ingot' }, 'ytech:tin_ingot', 'modern_industrialization:tin_ingot')
    // event.replaceOutput({ output: 'ytech:lead_ingot' }, 'ytech:lead_ingot', 'modern_industrialization:lead_ingot')
    // event.replaceOutput({ output: 'ytech:tin_rod' }, 'ytech:tin_rod', 'modern_industrialization:tin_rod')
    // event.replaceOutput({ output: 'ytech:copper_rod' }, 'ytech:copper_rod', 'modern_industrialization:copper_rod')
    // event.replaceOutput({ output: 'ytech:golden_rod' }, 'ytech:golden_rod', 'modern_industrialization:gold_rod')
    // event.replaceOutput({ output: 'ytech:iron_rod' }, 'ytech:iron_rod', 'modern_industrialization:iron_rod')
    // event.replaceOutput({ output: 'ytech:lead_rod' }, 'ytech:lead_rod', 'modern_industrialization:lead_rod')
    // event.replaceOutput({ output: 'ytech:bronze_rod' }, 'ytech:bronze_rod', 'modern_industrialization:bronze_rod')
    // event.replaceOutput({ output: 'ytech:golden_bolt' }, 'ytech:golden_bolt', 'modern_industrialization:gold_bolt')
    // event.replaceOutput({ output: 'ytech:copper_bolt' }, 'ytech:copper_bolt', 'modern_industrialization:copper_bolt')
    // event.replaceOutput({ output: 'ytech:iron_bolt' }, 'ytech:iron_bolt', 'modern_industrialization:iron_bolt')
    // event.replaceOutput({ output: 'ytech:lead_bolt' }, 'ytech:lead_bolt', 'modern_industrialization:lead_bolt')
    // event.replaceOutput({ output: 'ytech:tin_bolt' }, 'ytech:tin_bolt', 'modern_industrialization:tin_bolt')
    // event.replaceOutput({ output: 'ytech:bronze_bolt' }, 'ytech:bronze_bolt', 'modern_industrialization:bronze_bolt')

    event.replaceInput({ output: 'minecraft:leather' }, '#ytech:sharp_flints', '#milf:knives')
    event.replaceInput({ input: '#c:knives' }, '#c:knives', '#milf:knives')

    let replaceStick = [
        "ytech:fire_pit", "ytech:flint_knife", 
        "ytech:flint_axe", "ytech:flint_spear", 
        "ytech:crafting_workspace",
        "ytech:divining_rod"
    ]

    replaceStick.forEach(output => {
        event.replaceInput({ input: 'minecraft:stick', output: output}, 'minecraft:stick', '#milf:sticks')
    })

    

    event.custom({
        "type": "ytech:remaining_shapeless_crafting",
        "category": "misc",
        "ingredients": [
            { "tag": "c:bricks" },
            { "tag": "c:mortar_and_pestles" }
        ],
        "result": { "id": "modern_industrialization:brick_dust", "count": 1 }
    })

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

    milfShapeless(event, {
        inputItems: [
            [{ "tag": "minecraft:sand" }, 1],
            [neoCompound([
                { item: "minecraft:brick"},
                { item: "modern_industrialization:fire_clay_brick" }
            ]), 1]
        ],
        outputItems: [[{ "id": "ytech:ingot_sand_mold" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:cutting_machine",
        inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
        inputItems: [[{ tag: "milf:sticks" }, 1]],
        outputItems: [[{ item: "ytech:wooden_bolt" }, 2]],
        //removeRecipeType: "modern_industrialization:cutting_machine",
    })

})

milfDisableRecipesById([
    "ytech:bronze_ingot_from_alloying"
])