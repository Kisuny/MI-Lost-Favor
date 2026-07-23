ServerEvents.recipes(event => {
    event.recipes.modern_industrialization.cutting_machine(8, 100)
    .itemIn("milf:tempered_glass")
    .itemOut("milf:lens")

    miMachineRecipe(event, {energy:2, time:100, machine:"modern_industrialization:cutting_machine",
        inputFluids:[[{fluid:"modern_industrialization:lubricant"}, 1]],
        inputItems:[[{tag:"immersiveengineering:treated_wood"}]],
        outputItems:[[{item:"immersiveengineering:stick_treated"}, 3]]
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:cutting_machine",
        inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
        inputItems: [[{ item: "minecraft:terracotta" }, 1]],
        outputItems: [[{ item: "ytech:terracotta_bricks" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:cutting_machine",
        inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
        inputItems: [[{ item: "ytech:raw_hide" }, 1]],
        outputItems: [[{ item: "minecraft:leather" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:cutting_machine",
        inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
        inputItems: [[{ item: "modern_industrialization:iron_large_plate" }, 1]],
        outputItems: [[{ item: "minecraft:iron_bars" }, 6]]
    })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:cutting_machine",
        inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
        inputItems: [[{ item: "modern_industrialization:annealed_copper_plate" }, 1]],
        outputItems: [[{ item: "clavis:lock_pick" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 2, time: 200, machine: "modern_industrialization:cutting_machine",
        inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
        inputItems: [[{ tag: "minecraft:planks" }, 1]],
        outputItems: [[{ item: "minecraft:bowl" }, 2]]
    })

    miMachineRecipe(event, {
        energy: 2, time: 200, machine: "modern_industrialization:cutting_machine",
        inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
        inputItems: [[{ tag: "c:leathers" }, 1]],
        outputItems: [[{ item: "ytech:leather_strips" }, 5]]
    })
   
})

