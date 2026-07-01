RecipeViewerEvents.removeEntries('item', event => {
    let itemEntries = global.disabledItems

    itemEntries.forEach(entry => {
        event.remove(entry.id)
    })
})