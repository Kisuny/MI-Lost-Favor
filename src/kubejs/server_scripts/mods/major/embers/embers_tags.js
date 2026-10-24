ServerEvents.tags('item', event => {
    
    event.add("embers:reservoir_expansion", [
        'embers:caminite_ring', 
        'embers:caminite_gauge', 
        'embers:caminite_valve',
    ])

    event.removeAllTagsFrom("embers:dawnstone_nugget")

    event.removeAllTagsFrom("embers:dawnstone_plate")

    event.add("c:plates/dawnstone", "modern_industrialization:dawnstone_plate")

    event.add("c:ingots/dawnstone", "modern_industrialization:dawnstone_ingot")

})

ServerEvents.tags('block', event => {

    event.add("embers:reservoir_cap", "embers:reservoir")


})

