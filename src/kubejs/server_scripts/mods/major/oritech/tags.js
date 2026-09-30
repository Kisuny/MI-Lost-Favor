ServerEvents.tags('item', event => {
    event.remove('c:ingots/steel', "oritech:biosteel_ingot")
    event.remove('c:plates/plastic', "oritech:plastic_sheet")
})

ServerEvents.tags('fluid', event => {
    event.remove('c:biodiesel', "oritech:still_biofuel")
    
})