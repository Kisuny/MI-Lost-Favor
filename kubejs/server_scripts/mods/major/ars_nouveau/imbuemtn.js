const customImbuementCraft = (event, args) => {
    event.custom({
        "type": "ars_nouveau:imbuement",
        "input": args.input,
        "output": {
            "count": args.amount || 1,
            "id": args.output
        },
        "pedestalItems": args.pedestalItems || [],
        "source": args.source || 500
    });
    // remove by OUTPUT Not by ID!!!!
    if (args.removeRecipe === true) {
        event.remove({ output: args.output });
    }
};


ServerEvents.recipes(event => {
    const removing_by_recipe_id = [
        "ars_nouveau:imbuement_amethyst",
        "ars_nouveau:imbuement_amethyst_block",
        "ars_nouveau:imbuement_lapis",
    ]

    removing_by_recipe_id.forEach(id => {
        event.remove({ id: id })
    });

    customImbuementCraft(event, {
        input: { "item": "spectrum:moonstone_shard" },
        output: "ars_nouveau:source_gem",
        source: 500
    })
    customImbuementCraft(event, {
        input: { "item": "spectrum:moonstone_block" },
        output: "ars_nouveau:source_gem_block",
        source: 2000
    })


})