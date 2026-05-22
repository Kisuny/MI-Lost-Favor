ServerEvents.recipes(event => {
    
    event.remove({output: "devices:magical_pouch"})

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