ServerEvents.recipes(event => {

    event.remove({
        output: [
            'gag:hearthstone',
        ]
    })

    customShrineRecipe(event, {
        time: 1600,
        experience: 20.0,
        fluid: "spectrum:liquid_crystal",
        ingredients: [
            { "item": "enchanted:attuned_stone_charged", count: 2 },
            { "item": "hexerei:infused_fabric", count: 5 },
            { "item": "minecraft:nautilus_shell", count: 4 },
            { "item": "ars_elemental:curio_bag", count: 1 },
            { "item": "embers:dawnstone_block", count: 1 },
            { "item": "spectrum:raw_azurite", count: 4 },
        ],
        result: {
            "id": "gag:time_sand_pouch",
            "count": 1
        },
        removeRecipe: true,
        advancement: "spectrum:midgame/collect_azurite"
    });
})