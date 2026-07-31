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
    
    // jsut example recipe
    // alchemyTableCraft(event, {
    //     input: [
    //         { tag: 'milf:basic_gemstone_powders' },
    //         { item: 'minecraft:quartz' },
    //         { item: 'minecraft:lapis_lazuli' },
    //         { item: 'minecraft:soul_sand' },
    //         { item: 'spectrum:shimmerstone_gem' },
    //     ],
    //     output: 'cognition:cognitive_flux',
    //     count: 8,
    //     syphon: 50,
    //     ticks: 200,
    //     upgradeLevel: 2,
    //     removeRecipe: true
    // });

});
