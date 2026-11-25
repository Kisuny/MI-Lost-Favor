ServerEvents.recipes(event => {

    let disabldedFluidsSet = new $HashSet(
        global.disabledFluids.map(entry => entry.id)
    )    

    Object.entries(global.miProxyableMachineRecipeTypes).forEach(([toId, fromId]) => {
        event.forEachRecipe({ type: fromId }, recipe => {

            let recipeJSON = JSON.parse(recipe.json)

            let inputItems = toArray(recipeJSON.item_inputs) 
            let outputItems = toArray(recipeJSON.item_outputs)
            let inputFluids = toArray(recipeJSON.fluid_inputs)
            let outputFluids = toArray(recipeJSON.fluid_outputs)

            if (inputFluids && checkForDisabledFluids(inputFluids)) return
            if (outputFluids && checkForDisabledFluids(outputFluids)) return

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

            function checkForDisabledFluids(fluids){

                for (let fluidEntry of fluids){

                    if (disabldedFluidsSet.contains(String(fluidEntry[0].fluid))) {

                        let disabledFluidEntry = global.disabledFluids.find(entry => entry.id == fluidEntry[0].fluid)
                        

                        if (disabledFluidEntry.replaceData.id != null) {
                            
                            fluidEntry[0].fluid = disabledFluidEntry.replaceData.id
                        } else {
                            return true
                        }

                    }
                }

                

                return false


            }
        })
    })
})