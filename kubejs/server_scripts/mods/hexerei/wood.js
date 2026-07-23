ServerEvents.recipes(event => {

    const woodTypes = ["witch_hazel", "willow", "mahogany"]

    woodTypes.forEach(type =>{

        const tag = `hexerei:${type}_planks`

        const allItems = Ingredient.of("#" + tag)
        const itemIds = allItems.getItemIds()
        itemIds.forEach(id => {
            miMachineRecipe(event, {
                energy: 2, time: 100, machine: "modern_industrialization:cutting_machine",
                inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
                inputItems: [[{ tag: tag }, 1]],
                outputItems: [[{ item: id }, 1]]
            })

        })
        
    })


})