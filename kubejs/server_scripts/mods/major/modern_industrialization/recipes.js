/**
 * @typedef {Object} ItemOrTagObject
 * @property {string} [item]
 * @property {string} [tag]
 */

/**
 * @typedef {[ItemOrTagObject, amount?: number, probability?: number]} MILFItemRecipeEntry
 */

/**
 * @typedef {Object} FluidOrTagObject
 * @property {string} [fluid]
 * @property {string} [tag]
 */

/**
 * @typedef {[FluidOrTagObject, amount?: number, probability?: number]} MILFFluidRecipeEntry
 */

/**
 * @typedef {Object} MiMachineRecipeArgs
 * @property {number} [energy=8] - energy/steam consumption per tick. Tier: 1–3 bronze, 4–7 steel, 8+ electric
 * @property {number} [time=100] 
 * @property {string} [machine="modern_industrialization:chemical_reactor"]
 * @property {boolean} [removeRecipe] - removes all default recipes that produce the same output items/fluids
 * @property {string} [removeRecipeType] - removes recipes with the given output items but only of this recipe type
 * @property {boolean} [removeThisRecipeType] - removes recipes with the same output items/fluids and the same machine type as the current recipe
 * @property {MILFItemRecipeEntry[]} [inputItems]
 * @property {MILFItemRecipeEntry[]} [outputItems]
 * @property {MILFFluidRecipeEntry[]} [inputFluids]
 * @property {MILFFluidRecipeEntry[]} [outputFluids]
 * @property {string} [recipeId]
 * @property {string} [dimension]
 * @property {Object} [adjacent_block]
 * @property {string} [custom_condition]
 */

/**
 * @param {MiMachineRecipeArgs} args
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

    if (args.machine === "modern_industrialization:macerator") {
        milfMacToCrush(event, recipe.item_inputs[0], recipe.item_outputs, id)
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
}

// let $ElectricTieredCraftingMultiblockBlockEntity = Java.loadClass("net.swedz.mi_tweaks.machine.blockentity.multiblock.tiered.ElectricTieredCraftingMultiblockBlockEntity")

// MIRecipeEvents.customCondition(event => {

//     event.registerWithIcon(`tier_gated`,
//         (context, recipe) => {
//             let blockEntity = context.blockEntity

//             if (blockEntity instanceof $ElectricTieredCraftingMultiblockBlockEntity){
//                 return blockEntity.baseMaxRecipeEu >= recipe.eu
//             }

//             return false
//         },
//         Item.of("milf:mi_upgrader"),
//         Text.translatable(`milf.mi_condition.tier_gated`)
//     )

// })

let miMachinesCompat = {
    "extended_industrialization:alloy_smelter": "modern_industrialization:advanced_steam_alloy_smelter"
}

ServerEvents.recipes(event => {

    event.remove({
        output: [
            'modern_industrialization:netherite_hammer',
            'modern_industrialization:steel_hammer',
            'modern_industrialization:diamond_hammer',
            'modern_industrialization:iron_hammer'
        ]
    })

    event.remove({ output: /ae2:*/, type: 'modern_industrialization:packer' })
    event.remove({ output: /ae2:*/, type: 'modern_industrialization:assembler' })
    event.remove({ type: 'modern_industrialization:quarry' })

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

    //#region milfShaped

    global.dyeColors.forEach(({name: color}) => {

        milfShaped(event, {
            pattern: [
                "BPB",
                "DMD",
                "BPB"
            ],
            key: {
                D: { item: `minecraft:${color}_dye` },
                M: { item: "milf:basic_motor" },
                B: { item: "modern_industrialization:aluminum_bolt" },
                P: { item: "modern_industrialization:aluminum_curved_plate" }

            },
            outputItems: [[{ id: `modern_industrialization:${color}_item_pipe` }, 8]],
            removeRecipe: true,
        })

        milfShaped(event, {
            pattern: [
                "BPB",
                "DMD",
                "BPB"
            ],
            key: {
                D: { item: `minecraft:${color}_dye` },
                M: { item: "milf:basic_pump" },
                B: { item: "modern_industrialization:aluminum_bolt" },
                P: { item: "modern_industrialization:aluminum_curved_plate" }

            },
            outputItems: [[{ id: `modern_industrialization:${color}_fluid_pipe` }, 12]],
            removeRecipe: true,
        })

        milfShaped(event, {
            pattern: [
                "PPP",
                "DPD",
                "PPP"
            ],
            key: {
                D: { item: `minecraft:${color}_dye` },
                P: { tag: "modern_industrialization:item_pipes" },

            },
            outputItems: [[{ id: `modern_industrialization:${color}_item_pipe` }, 7]],
        })

        milfShaped(event, {
            pattern: [
                "PPP",
                "DPD",
                "PPP"
            ],
            key: {
                D: { item: `minecraft:${color}_dye` },
                P: { tag: "modern_industrialization:fluid_pipes" },

            },
            outputItems: [[{ id: `modern_industrialization:${color}_fluid_pipe` }, 7]],
        })

        milfShapeless(event, {
            inputItems: [
                [{ item: `minecraft:${color}_dye` }, 1],
                [{ tag: "modern_industrialization:item_pipes" }, 1],
            ],
            outputItems: [[{ id: `modern_industrialization:${color}_item_pipe` }, 1]],
        })

        milfShapeless(event, {
            inputItems: [
                [{ item: `minecraft:${color}_dye` }, 1],
                [{ tag: "modern_industrialization:fluid_pipes" }, 1],
            ],
            outputItems: [[{ id: `modern_industrialization:${color}_fluid_pipe` }, 1]],
        })


    })

    milfShaped(event, {
        pattern: [
            "BPB",
            "M M",
            "BPB"
        ],
        key: {
            M: { item: "milf:basic_motor" },
            B: { item: "modern_industrialization:aluminum_bolt" },
            P: { item: "modern_industrialization:aluminum_curved_plate" }

        },
        outputItems: [[{ id: `modern_industrialization:item_pipe` }, 8]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "BPB",
            "M M",
            "BPB"
        ],
        key: {
            M: { item: "milf:basic_pump" },
            B: { item: "modern_industrialization:aluminum_bolt" },
            P: { item: "modern_industrialization:aluminum_curved_plate" }

        },
        outputItems: [[{ id: `modern_industrialization:fluid_pipe` }, 12]],
        removeRecipe: true,
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
        removeRecipe: true,
        compatOff: true
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
        outputItems: [[{ id: "modern_industrialization:steam_quarry" }, 1]],
    })

    milfShaped(event, {
        pattern: [
            "PMP",
            "ICS",
            "PMP"
        ],
        key: {
            P: { item: "modern_industrialization:steel_large_plate" },
            M: { item: "milf:basic_motor" },
            S: { item: "immersiveengineering:component_steel" },
            I: { item: "immersiveengineering:component_iron" },
            C: { item: "immersiveengineering:component_electronic" }
        },
        outputItems: [[{ id: "mi_tweaks:machine_assembler" }, 1]],
    })

    milfShaped(event, {
        pattern: [
            "PCP",
            "HBH",
            "PCP"
        ],
        key: {
            B: { item: "modern_industrialization:large_steam_boiler" },
            P: { item: "milf:basic_pump" },
            H: { item: "immersiveengineering:furnace_heater" },
            C: { item: "modern_industrialization:electronic_circuit" }
        },
        outputItems: [[{ id: "modern_industrialization:advanced_large_steam_boiler" }, 1]],
        removeRecipe: true
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
        ['milf:steel_machine_bit', "steel"],
        ['milf:bronze_machine_bit', "bronze"]
    ]

    hatchesMI.forEach(entry => {
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

    //#endregion

    //#region yTechShaped

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
        compatOff: true
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

    //#endregion

    //#region misc

    milfSmelting(event, {
        inputItems: [[{ item: "milf:unfired_fire_clay_brick" }]],
        outputItems: [[{ id: "modern_industrialization:fire_clay_brick" }]],
        removeRecipe:true
    })


    aeInscriberRecipe(event, {
        inputItems: [
            [{ "item": "milf:tempered_glass" }, 1],
            [{ "item": "modern_industrialization:steel_curved_plate" }, 1],
            [{ "item": "milf:hemispherical_press_mold" }, 1],
        ],
        outputItems: [[{ "id": "milf:lens" }, 1]],
        mode: "inscribe"
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

    // event.replaceOutput(
    //     { output: 'modern_industrialization:steel_block' },
    //     'modern_industrialization:steel_block',
    //     'immersiveengineering:storage_steel'
    // )

    // event.replaceInput(
    //     { input: 'modern_industrialization:steel_block' },
    //     'modern_industrialization:steel_block',
    //     'immersiveengineering:storage_steel'
    // )

    // let miEthanol = Fluid.of("modern_industrialization:ethanol")
    // let ieEthanol = Fluid.of("immersiveengineering:ethanol")

    // event.replaceInput(
    //     { input: miEthanol },
    //     miEthanol,
    //     "immersiveengineering:ethanol"
    // )

    // event.replaceOutput(
    //     { output: miEthanol },
    //     miEthanol,
    //     "immersiveengineering:ethanol"
    // )
    

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

    const hatches = [
        'modern_industrialization:bronze_item_input_hatch', 
        'modern_industrialization:steel_item_input_hatch', 
        'modern_industrialization:steel_fluid_input_hatch', 
        'modern_industrialization:bronze_fluid_input_hatch'
    ]

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

    //#endregion

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
        "modern_industrialization:materials/coke/packer/block",
        "modern_industrialization:materials/coke/unpacker/gem",
        "modern_industrialization:materials/coke/craft/block_from_gem",
        "modern_industrialization:materials/coke/craft/gem_from_block",

        "modern_industrialization:compat/ae2/macerator/minecraft_ender_pearl_to_ae2_ender_dust",

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
        const rawMetalRegex = new RegExp(`modern_industrialization:materials\\/${ore}\\/(?:macerator|forge_hammer)\\/raw_metal.*`)
        event.getEntry(rawMetalRegex).forEach(entry => {
            entry.fromPath("item_inputs").ifPresent(input => input.second.asJsonArray.get(0).asJsonObject.add("tag", `c:crushed_ores/${ore}`))
            entry.fromPath("ingredient").ifPresent(input => input.second.asJsonObject.add("tag", `c:crushed_ores/${ore}`))
        })

    })
    event.getEntry("modern_industrialization:materials/macerator/lead_crushed_to_dust").forEach(entry => {
        entry.fromPath("item_inputs").ifPresent(input => input.second.asJsonObject.add("tag", `c:crushed_ores/lead`))
    })
})