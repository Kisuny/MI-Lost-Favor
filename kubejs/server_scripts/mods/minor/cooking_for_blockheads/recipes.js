ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "SSS",
            "PFP",
            "PLP"
        ],
        key: {
            P: { item: "modern_industrialization:iron_plate" },
            L: { item: "modern_industrialization:iron_large_plate" },
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
            P: { item: "modern_industrialization:iron_plate" },
            L: { item: "modern_industrialization:iron_large_plate" },
            C: { tag: "c:chests/wooden" },
        },
        outputItems: [[{ id: "cookingforblockheads:white_fridge" }, 1]],
        removeRecipe: true
    })


})