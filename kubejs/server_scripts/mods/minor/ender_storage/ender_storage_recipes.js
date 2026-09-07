ServerEvents.recipes(event => {

    const recipes = [
        { mainItem: "ars_elemental:curio_bag", id: "enderstorage:ender_pouch", count: 1 },
        { mainItem: "modern_industrialization:aluminum_tank", id: "enderstorage:ender_tank", count: 2 },
        { mainItem: "modern_industrialization:aluminum_barrel", id: "enderstorage:ender_chest", count: 2 }
    ]

    recipes.forEach(({ mainItem, id, count }) => {
        customEnchanterCraft(event, {
            time: 600,
            experience: 1000,
            ingredients: [
                { "item": mainItem },
                { "item": "malum:hallowed_gold_ingot" },
                { "item": "malum:hallowed_gold_ingot" },
                { "item": "royalvariations:royal_ender_pearl" },
                { "item": "dungeonsdelight:ancient_egg" },
                { "item": "malum:hallowed_gold_ingot" },
                { "item": "malum:hallowed_gold_ingot" },
                { "item": "royalvariations:royal_ender_pearl" },
                { "item": "dungeonsdelight:ancient_egg" },
            ],
            result: id,
            count: count,
            removeRecipe: true,
            advancement: "spectrum:midgame/build_enchanting_structure"
        });
    });

})