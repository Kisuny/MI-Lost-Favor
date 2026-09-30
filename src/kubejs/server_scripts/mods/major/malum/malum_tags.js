ServerEvents.tags('item', event => {

    event.removeAllTagsFrom([
        'malum:copper_nugget',
    ])

    global.miImpetusMaterials.forEach(material => {
        event.add('malum:impetus', `modern_industrialization:${material}_impetus`)
        event.add('malum:metal_impetus', `modern_industrialization:${material}_impetus`)
        event.add('malum:fractured_impetus', `modern_industrialization:${material}_fractured_impetus`)
        event.add('malum:fractured_metal_impetus', `modern_industrialization:${material}_fractured_impetus`)
        event.add('malum:metal_nodes', `modern_industrialization:${material}_node`)
    })

})

