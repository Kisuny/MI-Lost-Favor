ServerEvents.recipes(event => {
    //event.remove({ output: "clavis:lock_pick" })
   
    miMachineRecipe(event, {
        energy: 4, time: 200, machine: "modern_industrialization:cutting_machine",
        inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
        inputItems: [[{ item: "modern_industrialization:tumbaga_large_plate" }, 1]],
        outputItems: [[{ item: "clavis:lock_pick" }, 1]],
        removeRecipe: true
    })

})