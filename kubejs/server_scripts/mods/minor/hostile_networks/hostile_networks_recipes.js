ServerEvents.recipes(event => {
    
    // event.remove({mod: "hostilenetworks"})
    // event.remove({mod: "hostile_neural_industrialization"})

    event.replaceInput(
        { output: "hostile_neural_industrialization:large_simulation_chamber" },
        "hostilenetworks:sim_chamber",
        "hostile_neural_industrialization:electric_simulation_chamber"
    )
    event.replaceInput(
        { output: "hostile_neural_industrialization:large_loot_fabricator" },
        "hostilenetworks:loot_fabricator",
        "hostile_neural_industrialization:mono_loot_fabricator"
    )
    event.replaceInput(
        { output: "hostilenetworks:prediction_matrix" },
        "gold_ingot",
        "modern_industrialization:bronze_plate"
    )
    event.replaceInput(
        { output: "hostilenetworks:prediction_matrix" },
        "iron_ingot",
        "modern_industrialization:steel_plate"
    )

    const analog_circuit_replaces = [
        "hostile_neural_industrialization:mono_loot_fabricator",
        "hostile_neural_industrialization:electric_simulation_chamber"
    ]
    analog_circuit_replaces.forEach(element => {
        event.replaceInput(
            { output: element },
            "modern_industrialization:analog_circuit",
            "modern_industrialization:electronic_circuit"
        )
    })
    
    miMachineRecipe(event, {energy:8, time:300, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"hostilenetworks:blank_data_model"}]
        ],
        inputItems:[
            [{item:"modern_industrialization:redstone_control_module"}],
            [{item:"eidolon_repraised:lesser_soul_gem"}],
            [{item:"modern_industrialization:steel_large_plate"}],
        ],
        removeRecipe:true
    })
    
    miMachineRecipe(event, {energy:8, time:600, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"hostilenetworks:deep_learner"}]
        ],
        inputItems:[
            [{item:"modern_industrialization:redstone_control_module"}],
            [{item:"forbidden_arcanus:obsidiansteel_block"}],
            [{item:"modern_industrialization:steel_large_plate"}],
        ],
        removeRecipe:true
    })
    miMachineRecipe(event, {energy:8, time:500, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"hostilenetworks:sim_chamber"}]
        ],
        inputItems:[
            [{item:"modern_industrialization:redstone_control_module"}],
            [{item:"immersiveengineering:light_engineering"}],
            [{item:"modern_industrialization:steel_large_plate"}],
        ],
        removeRecipe:true
    })
    miMachineRecipe(event, {energy:8, time:500, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"hostilenetworks:loot_fabricator"}]
        ],
        inputItems:[
            [{item:"modern_industrialization:redstone_control_module"}],
            [{item:"immersiveengineering:heavy_engineering"}],
            [{item:"modern_industrialization:steel_large_plate"}],
        ],
        removeRecipe:true
    })

})