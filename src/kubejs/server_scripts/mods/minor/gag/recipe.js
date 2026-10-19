ServerEvents.recipes(event => {

    event.remove({
        output: [
            'gag:hearthstone',
        ]
    })

    customThaumInfusion(event, {
        catalyst: 'ars_elemental:curio_bag',
        components: 
        [
            'enchanted:attuned_stone_charged', 
            'hexerei:infused_fabric', 
            'hexerei:infused_fabric', 
            'hexerei:infused_fabric', 
            'hexerei:infused_fabric', 
            'minecraft:nautilus_shell', 
            'embers:dawnstone_block', 
            'spectrum:raw_azurite', 
            'spectrum:raw_azurite', 
            'spectrum:raw_azurite', 
        ],
        aspects: { fabrico: 25, instrumentum: 50, motus: 25, machina: 50 },
        instability: 10, 
        research: 'thaumaturge:infusion',
        result: 'gag:time_sand_pouch',
        removeOutput: true,
    })
})