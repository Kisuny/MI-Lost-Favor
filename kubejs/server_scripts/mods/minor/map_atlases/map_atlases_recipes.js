ServerEvents.recipes(event => {
    yTechShaped(event, {
        pattern: [
            "SP ",
            "SB#",
            "SP "
        ],
        key: {
            "#": { "tag": "ytech:bone_needles" },
            "P": { "item": "minecraft:paper" },
            "S": { "tag": "ytech:leather_strips" },
            "B": { "item": "minecraft:writable_book" }
        },
        outputItems: [[{ id: "map_atlases:atlas" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })
})