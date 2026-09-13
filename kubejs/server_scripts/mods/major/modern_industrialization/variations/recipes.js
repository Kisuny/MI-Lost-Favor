//priority: -10

ServerEvents.recipes(event => {

    Object.entries(global.VANILLA_MI_MACHINES_VARIATIONS).forEach(([originalMachineId, variationsData]) => {

        Object.entries(variationsData).forEach(([machineId, recipeData])=> {

            event.forEachRecipe({ type: originalMachineId }, recipe => {

                let recipeJSON = JSON.parse(recipe.json)

                let inputItems = toArray(recipeJSON.item_inputs)
                let outputItems = toArray(recipeJSON.item_outputs)
                let inputFluids = toArray(recipeJSON.fluid_inputs)
                let outputFluids = toArray(recipeJSON.fluid_outputs)

                if (outputItems){
                    for (let itemEntry of outputItems) {
                        if (miRemovedRecipesMap.containsKey(itemEntry[0].item)) {
                            if (miRemovedRecipesMap.get(itemEntry[0].item).contains(recipeJSON.type) ||
                                miRemovedRecipesMap.get(itemEntry[0].item).contains("all")){
                                    return
                                }
                        }
                    }
                }


                if (outputFluids){
                    for (let fluidEntry of outputFluids) {
                        if (miRemovedRecipesMap.containsKey(fluidEntry[0].fluid)) {
                            if (miRemovedRecipesMap.get(fluidEntry[0].fluid).contains(recipeJSON.type) ||
                                miRemovedRecipesMap.get(fluidEntry[0].fluid).contains("all")) {
                                return
                            }
                        }
                    }
                }

                let args = {
                    energy: recipeJSON.eu,
                    time: recipeJSON.duration,
                    machine: machineId,
                    inputItems: inputItems,
                    outputItems: outputItems,
                    inputFluids: inputFluids,
                    outputFluids: outputFluids
                }

                if (recipeData.argsPredicate){
                    if (!recipeData.argsPredicate(args)) return
                }

                if (recipeData.argsCallback) {
                    recipeData.argsCallback(args)
                }

                miMachineRecipe(event, args)

                function toArray(jsonEntry) {
                    if (!jsonEntry) return null
                    return Array.isArray(jsonEntry) ?
                        jsonEntry.map(itemEntry => [itemEntry]) :
                        [[jsonEntry]]
                }

            })

        })

    })

})