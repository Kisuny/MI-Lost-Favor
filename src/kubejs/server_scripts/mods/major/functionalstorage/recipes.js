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
                "SWS"
            ],
            key: {
                W: { item: material },
                S: { item: "modern_industrialization:steel_rod" },
                P: { item: "sophisticatedstorage:upgrade_base" }
            },
            outputItems: [[{ id: single }, 1]],
            removeRecipe: true,
        })

        milfShaped(event, {
            pattern: [
                "SPS",
                "WWW",
                "SPS"
            ],
            key: {
                W: { item: material },
                S: { item: "modern_industrialization:steel_rod" },
                P: { item: "sophisticatedstorage:upgrade_base" }
            },
            outputItems: [[{ id: double }, 2]],
            removeRecipe: true,
        })

        milfShaped(event, {
            pattern: [
                "SPS",
                "PWP",
                "SPS"
            ],
            key: {
                W: { item: material },
                S: { item: "modern_industrialization:steel_rod" },
                P: { item: "sophisticatedstorage:upgrade_base" }
            },
            outputItems: [[{ id: quad }, 4]],
            removeRecipe: true,
        })
    })

    milfShaped(event, {
        pattern: [
            "SWS",
            "WPW",
            "SWS"
        ],
        key: {
            W: { tag: "minecraft:planks" },
            S: { item: "modern_industrialization:steel_rod" },
            P: { item: "sophisticatedstorage:upgrade_base" }
        },
        outputItems: [[{ id: "functionalstorage:oak_1" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "SPS",
            "WWW",
            "SPS"
        ],
        key: {
            W: { tag: "minecraft:planks" },
            S: { item: "modern_industrialization:steel_rod" },
            P: { item: "sophisticatedstorage:upgrade_base" }
        },
        outputItems: [[{ id: "functionalstorage:oak_2" }, 2]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "SPS",
            "PWP",
            "SPS"
        ],
        key: {
            W: { tag: "minecraft:planks" },
            S: { item: "modern_industrialization:steel_rod" },
            P: { item: "sophisticatedstorage:upgrade_base" }
        },
        outputItems: [[{ id: "functionalstorage:oak_4" }, 4]],
        removeRecipe: true,
    })



})