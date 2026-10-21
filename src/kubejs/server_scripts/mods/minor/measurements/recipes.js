ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "NN ",
            "NS ",
            "SSR"
        ],
        key: {
            R: { item: "modern_industrialization:tin_bolt" },
            N: { item: "modern_industrialization:tin_nugget" },
            S: { item: "ytech:leather_strips" }

        },
        outputItems: [[{ id: "measurements:tape_measure" }]],
        removeRecipe: true
    })


})