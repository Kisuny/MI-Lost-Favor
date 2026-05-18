function ieShapedFluid(event, args) {
    let recipe = {
        type: "immersiveengineering:shaped_fluid",
        category: "misc",
        key: args.key,
        pattern: args.pattern,
        result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
    }
    if (!args.compatOff) {
        let itemInputs = []
        let fluidInputs = []
        let amounts = args.pattern.join("")

        Object.entries(args.key).forEach(m => {
            let regex = new RegExp(m[0], 'g')
            if (m[1].type) {
                let tempObj = Object.assign({}, m[1])
                delete tempObj.type
                delete tempObj.amount
                fluidInputs.push([tempObj, m[1].amount])
            } else {
                itemInputs.push([m[1], (amounts.match(regex) || []).length])
            }
            //itemInputs.push((amounts.match(regex) || []).length + "x " + m[1])
        })
        miMachineCraft(event, {
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
            /immersiveengineering:storage_.*/,
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
            "WQW",
            "QRQ",
            "WQW"
        ],
        key: {
            Q: { item: "minecraft:redstone" },
            W: { item: "modern_industrialization:iron_large_plate" },
            R: { item: "modern_industrialization:analog_circuit" },
        },
        outputItems: [[{ id: "immersiveengineering:rs_engineering" }, 1]],
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
            "WRW",
            "RrR",
            "WRW"
        ],
        key: {
            W: { item: "immersiveengineering:wirecoil_steel" },
            R: { item: "minecraft:redstone" },
            r: { item: "modern_industrialization:rubber_sheet" }
        },
        outputItems: [[{ id: "immersiveengineering:wirecoil_redstone" }, 4]],
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
            A: { tag: "milf:accumulator" },
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
            I: { item: "immersiveengineering:component_iron" },
            C: { item: "immersiveengineering:coil_lv" },
            P: { item: "modern_industrialization:steel_large_plate" },
            N: { item: "modern_industrialization:electrum_nugget" }
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
            P: { item: "modern_industrialization:steel_ingot" },
            N: { item: "modern_industrialization:constantan_plate" },
            A: { item: "modern_industrialization:copper_nugget" }
        },
        outputItems: [[{ id: "immersiveengineering:thermoelectric_generator" }, 1]],
        removeRecipe: true,
        compatOff: true
    })

    milfShaped(event, {
        pattern: [
            "GLG",
            "GIG",
            "BSB"
        ],
        key: {
            I: { item: "immersiveengineering:component_iron" },
            S: { item: "immersiveengineering:component_steel" },
            B: { item: "immersiveengineering:basic_engineering" },
            G: { item: "milf:steel_infused_glass" },
            L: { item: "immersiveengineering:light_bulb" }
        },
        outputItems: [[{ id: "immersiveengineering:cloche" }, 1]],
        removeRecipe: true,
        compatOff: true
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
                B: { item: ["iron", "gold"].includes(material) ? `minecraft:${material}_nugget` : `modern_industrialization:${material}_nugget` },
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
            "WBW",
            "RWR"
        ],
        key: {
            W: { item: "immersiveengineering:wirecoil_redstone" },
            R: { item: "modern_industrialization:rubber_sheet" },
            B: { item: "immersiveengineering:rs_engineering" }
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

    milfShaped(event, {
        pattern: [
            " P ",
            "GLG",
            "WWW"
        ],
        key: {
            P: { item: "modern_industrialization:aluminum_plate" },
            G: { item: "milf:steel_infused_glass" },
            L: { item: "immersiveengineering:light_bulb" },
            W: { item: "modern_industrialization:copper_wire" }
        },
        outputItems: [[{ id: "immersiveengineering:electric_lantern" }, 3]],
        removeRecipe: true,
    })


    //TODO: добавить всё что дробится и плавиться из руды или похожее на руду
    const ore_for_arc_furnace = [
        "antimony",
        "iesnium",
    ]

    const ore_for_crusher = [
        "antimony",
        "monazite",
        "salt",
        "stratine",
        "ae2:certus_quartz_crystal",
    ]
})



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
        "immersiveengineering:crusher/ore_quartz",
        "immersiveengineering:crusher/ore_lapis",
        "immersiveengineering:crusher/red_sandstone",
        "immersiveengineering:mixer/concrete",
        "immersiveengineering:arcfurnace/steel",
        "immersiveengineering:cokeoven/charcoal",
        "immersiveengineering:cokeoven/coke_block",
        "immersiveengineering:cokeoven/coke",
        "immersiveengineering:crafting/empty_shell",
        "immersiveengineering:smelting/copper_ingot_from_dust",
        "immersiveengineering:smelting/copper_ingot_from_dust_from_blasting",
        "immersiveengineering:smelting/iron_ingot_from_dust",
        "immersiveengineering:smelting/iron_ingot_from_dust_from_blasting",
        "immersiveengineering:smelting/gold_ingot_from_dust",
        "immersiveengineering:smelting/gold_ingot_from_dust_from_blasting",
        "immersiveengineering:crafting/nugget_netherite_to_netherite_ingot"

    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })


})