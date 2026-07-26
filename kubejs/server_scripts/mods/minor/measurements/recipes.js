ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "NN ",
            "NS ",
            "SSR"
        ],
        key: {
            R: { item: "modern_industrialization:steel_ring" },
            N: { item: "modern_industrialization:steel_nugget" },
            S: { item: "ytech:leather_strips" }

        },
        outputItems: [[{ id: "measurements:tape_measure" }]],
        removeRecipe: true
    })


})