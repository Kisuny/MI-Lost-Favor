let $ViewportEvent$RenderFog = Java.loadClass("net.neoforged.neoforge.client.event.ViewportEvent$RenderFog")

NativeEvents.onEvent($ViewportEvent$RenderFog, event => {

    if(Client.level.dimension != "milf:abstraction") return

    event.setNearPlaneDistance(18)
    event.setFarPlaneDistance(20)
    event.setCanceled(true)

})