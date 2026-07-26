ServerEvents.recipes(event => {
    // event.remove({id: "cognition:cognitive_flux"})
    event.replaceInput({ mod: 'cognition' }, 'minecraft:emerald', 'enchanted:attuned_stone')
    
    // event.shapeless(Item.of("cognition:cognitive_flux", 4),
    //     [
    //         "minecraft:quartz",
    //         "minecraft:lapis_lazuli",
    //         [{ "item": "spectrum:topaz_powder" }, { "item": "spectrum:citrine_powder" }, { "item": "spectrum:amethyst_powder" }],
    //         [{ "item": "minecraft:soul_sand" }, { "item": "minecraft:soul_soil" }],
    //         "spectrum:shimmerstone_gem"
    //     ]).id("milf:cognitive_flux");


    alchemyTableCraft(event, {
        input: [
            { tag: 'milf:basic_gemstone_powders' },
            { item: 'minecraft:quartz' },
            { item: 'minecraft:lapis_lazuli' },
            { item: 'minecraft:soul_sand' },
            { item: 'spectrum:shimmerstone_gem' },
        ],
        output: 'cognition:cognitive_flux',
        count: 8,
        syphon: 50,
        ticks: 200,
        upgradeLevel: 2,
        removeRecipe: true
    });
});
