// Mod compat with starcatcher
ServerEvents.tags('item', event => {
    event.add("tide:fish", "#starcatcher:starcaught_fishes")
    //TODO fix displaying in future 
    // event.add("starcatcher:placeable_in_display", "#tide:fish")
})