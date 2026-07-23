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
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
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
        event.remove({ output: args.outputItems[0][0].id }) 
        if(args.outputFluids){
            args.outputFluids.forEach(output => {
                let fluid = Fluid.of(output[0].fluid)
                event.remove({ output: fluid })
            })
        }
    }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
    event.custom(recipe)
}

function oritechCentrifugeRecipe(event, args) {
    let ingredients = []
    let results = []
    args.inputItems.forEach(item => { ingredients.push(Object.assign({}, item[0], { count: item[1] || 1 })) })
    args.outputItems.forEach(item => { results.push(Object.assign({}, item[0].item ? { id: item[0].item } : item[0], { count: item[1] || 1 })) })
    let recipe = {
        type: "oritech:centrifuge",
        ingredients: ingredients,
        results: results,
        time: args.time || 100
    }
    if (!args.compatOff) {
        miMachineRecipe(event, {
            energy: 12, time: recipe.time, machine: "modern_industrialization:centrifuge",
            inputItems: args.inputItems,
            outputItems: args.outputItems
        })
    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
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
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    event.remove({ type: "oritech:pulverizer" })
    event.remove({ type: "oritech:foundry" })

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

    milfShaped(event, {
        pattern: [
            "PSP",
            "SIS",
            "PSP"
        ],
        key: {
            S: { item: `oritech:machine_core_2` },
            I: { item: "modern_industrialization:basic_upgrade" },
            P: { item: "oritech:machine_plating_block" }

        },
        outputItems: [[{ id: "oritech:machine_extender" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "W W",
            "WIW",
            " S "
        ],
        key: {
            S: { item: `modern_industrialization:steel_large_plate` },
            I: { item: "modern_industrialization:basic_upgrade" },
            W: { item: "immersiveengineering:wirecoil_electrum" }

        },
        outputItems: [[{ id: "oritech:machine_efficiency_addon" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "W W",
            "WIW",
            "S S"
        ],
        key: {
            S: { item: `modern_industrialization:steel_large_plate` },
            I: { item: "modern_industrialization:basic_upgrade" },
            W: { item: "immersiveengineering:wirecoil_electrum" }

        },
        outputItems: [[{ id: "oritech:machine_speed_addon" }, 1]],
        removeRecipe: true,
    })

    miMachineRecipe(event, {
        energy: 1, time: 200, machine: "modern_industrialization:not_so_multi_but_still_block_packer_2099_3x3x3_edition",
        inputItems: [
            [{ "item": "minecraft:glass_bottle" }, 6],
            [{ "item": "milf:basic_motor" }, 2],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "modern_industrialization:rubber_sheet" }, 12],
            [{ "item": "modern_industrialization:steel_rod" }, 6],
            [{ "item": "modern_industrialization:steel_gear" }, 2]
        ],
        outputItems: [[{ "item": "oritech:centrifuge_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 1, time: 200, machine: "modern_industrialization:not_so_multi_but_still_block_packer_2099_3x3x3_edition",
        inputItems: [
            [{ "item": "oritech:metal_beam_block" }, 6],
            [{ "item": "milf:basic_pump" }, 4],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "milf:tempered_glass" }, 12],
            [{ "item": "modern_industrialization:steel_large_plate" }, 6],
            [{ "item": "moderndynamics:fluid_pipe" }, 12]
        ],
        outputItems: [[{ "item": "oritech:refinery_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 1, time: 200, machine: "modern_industrialization:not_so_multi_but_still_block_packer_2099_3x3x3_edition",
        inputItems: [
            [{ "item": "milf:small_copper_fluid_container" }, 2],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "modern_industrialization:steel_rod" }, 4],
            [{ "item": "modern_industrialization:steel_large_plate" }, 2],
            [{ "item": "moderndynamics:fluid_pipe" }, 6]
        ],
        outputItems: [[{ "item": "oritech:steam_engine_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 1, time: 200, machine: "modern_industrialization:not_so_multi_but_still_block_packer_2099_3x3x3_edition",
        inputItems: [
            [{ "item": "immersiveengineering:wirecoil_electrum" }, 8],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "modern_industrialization:steel_large_plate" }, 4],
            [{ "item": "minecraft:grass_block" }, 6]
        ],
        outputItems: [[{ "item": "oritech:bio_generator_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

    miMachineRecipe(event, {
        energy: 1, time: 200, machine: "modern_industrialization:not_so_multi_but_still_block_packer_2099_3x3x3_edition",
        inputItems: [
            [{ "item": "immersiveengineering:wirecoil_electrum" }, 6],
            [{ "item": "oritech:machine_extender" }, 1],
            [{ "item": "modern_industrialization:steel_large_plate" }, 6],
            [{ "item": "minecraft:magma_block" }, 6],
            [{ "item": "moderndynamics:fluid_pipe" }, 6]
        ],
        outputItems: [[{ "item": "oritech:lava_generator_block" }, 1]],
        removeRecipe: "minecraft:crafting_shaped",
        compatOff: true
    })

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

    oritechRefineryRecipe(event, {
        time: 111,
        inputItems: [[{ item: "ae2:silicon" }, 1]],
        inputFluids: [[{ fluid: "immersiveengineering:phenolic_resin" }, 200]],
        outputFluids: [[{ fluid: "milf:silicone_modified_phenolic_resin" }, 200]],
    })

    oritechRefineryRecipe(event, {
        time: 141,
        inputItems: [
            [{
                "type": "neoforge:compound",
                "amount": 1,
                "children": 
                [
                    {
                        item: "milf:ferrosilicon_dust"
                    },
                    {
                        item: "extendedae:quartz_blend"
                    }
                ]}
            ]
        ],
        inputFluids: [[{ fluid: "immersiveengineering:redstone_acid" }, 326]],
        outputItems: [[{ item: "ae2:silicon" }, 1]],
    })

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
            [{ item: "modern_industrialization:electrum_wire" }, 3]
        ],
        removeRecipe: true
    })

})

KubeJSTweaks.beforeRecipes(event => {

    const disableByRecipeID = [
        "oritech:centrifuge/carbon",
        "oritech:centrifuge/compat/immersiveengineering/carbon_fibre_strands"
    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })

})
