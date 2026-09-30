ServerEvents.recipes(event => {

    customKettleCraft(event, {
        cook_colour: "842CBF",
        final_colour: "960AAB",
        ingredients: [
            { id: "minecraft:obsidian", count: 3 },
            { id: "minecraft:ender_pearl", count: 1 },
            { id: "enchanted:attuned_stone", count: 1 }
        ],
        power: 200,
        result: { id: "transmog:void_fragment", count: 1 },
        removeRecipe: true
    });


})