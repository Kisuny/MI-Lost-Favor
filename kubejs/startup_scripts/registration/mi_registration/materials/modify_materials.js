MIMaterialEvents.modifyMaterial('uranium', event => {
    event.builder.addParts('plate', "bolt")
})

MIMaterialEvents.modifyMaterial('steel', event => {
    event.builder.addParts('wire')
})

MIMaterialEvents.modifyMaterial('lead', event => {
    event.builder.addParts('wire', 'bolt', 'rod')
})

MIMaterialEvents.modifyMaterial('invar', event => {
    event.builder
        .pipeCasing(8.0)
        .addParts("curved_plate")
})

MIMaterialEvents.modifyMaterial('silver', event => {
    event.builder.addParts("rod", "bolt")
})

MIMaterialEvents.modifyMaterial('nickel', event => {
    event.builder.addParts("rod", "bolt")
})

MIMaterialEvents.modifyMaterial('constantan', event => {
    event.builder.addParts("rod", "bolt")
})

MIMaterialEvents.modifyMaterial('electrum', event => {
    event.builder.addParts("rod", "bolt")
})

MIMaterialEvents.modifyMaterial('tin', event => {
    event.builder.addParts("large_plate")
})

MIMaterialEvents.modifyMaterial('gold', event => {
    event.builder.addParts("large_plate")
})

MIMaterialEvents.modifyMaterial('copper', event => {
    event.builder.addParts("large_plate")
})

MIMaterialEvents.modifyMaterial('bronze', event => {
    event.builder.addParts("large_plate")
})

