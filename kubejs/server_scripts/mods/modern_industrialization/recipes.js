/**
 * any MI machine recipe
 *  - `args`: everything is optional
 *      - `energy` : energy|steam consumption/tick, defaults to 8; allowed machine tier depends on this `1-3` : bronze tier; `4-7` : steel tier; `8+` electric tier
 *      - `time` : time in ticks (20 = 1sec), defaults to 100
 *      - `machine` : String - mi machine name, defaults to "modern_industrialization:chemical_reactor" (has all inputs and outputs)
 *      - `token` : item that will not be consumed upon craft, {item|tag : name}
 *      - --------
 *      - `multiplyEnergy`: Boolean - (more items = more energy) if true: energy = energy + (inputs.length + fluids.length) * (energy / 4)
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - --------
 *      - `ins/outs` : Arrays - each element looks like this : [{ tag|item|fluid : name }, amount, probability], amount defaults to 1 for items and 1000 for fluids if not specified
 *          - `inputItems`
 *          - `outputItems`
 *          - `inputFluids`
 *          - `outputFluids`

*/

const miMachineRecipe = (/**@type {$RecipesKubeEvent} */event, args) => {
    const fluidInputs = args.inputFluids || []
    const fluidOutputs = args.outputFluids || []
    const inputs = args.inputItems || []
    const outputs = args.outputItems || []
    const energy = args.multiplyEnergy ? args.energy + (inputs.length + fluids.length) * (energy / 4) : args.energy || 8
    const time = args.time || 100

    let recipe = {
        "type": args.machine || "modern_industrialization:chemical_reactor",
        "eu": energy,
        "duration": time,
        "item_inputs": [],
        "item_outputs": [],
        "fluid_inputs": [],
        "fluid_outputs": [],
        "process_conditions": []
    }

    inputs.forEach((input) => {
        let inp = Object.assign({}, input[0], { amount: input[1] ?? input[0]?.amount ?? 1 }, { probability: input[2] })
        if (inp.count) {
            inp.amount = inp.count
            delete inp.count
        }
        recipe.item_inputs.push(inp)
    })
    outputs.forEach((out) => {
        if (out[1] === 0) return
        let output = Object.assign({}, out[0], { amount: out[1] ?? out[0]?.amount ?? 1 }, { probability: out[2] })
        if (output.id) {
            output.item = output.id
            delete output.id
        }
        if (output.count) {
            output.amount = output.count
            delete output.count
        }
        recipe.item_outputs.push(output)
    })
    fluidInputs.forEach((input) => { recipe.fluid_inputs.push(Object.assign({}, input[0], { amount: input[1] || 1000 }, { probability: input[2] })) })
    fluidOutputs.forEach((out) => { recipe.fluid_outputs.push(Object.assign({}, out[0], { amount: out[1] || 1000 }, { probability: out[2] })) })
    let id = args.recipeId
    if (args.removeRecipe) {
        outputs.forEach((out) => {
            event.remove({ output: out[0].item })
        })
        fluidOutputs.forEach(output => {
            let fluid = Fluid.of(output[0].fluid)
            console.log(fluid);
            
            event.remove({ output: fluid })
        })
    }
    if(args.removeRecipeType){
        outputs.forEach((out) => {
            event.remove({ output: out[0].item, type: args.removeRecipeType })
        })
    }
    if (args.removeThisRecipeType){
        outputs.forEach((out) => {
            event.remove({ output: out[0].item, type: args.machine })
        })
        fluidOutputs.forEach(output => {
            let fluid = Fluid.of(output[0].fluid)            
            event.remove({ output: fluid, type: args.machine })
        })

    }
    if (args.token) { recipe.item_inputs.push(Object.assign({}, args.token, { amount: 1 }, { probability: 0 })) }
    if (args.dimension) {
        recipe.process_conditions.push({
            type: "modern_industrialization:dimension",
            dimension: args.dimension
        })
    }
    if (args.adjacent_block) {
        recipe.process_conditions.push({
            type: "modern_industrialization:adjacent_block",
            position: args.adjacent_block.position,
            block: args.adjacent_block.block
        })
    }
    if (args.custom_condition) {
        recipe.process_conditions.push({
            type: "modern_industrialization:custom",
            custom_id: args.custom_condition
        })
    }
    // console.log(id);

    if(args.ieCompat){
        switch (args.machine) {
            case "modern_industrialization:macerator":
                ieCrusherCraft(event, {
                    inputItems: args.inputItems,
                    outputItems: args.outputItems,
                    compatOff: true
                })
                break;
        
            default:
                break;
        }
    }
    if (id) {
        event.custom(recipe).id(id)
    } else {
        event.custom(recipe)
    }
    if (Object.keys(miMachinesCompat).some(key => key.includes(args.machine))) {
        args.machine = miMachinesCompat[args.machine]
        miMachineRecipe(event, args)
    }
};

let miMachinesCompat = {
    "extended_industrialization:alloy_smelter": "modern_industrialization:advanced_steam_alloy_smelter"
}

MIRecipeEvents.customCondition(event => {
    event.register("milf:placer_craft_condition",
        // condition itself, receives the machine context and the recipe that is being checked
        (context, recipe) => {
            if (context.level.getBlockState(context.getBlockEntity().getBlockPos().above())["is(net.minecraft.resources.ResourceKey)"]("minecraft:stripped_bamboo_block")) {
                //context.level.setBlockAndUpdate(context.getBlockEntity().getBlockPos().above(), recipe.itemOutputs.first.stack.block)
                //console.log(context.level.getBlockEntity(context.getBlockEntity().getBlockPos().above().offset(2,0,0)).blockState.properties);
                //console.log("something");
                return true
            }
            return false
            //return context.level.getBlockState(context.getBlockEntity().getBlockPos().above())["is(net.minecraft.resources.ResourceKey)"]("minecraft:stripped_bamboo_block")
        },
        // description for REI-like mods
        Text.of("Must be placed on an odd X position"));
});

ServerEvents.recipes(event => {
    event.remove({
        output: [
            'modern_industrialization:netherite_hammer',
            'modern_industrialization:steel_hammer',
            'modern_industrialization:diamond_hammer',
            'modern_industrialization:iron_hammer',
            "modern_industrialization:diamond_tiny_dust"
        ]
    })

    event.remove({ output: /ae2:*/, type: 'modern_industrialization:packer' })
    event.remove({ output: /ae2:*/, type: 'modern_industrialization:assembler' })

    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "architects_palette:algal_blend" },
            { "item": "architects_palette:algal_blend" },
            { "item": "modern_industrialization:brick_dust" },
            { "item": "modern_industrialization:brick_dust" },
        ],
        output: "milf:fire_clay_ball",
        amount: 3,
    })

    yTechShaped(event, {
        pattern: [
            "ccc",
            "c#c",
            "ccc",
        ],
        key: {
            "#": { "tag": "ytech:brick_molds" },
            "c": { "item": "milf:fire_clay_ball" },
        },
        outputItems: [[{ id: "milf:unfired_fire_clay_brick" }, 8]],
        compatOff:true
    })

    milfSmelting(event, {
        inputItems: [[{ item: "milf:unfired_fire_clay_brick" }]],
        outputItems: [[{ id: "modern_industrialization:fire_clay_brick" }]],
        removeRecipe:true
    })

    milfShaped(event, {
        pattern: [
            "WQW",
            "QWQ",
            "WQW"
        ],
        key: {
            Q: { item: "modern_industrialization:fire_clay_brick" },
            W: { item: "architects_palette:cerebral_plate" }

        },
        outputItems: [[{ id: "modern_industrialization:fire_clay_bricks" }]],
        removeRecipe:true,
        compatOff:true
    })

    milfShaped(event, {
        pattern: [
            "P P",
            "PCP",
            "P P"
        ],
        key: {
            P: { item: "modern_industrialization:invar_curved_plate" },
            C: { item: "modern_industrialization:heatproof_machine_casing" }
        },
        outputItems: [[{ id: "modern_industrialization:invar_machine_casing_pipe" }, 2]],
    })

    milfShaped(event, {
        pattern: [
            "HCH",
            "MHM",
            "D D"
        ],
        key: {
            H: { item: "immersiveengineering:heavy_engineering" },
            C: { item: "modern_industrialization:steel_machine_casing" },
            M: { item: "milf:basic_motor" },
            D: { item: "modern_industrialization:copper_drill" }
        },
        outputItems: [[{ id: "modern_industrialization:steam_quarry" }, 2]],
    })

    event.forEachRecipe({ output: /.*fine_wire/, type: "modern_industrialization:wiremill" }, r => {
        let inputItems = JSON.parse(r.originalJson).item_inputs.map(item => [item])

        yTechShapeless(event, {
            outputItems: [[{ "id": r.originalRecipeResult.id }, 1]],
            inputItems: inputItems.concat([[{ item: "immersiveengineering:wirecutter"}]]),
            compatOff: true
        })

        miMachineRecipe(event, {
            energy: 12, time: 100, machine: "modern_industrialization:wiremill",
            inputItems: inputItems,
            outputItems: [
                [{ item: r.originalRecipeResult.id }, 2]
            ]
        })
        
        event.remove({ output: r.originalRecipeResult.id })
    })


    const tanksAndBarrelsMI = [
        ["modern_industrialization:bronze_machine_casing", "milf:bronze_glass", "bronze"],
        ["modern_industrialization:steel_machine_casing", "milf:steel_infused_glass", "steel"],
        ["modern_industrialization:frostproof_machine_casing", "milf:tempered_glass", "aluminum"],
        ["modern_industrialization:clean_stainless_steel_machine_casing", "milf:tempered_glass", "stainless_steel"],
        ["modern_industrialization:solid_titanium_machine_casing", "milf:tempered_glass", "titanium"]
    ]
    
    tanksAndBarrelsMI.forEach(entry => {
        yTechShaped(event, {
            pattern: [
                "GGG",
                "@B#",
                "GGG"
            ],
            key: {
                G: { item: entry[1] },
                B: { item: entry[0] },
                "@": { tag: "c:files" },
                "#": { tag: "c:hammers" },
            },
            outputItems: [[{ id: `modern_industrialization:${entry[2]}_tank` }, 1]],
            removeRecipe: true
        })

        milfShaped(event, {
            pattern: [
                "bGb",
                "GBG",
                "bGb"
            ],
            key: {
                G: { item: "labels:label" },
                B: { item: entry[0] },
                b: { item: `modern_industrialization:${entry[2]}_bolt` }
            },
            outputItems: [[{ id: `modern_industrialization:${entry[2]}_barrel` }, 1]],
            removeRecipe: true
        })
    })

    const hatchesMI = [
        ['milf:steel_machine_bit',"steel"],
        ['milf:bronze_machine_bit',"bronze"]
    ]
    
    hatchesMI.forEach(entry =>{
        milfShaped(event, {
            pattern: [
                "BPB",
                "POP",
                "BPB"
            ],
            key: {
                B: { item: entry[0] },
                P: { item: "moderndynamics:item_pipe" },
                O: { item: "moderndynamics:extractor" }
            },
            outputItems: [[{ id: `modern_industrialization:${entry[1]}_item_output_hatch` }, 1]],
            removeRecipe: true
        })

        milfShaped(event, {
            pattern: [
                "BPB",
                "POP",
                "BPB"
            ],
            key: {
                B: { item: entry[0] },
                P: { item: "moderndynamics:item_pipe" },
                O: { item: "moderndynamics:attractor" }
            },
            outputItems: [[{ id: `modern_industrialization:${entry[1]}_item_input_hatch` }, 1]],
            removeRecipe: true
        })

        milfShaped(event, {
            pattern: [
                "BPB",
                "POP",
                "BPB"
            ],
            key: {
                B: { item: entry[0] },
                P: { item: "moderndynamics:fluid_pipe" },
                O: { item: "moderndynamics:extractor" }
            },
            outputItems: [[{ id: `modern_industrialization:${entry[1]}_fluid_output_hatch` }, 1]],
            removeRecipe: true,
            
        })

        milfShaped(event, {
            pattern: [
                "BPB",
                "POP",
                "BPB"
            ],
            key: {
                B: { item: entry[0] },
                P: { item: "moderndynamics:fluid_pipe" },
                O: { item: "moderndynamics:attractor" }
            },
            outputItems: [[{ id: `modern_industrialization:${entry[1]}_fluid_input_hatch` }, 1]],
            removeRecipe: true
        })
    })

    yTechShaped(event, {
        pattern: [
            " I ",
            " # ",
            " I "
        ],
        key: {
            I: { item: "minecraft:iron_ingot" },
            "#": { tag: "c:hammers" },
        },
        outputItems: [[{ id: `modern_industrialization:iron_double_ingot` }, 1]],
        compatOff: true
    })

    milfShaped(event, {
        pattern: [
            "DDD",
            "DDD",
            " S "
        ],
        key: {
            D: { item: "modern_industrialization:iron_double_ingot" },
            S: { item: "minecraft:stick" },
        },
        outputItems: [[{ id: `modern_industrialization:iron_hammer` }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "DDD",
            "DDD",
            " S "
        ],
        key: {
            D: { item: "modern_industrialization:steel_double_ingot" },
            S: { item: "minecraft:stick" },
        },
        outputItems: [[{ id: `modern_industrialization:steel_hammer` }, 1]],
        removeRecipe: true
    })

    ieBottlingMachineRecipe(event, {
        outputItems: [
            [{ item: "modern_industrialization:transistor" }, 1],
        ],
        inputFluids: [
            [{ fluid: "milf:silicone_modified_phenolic_resin" }, 200]
        ],
        inputItems: [
            [{ item: "modern_industrialization:electrum_fine_wire" }, 1],
            [{ item: "modern_industrialization:steel_plate" }, 2]
        ],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    ieBottlingMachineRecipe(event, {
        outputItems: [
            [{ item: "modern_industrialization:diode" }, 1],
        ],
        inputFluids: [
            [{ fluid: "milf:silicone_modified_phenolic_resin" }, 100]
        ],
        inputItems: [
            [{ item: "modern_industrialization:electrum_wire" }, 1],
            [{ item: "modern_industrialization:steel_plate" }, 2],
            [{ item: "immersiveengineering:insulating_glass" }, 1]

        ],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    event.replaceOutput(
        { output: 'modern_industrialization:steel_block' },
        'modern_industrialization:steel_block',
        'immersiveengineering:storage_steel'
    )

    event.replaceInput(
        { input: 'modern_industrialization:steel_block' },
        'modern_industrialization:steel_block',
        'immersiveengineering:storage_steel'
    )

    const craftWithFluidPipes = [
        'extended_industrialization:electric_canning_machine',
        'extended_industrialization:electric_composter',
        'extended_industrialization:machine_chainer_relay',
        'extended_industrialization:mv_solar_panel',
        'extended_industrialization:steel_alloy_smelter',
        'extended_industrialization:steel_brewery',
        'extended_industrialization:steel_canning_machine',
        'extended_industrialization:steel_honey_extractor',
        'modern_industrialization:steel_upgrade',
        'extended_industrialization:hv_solar_panel',
        'extended_industrialization:lv_solar_panel',
        'modern_industrialization:pump',
        'modern_industrialization:advanced_pump',
        'modern_industrialization:electric_water_pump',
        'modern_industrialization:electric_mixer',
        'modern_industrialization:distillery',
        'modern_industrialization:hv_steam_turbine',
        'modern_industrialization:lv_steam_turbine',
        'modern_industrialization:mv_steam_turbine',
        'modern_industrialization:steel_unpacker',
        'modern_industrialization:steel_packer',
        'modern_industrialization:oil_drilling_rig',
        'modern_industrialization:steel_wiremill',
        'modern_industrialization:aluminum_drill',
        'modern_industrialization:bronze_drill',
        'modern_industrialization:copper_drill',
        'modern_industrialization:stainless_steel_drill',
    ]

    craftWithFluidPipes.forEach(item => {
        event.replaceInput(
            { output: item },
            '#modern_industrialization:fluid_pipes',
            'moderndynamics:fluid_pipe'
        )
    })

    const craftWithItemPipes = [
        'modern_industrialization:steam_quarry',
        'modern_industrialization:steel_packer',
        'modern_industrialization:steel_unpacker',
        'modern_industrialization:bronze_drill',
        'modern_industrialization:copper_drill',
        'modern_industrialization:gold_drill',
        'modern_industrialization:stainless_steel_drill',
        'modern_industrialization:steel_drill',
        'modern_industrialization:titanium_drill',
        'extended_industrialization:machine_chainer_relay'
    ]

    craftWithItemPipes.forEach(item => {
        event.replaceInput(
            { output: item },
            '#modern_industrialization:item_pipes',
            'moderndynamics:item_pipe'
        )
    })

    const pipeTypes = ["fluid", "item"]
    pipeTypes.forEach(type => {
        global.dyeColors.forEach(color => {
            event.replaceInput(
                { output: `modern_industrialization:${color.name}_${type}_pipe` },
                'modern_industrialization:bronze_curved_plate',
                'modern_industrialization:aluminum_curved_plate'
            )
        });

        event.replaceInput(
            { output: `modern_industrialization:${type}_pipe` },
            'modern_industrialization:bronze_curved_plate',
            'modern_industrialization:aluminum_curved_plate'
        )
    })

    const hatches = ['modern_industrialization:bronze_item_input_hatch', 'modern_industrialization:steel_item_input_hatch', 'modern_industrialization:steel_fluid_input_hatch', 'modern_industrialization:bronze_fluid_input_hatch']

    hatches.forEach(hatch =>{
        yTechShapeless(event, {
            outputItems: [[{id:hatch.replace("input", "output")}]],
            inputItems:[[{item:hatch}]],
            category:"misc"
        })

        yTechShapeless(event, {
            outputItems: [[{id:hatch}]],
            inputItems:[[{item:hatch.replace("input", "output")}]],
            category:"misc"
        })
    })





})

KubeJSTweaks.beforeRecipes(event => {    

    const disableByRecipeID = [
        /modern_industrialization:materials\/.*\/craft\/ring/,
        "modern_industrialization:materials/fire_clay_dust",
        "modern_industrialization:materials/bronze_dust",
        "modern_industrialization:materials/bronze_tiny_dust",
        "modern_industrialization:materials/blast_furnace/bauxite_to_aluminum_ingot",
        "modern_industrialization:vanilla_recipes/easy_chest",
        "modern_industrialization:vanilla_recipes/easy_chest",
        "modern_industrialization:electric_age/component/craft/resistor",
        `modern_industrialization:vanilla_recipes/macerator/sandstone_to_sand`,
        `modern_industrialization:vanilla_recipes/macerator/red_sandstone_to_sand`,
        "modern_industrialization:vanilla_recipes/lignite_torch",
        "modern_industrialization:vanilla_recipes/torch",
        "modern_industrialization:materials/iron/craft/tank",
        "modern_industrialization:materials/iron/assembler/tank",
        "modern_industrialization:materials/iron/craft/barrel",
        "modern_industrialization:materials/iron/assembler/barrel",
        "modern_industrialization:steam_age/steel/quarry_asbl",
        "modern_industrialization:assembler_generated/steam_age/steel/quarry",

        "modern_industrialization:alloy/mixer/cupronickel/tiny_dust",
        "modern_industrialization:materials/mixer/fire_clay_dust",
        "modern_industrialization:electric_age/machine/assembler/replicator",

        "extended_industrialization:vanilla_recipes/macerator/netherite_ingot_to_dust",
        
        "modern_industrialization:materials/macerator/redstone_ore_to_crushed",

        "extended_industrialization:machines/processing_array/assembler",
        "extended_industrialization:machines/processing_array/craft",
        "industrialization_overdrive:machines/multi_processing_array/craft",
        "industrialization_overdrive:machines/multi_processing_array/assembler"
    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })

    const oresToChange = ['iron', 'gold', 'copper', 'tin', 'lead']
    oresToChange.forEach(ore => {
        /*      event.disable(`modern_industrialization:materials/${ore}/macerator/raw_metal`)
                event.disable(`modern_industrialization:materials/${ore}/forge_hammer/raw_metal_to_dust_with_tool`)
                event.disable(`modern_industrialization:materials/${ore}/forge_hammer/ore_to_crushed_dust_with_tool`)
                event.disable(`modern_industrialization:materials/${ore}/forge_hammer/ore_to_crushed_dust`) */
        const regex = new RegExp(`modern_industrialization:materials\\/${ore}\\/(?:macerator|forge_hammer)\\/raw_metal.*`)
        event.getEntry(regex).forEach(entry => {
            entry.fromPath("item_inputs").ifPresent(input => input.second.asJsonArray.get(0).asJsonObject.add("tag", `c:crushed_ores/${ore}`))
            entry.fromPath("ingredient").ifPresent(input => input.second.asJsonObject.add("tag", `c:crushed_ores/${ore}`))
        })

    })
    event.getEntry("modern_industrialization:materials/macerator/lead_crushed_to_dust").forEach(entry => {
        entry.fromPath("item_inputs").ifPresent(input => input.second.asJsonObject.add("tag", `c:crushed_ores/lead`))
    })
})