ServerEvents.recipes(event => {
    
    event.remove({id: "malum:copper_nugget_from_ingot"})
    event.remove({id: "malum:copper_ingot_from_nugget"})

    customPedestalCraft(event, {
        time: 400,
        tier: "complex",
        experience: 1.0,
        citrine: 32,
        topaz: 16,
        amethyst: 12,
        moonstone: 20,
        onyx: 12,
        pattern: [
            'wwq',
            ' ew',
            'e  '
        ],
        key: {
            q: 'malum:refined_soulstone',
            w: 'minecraft:iron_ingot',
            e: "minecraft:stick"
        },
        result: {
            "id": "malum:crude_scythe",
            "count": 1
        },
        advancement: "spectrum:lategame/craft_moonstone_pedestal",
        removeRecipe: true
    })
    
})