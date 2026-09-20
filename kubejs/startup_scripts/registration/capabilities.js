let $RegisterCapabilitiesEvent = Java.loadClass("net.neoforged.neoforge.capabilities.RegisterCapabilitiesEvent")
let $FluidHandlerItemStack = Java.loadClass("net.neoforged.neoforge.fluids.capability.templates.FluidHandlerItemStack")
let $Capabilities$ItemHandler = Java.loadClass("net.neoforged.neoforge.capabilities.Capabilities$ItemHandler")
let $Capabilities$FluidHandler = Java.loadClass("net.neoforged.neoforge.capabilities.Capabilities$FluidHandler")

NativeEvents.onEvent($RegisterCapabilitiesEvent, event => {

    event.registerItem(
        $FluidHandler.ITEM,
        (stack, _) => new $FluidHandlerItemStack($IEDataComponents.GENERIC_FLUID, stack, $FluidType.BUCKET_VOLUME),
        Item.of("milf:clay_bucket").item
    )

    Object.entries(CLAY_MOLDS).forEach(([moldId, data]) => {
        event.registerItem(
            $FluidHandler.ITEM,
            (stack, _) => new $FluidHandlerItemStack($IEDataComponents.GENERIC_FLUID, stack, data.volume),
            Item.of(`milf:${moldId}`).item
        )
    })

    // console.log("2");
    // console.log(CLAY_CRUCIBLE_TYPE);

    event.registerBlockEntity(
        $Capabilities$ItemHandler.BLOCK,
        CLAY_CRUCIBLE_TYPE.get(),
        (blockEntity, direction) => blockEntity.getItemHandler(),
    )

    event.registerBlockEntity(
        $Capabilities$FluidHandler.BLOCK,
        CLAY_CRUCIBLE_TYPE.get(),
        (blockEntity, direction) => blockEntity.getFluidTank(),
    )


})