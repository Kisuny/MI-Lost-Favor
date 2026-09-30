function alterationRecipe(event, args) {
    event.custom({
        type: 'risus:alteration',
        input: { item: args.input },
        result: args.result
    });
    if (args.removeRecipe) { event.remove({ output: args.result }) }
    if (args.removeRecipeType) { event.remove({ output: args.result, type: args.removeRecipeType }) }
}

ServerEvents.recipes(event => {

});
