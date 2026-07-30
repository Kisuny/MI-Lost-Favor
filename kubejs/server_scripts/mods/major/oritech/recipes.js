function oritechPulverizerRecipe(event, args) {
    let ingredients = []
    let results = []
    args.inputItems.forEach(item => { ingredients.push(Object.assign({}, item[0], { count: item[1] || 1 })) })
    args.outputItems.forEach(item => { results.push(Object.assign({}, item[0].item ? { id: item[0].item } : item[0], { count: item[1] || 1 })) })
    let recipe = {
        type: "oritech:pulverizer",
        ingredients: ingredients,
        results: results,
        time: args.time || 100
    }
    if (!args.compatOff) {
        miMachineRecipe(event, {
            energy: 2, time: recipe.time, machine: "modern_industrialization:macerator",
            inputItems: args.inputItems,
            outputItems: args.outputItems
        })
    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item, type: args.removeRecipeType }) }
    event.custom(recipe)
}

function oritechRefineryRecipe(event, args) {
    let ingredients = []
    let results = []
    args.inputItems && args.inputItems.forEach(item => { ingredients.push(Object.assign({}, item[0], { count: item[1] || 1 })) })
    args.outputItems && args.outputItems.forEach(item => { results.push(Object.assign({}, item[0].item ? { id: item[0].item } : item[0], { count: item[1] || 1 })) })
    let recipe = {
        type: "oritech:refinery",
        ingredients: ingredients,
        results: results,
        time: args.time || 100
    }
    if(args.inputFluids){
        recipe.fluidInput = Object.assign({}, args.inputFluids[0][0], { amount: args.inputFluids[0][1] || 1000 })
    }
    if (args.outputFluids) {
        let fluids = []        
        args.outputFluids.forEach(fluid => { fluids.push(Object.assign({}, fluid[0], { amount: fluid[1] || 1000 })) })
        recipe.fluidOutputs = fluids
    }
    if (!args.compatOff) {
        miMachineRecipe(event, {
            energy: 12, time: recipe.time, machine: "modern_industrialization:chemical_reactor",
            inputItems: args.inputItems,
            outputItems: args.outputItems,
            inputFluids: args.inputFluids,
            outputFluids: args.outputFluids,
        })
    }
    if (args.removeRecipe) { 
        event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item }) 
        if(args.outputFluids){
            args.outputFluids.forEach(output => {
                let fluid = Fluid.of(output[0].fluid)
                event.remove({ output: fluid })
            })
        }
    }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item, type: args.removeRecipeType }) }
    event.custom(recipe)
}

function oritechCentrifugeRecipe(event, args) {
    if (args.inputFluids || args.outputFluids){
        oritechMixedRecipe("oritech:centrifuge_fluid", "modern_industrialization:centrifuge", event, args)
    } else {
        oritechItemRecipe("oritech:centrifuge", "modern_industrialization:centrifuge", event, args)

    }
}

function oritechFoundryRecipe(event, args) {
    oritechItemRecipe("oritech:foundry", "extended_industrialization:alloy_smelter", event, args)
}

function oritechCoolerRecipe(event, args) {
    oritechMixedRecipe("oritech:cooler", "modern_industrialization:vacuum_freezer", event, args)
}

function oritechAssemblerRecipe(event, args) {
    oritechItemRecipe("oritech:assembler", "modern_industrialization:assembler", event, args)
}

function oritechMixedRecipe(oriMachine, compatMachine, event, args) {
    let ingredients = []
    let results = []
    args.inputItems && args.inputItems.forEach(item => { ingredients.push(Object.assign({}, item[0], { count: item[1] || 1 })) })
    args.outputItems && args.outputItems.forEach(item => { results.push(Object.assign({}, item[0].item ? { id: item[0].item } : item[0], { count: item[1] || 1 })) })
    let recipe = {
        type: oriMachine,
        ingredients: ingredients,
        results: results,
        time: args.time || 100
    }
    if (args.inputFluids) {
        recipe.fluidInput = Object.assign({}, args.inputFluids[0][0], { amount: args.inputFluids[0][1] || 1000 })
    }
    if (args.outputFluids) {
        let fluids = []
        args.outputFluids.forEach(fluid => { fluids.push(Object.assign({}, fluid[0], { amount: fluid[1] || 1000 })) })
        recipe.fluidOutputs = fluids
    }
    if (!args.compatOff) {
        miMachineRecipe(event, {
            energy: 22, time: recipe.time, machine: compatMachine,
            inputItems: args.inputItems,
            outputItems: args.outputItems,
            inputFluids: args.inputFluids,
            outputFluids: args.outputFluids,
        })
    }
    if (args.removeRecipe) {
        event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item })
        if (args.outputFluids) {
            args.outputFluids.forEach(output => {
                let fluid = Fluid.of(output[0].fluid)
                event.remove({ output: fluid })
            })
        }
    }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item, type: args.removeRecipeType }) }
    event.custom(recipe)
}


function oritechItemRecipe(oriMachine, compatMachine, event, args){
    let ingredients = []
    let results = []
    args.inputItems.forEach(item => { ingredients.push(Object.assign({}, item[0], { count: item[1] || 1 })) })
    args.outputItems.forEach(item => { results.push(Object.assign({}, item[0].item ? { id: item[0].item } : item[0], { count: item[1] || 1 })) })
    let recipe = {
        type: oriMachine,
        ingredients: ingredients,
        results: results,
        time: args.time || 100
    }
    if (!args.compatOff) {
        miMachineRecipe(event, {
            energy: 12, time: recipe.time, machine: compatMachine,
            inputItems: args.inputItems,
            outputItems: args.outputItems
        })
    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item, type: args.removeRecipeType }) }    
    event.custom(recipe)
}

function oritechDrillRecipe(event, args) {
    let ingredients = []
    let results = []
    args.inputItems.forEach(item => { ingredients.push(Object.assign({}, item[0], { count: item[1] || 1 })) })
    args.outputItems.forEach(item => { results.push(Object.assign({}, item[0].item ? { id: item[0].item } : item[0], { count: item[1] || 1 })) })
    let recipe = {
        type: "oritech:deep_drill",
        ingredients: ingredients,
        results: results,
        time: args.time || 100
    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].item }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].item, type: args.removeRecipeType }) }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    event.remove({ type: "oritech:pulverizer" })
    event.remove({ type: "oritech:foundry" })

    //#region milfShaped

    milfShaped(event, {
        pattern: [
            "W W",
            "rRr",
            "W W"
        ],
        key: {
            R: { item: "modern_industrialization:steel_rod" },
            W: { item: "modern_industrialization:copper_fine_wire" },
            r: { item: "modern_industrialization:rubber_sheet" }

        },
        outputItems: [[{ id: "oritech:magnetic_coil" }]],
        removeRecipe: true,
    })

    let platingMaterials = {
        "copper": "oritech:machine_plating_block", 
        "iron": "oritech:iron_plating_block", 
        "nickel": "oritech:nickel_plating_block", 
        "carbon": "oritech:carbon_plating_block"
    }

    Object.entries(platingMaterials).forEach(([material, id]) => {
        milfShaped(event, {
            pattern: [
                "PSP",
                "SIS",
                "PSP"
            ],
            key: {
                P: { item: `modern_industrialization:${material}_plate` },
                I: { item: "immersiveengineering:component_iron" },
                S: { item: "immersiveengineering:sheetmetal_steel" }

            },
            outputItems: [[{ id: id }, 6]],
            removeRecipe: true,
        })
    })

    // milfShaped(event, {
    //     pattern: [
    //         "PSP",
    //         "SIS",
    //         "PSP"
    //     ],
    //     key: {
    //         S: { item: `oritech:machine_core_2` },
    //         I: { item: "modern_industrialization:basic_upgrade" },
    //         P: { item: "oritech:machine_plating_block" }

    //     },
    //     outputItems: [[{ id: "oritech:machine_extender" }, 1]],
    //     removeRecipe: true,
    // })

    milfShaped(event, {
        pattern: [
            "WPW",
            "WIW",
            " S "
        ],
        key: {
            S: { item: `modern_industrialization:steel_large_plate` },
            I: { item: "modern_industrialization:basic_upgrade" },
            W: { item: "immersiveengineering:wirecoil_electrum" },
            P: { item: "modern_industrialization:tumbaga_large_plate" },


        },
        outputItems: [[{ id: "oritech:machine_efficiency_addon" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "WPW",
            "WIW",
            "S S"
        ],
        key: {
            S: { item: `modern_industrialization:steel_large_plate` },
            I: { item: "modern_industrialization:basic_upgrade" },
            W: { item: "immersiveengineering:wirecoil_electrum" },
            P: { item: "modern_industrialization:tumbaga_large_plate" },


        },
        outputItems: [[{ id: "oritech:machine_speed_addon" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "RWR",
            "WIW",
            "RWR"
        ],
        key: {
            R: { item: `modern_industrialization:tumbaga_large_plate` },
            I: { item: "oritech:machine_core_3" },
            W: { item: "modern_industrialization:biosteel_curved_plate" }

        },
        outputItems: [[{ id: "oritech:machine_core_4" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "RWR",
            "WIW",
            "RWR"
        ],
        key: {
            R: { item: `modern_industrialization:rubber_sheet` },
            I: { item: "oritech:machine_extender" },
            W: { item: "immersiveengineering:wirecoil_electrum" }

        },
        outputItems: [[{ id: "modern_industrialization:basic_energy_input_hatch" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "RBR",
            "RRR",
            "IPI"
        ],
        key: {
            R: { item: "oritech:carbon_fibre_strands" },
            I: { item: "modern_industrialization:tumbaga_curved_plate" },
            P: { item: "modern_industrialization:tumbaga_large_plate" },
            B: { item: "xkdeco:hollow_steel_beam" },
            R: { item: "modern_industrialization:rubber_sheet" }

        },
        outputItems: [[{ id: "oritech:metal_beam_block" }, 3]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "MRM",
            "rRr",
            "r r"
        ],
        key: {
            R: { item: `modern_industrialization:rubber_sheet` },
            r: { item: "modern_industrialization:steel_rod" },
            M: { item: "milf:basic_motor" }

        },
        outputItems: [[{ id: "oritech:exo_leggings" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "McM",
            "rRr",
            "   "
        ],
        key: {
            R: { item: `modern_industrialization:rubber_sheet` },
            r: { item: "modern_industrialization:steel_rod" },
            c: { item: "modern_industrialization:steel_curved_plate" },
            M: { item: "ae2:charged_certus_quartz_crystal" }

        },
        outputItems: [[{ id: "oritech:exo_helmet" }, 1]],
        removeRecipe: true,
    })

    //#endregion

    //#region mi:machine_assembler

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "minecraft:glass_bottle" }, 6],
            [{ "item": "milf:basic_motor" }, 2],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "modern_industrialization:tumbaga_curved_plate" }, 8],
            [{ "item": "modern_industrialization:rubber_sheet" }, 12],
            [{ "item": "modern_industrialization:steel_rod" }, 6],
            [{ "item": "modern_industrialization:steel_gear" }, 2]
        ],
        outputItems: [[{ "item": "oritech:centrifuge_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "oritech:metal_beam_block" }, 6],
            [{ "item": "milf:basic_pump" }, 4],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "milf:tempered_glass" }, 12],
            [{ "item": "modern_industrialization:steel_large_plate" }, 6],
            [{ "item": "modern_industrialization:tumbaga_large_plate" }, 2],
            [{ "item": "moderndynamics:fluid_pipe" }, 12]
        ],
        outputItems: [[{ "item": "oritech:refinery_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "milf:small_copper_fluid_container" }, 2],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "modern_industrialization:tumbaga_curved_plate" }, 6],
            [{ "item": "modern_industrialization:steel_rod" }, 4],
            [{ "item": "modern_industrialization:steel_large_plate" }, 2],
            [{ "item": "moderndynamics:fluid_pipe" }, 6]
        ],
        outputItems: [[{ "item": "oritech:steam_engine_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "immersiveengineering:wirecoil_electrum" }, 8],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "modern_industrialization:tumbaga_rod" }, 4],
            [{ "item": "modern_industrialization:steel_large_plate" }, 4],
            [{ "item": "minecraft:grass_block" }, 6]
        ],
        outputItems: [[{ "item": "oritech:bio_generator_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "immersiveengineering:wirecoil_electrum" }, 6],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "modern_industrialization:tumbaga_rod" }, 4],
            [{ "item": "modern_industrialization:steel_large_plate" }, 6],
            [{ "item": "minecraft:magma_block" }, 6],
            [{ "item": "moderndynamics:fluid_pipe" }, 6]
        ],
        outputItems: [[{ "item": "oritech:lava_generator_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "milf:basic_motor" }, 2],
            [{ "item": "oritech:plastic_sheet" }, 8],
            [{ "item": "modern_industrialization:tumbaga_large_plate" }, 4],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "modern_industrialization:steel_rod" }, 2],
            [{ "item": "immersiveengineering:wirecoil_steel" }, 6],
            [{ "item": "oritech:machine_core_3" }, 6]
        ],
        outputItems: [[{ "item": "oritech:foundry_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "immersiveengineering:wirecoil_steel" }, 6],
            [{ "item": "modern_industrialization:steel_rod" }, 6],
            [{ "item": "modern_industrialization:steel_large_plate" }, 6],
            [{ "item": "minecraft:magma_block" }, 6],
            [{ "item": "oritech:machine_core_4" }, 1]
        ],
        outputItems: [[{ "item": "oritech:fuel_generator_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "milf:small_steel_fluid_container" }, 2],
            [{ "item": "modern_industrialization:tumbaga_large_plate" }, 4],
            [{ "item": "milf:tempered_glass" }, 8],
            [{ "item": "modern_industrialization:rubber_sheet" }, 16],
            [{ "item": "oritech:metal_beam_block" }, 2],
            [{ "item": "moderndynamics:fluid_pipe" }, 6],
            [{ "item": "oritech:enderic_compound" }, 4]
        ],
        outputItems: [[{ "item": "oritech:refinery_module_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:motor" }, 4],
            [{ "item": "modern_industrialization:tumbaga_curved_plate" }, 4],
            [{ "item": "modern_industrialization:tumbaga_gear" }, 2],
            [{ "item": "modern_industrialization:carbon_steel_large_plate" }, 1],
            [{ "item": "modern_industrialization:carbon_steel_rod" }, 4],
            [{ "item": "modern_industrialization:invar_rotary_blade" }, 4],
            [{ "item": "modern_industrialization:rubber_sheet" }, 16],
            [{ "item": "oritech:metal_beam_block" }, 2],
            [{ "item": "moderndynamics:item_pipe" }, 6],
        ],
        outputItems: [[{ "item": "oritech:pulverizer_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:motor" }, 6],
            [{ "item": "immersiveengineering:component_electronic_adv" }, 2],
            [{ "item": "modern_industrialization:tumbaga_curved_plate" }, 4],
            [{ "item": "modern_industrialization:tumbaga_gear" }, 4],
            [{ "item": "modern_industrialization:carbon_steel_rod" }, 4],
            [{ "item": "oritech:machine_core_4" }, 1]
        ],
        outputItems: [[{ "item": "oritech:assembler_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "milf:basic_motor" }, 2],
            [{ "item": "immersiveengineering:component_electronic_adv" }, 2],
            [{ "item": "modern_industrialization:tumbaga_plate" }, 6],
            [{ "item": "modern_industrialization:steel_rod" }, 4],
            [{ "item": "modern_industrialization:aluminum_plate" }, 4],
            [{ "item": "oritech:machine_core_3" }, 1]
        ],
        outputItems: [[{ "item": "oritech:drone_port_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:pump" }, 2],
            [{ "item": "modern_industrialization:tumbaga_curved_plate" }, 6],
            [{ "item": "modern_industrialization:carbon_steel_large_plate" }, 2],
            [{ "item": "milf:tempered_glass" }, 4],
            [{ "item": "oritech:machine_core_4" }, 1]
        ],
        outputItems: [[{ "item": "oritech:cooler_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:machine_assembler",
        inputItems: [
            [{ "item": "milf:basic_motor" }, 2],
            [{ "item": "modern_industrialization:tumbaga_curved_plate" }, 4],
            [{ "item": "modern_industrialization:steel_large_plate" }, 2],
            [{ "item": "milf:tempered_glass" }, 4],
            [{ "item": "modern_industrialization:aluminum_wire" }, 2],
            [{ "item": "oritech:machine_core_4" }, 1]
        ],
        outputItems: [[{ "item": "oritech:big_solar_panel_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    //#endregion

    //#region centrifuge

    oritechCentrifugeRecipe(event, {
        time: 600,
        inputItems: [[{ item: "modern_industrialization:coke_block" }, 1]],
        outputItems: [[{ item: "modern_industrialization:hop_graphite_dust" }, 1]],
        removeRecipeType:"immersiveengineering:squeezer"
    })

    oritechCentrifugeRecipe(event, {
        time: 300,
        inputItems: [[{ item: "modern_industrialization:hop_graphite_dust" }, 1]],
        outputItems: [[{ item: "modern_industrialization:carbon_dust" }, 1]],
    })

    oritechCentrifugeRecipe(event, {
        time: 200,
        inputItems: [[{ item: "modern_industrialization:carbon_dust" }, 1]],
        outputItems: [[{ item: "oritech:carbon_fibre_strands" }, 1]],
    })

    //#endregion

    //#region foundry

    oritechFoundryRecipe(event, {
        time: 200,
        inputItems: [
            [{ item: "minecraft:copper_ingot" }, 1],
            [{ item: "modern_industrialization:constantan_ingot" }, 1]
        ],
        outputItems: [[{ item: "modern_industrialization:cupronickel_ingot" }, 1]],
        compatOff: true
    })

    oritechFoundryRecipe(event, {
        time: 200,
        inputItems: [
            [{ item: "modern_industrialization:aluminum_ingot" }, 1],
            [{ item: "modern_industrialization:antimony_ingot" }, 1]
        ],
        outputItems: [[{ item: "oritech:adamant_ingot" }, 1]]
    })

    //#endregion

    //#region assembler

    oritechAssemblerRecipe(event, {
        time: 200,
        inputItems: [
            [{ item: "modern_industrialization:analog_circuit_board" }, 1],
            [{ item: "modern_industrialization:aluminum_large_plate" }, 1],
            [{ item: "immersiveengineering:wirecoil_steel" }, 1],
            [{ item: "immersiveengineering:wirecoil_steel" }, 1]
        ],
        outputItems: [[{ item: "modern_industrialization:electronic_circuit_board" }, 1]],
        removeRecipe:true
    })

    oritechAssemblerRecipe(event, {
        time: 200,
        inputItems: [
            [{ item: "modern_industrialization:battery_alloy_large_plate" }, 1],
            [{ item: "modern_industrialization:adamant_dust" }, 1],
            [{ item: "modern_industrialization:tin_cable" }, 1],
            [{ item: "modern_industrialization:tin_cable" }, 1]
        ],
        outputItems: [[{ item: "modern_industrialization:portable_storage_unit" }, 1]],
        removeRecipe: true
    })

    //#endregion

    //#region refinery

    oritechRefineryRecipe(event, {
        time: 111,
        inputItems: [[{ item: "ae2:silicon" }, 1]],
        inputFluids: [[{ fluid: "immersiveengineering:phenolic_resin" }, 200]],
        outputFluids: [[{ fluid: "milf:silicone_modified_phenolic_resin" }, 200]],
    })


    oritechRefineryRecipe(event, {
        time: 141,
        inputItems: [[{ item: "milf:ferrosilicon_dust"}]],
        inputFluids: [[{ fluid: "immersiveengineering:redstone_acid" }, 326]],
        outputFluids: [
            [{ fluid: "minecraft:water" }, 100],
            [{ fluid: "modern_industrialization:hydrochloric_acid" }, 200]
        ],
        outputItems: [[{ item: "ae2:silicon" }, 1]],
    })

    oritechRefineryRecipe(event, {
        time: 242,
        inputItems: [[{ item: "milf:reservoir_rock" }]],
        outputFluids: [
            [{ fluid: "minecraft:water" }, 200],
            [{ fluid: "modern_industrialization:shale_oil" }, 200],
            [{ fluid: "modern_industrialization:hydrogen" }, 100]
        ],
        outputItems: [[{ item: "milf:kerogen" }, 1]],
    })

    oritechRefineryRecipe(event, {
        time: 572,
        inputFluids: [[{ fluid: "milf:syngas" }, 500]],
        inputItems: [[{ item: "oritech:enderic_compound" }]],
        outputFluids: [
            [{ fluid: "milf:purified_syngas" }, 250],
            [{ fluid: "modern_industrialization:sulfuric_acid" }, 150],
            [{ fluid: "modern_industrialization:chlorine" }, 100]
        ],
    })

    oritechRefineryRecipe(event, {
        time: 322,
        inputFluids: [[{ fluid: "milf:purified_syngas" }, 100]],
        inputItems: [[{ item: "modern_industrialization:adamant_dust" }]],
        outputFluids: [
            [{ fluid: "modern_industrialization:methane" }, 25],
            [{ fluid: "modern_industrialization:ethylene" }, 50],
            [{ fluid: "immersiveengineering:ethanol" }, 25]
        ],
    })

    //#endregion

    oritechCoolerRecipe(event, {
        time: 400,
        inputFluids: [[{ fluid: "milf:liquid_plastic" }, 100]],
        outputItems: [[{ item: "milf:basic_machine_bit" }, 1]],
    })

    //#region ieBottling

    ieBottlingMachineRecipe(event, {
        outputItems: [
            [{ item: "oritech:machine_core_2" }, 1]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:soldering_alloy" }, 400]
        ],
        inputItems: [
            [{ item: "modern_industrialization:redstone_battery" }, 1],
            [{ item: "modern_industrialization:tin_wire" }, 4],
            [{ item: "modern_industrialization:diamond_dust" }, 2]
        ],
        removeRecipe: true
    })

    ieBottlingMachineRecipe(event, {
        outputItems: [
            [{ item: "oritech:machine_core_3" }, 1]
        ],
        inputFluids: [
            [{ fluid: "milf:silicone_modified_phenolic_resin" }, 500]
        ],
        inputItems: [
            [{ item: "oritech:machine_core_2" }, 1],
            [{ item: "modern_industrialization:electrum_wire" }, 3],
            [{ item: "modern_industrialization:steel_curved_plate" }, 4]
        ],
        removeRecipe: true
    })

    ieBottlingMachineRecipe(event, {
        outputItems: [
            [{ item: "oritech:machine_extender" }, 1]
        ],
        inputFluids: [
            [{ fluid: "immersiveengineering:phenolic_resin" }, 500]
        ],
        inputItems: [
            [{ item: "modern_industrialization:basic_upgrade" }, 1],
            [{ item: "oritech:machine_core_2" }, 2],
            [{ item: "modern_industrialization:tumbaga_curved_plate" }, 4]
        ],
        removeRecipe: true
    })

    //#endregion

    //#region iePress

    iePressRecipe(event, {
        inputItems: [[{ "item": "oritech:biomass" }, 4]],
        outputItems: [[{ id: "oritech:biomass_block" }, 1]],
        mold: { item: "immersiveengineering:mold_packing_4" },
        energy: 3200,
        removeRecipe:true
    })


    // iePressRecipe(event, {
    //     inputItems: [[{ "item": "milf:basic_machine_bit" }, 4]],
    //     outputItems: [[{ id: "modern_industrialization:basic_machine_hull" }, 1]],
    //     mold: { item: "immersiveengineering:mold_packing_4" },
    //     energy: 3200,
    //     removeRecipe: true
    // })


    //#endregion

})

KubeJSTweaks.beforeRecipes(event => {

    const disableByRecipeID = [
        "oritech:centrifuge/carbon",
        "oritech:centrifuge/compat/immersiveengineering/carbon_fibre_strands",
        "oritech:plastic_sheet_from_smelting_polymer_resin",
        "oritech:plastic_sheet_from_blasting_polymer_resin",
        "oritech:crafting/alloy/adamant",
        "oritech:adamant_ingot_from_smelting_adamant_dust",
        "oritech:adamant_ingot_from_blasting_adamant_dust",
        "oritech:compat/immersiveengineering/alloying/adamant",
        "oritech:compat/immersiveengineering/arcalloying/adamant",
        "occultism:crushing/adamant_dust_from_ingot",
        "oritech:grinder/adamant"
    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })

})
