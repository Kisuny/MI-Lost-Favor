ServerEvents.recipes(event => {
    miMachineRecipe(event, {
        energy: 4, time: 656, machine: "modern_industrialization:blast_furnace",
        inputItems: [
            [{ item: "oritech:raw_biopolymer" }, 1],
            [{ item: "immersiveengineering:mold_plate" }, 1, 0],
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 250],
        ],
        outputItems: [[{ item: "oritech:plastic_sheet" }, 1]],
        outputFluids: [
            [{ fluid: "modern_industrialization:steam" }, 200],
        ],
        removeRecipe:true
    })
})