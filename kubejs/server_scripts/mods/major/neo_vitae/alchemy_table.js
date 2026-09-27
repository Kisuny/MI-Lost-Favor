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
    if (args.removeRecipe) { event.remove({ output: args.output }) }
    if (args.removeRecipeType) { event.remove({ output: args.output, type: args.removeRecipeType }) }
};

ServerEvents.recipes(event => {

    const removing_by_recipe_id = [
        "neovitae:alchemytable/sulfur_from_lava",
        "neovitae:alchemytable/sulfur_from_sigil",
    ]
    
    removing_by_recipe_id.forEach(id => {
        event.remove({ id: id })
    });
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

    alchemyTableCraft(event, {
        input: [
            { item: 'neovitae:sigil_lava' },
            { tag: 'c:cobblestones' },
        ],
        output: 'modern_industrialization:sulfur_dust',
        count: 4,
        syphon: 1200,
        ticks: 100,
        upgradeLevel: 0
    });

    alchemyTableCraft(event, {
        input: [
            { item: 'minecraft:lava_bucket' },
            { tag: 'c:cobblestones' },
        ],
        output: 'modern_industrialization:sulfur_dust',
        count: 4,
        syphon: 200,
        ticks: 100,
        upgradeLevel: 0
    });

});
