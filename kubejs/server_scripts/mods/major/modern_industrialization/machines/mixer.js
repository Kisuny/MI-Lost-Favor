ServerEvents.recipes(event => {

    // miMachineRecipe(event, {
    //     energy:8, time:100, machine:"modern_industrialization:mixer",
    //     inputItems:[
    //         [{tag:"c:plates/aluminum"}],
    //         [{tag:"c:dusts/aluminum"}],
    //     ],
    //     outputItems:[
    //         [{item:"milf:cd"}]
    //     ]
    // })

    // miMachineRecipe(event, {
    //     energy:8, time:600, machine:"modern_industrialization:mixer",
    //     inputItems:[
    //         [{tag:"c:dusts/diamond"}],
    //         [{tag:"c:nuggets/steel"}, 1, 0],
    //     ],
    //     outputItems:[
    //         [{item:"modern_industrialization:diamond_tiny_dust"}, 4]
    //     ]
    // })

    miMachineRecipe(event, {
        energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"minecraft:clay_ball"}, 2],
            [{item:"minecraft:kelp"}],
        ],
        outputItems:[
            [{item:"architects_palette:algal_blend"}, 4]
        ]
    })
    miMachineRecipe(event, {
        energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"modern_industrialization:brick_dust"}, 2],
            [{item:"architects_palette:algal_blend"}, 2],
        ],
        outputItems:[
            [{item:"milf:fire_clay_ball"}, 4]
        ],
        removeRecipe: true
    })
    
    miMachineRecipe(event, {
        energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"modern_industrialization:salt_dust"}],
            [{item:"minecraft:tuff"}],
        ],
        inputFluids:[
            [{fluid:"minecraft:water"}, 1000],
            [{fluid:"modern_industrialization:creosote"}, 500]
        ],
        outputItems:[
            [{item:"architects_palette:cerebral_plate"}, 16]
        ]
    })

    miMachineRecipe(event, {
        energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"minecraft:clay_ball"}, 3],
            [{item:"modern_industrialization:fire_clay_dust"}, 3],
            [{item:"modern_industrialization:bauxite_dust"}, 1],
            [{item:"modern_industrialization:iron_dust"}, 1]
        ],
        outputItems:[
            [{item:"milf:cement"}, 8]
        ]
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ tag: "minecraft:planks" }, 2],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:creosote" }, 250]
        ],
        outputItems: [
            [{ item: "immersiveengineering:treated_wood_horizontal" }, 2]
        ]
    })

    miMachineRecipe(event, {
        energy: 4, time: 200, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ item: "modern_industrialization:coke_dust" }, 1],
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 100]
        ],
        outputFluids: [
            [{ fluid: "modern_industrialization:raw_synthetic_oil" }, 200]
        ],
        removeThisRecipeType: true
    })

    miMachineRecipe(event, {
        energy: 5, time: 100, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ item: "modern_industrialization:carbon_dust" }, 1],
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 150]
        ],
        outputFluids: [
            [{ fluid: "modern_industrialization:raw_synthetic_oil" }, 250]
        ],
        removeThisRecipeType: true
    })
})