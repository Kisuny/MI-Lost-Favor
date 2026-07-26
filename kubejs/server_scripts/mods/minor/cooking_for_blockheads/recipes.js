ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            " C ",
            " B ",
            "   "
        ],
        key: {
            C: { tag: "c:tools/cleaver" },
            B: { item: "farmersdelight:cutting_board" }
        },
        outputItems: [[{ id: "cookingforblockheads:cutting_board" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "PLP",
            "PSP",
            "WLW"
        ],
        key: {
            P: { item: "modern_industrialization:iron_plate" },
            L: { item: "modern_industrialization:iron_large_plate" },
            W: { item: "modern_industrialization:electrum_wire" },
            S: { item: "milf:steel_infused_glass" }
        },
        outputItems: [[{ id: "cookingforblockheads:white_oven" }, 1]],
        removeRecipe: true
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