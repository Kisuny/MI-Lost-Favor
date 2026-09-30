let InputEvent$MouseScrollingEvent = Java.loadClass("net.neoforged.neoforge.client.event.InputEvent$MouseScrollingEvent")
NativeEvents.onEvent(InputEvent$MouseScrollingEvent, event => {

    let player = Client.player
    if(!player) return
    if(!player.isCrouching()) return
    if (player.getMainHandItem().id != "milf:clunky_drill") return


    milfPlayGUISound("milf:reels_tick")
    player.sendData("milf_clunky_drill_change_mode")
    event.setCanceled(true)
    

})