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

    miMachineRecipe(event, {
        energy: 2, time: 40, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ item: "spectrum:vegetal" }, 1],
            [{ tag: "c:ingots/lead" }, 1],
            [{ tag: "c:ingots/iron" }, 1],
        ],
        outputItems: [[{ item: "eidolon_repraised:pewter_blend" }, 2]],
        removeRecipe: true
    });

    customPedestalCraft(event, {
        time: 400,
        tier: "advanced",
        experience: 4.0,
        citrine: 16,
        topaz: 16,
        amethyst: 16,
        onyx: 4,
        pattern: [
            'eqe',
            'qwq',
            'eqe'
        ],
        key: {
            q: 'toxony:poison_paste',
            w: 'minecraft:book',
            e: 'minecraft:rotten_flesh',
        },
        result: {
            "id": "eidolon_repraised:codex",
            "count": 1
        },
        advancement: "spectrum:create_onyx_shard",
        removeRecipe: true
    });

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


    miMachineRecipe(event, {
        energy: 4, time: 200, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ item: "minecraft:paper" }, 3],
            [{ item: "eidolon_repraised:enchanted_ash" }, 1],
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 100]
        ],
        outputItems: [
            [{ item: "eidolon_repraised:parchment" }, 4]
        ],
        removeRecipe: true
    })

})