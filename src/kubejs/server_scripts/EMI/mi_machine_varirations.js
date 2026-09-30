Object.entries(global.VANILLA_MI_MACHINES_VARIATIONS).forEach(([machineId, variationsObject]) => {

    Object.entries(variationsObject).forEach(([variationId, recipeData]) => {

        if (recipeData.addAsWorkstationTo) {
            recipeData.addAsWorkstationTo.forEach(category => {
                $ReiMachineRecipes.registerWorkstation(category, recipeData.category || variationId)
            })
        }

    })

})

//$ReiMachineRecipes.registerWorkstation("modern_industrialization:bronze_mixer", "mi_tweaks:ember_powered_mixer")

