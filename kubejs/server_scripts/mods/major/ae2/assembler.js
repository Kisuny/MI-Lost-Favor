ServerEvents.recipes(event => {
    /*
    var tier1token = "milf:mysterious_disk"
    var tier2token = "milf:storage_disk"
    var tier3token = "milf:automation_disk"
    var tier4token = "milf:quantum_disk"
    */

    const T1_TOKEN = {tag:"mi_lost_favor:tier_1_recipes"}
    const T2_TOKEN = {tag:"mi_lost_favor:tier_2_recipes"}
    const T3_TOKEN = {tag:"mi_lost_favor:tier_3_recipes"}
    const T4_TOKEN = {tag:"mi_lost_favor:tier_4_recipes"}

    const T1_ENERGY = 4
    const T2_ENERGY = 8
    const T3_ENERGY = 12
    const T4_ENERGY = 20
    const T5_ENERGY = 28

    const T1_TIME = 100
    const T2_TIME = 200
    const T3_TIME = 400
    const T4_TIME = 800
    const T5_TIME = 1600

    //#region helper functions
    function ae_item_cell (cellComponent, output, token, housing) {
        housing = housing || "ae2:item_cell_housing"
        miMachineRecipe(event, {
            energy: 16,
            time: 200,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: "ae2:quartz_glass"}, 2],
                [{item: housing}, 1],
                [{item: cellComponent}, 1]
            ],
            inputFluids: [
                [{fluid: "modern_industrialization:molten_redstone"}, 250],
                [{fluid: "modern_industrialization:soldering_alloy"}, 100]
            ],
            outputItems: [
                [{item: output}, 1]
            ],
            token: token,
            removeRecipe: true
        });
    }

    function ae_fluid_cell (cellComponent, output, token, housing) {
        housing = housing || "ae2:fluid_cell_housing"
        miMachineRecipe(event, {
            energy: 16,
            time: 200,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: "ae2:quartz_glass"}, 2],
                [{item: housing}, 1],
                [{item: cellComponent}, 1]
            ],
            inputFluids: [
                [{fluid: "modern_industrialization:molten_redstone"}, 250],
                [{fluid: "modern_industrialization:soldering_alloy"}, 100]
            ],
            outputItems: [
                [{item: output}, 1]
            ],
            token: token,
            removeRecipe: true
        });
    }

    function ae_cell_component (cellComponent, upgradeMaterial, processor, output, token) {
        miMachineRecipe(event, {
            energy: 16,
            time: 200,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: cellComponent}, 4],
                [{item: processor}, 1],
                [{item: upgradeMaterial}, 4]
            ],
            outputItems: [
                [{item: output}, 1]
            ],
            token: token,
            removeRecipe: true
        });
    }

    function ae_processor (printedCircuit, output, token) {
        miMachineRecipe(event, {
            energy: 16,
            time: 200,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: "ae2:printed_silicon"}, 1],
                [{item: printedCircuit}, 1]
            ],
            inputFluids: [
                [{fluid: "modern_industrialization:molten_redstone"}, 250]
            ],
            outputItems: [
                [{item: output}, 1]
            ],
            token: token,
            removeRecipe: true
        });
    }

    function ae_core (coreMaterial, output, token) {
        miMachineRecipe(event, {
            energy: 16,
            time: 200,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: "milf:core_hull"}, 1],
                [{item: "ae2:quartz_glass"}, 4],
                [{item: coreMaterial}, 1]
            ],
            inputFluids: [
                [{fluid: "modern_industrialization:polyethylene"}, 250]
            ],
            outputItems: [
                [{item: output}, 1]
            ],
            token: token,
            removeRecipe: true
        });
    }

    function ae_card (base, upgradeMaterial, output, token) {
        miMachineRecipe(event, {
            energy: 16,
            time: 200,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: base}, 1],
                [{item: upgradeMaterial}, 4]
            ],
            inputFluids: [
                [{fluid: "modern_industrialization:molten_redstone"}, 250]
            ],
            outputItems: [
                [{item: output}, 1]
            ],
            token: token,
            removeRecipe: true
        });
    }

    function cell_upgrade (baseCell, nextCellComponent, upgradeMaterial, output, token) {
        miMachineRecipe(event, {
            energy: 16,
            time: 200,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: baseCell}, 1],
                [{item: nextCellComponent}, 1],
                [{tag: upgradeMaterial}, 2]
            ],
            outputItems: [
                [{item: output}, 1]
            ],
            token: token,
            removeRecipe: true
        });
    }

    function ae_crafting_storage (cellComponent, wireMaterial, output, token) {
        miMachineRecipe(event, {
            energy: 16,
            time: 200,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: cellComponent}, 1],
                [{item: "ae2:calculation_processor"}, 1],
                [{item: "ae2:crafting_unit"}, 1],
                [{tag: "c:dusts/aluminum"}, 8],
                [{tag: "c:wires/" + wireMaterial}, 4]
            ],
            outputItems: [
                [{item: output}, 1]
            ],
            token: token,
            removeRecipe: true
        });
    }

    function ae_crafting_storage_upgrade (cellComponent, craftingStorage, wireMaterial, output, token) {
        miMachineRecipe(event, {
            energy: 16,
            time: 200,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: cellComponent}, 1],
                [{item: craftingStorage}, 1],
                [{tag: "c:wires/" + wireMaterial}, 2]
            ],
            outputItems: [
                [{item: output}, 1]
            ],
            token: token,
            removeRecipe: true
        });
    }

    function ae_assembler_knife_reversable_recipe(item1, item2){
        miMachineRecipe(event, {
            energy: 8,
            time: 60,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: item1}, 1],
                [{item: "ae2:certus_quartz_cutting_knife"}, 1, 0]
            ],
            outputItems: [
                [{item: item2}, 1]
            ],
            removeRecipe: true
        });
        
        miMachineRecipe(event, {
            energy: 8,
            time: 60,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{item: item2}, 1],
                [{item: "ae2:certus_quartz_cutting_knife"}, 1, 0]
            ],
            outputItems: [
                [{item: item1}, 1]
            ],
            removeRecipe: true
        });
    }
    //#endregion

    // #region cell components
    ae_cell_component("modern_industrialization:aluminum_plate", "ae2:certus_quartz_dust", "ae2:logic_processor", "ae2:cell_component_1k", T1_TOKEN)

    ae_cell_component("ae2:cell_component_1k", "ae2:fluix_dust", "ae2:calculation_processor", "ae2:cell_component_4k", T2_TOKEN)
    ae_cell_component("ae2:cell_component_4k", "modern_industrialization:aluminum_dust", "ae2:calculation_processor", "ae2:cell_component_16k", T2_TOKEN)
    ae_cell_component("ae2:cell_component_16k", "modern_industrialization:sodium_dust", "ae2:engineering_processor", "ae2:cell_component_64k", T2_TOKEN)
    ae_cell_component("ae2:cell_component_64k", "modern_industrialization:ruby_dust", "ae2:engineering_processor", "ae2:cell_component_256k", T2_TOKEN)

    ae_cell_component("ae2:cell_component_256k", "ae2:sky_dust", "megacells:accumulation_processor", "megacells:cell_component_1m", T3_TOKEN)
    ae_cell_component("megacells:cell_component_1m", "advanced_ae:quantum_infused_dust", "megacells:accumulation_processor", "megacells:cell_component_4m", T3_TOKEN)
    ae_cell_component("megacells:cell_component_4m", "advanced_ae:quantum_infused_dust", "megacells:accumulation_processor", "megacells:cell_component_16m", T3_TOKEN)
    ae_cell_component("ae2:fluix_pearl", "advanced_ae:quantum_infused_dust", "megacells:accumulation_processor", "ae2:spatial_cell_component_2", T3_TOKEN)
    ae_cell_component("ae2:spatial_cell_component_2", "advanced_ae:quantum_infused_dust", "advanced_ae:quantum_processor", "ae2:spatial_cell_component_16", T3_TOKEN)
    ae_cell_component("ae2:spatial_cell_component_16", "advanced_ae:quantum_infused_dust", "extendedae:concurrent_processor", "ae2:spatial_cell_component_128", T3_TOKEN)
    ae_cell_component("ae2:cell_component_256k", "advanced_ae:quantum_infused_dust", "megacells:accumulation_processor", "bigger_ae2:quantum_cell_component", T3_TOKEN)
    ae_cell_component("ae2:singularity", "advanced_ae:quantum_infused_dust", "bigger_ae2:quantum_cell_component", "bigger_ae2:digital_singularity_cell_component", T3_TOKEN)

    ae_cell_component("extendedae:concurrent_processor", "advanced_ae:quantum_infused_dust", "bigger_ae2:digital_singularity_cell_component", "megacells:bulk_cell_component", T4_TOKEN)
    ae_cell_component("megacells:cell_component_16m", "extendedae:entro_dust", "extendedae:concurrent_processor", "megacells:cell_component_64m", T4_TOKEN)
    ae_cell_component("megacells:cell_component_64m", "extendedae:entro_dust", "extendedae:concurrent_processor", "megacells:cell_component_256m", T4_TOKEN)
    // #endregion

    // #region cells
    ae_item_cell("ae2:spatial_cell_component_2", "ae2:spatial_storage_cell_2", T3_TOKEN)
    ae_item_cell("ae2:spatial_cell_component_16", "ae2:spatial_storage_cell_16", T3_TOKEN)
    ae_item_cell("ae2:spatial_cell_component_128", "ae2:spatial_storage_cell_128", T4_TOKEN)

    ae_item_cell("ae2:cell_component_1k", "ae2:item_storage_cell_1k", T2_TOKEN)
    ae_item_cell("ae2:cell_component_4k", "ae2:item_storage_cell_4k", T3_TOKEN)
    ae_item_cell("ae2:cell_component_16k", "ae2:item_storage_cell_16k", T3_TOKEN)
    ae_item_cell("ae2:cell_component_64k", "ae2:item_storage_cell_64k", T3_TOKEN)
    ae_item_cell("ae2:cell_component_256k", "ae2:item_storage_cell_256k", T3_TOKEN)

    ae_item_cell("megacells:cell_component_1m", "megacells:item_storage_cell_1m", T3_TOKEN, "megacells:mega_item_cell_housing")
    ae_item_cell("megacells:cell_component_4m", "megacells:item_storage_cell_4m", T3_TOKEN, "megacells:mega_item_cell_housing")
    ae_item_cell("megacells:cell_component_16m", "megacells:item_storage_cell_16m", T3_TOKEN, "megacells:mega_item_cell_housing")
    ae_item_cell("bigger_ae2:quantum_cell_component", "bigger_ae2:quantum_item_storage_cell", T3_TOKEN, "bigger_ae2:advanced_item_cell_housing")
    ae_item_cell("bigger_ae2:digital_singularity_cell_component", "bigger_ae2:digital_singularity_item_storage_cell", T3_TOKEN, "bigger_ae2:advanced_item_cell_housing")

    ae_item_cell("megacells:cell_component_64m", "megacells:item_storage_cell_64m", T4_TOKEN, "megacells:mega_item_cell_housing")
    ae_item_cell("megacells:cell_component_256m", "megacells:item_storage_cell_256m", T4_TOKEN, "megacells:mega_item_cell_housing")

    ae_fluid_cell("ae2:cell_component_1k", "ae2:fluid_storage_cell_1k", T2_TOKEN)
    ae_fluid_cell("ae2:cell_component_4k", "ae2:fluid_storage_cell_4k", T3_TOKEN)
    ae_fluid_cell("ae2:cell_component_16k", "ae2:fluid_storage_cell_16k", T3_TOKEN)
    ae_fluid_cell("ae2:cell_component_64k", "ae2:fluid_storage_cell_64k", T3_TOKEN)
    ae_fluid_cell("ae2:cell_component_256k", "ae2:fluid_storage_cell_256k", T3_TOKEN)

    ae_fluid_cell("megacells:cell_component_1m", "megacells:fluid_storage_cell_1m", T3_TOKEN, "megacells:mega_item_cell_housing")
    ae_fluid_cell("megacells:cell_component_4m", "megacells:fluid_storage_cell_4m", T3_TOKEN, "megacells:mega_item_cell_housing")
    ae_fluid_cell("megacells:cell_component_16m", "megacells:fluid_storage_cell_16m", T3_TOKEN, "megacells:mega_item_cell_housing")
    ae_fluid_cell("bigger_ae2:quantum_cell_component", "bigger_ae2:quantum_fluid_storage_cell", T3_TOKEN, "bigger_ae2:advanced_fluid_cell_housing")
    ae_fluid_cell("bigger_ae2:digital_singularity_cell_component", "bigger_ae2:digital_singularity_fluid_storage_cell", T3_TOKEN, "bigger_ae2:advanced_fluid_cell_housing")

    ae_fluid_cell("megacells:cell_component_64m", "megacells:fluid_storage_cell_64m", T4_TOKEN, "megacells:mega_item_cell_housing")
    ae_fluid_cell("megacells:cell_component_256m", "megacells:fluid_storage_cell_256m", T4_TOKEN, "megacells:mega_item_cell_housing")

    cell_upgrade("ae2:item_storage_cell_1k", "ae2:cell_component_4k", "c:dusts/fluix", "ae2:item_storage_cell_4k", T3_TOKEN)
    cell_upgrade("ae2:item_storage_cell_4k", "ae2:cell_component_16k", "c:dusts/aluminum", "ae2:item_storage_cell_16k", T3_TOKEN)
    cell_upgrade("ae2:item_storage_cell_16k", "ae2:cell_component_64k", "c:dusts/sodium", "ae2:item_storage_cell_64k", T3_TOKEN)
    cell_upgrade("ae2:item_storage_cell_64k", "ae2:cell_component_256k", "c:dusts/ruby", "ae2:item_storage_cell_256k", T3_TOKEN)

    cell_upgrade("ae2:fluid_storage_cell_1k", "ae2:cell_component_4k", "c:dusts/fluix", "ae2:fluid_storage_cell_4k", T3_TOKEN)
    cell_upgrade("ae2:fluid_storage_cell_4k", "ae2:cell_component_16k", "c:dusts/aluminum", "ae2:fluid_storage_cell_16k", T3_TOKEN)
    cell_upgrade("ae2:fluid_storage_cell_16k", "ae2:cell_component_64k", "c:dusts/sodium", "ae2:fluid_storage_cell_64k", T3_TOKEN)
    cell_upgrade("ae2:fluid_storage_cell_64k", "ae2:cell_component_256k", "c:dusts/ruby", "ae2:fluid_storage_cell_256k", T3_TOKEN)
    // #endregion

    // #region crafting storage
    ae_crafting_storage("ae2:cell_component_1k", "electrum", "ae2:1k_crafting_storage", T2_TOKEN)
    ae_crafting_storage("ae2:cell_component_4k", "electrum", "ae2:4k_crafting_storage", T2_TOKEN)
    ae_crafting_storage("ae2:cell_component_16k", "electrum", "ae2:16k_crafting_storage", T2_TOKEN)
    ae_crafting_storage("ae2:cell_component_64k", "aluminum", "ae2:64k_crafting_storage", T2_TOKEN)
    ae_crafting_storage("ae2:cell_component_256k", "aluminum", "ae2:256k_crafting_storage", T2_TOKEN)

    ae_crafting_storage_upgrade("ae2:cell_component_4k", "ae2:1k_crafting_storage", "electrum", "ae2:4k_crafting_storage", T2_TOKEN)
    ae_crafting_storage_upgrade("ae2:cell_component_16k", "ae2:4k_crafting_storage", "electrum", "ae2:16k_crafting_storage", T2_TOKEN)
    ae_crafting_storage_upgrade("ae2:cell_component_64k", "ae2:16k_crafting_storage", "electrum", "ae2:64k_crafting_storage", T2_TOKEN)
    ae_crafting_storage_upgrade("ae2:cell_component_256k", "ae2:64k_crafting_storage", "electrum", "ae2:256k_crafting_storage", T2_TOKEN)
    // #endregion

    // #region reversable_recipes
    ae_assembler_knife_reversable_recipe("advanced_ae:adv_pattern_provider_part", "advanced_ae:adv_pattern_provider")
    ae_assembler_knife_reversable_recipe("ae2:cable_pattern_provider", "ae2:pattern_provider")

    ae_assembler_knife_reversable_recipe("ae2:toggle_bus", "ae2:inverted_toggle_bus")

    ae_assembler_knife_reversable_recipe("ae2:cable_energy_acceptor", "ae2:energy_acceptor")

    ae_assembler_knife_reversable_recipe("ae2:cable_interface", "ae2:interface")
    ae_assembler_knife_reversable_recipe("extendedae:ex_interface_part", "extendedae:ex_interface")
    ae_assembler_knife_reversable_recipe("megacells:cable_mega_interface", "megacells:mega_interface")
    ae_assembler_knife_reversable_recipe("extendedae:oversize_interface_part", "extendedae:oversize_interface")
    // #endregion

    // #region cell housings
    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "modern_industrialization:aluminum_plate"}, 2]
        ],
        inputFluids: [
            [{fluid: "modern_industrialization:soldering_alloy"}, 500]
        ],
        outputItems: [
            [{item: "ae2:item_cell_housing"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "modern_industrialization:copper_plate"}, 2]
        ],
        inputFluids: [
            [{fluid: "modern_industrialization:soldering_alloy"}, 500]
        ],
        outputItems: [
            [{item: "ae2:fluid_cell_housing"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "megacells:sky_steel_ingot"}, 4]
        ],
        inputFluids: [
            [{fluid: "modern_industrialization:soldering_alloy"}, 500]
        ],
        outputItems: [
            [{item: "megacells:mega_item_cell_housing"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "megacells:sky_bronze_ingot"}, 4]
        ],
        inputFluids: [
            [{fluid: "modern_industrialization:soldering_alloy"}, 500]
        ],
        outputItems: [
            [{item: "megacells:mega_fluid_cell_housing"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "modern_industrialization:gold_plate"}, 8]
        ],
        inputFluids: [
            [{fluid: "modern_industrialization:soldering_alloy"}, 500]
        ],
        outputItems: [
            [{item: "bigger_ae2:advanced_item_cell_housing"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "modern_industrialization:titanium_plate"}, 8]
        ],
        inputFluids: [
            [{fluid: "modern_industrialization:soldering_alloy"}, 500]
        ],
        outputItems: [
            [{item: "bigger_ae2:advanced_fluid_cell_housing"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "modern_industrialization:titanium_plate"}, 8],
            [{item: "ars_nouveau:source_gem"}, 4]
        ],
        inputFluids: [
            [{fluid: "modern_industrialization:soldering_alloy"}, 500]
        ],
        outputItems: [
            [{item: "bigger_ae2:advanced_source_cell_housing"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });
    // #endregion

    // #region tier 1 recipes

    // #region AE
    ae_processor("ae2:printed_logic_processor", "ae2:logic_processor", T3_TOKEN)

    ae_card("ae2:basic_card", "minecraft:redstone", "ae2:redstone_card", T1_TOKEN)
    ae_card("ae2:basic_card", "minecraft:chest", 'ae2:capacity_card', T1_TOKEN)
    ae_card("ae2:basic_card", "minecraft:magma_block", 'ae2:void_card', T1_TOKEN)
    ae_card("ae2:basic_card", "minecraft:crafting_table", 'ae2:crafting_card', T1_TOKEN)

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "moderndynamics:item_pipe" }, 1],
            [{ item: "modern_industrialization:advanced_item_output_hatch" }, 1],
            [{ item: "modern_industrialization:advanced_item_input_hatch" }, 1],
            [{ item: "ae2:fluix_crystal" }, 3]
        ],
        outputItems: [
            [{ item: "ae2:storage_bus" }, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "modern_industrialization:aluminum_large_plate"}, 4],
            [{item: "modern_industrialization:certus_quartz_rod"}, 16],
            [{item: "milf:cell_half"}, 4],
            [{item: "ae2:logic_processor"}, 4]
        ],
        outputItems: [
            [{item: "ae2:cell_workbench"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:import_bus"}, 1],
            [{item: "ae2:export_bus"}, 1],
            [{item: "ae2:logic_processor"}, 1]
        ],
        outputItems: [
            [{item: "advanced_ae:import_export_bus_part"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:rods/aluminum"}, 6],
            [{tag: "c:wires/electrum"}, 8],
            [{tag: "c:plates/iron"}, 4],
            [{item: "ae2:fluix_crystal"}, 2],
            [{item: "ae2:logic_processor"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:me_packing_tape"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:fluid_storage_cell_1k"}, 1],
            [{item: "ae2:item_storage_cell_1k"}, 1],
            [{item: "ae2:logic_processor"}, 2],
            [{tag: "c:plates/aluminum"}, 4],
            [{item: "ae2:quartz_glass"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:ingredient_buffer"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "modern_industrialization:aluminum_large_plate"}, 6],
            [{item: "modern_industrialization:certus_quartz_rod"}, 24],
            [{item: "milf:cell_half"}, 10],
            [{item: "modern_industrialization:rubber_sheet"}, 20],
            [{item: "ae2:fluix_glass_cable"}, 2],
            [{item: "ae2:logic_processor"}, 4]
        ],
        outputItems: [
            [{item: "ae2:drive"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:plates/aluminum"}, 2],
            [{item: "ae2:fluix_glass_cable"}, 4],
            [{item: "modern_industrialization:steel_item_input_hatch"}, 1],
            [{item: "ae2:logic_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:import_bus"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:plates/aluminum"}, 2],
            [{item: "ae2:fluix_glass_cable"}, 4],
            [{item: "modern_industrialization:steel_item_output_hatch"}, 1],
            [{item: "ae2:logic_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:export_bus"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "modern_industrialization:mv_energy_input_hatch"}, 1],
            [{item: "ae2:fluix_glass_cable"}, 4],
            [{item: "modern_industrialization:electrum_wire"}, 8],
            [{item: "ae2:logic_processor"}, 2]
        ],
        outputItems: [
            [{item: "ae2:energy_acceptor"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "modern_industrialization:electrum_wire"}, 4],
            [{tag: "c:plates/gold"}, 2],
            [{item: "ae2:logic_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:basic_card"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "moderndynamics:item_pipe"}, 1],
            [{item: "ae2:fluix_crystal"}, 2]
        ],
        outputItems: [
            [{item: "ae2:fluix_glass_cable"}, 2]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:fluix_crystal"}, 4],
            [{tag: "c:wires/electrum"}, 8],
            [{item: "ae2:quartz_glass"}, 1],
            [{item: "ae2:logic_processor"}, 1],
            [{item: "modern_industrialization:redstone_battery"}, 8]
        ],
        outputItems: [
            [{item: "ae2:energy_cell"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:fluid_cell_housing"}, 1],
            [{item: "ae2:item_cell_housing"}, 1],
            [{tag: "ae2:glass_cable"}, 1],
            [{item: "ae2:logic_processor"}, 1]
        ],
        outputItems: [
            [{item: "megacells:cell_dock"}, 1]
        ],
        token: T1_TOKEN,
        removeRecipe: true
    });

    // #endregion

    // #endregion

    // #region tier 2 recipes
    ae_processor("ae2:printed_engineering_processor", "ae2:engineering_processor", T3_TOKEN)
    ae_processor("ae2:printed_calculation_processor", "ae2:calculation_processor", T3_TOKEN)

    ae_core ("ae2:calculation_processor", "ae2:annihilation_core", T3_TOKEN)
    ae_core ("ae2:engineering_processor", "ae2:formation_core", T3_TOKEN)

    ae_card("ae2:advanced_card", "modern_industrialization:lead_dust", "ae2:fuzzy_card", T2_TOKEN)
    ae_card("ae2:advanced_card", "minecraft:glowstone_dust", 'ae2:speed_card', T2_TOKEN)
    ae_card("ae2:advanced_card", "minecraft:redstone_torch", "ae2:inverter_card", T2_TOKEN)
    ae_card("ae2:advanced_card", "ae2:fluix_crystal", 'ae2:equal_distribution_card', T2_TOKEN)
    ae_card("ae2:advanced_card", "ae2:charged_certus_quartz_crystal", 'ae2:energy_card', T2_TOKEN)

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:level_emitter"}, 1],
            [{item: "modern_industrialization:silicon_battery"}, 1]
        ],
        outputItems: [
            [{item: "ae2:energy_level_emitter"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:energy_level_emitter"}, 1],
            [{item: "ae2:logic_processor"}, 2]
        ],
        outputItems: [
            [{item: "extendedae:threshold_level_emitter"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "ae2:illuminated_panel"}, 1],
            [{item: "ae2:level_emitter"}, 1]
        ],
        outputItems: [
            [{item: "ae2:storage_monitor"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:storage_monitor"}, 1],
            [{item: "ae2:logic_processor"}, 2]
        ],
        outputItems: [
            [{item: "advanced_ae:throughput_monitor"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:storage_bus"}, 1],
            [{item: "ae2:logic_processor"}, 2]
        ],
        outputItems: [
            [{item: "extendedae:tag_storage_bus"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:storage_bus"}, 1],
            [{item: "ae2:engineering_processor"}, 2]
        ],
        outputItems: [
            [{item: "extendedae:mod_storage_bus"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:storage_bus"}, 1],
            [{item: "ae2:calculation_processor"}, 2]
        ],
        outputItems: [
            [{item: "extendedae:precise_storage_bus"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:cable_anchor"}, 4],
            [{item: "ae2:charged_certus_quartz_crystal"}, 1]
        ],
        outputItems: [
            [{item: "ae2:quartz_fixture"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:quartz_fixture"}, 1],
            [{item: "ae2:calculation_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:light_detector"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:quartz_fiber"}, 1],
            [{item: "ae2:calculation_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:toggle_bus"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:semi_dark_monitor"}, 1],
            [{item: "spectrum:shimmerstone_gem"}, 1]
        ],
        outputItems: [
            [{item: "ae2:monitor"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:semi_dark_monitor"}, 1],
            [{tag: "c:dusts/coal"}, 1]
        ],
        outputItems: [
            [{item: "ae2:dark_monitor"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "modern_industrialization:aluminum_wire"}, 4],
            [{tag: "c:plates/diamond"}, 2],
            [{item: "ae2:calculation_processor"}, 1],
            [{item: "ae2:engineering_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:advanced_card"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:quartz_vibrant_glass"}, 3],
            [{item: "modern_industrialization:aluminum_wire"}, 4],
            [{item: "modern_industrialization:aluminum_large_plate"}, 1],
            [{item: "ae2:engineering_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:semi_dark_monitor"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:fluix_crystal"}, 3],
            [{tag: "ae2:illuminated_panel"}, 1],
            [{item: "ae2:formation_core"}, 1]
        ],
        outputItems: [
            [{item: "ae2:formation_plane"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:fluix_crystal"}, 3],
            [{tag: "ae2:illuminated_panel"}, 1],
            [{item: "ae2:annihilation_core"}, 1]
        ],
        outputItems: [
            [{item: "ae2:annihilation_plane"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:plates/aluminum"}, 2],
            [{item: "ae2:fluix_glass_cable"}, 6],
            [{item: "modern_industrialization:rubber_sheet"}, 18],
            [{item: "ae2:calculation_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:fluix_smart_dense_cable"}, 4]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:fluix_crystal"}, 4],
            [{tag: "c:wires/aluminum"}, 8],
            [{item: "ae2:quartz_glass"}, 1],
            [{item: "ae2:calculation_processor"}, 1],
            [{item: "modern_industrialization:silicon_battery"}, 8]
        ],
        outputItems: [
            [{item: "ae2:dense_energy_cell"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:rods/certus_quartz"}, 6],
            [{tag: "c:wires/aluminum"}, 8],
            [{tag: "c:plates/iron"}, 4],
            [{item: "ae2:fluix_crystal"}, 2],
            [{item: "ae2:calculation_processor"}, 1],
            [{item: "extendedae:threshold_level_emitter"}, 1]
        ],
        outputItems: [
            [{item: "ae2:network_tool"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:wires/aluminum"}, 2],
            [{item: "ae2:calculation_processor"}, 1],
            [{item: "ae2:fluix_crystal"}, 1],
            [{tag: "c:rods/certus_quartz"}, 1]
        ],
        outputItems: [
            [{item: "ae2:level_emitter"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:wires/aluminum"}, 4],
            [{item: "ae2:quartz_glass"}, 3],
            [{item: "ae2:certus_quartz_crystal"}, 6],
            [{item: "ae2:certus_quartz_cutting_knife"}, 1, 0]
        ],
        outputItems: [
            [{item: "ae2:quartz_fiber"}, 12]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:wires/copper"}, 4],
            [{tag: "c:rods/wooden"}, 1],
            [{item: "ae2:calculation_processor"}, 2],
            [{item: "ae2:certus_quartz_crystal"}, 6],
            [{item: "modern_industrialization:motor"}, 2]
        ],
        outputItems: [
            [{item: "ae2:certus_quartz_cutting_knife"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:stones"}, 1],
            [{item: "ae2:certus_quartz_crystal"}, 6],
            [{item: "ae2:certus_quartz_cutting_knife"}, 1, 0]
        ],
        outputItems: [
            [{item: "ae2:cable_anchor"}, 16]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "ae2:illuminated_panel"}, 1],
            [{item: "ae2:fluix_smart_dense_cable"}, 2],
            [{item: "ae2:fluix_crystal"}, 4]
        ],
        outputItems: [
            [{item: "ae2:me_p2p_tunnel"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:formation_core"}, 1],
            [{item: "ae2:annihilation_core"}, 1],
            [{tag: "ae2:illuminated_panel"}, 1],
            [{item: "ae2:logic_processor"}, 4]
        ],
        outputItems: [
            [{item: "ae2:terminal"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:formation_core"}, 1],
            [{item: "ae2:annihilation_core"}, 1],
            [{item: "ae2:logic_processor"}, 4],
            [{tag: "c:plates/aluminum"}, 4]
        ],
        outputItems: [
            [{item: "ae2:crafting_unit"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:crafting_unit"}, 1],
            [{item: "minecraft:crafting_table"}, 1],
            [{tag: "c:rods/aluminum"}, 4],
            [{item: "ae2:quartz_glass"}, 4]
        ],
        outputItems: [
            [{item: "ae2:molecular_assembler"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:engineering_processor"}, 2],
            [{item: "ae2:crafting_unit"}, 1]
        ],
        outputItems: [
            [{item: "ae2:crafting_accelerator"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:calculation_processor"}, 2],
            [{item: "ae2:crafting_unit"}, 1],
            [{item: "advanced_ae:import_export_bus_part"}, 1]
        ],
        outputItems: [
            [{item: "ae2:pattern_provider"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:calculation_processor"}, 2],
            [{tag: "ae2:illuminated_panel"}, 1],
            [{item: "ae2:formation_core"}, 2]
        ],
        outputItems: [
            [{item: "ae2:pattern_encoding_terminal"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "advanced_ae:throughput_monitor"}, 1],
            [{tag: "c:rods/aluminum"}, 2],
            [{item: "ae2:fluix_crystal"}, 4]
        ],
        outputItems: [
            [{item: "advanced_ae:throughput_monitor_configurator"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "ae2:quartz_glass"}, 2],
            [{tag: "c:gems/certus_quartz"}, 2],
            [{tag: "c:plates/aluminum"}, 2],
            [{item: "modern_industrialization:electronic_circuit"}, 1]
        ],
        inputFluids: [
            [{fluid: "modern_industrialization:polyethylene"}, 250]
        ],
        outputItems: [
            [{item: "ae2:blank_pattern"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:calculation_processor"}, 1],
            [{item: "advanced_ae:import_export_bus_part"}, 1],
            [{tag: "c:plates/aluminum"}, 4],
            [{item: "ae2:fluix_glass_cable"}, 6]
        ],
        outputItems: [
            [{item: "ae2:io_port"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:engineering_processor"}, 1],
            [{item: "ae2:quartz_glass"}, 2],
            [{tag: "c:plates/aluminum"}, 4],
            [{item: "ae2:fluix_block"}, 1]
        ],
        outputItems: [
            [{item: "ae2:growth_accelerator"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:pattern_provider"}, 1],
            [{item: "ae2:formation_core"}, 1],
            [{item: "ae2:fluix_block"}, 1]
        ],
        outputItems: [
            [{item: "advanced_ae:small_adv_pattern_provider"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:blank_pattern"}, 1],
            [{item: "ae2:formation_core"}, 1],
            [{item: "ae2:fluix_crystal"}, 2]
        ],
        outputItems: [
            [{item: "advanced_ae:adv_pattern_encoder"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:formation_core"}, 1],
            [{item: "ae2:annihilation_core"}, 1],
            [{tag: "c:plates/aluminum"}, 4],
            [{item: "advanced_ae:import_export_bus_part"}, 1]
        ],
        outputItems: [
            [{item: "ae2:interface"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:calculation_processor"}, 4],
            [{item: "ae2:engineering_processor"}, 4],
            [{item: "ae2:interface"}, 1],
            [{tag: "c:plates/stainless_steel"}, 4]
        ],
        outputItems: [
            [{item: "extendedae:ex_interface"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:quartz_fixture"}, 1],
            [{tag: "c:wires/copper"}, 16],
            [{tag: "c:plates/iron"}, 4],
            [{item: "ae2:fluix_block"}, 1]
        ],
        outputItems: [
            [{item: "ae2:crystal_resonance_generator"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "megacells:cell_dock"}, 1],
            [{item: "ae2:toggle_bus"}, 1],
            [{tag: "c:plates/iron"}, 4],
            [{item: "ae2:fluix_block"}, 1]
        ],
        outputItems: [
            [{item: "ae2:chest"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:drive"}, 1],
            [{item: "ae2:capacity_card"}, 2],
            [{item: "ae2:formation_core"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:ex_drive"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:charger"}, 1],
            [{item: "ae2:capacity_card"}, 2],
            [{item: "ae2:annihilation_core"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:ex_charger"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "advanced_ae:small_adv_pattern_provider"}, 1],
            [{item: "ae2:crafting_accelerator"}, 2],
            [{item: "ae2:engineering_processor"}, 1],
            [{tag: "c:plates/aluminum"}, 4]
        ],
        outputItems: [
            [{item: "merequester:requester"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:blank_pattern"}, 1],
            [{item: "ae2:certus_quartz_crystal"}, 1]
        ],
        outputItems: [
            [{item: "ae2:view_cell"}, 1]
        ],
        token: T2_TOKEN,
        removeRecipe: true
    });
    // #endregion

    // #region tier 3 recipes

    ae_processor("advanced_ae:printed_quantum_processor", "advanced_ae:quantum_processor", T3_TOKEN)

    ae_card("ae2:advanced_card", "ae2:matter_ball", "megacells:compression_card", T3_TOKEN)

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:wireless_receiver"}, 1],
            [{ item: "modern_industrialization:bioresistant_alloy_curved_plate"}, 4],
            [{ item: "modern_industrialization:bioresistant_alloy_rod" }, 8],
            [{item: "ae2:fluix_glass_cable"}, 4]
        ],
        outputItems: [
            [{item: "ae2:wireless_access_point"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:plates/stainless_steel"}, 4],
            [{ item: "extended_industrialization:silver_tesla_top_load" }, 1],
            [{ item: "modern_industrialization:bioresistant_alloy_rod"}, 1],
            [{item: "ae2:fluix_pearl"}, 1]
        ],
        outputItems: [
            [{item: "ae2:wireless_receiver"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "advanced_ae:quantum_processor"}, 1],
            [{item: "ae2:quartz_glass"}, 1],
            [{item: "ae2:fluix_pearl"}, 4]
        ],
        outputItems: [
            [{item: "ae2:quantum_link"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:plates/stainless_steel"}, 4],
            [{tag: "ae2:smart_dense_cable"}, 2],
            [{item: "ae2:dense_energy_cell"}, 1]
        ],
        outputItems: [
            [{item: "ae2:quantum_ring"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "bigger_ae2:digital_singularity_cell_component"}, 1],
            [{item: "advanced_ae:quantum_processor"}, 1]
        ],
        outputItems: [
            [{item: "advanced_ae:quantum_storage_component"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "advanced_ae:small_adv_pattern_provider"}, 1],
            [{item: "megacells:accumulation_processor"}, 4]
        ],
        outputItems: [
            [{item: "megacells:mega_pattern_provider"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "megacells:mega_pattern_provider"}, 1],
            [{ item: "advanced_ae:quantum_processor"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:ex_pattern_provider"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "advanced_ae:quantum_processor"}, 1],
            [{item: "ae2:wireless_receiver"}, 1],
            [{item: "modern_industrialization:superconductor_wire"}, 6]
        ],
        outputItems: [
            [{item: "extendedae:wireless_tool"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "ae2:smart_dense_cable"}, 4],
            [{item: "advanced_ae:quantum_processor"}, 1],
            [{item: "ae2:wireless_receiver"}, 2],
            [{tag: "c:plates/stainless_steel"}, 8]
        ],
        outputItems: [
            [{item: "extendedae:wireless_connect"}, 2]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:quartz_glass"}, 1],
            [{item: "megacells:accumulation_processor"}, 1],
            [{item: "modern_industrialization:superconductor_wire"}, 8],
            [{item: "modern_industrialization:cadmium_battery"}, 8],
            [{item: "ae2:fluix_crystal"}, 4]
        ],
        outputItems: [
            [{item: "megacells:mega_energy_cell"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "extendedae:ex_interface"}, 1],
            [{item: "megacells:accumulation_processor"}, 1]
        ],
        outputItems: [
            [{item: "megacells:mega_interface"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "megacells:mega_interface"}, 1],
            [{item: "advanced_ae:quantum_processor"}, 1],
            [{item: "ae2:capacity_card"}, 4]
        ],
        outputItems: [
            [{item: "extendedae:oversize_interface"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:crafting_unit"}, 1],
            [{item: "megacells:accumulation_processor"}, 2],
            [{item: "megacells:sky_steel_block"}, 1]
        ],
        outputItems: [
            [{item: "megacells:mega_crafting_unit"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:crafting_accelerator"}, 4],
            [{item: "megacells:accumulation_processor"}, 2],
            [{item: "megacells:sky_steel_block"}, 1]
        ],
        outputItems: [
            [{item: "megacells:mega_crafting_accelerator"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:io_port"}, 1],
            [{item: "megacells:accumulation_processor"}, 4],
            [{item: "ae2:speed_card"}, 2]
        ],
        outputItems: [
            [{item: "extendedae:ex_io_port"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:molecular_assembler"}, 1],
            [{item: "megacells:accumulation_processor"}, 4],
            [{item: "ae2:speed_card"}, 2],
            [{item: "ae2:capacity_card"}, 4]
        ],
        outputItems: [
            [{item: "extendedae:ex_molecular_assembler"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "extendedae:extended_pattern_provider"}, 1],
            [{item: "extendedae:assembler_matrix_wall"}, 1],
            [{item: "advanced_ae:quantum_processor"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:assembler_matrix_pattern"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "extendedae:ex_molecular_assembler"}, 1],
            [{item: "extendedae:assembler_matrix_wall"}, 1],
            [{item: "advanced_ae:quantum_processor"}, 1],
            [{item: "advanced_ae:shattered_singularity"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:assembler_matrix_crafter"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "megacells:mega_energy_cell"}, 1],
            [{item: "extendedae:assembler_matrix_wall"}, 1],
            [{item: "advanced_ae:quantum_processor"}, 1],
            [{item: "advanced_ae:shattered_singularity"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:assembler_matrix_speed"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:plates/stainless_steel"}, 4],
            [{item: "ae2:fluix_crystal"}, 2],
            [{item: "megacells:sky_bronze_ingot"}, 1],
            [{item: "spectrum:white_pigment"}, 2]
        ],
        outputItems: [
            [{item: "extendedae:assembler_matrix_wall"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:plates/stainless_steel"}, 2],
            [{item: "ae2:fluix_crystal"}, 2],
            [{item: "megacells:sky_bronze_ingot"}, 1],
            [{item: "spectrum:white_pigment"}, 2],
            [{item: "ae2:quartz_glass"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:assembler_matrix_glass"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "spectrum:pure_azurite"}, 1],
            [{item: "ae2:quartz_glass"}, 1],
            [{item: "megacells:sky_steel_ingot"}, 1],
            [{tag: "c:plates/stainless_steel"}, 4]
        ],
        outputItems: [
            [{item: "extendedae:assembler_matrix_frame"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "megacells:printed_accumulation_processor"}, 1],
            [{item: "ae2:printed_silicon"}, 1],
            [{item: "ae2:fluix_dust"}, 3]
        ],
        inputFluids: [
            [{fluid: "spectrum:liquid_crystal"}, 500]
        ],
        outputItems: [
            [{item: "megacells:accumulation_processor"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "advanced_ae:quantum_processor"}, 1],
            [{item: "ae2:quartz_glass"}, 32],
            [{item: "ae2:fluix_glass_cable"}, 16],
            [{item: "ae2:fluix_block"}, 4]
        ],
        inputFluids: [
            [{fluid: "advanced_ae:quantum_infusion_source"}, 4000]
        ],
        outputItems: [
            [{item: "ae2:spatial_pylon"}, 16]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "advanced_ae:quantum_processor"}, 1],
            [{item: "ae2:io_port"}, 1],
            [{item: "ae2:quartz_glass"}, 4],
            [{tag: "c:plates/stainless_steel"}, 4],
            [{item: "megacells:sky_steel_ingot"}, 2]
        ],
        inputFluids: [
            [{fluid: "advanced_ae:quantum_infusion_source"}, 1000]
        ],
        outputItems: [
            [{item: "ae2:spatial_io_port"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:advanced_card"}, 1],
            [{item: "simplemagnets:advancedmagnet"}, 1],
            [{item: "advanced_ae:quantum_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2wtlib:magnet_card"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:advanced_card"}, 1],
            [{item: "ae2:quantum_link"}, 1],
            [{item: "advanced_ae:quantum_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2wtlib:quantum_bridge_card"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:advanced_card"}, 1],
            [{item: "ae2:wireless_receiver"}, 1]
        ],
        outputItems: [
            [{item: "ae2:wireless_booster"}, 1]
        ],
        token: T3_TOKEN,
        removeRecipe: true
    });

    // #endregion

    // #region tier 4 recipes
    ae_processor("extendedae:concurrent_processor_print","extendedae:concurrent_processor", T4_TOKEN)

    miMachineRecipe(event, {
        energy: T5_ENERGY,
        time: T5_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "extendedae:ex_pattern_provider"}, 1],
            [{item: "extendedae:concurrent_processor"}, 4]
        ],
        outputItems: [
            [{item: "advanced_ae:adv_pattern_provider"}, 1]
        ],
        token: T4_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T5_ENERGY,
        time: T5_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:spatial_cell_component_128"}, 1],
            [{item: "extendedae:concurrent_processor"}, 16],
            [{item: "ae2:spatial_pylon"}, 4],
            [{item: "advanced_ae:quantum_processor"}, 2],
            [{tag: "c:plates/stainless_steel"}, 4]
        ],
        outputItems: [
            [{item: "ae2:spatial_anchor"}, 1]
        ],
        token: T4_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T5_ENERGY,
        time: T5_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:item_cell_housing"}, 1],
            [{item: "extendedae:concurrent_processor"}, 16],
            [{item: "ae2:quartz_glass"}, 2],
            [{item: "bigger_ae2:digital_singularity_cell_component"}, 1]
        ],
        inputFluids: [
            [{fluid: "minecraft:water"}, 32000]
        ],
        outputItems: [
            [{item: "extendedae:infinity_water_cell"}, 1]
        ],
        token: T4_TOKEN,
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T5_ENERGY,
        time: T5_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:item_cell_housing"}, 1],
            [{item: "extendedae:concurrent_processor"}, 16],
            [{item: "ae2:quartz_glass"}, 2],
            [{item: "bigger_ae2:digital_singularity_cell_component"}, 1]
        ],
        inputFluids: [
            [{fluid: "minecraft:water"}, 16000],
            [{fluid: "minecraft:lava"}, 16000]
        ],
        outputItems: [
            [{item: "extendedae:infinity_cobblestone_cell"}, 1]
        ],
        token: T4_TOKEN,
        removeRecipe: true
    });

    // #endregion

});