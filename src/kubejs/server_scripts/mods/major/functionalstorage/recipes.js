ServerEvents.recipes(event => {

    Object.entries({
        "minecraft:spruce_planks" : {
            single: "functionalstorage:spruce_1",
            double: "functionalstorage:spruce_2",
            quad: "functionalstorage:spruce_4"
        },
        "minecraft:birch_planks": {
            single: "functionalstorage:birch_1",
            double: "functionalstorage:birch_2",
            quad: "functionalstorage:birch_4"
        },
        "minecraft:jungle_planks": {
            single: "functionalstorage:jungle_1",
            double: "functionalstorage:jungle_2",
            quad: "functionalstorage:jungle_4"
        },
        "minecraft:acacia_planks": {
            single: "functionalstorage:acacia_1",
            double: "functionalstorage:acacia_2",
            quad: "functionalstorage:acacia_4"
        },
        "minecraft:dark_oak_planks": {
            single: "functionalstorage:dark_oak_1",
            double: "functionalstorage:dark_oak_2",
            quad: "functionalstorage:dark_oak_4"
        },
        "minecraft:crimson_planks": {
            single: "functionalstorage:crimson_1",
            double: "functionalstorage:crimson_2",
            quad: "functionalstorage:crimson_4"
        },
        "minecraft:warped_planks": {
            single: "functionalstorage:warped_1",
            double: "functionalstorage:warped_2",
            quad: "functionalstorage:warped_4"
        },
        "minecraft:mangrove_planks": {
            single: "functionalstorage:mangrove_1",
            double: "functionalstorage:mangrove_2",
            quad: "functionalstorage:mangrove_4"
        },
        "minecraft:cherry_planks": {
            single: "functionalstorage:cherry_1",
            double: "functionalstorage:cherry_2",
            quad: "functionalstorage:cherry_4"
        },
        "modern_industrialization:iron_double_ingot": {
            single: "functionalstorage:framed_1",
            double: "functionalstorage:framed_2",
            quad: "functionalstorage:framed_4"
        }
    }).forEach(([material, data]) => {
        let {single, double, quad} = data

        milfShaped(event, {
            pattern: [
                "SWS",
                "WPW",
                "SBS"
            ],
            key: {
                W: { item: material },
                S: { item: "modern_industrialization:steel_rod" },
                P: { item: "sophisticatedstorage:upgrade_base" },
                B: { item: "modern_industrialization:bronze_barrel" },
            },
            outputItems: [[{ id: single }, 1]],
            removeRecipe: true,
        })

        milfShaped(event, {
            pattern: [
                "SPS",
                "WBW",
                "SPS"
            ],
            key: {
                W: { item: material },
                S: { item: "modern_industrialization:steel_rod" },
                P: { item: "sophisticatedstorage:upgrade_base" },
                B: { item: "modern_industrialization:bronze_barrel" },
            },
            outputItems: [[{ id: double }, 2]],
            removeRecipe: true,
        })

        milfShaped(event, {
            pattern: [
                "SPS",
                "PWP",
                "SBS"
            ],
            key: {
                W: { item: material },
                S: { item: "modern_industrialization:steel_rod" },
                P: { item: "sophisticatedstorage:upgrade_base" },
                B: { item: "modern_industrialization:bronze_barrel" },
            },
            outputItems: [[{ id: quad }, 3]],
            removeRecipe: true,
        })
    })

    milfShaped(event, {
        pattern: [
            "SWS",
            "WPW",
            "SBS"
        ],
        key: {
            W: { tag: "minecraft:planks" },
            S: { item: "modern_industrialization:steel_rod" },
            P: { item: "sophisticatedstorage:upgrade_base" },
            B: { item: "modern_industrialization:bronze_barrel" },
        },
        outputItems: [[{ id: "functionalstorage:oak_1" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "SPS",
            "WBW",
            "SPS"
        ],
        key: {
            W: { tag: "minecraft:planks" },
            S: { item: "modern_industrialization:steel_rod" },
            P: { item: "sophisticatedstorage:upgrade_base" },
            B: { item: "modern_industrialization:bronze_barrel" },
        },
        outputItems: [[{ id: "functionalstorage:oak_2" }, 2]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "SPS",
            "PWP",
            "SBS"
        ],
        key: {
            W: { tag: "minecraft:planks" },
            S: { item: "modern_industrialization:steel_rod" },
            P: { item: "sophisticatedstorage:upgrade_base" },
            B: { item: "modern_industrialization:bronze_barrel" },
        },
        outputItems: [[{ id: "functionalstorage:oak_4" }, 3]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "SUS",
            "PDP",
            "SPS"
        ],
        key: {
            D: { tag: "functionalstorage:drawer" },
            S: { item: "modern_industrialization:steel_rod" },
            P: { item: "modern_industrialization:iron_large_plate" },
            U: { item: "sophisticatedstorage:advanced_compacting_upgrade" }
        },
        outputItems: [[{ id: "functionalstorage:compacting_drawer" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "nnn",
            "nDn",
            "nnn"
        ],
        key: {
            n: { item: "modern_industrialization:tin_nugget" },
            D: { item: "functionalstorage:compacting_drawer" }
        },
        outputItems: [[{ id: "functionalstorage:compacting_framed_drawer" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "nnn",
            "nDn",
            "nnn"
        ],
        key: {
            n: { item: "modern_industrialization:tin_nugget" },
            D: { item: "functionalstorage:simple_compacting_drawer" }
        },
        outputItems: [[{ id: "functionalstorage:framed_simple_compacting_drawer" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "SUS",
            "PDP",
            "SPS"
        ],
        key: {
            D: { tag: "functionalstorage:drawer" },
            S: { item: "modern_industrialization:steel_rod" },
            P: { item: "modern_industrialization:iron_large_plate" },
            U: { item: "sophisticatedstorage:compacting_upgrade" }
        },
        outputItems: [[{ id: "functionalstorage:simple_compacting_drawer" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "   ",
            "STS",
            "   "
        ],
        key: {
            S: { item: "modern_industrialization:steel_rod" },
            T: { item: "modern_industrialization:trash_can" },
        },
        outputItems: [[{ id: "functionalstorage:void_upgrade" }, 4]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "SPS",
            "PTP",
            "SPS"
        ],
        key: {
            P: { item: "modern_industrialization:steel_large_plate" },
            S: { item: "modern_industrialization:steel_rod" },
            T: { item: "modern_industrialization:large_tank" },
        },
        outputItems: [[{ id: "functionalstorage:fluid_1" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "SPS",
            "BTB",
            "SPS"
        ],
        key: {
            B: { item: "modern_industrialization:bronze_tank" },
            P: { item: "modern_industrialization:steel_large_plate" },
            S: { item: "modern_industrialization:steel_rod" },
            T: { item: "modern_industrialization:large_tank" },
        },
        outputItems: [[{ id: "functionalstorage:fluid_2" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "SBS",
            "BTB",
            "SBS"
        ],
        key: {
            B: { item: "modern_industrialization:bronze_tank" },
            S: { item: "modern_industrialization:steel_rod" },
            T: { item: "modern_industrialization:large_tank" },
        },
        outputItems: [[{ id: "functionalstorage:fluid_4" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "nnn",
            "nDn",
            "nnn"
        ],
        key: {
            n: { item: "modern_industrialization:tin_nugget" },
            D: { item: "functionalstorage:fluid_1" }
        },
        outputItems: [[{ id: "functionalstorage:framed_fluid_1" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "nnn",
            "nDn",
            "nnn"
        ],
        key: {
            n: { item: "modern_industrialization:tin_nugget" },
            D: { item: "functionalstorage:fluid_2" }
        },
        outputItems: [[{ id: "functionalstorage:framed_fluid_2" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "nnn",
            "nDn",
            "nnn"
        ],
        key: {
            n: { item: "modern_industrialization:tin_nugget" },
            D: { item: "functionalstorage:fluid_4" }
        },
        outputItems: [[{ id: "functionalstorage:framed_fluid_4" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "PPP",
            "SRS",
            "HLH"
        ],
        key: {
            P: { item: "modern_industrialization:iron_large_plate" },
            S: { item: "immersiveengineering:component_steel" },
            R: { item: "immersiveengineering:rs_engineering" },
            L: { item: "immersiveengineering:light_engineering" },
            H: { item: "immersiveengineering:heavy_engineering" }
        },
        outputItems: [[{ id: "functionalstorage:storage_controller" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "PPP",
            "BRB",
            "BSB"
        ],
        key: {
            P: { item: "modern_industrialization:iron_large_plate" },
            S: { item: "immersiveengineering:component_steel" },
            R: { item: "immersiveengineering:component_electronic" },
            B: { item: "milf:steel_machine_bit" },
        },
        outputItems: [[{ id: "functionalstorage:controller_extension" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "nnn",
            "nDn",
            "nnn"
        ],
        key: {
            n: { item: "modern_industrialization:tin_nugget" },
            D: { item: "functionalstorage:controller_extension" }
        },
        outputItems: [[{ id: "functionalstorage:framed_controller_extension" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "nnn",
            "nDn",
            "nnn"
        ],
        key: {
            n: { item: "modern_industrialization:tin_nugget" },
            D: { item: "functionalstorage:storage_controller" }
        },
        outputItems: [[{ id: "functionalstorage:framed_storage_controller" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "eee",
            "BRE",
            "BPE"
        ],
        key: {
            P: { item: "modern_industrialization:iron_large_plate" },
            E: { item: "modern_industrialization:electrum_wire" },
            R: { item: "immersiveengineering:component_electronic" },
            B: { item: "modern_industrialization:steel_bolt" },
            e: { item: "modern_industrialization:emerald_dust" },
        },
        outputItems: [[{ id: "functionalstorage:configuration_tool" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "ddd",
            "BRE",
            "BPE"
        ],
        key: {
            P: { item: "modern_industrialization:iron_large_plate" },
            E: { item: "modern_industrialization:electrum_wire" },
            R: { item: "immersiveengineering:component_electronic" },
            B: { item: "modern_industrialization:steel_bolt" },
            d: { item: "modern_industrialization:diamond_dust" },

        },
        outputItems: [[{ id: "functionalstorage:linking_tool" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "PUP",
            "BCB",
            "PUP"
        ],
        key: {
            U: { item: "sophisticatedstorage:stack_upgrade_tier_1_plus" },
            P: { item: "modern_industrialization:electrum_wire" },
            B: { item: "modern_industrialization:copper_large_plate" },
            C: { item: "milf:bronze_mechanical_component" },

        },
        outputItems: [[{ id: "functionalstorage:copper_upgrade" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "PUP",
            "GCG",
            "PUP"
        ],
        key: {
            U: { item: "functionalstorage:copper_upgrade" },
            P: { item: "modern_industrialization:steel_wire" },
            G: { item: "modern_industrialization:gold_large_plate" },
            C: { item: "sophisticatedstorage:stack_upgrade_tier_2" },

        },
        outputItems: [[{ id: "functionalstorage:gold_upgrade" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "PUP",
            "GCG",
            "PUP"
        ],
        key: {
            U: { item: "functionalstorage:gold_upgrade" },
            P: { item: "modern_industrialization:cupronickel_wire" },
            G: { item: "modern_industrialization:diamond_large_plate" },
            C: { item: "sophisticatedstorage:stack_upgrade_tier_4" },

        },
        outputItems: [[{ id: "functionalstorage:diamond_upgrade" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "PUP",
            "GCG",
            "PUP"
        ],
        key: {
            U: { item: "functionalstorage:diamond_upgrade" },
            P: { item: "modern_industrialization:platinum_wire" },
            G: { item: "modern_industrialization:netherite_rod" },
            C: { item: "sophisticatedstorage:stack_upgrade_tier_5" },

        },
        outputItems: [[{ id: "functionalstorage:netherite_upgrade" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            " p ",
            " P ",
            " p "
        ],
        key: {
            P: { item: "sophisticatedstorage:stack_downgrade_tier_3" },
            p: { item: "modern_industrialization:iron_plate" },
        },
        outputItems: [[{ id: "functionalstorage:iron_downgrade" }, 1]],
        removeRecipe: true,
    })



})