function aeInscriberRecipe(event, args){
    let recipe = {
        type: "ae2:inscriber",
        mode: args.mode || "press",
        key: args.key,
        ingredients: args.inputItems.reduce((accumulator, currentValue, index) => { 
            switch (index) {
                case 0:
                    accumulator.middle = currentValue[0]
                    break;
                case 1:
                    accumulator.top = currentValue[0]
                    break;
                case 2:
                    accumulator.bottom = currentValue[0]
                    break;
            }
            return accumulator
        }, {}),
        result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
    }

    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

})