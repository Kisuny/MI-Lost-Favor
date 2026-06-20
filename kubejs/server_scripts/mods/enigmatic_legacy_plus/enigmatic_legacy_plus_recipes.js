const customCursedShaped = (event, args) => {
    event.custom({
        "type": "enigmaticlegacyplus:cursed_shaped",
        "category": args.category || "equipment",
        "pattern": args.pattern,
        "key": args.key,
        "result": {
            "id": args.result,
            "count": args.count || 1
        }
    });
    if (args.removeRecipe === true) {
        event.remove({ output: args.result });
    }
};

ServerEvents.recipes(event => {

    // const remove_by_id = [
    // ]
    // remove_by_id.forEach(id => {
    //     event.remove({ id: id })
    // });

    event.remove({output: [
        "enigmaticlegacyplus:enchantment_transposer",
        "enigmaticlegacyplus:escape_scroll",
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

    customCursedShaped(event, {
        pattern: [
            "IGI",
            "PXP",
            " I "
        ],
        key: {
            G: { item: "minecraft:glass_pane" },
            I: { item: "minecraft:iron_ingot" },
            P: { item: "milf:recall_concoction" },
            X: { item: "enigmaticlegacyplus:twisted_heart" }
        },
        result: "enigmaticlegacyplus:twisted_mirror",
        removeRecipe: true
    })

})