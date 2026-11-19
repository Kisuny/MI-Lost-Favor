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

    customThaumInfusion(event, {
        catalyst: '#minecraft:bundles',
        components: [
            'minecraft:nether_star',
            'hexerei:infused_fabric',
            'devices:gold_coin',
            'minecraft:ender_pearl',
            'hexerei:infused_fabric',
            'devices:gold_coin'
        ],
        aspects: { desiderium: 32, vacuos: 24, permutatio: 16, praecantatio: 16 },
        instability: 5,
        research: 'thaumaturge:infusion',
        result: 'devices:magical_pouch',
        id: 'thaumaturge:infusion/magical_pouch'
    })

})