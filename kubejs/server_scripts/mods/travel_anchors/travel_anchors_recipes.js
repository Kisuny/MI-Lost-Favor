ServerEvents.recipes(event => {
    event.replaceInput({mod: 'travelanchors'}, 'minecraft:ender_pearl', 'architects_palette:ender_pearl_block')
    event.replaceInput({mod: 'travelanchors'}, 'minecraft:iron_ingot', 'modern_industrialization:steel_plate')
    event.replaceInput({mod: 'travelanchors'}, 'minecraft:emerald', 'enchanted:attuned_stone')

    miMachineRecipe(event, {energy:8, time:200, machine:"modern_industrialization:assembler",
        inputItems:[
            [{item:"architects_palette:ender_pearl_block"}, 4],
            [{item:"modern_industrialization:steel_plate"}, 16],
            [{item:"waystones:warp_stone"}, 1]
        ],
        outputItems:[
            [{item:"travelanchors:travel_anchor"}]
        ],
        removeRecipe:true
    })

});
