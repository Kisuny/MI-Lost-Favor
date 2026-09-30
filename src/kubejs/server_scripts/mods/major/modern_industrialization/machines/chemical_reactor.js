ServerEvents.recipes(event => {
    miMachineRecipe(event, {
        energy: 48, time: 300, machine: "modern_industrialization:chemical_reactor",
        inputFluids: [
            [{ fluid: "modern_industrialization:acetylene" }, 500],
            [{ fluid: "modern_industrialization:oxygen" }, 500]
        ],
        outputFluids: [
            [{ fluid: "oritech:still_sheol_fire" }, 500],
            [{ fluid: "modern_industrialization:hydrogen" }, 500]
        ]
    })
})