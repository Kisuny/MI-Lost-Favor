ServerEvents.recipes(event => {
    event.remove({ id: "arts_and_crafts:terracotta_shingles" })
    yTechShaped(event, {
        pattern: [
            "# @",
            "WWW",
            "PPP"
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "P": { "tag": "minecraft:wooden_slabs" },
            "@": { "tag": "c:saws" },
            "W": { "item": "arts_and_crafts:bleached_wool" }
        },
        outputItems: [[{ id: "arts_and_crafts:bleached_bed" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

})