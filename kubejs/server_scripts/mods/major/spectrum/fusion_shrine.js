const customShrineRecipe = (event, args) => {
    event.custom({
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
        "start_crafting_effect": args.startEffect || "nothing",
        "during_crafting_effects": args.duringEffects || ["nothing", "nothing", "nothing"],
        "finish_crafting_effect": args.finishEffect || "nothing",
    });
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