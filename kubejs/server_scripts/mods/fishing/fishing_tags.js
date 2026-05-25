// Mod compat with starcatcher
ServerEvents.tags('item', event => {
    event.removeAll('tide:bait_plants')
    event.add("tide:fish", "#starcatcher:starcaught_fishes")
    //TODO fix displaying in future 
    // event.add("starcatcher:placeable_in_display", "#tide:fish")


    event.add("starcatcher:epic_fishes", "spectrum:koi")
    event.add("starcatcher:common_fishes", "spectrum:crawfish")
})