ServerEvents.recipes(event => {
        miMachineRecipe(event, {energy:8, time:200, machine:"modern_industrialization:polarizer",
            outputItems:[[{item:"modern_industrialization:steel_rod_magnetic"}]],
            inputItems:[[{item:"modern_industrialization:steel_rod"}]],
            removeRecipe:true
        })
})