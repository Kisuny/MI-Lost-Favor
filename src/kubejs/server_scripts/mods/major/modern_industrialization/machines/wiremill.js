ServerEvents.recipes(event => {

    miMachineRecipe(event, {energy:2, time:100, machine:"modern_industrialization:wiremill",
        inputItems:[
            [{item:"minecraft:short_grass"}]
        ],
        outputItems:[
            [{item:"ytech:grass_twine"}]
        ]
    })

    miMachineRecipe(event, {energy:2, time:100, machine:"modern_industrialization:wiremill",
        inputItems:[
            [{item:"minecraft:tall_grass"}]
        ],
        outputItems:[
            [{item:"ytech:grass_twine"}, 2]
        ]
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:wiremill",
        inputItems: [
            [{ tag: "minecraft:leaves" }]
        ],
        outputItems: [
            [{ item: "ytech:grass_twine" }, 1]
        ]
    })

})