ServerEvents.recipes(event => {
    Object.entries(global.miProxyableMachineRecipeTypes).forEach(([toId, fromId]) => {
        event.forEachRecipe({ type: fromId }, recipe => {

            let recipeJSON = JSON.parse(recipe.json)

            let inputItems = toArray(recipeJSON.item_inputs) 
            let outputItems = toArray(recipeJSON.item_outputs)
            let inputFluids = toArray(recipeJSON.fluid_inputs)
            let outputFluids = toArray(recipeJSON.fluid_outputs)

            miMachineRecipe(event, {
                energy: recipeJSON.eu, 
                time: recipeJSON.duration,
                machine: toId,
                inputItems: inputItems,
                outputItems: outputItems,
                inputFluids: inputFluids,
                outputFluids: outputFluids
            })

            function toArray(jsonEntry) {
                if (!jsonEntry) return null
                return Array.isArray(jsonEntry) ?
                    jsonEntry.map(itemEntry => [itemEntry]) :
                    [[jsonEntry]]
            }
        })
    })
})