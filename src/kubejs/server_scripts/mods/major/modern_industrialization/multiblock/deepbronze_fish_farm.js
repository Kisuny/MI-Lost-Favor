ServerEvents.recipes(event => {

    let theHelly = new $HashSet([
        "farmersdelight:salmon_slice",
        "farmersdelight:cod_slice"
    ])

    Ingredient.of("#c:foods/raw_fish").getItemIds().forEach(fih => {

        if (theHelly.contains(fih)) return

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
        energy: 1, time: 481, machine: "modern_industrialization:deepbronze_fish_farm",
        inputItems: [
            [{ item: "abyssal_decor:giant_clam_empty_closed" }, 1, 0.00109],
            [{ item: "minecraft:sand" }, 1]
        ],
        outputItems: [
            [{ item: "abyssal_decor:white_pearl" }, 1, 0.64]
        ]
    })




})