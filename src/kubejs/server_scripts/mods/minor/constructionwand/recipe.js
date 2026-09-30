ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "  R",
            " S ",
            "S  "
        ],
        key: {
            R: { item: "milf:pet_rock" },
            S: { item: "paganbless:black_thorn_stick" },
        },
        outputItems: [[{ id: "constructionwand:stone_wand" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " BP",
            " SB",
            "S  "
        ],
        key: {
            P: { item: "modern_industrialization:iron_large_plate" },
            S: { tag: "milf:sticks" },
            B: { item: "modern_industrialization:steel_ring" },
        },
        outputItems: [[{ id: "constructionwand:iron_wand" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " BP",
            " SB",
            "S  "
        ],
        key: {
            P: { item: "modern_industrialization:diamond_large_plate" },
            S: { item: "immersiveengineering:stick_treated" },
            B: { item: "modern_industrialization:aluminum_wire" },
        },
        outputItems: [[{ id: "constructionwand:diamond_wand" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " BP",
            " CB",
            "S  "
        ],
        key: {
            P: { item: "ae2:singularity" },
            S: { item: "immersiveengineering:stick_treated" },
            B: { item: "modern_industrialization:advanced_motor" },
            C: { item: "advanced_ae:quantum_processor" }
        },
        outputItems: [[{ id: "constructionwand:infinity_wand" }, 1]],
        removeRecipe: true
    })

})