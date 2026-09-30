ServerEvents.recipes(event => {

    let stations = {
        "minecraft:crafting_table": "crafting_on_a_stick:crafting_table",
        "minecraft:loom": "crafting_on_a_stick:loom",
        "minecraft:grindstone": "crafting_on_a_stick:grindstone",
        "minecraft:cartography_table": "crafting_on_a_stick:cartography_table",
        "minecraft:stonecutter": "crafting_on_a_stick:stonecutter",
        "minecraft:smithing_table": "crafting_on_a_stick:smithing_table",
        "minecraft:anvil": "crafting_on_a_stick:anvil",
        "minecraft:chipped_anvil": "crafting_on_a_stick:chipped_anvil",
        "minecraft:damaged_anvil": "crafting_on_a_stick:damaged_anvil"
    }

    

    for (let [station, stick] of Object.entries(stations) ){
        milfShaped(event, {
            pattern: [
                " S",
                "R "
            ],
            key: {
                S: { item: station },
                R: { item: "modern_industrialization:copper_rod" }

            },
            outputItems: [[{ id: stick }]],
            removeRecipe: true,
            compatOff: true
        })
    }



})