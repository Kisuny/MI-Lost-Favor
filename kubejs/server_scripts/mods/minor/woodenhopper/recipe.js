ServerEvents.recipes(event => {
    event.remove({ output: "woodenhopper:wooden_hopper" })

    event.shaped(
        Item.of('woodenhopper:wooden_hopper', 1),
        [
            "W W",
            "WCW",
            " W "
        ],
        {
            W: "#minecraft:planks",
            C: "ytech:wooden_box"
        }
    )
})