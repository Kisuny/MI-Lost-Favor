ServerEvents.recipes(event => {
    event.remove({ id: "embersatlas:atlas" })

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
        outputItems: [[{ id: "milf:atlas" }, 1]]
    })
})
