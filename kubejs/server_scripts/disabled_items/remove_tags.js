ServerEvents.tags('item', event => {

    let itemIds = global.disabledItems.map(entry => entry.id)
    event.removeAllTagsFrom(itemIds)

})