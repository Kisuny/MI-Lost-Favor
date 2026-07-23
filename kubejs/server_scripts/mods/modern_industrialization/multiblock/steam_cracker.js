ServerEvents.recipes(event => {
    miMachineRecipe(event, {energy:16, time:140, machine:"modern_industrialization:steam_cracker",
        inputFluids:[
            [{fluid:"modern_industrialization:naphtha"}, 1000],
            [{fluid:"modern_industrialization:steam"}, 500]
        ],
        outputFluids:[
            [{fluid:"modern_industrialization:butadiene"}, 50],
            [{fluid:"modern_industrialization:benzene"}, 250],
            [{fluid:"modern_industrialization:ethylene"}, 250],
            [{fluid:"modern_industrialization:toluene"}, 100],
            [{fluid:"modern_industrialization:hydrogen"}, 250],
            [{fluid:"modern_industrialization:methane"}, 100]
        ],
        outputItems:[
            [{item:"modern_industrialization:carbon_dust"}, 1, 0.65],
            [{item:"modern_industrialization:coke_dust"}, 1, 0.45]
        ],
    })
})