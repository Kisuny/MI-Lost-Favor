ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "B B",
            "LLL",
            "   "
        ],
        key: {
            L: { item: "modern_industrialization:iron_large_plate" },
           // P: { item: "modern_industrialization:iron_plate" },
            B: { item: "modern_industrialization:iron_bolt" },
        },
        outputItems: [[{ id: "extradelight:evaporator" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "B B",
            "BLB",
            "B B"
        ],
        key: {
            L: { item: "modern_industrialization:iron_large_plate" },
            // P: { item: "modern_industrialization:iron_plate" },
            B: { item: "modern_industrialization:iron_bolt" },
        },
        outputItems: [[{ id: "extradelight:bar_mold" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "B B",
            "PLP",
            "B B"
        ],
        key: {
            L: { item: "modern_industrialization:iron_large_plate" },
             P: { item: "modern_industrialization:iron_plate" },
            B: { item: "modern_industrialization:iron_bolt" },
        },
        outputItems: [[{ id: "extradelight:sheet" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "B B",
            "SLS",
            "B B"
        ],
        key: {
            L: { item: "modern_industrialization:iron_large_plate" },
             S: { item: "minecraft:stick" },
            B: { item: "modern_industrialization:iron_bolt" },
        },
        outputItems: [[{ id: "extradelight:tray" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "B B",
            "PPP",
            "   "
        ],
        key: {
            //L: { item: "modern_industrialization:iron_large_plate" },
            P: { item: "modern_industrialization:iron_plate" },
            B: { item: "modern_industrialization:iron_bolt" },
        },
        outputItems: [[{ id: "extradelight:loaf_pan" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "B B",
            "PBP",
            " P "
        ],
        key: {
            //L: { item: "modern_industrialization:iron_large_plate" },
            P: { item: "modern_industrialization:iron_plate" },
            B: { item: "modern_industrialization:iron_bolt" },
        },
        outputItems: [[{ id: "extradelight:pie_dish" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "BPB",
            "SPS",
            "BPB"
        ],
        key: {
            P: { item: "modern_industrialization:iron_plate" },
            //L: { item: "modern_industrialization:iron_large_plate" },
            S: { item: "minecraft:stick" },
            B: { item: "modern_industrialization:iron_bolt" },
        },
        outputItems: [[{ id: "extradelight:square_pan" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "S S",
            "P P",
            "PLP"
        ],
        key: {
            P: { item: "modern_industrialization:iron_plate" },
            L: { item: "modern_industrialization:iron_large_plate" },
            S: { item: "minecraft:stick" },
            //B: { item: "modern_industrialization:iron_bolt" },
        },
        outputItems: [[{ id: "extradelight:serving_pot" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "PRP",
            "BLB",
            "BBB"
        ],
        key: {
            P: { item: "modern_industrialization:iron_plate" },
            L: { item: "modern_industrialization:iron_large_plate" },
            R: { item: "modern_industrialization:iron_rod" },
            B: { item: "modern_industrialization:iron_bolt" },
        },
        outputItems: [[{ id: "extradelight:grater" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "  P",
            " SK",
            "S  "
        ],
        key: {
            P: { item: "ytech:wooden_plate" },
            S: { item: "minecraft:stick" },
            K: { tag: "milf:knives" },
        },
        outputItems: [[{ id: "extradelight:wooden_spoon" }, 1]],
        removeRecipe: true
    })

})