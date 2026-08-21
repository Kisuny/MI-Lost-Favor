ServerEvents.tags('item', event => {

    let itemIds = global.disabledItems.map(entry => entry.id)
    event.removeAllTagsFrom(itemIds)

})

ServerEvents.tags('block', event => {

    let itemIds = global.disabledItems.map(entry => entry.id)
    event.removeAllTagsFrom(itemIds)

})

ServerEvents.tags('fluid', event => {

    let fluidIds = global.disabledFluids.map(entry => entry.id)
    event.removeAllTagsFrom(fluidIds)

})