ServerEvents.recipes(event => {
    event.remove({output: [
        "paganbless:imbuing_cauldron",
        "paganbless:herb_pouch",
    ]})

    miMachineRecipe(event, {energy:4, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"paganbless:essence_of_the_forest"}, 2],
            [{item:"paganbless:cinnabar"}, 2],
            [{item:"minecraft:amethyst_shard"}],
            [{tag:"hexerei:flower_biproduct"}, 2],
        ],
        inputFluids:[
            [{fluid:"minecraft:water"}, 500]
        ],
        outputItems:[
            [{item:"paganbless:runic_charge"}]
        ]
    })
})