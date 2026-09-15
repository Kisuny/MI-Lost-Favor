ServerEvents.recipes(event => {

    Object.entries({
        "milf:unfired_clay_mold_axe": {
            woodenPart: "milf:wooden_axe_head",
            mold: "milf:clay_mold_axe",
            volume: $FluidType.BUCKET_VOLUME / 4,
            castMap: {
                "embers:molten_bronze": "ytech:bronze_axe_head_part"
            }
        },
        "milf:unfired_clay_mold_hammer": {
            woodenPart: "milf:wooden_hammer_head",
            mold: "milf:clay_mold_hammer",
            volume: $FluidType.BUCKET_VOLUME,
            castMap: {
                "embers:molten_bronze": "ytech:bronze_hammer_head_part"
            }
        },
        "milf:unfired_clay_mold_hoe": {
            woodenPart: "milf:wooden_hoe_head",
            mold: "milf:clay_mold_hoe",
            volume: $FluidType.BUCKET_VOLUME / 5,
            castMap: {
                "embers:molten_bronze": "milf:bronze_hoe_head_part"
            }
        },
        "milf:unfired_clay_mold_pickaxe": {
            woodenPart: "milf:wooden_pickaxe_head",
            mold: "milf:clay_mold_pickaxe",
            volume: $FluidType.BUCKET_VOLUME / 4,
            castMap: {
                "embers:molten_bronze": "ytech:bronze_pickaxe_head_part"
            }
        },
        "milf:unfired_clay_mold_shovel": {
            woodenPart: "milf:wooden_shovel_head",
            mold: "milf:clay_mold_shovel",
            volume: $FluidType.BUCKET_VOLUME / 8,
            castMap: {
                "embers:molten_bronze": "milf:bronze_shovel_head_part"
            }
        },
        "milf:unfired_clay_mold_sword": {
            woodenPart: "milf:wooden_sword_blade",
            mold: "milf:clay_mold_sword",
            volume: $FluidType.BUCKET_VOLUME / 5,
            castMap: {
                "embers:molten_bronze": "ytech:bronze_sword_blade_part"
            }
        }
    }).forEach(([unfiredMoldId, data]) => {

        let { woodenPart, mold, castMap, volume } = data

        milfShapedCustom(event, {
            pattern: [
                'p  ',
                'm  ',
                '   '
            ],
            key: {
                p: { item: woodenPart },
                m: { item: "milf:unfired_clay_plate" },
            },
            keepIngredient: woodenPart,
            outputItems: [[{ id: unfiredMoldId }, 1]],
        })

        ytechSmeltingRecipe(event, {
            inputItems: [
                [{ item: unfiredMoldId }],
            ],
            outputItems: [
                [{ id: mold }]
            ],
            minTemp: 1000,
        })

        Object.entries(castMap).forEach(([fluidId, part])=> {

            let fluidComponent = {"immersiveengineering:fluid": {}}
            fluidComponent["immersiveengineering:fluid"].id = fluidId
            fluidComponent["immersiveengineering:fluid"].amount = volume

            yTechShapeless(event, {
                inputItems: [
                    [{ tag: "c:hammers" }],
                    [{
                        "type": "neoforge:components",
                        "items": mold,
                        "strict": false,
                        "components": fluidComponent
                    }],
                    [{
                        "type": "neoforge:components",
                        "items": "milf:clay_bucket",
                        "strict": false,
                        "components": { 
                            "immersiveengineering:fluid": {
                                id: "minecraft:water",
                                amount: 1000
                            } 
                        }
                    }],
                ],
                outputItems: [[{ id: part }, 1]],
                compatOff: true
            })

            // yTechShaped(event, {
            //     pattern: [
            //         ' h ',
            //         ' m ',
            //         '   '
            //     ],
            //     key: {
            //         h: { tag: "c:hammers" },
            //         m: {
            //             "type": "neoforge:components",
            //             "items": mold,
            //             "strict": false,
            //             "components": fluidComponent
            //         }
            //     },
            //     outputItems: [[{ id: part }, 1]],
            //     compatOff: true
            // })
        })


    })

    milfShaped(event, {
        pattern: [
            "ccc",
        ],
        key: {
            "c": { "item": "minecraft:clay_ball" },
        },
        outputItems: [[{ id: "milf:unfired_clay_plate" }, 1]]
    })

    yTechShaped(event, {
        pattern: [
            "bb ",
            "bph",
            "a  ",
        ],
        key: {
            "b": { "item": "ytech:wooden_bolt" },
            "p": { "item": "ytech:wooden_plate" },
            "h": { "tag": "c:hammers" },
            "a": { "tag": "minecraft:axes" },
        },
        outputItems: [[{ id: "milf:wooden_axe_head" }, 1]],
        compatOff: true
    })

    yTechShaped(event, {
        pattern: [
            "bpb",
            "ppp",
            "a h",
        ],
        key: {
            "b": { "item": "ytech:wooden_bolt" },
            "p": { "item": "ytech:wooden_plate" },
            "h": { "tag": "c:hammers" },
            "a": { "tag": "minecraft:axes" },
        },
        outputItems: [[{ id: "milf:wooden_hammer_head" }, 1]],
        compatOff: true
    })

    yTechShaped(event, {
        pattern: [
            "bbp",
            "a h",
            "   ",
        ],
        key: {
            "b": { "item": "ytech:wooden_bolt" },
            "p": { "item": "ytech:wooden_plate" },
            "h": { "tag": "c:hammers" },
            "a": { "tag": "minecraft:axes" },
        },
        outputItems: [[{ id: "milf:wooden_hoe_head" }, 1]],
        compatOff: true
    })

    yTechShaped(event, {
        pattern: [
            "bpb",
            "a h",
            "   ",
        ],
        key: {
            "b": { "item": "ytech:wooden_bolt" },
            "p": { "item": "ytech:wooden_plate" },
            "h": { "tag": "c:hammers" },
            "a": { "tag": "minecraft:axes" },
        },
        outputItems: [[{ id: "milf:wooden_pickaxe_head" }, 1]],
        compatOff: true
    })

    yTechShaped(event, {
        pattern: [
            " p ",
            "bpb",
            "a h",
        ],
        key: {
            "b": { "item": "ytech:wooden_bolt" },
            "p": { "item": "ytech:wooden_plate" },
            "h": { "tag": "c:hammers" },
            "a": { "tag": "minecraft:axes" },
        },
        outputItems: [[{ id: "milf:wooden_shovel_head" }, 1]],
        compatOff: true
    })

    yTechShaped(event, {
        pattern: [
            " b ",
            "abh",
            " p ",
        ],
        key: {
            "b": { "item": "ytech:wooden_bolt" },
            "p": { "item": "ytech:wooden_plate" },
            "h": { "tag": "c:hammers" },
            "a": { "tag": "minecraft:axes" },
        },
        outputItems: [[{ id: "milf:wooden_sword_blade" }, 1]],
        compatOff: true
    })

    Object.entries({
        "milf:wooden_axe_head": "minecraft:wooden_axe",
        "milf:wooden_hammer_head": null,
        "milf:wooden_hoe_head": "minecraft:wooden_hoe",
        "milf:wooden_pickaxe_head": "minecraft:wooden_pickaxe",
        "milf:wooden_shovel_head": "minecraft:wooden_shovel",
        "milf:wooden_sword_blade": "minecraft:wooden_sword"
    }).forEach(([partId, toolId]) => {

        if (!toolId) return

        milfShaped(event, {
            pattern: [
                " bp",
                " tb",
                "s  ",
            ],
            key: {
                "s": { "item": "minecraft:stick" },
                "t": { "item": "ytech:grass_twine" },
                "b": { "item": "ytech:wooden_bolt" },
                p: { item: partId }
            },
            outputItems: [[{ id: toolId }, 1]],
            compatOff: true
        })
    })


    milfShaped(event, {
        pattern: [
            "RPH",
            "LFP",
            "PLR",
        ],
        key: {
            "H": { "item": "modern_industrialization:steel_drill_head" },
            "F": { "item": "modern_industrialization:steel_tank" },
            "R": { "item": "immersiveengineering:component_iron" },
            "L": { "item": "modern_industrialization:iron_large_plate" },
            "P": { "item": "modern_industrialization:steel_gear" },

        },
        outputItems: [[{ id: "milf:big_bulky_drill" }, 1]]
    })

    milfShaped(event, {
        pattern: [
            "RPH",
            "LFP",
            "PLR",
        ],
        key: {
            "H": { "item": "modern_industrialization:bronze_drill_head" },
            "F": { "item": "modern_industrialization:bronze_tank" },
            "R": { "item": "modern_industrialization:invar_curved_plate" },
            "L": { "item": "modern_industrialization:invar_large_plate" },
            "P": { "item": "modern_industrialization:bronze_gear" },
            
        },
        outputItems: [[{ id: "milf:clunky_drill" }, 1]]
    })

    milfShaped(event, {
        pattern: [
            "  R",
            "HR ",
            "FCB",
        ],
        key: {
            "C": { "item": "modern_industrialization:digital_circuit" },
            "F": { "item": "modern_industrialization:he_mox_fuel_rod" },
            "R": { "item": "modern_industrialization:silver_rod" },
            "H": { "item": "modern_industrialization:small_heat_exchanger" },
            "B": { "item": "modern_industrialization:stainless_steel_curved_plate" },

        },
        outputItems: [[{ id: "milf:ms_s_second_order" }, 1]]
    })

    milfShaped(event, {
        pattern: [
            "R  ",
            "Rrr",
            "CRR"
        ],
        key: {
            R: { item: "modern_industrialization:steel_rod" },
            r: { item: "modern_industrialization:steel_ring" },
            C: { item: "immersiveengineering:component_steel" }
        },
        outputItems: [[{ id: "milf:mi_upgrader" }, 1]],
    })

    milfShaped(event, {
        pattern: [
            "Nr ",
            "rRB",
            "TBG"
        ],
        key: {
            r: { item: "modern_industrialization:iron_rod" },
            N: { item: "modern_industrialization:steel_nugget" },
            R: { item: "modern_industrialization:steel_rod" },
            T: { item: "ytech:grass_twine" },
            B: { item: "milf:steel_machine_bit" },
            G: { item: "immersiveengineering:wooden_grip" }
        },
        outputItems: [[{ id: "milf:grappling_gun" }, 1]],
    })

    milfShaped(event, {
        pattern: [
            "FRF",
            "FRF",
            "FRF"
        ],
        key: {
            F: { tag: "c:fences/wooden" },
            R: { tag: "milf:ropes" }
        },
        outputItems: [[{ id: "milf:zipped_zipline" }, 1]],
    })

    milfShaped(event, {
        pattern: [
            " FT",
            " SF",
            "S  ",
        ],
        key: {
            "T": { "item": "ytech:grass_twine" },
            "S": { "tag": "milf:sticks" },
            "F": { "item": "ytech:sharp_flint" },
        },
        outputItems: [[{ id: "milf:flint_pickaxe" }, 1]]
    })

    yTechShaped(event, {
        pattern: [
            "Q#Q",
            "CMC",
            " Q ",
        ],
        key: {
            "C": { "item": "spectrum:citrine_shard" },
            "#": { "tag": "c:files" },
            "Q": { "tag": "c:gems/quartz" },
            "M": { "item": "enchanted:reek_of_misfortune" },
        },
        outputItems: [[{ id: "milf:amber_visage" }, 1]]
    })

    yTechShaped(event, {
        pattern: [
            "N#s",
            "BMB",
            "SES"
        ],
        key: {
            "#": { tag: "c:mortar_and_pestles" },
            N: { item: "milf:nutmeg" },
            E: { tag: "c:eggs" },
            B: { item: "minecraft:cocoa_beans" },
            S: { item: "minecraft:sugar" },
            M: { item: "minecraft:milk_bucket" },
            s: { item: "minecraft:stick" },
        },
        outputItems: [[{ id: "milf:eggnog" }, 1]],
        compatOff: true
    })

    customMixingCauldron(event, {
        fluid: "minecraft:water",
        fluidAmount: 1000,
        ingredients: [
            { "item": "minecraft:glass_bottle" },
            { "tag": "hexerei:flower_biproduct" },
            { "item": "minecraft:poisonous_potato" },
            { "tag": "spectrum:gemstone_shards" },
            { "tag": "spectrum:gemstone_shards" },
            { "tag": "spectrum:gemstone_shards" },
            { "item": "minecraft:poisonous_potato" },
            { "tag": "hexerei:flower_biproduct" }
        ],
        output: "milf:recall_concoction",
        amount: 2,
        removeRecipe: true
    })

    customMixingCauldron(event, {
        fluid: "immersiveengineering:creosote",
        fluidAmount: 1000,
        ingredients: [
            { "item": "minecraft:glass_bottle" },
            { "item": "modern_industrialization:steel_dust" },
            { "item": "milf:larva" },
            { "item": "milf:recall_concoction" },
            { "item": "modern_industrialization:steel_dust" },
            { "item": "milf:recall_concoction" },
            { "item": "milf:larva" },
            { "item": "modern_industrialization:steel_dust" }
        ],
        output: "milf:grecall_concoction_t1",
        amount: 1,
        removeRecipe: true
    })

    customAlchemicalForgeCraft(event, {
        affinities: [
            "toxony:heat",
            "toxony:nether",
            "toxony:decay"
        ],
        auxiliary: [
            {
                "item": "eidolon_edoni:stimulating_incense"
            },
            {
                "item": "eidolon_repraised:soul_harvest_incense"
            }
        ],
        main: {
            "item": "eidolon_repraised:shadow_gem"
        },
        result: "milf:miasma_orb"
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [[{ tag: "milf:artifacts" }]],
        outputItems: [[{ id: "milf:artifact_dust" }, 1, 0.3]],
    })

    customWorktable(event, {
        pattern: [
            " r ",
            " w ",
            " e "
        ],
        reagents: ["u   "],
        key: {
            "w": { "item": "milf:miasma_orb" },
            "e": { "tag": "c:drinks/watery" },
            "r": { "item": "ars_nouveau:magebloom_crop" },
            "u": { "tag": "eidolon_repraised:patron_symbol" },
        },
        result: "milf:crimson_veil_elixir",
        count: 8
    })


    customShrineRecipe(event, {
        time: 60,
        experience: 4.0,
        fluid: "milf:shimmersteel_essence",
        ingredients: [
            { "item": "spectrum:onyx_shard", count: 12 },
            { "item": "enchanted:foul_fume", count: 4 },
            { "item": "embers:winding_gears", count: 1 },
        ],
        result: {
            "id": "milf:onyx_table_core",
            "count": 1
        },
        advancement: "spectrum:unlocks/blocks/fusion_shrine"
    })



})
