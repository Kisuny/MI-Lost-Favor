
function ieSqueezerRecipe (event, args) {
    let recipe = {
        type: "immersiveengineering:squeezer",
        energy: args.energy || 6400,
        input: Object.assign({}, { "basePredicate": args.inputItems[0][0] }, { count: args.inputItems[0][1] || 1 }),
        result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
        fluid: Object.assign({}, args.outputFluids[0][0], { amount: args.outputFluids[0][1] || 1000})
    }
    if (!args.compatOff) {
       
    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    event.custom(recipe)
}
ServerEvents.recipes(event => {
    ieSqueezerRecipe(event, {
        inputItems: [[{ item: "minecraft:jungle_leaves" }, 1]],
        outputItems: [[{ id: "milf:nutmeg" }, 1]],
        outputFluids: [[{ id: "immersiveengineering:plantoil" }, 30]],
    })
})