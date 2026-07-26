//requires: roots
ServerEvents.tags('item', event => {
    event.removeAllTagsFrom([
        'roots:silver_nugget', 
        'roots:silver_ingot', 
        'roots:raw_silver', 
        'roots:silver_block', 
        'roots:raw_silver_block', 
        'roots:deepslate_silver_ore', 
        'roots:silver_ore',
        'roots:copper_nugget',
    ])
})