const customWorktable = (event, args) => {
    event.custom({
        "type": "eidolon_repraised:worktable",
        "pattern": args.pattern,
        "reagents": args.reagents,
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

    event.remove({
        output: [
            'eidolon_repraised:lead_ingot',
            'eidolon_repraised:raw_lead',
            'eidolon_repraised:lead_nugget',
            'eidolon_repraised:lead_ore',
            'eidolon_repraised:deep_lead_ore',
            'eidolon_repraised:lead_block',
            'eidolon_repraised:raw_lead_block',
            'eidolon_repraised:silver_ore',
            'eidolon_repraised:silver_ingot',
            'eidolon_repraised:raw_silver',
            'eidolon_repraised:silver_nugget',
            'eidolon_repraised:deep_silver_ore',
            'eidolon_repraised:silver_ore',
            'eidolon_repraised:silver_block',
            'eidolon_repraised:raw_silver_block',
            'eidolon_repraised:soul_enchanter',
        ]
    })

    customMixingCauldron(event, {
        fluid: "minecraft:water",
        fluidAmount: 1000,
        ingredients: [
            { "item": "minecraft:book" },
            { "item": "toxony:poison_paste" },
            { "item": "minecraft:rotten_flesh" },
            { "item": "minecraft:rotten_flesh" },
            { "item": "minecraft:rotten_flesh" },
            { "item": "minecraft:rotten_flesh" },
            { "item": "minecraft:rotten_flesh" },
            { "item": "toxony:poison_paste" },
        ],
        output: "eidolon_repraised:codex",
        removeRecipe: true
    })

    yTechShaped(event, {
        pattern: [
            " d#",
            " s ",
            "   ",
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "s": { "item": "minecraft:stick" },
            "d": { "item": `modern_industrialization:silver_plate` },
        },
        outputItems: [[{ id: "eidolon_edoni:silver_knife" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

})