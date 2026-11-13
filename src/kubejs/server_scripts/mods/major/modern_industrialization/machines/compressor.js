ServerEvents.recipes(event => {

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:compressor",
        inputItems: [[{ item: "minecraft:clay_ball" }, 2]],
        outputItems: [[{ item: "ytech:unfired_flower_pot" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:compressor",
        inputItems: [[{ tag: "minecraft:wooden_slabs" }, 1]],
        outputItems: [[{ item: "ytech:wooden_plate" }, 4]]
    })

})
