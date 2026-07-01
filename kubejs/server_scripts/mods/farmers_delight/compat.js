ServerEvents.recipes(event => {

    cuttingBoardRecipe(event, {
        inputItems: [[{ item: "minecraft:potato" }, 1]],
        outputItems: [[{ id: "rusticdelight:potato_slices" }, 2]],
        removeRecipeType: "farmersdelight:cutting"
    })

    cuttingBoardRecipe(event, {
        inputItems: [[{ item: "rusticdelight:potato_slices" }, 1]],
        outputItems: [[{ id: "extradelight:sliced_potato" }, 2]],
        removeRecipeType: "farmersdelight:cutting"
    })

    cuttingBoardRecipe(event, {
        inputItems: [[{ item: "extradelight:sliced_potato" }, 1]],
        outputItems: [[{ id: "moredelight:diced_potatoes" }, 2]],
        removeRecipeType: "farmersdelight:cutting"
    })

    cuttingBoardRecipe(event, {
        inputItems: [[{ item: "minecraft:potato" }, 1]],
        outputItems: [[{ id: "extradelight:grated_potato" }, 3]],
        removeRecipeType: "farmersdelight:cutting",
        tool: { item: "extradelight:grater" }
    })

    cuttingBoardRecipe(event, {
        inputItems: [[{ item: "extradelight:sliced_potato" }, 1]],
        outputItems: [[{ id: "extradelight:potato_sticks" }, 1]],
        removeRecipeType: "farmersdelight:cutting",
        tool: { item: "extradelight:grater" }
    })

    // event.replaceOutput({ output: "extradelight:salt" }, "extradelight:salt", "modern_industrialization:salt_dust")
    // event.replaceOutput({ output: "farmersdelight:wheat_dough" }, "expandeddelight:salt", "modern_industrialization:salt_dust")

    // event.remove({ output: "moredelight:wooden_knife" })
    // event.remove({ output: "moredelight:stone_knife" })


})


KubeJSTweaks.beforeRecipes(event => {

    const disableByRecipeID = [
        "farmersdelight:wheat_dough_from_eggs"
    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })

})