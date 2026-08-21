ServerEvents.recipes(event => {

    // miMachineRecipe(event, {energy:8, time:200, machine:"modern_industrialization:assembler",
    //     inputItems:[
    //         [{item:"modern_industrialization:tin_cable"}, 4],
    //         [{item:"modern_industrialization:portable_storage_unit"}],
    //         [{item:"milf:tempered_glass"}],
    //     ],
    //     inputFluids:[
    //         [{fluid:"milf:liquid_plastic"}, 1000],
    //     ],
    //     outputItems:[
    //         [{item:"modern_industrialization:basic_machine_hull"}]
    //     ],
    //     removeRecipe:true
    // })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:electrum_cable" }, 8],
            [{ item: "modern_industrialization:invar_large_plate" }, 4],
            [{ item: "modern_industrialization:electric_mi_furnace" }],
            [{ item: "modern_industrialization:electronic_circuit" }],
            [{ item: "modern_industrialization:cupronickel_wire_magnetic" }, 16],

        ],
        outputItems: [
            [{ item: "mi_tweaks:large_electric_furnace" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {energy:8, time:200, machine:"modern_industrialization:assembler",
        inputItems:[
            [{tag:"c:cobblestones"}, 8],
        ],
        outputItems:[
            [{item:"minecraft:furnace"}]
        ],
        removeRecipe:true
    })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:electronic_circuit_board" }, 1],
            [{ item: "oritech:plastic_sheet" }, 1],
            [{ item: "immersiveengineering:component_electronic_adv" }, 1],
            [{ item: "modern_industrialization:electrum_fine_wire" }, 5],

        ],
        outputItems: [
            [{ item: "modern_industrialization:overdrive_module" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:aluminum_large_plate" }, 1],
            [{ item: "modern_industrialization:gold_dust" }, 3],
            [{ item: "modern_industrialization:silver_dust" }, 4],

        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:benzene" }, 500],
            [{ fluid: "milf:liquid_plastic" }, 100]
        ],
        outputItems: [
            [{ item: "milf:cd" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:electronic_circuit_board" }, 1],
            [{ item: "oritech:plastic_sheet" }, 1],
            [{ item: "milf:tempered_glass" }, 1],
            [{ item: "modern_industrialization:electrum_fine_wire" }, 5],

        ],
        outputItems: [
            [{ item: "extended_industrialization:machine_config_card" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "enchanted:attuned_stone_charged" }, 1],
            [{ item: "immersiveengineering:resonanz_engineering" }, 1],
            [{ item: "modern_industrialization:electronic_circuit" }, 2],
            [{ item: "modern_industrialization:silicon_steel_large_plate" }, 4]
        ],
        outputItems: [[{ item: "chunkloaders:basic_chunk_loader" }, 1]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 15, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "oritech:machine_ultimate_addon" }, 2],
            [{ item: "modern_industrialization:rubber_sheet" }, 12],
            [{ item: "modern_industrialization:adamant_large_plate" }, 2],
            [{ item: "modern_industrialization:large_motor" }, 1],
            [{ item: "modern_industrialization:large_pump" }, 1],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:polyethylene" }, 1000],
            [{ fluid: "modern_industrialization:methane" }, 500]
        ],
        outputItems: [[{ item: "modern_industrialization:advanced_upgrade" }, 4]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 38, time: 300, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "oritech:carbon_fibre_strands" }, 6],
            [{ item: "ae2:quartz_vibrant_glass" }, 1],
            [{ item: "modern_industrialization:adamant_rod" }, 1],
            [{ item: "modern_industrialization:adamant_ring" }, 2]
        ],
        inputFluids: [
            [{ fluid: "milf:silicone_modified_phenolic_resin"}, 1000]
        ],
        outputItems: [[{ item: "modern_industrialization:carbon_coil" }, 1]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 22, time: 280, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "extendedae:ingredient_buffer" }, 1],
            [{ item: "ae2:logic_processor" }, 2],
            [{ item: "modern_industrialization:configurable_chest" }, 1],
            [{ item: "modern_industrialization:configurable_tank" }, 1]
        ],
        outputItems: [[{ item: "yet_another_industrialization:configurable_mixed_storage" }, 1]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 38, time: 200, machine: "modern_industrialization:assembler",
        inputFluids: [
            [{ fluid: "modern_industrialization:toluene" }, 1000],
            [{ fluid: "milf:liquid_plastic" }, 200]
        ],
        inputItems: [
            [{ "item": "modern_industrialization:advanced_machine_casing" }, 1],
            [{ "item": "modern_industrialization:adamant_rod" }, 12],
            [{ "item": "modern_industrialization:adamant_bolt" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:adamant_machine_casing" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 22, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "extended_industrialization:steam_farmer" }, 1],
            [{ "item": "modern_industrialization:robot_arm" }, 2],
            [{ "item": "modern_industrialization:large_pump" }, 2],
            [{ "item": "modern_industrialization:silicon_steel_large_plate" }, 6]
        ],
        outputItems: [[{ "item": "extended_industrialization:electric_farmer" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 22, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "modern_industrialization:electric_macerator" }, 2],
            [{ "item": "extended_industrialization:large_steam_macerator" }, 1],
            [{ "item": "modern_industrialization:large_motor" }, 3],
            [{ "item": "modern_industrialization:silicon_steel_curved_plate" }, 6]
        ],
        outputItems: [[{ "item": "extended_industrialization:large_electric_macerator" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 22, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "ae2:import_bus" }, 1],
            [{ "item": "modern_industrialization:steel_item_input_hatch" }, 1],
            [{ "item": "milf:basic_machine_bit" }, 4]
        ],
        outputItems: [[{ "item": "modern_industrialization:advanced_item_input_hatch" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 22, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "ae2:import_bus" }, 1],
            [{ "item": "modern_industrialization:steel_fluid_input_hatch" }, 1],
            [{ "item": "milf:basic_machine_bit" }, 4]
        ],
        outputItems: [[{ "item": "modern_industrialization:advanced_fluid_input_hatch" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 22, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "ae2:export_bus" }, 1],
            [{ "item": "modern_industrialization:steel_item_output_hatch" }, 1],
            [{ "item": "milf:basic_machine_bit" }, 4]
        ],
        outputItems: [[{ "item": "modern_industrialization:advanced_item_output_hatch" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 22, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "ae2:export_bus" }, 1],
            [{ "item": "modern_industrialization:steel_fluid_output_hatch" }, 1],
            [{ "item": "milf:basic_machine_bit" }, 4]
        ],
        outputItems: [[{ "item": "modern_industrialization:advanced_fluid_output_hatch" }]],
        removeRecipe: true
    })

    milfReversibleRecipe(event,
        "modern_industrialization:advanced_item_input_hatch",
        "modern_industrialization:advanced_item_output_hatch"
    )

    milfReversibleRecipe(event,
        "modern_industrialization:advanced_fluid_input_hatch",
        "modern_industrialization:advanced_fluid_output_hatch"
    )

    miMachineRecipe(event, {
        energy: 22, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "modern_industrialization:silver_wire" }, 4],
            [{ "item": "modern_industrialization:diode" }, 3],
            [{ "item": "oritech:flux_gate" }, 1],
            [{ "item": "milf:tempered_glass" }, 1],
            [{ "item": "modern_industrialization:silicon_steel_large_plate" }, 1]
        ],
        outputItems: [[{ "item": "extended_industrialization:tesla_calibrator" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 8, time: 300, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "modern_industrialization:silver_plate" }, 4],
            [{ "item": "milf:tempered_glass" }, 2],
            [{ "item": "modern_industrialization:adamant_dust" }, 2],
            [{ "item": "modern_industrialization:silicon_plate" }, 2]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:synthetic_rubber" }, 200]
        ],
        outputItems: [[{ "item": "extended_industrialization:mv_photovoltaic_cell" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 8, time: 300, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "modern_industrialization:transistor" }, 2],
            [{ "item": "modern_industrialization:diode" }, 2],
            [{ "item": "modern_industrialization:resistor" }, 2],
            [{ "item": "modern_industrialization:stainless_steel_plate" }, 1],
            [{ "item": "modern_industrialization:silicon_steel_plate" }, 1]
        ],
        inputFluids: [
            [{ fluid: "milf:silicone_modified_phenolic_resin" }, 250]
        ],
        outputItems: [[{ "item": "modern_industrialization:op_amp" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 266, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "modern_industrialization:aluminum_wire" }, 3],
            [{ "item": "modern_industrialization:transistor" }, 2],
            [{ "item": "modern_industrialization:diode" }, 1],
            [{ "item": "modern_industrialization:silicon_steel_plate" }, 1],
            [{ "item": "modern_industrialization:emerald_dust" }, 2]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:polyethylene" }, 100]
        ],
        outputItems: [[{ "item": "modern_industrialization:and_gate" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 11, time: 226, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "modern_industrialization:aluminum_wire" }, 3],
            [{ "item": "modern_industrialization:resistor" }, 6],
            [{ "item": "modern_industrialization:diode" }, 1],
            [{ "item": "modern_industrialization:silicon_steel_plate" }, 1],
            [{ "item": "modern_industrialization:lapis_dust" }, 2]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:polyethylene" }, 100]
        ],
        outputItems: [[{ "item": "modern_industrialization:not_gate" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 14, time: 221, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "modern_industrialization:aluminum_wire" }, 3],
            [{ "item": "modern_industrialization:resistor" }, 2],
            [{ "item": "modern_industrialization:transistor" }, 3],
            [{ "item": "modern_industrialization:silicon_steel_plate" }, 1],
            [{ "item": "minecraft:redstone" }, 2]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:polyethylene" }, 100]
        ],
        outputItems: [[{ "item": "modern_industrialization:or_gate" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 10, time: 156, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "modern_industrialization:electronic_circuit_board" }, 1],
            [{ "item": "modern_industrialization:plastic_large_plate" }, 2],
            [{ "item": "modern_industrialization:silicon_large_plate" }, 1],
            [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 1],
            [{ "item": "modern_industrialization:lead_wire" }, 5],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:polyethylene" }, 1000]
        ],
        outputItems: [[{ "item": "modern_industrialization:digital_circuit_board" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 18, time: 300, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ "item": "modern_industrialization:digital_circuit_board" }, 1],
            [{ "item": "oritech:advanced_computing_engine" }, 1],
            [{ "item": "modern_industrialization:silicon_battery" }, 2],
            [{ "item": "modern_industrialization:or_gate" }, 2],
            [{ "item": "modern_industrialization:not_gate" }, 2],
            [{ "item": "modern_industrialization:and_gate" }, 2],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:polyethylene" }, 1000]
        ],
        outputItems: [[{ "item": "modern_industrialization:digital_circuit" }]],
        removeRecipe: true
    })

})