ServerEvents.recipes(event => {

    miMachineRecipe(event, {
        energy:2, time:40, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"minecraft:glow_berries"}, 2],
        ],
        outputFluids: [
            [{ fluid: "supplementaries:lumisene" }, 250]
        ],
    })


})