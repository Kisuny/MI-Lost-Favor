Object.entries(global.VANILLA_MI_MACHINES_VARIATIONS).forEach(([machineId, variationsObject]) => {

    Object.entries(variationsObject).forEach(([variationId, recipeData]) => {

        if (recipeData.addAsWorkstationTo) {
            recipeData.addAsWorkstationTo.forEach(category => {

                let variationCategory = recipeData.category || variationId

                $ReiMachineRecipes.registerWorkstation(category, variationCategory)

                RecipeViewerEvents.removeCategories(event => {
                    event.remove([
                        variationCategory
                    ])
                })
            })
        }

    })

})

//$ReiMachineRecipes.registerWorkstation("modern_industrialization:bronze_mixer", "mi_tweaks:ember_powered_mixer")

