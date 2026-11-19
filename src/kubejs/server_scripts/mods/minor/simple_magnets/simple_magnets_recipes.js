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

    customEnchanterCraft(event, {
        time: 600,
        experience: 500,
        ingredients: [
            { "item": "simplemagnets:basicmagnet" },
            { "item": "milf:polarized_magnet_part" },
            { "item": "minecraft:redstone_block" },
            { "item": "minecraft:ender_eye" },
            { "item": "spectrum:blue_pigment" },
            { "item": "milf:polarized_magnet_part" },
            { "item": "minecraft:redstone_block" },
            { "item": "minecraft:ender_eye" },
            { "item": "spectrum:blue_pigment" }
        ],
        result: "simplemagnets:advancedmagnet",
        advancement: "spectrum:midgame/build_enchanting_structure"
    })
});
