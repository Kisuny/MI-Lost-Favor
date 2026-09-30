ServerEvents.recipes(event => {
    yTechShaped(event, {
        pattern: [
            "SB ",
            "SB#",
            "SB "
        ],
        key: {
            "#": { "tag": "ytech:bone_needles" },
            "S": { "tag": "ytech:leather_strips" },
            "B": { "item": "minecraft:writable_book" }
        },
        outputItems: [[{ id: "eccentrictome:tome" }, 1]],
        removeRecipeType: "minecraft:crafting_shapeless"
    })
})