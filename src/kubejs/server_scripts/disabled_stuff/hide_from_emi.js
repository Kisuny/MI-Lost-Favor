RecipeViewerEvents.removeEntries('item', event => {
    let itemEntries = global.disabledItems

    itemEntries.forEach(entry => {
        event.remove(entry.id)
    })

    let fluidEntries = global.disabledFluids

    fluidEntries.forEach(entry => {
        
        let bucket = Fluid.of(entry.id).getFluid().bucket
        if (bucket) event.remove(bucket.getId())
        
    })

    
})

RecipeViewerEvents.removeEntries('fluid', event => {
    let fluidEntries = global.disabledFluids

    fluidEntries.forEach(entry => {
        event.remove(entry.id)
    })
})