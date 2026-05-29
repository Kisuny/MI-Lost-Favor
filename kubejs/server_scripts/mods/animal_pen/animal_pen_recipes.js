ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "BPB",
            "RRR",
            "BPB"
        ],
        key: {
            R: { item: "modern_industrialization:iron_rod" },
            P: { item: "modern_industrialization:copper_plate" },
            B: { item: "modern_industrialization:copper_bolt" }
        },
        outputItems: [[{ id: "animal_pen:animal_cage" }, 1]],
        removeRecipe:true
    })

    milfShaped(event, {
        pattern: [
            " BM",
            " SB",
            "S  "
        ],
        key: {
            S: { item: "minecraft:stick" },
            B: { item: "modern_industrialization:copper_bolt" },
            M: { item: "ytech:twine_mesh" }
        },
        outputItems: [[{ id: "animal_pen:bird_catcher" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "BCB",
            "P P",
            "PPP"
        ],
        key: {
            P: { item: "minecraft:glass_pane" },
            C: { item: "modern_industrialization:copper_plate" },
            B: { item: "modern_industrialization:copper_bolt" }
        },
        outputItems: [[{ id: "animal_pen:water_animal_container" }, 1]],
        removeRecipe: true
    })


})