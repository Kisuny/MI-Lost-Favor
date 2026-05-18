// Remove & add tags from IE items
ServerEvents.tags('item', event => {

    event.removeAllTagsFrom([
        /immersiveengineering:.*coke.*/,
        /immersiveengineering:plate.*/,
        /immersiveengineering:wire.*/,
        /immersiveengineering:stick.*/,
        /immersiveengineering:dust.*/,
        /immersiveengineering:ingot.*/,
        /immersiveengineering:raw.*/,
        /immersiveengineering:nugget.*/,
        'immersiveengineering:deepslate_ore_silver',
        'immersiveengineering:ore_silver',
        'immersiveengineering:ore_aluminum', 
        'immersiveengineering:deepslate_ore_aluminum', 
        'immersiveengineering:ore_lead', 
        'immersiveengineering:deepslate_ore_lead', 
        'immersiveengineering:ore_silver', 
        'immersiveengineering:ore_nickel', 
        'immersiveengineering:deepslate_ore_silver', 
        'immersiveengineering:deepslate_ore_nickel', 
        'immersiveengineering:ore_uranium', 
        'immersiveengineering:deepslate_ore_uranium',
        /immersiveengineering:storage_.*/,
        /immersiveengineering:slab_storage_.*/,
        /immersiveposts:stick_.*/,
    
    ])

    event.add('c:rods/treated_wood','immersiveengineering:stick_treated')

    event.add('milf:accumulator', ['immersiveengineering:capacitor_mv', 'immersiveengineering:capacitor_lv', 'immersiveengineering:capacitor_hv'])
    event.add('milf:metal_fences', ['immersiveposts:fence_uranium', 'immersiveposts:fence_iron', 'immersiveposts:fence_gold', 'immersiveposts:fence_copper', 'immersiveposts:fence_lead', 'immersiveposts:fence_silver', 'immersiveposts:fence_nickel', 'immersiveposts:fence_constantan', 'immersiveposts:fence_electrum'])

})

ServerEvents.tags('block', event => {
    event.removeAllTagsFrom([
        /immersiveengineering:.*coke.*/,
        /immersiveengineering:plate.*/,
        /immersiveengineering:wire.*/,
        /immersiveengineering:stick.*/,
        /immersiveengineering:dust.*/,
        /immersiveengineering:ingot.*/,
        /immersiveengineering:raw.*/,
        /immersiveengineering:nugget.*/,
        'immersiveengineering:deepslate_ore_silver',
        'immersiveengineering:ore_silver',
        'immersiveengineering:ore_aluminum', 
        'immersiveengineering:deepslate_ore_aluminum', 
        'immersiveengineering:ore_lead', 
        'immersiveengineering:deepslate_ore_lead', 
        'immersiveengineering:ore_silver', 
        'immersiveengineering:ore_nickel', 
        'immersiveengineering:deepslate_ore_silver', 
        'immersiveengineering:deepslate_ore_nickel', 
        'immersiveengineering:ore_uranium', 
        'immersiveengineering:deepslate_ore_uranium'
    
    ])
})

// Remove & add tags from IE fluids
ServerEvents.tags('fluid', event => {

    event.removeAllTagsFrom([
        // 'immersiveengineering:ethanol',
        // 'immersiveengineering:biodiesel',
        'immersiveengineering:creosote'
    ])
})
