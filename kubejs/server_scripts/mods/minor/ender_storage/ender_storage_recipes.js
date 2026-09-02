ServerEvents.recipes(event => {
    
    event.remove({mod: "enderstorage"})

    customEnchanterCraft(event, {
        time: 600,
        experience: 1000,
        ingredients: [
            { "item": "ars_elemental:curio_bag" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "royalvariations:royal_ender_pearl" },
            { "item": "dungeonsdelight:ancient_egg" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "royalvariations:royal_ender_pearl" },
            { "item": "dungeonsdelight:ancient_egg" },
        ],
        result: { id: "enderstorage:ender_pouch", count: 1 },
        advancement: "spectrum:midgame/build_enchanting_structure"
    });

    customEnchanterCraft(event, {
        time: 600,
        experience: 1000,
        ingredients: [
            { "item": "modern_industrialization:aluminum_tank" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "royalvariations:royal_ender_pearl" },
            { "item": "dungeonsdelight:ancient_egg" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "royalvariations:royal_ender_pearl" },
            { "item": "dungeonsdelight:ancient_egg" },
        ],
        result: { id: "enderstorage:ender_tank", count: 2 },
        advancement: "spectrum:midgame/build_enchanting_structure"
    });
    
    customEnchanterCraft(event, {
        time: 600,
        experience: 1000,
        ingredients: [
            { "item": "modern_industrialization:aluminum_barrel" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "royalvariations:royal_ender_pearl" },
            { "item": "dungeonsdelight:ancient_egg" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "malum:hallowed_gold_ingot" },
            { "item": "royalvariations:royal_ender_pearl" },
            { "item": "dungeonsdelight:ancient_egg" },
        ],
        result: { id: "enderstorage:ender_chest", count: 2 },
        advancement: "spectrum:midgame/build_enchanting_structure"
    });

})