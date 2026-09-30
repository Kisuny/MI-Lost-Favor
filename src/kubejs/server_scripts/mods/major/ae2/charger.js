function aeChargerRecipe(event, args) {

    let recipe = {
        type: "ae2:charger",
        ingredient: Object.assign({}, args.inputItems[0][0], { count: args.inputItems[0][1] || 1 }),
        result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
    }

    if (!args.compatOff) {

    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item, type: args.removeRecipeType }) }
    event.custom(recipe)

}

ServerEvents.recipes(event => {
    aeChargerRecipe(event, {
        inputItems: [[{ "item": "modern_industrialization:bauxite_dust" }]],
        outputItems: [[{ id: "modern_industrialization:aluminum_tiny_dust" }, 1]]
    })
})