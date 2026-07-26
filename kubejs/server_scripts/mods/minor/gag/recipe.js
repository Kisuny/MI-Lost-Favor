ServerEvents.recipes(event => {

    event.remove({
        output: [
            'gag:hearthstone',
        ]
    })


    customWorktable(event, {
        pattern: [
            "wrw",
            "ueu",
            "uuu"
        ],
        reagents: ["tttt"],
        key: {
            "w": { "item": "enchanted:attuned_stone_charged" },
            "e": { "item": "ars_elemental:curio_bag" },
            "r": { "item": "eidolon_repraised:arcane_gold_block" },
            "u": { "item": "hexerei:infused_fabric" },
            "t": { "item": "minecraft:nautilus_shell" },
        },
        result: "gag:time_sand_pouch",
        removeRecipe: true
    })
})