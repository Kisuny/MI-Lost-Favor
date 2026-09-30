ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "FFF",
            "FTF",
            "FFF"
        ],
        key: {
            F: { item: "framedblocks:framed_cube" },
            T: { item: "modern_industrialization:steel_tank" }
        },
        outputItems: [[{ id: "framedblocks:framed_tank" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            "FFF",
            "FCF",
            "FFF"
        ],
        key: {
            F: { item: "framedblocks:framed_cube" },
            C: { item: "minecraft:chest" }
        },
        outputItems: [[{ id: "framedblocks:framed_chest" }, 1]],
        removeRecipe: true
    })

})