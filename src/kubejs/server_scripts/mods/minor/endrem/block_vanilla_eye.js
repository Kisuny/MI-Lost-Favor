BlockEvents.rightClicked("minecraft:end_portal_frame", event => {
    if (event.item.id != "minecraft:ender_eye") return
    event.player.setStatusMessage(Text.translatable("block.endrem.ender_eye.warning"))
    event.cancel()
})
