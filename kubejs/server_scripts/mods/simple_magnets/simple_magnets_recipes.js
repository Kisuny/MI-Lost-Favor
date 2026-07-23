ServerEvents.recipes(event => {
    event.remove({output: [
        'simplemagnets:basicmagnet',
        'simplemagnets:advancedmagnet',
    ]})

    
    // event.replaceInput({mod: 'simplemagnets'}, 'minecraft:iron_ingot', 'modern_industrialization:iron_plate')
    // event.replaceInput({mod: 'simplemagnets'}, 'minecraft:redstone', 'immersiveengineering:wirecoil_redstone')
    // event.replaceInput({mod: 'simplemagnets'}, 'minecraft:gold_ingot', 'modern_industrialization:gold_plate')

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:polarizer",
        inputItems: [[{ item: "milf:magnet_part" }]],
        outputItems: [[{ item: "milf:polarized_magnet_part" }]],
    })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:cutting_machine",
        inputItems: [[{ item: "modern_industrialization:iron_double_ingot" }]],
        outputItems: [[{ item: "milf:magnet_part" }]],
        inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
    })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "milf:polarized_magnet_part" }, 2],
            [{ item: "spectrum:red_pigment" }, 4],
            [{ item: "spectrum:blue_pigment" }, 4]
        ],
        outputItems: [[{ item: "simplemagnets:basicmagnet" }]],
        inputFluids: [
            [{ fluid: "modern_industrialization:soldering_alloy"}, 1132]
        ]
    })


    addHephaestusRitual("advanced_magnet", {
        enhancers: "forbidden_arcanus:elementarium",
        essences: { aureal: 200, blood: 1000, souls: 10, experience: 666 },
        mainIngredient: "simplemagnets:basicmagnet",
        inputs: [
            { item: "companions:relic_gold", amount: 5 },
            { item: "bosses_of_mass_destruction:charged_ender_pearl", amount: 1 },
            { item: "milf:magnet_part", amount: 2 },
        ],
        result: "simplemagnets:advancedmagnet",
    })
});
