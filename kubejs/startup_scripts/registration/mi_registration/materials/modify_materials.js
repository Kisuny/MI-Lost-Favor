// Modifying materials

// Uranium
MIMaterialEvents.modifyMaterial('uranium', event => {
    event.builder
        .addParts('plate')
})

// Steel
MIMaterialEvents.modifyMaterial('steel', event => {
    event.builder
        .addParts('wire')
})

// Lead
MIMaterialEvents.modifyMaterial('lead', event => {
    event.builder
        .addParts('wire', 'bolt', 'rod')
})

// Invar
MIMaterialEvents.modifyMaterial('invar', event => {
    event.builder
        .pipeCasing(8.0)
        .addParts("curved_plate")
})

// Silver
MIMaterialEvents.modifyMaterial('silver', event => {
    event.builder
        .addParts("rod")
})

// Nickel
MIMaterialEvents.modifyMaterial('nickel', event => {
    event.builder
        .addParts("rod")
})

// constantan
MIMaterialEvents.modifyMaterial('constantan', event => {
    event.builder
        .addParts("rod")
})

// Electrum
MIMaterialEvents.modifyMaterial('electrum', event => {
    event.builder
        .addParts("rod")
})

