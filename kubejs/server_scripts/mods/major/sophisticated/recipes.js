ServerEvents.recipes(event => {
    // (`･Θ･´) - Some recipes are located in data because it is easier to change a recipe there and delete the previous recipe at the same time (overwrite)

    let replaceWithPlateMaterials = ["gold", "iron", "copper", "diamond"]
    let mods = ["sophisticatedstorage", "sophisticatedbackpacks"]

    replaceWithPlateMaterials.forEach(material => {

        let input = material === "diamond" ? material : `${material}_ingot`
        let output = `modern_industrialization:${material}_plate`

        mods.forEach(mod => {
            event.replaceInput({ mod: mod }, input, output)
        })
    })

    mods.forEach(mod => {
        event.replaceInput({ mod: mod }, "minecraft:redstone_torch", "sophisticatedstorage:upgrade_base")
        event.replaceInput({ mod: mod }, "minecraft:lever", "sophisticatedstorage:upgrade_base")
    })

    event.remove({id:/sophisticatedstorage:generic*/})

    //#region storage

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "ytech:wooden_plate" }, 8],
            [{ "item": "immersiveengineering:stick_treated" }, 4],
            [{ "item": "modern_industrialization:steel_large_plate" }, 2],
        ],
        outputItems: [[{ "item": "sophisticatedstorage:upgrade_base" }, 1]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipeType: "minecraft:crafting_shaped",
    })

    milfShaped(event, {
        pattern: [
            'bdb',
            'WBW',
            'bdb'
        ],
        key: {
            B: { item: "immersiveengineering:component_electronic" },
            d: { item: "immersiveengineering:basic_engineering" },
            W: { item: "immersiveengineering:heavy_engineering" },
            b: { item: "modern_industrialization:iron_bolt" }
        },
        outputItems: [[{ id: "sophisticatedstorage:controller" }, 1]],
        removeRecipe: true
    })

    milfShapedCustom(event, {
        pattern: [
            ' bW',
            ' sb',
            's  '
        ],
        key: {
            s: { item: "immersiveengineering:stick_treated" },
            W: { item: "sophisticatedstorage:controller" },
            b: { item: "modern_industrialization:steel_bolt" }
        },
        keepIngredient: "sophisticatedstorage:controller",
        outputItems: [[{ id: "sophisticatedstorage:storage_tool" }, 1]],
        removeRecipe: true
    })

    milfShapedCustom(event, {
        pattern: [
            'lpl',
            'prp',
            'lpl'
        ],
        key: {
            p: { item: "minecraft:paper" },
            r: { item: "sophisticatedstorage:storage_tool" },
            l: { item: "ytech:leather_strips" },
        },
        keepIngredient: "sophisticatedstorage:storage_tool",
        outputItems: [[{ id: "sophisticatedstorage:packing_tape" }, 3]],
        removeRecipe: true
    })

    milfShapedCustom(event, {
        pattern: [
            'PPP',
            'prp',
            'p p'
        ],
        key: {
            P: { item: "ytech:wooden_plate" },
            p: { tag: "minecraft:planks" },
            r: { item: "sophisticatedstorage:storage_tool" },
        },
        keepIngredient: "sophisticatedstorage:storage_tool",
        outputItems: [[{ id: "sophisticatedstorage:decoration_table" }]],
        removeRecipe: true
    })

    Object.entries({
        "minecraft:acacia_planks":"sophisticatedstorage:acacia_storage_connector",
        "minecraft:birch_planks": "sophisticatedstorage:birch_storage_connector",
        "minecraft:crimson_planks": "sophisticatedstorage:crimson_storage_connector",
        "minecraft:dark_oak_planks": "sophisticatedstorage:dark_oak_storage_connector",
        "minecraft:jungle_planks": "sophisticatedstorage:jungle_storage_connector",
        "minecraft:oak_planks": "sophisticatedstorage:oak_storage_connector",
        "minecraft:spruce_planks": "sophisticatedstorage:spruce_storage_connector",
        "minecraft:warped_planks": "sophisticatedstorage:warped_storage_connector",
        "minecraft:mangrove_planks": "sophisticatedstorage:mangrove_storage_connector",
        "minecraft:cherry_planks": "sophisticatedstorage:cherry_storage_connector",
        "minecraft:bamboo_planks": "sophisticatedstorage:bamboo_storage_connector"
    }).forEach(([plankId, connectorId]) => {
        milfShapedCustom(event, {
            pattern: [
                'bpb',
                'prp',
                'bpb'
            ],
            key: {
                p: { item: plankId },
                b: { item: "ytech:wooden_bolt" },
                r: { item: "sophisticatedstorage:storage_tool" },
            },
            keepIngredient: "sophisticatedstorage:storage_tool",
            outputItems: [[{ id: connectorId }, 4]],
            removeRecipe: true
        })
    })

    milfShaped(event, {
        pattern: [
            'bpb',
            'pBp',
            'bpb'
        ],
        key: {
            B: { item: "immersiveengineering:basic_engineering" },
            b: { item: "modern_industrialization:iron_plate" },
            p: { tag: "minecraft:planks" },
        },
        outputItems: [[{ id: "sophisticatedstorage:storage_io" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'bdb',
            'dBd',
            'bdb'
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            d: { item: "modern_industrialization:bronze_dust" },
            b: { item: "modern_industrialization:iron_bolt" }
        },
        outputItems: [[{ id: "sophisticatedstorage:filter_upgrade" }, 1]],
        removeRecipe: true
    })

    function advancedUpgrade(fromId, toId){
        milfShaped(event, {
            pattern: [
                'bdb',
                'dBd',
                'bdb'
            ],
            key: {
                B: { item: fromId },
                d: { item: "modern_industrialization:steel_bolt" },
                b: { item: "modern_industrialization:iron_plate" }
            },
            outputItems: [[{ id: toId }, 1]],
            removeRecipe: true
        })
    }

    advancedUpgrade(
        "sophisticatedstorage:filter_upgrade", 
        "sophisticatedstorage:advanced_filter_upgrade"
    )

    milfShaped(event, {
        pattern: [
            ' T ',
            'bBb',
            ' b '
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            T: { item: "modern_industrialization:trash_can" },
            b: { item: "modern_industrialization:iron_bolt" }
        },
        outputItems: [[{ id: "sophisticatedstorage:void_upgrade" }, 1]],
        removeRecipe: true
    })

    advancedUpgrade(
        "sophisticatedstorage:void_upgrade",
        "sophisticatedstorage:advanced_void_upgrade"
    )

    milfShaped(event, {
        pattern: [
            ' D ',
            'PBP',
            ' D '
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            D: { item: "modern_industrialization:iron_double_ingot" },
            P: { item: "minecraft:piston" }
        },
        outputItems: [[{ id: "sophisticatedstorage:compacting_upgrade" }, 1]],
        removeRecipe: true
    })

    advancedUpgrade(
        "sophisticatedstorage:compacting_upgrade",
        "sophisticatedstorage:advanced_compacting_upgrade"
    )

    milfShaped(event, {
        pattern: [
            ' B ',
            ' U ',
            ' B '
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            U: { item: "sophisticatedstorage:advanced_compacting_upgrade" }
        },
        outputItems: [[{ id: "sophisticatedstorage:compression_upgrade" }, 1]],
        removeRecipe: true
    })

    Object.entries({
        "minecraft:furnace": { 
            upgradeId: "sophisticatedstorage:smelting_upgrade",
            advancedUpgradeId: "sophisticatedstorage:auto_smelting_upgrade",
            backpackUpgradeId: "sophisticatedbackpacks:smelting_upgrade",
            advancedBackpackUpgradeId: "sophisticatedbackpacks:auto_smelting_upgrade"
        },
        "minecraft:smoker": { 
            upgradeId: "sophisticatedstorage:smoking_upgrade" ,
            advancedUpgradeId: "sophisticatedstorage:auto_smoking_upgrade",
            backpackUpgradeId: "sophisticatedbackpacks:smoking_upgrade",
            advancedBackpackUpgradeId: "sophisticatedbackpacks:auto_smoking_upgrade"
        },
        "minecraft:blast_furnace": { 
            upgradeId: "sophisticatedstorage:blasting_upgrade" ,
            advancedUpgradeId: "sophisticatedstorage:auto_blasting_upgrade",
            backpackUpgradeId: "sophisticatedbackpacks:blasting_upgrade",
            advancedBackpackUpgradeId: "sophisticatedbackpacks:auto_blasting_upgrade"
        },
        "minecraft:hopper": {
            upgradeId: "sophisticatedstorage:hopper_upgrade",
            advancedUpgradeId: "sophisticatedstorage:advanced_hopper_upgrade",
        },

        "minecraft:crafting_table": { 
            upgradeId: "sophisticatedstorage:crafting_upgrade" ,
            backpackUpgradeId: "sophisticatedbackpacks:crafting_upgrade"
        },
        "minecraft:stonecutter": { 
            upgradeId: "sophisticatedstorage:stonecutter_upgrade" ,
            backpackUpgradeId: "sophisticatedbackpacks:stonecutter_upgrade"
        },
        "minecraft:jukebox": { 
            upgradeId: "sophisticatedstorage:jukebox_upgrade" ,
            backpackUpgradeId: "sophisticatedbackpacks:jukebox_upgrade",
        },


        "chipped:botanist_workbench": { 
            upgradeId: "sophisticatedstorage:chipped/botanist_workbench_upgrade",
            backpackUpgradeId: "sophisticatedbackpacks:chipped/botanist_workbench_upgrade"
        },
        "chipped:glassblower": { 
            upgradeId: "sophisticatedstorage:chipped/glassblower_upgrade",
            backpackUpgradeId: "sophisticatedbackpacks:chipped/glassblower_upgrade"
        },
        "chipped:carpenters_table": { 
            upgradeId: "sophisticatedstorage:chipped/carpenters_table_upgrade",
            backpackUpgradeId: "sophisticatedbackpacks:chipped/carpenters_table_upgrade"
        },
        "chipped:loom_table": { 
            upgradeId: "sophisticatedstorage:chipped/loom_table_upgrade",
            backpackUpgradeId: "sophisticatedbackpacks:chipped/loom_table_upgrade"
        },
        "chipped:mason_table": { 
            upgradeId: "sophisticatedstorage:chipped/mason_table_upgrade",
            backpackUpgradeId: "sophisticatedbackpacks:chipped/mason_table_upgrade"
        },
        "chipped:alchemy_bench": { 
            upgradeId: "sophisticatedstorage:chipped/alchemy_bench_upgrade",
            backpackUpgradeId: "sophisticatedbackpacks:chipped/alchemy_bench_upgrade"
        },
        "chipped:tinkering_table": { 
            upgradeId: "sophisticatedstorage:chipped/tinkering_table_upgrade",
            backpackUpgradeId: "sophisticatedbackpacks:chipped/tinkering_table_upgrade"
        }
    }).forEach(([stationId, data]) => {
        let { upgradeId, advancedUpgradeId, backpackUpgradeId, advancedBackpackUpgradeId } = data

        stationTabUpgrade(stationId, upgradeId)

        if (advancedUpgradeId) toAdvancedTabUpgrade(upgradeId, advancedUpgradeId)

        function stationTabUpgrade(stationId, upgradeId) {
            milfShaped(event, {
                pattern: [
                    'bPb',
                    'PBP',
                    'bSb'
                ],
                key: {
                    B: { item: "sophisticatedstorage:upgrade_base" },
                    P: { item: "modern_industrialization:steel_plate" },
                    b: { item: "modern_industrialization:copper_bolt" },
                    S: { item: stationId },
                },
                outputItems: [[{ id: upgradeId }, 1]],
                removeRecipe: true
            })

            if (backpackUpgradeId){
                backpackUpgradeFromStorage(
                    upgradeId,
                    backpackUpgradeId
                )
            }
        }

        function toAdvancedTabUpgrade(upgradeId, advancedUpgradeId){
            milfShaped(event, {
                pattern: [
                    'bCb',
                    'SBS',
                    'bIb'
                ],
                key: {
                    B: { item: upgradeId },
                    b: { item: "modern_industrialization:steel_bolt" },
                    I: { item: "immersiveengineering:component_iron" },
                    S: { item: "immersiveengineering:component_steel" },
                    C: { item: "modern_industrialization:analog_circuit" }
                },
                outputItems: [[{ id: advancedUpgradeId }, 1]],
                removeRecipe: true
            })

            if (advancedBackpackUpgradeId){
                backpackUpgradeFromStorage(
                    advancedUpgradeId,
                    advancedBackpackUpgradeId
                )
            }
        }
    })

    milfShaped(event, {
        pattern: [
            ' B ',
            ' P ',
            ' B '
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            P: { item: "modern_industrialization:iron_large_plate" }
        },
        outputItems: [[{ id: "sophisticatedstorage:stack_upgrade_tier_1" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'PpP',
            'pBp',
            'bSb'
        ],
        key: {
            B: { item: "sophisticatedstorage:stack_upgrade_tier_1" },
            b: { item: "minecraft:copper_block" },
            p: { item: "modern_industrialization:copper_plate" },
            P: { item: "modern_industrialization:copper_large_plate" },
            S: { item: "immersiveengineering:component_iron" },
        },
        outputItems: [[{ id: "sophisticatedstorage:stack_upgrade_tier_1_plus" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'PpP',
            'pBp',
            'SbS'
        ],
        key: {
            B: { item: "sophisticatedstorage:stack_upgrade_tier_1_plus" },
            b: { item: "minecraft:iron_block" },
            p: { item: "modern_industrialization:iron_plate" },
            P: { item: "modern_industrialization:iron_large_plate" },
            S: { item: "immersiveengineering:component_steel" },
        },
        outputItems: [[{ id: "sophisticatedstorage:stack_upgrade_tier_2" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'PpP',
            'pBp',
            'SbS'
        ],
        key: {
            B: { item: "sophisticatedstorage:stack_upgrade_tier_2" },
            b: { item: "modern_industrialization:analog_circuit" },
            p: { item: "modern_industrialization:gold_plate" },
            P: { item: "modern_industrialization:gold_large_plate" },
            S: { item: "immersiveengineering:component_steel" },
        },
        outputItems: [[{ id: "sophisticatedstorage:stack_upgrade_tier_3" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'PpP',
            'pBp',
            'SbS'
        ],
        key: {
            B: { item: "sophisticatedstorage:stack_upgrade_tier_3" },
            b: { item: "immersiveengineering:component_electronic" },
            p: { item: "modern_industrialization:diamond_plate" },
            P: { item: "modern_industrialization:diamond_large_plate" },
            S: { item: "immersiveengineering:component_steel" },
        },
        outputItems: [[{ id: "sophisticatedstorage:stack_upgrade_tier_4" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'PpP',
            'pBp',
            'SbS'
        ],
        key: {
            B: { item: "sophisticatedstorage:stack_upgrade_tier_4" },
            b: { item: "immersiveengineering:component_electronic_adv" },
            p: { item: "extended_industrialization:netherite_dust" },
            P: { item: "minecraft:netherite_block" },
            S: { item: "modern_industrialization:analog_circuit" },
        },
        outputItems: [[{ id: "sophisticatedstorage:stack_upgrade_tier_5" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'SbS',
            'SBS',
            'bSb'
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            b: { item: "ytech:wooden_bolt" },
            S: { item: "minecraft:stick" },
        },
        outputItems: [[{ id: "sophisticatedstorage:stack_downgrade_tier_1" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'bSb',
            'SBS',
            'bSb'
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            b: { item: "ytech:wooden_bolt" },
            S: { item: "minecraft:stick" },
        },
        outputItems: [[{ id: "sophisticatedstorage:stack_downgrade_tier_2" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'SbS',
            'bBb',
            'bSb'
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            b: { item: "ytech:wooden_bolt" },
            S: { item: "minecraft:stick" },
        },
        outputItems: [[{ id: "sophisticatedstorage:stack_downgrade_tier_3" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'RbR',
            'TBT',
            'RPR'
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            b: { item: "extended_industrialization:steel_brewery" },
            P: { item: "minecraft:ender_pearl" },
            R: { item: "minecraft:blaze_rod" },
            T: { item: "minecraft:ghast_tear" },
        },
        outputItems: [[{ id: "sophisticatedstorage:alchemy_upgrade" }, 1]],
        removeRecipe: true
    })

    advancedUpgrade(
        "sophisticatedstorage:jukebox_upgrade",
        "sophisticatedstorage:advanced_jukebox_upgrade"
    )

    advancedUpgrade(
        "sophisticatedstorage:alchemy_upgrade",
        "sophisticatedstorage:advanced_alchemy_upgrade"
    )

    function sophisticatedstorageShaped(event, args) {
        let recipe = {
            type: "sophisticatedstorage:storage_tier_upgrade",
            category: "misc",
            key: args.key,
            pattern: args.pattern,
            result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
        }
        if (!args.compatOff) {
            let itemInputs = getItemInputsFromShaped(args)

            miMachineRecipe(event, {
                energy: 2, time: 200, machine: "modern_industrialization:assembler",
                inputItems: itemInputs,
                outputItems: [[{ item: recipe.result.id }, recipe.result.count]]
            })
        }
        if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
        if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
        event.custom(recipe)
    }

    let storageTypes = [
        "barrel",
        "chest",
        "shulker_box",
        "limited_barrel_1",
        "limited_barrel_2",
        "limited_barrel_3",
        "limited_barrel_4"
    ]

    let storageMaterials = {
        "copper": (type) => {
            return {
                pattern: [
                    "BPB",
                    "PSP",
                    "BPB"
                ],
                key: {
                    "P": {
                        "item": "modern_industrialization:copper_large_plate"
                    },
                    "B": {
                        "item": "modern_industrialization:constantan_bolt"
                    },
                    "S": {
                        "item": `sophisticatedstorage:${type}`
                    }
                }
            }
        },
        "iron": (type) => {
            return {
                pattern: [
                    "BMB",
                    "PSP",
                    "BMB"
                ],
                key: {
                    "P": {
                        "item": "modern_industrialization:iron_large_plate"
                    },
                    "B": {
                        "item": "modern_industrialization:steel_bolt"
                    },
                    "M": {
                        "item": "immersiveengineering:component_iron"
                    },
                    "S": {
                        "item": `sophisticatedstorage:${type}`
                    }
                }
            }
        },
        "gold": (type) => {
            return {
                pattern: [
                    "BCB",
                    "PSP",
                    "BPB"
                ],
                key: {
                    "P": {
                        "item": "modern_industrialization:gold_large_plate"
                    },
                    "B": {
                        "item": "modern_industrialization:tumbaga_bolt"
                    },
                    "C": {
                        "item": "immersiveengineering:component_electronic"
                    },
                    "S": {
                        "item": `sophisticatedstorage:${type}`
                    }
                }
            }
        },
        "diamond": (type) => {
            return {
                pattern: [
                    "BCB",
                    "PSP",
                    "BPB"
                ],
                key: {
                    "P": {
                        "item": "modern_industrialization:diamond_large_plate"
                    },
                    "B": {
                        "item": "modern_industrialization:silicon_steel_bolt"
                    },
                    "C": {
                        "item": "immersiveengineering:component_electronic_adv"
                    },
                    "S": {
                        "item": `sophisticatedstorage:${type}`
                    }
                }
            }
        },
        "netherite": (type) => {
            return {
                pattern: [
                    "BCB",
                    "PSP",
                    "BPB"
                ],
                key: {
                    "P": {
                        "item": "modern_industrialization:silicon_steel_large_plate"
                    },
                    "B": {
                        "item": "modern_industrialization:netherite_rod"
                    },
                    "C": {
                        "item": "modern_industrialization:electronic_circuit"
                    },
                    "S": {
                        "item": `sophisticatedstorage:${type}`
                    }
                }
            }
        },
    }


    Object.entries(storageMaterials).forEach(([material, dataCallback]) => {
        
        storageTypes.forEach(type => {
            let recipeId = type.split("_")[0] != "limited" ? `${material}_${type}` : `limited_${material}_barrel_${type.split("_")[2]}`
            let itemId = `sophisticatedstorage:${recipeId}`

            let { pattern, key } = dataCallback(getCallbackType(material, type))

            sophisticatedstorageShaped(event, {
                pattern: pattern,
                key: key,
                outputItems: [[{ id: itemId }, 1]],
                removeRecipe: true
            })

            function getCallbackType(material, type) {
                if (material == "copper") return type.split("_")[0] != "limited" ? `${type}` : `limited_barrel_${type.split("_")[2]}`

                let MATERIAL_TO_PREV_MATERIAL = {
                    iron: "copper",
                    gold: "iron",
                    diamond: "gold",
                    netherite: "diamond"
                }

                let prevMaterial = MATERIAL_TO_PREV_MATERIAL[material]

                return type.split("_")[0] != "limited" ? `${prevMaterial}_${type}` : `limited_${prevMaterial}_barrel_${type.split("_")[2]}`
            }

        })

    })

    Object.entries({
        "sophisticatedstorage:basic_tier_upgrade": [
            "sophisticatedstorage:basic_to_copper_tier_upgrade",
            "sophisticatedstorage:copper_to_iron_tier_upgrade",
            "sophisticatedstorage:iron_to_gold_tier_upgrade",
            "sophisticatedstorage:gold_to_diamond_tier_upgrade",
            "sophisticatedstorage:diamond_to_netherite_tier_upgrade"
        ],
        "sophisticatedstorage:basic_to_copper_tier_upgrade": [
            "sophisticatedstorage:basic_to_iron_tier_upgrade",
            "sophisticatedstorage:copper_to_gold_tier_upgrade",
            "sophisticatedstorage:iron_to_diamond_tier_upgrade",
            "sophisticatedstorage:gold_to_netherite_tier_upgrade"
        ],
        "sophisticatedstorage:basic_to_iron_tier_upgrade": [
            "sophisticatedstorage:basic_to_gold_tier_upgrade",
            "sophisticatedstorage:copper_to_diamond_tier_upgrade",
            "sophisticatedstorage:iron_to_netherite_tier_upgrade"
        ],
        "sophisticatedstorage:basic_to_gold_tier_upgrade": [
            "sophisticatedstorage:basic_to_diamond_tier_upgrade",
            "sophisticatedstorage:copper_to_netherite_tier_upgrade"
        ],
        "sophisticatedstorage:basic_to_diamond_tier_upgrade": [
            "sophisticatedstorage:basic_to_netherite_tier_upgrade"
        ]
    }).forEach(([fromId, toIds]) => {
        toIds.forEach(toId => {
            let dataCallback = storageMaterials[toId.match(/_to_([a-z]+)_tier_upgrade/)[1]]
            let { pattern, key } = dataCallback(fromId.split(":")[1])

            milfShaped(event, {
                pattern: pattern,
                key: key,
                outputItems: [[{ id: toId }]],
                removeRecipe: true
            })
        })

    })

    milfShaped(event, {
        pattern: [
            'bPb',
            'PBP',
            'bPb'
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            b: { item: "ytech:wooden_bolt" },
            P: { tag: 'minecraft:planks' },
        },
        outputItems: [[{ id: "sophisticatedstorage:basic_tier_upgrade" }, 1]],
        removeRecipe: true
    })

    //#endregion

    //#region backpacks

    function advancedBackpackUpgrade(fromId, toId) {
        milfShaped(event, {
            pattern: [
                'bdb',
                'dBd',
                'bdb'
            ],
            key: {
                B: { item: fromId },
                d: { item: "modern_industrialization:iron_bolt" },
                b: { item: "modern_industrialization:gold_large_plate" }
            },
            outputItems: [[{ id: toId }, 1]],
            removeRecipe: true
        })
    }

    function backpackUpgradeFromStorage(fromId, toId) {
        milfShaped(event, {
            pattern: [
                'bBb',
                ' b ',
                'bUb'
            ],
            key: {
                B: { item: fromId },
                b: { item: "modern_industrialization:steel_bolt" },
                U: { item: "sophisticatedbackpacks:upgrade_base" }
            },
            outputItems: [[{ id: toId }, 1]],
            removeRecipe: true
        })
    }

    function backpackStackUpgradeFromStorage(fromId, toId) {
        milfShaped(event, {
            pattern: [
                'bUb',
                'BbB',
                'bBb'
            ],
            key: {
                B: { item: fromId },
                b: { item: "modern_industrialization:steel_bolt" },
                U: { item: "sophisticatedbackpacks:upgrade_base" }
            },
            outputItems: [[{ id: toId }, 1]],
            removeRecipe: true
        })
    }

    backpackStackUpgradeFromStorage(
        "sophisticatedstorage:stack_upgrade_tier_1_plus",
        "sophisticatedbackpacks:stack_upgrade_starter_tier"
    )

    backpackStackUpgradeFromStorage(
        "sophisticatedstorage:stack_upgrade_tier_2",
        "sophisticatedbackpacks:stack_upgrade_tier_1"
    )

    backpackStackUpgradeFromStorage(
        "sophisticatedstorage:stack_upgrade_tier_3",
        "sophisticatedbackpacks:stack_upgrade_tier_2"
    )

    backpackStackUpgradeFromStorage(
        "sophisticatedstorage:stack_upgrade_tier_4",
        "sophisticatedbackpacks:stack_upgrade_tier_3"
    )

    backpackStackUpgradeFromStorage(
        "sophisticatedstorage:stack_upgrade_tier_5",
        "sophisticatedbackpacks:stack_upgrade_tier_4"
    )

    backpackUpgradeFromStorage(
        "sophisticatedstorage:stack_downgrade_tier_1",
        "sophisticatedbackpacks:stack_downgrade_tier_1"
    )

    backpackUpgradeFromStorage(
        "sophisticatedstorage:stack_downgrade_tier_2",
        "sophisticatedbackpacks:stack_downgrade_tier_2"
    )

    backpackUpgradeFromStorage(
        "sophisticatedstorage:stack_downgrade_tier_3",
        "sophisticatedbackpacks:stack_downgrade_tier_3"
    )

    milfShaped(event, {
        pattern: [
            'LSL',
            'SBS',
            'LSL'
        ],
        key: {
            B: { item: "sophisticatedstorage:upgrade_base" },
            S: { item: "minecraft:string" },
            L: { item: "ytech:leather_strips" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:upgrade_base" }, 1]],
        removeRecipe: true
    })

    sophisticatedstorageShaped(event, {
        pattern: [
            'RBR',
            'SCS',
            'SBS'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            C: { item: "sophisticatedstorage:chest" },
            S: { item: "ytech:leather_strips" },
            R: { item: "modern_industrialization:steel_rod" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:backpack" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LHL',
            ' B ',
            'LIL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            I: { item: "immersiveengineering:component_steel" },
            H: { item: "minecraft:hopper" },
            L: { item: "modern_industrialization:steel_bolt" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:pickup_upgrade" }, 1]],
        removeRecipe: true
    })

    advancedBackpackUpgrade(
        "sophisticatedbackpacks:pickup_upgrade",
        "sophisticatedbackpacks:advanced_pickup_upgrade"
    )

    milfShaped(event, {
        pattern: [
            'LIL',
            'SBS',
            'LIL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            I: { item: "immersiveengineering:component_steel" },
            S: { item: "immersiveengineering:component_iron" },
            L: { item: "modern_industrialization:steel_bolt" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:filter_upgrade" }, 1]],
        removeRecipe: true
    })

    advancedBackpackUpgrade(
        "sophisticatedbackpacks:filter_upgrade",
        "sophisticatedbackpacks:advanced_filter_upgrade"
    )

    milfShaped(event, {
        pattern: [
            'LIL',
            'SBS',
            'LIL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            I: { item: "immersiveengineering:toolupgrade_powerpack_magnet" },
            S: { item: "immersiveengineering:component_iron" },
            L: { item: "modern_industrialization:steel_bolt" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:magnet_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LAL',
            'SBS',
            'LSL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:magnet_upgrade" },
            S: { item: "immersiveengineering:component_steel" },
            A: { item: "immersiveengineering:component_electronic_adv" },
            L: { item: "immersiveengineering:wirecoil_steel" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:advanced_magnet_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LAL',
            'SBS',
            'LSL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            S: { item: "immersiveengineering:component_steel" },
            A: { item: "extended_industrialization:robot_auto_feeder" },
            L: { item: "milf:basic_motor" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:feeding_upgrade" }, 1]],
        removeRecipe: true
    })

    advancedBackpackUpgrade(
        "sophisticatedbackpacks:feeding_upgrade",
        "sophisticatedbackpacks:advanced_feeding_upgrade"
    )

    backpackUpgradeFromStorage(
        "sophisticatedstorage:compacting_upgrade",
        "sophisticatedbackpacks:compacting_upgrade"
    )

    advancedBackpackUpgrade(
        "sophisticatedbackpacks:compacting_upgrade",
        "sophisticatedbackpacks:advanced_compacting_upgrade"
    )

    backpackUpgradeFromStorage(
        "sophisticatedstorage:void_upgrade",
        "sophisticatedbackpacks:void_upgrade"
    )

    advancedBackpackUpgrade(
        "sophisticatedbackpacks:void_upgrade",
        "sophisticatedbackpacks:advanced_void_upgrade"
    )

    milfShaped(event, {
        pattern: [
            'L L',
            'MBM',
            'LSL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            S: { item: "immersiveengineering:component_steel" },
            L: { item: "modern_industrialization:steel_bolt" },
            M: { item: "milf:basic_motor" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:restock_upgrade" }, 1]],
        removeRecipe: true
    })

    advancedBackpackUpgrade(
        "sophisticatedbackpacks:restock_upgrade",
        "sophisticatedbackpacks:advanced_restock_upgrade"
    )

    milfShaped(event, {
        pattern: [
            'LSL',
            'MBM',
            'L L'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            S: { item: "immersiveengineering:component_steel" },
            L: { item: "modern_industrialization:steel_bolt" },
            M: { item: "milf:basic_motor" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:deposit_upgrade" }, 1]],
        removeRecipe: true
    })

    advancedBackpackUpgrade(
        "sophisticatedbackpacks:deposit_upgrade",
        "sophisticatedbackpacks:advanced_deposit_upgrade"
    )

    milfShaped(event, {
        pattern: [
            'LCL',
            'MBM',
            'LCL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            C: { item: "modern_industrialization:conveyor" },
            L: { item: "modern_industrialization:steel_bolt" },
            M: { item: "milf:basic_motor" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:refill_upgrade" }, 1]],
        removeRecipe: true
    })

    advancedBackpackUpgrade(
        "sophisticatedbackpacks:refill_upgrade",
        "sophisticatedbackpacks:advanced_refill_upgrade"
    )

    milfShaped(event, {
        pattern: [
            'LCL',
            'MBM',
            'LCL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            C: { item: "modern_industrialization:adamant_large_plate" },
            L: { item: "modern_industrialization:bioresistant_alloy_bolt" },
            M: { item: "modern_industrialization:silicon_steel_large_plate" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:everlasting_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LCL',
            'MBM',
            'LCL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            C: { item: "travelertoolbelt:belt" },
            L: { item: "modern_industrialization:steel_bolt" },
            M: { item: "milf:basic_motor" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:tool_swapper_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LHL',
            ' B ',
            'LWL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:tool_swapper_upgrade" },
            W: { item: "modern_industrialization:wrench" },
            H: { item: "immersiveengineering:hammer" },
            L: { item: "modern_industrialization:gold_bolt" },
        },
        outputItems: [[{ id: "sophisticatedbackpacks:advanced_tool_swapper_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LCL',
            'MBM',
            'LCL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            M: { item: "milf:small_steel_fluid_container" },
            L: { item: "modern_industrialization:steel_bolt" },
            C: { item: "milf:basic_pump" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:tank_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LCL',
            'MBM',
            'LCL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            M: { item: "immersiveengineering:capacitor_lv" },
            L: { item: "modern_industrialization:steel_bolt" },
            C: { item: "immersiveengineering:wirecoil_copper" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:battery_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LCL',
            'MBM',
            'LCL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            M: { item: "minecraft:anvil" },
            L: { item: "modern_industrialization:steel_bolt" },
            C: { item: "modern_industrialization:steel_large_plate" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:anvil_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LML',
            'CBC',
            'LCL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            M: { item: "minecraft:smithing_table" },
            L: { item: "modern_industrialization:steel_bolt" },
            C: { item: "modern_industrialization:steel_large_plate" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:smithing_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LCL',
            'MBM',
            'LCL'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:upgrade_base" },
            M: { item: "milf:basic_motor" },
            L: { item: "modern_industrialization:steel_bolt" },
            C: { item: "immersiveengineering:component_electronic" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:mob_catcher_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'LCL',
            'MBM',
            'LML'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:mob_catcher_upgrade" },
            M: { item: "modern_industrialization:motor" },
            L: { item: "modern_industrialization:silicon_steel_bolt" },
            C: { item: "immersiveengineering:component_electronic_adv" }
        },
        outputItems: [[{ id: "sophisticatedbackpacks:advanced_mob_catcher_upgrade" }, 1]],
        removeRecipe: true
    })


    function sophisticatedBackpackShaped(event, args) {
        let recipe = {
            type: "sophisticatedbackpacks:backpack_upgrade",
            category: "misc",
            key: args.key,
            pattern: args.pattern,
            result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
        }
        if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
        if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
        event.custom(recipe)
    }

    sophisticatedBackpackShaped(event, {
        pattern: [
            'bPb',
            'PBP',
            'bPb'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:backpack" },
            b: { item: "modern_industrialization:constantan_bolt" },
            P: { item: "modern_industrialization:bronze_large_plate" },
        },
        outputItems: [[{ id: "sophisticatedbackpacks:copper_backpack" }, 1]],
        removeRecipe: true
    })

    sophisticatedBackpackShaped(event, {
        pattern: [
            'bPb',
            'CBC',
            'bPb'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:copper_backpack" },
            b: { item: "modern_industrialization:steel_bolt" },
            P: { item: "modern_industrialization:steel_large_plate" },
            C: { item: "immersiveengineering:component_steel" },
        },
        outputItems: [[{ id: "sophisticatedbackpacks:iron_backpack" }, 1]],
        removeRecipe: true
    })

    sophisticatedBackpackShaped(event, {
        pattern: [
            'bCb',
            'PBP',
            'bPb'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:iron_backpack" },
            b: { item: "modern_industrialization:adamant_bolt" },
            P: { item: "modern_industrialization:aluminum_large_plate" },
            C: { item: "immersiveengineering:component_electronic_adv" },
        },
        outputItems: [[{ id: "sophisticatedbackpacks:gold_backpack" }, 1]],
        removeRecipe: true
    })

    sophisticatedBackpackShaped(event, {
        pattern: [
            'bCb',
            'PBP',
            'bPb'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:gold_backpack" },
            b: { item: "modern_industrialization:silicon_steel_bolt" },
            P: { item: "modern_industrialization:stainless_steel_large_plate" },
            C: { item: "modern_industrialization:electronic_circuit" },
        },
        outputItems: [[{ id: "sophisticatedbackpacks:diamond_backpack" }, 1]],
        removeRecipe: true
    })

    sophisticatedBackpackShaped(event, {
        pattern: [
            'bCb',
            'PBP',
            'bPb'
        ],
        key: {
            B: { item: "sophisticatedbackpacks:diamond_backpack" },
            b: { item: "modern_industrialization:stainless_steel_bolt" },
            P: { item: "modern_industrialization:blastproof_alloy_large_plate" },
            C: { item: "modern_industrialization:digital_circuit" },
        },
        outputItems: [[{ id: "sophisticatedbackpacks:netherite_backpack" }, 1]],
        removeRecipe: true
    })

    advancedBackpackUpgrade(
        "sophisticatedbackpacks:jukebox_upgrade",
        "sophisticatedbackpacks:advanced_jukebox_upgrade"
    )

    backpackUpgradeFromStorage(
        "sophisticatedstorage:alchemy_upgrade",
        "sophisticatedbackpacks:alchemy_upgrade"
    )

    backpackUpgradeFromStorage(
        "sophisticatedstorage:advanced_alchemy_upgrade",
        "sophisticatedbackpacks:advanced_alchemy_upgrade"
    )

    //#endregion

})