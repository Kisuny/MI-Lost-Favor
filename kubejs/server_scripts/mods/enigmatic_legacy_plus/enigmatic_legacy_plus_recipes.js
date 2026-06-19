// Remove IE recipes
ServerEvents.recipes(event => {

    // const remove_by_id = [
    // ]
    // remove_by_id.forEach(id => {
    //     event.remove({ id: id })
    // });

    event.remove({output: [
        "enigmaticlegacyplus:enchantment_transposer",
    ]})

    milfShaped(event, {
        pattern: [
            " q ",
            "qwq",
            " q "
        ],
        key: {
            q: { item: "minecraft:bone" },
            w: { item: "ytech:leather_strips" }
        },
        outputItems: [[{ id: "enigmaticlegacyplus:cursed_ring" }, 1]]
    })
})