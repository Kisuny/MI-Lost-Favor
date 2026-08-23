ServerEvents.recipes(event => {

    const T2_ENERGY = 24
    const T3_ENERGY = 44
    const T4_ENERGY = 66
    const T5_ENERGY = 82

    const T1_TIME = 200
    const T2_TIME = 250
    const T3_TIME = 350
    const T4_TIME = 400
    const T5_TIME = 600

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
            requiredDisk: token,
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
            requiredDisk: token,
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
            requiredDisk: token,
            removeRecipe: true
        });
    }

    function knifeReversableRecipe(item1, item2){

        milfShapedCustom(event, {
            pattern: [
                'ki ',
                '   ',
                '   '
            ],
            key: {
                k: { item: "ae2:certus_quartz_cutting_knife" },
                i: { item: item1 },
            },
            keepIngredient: "ae2:certus_quartz_cutting_knife",
            outputItems: [[{ id: item2 }, 1]],
            removeRecipe: true
        })

        milfShapedCustom(event, {
            pattern: [
                'ki ',
                '   ',
                '   '
            ],
            key: {
                k: { item: "ae2:certus_quartz_cutting_knife" },
                i: { item: item2 },
            },
            keepIngredient: "ae2:certus_quartz_cutting_knife",
            outputItems: [[{ id: item1 }, 1]],
            removeRecipe: true
        })

    }

    //#endregion

    //#region cores

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "milf:hemispherical_press_mold" }, 1, 0],
            [{ item: "modern_industrialization:stainless_steel_large_plate" }, 1],
            [{ item: "modern_industrialization:aluminum_wire" }, 4],
        ],
        inputFluids: [
            [{ fluid: "milf:liquid_plastic" }, 500]
        ],
        outputItems: [
            [{ item: "milf:core_hull" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "milf:core_hull" }, 1],
            [{ item: "milf:tempered_glass" }, 1],
            [{ item: "oritech:flux_gate" }, 1],
            [{ item: "modern_industrialization:biosteel_dust" }, 4],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:acrylic_glue" }, 1000]
        ],
        outputItems: [
            [{ item: "ae2:formation_core" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "milf:core_hull" }, 1],
            [{ item: "milf:tempered_glass" }, 1],
            [{ item: "oritech:flux_gate" }, 1],
            [{ item: "modern_industrialization:tumbaga_dust" }, 4],
        ],
        inputFluids: [
            [{ fluid: "oritech:still_sheol_fire" }, 1000]
        ],
        outputItems: [
            [{ item: "ae2:annihilation_core" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    //#endregion

    //#region processors(printed)

    miMachineRecipe(event, {
        energy: 12, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "ae2:logic_processor_press" }, 1, 0],
            [{ item: "modern_industrialization:gold_large_plate" }, 1],
            [{ item: "modern_industrialization:electrum_rod" }, 3]
        ],
        outputItems: [[{ item: "ae2:printed_logic_processor" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 12, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "ae2:silicon_press" }, 1, 0],
            [{ item: "modern_industrialization:silicon_plate" }, 3]
        ],
        outputItems: [[{ item: "ae2:printed_silicon" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 12, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "ae2:logic_processor_press" }, 1, 0],
            [{ item: "modern_industrialization:diamond_large_plate" }, 1],
            [{ item: "modern_industrialization:biosteel_rod" }, 3]
        ],
        outputItems: [[{ item: "ae2:printed_engineering_processor" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 12, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "ae2:calculation_processor_press" }, 1, 0],
            [{ item: "modern_industrialization:bioresistant_alloy_large_plate" }, 1],
            [{ item: "modern_industrialization:certus_quartz_rod" }, 3]
        ],
        outputItems: [[{ item: "ae2:printed_calculation_processor" }, 1]]
    })

    //#endregion

    //#region processors


    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:printed_silicon" }, 1],
            [{ item: "ae2:printed_logic_processor" }, 1],
            [{ item: "modern_industrialization:transistor" }, 2],
        ],
        inputFluids: [
            [{ fluid: "immersiveengineering:redstone_acid" }, 250]
        ],
        outputItems: [
            [{ item: "ae2:logic_processor" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:printed_silicon" }, 2],
            [{ item: "ae2:printed_calculation_processor" }, 1],
            [{ item: "modern_industrialization:op_amp" }, 1],
            [{ item: "ae2:logic_processor" }, 1]

        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:sulfuric_acid" }, 200]
        ],
        outputItems: [
            [{ item: "ae2:calculation_processor" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:printed_silicon" }, 2],
            [{ item: "ae2:printed_engineering_processor" }, 1],
            [{ item: "modern_industrialization:op_amp" }, 1],
            [{ item: "ae2:logic_processor" }, 1]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:hydrochloric_acid" }, 200]
        ],
        outputItems: [
            [{ item: "ae2:engineering_processor" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    //#endregion

    //#region cells 'n' stuff

    let cellComponents = {
        "ae2:cell_component_1k" : {

            disk: MILF_BLUEPRINTS.getDisk.tier2AE,
            energy: T2_ENERGY,
            time: T2_TIME,

            cellsData: {
                "ae2:item_storage_cell_1k": {
                    housing: "ae2:item_cell_housing"
                },

                "ae2:fluid_storage_cell_1k": {
                    housing: "ae2:fluid_cell_housing"
                },

                "arseng:source_storage_cell_1k": {
                    housing: "arseng:source_cell_housing"
                },
            },

            craftingStorageData: {
                id: "ae2:1k_crafting_storage",

                disk: MILF_BLUEPRINTS.getDisk.tier4AE,
                energy: T4_ENERGY,
                time: T4_TIME,

                inputItems: [
                    [{ item: "modern_industrialization:aluminum_dust" }, 6],
                    [{ item: "ae2:calculation_processor" }, 1],
                ],
            },

            inputItems: [
                [{ item: "modern_industrialization:certus_quartz_large_plate" }, 1],
                [{ item: "modern_industrialization:adamant_dust" }, 2],
                [{ item: "milf:lens" }, 1],
            ],

            get previousComponent(){
                return {}
            }

        },
        "ae2:cell_component_4k": {

            disk: MILF_BLUEPRINTS.getDisk.tier3AE,
            energy: T3_ENERGY,
            time: T3_TIME,

            cellsData: {
                "ae2:item_storage_cell_4k": {
                    housing: "ae2:item_cell_housing"
                },

                "ae2:fluid_storage_cell_4k": {
                    housing: "ae2:fluid_cell_housing"
                },

                "arseng:source_storage_cell_4k": {
                    housing: "arseng:source_cell_housing"
                },
            },

            craftingStorageData: {
                id: "ae2:4k_crafting_storage",

                disk: MILF_BLUEPRINTS.getDisk.tier4AE,
                energy: T4_ENERGY,
                time: T4_TIME,

                inputItems: [
                    [{ item: "modern_industrialization:adamant_dust" }, 6],
                    [{ item: "ae2:engineering_processor" }, 1],
                ],
            },

            inputItems: [
                [{ item: "ae2:cell_component_1k" }, 2],
                [{ item: "ae2:advanced_card" }, 1],
                [{ item: "spectrum:topaz_powder" }, 2],
                [{ item: "spectrum:amethyst_powder" }, 2],
                [{ item: "spectrum:citrine_powder" }, 2],
                [{ item: "modern_industrialization:silicon_steel_dust" }, 4],
            ],

            get previousComponent() {
                return cellComponents["ae2:cell_component_1k"]
            }

        },

        "ae2:cell_component_16k": {

            disk: MILF_BLUEPRINTS.getDisk.tier3AE,
            energy: T3_ENERGY,
            time: T3_TIME,

            cellsData: {
                "ae2:item_storage_cell_16k": {
                    housing: "ae2:item_cell_housing"
                },

                "ae2:fluid_storage_cell_16k": {
                    housing: "ae2:fluid_cell_housing"
                },

                "arseng:source_storage_cell_16k": {
                    housing: "arseng:source_cell_housing"
                },
            },

            craftingStorageData: {
                id: "ae2:16k_crafting_storage",

                disk: MILF_BLUEPRINTS.getDisk.tier4AE,
                energy: T4_ENERGY,
                time: T4_TIME,

                inputItems: [
                    [{ item: "modern_industrialization:bioresistant_alloy_dust" }, 6],
                    [{ item: "ae2:calculation_processor" }, 1],
                    [{ item: "ae2:engineering_processor" }, 1],
                ],
            },

            inputItems: [
                [{ item: "ae2:cell_component_4k" }, 2],
                [{ item: "immersiveengineering:component_electronic_adv" }, 1],
                [{ item: "modern_industrialization:biosteel_dust" }, 4],
            ],

            get previousComponent() {
                return cellComponents["ae2:cell_component_4k"]
            }

        },

        "ae2:cell_component_64k": {

            disk: MILF_BLUEPRINTS.getDisk.tier3AE,
            energy: T3_ENERGY,
            time: T3_TIME,

            cellsData: {
                "ae2:item_storage_cell_64k": {
                    housing: "ae2:item_cell_housing"
                },

                "ae2:fluid_storage_cell_64k": {
                    housing: "ae2:fluid_cell_housing"
                },

                "arseng:source_storage_cell_64k": {
                    housing: "arseng:source_cell_housing"
                },
            },

            craftingStorageData: {
                id: "ae2:64k_crafting_storage",

                disk: MILF_BLUEPRINTS.getDisk.tier4AE,
                energy: T4_ENERGY,
                time: T4_TIME,

                inputItems: [
                    [{ item: "modern_industrialization:emerald_dust" }, 6],
                    [{ item: "ae2:formation_core" }, 1],
                ],
            },

            inputItems: [
                [{ item: "ae2:cell_component_16k" }, 2],
                [{ item: "ae2:engineering_processor" }, 1],
                [{ item: "ae2:calculation_processor" }, 1],
                [{ item: "ae2:fluix_crystal" }, 8],
            ],

            get previousComponent() {
                return cellComponents["ae2:cell_component_16k"]
            }

        },

        "ae2:cell_component_256k": {

            disk: MILF_BLUEPRINTS.getDisk.tier3AE,
            energy: T3_ENERGY,
            time: T3_TIME,

            cellsData: {
                "ae2:item_storage_cell_256k": {
                    housing: "ae2:item_cell_housing"
                },

                "ae2:fluid_storage_cell_256k": {
                    housing: "ae2:fluid_cell_housing"
                },

                "arseng:source_storage_cell_256k": {
                    housing: "arseng:source_cell_housing"
                },
            },

            craftingStorageData: {
                id: "ae2:256k_crafting_storage",

                disk: MILF_BLUEPRINTS.getDisk.tier4AE,
                energy: T4_ENERGY,
                time: T4_TIME,

                inputItems: [
                    [{ item: "modern_industrialization:biosteel_dust" }, 6],
                    [{ item: "ae2:annihilation_core" }, 1],
                ],
            },

            inputItems: [
                [{ item: "ae2:cell_component_64k" }, 2],
                [{ item: "spectrum:onyx_powder" }, 8],
                [{ item: "modern_industrialization:electronic_circuit" }, 1],
                [{ item: "modern_industrialization:plastic_large_plate" }, 2],
            ],

            get previousComponent() {
                return cellComponents["ae2:cell_component_64k"]
            }

        }
    }

    Object.entries(cellComponents).forEach(([cellComponentId, componentData]) => {
        let {
            cellsData = null,
            craftingStorageData = null,
            wire = "modern_industrialization:electrum_wire",

            disk = MILF_BLUEPRINTS.getDisk.tier2AE,
            energy = T2_ENERGY,
            time = T2_TIME,
            inputItems,
            previousComponent
        } = componentData

        if (cellsData) {
            Object.entries(cellsData).forEach(([cellId, cellData]) => {
                miMachineRecipe(event, {
                    energy: energy,
                    time: time,
                    machine: "modern_industrialization:assembler",
                    inputItems: [
                        [{ item: cellComponentId }, 1],
                        [{ item: cellData.housing }, 1],
                        [{ item: wire }, 3],
                        //[{ item: disk }, 1, 0],
                    ],
                    inputFluids: [
                        [{ fluid: "immersiveengineering:redstone_acid" }, 500],
                        [{ fluid: "milf:silicone_modified_phenolic_resin" }, 500]
                    ],
                    outputItems: [
                        [{ item: cellId }, 1]
                    ],
                    requiredDisk: { item: disk },
                    removeRecipe: true
                })
            })
        }

        if (craftingStorageData) {

            miMachineRecipe(event, {
                energy: craftingStorageData.energy || energy,
                time: craftingStorageData.time || time,
                machine: "modern_industrialization:assembler",
                inputItems: [
                    [{ item: cellComponentId }, 1],
                    [{ item: previousComponent?.craftingStorageData?.id || "ae2:crafting_unit" }, 1],
                ].concat(craftingStorageData?.inputItems || [[]]),
                inputFluids: [
                    [{ fluid: "modern_industrialization:polyethylene" }, 500]
                ],
                outputItems: [
                    [{ item: craftingStorageData.id }, 1]
                ],
                requiredDisk: { item: craftingStorageData.disk || disk },
                removeRecipe: true
            })
            
        }

        miMachineRecipe(event, {
            energy: energy,
            time: time,
            machine: "modern_industrialization:assembler",
            inputItems: inputItems,
            inputFluids: [
                [{ fluid: "milf:alien_goo" }, 250],
                [{ fluid: "milf:liquid_plastic" }, 100]
            ],
            outputItems: [
                [{ item: cellComponentId }, 1]
            ],
            requiredDisk: { item: disk },
            removeRecipe: true
        })

    })

    //ae_cell_component("modern_industrialization:aluminum_plate", "ae2:certus_quartz_dust", "ae2:logic_processor", "ae2:cell_component_1k", {item: MILF_BLUEPRINTS.getDisk.tier2AE})

    // ae_cell_component("ae2:cell_component_1k", "ae2:fluix_dust", "ae2:calculation_processor", "ae2:cell_component_4k", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_cell_component("ae2:cell_component_4k", "modern_industrialization:aluminum_dust", "ae2:calculation_processor", "ae2:cell_component_16k", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_cell_component("ae2:cell_component_16k", "modern_industrialization:sodium_dust", "ae2:engineering_processor", "ae2:cell_component_64k", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_cell_component("ae2:cell_component_64k", "modern_industrialization:ruby_dust", "ae2:engineering_processor", "ae2:cell_component_256k", {item: MILF_BLUEPRINTS.getDisk.tier3AE})

    // ae_cell_component("ae2:cell_component_256k", "ae2:sky_dust", "megacells:accumulation_processor", "megacells:cell_component_1m", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    ae_cell_component("megacells:cell_component_1m", "advanced_ae:quantum_infused_dust", "megacells:accumulation_processor", "megacells:cell_component_4m", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    ae_cell_component("megacells:cell_component_4m", "advanced_ae:quantum_infused_dust", "megacells:accumulation_processor", "megacells:cell_component_16m", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    ae_cell_component("ae2:fluix_pearl", "advanced_ae:quantum_infused_dust", "megacells:accumulation_processor", "ae2:spatial_cell_component_2", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    ae_cell_component("ae2:spatial_cell_component_2", "advanced_ae:quantum_infused_dust", "advanced_ae:quantum_processor", "ae2:spatial_cell_component_16", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    ae_cell_component("ae2:spatial_cell_component_16", "advanced_ae:quantum_infused_dust", "extendedae:concurrent_processor", "ae2:spatial_cell_component_128", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    ae_cell_component("ae2:cell_component_256k", "advanced_ae:quantum_infused_dust", "megacells:accumulation_processor", "bigger_ae2:quantum_cell_component", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    ae_cell_component("ae2:singularity", "advanced_ae:quantum_infused_dust", "bigger_ae2:quantum_cell_component", "bigger_ae2:digital_singularity_cell_component", {item: MILF_BLUEPRINTS.getDisk.tier4AE})

    ae_cell_component("extendedae:concurrent_processor", "advanced_ae:quantum_infused_dust", "bigger_ae2:digital_singularity_cell_component", "megacells:bulk_cell_component", {item: MILF_BLUEPRINTS.getDisk.tier5AE})
    ae_cell_component("megacells:cell_component_16m", "extendedae:entro_dust", "extendedae:concurrent_processor", "megacells:cell_component_64m", {item: MILF_BLUEPRINTS.getDisk.tier5AE})
    ae_cell_component("megacells:cell_component_64m", "extendedae:entro_dust", "extendedae:concurrent_processor", "megacells:cell_component_256m", {item: MILF_BLUEPRINTS.getDisk.tier5AE})
    // #endregion

    // #region cells

    ae_item_cell("ae2:spatial_cell_component_2", "ae2:spatial_storage_cell_2", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    ae_item_cell("ae2:spatial_cell_component_16", "ae2:spatial_storage_cell_16", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    ae_item_cell("ae2:spatial_cell_component_128", "ae2:spatial_storage_cell_128", {item: MILF_BLUEPRINTS.getDisk.tier5AE})

    //ae_item_cell("ae2:cell_component_1k", "ae2:item_storage_cell_1k", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_item_cell("ae2:cell_component_4k", "ae2:item_storage_cell_4k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // ae_item_cell("ae2:cell_component_16k", "ae2:item_storage_cell_16k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // ae_item_cell("ae2:cell_component_64k", "ae2:item_storage_cell_64k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // ae_item_cell("ae2:cell_component_256k", "ae2:item_storage_cell_256k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})

    ae_item_cell("megacells:cell_component_1m", "megacells:item_storage_cell_1m", {item: MILF_BLUEPRINTS.getDisk.tier4AE}, "megacells:mega_item_cell_housing")
    ae_item_cell("megacells:cell_component_4m", "megacells:item_storage_cell_4m", {item: MILF_BLUEPRINTS.getDisk.tier4AE}, "megacells:mega_item_cell_housing")
    ae_item_cell("megacells:cell_component_16m", "megacells:item_storage_cell_16m", {item: MILF_BLUEPRINTS.getDisk.tier4AE}, "megacells:mega_item_cell_housing")
    ae_item_cell("bigger_ae2:quantum_cell_component", "bigger_ae2:quantum_item_storage_cell", {item: MILF_BLUEPRINTS.getDisk.tier4AE}, "bigger_ae2:advanced_item_cell_housing")
    ae_item_cell("bigger_ae2:digital_singularity_cell_component", "bigger_ae2:digital_singularity_item_storage_cell", {item: MILF_BLUEPRINTS.getDisk.tier4AE}, "bigger_ae2:advanced_item_cell_housing")

    ae_item_cell("megacells:cell_component_64m", "megacells:item_storage_cell_64m", {item: MILF_BLUEPRINTS.getDisk.tier5AE}, "megacells:mega_item_cell_housing")
    ae_item_cell("megacells:cell_component_256m", "megacells:item_storage_cell_256m", {item: MILF_BLUEPRINTS.getDisk.tier5AE}, "megacells:mega_item_cell_housing")

   // ae_fluid_cell("ae2:cell_component_1k", "ae2:fluid_storage_cell_1k", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_fluid_cell("ae2:cell_component_4k", "ae2:fluid_storage_cell_4k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // ae_fluid_cell("ae2:cell_component_16k", "ae2:fluid_storage_cell_16k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // ae_fluid_cell("ae2:cell_component_64k", "ae2:fluid_storage_cell_64k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // ae_fluid_cell("ae2:cell_component_256k", "ae2:fluid_storage_cell_256k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})

    ae_fluid_cell("megacells:cell_component_1m", "megacells:fluid_storage_cell_1m", {item: MILF_BLUEPRINTS.getDisk.tier4AE}, "megacells:mega_item_cell_housing")
    ae_fluid_cell("megacells:cell_component_4m", "megacells:fluid_storage_cell_4m", {item: MILF_BLUEPRINTS.getDisk.tier4AE}, "megacells:mega_item_cell_housing")
    ae_fluid_cell("megacells:cell_component_16m", "megacells:fluid_storage_cell_16m", {item: MILF_BLUEPRINTS.getDisk.tier4AE}, "megacells:mega_item_cell_housing")
    ae_fluid_cell("bigger_ae2:quantum_cell_component", "bigger_ae2:quantum_fluid_storage_cell", {item: MILF_BLUEPRINTS.getDisk.tier4AE}, "bigger_ae2:advanced_fluid_cell_housing")
    ae_fluid_cell("bigger_ae2:digital_singularity_cell_component", "bigger_ae2:digital_singularity_fluid_storage_cell", {item: MILF_BLUEPRINTS.getDisk.tier4AE}, "bigger_ae2:advanced_fluid_cell_housing")

    ae_fluid_cell("megacells:cell_component_64m", "megacells:fluid_storage_cell_64m", {item: MILF_BLUEPRINTS.getDisk.tier5AE}, "megacells:mega_item_cell_housing")
    ae_fluid_cell("megacells:cell_component_256m", "megacells:fluid_storage_cell_256m", {item: MILF_BLUEPRINTS.getDisk.tier5AE}, "megacells:mega_item_cell_housing")

    // cell_upgrade("ae2:item_storage_cell_1k", "ae2:cell_component_4k", "c:dusts/fluix", "ae2:item_storage_cell_4k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // cell_upgrade("ae2:item_storage_cell_4k", "ae2:cell_component_16k", "c:dusts/aluminum", "ae2:item_storage_cell_16k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // cell_upgrade("ae2:item_storage_cell_16k", "ae2:cell_component_64k", "c:dusts/sodium", "ae2:item_storage_cell_64k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // cell_upgrade("ae2:item_storage_cell_64k", "ae2:cell_component_256k", "c:dusts/ruby", "ae2:item_storage_cell_256k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})

    // cell_upgrade("ae2:fluid_storage_cell_1k", "ae2:cell_component_4k", "c:dusts/fluix", "ae2:fluid_storage_cell_4k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // cell_upgrade("ae2:fluid_storage_cell_4k", "ae2:cell_component_16k", "c:dusts/aluminum", "ae2:fluid_storage_cell_16k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // cell_upgrade("ae2:fluid_storage_cell_16k", "ae2:cell_component_64k", "c:dusts/sodium", "ae2:fluid_storage_cell_64k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // cell_upgrade("ae2:fluid_storage_cell_64k", "ae2:cell_component_256k", "c:dusts/ruby", "ae2:fluid_storage_cell_256k", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // #endregion

    // #region crafting storage
    // ae_crafting_storage("ae2:cell_component_1k", "electrum", "ae2:1k_crafting_storage", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_crafting_storage("ae2:cell_component_4k", "electrum", "ae2:4k_crafting_storage", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_crafting_storage("ae2:cell_component_16k", "electrum", "ae2:16k_crafting_storage", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_crafting_storage("ae2:cell_component_64k", "aluminum", "ae2:64k_crafting_storage", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_crafting_storage("ae2:cell_component_256k", "aluminum", "ae2:256k_crafting_storage", {item: MILF_BLUEPRINTS.getDisk.tier3AE})

    // ae_crafting_storage_upgrade("ae2:cell_component_4k", "ae2:1k_crafting_storage", "electrum", "ae2:4k_crafting_storage", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_crafting_storage_upgrade("ae2:cell_component_16k", "ae2:4k_crafting_storage", "electrum", "ae2:16k_crafting_storage", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_crafting_storage_upgrade("ae2:cell_component_64k", "ae2:16k_crafting_storage", "electrum", "ae2:64k_crafting_storage", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_crafting_storage_upgrade("ae2:cell_component_256k", "ae2:64k_crafting_storage", "electrum", "ae2:256k_crafting_storage", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // #endregion

    // #region reversable_recipes
    knifeReversableRecipe("advanced_ae:adv_pattern_provider_part", "advanced_ae:adv_pattern_provider")
    knifeReversableRecipe("ae2:cable_pattern_provider", "ae2:pattern_provider")

    knifeReversableRecipe("ae2:toggle_bus", "ae2:inverted_toggle_bus")

    knifeReversableRecipe("ae2:cable_energy_acceptor", "ae2:energy_acceptor")

    knifeReversableRecipe("ae2:cable_interface", "ae2:interface")
    knifeReversableRecipe("extendedae:ex_interface_part", "extendedae:ex_interface")
    knifeReversableRecipe("megacells:cable_mega_interface", "megacells:mega_interface")
    knifeReversableRecipe("extendedae:oversize_interface_part", "extendedae:oversize_interface")
    // #endregion

    // #region cell housings

    let housings = {
        
        "ae2:item_cell_housing" : {
            plate: "modern_industrialization:bioresistant_alloy_large_plate",
            disk: MILF_BLUEPRINTS.getDisk.tier2AE
        },

        "ae2:fluid_cell_housing": {
            plate: "modern_industrialization:tumbaga_large_plate",
            disk: MILF_BLUEPRINTS.getDisk.tier2AE
        },

        //TODO

        // "megacells:mega_item_cell_housing": {
        //     plate: "modern_industrialization:silicon_steel_large_plate",
        //     disk: MILF_BLUEPRINTS.getDisk.tier2AE
        // },

        // "megacells:mega_fluid_cell_housing": {
        //     plate: "modern_industrialization:tumbaga_large_plate",
        //     disk: MILF_BLUEPRINTS.getDisk.tier2AE
        // },

        // "bigger_ae2:advanced_item_cell_housing": {
        //     plate: "modern_industrialization:tumbaga_large_plate",
        //     disk: MILF_BLUEPRINTS.getDisk.tier2AE
        // },

        // "bigger_ae2:advanced_fluid_cell_housing": {
        //     plate: "modern_industrialization:tumbaga_large_plate",
        //     disk: MILF_BLUEPRINTS.getDisk.tier2AE
        // },

        // "bigger_ae2:advanced_source_cell_housing": {
        //     plate: "modern_industrialization:tumbaga_large_plate",
        //     disk: MILF_BLUEPRINTS.getDisk.tier2AE
        // }
    }

    Object.entries(housings).forEach(([housing, data]) => {

        let {
            plate = "modern_industrialization:bioresistant_alloy_large_plate",
            disk = MILF_BLUEPRINTS.getDisk.tier2AE,
            energy = T2_ENERGY,
            time = T2_TIME,
        } = data

        miMachineRecipe(event, {
            energy: energy,
            time: time,
            machine: "modern_industrialization:assembler",
            inputItems: [
                [{ item: "milf:cell_half" }, 2],
                [{ item: plate }, 2],
                [{ item: "milf:tempered_glass" }, 1],
                //[{ item: disk }, 1, 0],
            ],
            inputFluids: [
                [{ fluid: "modern_industrialization:soldering_alloy" }, 500],
                [{ fluid: "milf:liquid_plastic" }, 250]
            ],
            outputItems: [
                [{ item: housing }, 1]
            ],
            requiredDisk: { item: disk },
            removeRecipe: true
        })

    })


    // miMachineRecipe(event, {
    //     energy: T3_ENERGY,
    //     time: T3_TIME,
    //     machine: "modern_industrialization:assembler",
    //     inputItems: [
    //         [{item: "milf:cell_half"}, 2],
    //         [{item: "megacells:sky_steel_ingot"}, 4]
    //     ],
    //     inputFluids: [
    //         [{fluid: "modern_industrialization:soldering_alloy"}, 500]
    //     ],
    //     outputItems: [
    //         [{item: "megacells:mega_item_cell_housing"}, 1]
    //     ],
    //     token: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
    //     removeRecipe: true
    // });

    // miMachineRecipe(event, {
    //     energy: T3_ENERGY,
    //     time: T3_TIME,
    //     machine: "modern_industrialization:assembler",
    //     inputItems: [
    //         [{item: "milf:cell_half"}, 2],
    //         [{item: "megacells:sky_bronze_ingot"}, 4]
    //     ],
    //     inputFluids: [
    //         [{fluid: "modern_industrialization:soldering_alloy"}, 500]
    //     ],
    //     outputItems: [
    //         [{item: "megacells:mega_fluid_cell_housing"}, 1]
    //     ],
    //     token: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
    //     removeRecipe: true
    // });

    // miMachineRecipe(event, {
    //     energy: T4_ENERGY,
    //     time: T4_TIME,
    //     machine: "modern_industrialization:assembler",
    //     inputItems: [
    //         [{item: "milf:cell_half"}, 2],
    //         [{item: "modern_industrialization:gold_plate"}, 8]
    //     ],
    //     inputFluids: [
    //         [{fluid: "modern_industrialization:soldering_alloy"}, 500]
    //     ],
    //     outputItems: [
    //         [{item: "bigger_ae2:advanced_item_cell_housing"}, 1]
    //     ],
    //     token: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
    //     removeRecipe: true
    // });

    // miMachineRecipe(event, {
    //     energy: T4_ENERGY,
    //     time: T4_TIME,
    //     machine: "modern_industrialization:assembler",
    //     inputItems: [
    //         [{item: "milf:cell_half"}, 2],
    //         [{item: "modern_industrialization:titanium_plate"}, 8]
    //     ],
    //     inputFluids: [
    //         [{fluid: "modern_industrialization:soldering_alloy"}, 500]
    //     ],
    //     outputItems: [
    //         [{item: "bigger_ae2:advanced_fluid_cell_housing"}, 1]
    //     ],
    //     token: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
    //     removeRecipe: true
    // });

    // miMachineRecipe(event, {
    //     energy: T4_ENERGY,
    //     time: T4_TIME,
    //     machine: "modern_industrialization:assembler",
    //     inputItems: [
    //         [{item: "milf:cell_half"}, 2],
    //         [{item: "modern_industrialization:titanium_plate"}, 8],
    //         [{item: "ars_nouveau:source_gem"}, 4]
    //     ],
    //     inputFluids: [
    //         [{fluid: "modern_industrialization:soldering_alloy"}, 500]
    //     ],
    //     outputItems: [
    //         [{item: "bigger_ae2:advanced_source_cell_housing"}, 1]
    //     ],
    //     token: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
    //     removeRecipe: true
    // });
    // #endregion

    // #region t2 recipes
    //ae_processor("ae2:printed_logic_processor", "ae2:logic_processor", {item: MILF_BLUEPRINTS.getDisk.tier4AE})

    // ae_card("ae2:basic_card", "minecraft:redstone", "ae2:redstone_card", {item: MILF_BLUEPRINTS.getDisk.tier2AE})
    // ae_card("ae2:basic_card", "minecraft:chest", 'ae2:capacity_card', {item: MILF_BLUEPRINTS.getDisk.tier2AE})
    // ae_card("ae2:basic_card", "minecraft:magma_block", 'ae2:void_card', {item: MILF_BLUEPRINTS.getDisk.tier2AE})
    // ae_card("ae2:basic_card", "minecraft:crafting_table", 'ae2:crafting_card', {item: MILF_BLUEPRINTS.getDisk.tier2AE})

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:certus_quartz_large_plate"}, 2],
            [{item: "modern_industrialization:adamant_curved_plate"}, 4],
            [{item: "milf:cell_half"}, 4],
            [{ item: "immersiveengineering:component_electronic_adv"}, 1]
        ],
        outputItems: [
            [{item: "ae2:cell_workbench"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier2AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:adamant_curved_plate"}, 2],
            [{ item: "modern_industrialization:silicon_steel_plate"}, 2],
            [{ item: "modern_industrialization:certus_quartz_plate"}, 3],
            [{ item: "modern_industrialization:certus_quartz_rod" }, 3],
            [{ item: "oritech:flux_gate"}, 1],
        ],
        outputItems: [
            [{item: "extendedae:me_packing_tape"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier2AE},
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:certus_quartz_rod"}, 8],
            [{ item: "milf:tempered_glass"}, 6],
            [{item: "ae2:quartz_glass"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:ingredient_buffer"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier2AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:certus_quartz_large_plate"}, 6],
            [{item: "milf:cell_half"}, 10],
            [{item: "modern_industrialization:rubber_sheet"}, 20],
            [{item: "ae2:fluix_glass_cable"}, 2],
            [{item: "oritech:flux_gate"}, 2]
        ],
        outputItems: [
            [{item: "ae2:drive"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier2AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:plastic_plate" }, 2],
            [{ item: "ae2:fluix_glass_cable" }, 1],
            [{ item: "milf:basic_motor" }, 1]
        ],
        outputItems: [
            [{item: "ae2:import_bus"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier2AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:plastic_plate"}, 2],
            [{item: "ae2:fluix_glass_cable"}, 1],
            [{item: "milf:basic_motor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:export_bus"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier2AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:import_bus" }, 1],
            [{ item: "ae2:export_bus" }, 1],
            [{ item: "ae2:logic_processor" }, 1],
            [{ item: "modern_industrialization:plastic_plate" }, 2]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:toluene" }, 200]
        ],
        outputItems: [
            [{ item: "advanced_ae:import_export_bus_part" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "oritech:flux_gate"}, 1],
            [{ item: "modern_industrialization:certus_quartz_large_plate" }, 4],
            [{item: "ae2:fluix_glass_cable"}, 4],
            [{item: "modern_industrialization:electrum_wire"}, 8],
            [{item: "ae2:logic_processor"}, 2]
        ],
        outputItems: [
            [{item: "ae2:energy_acceptor"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier2AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "milf:cell_half"}, 2],
            [{item: "modern_industrialization:electrum_wire"}, 4],
            [{item: "ae2:logic_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:basic_card"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier2AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:basic_card" }, 1],
            [{ item: "modern_industrialization:redstone_control_module" }, 1],
        ],
        outputItems: [
            [{ item: "ae2:redstone_card" }, 1]
        ],
        inputFluids: [
            [{ fluid: "immersiveengineering:redstone_acid" }, 200]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:basic_card" }, 1],
            [{ item: "modern_industrialization:electronic_circuit" }, 2],
        ],
        outputItems: [
            [{ item: "ae2:crafting_card" }, 1]
        ],
        inputFluids: [
            [{ fluid: "immersiveengineering:redstone_acid" }, 200]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:basic_card" }, 1],
            [{ item: "modern_industrialization:trash_can" }, 2],
        ],
        outputItems: [
            [{ item: "ae2:void_card" }, 1]
        ],
        inputFluids: [
            [{ fluid: "immersiveengineering:redstone_acid" }, 200]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:basic_card" }, 1],
            [{ item: "modern_industrialization:basic_upgrade" }, 1],
        ],
        outputItems: [
            [{ item: "ae2:capacity_card" }, 1]
        ],
        inputFluids: [
            [{ fluid: "immersiveengineering:redstone_acid" }, 200]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:fluix_crystal"}, 2],
            [{ item: "modern_industrialization:electrum_wire"}, 8],
            [{item: "ae2:quartz_glass"}, 4],
            [{item: "ae2:logic_processor"}, 1],
            [{ item: "modern_industrialization:battery_alloy_large_plate"}, 6]
        ],
        outputItems: [
            [{item: "ae2:energy_cell"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier2AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:energy_cell" }, 2],
            [{ item: "modern_industrialization:aluminum_wire" }, 12],
            [{ item: "milf:tempered_glass" }, 4],
            [{ item: "modern_industrialization:silicon_battery" }, 4]
        ],
        outputItems: [
            [{ item: "ae2:dense_energy_cell" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:fluid_cell_housing"}, 1],
            [{item: "ae2:item_cell_housing"}, 1],
            [{item: "ae2:logic_processor"}, 1],
            [{ item: "modern_industrialization:plastic_large_plate" }, 1]
        ],
        outputItems: [
            [{item: "megacells:cell_dock"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier2AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "megacells:cell_dock" }, 1],
            [{ item: "ae2:energy_cell" }, 1],
            [{ item: "modern_industrialization:certus_quartz_large_plate" }, 1]
        ],
        outputItems: [
            [{ item: "ae2:chest" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T2_ENERGY,
        time: T2_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:aluminum_dust" }, 4],
            [{ item: "modern_industrialization:certus_quartz_large_plate" }, 2],
            [{ item: "advanced_ae:import_export_bus_part" }, 1]
        ],
        outputItems: [
            [{ item: "ae2:interface" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier2AE },
        removeRecipe: true
    })

    // #endregion

    // #region t3 recipes
    // ae_processor("ae2:printed_engineering_processor", "ae2:engineering_processor", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // ae_processor("ae2:printed_calculation_processor", "ae2:calculation_processor", {item: MILF_BLUEPRINTS.getDisk.tier4AE})

    // ae_core ("ae2:calculation_processor", "ae2:annihilation_core", {item: MILF_BLUEPRINTS.getDisk.tier4AE})
    // ae_core ("ae2:engineering_processor", "ae2:formation_core", {item: MILF_BLUEPRINTS.getDisk.tier4AE})

    // ae_card("ae2:advanced_card", "modern_industrialization:lead_dust", "ae2:fuzzy_card", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_card("ae2:advanced_card", "minecraft:glowstone_dust", 'ae2:speed_card', {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_card("ae2:advanced_card", "minecraft:redstone_torch", "ae2:inverter_card", {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_card("ae2:advanced_card", "ae2:fluix_crystal", 'ae2:equal_distribution_card', {item: MILF_BLUEPRINTS.getDisk.tier3AE})
    // ae_card("ae2:advanced_card", "ae2:charged_certus_quartz_crystal", 'ae2:energy_card', {item: MILF_BLUEPRINTS.getDisk.tier3AE})

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:fluix_glass_cable" }, 1],
            [{ item: "spectrum:shimmerstone_gem" }, 1],
            [{ item: "oritech:fluxite" }, 2],
            [{ item: "ae2:certus_quartz_cutting_knife" }, 1, 0]
        ],
        outputItems: [
            [{ item: "ae2:level_emitter" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier3AE },
        removeRecipe: true
    })

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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:level_emitter"}, 1],
            [{item: "ae2:logic_processor"}, 1]
        ],
        outputItems: [
            [{item: "extendedae:threshold_level_emitter"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:storage_bus"}, 1],
            [{item: "ae2:logic_processor"}, 1],
            [{ item: "modern_industrialization:adamant_bolt" }, 4]
        ],
        outputItems: [
            [{item: "extendedae:tag_storage_bus"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:storage_bus"}, 1],
            [{ item: "ae2:logic_processor"}, 1],
            [{ item: "modern_industrialization:biosteel_bolt" }, 4]
        ],
        outputItems: [
            [{item: "extendedae:mod_storage_bus"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:storage_bus"}, 1],
            [{ item: "ae2:logic_processor"}, 1],
            [{ item: "modern_industrialization:silicon_steel_bolt" }, 4]
        ],
        outputItems: [
            [{item: "extendedae:precise_storage_bus"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:cable_anchor"}, 2],
            [{ item: "modern_industrialization:silicon_steel_bolt" }, 4],
            [{item: "ae2:charged_certus_quartz_crystal"}, 1]
        ],
        outputItems: [
            [{item: "ae2:quartz_fixture"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:quartz_fiber"}, 1],
            [{ item: "ae2:fluix_glass_cable" }, 1],
            [{ item: "modern_industrialization:redstone_control_module"}, 1]
        ],
        outputItems: [
            [{item: "ae2:toggle_bus"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:semi_dark_monitor"}, 1],
            [{ item: "modern_industrialization:coal_crushed_dust"}, 1]
        ],
        outputItems: [
            [{item: "ae2:dark_monitor"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    });

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:plastic_plate"}, 2],
            [{item: "modern_industrialization:aluminum_wire"}, 4],
            [{ item: "ae2:logic_processor" }, 1],
        ],
        outputItems: [
            [{item: "ae2:advanced_card"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "milf:tempered_glass" }, 2],
            [{ item: "spectrum:shimmerstone_gem" }, 1],
            [{item: "modern_industrialization:aluminum_wire"}, 4],
            [{ item: "modern_industrialization:certus_quartz_large_plate"}, 1],
            [{item: "ae2:engineering_processor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:semi_dark_monitor"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:fluix_glass_cable"}, 6],
            [{item: "ae2:calculation_processor"}, 1],
            [{ item: "modern_industrialization:silicon_steel_curved_plate" }, 4],

        ],
        outputItems: [
            [{item: "ae2:fluix_smart_dense_cable"}, 4]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:certus_quartz_wrench"}, 1],
            [{ item: "modern_industrialization:certus_quartz_rod"}, 2],
            [{ item: "modern_industrialization:certus_quartz_plate" }, 2],
            [{ item: "modern_industrialization:adamant_plate"}, 4],
            [{item: "ae2:fluix_crystal"}, 2],
            [{item: "ae2:calculation_processor"}, 1],
            [{ item: "ae2:level_emitter"}, 1]
        ],
        outputItems: [
            [{item: "ae2:network_tool"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:fluix_glass_cable"}, 4],
            [{item: "ae2:certus_quartz_crystal"}, 4],
            [{ item: "modern_industrialization:silicon_steel_bolt" }, 6],
            [{item: "ae2:certus_quartz_cutting_knife"}, 1, 0]
        ],
        outputItems: [
            [{item: "ae2:quartz_fiber"}, 12]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "minecraft:stick"}, 1],
            [{ item: "modern_industrialization:silver_wire" }, 4],
            [{item: "ae2:calculation_processor"}, 1],
            [{ item: "modern_industrialization:certus_quartz_plate"}, 2],
            [{ item: "modern_industrialization:adamant_plate" }, 2],
            [{item: "modern_industrialization:large_motor"}, 1]
        ],
        outputItems: [
            [{item: "ae2:certus_quartz_cutting_knife"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "c:stones"}, 1],
            [{item: "ae2:certus_quartz_cutting_knife"}, 1, 0]
        ],
        outputItems: [
            [{item: "ae2:cable_anchor"}, 32]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "ae2:illuminated_panel"}, 1],
            [{ item: "advanced_ae:import_export_bus_part" }, 1],
            [{ item: "ae2:engineering_processor" }, 1]
        ],
        outputItems: [
            [{item: "ae2:me_p2p_tunnel"}, 2]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{tag: "ae2:illuminated_panel"}, 1],
            [{ item: "ae2:engineering_processor"}, 1],
            [{ item: "modern_industrialization:silver_wire" }, 6]
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 2000]
        ],
        outputItems: [
            [{item: "ae2:terminal"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "advanced_ae:throughput_monitor"}, 1, 0],
            [{ item: "modern_industrialization:certus_quartz_rod"}, 1],
            [{item: "ae2:fluix_crystal"}, 4]
        ],
        outputItems: [
            [{item: "advanced_ae:throughput_monitor_configurator"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:calculation_processor"}, 1],
            [{item: "advanced_ae:import_export_bus_part"}, 1],
            [{ item: "ae2:item_cell_housing"}, 2],
            [{ item: "ae2:fluid_cell_housing"}, 2],
            [{ item: "modern_industrialization:certus_quartz_large_plate" }, 4],
        ],
        outputItems: [
            [{item: "ae2:io_port"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:quartz_fixture"}, 1],
            [{item: "ae2:fluix_block"}, 2],
            [{ item: "modern_industrialization:tumbaga_rod" }, 48],
            [{ item: "oritech:flux_gate" }, 1]

        ],
        outputItems: [
            [{item: "ae2:crystal_resonance_generator"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:drive"}, 1],
            [{ item: "milf:cell_half" }, 10],
            [{ item: "ae2:engineering_processor" }, 1],
            [{ item: "modern_industrialization:biosteel_large_plate"}, 4]
        ],
        outputItems: [
            [{item: "extendedae:ex_drive"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{item: "ae2:charger"}, 1],
            [{ item: "ae2:engineering_processor" }, 1],
            [{ item: "modern_industrialization:biosteel_large_plate" }, 2],
            [{ item: "modern_industrialization:biosteel_rod" }, 8],

        ],
        outputItems: [
            [{item: "extendedae:ex_charger"}, 1]
        ],
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier3AE},
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:inverted_toggle_bus" }, 1],
            [{ item: "ae2:toggle_bus" }, 1],
            [{ item: "ae2:charged_staff" }, 1],
            [{ item: "ae2:calculation_processor" }, 1],
            [{ item: "oritech:fluxite" }, 4],
            [{ item: "modern_industrialization:aluminum_wire" }, 2],

        ],
        outputItems: [
            [{ item: "ae2:entropy_manipulator" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier3AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:export_bus" }, 1],
            [{ item: "ae2:semi_dark_monitor" }, 1],
            [{ item: "modern_industrialization:biosteel_large_plate" }, 1],

        ],
        outputItems: [
            [{ item: "advanced_ae:stock_export_bus_part" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier3AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T3_ENERGY,
        time: T3_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:calculation_processor" }, 2],
            [{ item: "ae2:interface" }, 1],
            [{ item: "modern_industrialization:stainless_steel_rod" }, 4]
        ],
        outputItems: [
            [{ item: "extendedae:ex_interface" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier3AE },
        removeRecipe: true
    })

    // #endregion

    // #region t4 recipes

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:engineering_processor" }, 2],
            [{ item: "ae2:formation_core" }, 1],
            [{ item: "oritech:flux_gate" }, 2],
            [{ item: "ae2:fluix_block" }, 2],
            [{ item: "modern_industrialization:certus_quartz_large_plate" }, 4],
            [{ item: "modern_industrialization:adamant_plate" }, 4],
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 2000]
        ],
        outputItems: [
            [{ item: "ae2:growth_accelerator" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:engineering_processor" }, 1],
            [{ item: "ae2:calculation_processor" }, 1],
            [{ item: "modern_industrialization:silicon_large_plate" }, 1],
            [{ item: "modern_industrialization:silicon_battery" }, 2],
            [{ item: "modern_industrialization:silver_wire" }, 4],
        ],
        inputFluids: [
            [{fluid: "milf:liquid_plastic"}, 500]
        ],
        outputItems: [
            [{ item: "oritech:advanced_computing_engine" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:formation_core" }, 1],
            [{ item: "ae2:engineering_processor" }, 1],
            [{ item: "modern_industrialization:certus_quartz_large_plate" }, 4]
        ],
        outputItems: [
            [{ item: "merequester:requester" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:blank_pattern" }, 1],
            [{ item: "modern_industrialization:certus_quartz_large_plate" }, 1],
            [{ item: "modern_industrialization:emerald_dust" }, 4]
        ],
        outputItems: [
            [{ item: "ae2:view_cell" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:pattern_provider" }, 1],
            [{ item: "ae2:annihilation_core" }, 1],
            [{ item: "ae2:fluix_block" }, 3]
        ],
        outputItems: [
            [{ item: "advanced_ae:small_adv_pattern_provider" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:blank_pattern" }, 1],
            [{ item: "ae2:formation_core" }, 1],
            [{ item: "ae2:fluix_crystal" }, 2],
            [{ item: "spectrum:amethyst_powder" }, 2]
        ],
        outputItems: [
            [{ item: "advanced_ae:adv_pattern_encoder" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:formation_core" }, 1],
            [{ item: "ae2:annihilation_core" }, 1],
            [{ item: "milf:cell_half" }, 2]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:polyethylene" }, 250]
        ],
        outputItems: [
            [{ item: "ae2:blank_pattern" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:formation_core" }, 1],
            [{ item: "ae2:annihilation_core" }, 1],
            [{ item: "modern_industrialization:stainless_steel_large_plate" }, 2],
            [{ item: "modern_industrialization:certus_quartz_large_plate" }, 4],
        ],
        outputItems: [
            [{ item: "ae2:crafting_unit" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:crafting_unit" }, 1],
            [{ item: "minecraft:crafting_table" }, 1],
            [{ item: "ae2:quartz_glass" }, 4],
            [{ item: "modern_industrialization:certus_quartz_rod" }, 12],
        ],
        outputItems: [
            [{ item: "ae2:molecular_assembler" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:engineering_processor" }, 2],
            [{ item: "spectrum:amethyst_powder" }, 8],
            [{ item: "ae2:crafting_unit" }, 1]
        ],
        outputItems: [
            [{ item: "ae2:crafting_accelerator" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:calculation_processor" }, 1],
            [{ item: "ae2:annihilation_core" }, 1],
            [{ item: "ae2:crafting_unit" }, 1],
            [{ item: "advanced_ae:import_export_bus_part" }, 1]
        ],
        outputItems: [
            [{ item: "ae2:pattern_provider" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "ae2:engineering_processor" }, 2],
            [{ item: "ae2:crafting_unit" }, 1],
            [{ tag: "ae2:illuminated_panel" }, 1],
            [{ item: "ae2:formation_core" }, 2]
        ],
        outputItems: [
            [{ item: "ae2:pattern_encoding_terminal" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:certus_quartz_large_plate" }, 1],
            [{ item: "modern_industrialization:biosteel_large_plate" }, 1],
            [{ tag: "ae2:illuminated_panel" }, 1],
            [{ item: "ae2:formation_core" }, 1]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:acrylic_glue"}, 1000]
        ],
        outputItems: [
            [{ item: "ae2:formation_plane" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: T4_ENERGY,
        time: T4_TIME,
        machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:certus_quartz_large_plate" }, 1],
            [{ item: "modern_industrialization:silicon_steel_large_plate" }, 1],
            [{ tag: "ae2:illuminated_panel" }, 1],
            [{ item: "ae2:annihilation_core" }, 1]
        ],
        inputFluids: [
            [{ fluid: "oritech:still_sheol_fire" }, 1000]
        ],
        outputItems: [
            [{ item: "ae2:annihilation_plane" }, 1]
        ],
        requiredDisk: { item: MILF_BLUEPRINTS.getDisk.tier4AE },
        removeRecipe: true
    })

    //#region TODO \/














    //#region t5 recipes

    //ae_processor("advanced_ae:printed_quantum_processor", "advanced_ae:quantum_processor", {item: MILF_BLUEPRINTS.getDisk.tier4AE})

    //ae_card("ae2:advanced_card", "ae2:matter_ball", "megacells:compression_card", {item: MILF_BLUEPRINTS.getDisk.tier4AE})

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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier4AE},
        removeRecipe: true
    });

    // #endregion

    // #region t6? recipes
    //ae_processor("extendedae:concurrent_processor_print","extendedae:concurrent_processor", {item: MILF_BLUEPRINTS.getDisk.tier5AE})

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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier5AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier5AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier5AE},
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
        requiredDisk: {item: MILF_BLUEPRINTS.getDisk.tier5AE},
        removeRecipe: true
    });

    // #endregion

})