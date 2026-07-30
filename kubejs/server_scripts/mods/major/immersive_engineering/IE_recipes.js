function ieShapedFluid(event, args) {
    let recipe = {
        type: "immersiveengineering:shaped_fluid",
        category: "misc",
        key: args.key,
        pattern: args.pattern,
        result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
    }
    if (!args.compatOff) {

        let { itemInputs, fluidInputs } = getInputsFromIEShaped(args)

        // let itemInputs = []
        // let fluidInputs = []
        // let amounts = args.pattern.join("")

        // Object.entries(args.key).forEach(m => {
        //     let regex = new RegExp(m[0], 'g')
        //     if (m[1].type) {
        //         let tempObj = Object.assign({}, m[1])
        //         delete tempObj.type
        //         delete tempObj.amount
        //         fluidInputs.push([tempObj, m[1].amount])
        //     } else {
        //         itemInputs.push([m[1], (amounts.match(regex) || []).length])
        //     }
        //     //itemInputs.push((amounts.match(regex) || []).length + "x " + m[1])
        // })
        miMachineRecipe(event, {
            energy: 2, time: 200, machine: "modern_industrialization:assembler",
            inputItems: itemInputs,
            inputFluids: fluidInputs,
            outputItems: [[{ item: recipe.result.id }, recipe.result.count]]
        })
    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
    event.custom(recipe)
}


ServerEvents.recipes(event => {
    // (`･Θ･´) - Some recipes are located in data because it is easier to change a recipe there and delete the previous recipe at the same time (overwrite)
    event.remove({
        output: [
            /immersiveengineering:.*coke.*/,
            /immersiveengineering:plate.*/,
            // /immersiveengineering:wire.*/,
            /immersiveengineering:stick.*/,
            /immersiveengineering:dust.*/,
            /immersiveengineering:ingot.*/,
            /immersiveengineering:raw.*/,
            /immersiveengineering:nugget.*/,
            // /immersiveengineering:storage_.*/,
            'immersiveengineering:wire_copper',
            'immersiveengineering:wire_electrum',
            'immersiveengineering:wire_aluminum',
            'immersiveengineering:wire_steel',
            'immersiveengineering:wire_lead',
            /immersiveposts:stick_.*/,

        ]
    })

    event.remove({ id: "immersiveengineering:crafting/nugget_copper_to_copper_ingot" })

    const materials_for_wires = ["steel", "copper", "lead"]
    materials_for_wires.forEach(material => {
        event.replaceInput(
            { input: `immersiveengineering:wire_${material}` },
            `immersiveengineering:wire_${material}`,
            `modern_industrialization:${material}_wire`
        )
    });

    const iron_to_steel = [
        "immersiveengineering:hammer",
        "immersiveengineering:dynamo",
    ]
    iron_to_steel.forEach(element => {
        event.replaceInput(
            { output: element },
            "iron_ingot",
            "modern_industrialization:steel_ingot"
        )
    });

    event.replaceInput(
        { output: "immersiveengineering:toolbox" },
        "modern_industrialization:aluminum_plate",
        "modern_industrialization:steel_plate"
    )

    //#region ieShapedFluid

    ieShapedFluid(event, {
        pattern: [
            "rSr",
            "SRS",
            "rSr"
        ],
        key: {
            S: { item: "immersiveengineering:wirecoil_steel" },
            r: { item: "modern_industrialization:rubber_sheet" },
            R: {
                type: "immersiveengineering:fluid_stack",
                amount: 1000,
                fluid: "modern_industrialization:molten_redstone"
            }
        },
        outputItems: [[{ id: "immersiveengineering:wirecoil_redstone" }, 4]],
        removeRecipe: true
    })

    ieShapedFluid(event, {
        pattern: [
            "WQW",
            "rCr",
            "SRS"
        ],
        key: {
            C: { item: "modern_industrialization:analog_circuit" },
            Q: { tag: "c:gems/quartz" },
            W: { item: "modern_industrialization:electrum_wire" },
            r: { item: "modern_industrialization:rubber_sheet" },
            S: { tag: "immersiveengineering:treated_wood_slab" },
            R: {
                type: "immersiveengineering:fluid_stack",
                amount: 1000,
                fluid: "modern_industrialization:molten_redstone"
            }
        },
        outputItems: [[{ id: "immersiveengineering:component_electronic" }, 1]],
        removeRecipe: true
    })

    ieShapedFluid(event, {
        pattern: [
            "W W",
            "nri",
            "WBW"
        ],
        key: {
            B: { item: "immersiveengineering:basic_engineering" },
            W: { item: "immersiveengineering:wirecoil_steel" },
            n: { item: "modern_industrialization:hop_graphite_plate" },
            i: { item: "modern_industrialization:aluminum_plate" },
            r: {
                type: "immersiveengineering:fluid_stack",
                amount: 1000,
                fluid: "immersiveengineering:redstone_acid"
            }
        },
        outputItems: [[{ id: "immersiveengineering:capacitor_hv" }, 1]],
        removeRecipe: true
    })

    ieShapedFluid(event, {
        pattern: [
            "W W",
            "nri",
            "WBW"
        ],
        key: {
            B: { item: "immersiveengineering:basic_engineering" },
            W: { item: "immersiveengineering:wirecoil_electrum" },
            n: { item: "modern_industrialization:nickel_plate" },
            i: { item: "modern_industrialization:iron_plate" },
            r: {
                type: "immersiveengineering:fluid_stack",
                amount: 1000,
                fluid: "immersiveengineering:redstone_acid"
            }
        },
        outputItems: [[{ id: "immersiveengineering:capacitor_mv" }, 1]],
        removeRecipe: true
    })

    ieShapedFluid(event, {
        pattern: [
            "W W",
            "lrl",
            "WBW"
        ],
        key: {
            B: { tag: "immersiveengineering:treated_wood" },
            W: { item: "immersiveengineering:wirecoil_copper" },
            l: { item: "modern_industrialization:lead_plate" },
            r: {
                type: "immersiveengineering:fluid_stack",
                amount: 1000,
                fluid: "immersiveengineering:redstone_acid"
            }
        },
        outputItems: [[{ id: "immersiveengineering:capacitor_lv" }, 1]],
        removeRecipe: true
    })

    ieShapedFluid(event, {
        pattern: [
            "SCS",
            "PWP",
            "SIS"
        ],
        key: {
            S: { item: "modern_industrialization:steel_large_plate" },
            C: { item: "immersiveengineering:component_steel" },
            I: { item: "immersiveengineering:component_iron" },
            P: { item: "modern_industrialization:constantan_plate" },
            W: {
                type: "immersiveengineering:fluid_stack",
                amount: 1000,
                tag: "minecraft:water"
            }
        },
        outputItems: [[{ id: "immersiveengineering:radiator" }, 1]],
        removeRecipe: true
    })

    //#endregion

    //#region milfShaped

    milfShaped(event, {
        pattern: [
            "SbS",
            "bBb",
            "SbS"
        ],
        key: {
            B: { item: "milf:blank_blueprint" },
            S: { item: "modern_industrialization:rubber_sheet" },
            b: { item: "milf:steel_machine_bit" }
        },
        outputItems: [[{ 
            id: "immersiveengineering:blueprint",
            components: { "immersiveengineering:blueprint": MILF_BLUEPRINTS.craftingComponents, "minecraft:item_name": "{'text':'" + "Components" + "','color':'" + '#765A53' + "'}" }
        }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "ISI",
            "RRR",
            "ISI"
        ],
        key: {
            S: { item: "modern_industrialization:steel_curved_plate" },
            R: { item: "modern_industrialization:rubber_sheet" },
            I: { item: "modern_industrialization:iron_bolt" }
        },
        outputItems: [[{ id: "immersiveengineering:fluid_pipe" }, 4]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "IWI",
            "WSW",
            "IWI"
        ],
        key: {
            S: { item: "immersiveengineering:basic_engineering" },
            W: { item: "modern_industrialization:aluminum_wire" },
            I: { item: "modern_industrialization:iron_bolt" }
        },
        outputItems: [[{ id: "immersiveengineering:item_batcher" }, 4]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "RLR",
            "RRR",
            "SFS"
        ],
        key: {
            L: { tag: "c:leathers" },
            S: { item: "modern_industrialization:steel_rod" },
            R: { item: "modern_industrialization:rubber_sheet" },
            F: { item: "modern_industrialization:steel_plate" }
        },
        outputItems: [[{ id: "immersiveengineering:conveyor_basic" }, 12]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WCW",
            "WBW",
            "sss"
        ],
        key: {
            B: { item: "immersiveengineering:basic_engineering" },
            C: { item: "immersiveengineering:component_electronic" },
            W: { item: "immersiveengineering:wirecoil_redstone" },
            s: { item: "modern_industrialization:steel_plate" }
        },
        outputItems: [[{ id: "immersiveengineering:machine_interface" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "NFN",
            "FMF",
            "NFN"
        ],
        key: {
            M: { item: "minecraft:magma_block" },
            N: { item: "minecraft:nether_brick" },
            F: { item: "modern_industrialization:fire_clay_brick" },
        },
        outputItems: [[{ id: "immersiveengineering:blastbrick" }, 3]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "G B",
            "DSS",
            "T F"
        ],
        key: {
            T: { item: "immersiveengineering:craftingtable" },
            D: { item: "modern_industrialization:iron_double_ingot" },
            G: { item: "modern_industrialization:steel_gear" },
            S: { tag: "immersiveengineering:treated_wood_slab" },
            B: { item: "milf:blank_blueprint" },
            F: { item: "immersiveengineering:treated_fence" }
        },
        outputItems: [[{ id: "immersiveengineering:workbench" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "PSP",
            "IRI",
            "PSP"
        ],
        key: {
            S: { item: "immersiveengineering:component_steel" },
            I: { item: "immersiveengineering:component_iron" },
            P: { item: "modern_industrialization:iron_large_plate" },
            R: { item: "immersiveengineering:component_electronic" }
        },
        outputItems: [[{ id: "immersiveengineering:rs_engineering" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WGw",
            "G G",
            "BBB"
        ],
        key: {
            G: { item: "milf:steel_infused_glass" },
            W: { item: "immersiveengineering:wirecoil_copper" },
            w: { item: "immersiveengineering:wirecoil_electrum" },
            B: { tag: "immersiveengineering:treated_wood" },
        },
        outputItems: [[{ id: "immersiveengineering:charging_station" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " R ",
            "IRI",
            "IDI"
        ],
        key: {
            R: { item: "modern_industrialization:copper_rod" },
            I: { tag: "immersiveengineering:connector_insulator" },
            D: { item: "modern_industrialization:copper_double_ingot" }
        },
        outputItems: [[{ id: "immersiveengineering:connector_lv" }, 2]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " R ",
            "IDI",
            "   "
        ],
        key: {
            R: { item: "modern_industrialization:copper_rod" },
            I: { tag: "immersiveengineering:connector_insulator" },
            D: { item: "modern_industrialization:copper_double_ingot" }
        },
        outputItems: [[{ id: "immersiveengineering:connector_lv_relay" }, 4]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " R ",
            "IRI",
            "IDI"
        ],
        key: {
            R: { item: "modern_industrialization:electrum_rod" },
            I: { tag: "immersiveengineering:connector_insulator" },
            D: { item: "modern_industrialization:electrum_double_ingot" }
        },
        outputItems: [[{ id: "immersiveengineering:connector_mv" }, 2]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " R ",
            "IDI",
            "   "
        ],
        key: {
            R: { item: "modern_industrialization:electrum_rod" },
            I: { tag: "immersiveengineering:connector_insulator" },
            D: { item: "modern_industrialization:electrum_double_ingot" }
        },
        outputItems: [[{ id: "immersiveengineering:connector_mv_relay" }, 4]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " R ",
            "IRI",
            "IDI"
        ],
        key: {
            R: { item: "modern_industrialization:aluminum_rod" },
            I: { tag: "immersiveengineering:connector_insulator" },
            D: { item: "modern_industrialization:aluminum_double_ingot" }
        },
        outputItems: [[{ id: "immersiveengineering:connector_hv" }, 2]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " R ",
            "IDI",
            "   "
        ],
        key: {
            R: { item: "modern_industrialization:aluminum_rod" },
            I: { item: "immersiveengineering:insulating_glass" },
            D: { item: "modern_industrialization:aluminum_double_ingot" }
        },
        outputItems: [[{ id: "immersiveengineering:connector_hv_relay" }, 4]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WWW",
            "R W",
            "C  "
        ],
        key: {
            W: { item: "immersiveengineering:wirecoil_electrum" },
            R: { item: "modern_industrialization:iron_rod" },
            C: { item: "immersiveengineering:connector_lv" }
        },
        outputItems: [[{ id: "immersiveengineering:toolupgrade_powerpack_antenna" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "RRR",
            "WCW",
            "WcW"
        ],
        key: {
            W: { item: "immersiveengineering:wirecoil_electrum" },
            R: { item: "modern_industrialization:iron_rod" },
            C: { item: "immersiveengineering:capacitor_mv" },
            c: { item: "immersiveengineering:component_electronic" }
        },
        outputItems: [[{ id: "immersiveengineering:toolupgrade_powerpack_tesla" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "ISI",
            "WcW",
            " W "
        ],
        key: {
            W: { item: "immersiveengineering:wirecoil_electrum" },
            I: { item: "modern_industrialization:iron_double_ingot" },
            S: { item: "modern_industrialization:steel_double_ingot" },
            c: { item: "immersiveengineering:component_electronic" }
        },
        outputItems: [[{ id: "immersiveengineering:toolupgrade_powerpack_magnet" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "bWb",
            "WSW",
            "bWb"
        ],
        key: {
            W: { item: "immersiveengineering:waterwheel_segment" },
            S: { item: "modern_industrialization:steel_double_ingot" },
            b: { item: "modern_industrialization:steel_bolt" }
        },
        outputItems: [[{ id: "immersiveengineering:watermill" }, 1]],
        removeRecipe: true
    })


    milfShaped(event, {
        pattern: [
            "PUP",
            "IRI",
            "PSP"
        ],
        key: {
            S: { item: "immersiveengineering:component_steel" },
            I: { item: "immersiveengineering:component_iron" },
            P: { item: "modern_industrialization:steel_large_plate" },
            R: { item: "minecraft:echo_shard" },
            U: { item: "modern_industrialization:basic_upgrade" }
        },
        outputItems: [[{ id: "immersiveengineering:resonanz_engineering" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "SCS",
            "SMS",
            "EFE"
        ],
        key: {
            E: { item: "immersiveengineering:light_engineering" },
            F: { item: "immersiveengineering:steel_fence" },
            S: { item: "immersiveengineering:steel_scaffolding_standard" },
            M: { item: "milf:basic_motor" },
            C: { item: "immersiveengineering:component_electronic" }
        },
        outputItems: [[{ id: "immersiveengineering:sample_drill" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " DB",
            " SD",
            "S  "
        ],
        key: {
            D: { item: "modern_industrialization:steel_double_ingot" },
            B: { item: "modern_industrialization:steel_bolt" },
            S: { item: "immersiveengineering:stick_treated" }
        },
        outputItems: [[{ id: "immersiveengineering:sawblade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "NF",
            "FN",
        ],
        key: {
            N: { item: "minecraft:nether_brick" },
            F: { item: "modern_industrialization:fire_clay_brick" }
        },
        outputItems: [[{ id: "immersiveengineering:alloybrick" }, 2]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "IDI",
            "DMD",
            "IDI"
        ],
        key: {
            I: { item: "modern_industrialization:uranium_ingot" },
            M: { item: "modern_industrialization:uranium_block" },
            D: { item: "minecraft:magma_block" }
        },
        outputItems: [[{ id: "immersiveengineering:storage_uranium" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WQW",
            "IRI",
            "WQW"
        ],
        key: {
            Q: { item: "immersiveengineering:wirecoil_electrum" },
            I: { item: "immersiveengineering:wirecoil_steel" },
            W: { item: "modern_industrialization:steel_large_plate" },
            R: { item: "immersiveengineering:component_electronic_adv" },
        },
        outputItems: [[{ id: "immersiveengineering:electromagnet" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WQW",
            "QRQ",
            "WQW"
        ],
        key: {
            Q: { item: "immersiveengineering:wirecoil_electrum" },
            W: { item: "modern_industrialization:steel_large_plate" },
            R: { item: "immersiveengineering:component_iron" },
        },
        outputItems: [[{ id: "immersiveengineering:generator" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WQW",
            "QQQ",
            "WQW"
        ],
        key: {
            Q: { tag: "immersiveengineering:treated_wood" },
            W: { item: "modern_industrialization:iron_large_plate" }
        },
        outputItems: [[{ id: "immersiveengineering:basic_engineering" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WQW",
            "IRI",
            "WQW"
        ],
        key: {
            Q: { item: "modern_industrialization:steel_rod" },
            I: { item: "modern_industrialization:iron_rod" },
            W: { item: "modern_industrialization:steel_large_plate" },
            R: { item: "immersiveengineering:component_steel" },
        },
        outputItems: [[{ id: "immersiveengineering:heavy_engineering" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WQW",
            "IRI",
            "WQW"
        ],
        key: {
            Q: { item: "modern_industrialization:copper_rod" },
            I: { item: "modern_industrialization:steel_rod" },
            W: { item: "modern_industrialization:iron_large_plate" },
            R: { item: "immersiveengineering:component_iron" },
        },
        outputItems: [[{ id: "immersiveengineering:light_engineering" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "DDD",
            "PPP"
        ],
        key: {
            D: { item: "minecraft:blue_dye" },
            P: { item: "minecraft:paper" }
        },
        outputItems: [[{ id: "milf:blank_blueprint" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WWW",
            "WBW",
            "WWW"
        ],
        key: {
            W: { item: "modern_industrialization:copper_wire" },
            B: { item: "ytech:beeswax" }
        },
        outputItems: [[{ id: "immersiveengineering:wirecoil_copper" }, 8]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WWW",
            "WBW",
            "WWW"
        ],
        key: {
            W: { item: "modern_industrialization:electrum_wire" },
            B: { item: "ytech:beeswax" }
        },
        outputItems: [[{ id: "immersiveengineering:wirecoil_electrum" }, 8]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "WSW",
            "SBS",
            "WSW"
        ],
        key: {
            W: { item: "modern_industrialization:aluminum_wire" },
            S: { item: "modern_industrialization:steel_wire" },
            B: { item: "ytech:beeswax" }
        },
        outputItems: [[{ id: "immersiveengineering:wirecoil_steel" }, 4]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "BBB",
            "BGB",
            "BBB"
        ],
        key: {
            G: { item: "modern_industrialization:steel_gear" },
            B: { item: "modern_industrialization:iron_bolt" },
        },
        outputItems: [[{ id: "immersiveengineering:sawblade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'ASA',
            'SsS',
            'ASA'
        ],
        key: {
            A: { tag: "c:plates/aluminum" },
            S: { tag: "c:plates/iron" },
            s: { item: "immersiveengineering:sheetmetal_aluminum" }
        },
        outputItems: [[{ id: "milf:radio_tower_block" }, 6]],
    })

    milfShaped(event, {
        pattern: [
            'BBB'
        ],
        key: {
            B: { item: "milf:radio_tower_block" },
        },
        outputItems: [[{ id: "milf:radio_tower_slab" }, 6]],
    })

    milfShaped(event, {
        pattern: [
            "S S",
            "MAL",
            "ESC"
        ],
        key: {
            A: { tag: "milf:accumulators" },
            C: { item: "immersiveengineering:wirecoil_copper_ins" },
            E: { item: "immersiveengineering:wirecoil_electrum_ins" },
            S: { item: "ytech:leather_strips" },
            M: { item: "immersiveengineering:connector_mv" },
            L: { item: "immersiveengineering:connector_lv" }
        },
        outputItems: [[{ id: "immersiveengineering:powerpack" }, 1]],
        removeRecipe: true,
        compatOff: true
    })

    milfShaped(event, {
        pattern: [
            "NIN",
            "PCP",
            "NIN"
        ],
        key: {
            I: { item: "modern_industrialization:iron_double_ingot" },
            C: { item: "immersiveengineering:coil_mv" },
            P: { item: "modern_industrialization:steel_plate" },
            N: { item: "modern_industrialization:electrum_plate" }
        },
        outputItems: [[{ id: "immersiveengineering:dynamo" }, 1]],
        removeRecipe: true,
        compatOff: true
    })

    milfShaped(event, {
        pattern: [
            "ANA",
            "NCN",
            "PPP"
        ],
        key: {
            C: { item: "immersiveengineering:coil_lv" },
            P: { item: "modern_industrialization:steel_double_ingot" },
            N: { item: "modern_industrialization:constantan_plate" },
            A: { item: "modern_industrialization:copper_curved_plate" }
        },
        outputItems: [[{ id: "immersiveengineering:thermoelectric_generator" }, 1]],
        removeRecipe: true,
        compatOff: true
    })

    milfShaped(event, {
        pattern: [
            "GLG",
            "G G",
            "BSB"
        ],
        key: {
            S: { item: "immersiveengineering:light_engineering" },
            B: { item: "immersiveengineering:basic_engineering" },
            G: { item: "milf:steel_infused_glass" },
            L: { item: "immersiveengineering:light_bulb" }
        },
        outputItems: [[{ id: "immersiveengineering:cloche" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " S ",
            " C "
        ],
        key: {
            S: { item: "modern_industrialization:steel_rod" },
            C: { item: "immersiveengineering:concrete_bucket" },
        },
        replace: {
            C: { item: "minecraft:bucket" },
        },
        outputItems: [[{ id: "milf:concrete_popsicle" }, 1]],
        removeRecipe: true,
        compatOff: true
    })

    milfShaped(event, {
        pattern: [
            "RDR",
            "RDR"
        ],
        key: {
            D: { item: "modern_industrialization:steel_double_ingot" },
            R: { item: "modern_industrialization:steel_rod" },
        },
        outputItems: [[{ id: "xkdeco:hollow_steel_beam" }, 3]],
        removeRecipe: true,
    })

    const sheetmetalMaterials = ["copper", "aluminum", "lead", "silver", "nickel", "uranium", "constantan", "electrum", "steel", "iron", "gold"]
    sheetmetalMaterials.forEach(material => {
        milfShaped(event, {
            pattern: [
                "BPB",
                "P P",
                "BPB"
            ],
            key: {
                B: { item: `modern_industrialization:${material}_bolt` },
                P: { item: `modern_industrialization:${material}_plate` },
            },
            outputItems: [[{ id: `immersiveengineering:sheetmetal_${material}` }, 6]],
            removeRecipe: true,
        })

        milfShaped(event, {
            pattern: [
                "S",
                "S"
            ],
            key: {
                S: { item: `immersiveengineering:slab_sheetmetal_${material}` }
            },
            outputItems: [[{ id: `immersiveengineering:sheetmetal_${material}` }, 1]],
        })
    })

    milfShaped(event, {
        pattern: [
            "RWR",
            "WQW",
            "RWR"
        ],
        key: {
            W: { item: "immersiveengineering:wirecoil_redstone" },
            R: { item: "modern_industrialization:rubber_sheet" },
            Q: { item: "immersiveengineering:rs_engineering" }
        },
        outputItems: [[{ id: "modern_industrialization:ie_energy_input_hatch" }, 1]],
    })

    milfShaped(event, {
        pattern: [
            " C ",
            "CPP",
            " PP"
        ],
        key: {
            P: { item: "modern_industrialization:aluminum_plate" },
            C: { item: "modern_industrialization:aluminum_curved_plate" }
        },
        outputItems: [[{ id: "immersiveengineering:jerrycan" }, 1]],
        removeRecipe: true,
    })

    //#endregion

    //#region MI machines

    miMachineRecipe(event, {
        energy: 4, time: 600, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ "item": "immersiveengineering:slag_gravel" }, 2],
            [{ "tag": "c:sands" }, 2],
            [{ "item": "milf:cement" }, 4]
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 1000]
        ],
        outputFluids: [
            [{ fluid: "immersiveengineering:concrete" }, 1000]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 4, time: 600, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ "item": "minecraft:gravel" }, 5],
            [{ "tag": "c:sands" }, 3],
            [{ "item": "milf:cement" }, 4]
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 1000]
        ],
        outputFluids: [
            [{ fluid: "immersiveengineering:concrete" }, 1000]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ "item": "modern_industrialization:sulfur_dust" }, 2]
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 250],
            [{ fluid: "modern_industrialization:molten_redstone" }, 250]
        ],
        outputFluids: [
            [{ fluid: "immersiveengineering:redstone_acid" }, 500]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:mi_furnace",
        inputItems: [
            [{ "item": "immersiveengineering:slag_glass" }, 1]
        ],
        outputItems: [
            [{ "item": "immersiveengineering:insulating_glass" }, 1]
        ]
    })

    //#endregion

})

//=￣ω￣=
milfElectromagnetRecipe("modern_industrialization:steel_rod", "modern_industrialization:steel_rod_magnetic", 19202)
milfElectromagnetRecipe("modern_industrialization:cupronickel_wire", "modern_industrialization:cupronickel_wire_magnetic", 26907)



KubeJSTweaks.beforeRecipes(event => {

    const disableByRecipeID = [
        /immersiveengineering:crafting\/.*hammercrushing.*/,
        /immersiveengineering:crusher\/.*aluminum/,
        /immersiveengineering:blastfurnace.*/,
        
        "immersiveengineering:alloysmelter/insulating_glass",
        "immersiveengineering:alloysmelter/bronze",
        "immersiveengineering:alloysmelter/electrum",
        "immersiveengineering:alloysmelter/constantan",
        "immersiveengineering:alloysmelter/invar",

        "immersiveengineering:arcfurnace/raw_block_aluminum",
        "immersiveengineering:arcfurnace/raw_ore_aluminum",
        "immersiveengineering:arcfurnace/ore_silver",
        "immersiveengineering:arcfurnace/dust_tungsten",
        "immersiveengineering:arcfurnace/ore_tungsten",
        "immersiveengineering:arcfurnace/raw_block_tungsten",
        "immersiveengineering:arcfurnace/raw_ore_tungsten",
        "immersiveengineering:arcfurnace/dust_aluminum",
        "immersiveengineering:arcfurnace/dust_platinum",
        "immersiveengineering:arcfurnace/ore_platinum",
        "immersiveengineering:arcfurnace/raw_block_platinum",
        "immersiveengineering:arcfurnace/raw_ore_platinum",
        "immersiveengineering:arcfurnace/dust_uranium",
        "immersiveengineering:arcfurnace/ore_uranium",
        "immersiveengineering:arcfurnace/raw_block_uranium",
        "immersiveengineering:arcfurnace/raw_ore_uranium",
        "immersiveengineering:arcfurnace/steel",

        "immersiveengineering:crusher/ore_quartz",
        "immersiveengineering:crusher/ore_lapis",
        "immersiveengineering:crusher/red_sandstone",

        "immersiveengineering:cokeoven/charcoal",
        "immersiveengineering:cokeoven/coke_block",
        "immersiveengineering:cokeoven/coke",
        
        "immersiveengineering:smelting/copper_ingot_from_dust",
        "immersiveengineering:smelting/copper_ingot_from_dust_from_blasting",
        "immersiveengineering:smelting/iron_ingot_from_dust",
        "immersiveengineering:smelting/iron_ingot_from_dust_from_blasting",
        "immersiveengineering:smelting/gold_ingot_from_dust",
        "immersiveengineering:smelting/gold_ingot_from_dust_from_blasting",

        "immersiveengineering:crafting/nugget_netherite_to_netherite_ingot",
        "immersiveengineering:crafting/ingot_steel_to_storage_steel",
        "immersiveengineering:crafting/empty_shell",
        "immersiveengineering:crafting/redstone_acid",
        "immersiveengineering:crafting/concrete",


        "immersiveengineering:mixer/redstone_acid",
        "immersiveengineering:mixer/concrete",


    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })


})