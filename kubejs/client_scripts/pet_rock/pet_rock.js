ItemEvents.firstRightClicked("milf:pet_rock", event => {
    if(!event.player.isCreative()) return
    Client.setScreen(PetRockScreen())
})