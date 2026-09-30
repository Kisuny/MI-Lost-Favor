ServerEvents.recipes(event => {

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:vacuum_freezer",
        inputItems: [
            [{ item: "immersiveengineering:mold_plate" }, 1, 0]
        ],
        inputFluids:[
            [{fluid:"milf:liquid_plastic"}, 100]
        ],
        outputItems: [[{ "item": "modern_industrialization:plastic_plate" }]],
        removeRecipe: true
    })


})