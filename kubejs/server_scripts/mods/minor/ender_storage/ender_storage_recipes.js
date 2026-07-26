ServerEvents.recipes(event => {
    
    event.remove({mod: "enderstorage"})
    addHephaestusRitual("ender_pouch", {
        enhancers: "forbidden_arcanus:maledictus_pact",
        essences: { aureal: 20, blood: 500, souls: 2, experience: 100 },
        mainIngredient: "ars_elemental:curio_bag",
        inputs: [
            { item: "simplyswords:runic_tablet", amount: 1 },
            { item: "dungeonsdelight:ancient_egg", amount: 1 },
            { item: "forbidden_arcanus:obsidiansteel_ingot", amount: 2 },
            { item: "modern_industrialization:gold_curved_plate", amount: 4 },
        ],
        result: "enderstorage:ender_pouch",
    })

    addHephaestusRitual("ender_chest", {
        enhancers: "forbidden_arcanus:maledictus_pact",
        resultCount: 2,
        essences: { aureal: 10, blood: 2000, souls: 5, experience: 500 },
        mainIngredient: "minecraft:ender_chest",
        inputs: [
            { item: "dungeonsdelight:ancient_egg", amount: 1 },
            { item: "forbidden_arcanus:obsidiansteel_ingot", amount: 2 },
            { item: "modern_industrialization:gold_curved_plate", amount: 5 },
        ],
        result: "enderstorage:ender_chest",
    })
    
    addHephaestusRitual("ender_tank", {
        enhancers: "forbidden_arcanus:maledictus_pact",
        essences: { aureal: 10, blood: 4000, souls: 5, experience: 100 },
        mainIngredient: "modern_industrialization:bronze_tank",
        inputs: [
            { item: "dungeonsdelight:ancient_egg", amount: 1 },
            { item: "forbidden_arcanus:obsidiansteel_ingot", amount: 2 },
            { item: "modern_industrialization:gold_curved_plate", amount: 5 },
        ],
        result: "enderstorage:ender_tank",
        resultCount: 2,
    })
})