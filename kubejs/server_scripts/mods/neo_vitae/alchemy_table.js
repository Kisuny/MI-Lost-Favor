const alchemyTableCraft = (event, args) => {
    event.custom({
        type: 'neovitae:alchemytable',
        input: args.input,
        output: {
            id: args.output,
            count: args.count || 1
        },
        syphon: args.syphon,
        ticks: args.ticks,
        upgradeLevel: args.upgradeLevel || 0
    });
    if (args.removeRecipe === true) {
        event.remove({ output: args.output });
    }
};

ServerEvents.recipes(event => {
    
});
