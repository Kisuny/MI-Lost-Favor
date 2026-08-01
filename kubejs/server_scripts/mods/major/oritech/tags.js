ServerEvents.tags('item', event => {
    event.remove('c:ingots/steel', "oritech:biosteel_ingot")
})

ServerEvents.tags('fluid', event => {
    event.remove('c:biodiesel', "oritech:still_biofuel")
})