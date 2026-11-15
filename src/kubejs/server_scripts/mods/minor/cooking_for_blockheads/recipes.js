ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "SSS",
            "PFP",
            "PLP"
        ],
        key: {
            P: { item: "modern_industrialization:tin_plate" },
            L: { item: "modern_industrialization:tin_large_plate" },
            F: { item: "minecraft:furnace" },
            S: { item: "minecraft:black_stained_glass" }
        },
        outputItems: [[{ id: "cookingforblockheads:white_oven" }, 1]],
        removeRecipe: true
    })
    milfShaped(event, {
        pattern: [
            " PW",
            "PSP",
            "WP "
        ],
        key: {
            P: { item: "modern_industrialization:iron_plate" },
            W: { item: "modern_industrialization:electrum_wire" },
            S: { item: "modern_industrialization:analog_circuit" }
        },
        outputItems: [[{ id: "cookingforblockheads:heating_unit" }, 1]]
    })

    milfShaped(event, {
        pattern: [
            "   ",
            "PCP",
            "PLP"
        ],
        key: {
            P: { item: "modern_industrialization:tin_plate" },
            L: { item: "modern_industrialization:tin_large_plate" },
            C: { tag: "c:chests/wooden" },
        },
        outputItems: [[{ id: "cookingforblockheads:white_fridge" }, 1]],
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            "SL ",
            "NBE",
            "SL "
        ],
        key: {
            B: { item: "cookingforblockheads:recipe_book" },
            L: { item: "minecraft:leather" },
            S: { item: "ytech:leather_strips" },
            E: { item: "paganbless:essence_of_the_forest" },
            N: { tag: "ytech:bone_needles" },
        },
        outputItems: [[{ id: "cookingforblockheads:crafting_book" }, 1]],
        removeRecipe: true,
        compatOff:true
    })



})