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
        "enigmaticlegacyplus:magnet_ring",
        "enigmaticlegacyplus:dislocation_ring",
    ]})

    ytechBlockHitCraft(event,{
        inputItems:[[{item:"rocks:cobblestone_splitter"}]],
        outputItems:[[{id:"enigmaticlegacyplus:cursed_ring"}]],
        block:{tag : "c:stones"},
        compatOff:true
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

    //
    customMixingCauldron(event, {
        fluid: "minecraft:water",
        fluidAmount: 1000,
        ingredients: [
            { "item": "milf:recall_concoction" },
            { "tag": "hexerei:flower_biproduct" },
            { "item": "minecraft:fermented_spider_eye" },
            { "tag": "spectrum:gemstone_shards" },
            { "tag": "spectrum:gemstone_shards" },
            { "tag": "spectrum:gemstone_shards" },
            { "item": "minecraft:fermented_spider_eye" },
            { "tag": "hexerei:flower_biproduct" }
        ],
        output: "enigmaticlegacyplus:wormhole_potion",
        amount: 2,
    })
})