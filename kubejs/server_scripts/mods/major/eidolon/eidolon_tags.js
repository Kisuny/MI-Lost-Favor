// Recipes use item tags, not block or fluid tags. Even if items representing those are blocks, like minecraft:cobblestone, it still uses an item tag for recipes.
ServerEvents.tags('item', event => {
    const removeItemTags = [
        'eidolon_repraised:lead_ingot', 
        'eidolon_repraised:raw_lead', 
        'eidolon_repraised:lead_nugget', 
        'eidolon_repraised:lead_ore', 
        'eidolon_repraised:deep_lead_ore', 
        'eidolon_repraised:lead_block', 
        'eidolon_repraised:raw_lead_block', 
        'eidolon_repraised:silver_ore', 
        'eidolon_repraised:silver_ingot', 
        'eidolon_repraised:raw_silver', 
        'eidolon_repraised:silver_nugget', 
        'eidolon_repraised:deep_silver_ore', 
        'eidolon_repraised:silver_ore', 
        'eidolon_repraised:silver_block', 
        'eidolon_repraised:raw_silver_block',
        'eidolon_repraised:sulfur',
    ]
    removeItemTags.forEach(item => {
        event.removeAllTagsFrom(item)
    });
    
})

ServerEvents.tags('block', event => {
    const removeItemTags = [
        'eidolon_repraised:lead_ore', 
        'eidolon_repraised:deep_lead_ore', 
        'eidolon_repraised:lead_block', 
        'eidolon_repraised:raw_lead_block', 
        'eidolon_repraised:silver_ore', 
        'eidolon_repraised:deep_silver_ore', 
        'eidolon_repraised:silver_ore', 
        'eidolon_repraised:silver_block', 
        'eidolon_repraised:raw_silver_block'
    ]
    removeItemTags.forEach(item => {
        event.removeAllTagsFrom(item)
    });
})