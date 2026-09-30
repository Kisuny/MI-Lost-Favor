ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            " FT",
            "FT ",
            "S  "
        ],
        key: {
            S: { tag: "milf:sticks" },
            T: { item: "ytech:grass_twine" },
            F: { item: "ytech:sharp_flint" },
        },
        outputItems: [[{ id: "dungeonsdelight:flint_cleaver" }, 1]],
        removeRecipe: true
    })

    function cleaverRecipe(material){
        milfShaped(event, {
            pattern: [
                " FT",
                "FT#",
                "S  "
            ],
            key: {
                S: { item: "minecraft:stick" },
                T: { item: `modern_industrialization:iron_bolt` },
                F: { item: `modern_industrialization:${material}_plate` },
                "#": { tag: "c:hammers" },
            },
            outputItems: [[{ id: `dungeonsdelight:${material == "gold" ? "golden" : material}_cleaver` }, 1]],
            removeRecipe: true
        })
    }

    ["iron", "gold", "diamond"].forEach(material => {
        cleaverRecipe(material)
    })

})