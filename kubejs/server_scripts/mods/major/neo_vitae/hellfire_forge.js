function vitaeHellfireForgeRecipe(event, args) {
    let inputs = []
    args.inputItems.forEach(item => { inputs.push(Object.assign({}, item[0], { count: item[1] || 1 })) })
    let recipe = {
        type: "neovitae:hellfire_forge",
        inputs: inputs,
        output: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
        drain: args.drain || 5,
        minDrain: args.minDrain || 30
    }
    if (args.catalysts){
        recipe.catalysts = args.catalysts
    }
    if (!args.compatOff) {

    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id || args.outputItems[0][0].item, type: args.removeRecipeType }) }
    event.custom(recipe)
}

ServerEvents.recipes(event => {
    vitaeHellfireForgeRecipe(event, {
        inputItems: [
            [{ "item": "neovitae:bloodstone" }],
            [{ "item": "milf:steel_infused_glass" }],
            [{ "item": "milf:steel_infused_glass" }],
            [{ "item": "modern_industrialization:bronze_tank" }]
        ],
        outputItems: [[{ id: "neovitae:blood_tank" }, 1]]
    })
})

milfDisableRecipesById([
    "neovitae:hellfire_forge/blood_tank"
])