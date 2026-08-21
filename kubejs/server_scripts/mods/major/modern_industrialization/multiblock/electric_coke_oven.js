ServerEvents.recipes(event => {
    // event.forEachRecipe({ type: 'modern_industrialization:coke_oven', not : {output: "#milf:nocompat"}}, r => {
    //     const rjson = JSON.parse(r.json)
    //     miMachineRecipe(event, {
    //         machine:"modern_industrialization:electric_coke_oven",
    //         energy:rjson.eu,
    //         time:rjson.duration,
    //         inputItems:[[rjson.item_inputs]],
    //         outputItems:[[rjson.item_outputs]],
    //         outputFluids:[[rjson.fluid_outputs]]
    //     })
    // })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:electric_coke_oven_cupronickel",
        inputItems: [
            [{ tag: "minecraft:logs_that_burn" }, 1]
        ],
        outputFluids: [
            [{ fluid: "modern_industrialization:creosote" }, 250],
        ],
        outputItems: [
            [{ item: "minecraft:charcoal" }, 1],
            [{ item: "minecraft:charcoal" }, 1, 0.44],
            [{ item: "minecraft:charcoal" }, 1, 0.22]
        ]
    })

    miMachineRecipe(event, {
        energy: 16, time: 400, machine: "modern_industrialization:electric_coke_oven_cupronickel",
        inputItems: [
            [{ item: "minecraft:coal_block" }, 1]
        ],
        outputFluids: [
            [{ fluid: "modern_industrialization:creosote" }, 2000],
            [{ fluid: "modern_industrialization:creosote" }, 1000, 0.77],
            [{ fluid: "modern_industrialization:creosote" }, 700, 0.55],
        ],
        outputItems: [
            [{ item: "modern_industrialization:coke" }, 7],
            [{ item: "modern_industrialization:coke" }, 5, 0.77],
            [{ item: "modern_industrialization:coke" }, 3, 0.55]
        ]
    })

    miMachineRecipe(event, {
        energy: 60, time: 100, machine: "modern_industrialization:electric_coke_oven_carbon",
        inputItems: [
            [{ item: "milf:kerogen" }, 1]
        ],
        outputFluids: [
            [{ fluid: "modern_industrialization:toluene" }, 150],
            [{ fluid: "modern_industrialization:benzene" }, 100],
            [{ fluid: "modern_industrialization:shale_oil" }, 150, 0.57],
        ],
        outputItems: [
            [{item: "oritech:biomass"}, 3, 0.33]
        ]
    })
})