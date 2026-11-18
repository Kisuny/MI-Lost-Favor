EntityJSEvents.attributes(event => {
    Array.of(
        "ytech:deer",
        "ytech:aurochs"
    ).forEach(mobId => {
        event.modify(mobId, attributes => {
            attributes.add("minecraft:generic.movement_speed", 0.17)
        })
    })
})
