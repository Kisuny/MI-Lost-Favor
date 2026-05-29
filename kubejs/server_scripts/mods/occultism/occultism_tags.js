// Recipes use item tags, not block or fluid tags. Even if items representing those are blocks, like minecraft:cobblestone, it still uses an item tag for recipes.
ServerEvents.tags('item', event => {
    const removeItemTags = [
        'occultism:silver_ingot', 
        'occultism:silver_nugget', 
        'occultism:raw_silver', 
        'occultism:silver_dust',
        'occultism:gold_dust',
        'occultism:silver_ore', 
        'occultism:silver_ore_deepslate',
        'occultism:silver_block',
        'occultism:raw_silver_block',
        'occultism:copper_dust',
        'occultism:iron_dust',
        'occultism:lapis_dust',
        'occultism:emerald_dust',
        "occultism:netherite_dust"
    ]
    removeItemTags.forEach(item => {
        event.removeAllTagsFrom(item)
    });
    
})

ServerEvents.tags('block', event => {
    const removeItemTags = [
        'occultism:silver_ore', 
        'occultism:silver_ore_deepslate',
        'occultism:silver_block',
        'occultism:raw_silver_block',
    ]
    removeItemTags.forEach(item => {
        event.removeAllTagsFrom(item)
    });
})