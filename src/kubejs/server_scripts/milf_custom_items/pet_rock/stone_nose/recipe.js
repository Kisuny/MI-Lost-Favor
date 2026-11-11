ServerEvents.recipes(event => {


    global.oresWithSamples.filter(entry => entry.oreTier <= 3).forEach(entry  => {

        let rawOre = entry.oreData.displayItem

        embersAlchemyRecipe(event, {
            inputItems: [
                [{ item: rawOre }],
                [{ item: rawOre }],
                [{ item: rawOre }],
                [{ item: rawOre }],
                [{ item: rawOre }],
                [{ item: rawOre }],
            ],

            aspects: [
                [{ item: "embers:copper_aspectus" }],
                [{ item: "embers:lead_aspectus" }],
                [{ item: "embers:dawnstone_aspectus" }],
                [{ item: "embers:iron_aspectus" }],
                [{ item: "embers:silver_aspectus" }],
                [{ item: "embers:intelligent_apparatus" }],
            ],

            outputItems: [
                [{
                    id: "milf:stone_nose",
                    count: 1,
                    components: { "minecraft:custom_data": { "oreId": entry.oreData.displayItem } }
                }],
            ],

            tablet: { item: "milf:stone_nose" },

        })

        // customShrineRecipe(event, {
        //     time: 60,
        //     experience: 8,
        //     fluid: "spectrum:liquid_crystal",
        //     ingredients: [
        //         { "item": "milf:pet_rock", count: 1 },
        //         { "item": rawOre, count: 1 },
        //         { "item": rawOre, count: 1 },
        //         { "item": rawOre, count: 2 },
        //         { "item": rawOre, count: 3 },
        //         { "item": rawOre, count: 5 },
        //         { "item": rawOre, count: 8 },
        //     ],
        //     result: {
        //         id: "milf:stone_nose",
        //         count: 1,
        //         components: { "minecraft:custom_data": { "oreId": entry.oreData.displayItem } }
        //     }
        // })


    })

    yTechShaped(event, {
        pattern: [
            "@ S",
            " P ",
            "K #"
        ],
        key: {
            S: { tag: "c:saws" },
            K: { tag: "milf:knives" },
            P: { item: "milf:pet_rock" },
            "#": { tag: "c:files" },
            "@": { tag: "milf:hammers" }
        },
        outputItems: [[{ id: "milf:stone_nose" }, 1]],
        compatOff: true
    })

    yTechShaped(event, {
        pattern: [
            "pNp",
            "NPN",
            "pNp"
        ],
        key: {
            P: { item: "milf:pet_rock" },
            N: { item: "milf:stone_nose" },
            p: { item: "ytech:pebble" },

        },
        outputItems: [[{ id: "milf:noseamination" }, 1]]
    })

})