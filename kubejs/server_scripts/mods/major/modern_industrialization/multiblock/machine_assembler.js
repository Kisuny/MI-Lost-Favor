ServerEvents.recipes(event => {

    //#region basic

    miMachineRecipe(event, {
        energy: 32, time: 200, machine: "modern_industrialization:basic_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:steel_large_plate" }, 6],
            [{ "tag": "immersiveengineering:treated_wood" }, 12],
            [{ "item": "immersiveengineering:logic_unit" }, 4],
            [{ "item": "immersiveengineering:component_electronic_adv" }, 1],
            [{ "item": "immersiveengineering:wirecoil_steel" }, 12],
        ],
        outputItems: [[{ "item": "modern_industrialization:radio_transcriber" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 32, time: 200, machine: "modern_industrialization:basic_machine_assembler",
        inputItems: [
            [{ "item": "immersiveengineering:sheetmetal_steel" }, 32],
            [{ "tag": "immersiveengineering:treated_wood" }, 12],
            [{ "item": "immersiveengineering:component_electronic_adv" }, 1],
            [{ "item": "immersiveengineering:wirecoil_steel" }, 12],
            [{ "item": "milf:tempered_glass" }, 4],
            [{ "item": "milf:punched_card" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:enigma_machine" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 32, time: 200, machine: "modern_industrialization:basic_machine_assembler",
        inputItems: [
            [{ item: "immersiveengineering:component_electronic_adv" }, 1],
            [{ item: "modern_industrialization:cupronickel_wire_magnetic" }, 8],
            [{ item: "immersiveengineering:wirecoil_steel" }, 6],
            [{ item: "modern_industrialization:heatproof_machine_casing" }],
        ],
        outputItems: [
            [{ item: "modern_industrialization:electric_blast_furnace" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 32, time: 200, machine: "modern_industrialization:basic_machine_assembler",
        inputItems: [
            [{ item: "immersiveengineering:component_electronic_adv" }, 1],
            [{ item: "modern_industrialization:cupronickel_wire_magnetic" }, 4],
            [{ item: "modern_industrialization:steel_rod" }, 19],
            [{ item: "modern_industrialization:heatproof_machine_casing" }],
        ],
        outputItems: [
            [{ item: "mi_tweaks:electric_coke_oven" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 32, time: 200, machine: "modern_industrialization:basic_machine_assembler",
        inputItems: [
            [{ item: "modern_industrialization:large_motor" }, 4],
            [{ item: "modern_industrialization:electronic_circuit" }, 2],
            [{ item: "modern_industrialization:silicon_steel_large_plate" }, 6],
            [{ item: "immersiveengineering:wirecoil_steel" }, 4],
            [{ item: "modern_industrialization:aluminum_drill" }, 4],
        ],
        outputItems: [
            [{ item: "modern_industrialization:electric_quarry" }]
        ],
        removeRecipe: true
    })

    //#endregion

    //#region advanced

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:silicon_steel_bolt" }, 4],
            [{ "item": "modern_industrialization:tin_cable" }, 2],
            [{ "item": "modern_industrialization:portable_storage_unit" }, 1],
            [{ "item": "modern_industrialization:electronic_circuit" }, 1],
            [{ "item": "milf:basic_machine_bit" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:basic_machine_hull" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:inductor" }, 4],
            [{ "item": "immersiveengineering:electromagnet" }, 1],
            [{ "item": "modern_industrialization:steel_rod_magnetic" }, 4],
            [{ "item": "modern_industrialization:silicon_steel_large_plate" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:polarizer" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:inductor" }, 2],
            [{ "item": "extended_industrialization:steel_alloy_smelter" }, 1],
            [{ "item": "modern_industrialization:cupronickel_wire_magnetic" }, 4],
            [{ "item": "modern_industrialization:silicon_steel_curved_plate" }, 4],
            [{ "item": "modern_industrialization:adamant_large_plate" }, 2],
        ],
        outputItems: [[{ "item": "extended_industrialization:electric_alloy_smelter" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "extended_industrialization:steel_composter" }, 1],
            [{ "item": "milf:basic_motor" }, 4],
            [{ "item": "modern_industrialization:electrum_wire" }, 8],
            [{ "item": "modern_industrialization:bioresistant_alloy_large_plate" }, 3],
        ],
        outputItems: [[{ "item": "extended_industrialization:electric_composter" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:steel_water_pump" }, 1],
            [{ "item": "modern_industrialization:pump" }, 4],
            [{ "item": "immersiveengineering:wirecoil_electrum_ins" }, 8],
            [{ "item": "modern_industrialization:rubber_sheet" }, 12],
            [{ "item": "modern_industrialization:aluminum_rotor" }, 3],
            [{ "tag": "modern_industrialization:fluid_pipes" }, 6],
        ],
        outputItems: [[{ "item": "modern_industrialization:electric_water_pump" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "extended_industrialization:steel_brewery" }, 1],
            [{ "item": "modern_industrialization:pump" }, 1],
            [{ "item": "milf:tempered_glass" }, 2],
            [{ "item": "minecraft:glass_bottle" }, 3],
            [{ "item": "modern_industrialization:aluminum_rotor" }, 1],
            [{ "item": "minecraft:blaze_rod" }, 2],
            [{ "tag": "modern_industrialization:fluid_pipes" }, 3],
        ],
        outputItems: [[{ "item": "extended_industrialization:electric_brewery" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "extended_industrialization:steel_waste_collector" }, 1],
            [{ "item": "modern_industrialization:pump" }, 1],
            [{ "item": "modern_industrialization:aluminum_rotor" }, 1],
            [{ "item": "modern_industrialization:silicon_steel_rod" }, 4],
            [{ "tag": "modern_industrialization:fluid_pipes" }, 3],
        ],
        outputItems: [[{ "item": "extended_industrialization:electric_waste_collector" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "extended_industrialization:steel_honey_extractor" }, 1],
            [{ "item": "modern_industrialization:pump" }, 1],
            [{ "item": "milf:tempered_glass" }, 2],
            [{ "item": "modern_industrialization:aluminum_rotor" }, 1],
            [{ "item": "modern_industrialization:silicon_steel_plate" }, 2]
        ],
        outputItems: [[{ "item": "extended_industrialization:electric_honey_extractor" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:steel_mi_furnace" }, 1],
            [{ "item": "modern_industrialization:cupronickel_wire_magnetic" }, 6],
            [{ "item": "modern_industrialization:inductor" }, 2],
            [{ "item": "modern_industrialization:silicon_steel_rod" }, 5],
            [{ "item": "modern_industrialization:adamant_large_plate" }, 1],
        ],
        outputItems: [[{ "item": "modern_industrialization:electric_mi_furnace" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "immersiveengineering:capacitor_hv" }, 1],
            [{ "item": "modern_industrialization:tin_cable" }, 8],
            [{ "item": "modern_industrialization:redstone_battery" }, 8],
            [{ "item": "modern_industrialization:battery_alloy_large_plate" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:lv_storage_unit" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:steel_mixer" }, 1],
            [{ "item": "modern_industrialization:large_motor" }, 1],
            [{ "item": "milf:tempered_glass" }, 5],
            [{ "item": "modern_industrialization:aluminum_rotor" }, 1],
        ],
        outputItems: [[{ "item": "modern_industrialization:electric_mixer" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:steel_cutting_machine" }, 1],
            [{ "item": "modern_industrialization:large_motor" }, 1],
            [{ "item": "modern_industrialization:invar_rotary_blade" }, 1],
            [{ "item": "modern_industrialization:conveyor" }, 1],
            [{ "item": "modern_industrialization:silicon_steel_large_plate" }, 2]
        ],
        outputItems: [[{ "item": "modern_industrialization:electric_cutting_machine" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:steel_wiremill" }, 1],
            [{ "item": "modern_industrialization:large_motor" }, 1],
            [{ "item": "modern_industrialization:steel_rod_magnetic" }, 3],
            [{ "item": "modern_industrialization:adamant_curved_plate" }, 5],
            [{ "item": "modern_industrialization:adamant_rod" }, 2]
        ],
        outputItems: [[{ "item": "modern_industrialization:electric_wiremill" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:steel_wiremill" }, 1],
            [{ "item": "modern_industrialization:large_motor" }, 2],
            [{ "item": "modern_industrialization:invar_rotary_blade" }, 2],
            [{ "item": "modern_industrialization:adamant_bolt" }, 12]
        ],
        outputItems: [[{ "item": "modern_industrialization:electric_macerator" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:steel_compressor" }, 1],
            [{ "item": "modern_industrialization:piston" }, 2],
            [{ "item": "modern_industrialization:adamant_large_plate" }, 4],
            [{ "tag": "modern_industrialization:fluid_pipes" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:electric_compressor" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "extended_industrialization:steel_bending_machine" }, 1],
            [{ "item": "modern_industrialization:piston" }, 1],
            [{ "item": "modern_industrialization:adamant_curved_plate" }, 3],
            [{ "tag": "modern_industrialization:fluid_pipes" }, 4],
        ],
        outputItems: [[{ "item": "extended_industrialization:electric_bending_machine" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:steel_unpacker" }, 1],
            [{ "item": "modern_industrialization:piston" }, 1],
            [{ "item": "modern_industrialization:adamant_ring" }, 6]
        ],
        outputItems: [[{ "item": "modern_industrialization:electric_unpacker" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:steel_packer" }, 1],
            [{ "item": "modern_industrialization:piston" }, 1],
            [{ "item": "modern_industrialization:adamant_ring" }, 6]
        ],
        outputItems: [[{ "item": "modern_industrialization:electric_packer" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:large_motor" }, 2],
            [{ "item": "modern_industrialization:tin_cable" }, 4],
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:steel_rotor" }, 1],
            [{ "item": "immersiveengineering:component_electronic_adv" }, 1],
        ],
        outputItems: [[{ "item": "modern_industrialization:lv_steam_turbine" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:piston" }, 1],
            [{ "item": "modern_industrialization:tin_cable" }, 4],
            [{ "item": "milf:small_steel_fluid_container" }, 2],
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
        ],
        outputItems: [[{ "item": "modern_industrialization:lv_diesel_generator" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 300, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:large_pump" }, 1],
            [{ "item": "modern_industrialization:robot_arm" }, 2],
            [{ "item": "modern_industrialization:silicon_battery" }, 3],
            [{ "item": "modern_industrialization:adamant_large_plate" }, 2]
        ],
        outputItems: [[{ "item": "modern_industrialization:assembler" }]],
        removeRecipe: true
    })



    miMachineRecipe(event, {
        energy: 48, time: 280, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ item: "modern_industrialization:advanced_machine_hull" }, 1],
            [{ item: "modern_industrialization:large_pump" }, 1],
            [{ item: "extended_industrialization:mv_photovoltaic_cell" }, 1],
            [{ tag: "modern_industrialization:fluid_pipes" }, 12]
        ],
        outputItems: [[{ item: "extended_industrialization:mv_solar_panel" }, 1]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 280, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ item: "modern_industrialization:hardened_machine_casing" }, 1],
            [{ item: "ae2:logic_processor" }, 2],
            [{ item: "modern_industrialization:silicon_battery" }, 2],
            [{ item: "modern_industrialization:silicon_steel_bolt" }, 4]
        ],
        outputItems: [[{ item: "modern_industrialization:advanced_machine_hull" }, 1]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 280, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ item: "modern_industrialization:advanced_machine_hull" }, 1],
            [{ item: "ae2:logic_processor" }, 4],
            [{ item: "modern_industrialization:silicon_battery" }, 4],
            [{ item: "modern_industrialization:silver_plate" }, 4],
            [{ item: "modern_industrialization:electrum_cable" }, 8],
            [{ item: "extended_industrialization:silver_tesla_top_load" }, 1]
        ],
        outputItems: [[{ item: "extended_industrialization:tesla_coil" }, 1]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 48, time: 280, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ item: "modern_industrialization:advanced_machine_hull" }, 1],
            [{ item: "ae2:logic_processor" }, 4],
            [{ item: "modern_industrialization:silicon_battery" }, 4],
            [{ item: "modern_industrialization:silver_plate" }, 4],
            [{ item: "modern_industrialization:electrum_cable" }, 8],
            [{ item: "extended_industrialization:silver_tesla_top_load" }, 1]
        ],
        outputItems: [[{ item: "extended_industrialization:tesla_receiver" }, 1]],
        removeRecipe: true
    })

    milfReversibleRecipe(event, 
        "extended_industrialization:tesla_coil",
        "extended_industrialization:tesla_receiver"
    )

    miMachineRecipe(event, {
        energy: 54, time: 300, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:advanced_machine_hull" }, 1],
            [{ "item": "modern_industrialization:large_pump" }, 3],
            [{ "item": "modern_industrialization:electronic_circuit" }, 2],
            [{ "item": "oritech:cooler_block" }, 1],
            [{ "item": "modern_industrialization:adamant_large_plate" }, 2],
            [{ "item": "modern_industrialization:aluminum_large_plate" }, 6]
        ],
        outputItems: [[{ "item": "modern_industrialization:vacuum_freezer" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 54, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:large_motor" }, 3],
            [{ "item": "modern_industrialization:electrum_cable" }, 4],
            [{ "item": "modern_industrialization:lv_steam_turbine" }, 1],
            [{ "item": "modern_industrialization:aluminum_rotor" }, 1],
            [{ "item": "modern_industrialization:plastic_large_plate" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:mv_steam_turbine" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 54, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:large_pump" }, 1],
            [{ "item": "modern_industrialization:adamant_gear" }, 2],
            [{ "item": "modern_industrialization:electrum_cable" }, 4],
            [{ "item": "modern_industrialization:lv_diesel_generator" }, 1],
            [{ "item": "modern_industrialization:plastic_large_plate" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:mv_diesel_generator" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 54, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:large_motor" }, 6],
            [{ "item": "modern_industrialization:adamant_gear" }, 2],
            [{ "item": "milf:tempered_glass" }, 4],
            [{ "item": "modern_industrialization:electrum_cable" }, 4],
            [{ "item": "ae2:logic_processor" }, 2],
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:plastic_large_plate" }, 6],
        ],
        outputItems: [[{ "item": "modern_industrialization:centrifuge" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 54, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:large_pump" }, 2],
            [{ "item": "modern_industrialization:bioresistant_alloy_large_plate" }, 8],
            [{ "item": "milf:tempered_glass" }, 2],
            [{ "item": "modern_industrialization:electrum_cable" }, 4],
            [{ "item": "ae2:logic_processor" }, 2],
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:plastic_large_plate" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:chemical_reactor" }]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 54, time: 200, machine: "modern_industrialization:advanced_machine_assembler",
        inputItems: [
            [{ "item": "modern_industrialization:large_pump" }, 1],
            [{ "item": "modern_industrialization:cupronickel_wire_magnetic" }, 16],
            [{ "item": "oritech:enderic_compound" }, 2],
            [{ "item": "milf:tempered_glass" }, 6],
            [{ "item": "modern_industrialization:electrum_cable" }, 4],
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:plastic_large_plate" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:electrolyzer" }]],
        removeRecipe: true
    })

    //#endregion

})


