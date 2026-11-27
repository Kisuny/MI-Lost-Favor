ServerEvents.recipes(event => {

    let theHelly = new $HashSet([
        "farmersdelight:salmon_slice",
        "farmersdelight:cod_slice"
    ])

    let starcatcherCommon = new $HashSet(
        Ingredient.of("#starcatcher:common_fishes").getItemIds()
    )

    Ingredient.of("#c:foods/raw_fish").getItemIds().forEach(fih => {

        if (theHelly.contains(fih)) return

        if(fih.split(":")[0] == "starcatcher" && !starcatcherCommon.contains(fih)) return

        miMachineRecipe(event, {
            energy: 1, time: 481, machine: "modern_industrialization:deepbronze_fish_farm",
            inputItems: [
                [{ item: fih }, 2],
                [{ item: "embers:ember_shard" }, 1]
            ],
            outputItems: [
                [{ item: fih }, 3],
                [{ item: fih }, 1, 0.68]
            ]
        })
    })

    miMachineRecipe(event, {
        energy: 1, time: 109, machine: "modern_industrialization:deepbronze_fish_farm",
        inputItems: [
            [{ item: "abyssal_decor:giant_clam_empty_closed" }, 1, 0.00109],
            [{ item: "minecraft:sand" }, 1]
        ],
        outputItems: [
            [{ item: "abyssal_decor:block_of_pearl" }, 1, 0.79]
        ]
    })

    miMachineRecipe(event, {
        energy: 1, time: 73, machine: "modern_industrialization:deepbronze_fish_farm",
        inputItems: [
            [{ item: "abyssal_decor:clam_empty_closed" }, 1, 0.00109],
            [{ item: "minecraft:sand" }, 1]
        ],
        outputItems: [
            [{ item: "abyssal_decor:white_pearl" }, 1, 0.87]
        ]
    })

    miMachineRecipe(event, {
        energy: 1, time: 400, machine: "modern_industrialization:deepbronze_fish_farm",
        inputItems: [
            [{ item: "abyssal_decor:clam_empty_closed" }, 1],
            [{ item: "minecraft:bone_meal" }, 4]
        ],
        outputItems: [
            [{ item: "abyssal_decor:clam_empty_closed" }, 1],
            [{ item: "abyssal_decor:clam_empty_closed" }, 1, 0.5]
        ]
    })

    miMachineRecipe(event, {
        energy: 1, time: 666, machine: "modern_industrialization:deepbronze_fish_farm",
        inputItems: [
            [{ item: "abyssal_decor:clam_empty_closed" }, 1],
            [{ item: "minecraft:sand" }, 109 * 2]
        ],
        outputItems: [
            [{ item: "abyssal_decor:giant_clam_empty_closed" }, 1]
        ]
    })


})