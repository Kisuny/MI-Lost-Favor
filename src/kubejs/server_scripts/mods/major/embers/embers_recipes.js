
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


function embersMixingRecipe(event, args) {

    let inputs = []

    args.inputFluids.forEach(entry => inputs.push(Object.assign({}, entry[0], { amount: entry[1] || 1 })))

    let recipe = {
        type: "embers:mixing",
        inputs: inputs,
        output: Object.assign({}, args.outputFluids[0][0], { amount: args.outputFluids[0][1] || 7 + 1 }),
    }

    if (!args.compatOff) {

    }
   
    event.custom(recipe)
}

function embersBoilingRecipe(event, args) {

    let recipe = {
        type: "embers:boiling",
        input: Object.assign({}, args.inputFluids[0][0], { amount: args.inputFluids[0][1] ||  1 }),
        output: Object.assign({}, args.outputFluids[0][0], { amount: args.outputFluids[0][1] ||  1 }),
    }

    if (!args.compatOff) {

    }

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
    event.remove({ type: "embers:boiling" })

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
            nugget: "modern_industrialization:copper_nugget",
            plate: "modern_industrialization:copper_plate",
            bolt: "modern_industrialization:copper_bolt",
            gear: "modern_industrialization:copper_gear",
            aspectus: "embers:copper_aspectus"
        },
        "embers:molten_dawnstone": {
            ingot: "embers:dawnstone_ingot",
            nugget: "modern_industrialization:dawnstone_nugget",
            plate: "modern_industrialization:dawnstone_plate",
            gear: "modern_industrialization:dawnstone_gear",
            rod: "modern_industrialization:dawnstone_rod",
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
            [{ id: "milf:everburning_roots" }],
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
        "embers:raw_plate_stamp": "embers:plate_stamp"
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

    milfBloomeryRecipe(event, {
        inputItems: [
            [{ item: "architects_palette:cerebral_plate" }, 4],
            [{ item: "embers:raw_gear_stamp" }, 1],
        ],

        outputItems: [
            [{ id: "embers:gear_stamp" }, 1],
        ],

        coal_count: 4,
        time: 500,
        requires_bellows: true,
        removeRecipe: true
    })

    milfClayCrucibleKilnRecipe(event, {
        inputItems: [
            [{ tag: "c:foods/raw_fish" }, 3],
            [{ item: "architects_palette:cerebral_plate" }, 1]
        ],
        outputFluids: [
            [{ id: "embers:dwarven_oil" }, 200]
        ],
        requires_bellows: true,
        time: 400
    })

    milfClayCrucibleKilnRecipe(event, {
        inputItems: [
            [{ tag: "minecraft:logs_that_burn" }, 4],
            [{ item: "minecraft:soul_sand" }, 2]
        ],
        outputFluids: [
            [{ id: "embers:soul_crude" }, 50]
        ],
        requires_bellows: true,
        time: 400
    })

    embersMixingRecipe(event, {
        inputFluids: [
            [{ fluid: "embers:soul_crude" }, 1],
            [{ fluid: "embers:dwarven_oil" }, 4]
        ],
        outputFluids: [
            [{ fluid: "immersiveengineering:creosote" }, 5]
        ]
    })

    embersBoilingRecipe(event, {
        inputFluids: [
            [{ fluid: "minecraft:water" }, 1]
        ],
        outputFluids: [
            [{ fluid: "modern_industrialization:steam" }, 1]
        ]
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

    milfShaped(event, {
        pattern: [
            "P P",
            "PHP",
            " p ",
        ],
        key: {
            "H": { "item": "xkdeco:factory_vent_fan" },
            "p": { "item": "embers:item_pipe" },
            "P": { "item": "modern_industrialization:lead_plate" }

        },
        outputItems: [[{ id: "embers:item_vacuum" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "   ",
            "DHD",
            "BWB",
        ],
        key: {
            "H": { "item": "embers:ember_receiver" },
            "B": { "item": "embers:archaic_brick" },
            "D": { "item": "modern_industrialization:carbon_dust" },
            "W": { "item": "immersiveengineering:wirecoil_electrum" }

        },
        outputItems: [[{ id: "embers:ember_energy_converter" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "SSS",
            "F F",
            "DRD",
        ],
        key: {
            "F": { "item": "embers:ashen_fabric" },
            "S": { "item": "ytech:leather_strips" },
            "D": { "item": "modern_industrialization:dawnstone_plate" },
            "R": { "item": "modern_industrialization:steel_ring" }

        },
        outputItems: [[{ id: "embers:ashen_goggles" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "RDR",
            "FSF",
            "FDF",
        ],
        key: {
            "F": { "item": "embers:ashen_fabric" },
            "S": { "item": "immersiveengineering:armor_steel_chestplate" },
            "D": { "item": "embers:dawnstone_ingot" },
            "R": { "item": "modern_industrialization:steel_ring" }

        },
        outputItems: [[{ id: "embers:ashen_cloak" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "FFF",
            "DSD",
            "D D",
        ],
        key: {
            "F": { "item": "embers:ashen_fabric" },
            "S": { "item": "immersiveengineering:armor_steel_leggings" },
            "D": { "item": "modern_industrialization:dawnstone_plate" },

        },
        outputItems: [[{ id: "embers:ashen_leggings" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "R R",
            "FSF",
            "F F",
        ],
        key: {
            "F": { "item": "embers:ashen_fabric" },
            "S": { "item": "immersiveengineering:armor_steel_boots" },
            "R": { "item": "modern_industrialization:steel_ring" }

        },
        outputItems: [[{ id: "embers:ashen_boots" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " P ",
            "pdp",
            "   ",
        ],
        key: {
            "P": { "item": "embers:item_pipe" },
            "p": { "item": "modern_industrialization:lead_plate" },
            "d": { "item": "modern_industrialization:lapis_dust" }

        },
        outputItems: [[{ id: "embers:item_dropper" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "IPI",
            "IPI",
            "RdR",
        ],
        key: {
            "P": { "item": "embers:item_pipe" },
            "I": { "item": "modern_industrialization:lead_ingot" },
            "R": { "item": "modern_industrialization:lead_rod" },
            "d": { "item": "modern_industrialization:lapis_dust" }

        },
        outputItems: [[{ id: "embers:item_transfer" }, 2]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "IPI",
            "IPI",
            "RdR",
        ],
        key: {
            "P": { "item": "embers:fluid_pipe" },
            "I": { "item": "modern_industrialization:tin_ingot" },
            "R": { "item": "modern_industrialization:tin_rod" },
            "d": { "item": "modern_industrialization:lapis_dust" }

        },
        outputItems: [[{ id: "embers:fluid_transfer" }, 2]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " d ",
            "RPR",
            "BBB",
        ],
        key: {
            "P": { "item": "embers:ember_emitter" },
            "B": { "item": "embers:archaic_brick" },
            "R": { "item": "modern_industrialization:lead_rod" },
            "d": { "item": "modern_industrialization:gold_dust" }

        },
        outputItems: [[{ id: "embers:ember_ejector" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "d d",
            "pPp",
            " p ",
        ],
        key: {
            "P": { "item": "embers:ember_receiver" },
            "p": { "item": "modern_industrialization:gold_plate" },
            "d": { "item": "modern_industrialization:gold_dust" }

        },
        outputItems: [[{ id: "embers:ember_funnel" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "BpB",
            "pPp",
            "BdB",
        ],
        key: {
            "P": { "item": "embers:ember_relay" },
            "B": { "item": "embers:archaic_brick" },
            "p": { "item": "modern_industrialization:copper_plate" },
            "d": { "item": "modern_industrialization:gold_dust" }

        },
        outputItems: [[{ id: "embers:beam_splitter" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "p p",
            "rpr",
            "rrr",
        ],
        key: {
            "p": { "item": "modern_industrialization:dawnstone_plate" },
            "r": { "item": "modern_industrialization:dawnstone_ring" }

        },
        outputItems: [[{ id: "embers:dawnstone_mail" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "DDD",
            "FPF",
            "BbB",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "F": { "item": "embers:fluid_pipe" },
            "P": { "item": "modern_industrialization:gold_double_ingot" },
            "D": { "item": "modern_industrialization:iron_plate" },
            "b": { "item": "embers:caminite_bricks" }

        },
        outputItems: [[{ id: "embers:mixer_centrifuge" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "BDB",
            "RDR",
            "RPR",
        ],
        key: {
            "B": { "item": "embers:archaic_brick" },
            "R": { "item": "modern_industrialization:iron_rod" },
            "D": { "item": "embers:dawnstone_ingot" },
            "P": { "item": "modern_industrialization:copper_plate" }

        },
        outputItems: [[{ id: "embers:pressure_refinery" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "ppp",
            "PDP",
            "RER",
        ],
        key: {
            "R": { "item": "embers:caminite_bricks" },
            "E": { "item": "embers:fluid_extractor" },
            "P": { "item": "embers:fluid_pipe" },
            "D": { "item": "embers:dawnstone_ingot" },
            "p": { "item": "modern_industrialization:iron_plate" }

        },
        outputItems: [[{ id: "embers:mechanical_pump" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "ppp",
            "IBI",
            "RBR",
        ],
        key: {
            "R": { "item": "embers:caminite_bricks" },
            "B": { "item": "embers:archaic_brick" },
            "I": { "item": "embers:dawnstone_ingot" },
            "p": { "item": "modern_industrialization:dawnstone_plate" }

        },
        outputItems: [[{ id: "embers:alchemy_tablet" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "p p",
            "BpB",
            "RBR",
        ],
        key: {
            "R": { "item": "embers:caminite_bricks" },
            "B": { "item": "embers:archaic_brick" },
            "p": { "item": "modern_industrialization:dawnstone_plate" }

        },
        outputItems: [[{ id: "embers:alchemy_pedestal" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "rCr",
            "rCr",
            "RBR",
        ],
        key: {
            "R": { "item": "embers:dawnstone_ingot" },
            "B": { "item": "embers:archaic_brick" },
            "r": { "item": "modern_industrialization:copper_rod" },
            "C": { "item": "embers:ember_crystal" }

        },
        outputItems: [[{ id: "embers:beam_cannon" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "   ",
            "ppP",
            "RCR",
        ],
        key: {
            "R": { "item": "embers:caminite_bricks" },
            "P": { "item": "embers:fluid_extractor" },
            "p": { "item": "modern_industrialization:iron_plate" },
            "C": { "item": "embers:ember_crystal_cluster" },
        },
        outputItems: [[{ id: "embers:geologic_separator" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "RBR",
            "RBR",
            "BCB",
        ],
        key: {
            "R": { "item": "modern_industrialization:copper_rod" },
            "B": { "item": "embers:archaic_brick" },
            "C": { "item": "embers:geologic_separator" },
        },
        outputItems: [[{ id: "embers:combustion_chamber" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "RRR",
            "BbB",
            "bCb",
        ],
        key: {
            "b": { "item": "embers:archaic_brick" },
            "R": { "item": "modern_industrialization:silver_rod" },
            "B": { "item": "modern_industrialization:silver_ingot" },
            "C": { "item": "embers:geologic_separator" },
        },
        outputItems: [[{ id: "embers:combustion_chamber" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "RRR",
            "RCR",
            "B B",
        ],
        key: {
            "R": { "item": "modern_industrialization:copper_rod" },
            "B": { "item": "embers:archaic_brick" },
            "C": { "item": "embers:wildfire_core" },
        },
        outputItems: [[{ id: "embers:combustion_chamber" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "L L",
            "RCR",
            "BbB",
        ],
        key: {
            "L": { "item": "modern_industrialization:lead_plate" },
            "R": { "item": "modern_industrialization:silver_rod" },
            "B": { "item": "embers:archaic_brick" },
            "b": { "item": "embers:caminite_bricks" },
            "C": { "item": "embers:wildfire_core" },
        },
        outputItems: [[{ id: "embers:cinder_plinth" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "pFp",
            "FGF",
            "pFp",
        ],
        key: {
            "F": { "item": "embers:fluid_pipe" },
            "p": { "item": "modern_industrialization:iron_plate" },
            "G": { "item": "modern_industrialization:iron_gear" },
        },
        outputItems: [[{ id: "embers:mini_boiler" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "bFb",
            "IGI",
            "BFB",
        ],
        key: {
            "F": { "item": "embers:fluid_pipe" },
            "I": { "item": "embers:item_pipe" },
            "b": { "item": "embers:caminite_bricks" },
            "B": { "item": "embers:archaic_brick" },
            "G": { "tag": "c:gears" },
        },
        outputItems: [[{ id: "embers:mechanical_core" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "pBp",
            "SBS",
            "ICI",
        ],
        key: {
            "C": { "item": "embers:wildfire_core" },
            "B": { "item": "milf:bronze_machine_bit" },
            "S": { "item": "embers:ember_shard" },
            "p": { "item": "modern_industrialization:dawnstone_plate" },
            "I": { "item": "embers:dawnstone_ingot" }
        },
        outputItems: [[{ id: "embers:wildfire_stirling" }, 1]],
        removeRecipe: true
    })



    Object.entries({
        "silver": {
            plateId: "modern_industrialization:silver_plate"
        }
    }).forEach(([material, data]) => {
        let { plateId } = data

        yTechShaped(event, {
            pattern: [
                "d# ",
                "s  ",
                "s  ",
            ],
            key: {
                "#": { "tag": "c:hammers" },
                "s": { "item": "minecraft:stick" },
                "d": { "item": plateId },
            },
            outputItems: [[{ id: `embers:${material}_shovel` }, 1]],
            removeRecipeType: "minecraft:crafting_shaped"
        })

        yTechShaped(event, {
            pattern: [
                "ddd",
                " s#",
                " s ",
            ],
            key: {
                "#": { "tag": "c:hammers" },
                "s": { "item": "minecraft:stick" },
                "d": { "item": plateId },
            },
            outputItems: [[{ id: `embers:${material}_pickaxe` }, 1]],
            removeRecipeType: "minecraft:crafting_shaped"
        })

        yTechShaped(event, {
            pattern: [
                "dd#",
                " s ",
                " s ",
            ],
            key: {
                "#": { "tag": "c:hammers" },
                "s": { "item": "minecraft:stick" },
                "d": { "item": plateId },
            },
            outputItems: [[{ id: `embers:${material}_hoe` }, 1]],
            removeRecipeType: "minecraft:crafting_shaped"
        })

        yTechShaped(event, {
            pattern: [
                "d  ",
                "d  ",
                "s# ",
            ],
            key: {
                "#": { "tag": "c:hammers" },
                "s": { "item": "minecraft:stick" },
                "d": { "item": plateId },
            },
            outputItems: [[{ id: `embers:${material}_sword` }, 1]],
            removeRecipeType: "minecraft:crafting_shaped"
        })

        yTechShaped(event, {
            pattern: [
                "dd#",
                "ds ",
                " s ",
            ],
            key: {
                "#": { "tag": "c:hammers" },
                "s": { "item": "minecraft:stick" },
                "d": { "item": plateId },
            },
            outputItems: [[{ id: `embers:${material}_axe` }, 1]],
            removeRecipeType: "minecraft:crafting_shaped"
        })

    })


})

milfDisableRecipesById([
    "embers:copper_nugget_to_ingot"
])
