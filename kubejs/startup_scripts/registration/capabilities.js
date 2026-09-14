let $RegisterCapabilitiesEvent = Java.loadClass("net.neoforged.neoforge.capabilities.RegisterCapabilitiesEvent")
let $FluidHandlerItemStack = Java.loadClass("net.neoforged.neoforge.fluids.capability.templates.FluidHandlerItemStack")

NativeEvents.onEvent($RegisterCapabilitiesEvent, event => {

    event.registerItem(
        $FluidHandler.ITEM,
        (stack, _) => new $FluidHandlerItemStack($IEDataComponents.GENERIC_FLUID, stack, $FluidType.BUCKET_VOLUME),
        Item.of("milf:clay_bucket").item
    )

})