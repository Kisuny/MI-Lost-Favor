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

// max 5 steps - EMI displays more incorrectly
const customCrucible = (event, args) => {
    event.custom({
        "type": "eidolon_repraised:crucible",
        "steps": args.steps,
        "result": {
            "id": args.result,
            "count": args.count || 1
        }
    });
    if (args.removeRecipe) {
        if (args.removeType) {
            event.remove({ output: args.result, type: args.removeType })
        } else {
            event.remove({ output: args.result })
        }
    }
};


ServerEvents.recipes(event => {

    customCrucible(event, {
        steps: [
            {
                items: [
                    { "item": "minecraft:redstone" },
                    { "item": "minecraft:redstone" },
                    { "item": "eidolon_repraised:soul_shard" },
                ]
            },
            {
                items: [
                    { "item": "embers:dawnstone_ingot" },
                    { "item": "embers:dawnstone_ingot" },
                ]
            },
        ],
        result: "eidolon_repraised:arcane_gold_ingot",
        removeRecipe: true,
        removeType : "eidolon_repraised:crucible",
        count: 2
    });

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


    customShrineRecipe(event, {
        time: 400,
        experience: 4.0,
        fluid: "spectrum:liquid_crystal",
        ingredients: [
            { "item": "minecraft:iron_ingot", count: 1 },
            { "item": "modern_industrialization:lead_ingot", count: 1 },
            { "item": "spectrum:vegetal", count: 1 },
        ],
        result: {
            "id": "eidolon_repraised:pewter_blend",
            "count": 4
        },
        removeRecipe: true,
        advancement: "spectrum:lategame/craft_moonstone_pedestal"
    });

    pedestalFromRecipe(event, {
        id: "eidolon_repraised:crucible",
        tier: "complex",
        time: 400,
        experience: 4.0,
        citrine: 8,
        topaz: 8,
        onyx: 2,
        amethyst: 8,
        moonstone: 8,
        advancement: "spectrum:lategame/craft_moonstone_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "eidolon_repraised:worktable",
        tier: "complex",
        time: 400,
        experience: 4.0,
        topaz: 8,
        onyx: 2,
        amethyst: 8,
        moonstone: 8,
        advancement: "spectrum:lategame/craft_moonstone_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "eidolon_repraised:brazier",
        tier: "complex",
        time: 400,
        experience: 4.0,
        onyx: 2,
        amethyst: 8,
        moonstone: 8,
        advancement: "spectrum:lategame/craft_moonstone_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "eidolon_repraised:necrotic_focus",
        tier: "complex",
        time: 400,
        experience: 4.0,
        advancement: "spectrum:lategame/craft_moonstone_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "eidolon_repraised:stone_hand",
        tier: "complex",
        time: 400,
        experience: 4.0,
        advancement: "spectrum:lategame/craft_moonstone_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "eidolon_repraised:goblet",
        tier: "complex",
        time: 200,
        experience: 4.0,
        advancement: "spectrum:lategame/craft_moonstone_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "eidolon_repraised:censer",
        tier: "complex",
        time: 200,
        experience: 4.0,
        advancement: "spectrum:lategame/craft_moonstone_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "eidolon_repraised:wooden_altar",
        tier: "complex",
        time: 200,
        experience: 4.0,
        advancement: "spectrum:lategame/craft_moonstone_pedestal"
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

    customCrucible(event, {
        steps: [
            {
                items: [
                    { "item": "minecraft:coal" },
                ]
            },
            {
                items: [
                    { "item": "minecraft:ghast_tear" },
                    { "item": "eidolon_repraised:death_essence" },
                ],
                stirs: 1,
            },
            {
                items: [
                    { "item": "eidolon_repraised:soul_shard" },
                    { "item": "eidolon_repraised:soul_shard" },
                    { "item": "eidolon_repraised:death_essence" },
                ],
                stirs: 1,
            },
            {
                items: [
                    { "item": "spectrum:pure_malachite" },
                ],
            },
        ],
        result: "eidolon_repraised:shadow_gem",
        removeRecipe: true,
        removeType : "eidolon_repraised:crucible",
        count: 2
    });
    customCrucible(event, {
        steps: [
            {
                items: [
                    { "item": "minecraft:redstone" },
                    { "item": "minecraft:redstone" },
                    { "item": "minecraft:lapis_lazuli" },
                    { "item": "minecraft:lapis_lazuli" },
                ]
            },
            {
                items: [
                    { "item": "eidolon_repraised:soul_shard" },
                    { "item": "eidolon_repraised:soul_shard" },
                    { "item": "eidolon_repraised:soul_shard" },
                    { "item": "eidolon_repraised:soul_shard" },
                ],
                stirs: 2,
            },
            {
                items: [
                    { "item": "spectrum:pure_quartz" },
                ],
            },
        ],
        result: "eidolon_repraised:lesser_soul_gem",
        removeRecipe: true,
        removeType : "eidolon_repraised:crucible",
        count: 2
    });
    
})