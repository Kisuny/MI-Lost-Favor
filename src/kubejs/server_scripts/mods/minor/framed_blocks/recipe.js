ServerEvents.recipes(event => {

    event.remove({ id: "framedblocks:framed_tank" })
    event.remove({ id: "framedblocks:framed_chest" })

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
        outputItems: [[{ id: "framedblocks:framed_tank" }, 1]]
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
        outputItems: [[{ id: "framedblocks:framed_chest" }, 1]]
    })

    const framingSaw = (id, material, additives) => {
        event.remove({ id: `framedblocks:framing_saw/${id}` })
        event.custom({
            type: "framedblocks:frame",
            additives: additives.map(([ingredient, count]) => ({ count: count, ingredient: ingredient })),
            material: material,
            result: { count: 1, id: `framedblocks:${id}` }
        }).id(`milf:framing_saw/${id}`)
    }

    framingSaw("framed_hopper", 6144, [[{ item: "minecraft:hopper" }, 1]])
    framingSaw("framed_chest", 49152, [[{ item: "minecraft:chest" }, 1]])
    framingSaw("framed_tank", 49152, [[{ item: "modern_industrialization:steel_tank" }, 1]])

})