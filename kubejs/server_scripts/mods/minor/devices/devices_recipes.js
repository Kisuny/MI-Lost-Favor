ServerEvents.recipes(event => {
    
    event.remove({output: "devices:magical_pouch"})
    addHephaestusRitual("magical_pouch", {
        enhancers: "forbidden_arcanus:crimson_stone",
        essences: { aureal: 50, blood: 500, souls: 20, experience: 220 },
        mainIngredient: "devices:devices_pouch",
        inputs: [
            { item: "minecraft:nether_star", amount: 1 },
            { item: "hexerei:infused_fabric", amount: 2 },
            { item: "modern_industrialization:aluminum_plate", amount: 2 },
        ],
        result: "devices:magical_pouch",
    })
    
    customMixingCauldron(event, {
        fluid: "minecraft:water",
        fluidAmount: 1000,
        ingredients: [
            { "item": "enchanted:wool_of_bat" },
            { "item": "hexerei:infused_fabric" },
            { "item": "hexerei:infused_fabric" },
            { "item": "hexerei:infused_fabric" },
            { "item": "minecraft:string" },
            { "item": "hexerei:infused_fabric" },
            { "item": "hexerei:infused_fabric" },
            { "item": "hexerei:infused_fabric" },
        ],
        output: "devices:devices_pouch",
        removeRecipe: true
    })

})