ServerEvents.recipes(event => {

    // const NOSE_ORES = [
    //     "modern_industrialization:raw_tin",
    //     "minecraft:raw_copper",
    //     "minecraft:raw_iron",
    //     "minecraft:raw_gold",
    //     "minecraft:coal",
    //     "modern_industrialization:raw_lead",
    //     "minecraft:emerald",
    //     "minecraft:redstone",
    //     "minecraft:diamond",
    //     "minecraft:lapis_lazuli",
    //     "minecraft:quartz",
    //     "modern_industrialization:bauxite_dust",
    //     "modern_industrialization:raw_nickel",
    //     "minecraft:netherite_scrap",
    //     "modern_industrialization:salt_dust",
    //     "modern_industrialization:raw_antimony",
    //     "modern_industrialization:raw_uranium",
    //     "modern_industrialization:raw_tungsten",
    //     "modern_industrialization:raw_titanium",
    //     "modern_industrialization:raw_platinum",
    //     "modern_industrialization:monazite_dust"
    // ]

    // NOSE_ORES.forEach(oreId => {
    //     noseRecipe(oreId)
    // })

    global.oresWithSamples.filter(entry => entry.oreTier <= 3).forEach(entry  => {

        let rawOre = entry.oreData.raw

        customShrineRecipe(event, {
            time: 60,
            experience: 8,
            fluid: "spectrum:liquid_crystal",
            ingredients: [
                { "item": "milf:pet_rock", count: 1 },
                { "item": rawOre, count: 1 },
                { "item": rawOre, count: 1 },
                { "item": rawOre, count: 2 },
                { "item": rawOre, count: 3 },
                { "item": rawOre, count: 5 },
                { "item": rawOre, count: 8 },
            ],
            result: {
                id: "milf:stone_nose",
                count: 1,
                components: { "minecraft:custom_data": { "oreId": entry.oreData.displayItem } }
            }
        })

        // customShrineRecipe(event, {
        //     time: 60,
        //     experience: 8,
        //     fluid: "spectrum:liquid_crystal",
        //     ingredients: [
        //         { "item": "milf:pet_rock", count: 1 },
        //         { "tag": `milf:t${entry.oreTier + 1}_raw_materaials`, count: 1 },
        //         { "tag": `milf:t${entry.oreTier + 1}_raw_materaials`, count: 1 },
        //         { "tag": `milf:t${entry.oreTier + 1}_raw_materaials`, count: 2 },
        //         { "tag": `milf:t${entry.oreTier + 1}_raw_materaials`, count: 3 },
        //         { "tag": `milf:t${entry.oreTier + 1}_raw_materaials`, count: 5 },
        //         { "tag": `milf:t${entry.oreTier + 1}_raw_materaials`, count: 8 },
        //     ],
        //     result: {
        //         id: "milf:stone_nose",
        //         count: 1,
        //         components: { "minecraft:custom_data": { "oreId": entry.oreData.displayItem } }
        //     }
        // })

    })

})