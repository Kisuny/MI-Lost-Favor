MIRegistrationEvents.registerCableTiers(event => {
    event.register(
        "ie",
        "IE",
        "Insufficient Electricity",
        16,
        "immersiveengineering:block/metal_decoration/redstone_engineering",
    )

    event.register(
        "basic",
        "BE",
        "Basic Electricity",
        1,
        "oritech:block/machine_extender",
    )
})

MIMachineEvents.registerHatches(event => {
    event.energy("ie")
    event.energy("basic")
})