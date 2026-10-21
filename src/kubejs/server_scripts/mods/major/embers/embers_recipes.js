
function embersMeltingRecipe(event, args) {
    let recipe = {
        type: "embers:melting",
        input: Object.assign({}, args.inputItems[0][0], { count: args.inputItems[0][1] || 1 }),
        output: Object.assign({}, args.outputFluids[0][0], { amount: args.outputFluids[0][1] || 1000 }),
    }
    if (args.outputFluids[1]){
        recipe.bonus = Object.assign({}, args.outputFluids[1][0], { amount: args.outputFluids[1][1] || 1000 })
    }
    if (!args.compatOff) {

    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    event.custom(recipe)
}

function embersStampingRecipe(event, args) {
    let recipe = {
        type: "embers:stamping",
        output: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
        stamp: Object.assign({}, args.inputItems[0][0], { count: args.inputItems[0][1] || 1 }),

    }
    if (args.inputFluids){
        recipe.fluid = Object.assign({}, args.inputFluids[0][0], { amount: args.inputFluids[0][1] || 1000 })
    }
    if (args.inputItems[1]){
        recipe.input = Object.assign({}, args.inputItems[1][0], { count: args.inputItems[1][1] || 1 })
    }
    if (!args.compatOff) {

    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    event.custom(recipe)
}


ServerEvents.recipes(event => {

    event.remove({type:"embers:melting"})
    event.remove({ type: "embers:stamping" })

    entriesForEach({
        "modern_industrialization:copper_dust": {
            fluid: "embers:molten_copper",
            bonus: "embers:molten_gold"
        },
        "modern_industrialization:gold_dust": {
            fluid: "embers:molten_gold",
            bonus: "embers:molten_copper",
        },
        "modern_industrialization:iron_dust": {
            fluid: "embers:molten_iron",
            bonus: "modern_industrialization:molten_redstone"
        },
        "modern_industrialization:lead_dust": {
            fluid: "embers:molten_lead",
            bonus: "embers:molten_silver"
        },
        "modern_industrialization:tin_dust": {
            fluid: "embers:molten_tin",
            bonus: "embers:molten_copper",
        },
        "modern_industrialization:nickel_dust": {
            fluid: "embers:molten_nickel",
            bonus: "embers:molten_iron"
        },
        "minecraft:redstone": {
            fluid: "modern_industrialization:molten_redstone",
            bonus: "embers:molten_copper",
        }

    },([dust, data]) => {

        let {fluid, bonus} = data

        let outputFluids = [
            [{ fluid: fluid }, 60]
        ]

        bonus && outputFluids.push([{ fluid: bonus }, 20])

        embersMeltingRecipe(event, {
            inputItems: [
                [{ item: dust }, 1],
            ],
            outputFluids: outputFluids
        })
    })

    entriesForEach({
        "embers:molten_iron" : {
            ingot: "minecraft:iron_ingot",
            rod: "modern_industrialization:iron_rod",
            nugget: "minecraft:iron_nugget",
            plate: "modern_industrialization:iron_plate",
            bolt: "modern_industrialization:iron_bolt",
            gear: "modern_industrialization:iron_gear",
            aspectus: "embers:iron_aspectus"
        },
        "embers:molten_bronze": {
            ingot: "modern_industrialization:bronze_ingot",
            rod: "modern_industrialization:bronze_rod",
            nugget: "modern_industrialization:bronze_nugget",
            plate: "modern_industrialization:bronze_plate",
            bolt: "modern_industrialization:bronze_bolt",
            gear: "modern_industrialization:bronze_gear"
        },
        "embers:molten_silver": {
            ingot: "modern_industrialization:silver_ingot",
            rod: "modern_industrialization:silver_rod",
            nugget: "modern_industrialization:silver_nugget",
            plate: "modern_industrialization:silver_plate",
            bolt: "modern_industrialization:silver_bolt",
            aspectus: "embers:silver_aspectus"
        },
        "embers:molten_invar": {
            ingot: "modern_industrialization:invar_ingot",
            rod: "modern_industrialization:invar_rod",
            nugget: "modern_industrialization:invar_nugget",
            plate: "modern_industrialization:invar_plate",
            bolt: "modern_industrialization:invar_bolt",
            gear: "modern_industrialization:invar_gear"
        },
        "embers:molten_nickel": {
            ingot: "modern_industrialization:nickel_ingot",
            rod: "modern_industrialization:nickel_rod",
            nugget: "modern_industrialization:nickel_nugget",
            plate: "modern_industrialization:nickel_plate",
            bolt: "modern_industrialization:nickel_bolt"
        },
        "embers:molten_lead": {
            ingot: "modern_industrialization:lead_ingot",
            rod: "modern_industrialization:lead_rod",
            nugget: "modern_industrialization:lead_nugget",
            plate: "modern_industrialization:lead_plate",
            bolt: "modern_industrialization:lead_bolt",
            aspectus: "embers:lead_aspectus"
        },
        "embers:molten_tin": {
            ingot: "modern_industrialization:tin_ingot",
            rod: "modern_industrialization:tin_rod",
            nugget: "modern_industrialization:tin_nugget",
            plate: "modern_industrialization:tin_plate",
            bolt: "modern_industrialization:tin_bolt",
            gear: "modern_industrialization:tin_gear"
        },
        "embers:molten_gold": {
            ingot: "minecraft:gold_ingot",
            rod: "modern_industrialization:gold_rod",
            nugget: "minecraft:gold_nugget",
            plate: "modern_industrialization:gold_plate",
            bolt: "modern_industrialization:gold_bolt",
            gear: "modern_industrialization:gold_gear"
        },
        "embers:molten_copper": {
            ingot: "minecraft:copper_ingot",
            rod: "modern_industrialization:copper_rod",
            nugget: "minecraft:copper_nugget",
            plate: "modern_industrialization:copper_plate",
            bolt: "modern_industrialization:copper_bolt",
            gear: "modern_industrialization:copper_gear",
            aspectus: "embers:copper_aspectus"
        },
        "embers:molten_dawnstone": {
            ingot: "embers:dawnstone_ingot",
            nugget: "embers:dawnstone_nugget",
            plate: "embers:dawnstone_plate",
            aspectus: "embers:dawnstone_aspectus"
        },

    }, ([fluid, data]) => {

        let { ingot, rod, nugget, plate, bolt, gear, aspectus } = data

        ingot && embersStampingRecipe(event, {
            inputItems: [
                [{ item: "embers:ingot_stamp" }],
            ],
            inputFluids: [
                [{ fluid: fluid }, 80]
            ],
            outputItems: [
                [{ id: ingot }],
            ]
        })

        rod && embersStampingRecipe(event, {
            inputItems: [
                [{ item: "milf:rod_stamp" }],
            ],
            inputFluids: [
                [{ fluid: fluid }, 70]
            ],
            outputItems: [
                [{ id: rod }],
            ]
        })

        nugget && embersStampingRecipe(event, {
            inputItems: [
                [{ item: "embers:nugget_stamp" }],
            ],
            inputFluids: [
                [{ fluid: fluid }, 10]
            ],
            outputItems: [
                [{ id: nugget }],
            ]
        })

        bolt && embersStampingRecipe(event, {
            inputItems: [
                [{ item: "milf:bolt_stamp" }],
            ],
            inputFluids: [
                [{ fluid: fluid }, 40]
            ],
            outputItems: [
                [{ id: bolt }],
            ]
        })

        plate && embersStampingRecipe(event, {
            inputItems: [
                [{ item: "embers:plate_stamp" }],
            ],
            inputFluids: [
                [{ fluid: fluid }, 80]
            ],
            outputItems: [
                [{ id: plate }],
            ]
        })

        gear && embersStampingRecipe(event, {
            inputItems: [
                [{ item: "embers:gear_stamp" }],
            ],
            inputFluids: [
                [{ fluid: fluid }, 1000]
            ],
            outputItems: [
                [{ id: gear }],
            ]
        })

        aspectus && embersStampingRecipe(event, {
            inputItems: [
                [{ item: "embers:nugget_stamp" }],
                [{ item: "embers:ember_crystal" }],
            ],
            inputFluids: [
                [{ fluid: fluid }, 200]
            ],
            outputItems: [
                [{ id: aspectus }],
            ]
        })


    })

    embersStampingRecipe(event, {
        inputItems: [
            [{ item: "embers:flat_stamp" }],
            [{ item: "embers:ember_crystal" }],
        ],
        outputItems: [
            [{ id: "embers:ember_grit" }],
        ]
    })

    milfChiselHitRecipe(event, {
        inputItems: [
            [{ item: "milf:everburning_roots_veins" }],
        ],
        outputItems: [
            [{ id: "embers:ember_shard" }],
        ],
        removeRecipe: true
    })

    milfAnvilRecipe(event, {
        inputItems: [
            [{ item: "embers:ember_shard" }, 4],
        ],
        outputItems: [
            [{ id: "embers:ember_crystal" }],
        ],
        maxHit: 0.52,
        tier: "bronze",
        removeRecipe:true
    })


    milfStoneBasinRecipe(event, {
        inputItems: [
            [{ item: "minecraft:clay_ball" }],
            [{ item: "minecraft:clay_ball" }],
            [{ item: "milf:fire_clay_ball" }],
            [{ item: "modern_industrialization:coal_crushed_dust" }]
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 500]
        ],
        outputItems: [
            [{ id: "embers:caminite_blend" }, 6],
        ],
        requires_bellows: true,
        stirs: 4,
        removeRecipe:true
    })

    milfBloomeryRecipe(event, {
        inputItems: [
            [{ item: "milf:unfired_caminite_brick" }, 8],
            [{ item: "milf:unfired_caminite_brick" }, 8],
        ],

        outputItems: [
            [{ id: "embers:caminite_brick" }, 16],
        ],

        coal_count: 2,
        time: 150,
        removeRecipe: true
    })

    milfBloomeryRecipe(event, {
        inputItems: [
            [{ item: "embers:raw_caminite_plate" }, 1],
            [{ item: "embers:raw_caminite_plate" }, 1],
        ],

        outputItems: [
            [{ id: "embers:caminite_plate" }, 2],
        ],

        coal_count: 1,
        time: 150,
        removeRecipe: true
    })

    milfBloomeryRecipe(event, {
        inputItems: [
            [{ item: "milf:unfired_caminite_brick" }, 4],
            [{ item: "milf:everburning_roots" }, 4],
        ],

        outputItems: [
            [{ id: "embers:archaic_brick" }, 8],
        ],

        coal_count: 1,

        time: 150
    })

    Object.entries({
        "milf:rod_stamp_raw": "milf:rod_stamp",
        "milf:bolt_stamp_raw": "milf:bolt_stamp",
        "embers:raw_flat_stamp": "embers:flat_stamp",
        "embers:raw_ingot_stamp": "embers:ingot_stamp",
        "embers:raw_nugget_stamp": "embers:nugget_stamp",
        "embers:raw_plate_stamp": "embers:plate_stamp",
        "embers:raw_gear_stamp": "embers:gear_stamp"
    }).forEach(([rawStamp, stamp]) => {
        milfBloomeryRecipe(event, {
            inputItems: [
                [{ item: "embers:caminite_blend" }, 2],
                [{ item: rawStamp }, 1],
            ],

            outputItems: [
                [{ id: stamp }, 1],
            ],

            coal_count: 2,
            time: 200,
            removeRecipe: true
        })
    })

    milfShaped(event, {
        pattern: [
            "BB ",
            "B B",
            " BB",
        ],
        key: {
            "B": { "item": "embers:caminite_blend" }

        },
        outputItems: [[{ id: "milf:rod_stamp_raw" }, 1]]
    })

    milfShaped(event, {
        pattern: [
            "B B",
            "BB ",
            " BB",
        ],
        key: {
            "B": { "item": "embers:caminite_blend" }

        },
        outputItems: [[{ id: "milf:bolt_stamp_raw" }, 1]]
    })

    milfShaped(event, {
        pattern: [
            "SBS",
            "BHB",
            "SBS",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "S": { "item": "embers:ember_shard" },
            "H": { "item": "milf:everburning_roots_heart" }

        },
        outputItems: [[{ id: "embers:ancient_motive_core" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "   ",
            " R ",
            "PBP",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "R": { "item": "milf:stone_rod" },
            "P": { "item": "embers:caminite_plate" }

        },
        outputItems: [[{ id: "embers:caminite_lever" }, 3]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " R ",
            "BPB",
            " R ",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "R": { "item": "modern_industrialization:lead_rod" },
            "P": { "item": "modern_industrialization:lead_plate" }

        },
        outputItems: [[{ id: "embers:item_pipe" }, 10]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " I ",
            "BRB",
            " I ",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "R": { "item": "modern_industrialization:lead_rod" },
            "I": { "item": "modern_industrialization:lead_ingot" }

        },
        outputItems: [[{ id: "embers:fluid_pipe" }, 10]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "RBR",
            "PpP",
            "RBR",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "R": { "item": "minecraft:redstone" },
            "P": { "item": "embers:item_pipe" },
            "p": { "item": "embers:caminite_plate" }

        },
        outputItems: [[{ id: "embers:item_extractor" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "RBR",
            "PpP",
            "RBR",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "R": { "item": "minecraft:redstone" },
            "P": { "item": "embers:fluid_pipe" },
            "p": { "item": "embers:caminite_plate" }

        },
        outputItems: [[{ id: "embers:fluid_extractor" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "LBL",
            "LSL",
            " S ",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "S": { "item": "minecraft:stick" },
            "L": { "item": "modern_industrialization:lead_plate" }

        },
        outputItems: [[{ id: "embers:tinker_hammer" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "R R",
            "RCR",
            "BBB",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "C": { "item": "embers:ember_crystal" },
            "R": { "item": "modern_industrialization:lead_rod" }

        },
        outputItems: [[{ id: "embers:ember_receiver" }, 3]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "P P",
            "BCB",
            "PBP",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "C": { "item": "embers:ember_crystal" },
            "P": { "item": "modern_industrialization:lead_plate" }

        },
        outputItems: [[{ id: "embers:ember_emitter" }, 3]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " R ",
            "RCR",
            " B ",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "C": { "item": "embers:ember_shard" },
            "R": { "item": "modern_industrialization:copper_plate" }

        },
        outputItems: [[{ id: "embers:ember_relay" }, 3]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "RRR",
            "RRR",
            "BCB",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "C": { "item": "embers:ancient_motive_core" },
            "R": { "item": "modern_industrialization:copper_rod" }

        },
        outputItems: [[{ id: "embers:ember_activator" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "PRP",
            "RCR",
            "BRB",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "C": { "item": "embers:ancient_motive_core" },
            "R": { "item": "modern_industrialization:copper_rod" },
            "P": { "item": "modern_industrialization:copper_plate" }

        },
        outputItems: [[{ id: "embers:heat_exchanger" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "bBb",
            "BCB",
            "bBb",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "C": { "item": "minecraft:copper_ingot" },
            "b": { "item": "embers:caminite_bricks" }

        },
        outputItems: [[{ id: "embers:copper_cell" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "bBb",
            "bBb",
            "BCB",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "C": { "item": "embers:ancient_motive_core" },
            "b": { "item": "embers:caminite_bricks" }

        },
        outputItems: [[{ id: "embers:melter" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "bBb",
            "BDB",
            "b b",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "D": { "item": "modern_industrialization:iron_double_ingot" },
            "b": { "item": "embers:caminite_bricks" }

        },
        outputItems: [[{ id: "embers:stamper" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "B B",
            "bpb",
            "bbb",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "p": { "item": "modern_industrialization:lead_plate" },
            "b": { "item": "embers:caminite_bricks" }

        },
        outputItems: [[{ id: "embers:stamp_base" }, 1]],
        removeRecipe: true
    })


})
