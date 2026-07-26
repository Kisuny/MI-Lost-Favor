ServerEvents.recipes(event => {
    event.remove({type:'modern_industrialization:forge_hammer', output: [
        /modern_industrialization:.*_bolt/,
        /modern_industrialization:.*_rod/,
    ]})


    const removing_by_recipe_id = [
        /modern_industrialization:materials\/.*\/forge_hammer\/ingot_to_ring/,
        /modern_industrialization:materials\/.*\/forge_hammer\/double_ingot_to_ring/,
        /modern_industrialization:materials\/.*\/forge_hammer\/ingot_to_curved_plate/,
        /modern_industrialization:materials\/.*\/forge_hammer\/double_ingot_to_curved_plate/
    ]

    removing_by_recipe_id.forEach(id => {
        event.remove({id: id})
    });


    event.recipes.modern_industrialization.forge_hammer('minecraft:iron_ingot', 'ytech:iron_bloom', 5, 1)
})