ServerEvents.recipes(event => {

    miMachineCraft(event, {
        energy: 2, time: 100, machine: "modern_industrialization:compressor",
        inputItems: [[{ item: "minecraft:clay_ball" }, 2]],
        outputItems: [[{ item: "ytech:unfired_flower_pot" }, 1]]
    })

})
