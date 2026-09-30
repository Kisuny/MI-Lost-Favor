ServerEvents.recipes(event => {
    yTechShaped(event, {
        pattern: [
            "SHS",
            "bHb",
            "s#s"
        ],
        key: {
            "#": { "tag": "c:saws" },
            "H": { "item": "minecraft:hay_block" },
            "S": { "item": "minecraft:stick" },
            "s": { "tag": "minecraft:wooden_slabs" },
            "b": { "item": "ytech:wooden_bolt" }
        },
        outputItems: [[{ id: "dummmmmmy:target_dummy" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })
})