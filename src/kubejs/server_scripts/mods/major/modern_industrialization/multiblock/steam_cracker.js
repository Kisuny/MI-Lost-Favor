ServerEvents.recipes(event => {
    miMachineRecipe(event, {energy:100, time:200, machine:"modern_industrialization:steam_cracker",
        inputFluids:[
            [{fluid:"modern_industrialization:naphtha"}, 1000],
            [{fluid:"modern_industrialization:steam"}, 2000]
        ],
        outputFluids:[

            [{ fluid: "modern_industrialization:ethylene" }, 300],
            [{ fluid: "modern_industrialization:methane" }, 150],
            [{ fluid: "modern_industrialization:propene" }, 150],
            [{ fluid: "immersivepetroleum:benzol" }, 100],
            [{ fluid: "modern_industrialization:toluene" }, 50],
            [{ fluid: "modern_industrialization:butadiene" }, 50],
                       
        ],
        outputItems:[
            [{item:"modern_industrialization:carbon_dust"}, 1, 0.04],
            [{item:"modern_industrialization:coke_dust"}, 1, 0.17],
            [{ item: "supplementaries:ash" }, 1, 0.01]
        ],
    })

    miMachineRecipe(event, {
        energy: 80, time: 155, machine: "modern_industrialization:steam_cracker",
        inputFluids: [
            [{ fluid: "immersivepetroleum:diesel" }, 500],
            [{ fluid: "modern_industrialization:steam" }, 2000]
        ],
        outputFluids: [

            [{ fluid: "modern_industrialization:hydrogen" }, 200],
            [{ fluid: "immersivepetroleum:benzol" }, 100],
            [{ fluid: "modern_industrialization:ethylene" }, 100],
            [{ fluid: "modern_industrialization:ethylene" }, 22, 0.66],
            [{ fluid: "immersivepetroleum:benzol" }, 22, 0.66],
            [{ fluid: "modern_industrialization:hydrogen" }, 55, 0.66],

        ],
        outputItems: [
            [{ item: "modern_industrialization:carbon_dust" }, 1, 0.82],
            [{ item: "modern_industrialization:coke_dust" }, 1, 0.41],
            [{ item: "supplementaries:ash" }, 1, 0.37]
        ],
    })

    miMachineRecipe(event, {
        energy: 70, time: 177, machine: "modern_industrialization:steam_cracker",
        inputFluids: [
            [{ fluid: "immersivepetroleum:kerosene" }, 500],
            [{ fluid: "modern_industrialization:steam" }, 2000]
        ],
        outputFluids: [

            [{ fluid: "modern_industrialization:toluene" }, 300],
            [{ fluid: "modern_industrialization:ethylbenzene" }, 50],
            [{ fluid: "modern_industrialization:ethylene" }, 50],
            [{ fluid: "modern_industrialization:ethylene" }, 11, 0.66],
            [{ fluid: "modern_industrialization:ethylbenzene" }, 11, 0.66],
            [{ fluid: "modern_industrialization:toluene" }, 77, 0.66],

        ],
        outputItems: [
            [{ item: "modern_industrialization:carbon_dust" }, 2, 0.79],
            [{ item: "modern_industrialization:coke_dust" }, 1, 0.81],
            [{ item: "supplementaries:ash" }, 1, 0.11]
        ],
    })
})