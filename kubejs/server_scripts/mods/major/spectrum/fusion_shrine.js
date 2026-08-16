const customShrineRecipe = (event, args) => {
    const recipe = {
        "type": "spectrum:fusion_shrine",
        "time": args.time,
        "experience": args.experience || 0.0,
        "fluid": {
            "fluid": args.fluid
        },
        "copy_components": true,
        "ingredients": args.ingredients,
        "result": args.result,
        "required_advancement": args.advancement || "spectrum:unlocks/blocks/fusion_shrine",
        "world_conditions": args.conditions || {},
    };

    if (args.startEffect || args.duringEffects || args.finishEffect) {
        recipe.effects = {};
        if (args.startEffect) recipe.effects.start = args.startEffect;
        if (args.duringEffects) recipe.effects.during = args.duringEffects;
        if (args.finishEffect) recipe.effects.finish = args.finishEffect;
    }

    event.custom(recipe);
    if (args.removeRecipe) { event.remove({ output: args.result.id }) }
    if (args.removeRecipeType) { event.remove({ output: args.result.id, type: args.removeRecipeType }) }
};

ServerEvents.recipes(event => {

    customShrineRecipe(event, {
        time: 60,
        experience: 8.0,
        fluid: "spectrum:dragonrot",
        ingredients: [
            { "item": "minecraft:amethyst_shard", count: 4 },
            { "item": "spectrum:topaz_shard", count: 4 },
            { "item": "spectrum:citrine_shard", count: 4 },
            { "item": "spectrum:onyx_shard", count: 4 },
            { "item": "spectrum:moonstone_shard", count: 4 },
            { "item": "ae2:certus_quartz_crystal", count: 4 },
            { "item": "spectrum:downstone_fragments", count: 1 },
        ],
        result: {
            "id": "extendedae:entro_shard",
            "count": 1
        }
    })

})