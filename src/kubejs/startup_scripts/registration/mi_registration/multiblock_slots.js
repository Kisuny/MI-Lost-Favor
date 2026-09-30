MIMachineEvents.addMultiblockSlots("steam_quarry", event => {
    event.itemInputs.addSlot(38, 53)
})

MIMachineEvents.addMultiblockSlots("electric_quarry", event => {
    event.itemInputs.addSlot(38, 53)
})

MIMachineEvents.addMultiblockSlots("electric_blast_furnace_cupronickel_coil", event => {

    event.itemInputs.addSlot(56, 71)
    // event.itemInputs.addSlot(56, 89)
    // event.itemInputs.addSlot(56, 107)

    event.fluidInputs.addSlot(36, 71)
    //event.fluidInputs.addSlot(36, 107)

    event.itemOutputs.addSlot(102, 53)
    event.itemOutputs.addSlot(102, 71)
    // event.itemOutputs.addSlot(102, 89)
    // event.itemOutputs.addSlot(102, 107)

    event.fluidOutputs.addSlot(122, 71)
    // event.fluidOutputs.addSlot(122, 107)

})

MIMachineEvents.addMultiblockSlots("electric_blast_furnace_kanthal_coil", event => {

    event.itemInputs.addSlot(56, 71)
    event.itemInputs.addSlot(56, 89)
    event.itemInputs.addSlot(56, 107)

    event.fluidInputs.addSlot(36, 71)
    event.fluidInputs.addSlot(36, 107)

    event.itemOutputs.addSlot(102, 53)
    event.itemOutputs.addSlot(102, 71)
    event.itemOutputs.addSlot(102, 89)
    event.itemOutputs.addSlot(102, 107)

    event.fluidOutputs.addSlot(122, 71)
    event.fluidOutputs.addSlot(122, 107)
})