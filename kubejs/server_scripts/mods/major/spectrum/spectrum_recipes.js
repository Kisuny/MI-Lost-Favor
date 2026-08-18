ServerEvents.recipes(event => {
    const removing_by_recipe_id = [
        "spectrum:smelting/blackslag_ores/iron",
        "spectrum:enchanter/spectrum_books/indestructible",
        "spectrum:blasting/ore/shimmerstone_ores",
        "spectrum:smelting/ore/shimmerstone_ores",
        "spectrum:pedestal/tier3/pastel_network/provider_node_refined",
        "spectrum:pedestal/tier3/pastel_network/connection_node_refined",
        "spectrum:pedestal/tier3/pastel_network/sender_node_refined",
        "spectrum:pedestal/tier3/pastel_network/storage_node_refined",
        "spectrum:pedestal/tier3/pastel_network/gather_node_refined",
    ]

    removing_by_recipe_id.forEach(id => {
        event.remove({ id: id })
    });

    event.remove({
        output: [
            "spectrum:pedestal_basic_amethyst",
            "spectrum:pedestal_basic_citrine",
            "spectrum:pedestal_basic_topaz",
            "spectrum:pedestal_onyx",
            "spectrum:pedestal_moonstone",
        ]
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ item: 'spectrum:citrine_powder' },],
            [{ item: 'spectrum:amethyst_powder' },],
            [{ item: 'spectrum:topaz_powder' }],
        ],
        outputItems: [[{ item: "milf:mixed_gem_powder" }, 2]]
    })

    milfShapeless(event, {
        inputItems: [
            [{ "item": "milf:mixed_gem_powder" }, 4]
        ],
        outputItems: [[{ "id": "milf:gem_composite" }, 1]]
    })



    miMachineRecipe(event, {
        energy: 4, time: 80, machine: "modern_industrialization:blast_furnace",
        inputItems: [
            [{ item: "spectrum:shimmerstone_gem" }, 2],
            [{ item: "modern_industrialization:steel_ingot" }, 1],
        ],
        outputFluids: [
            [{ fluid: "milf:shimmersteel_essence" }, 300],
        ]
    })

    event.shaped("milf:table_core", [
        "EQE",
        "QWQ",
        "EQE"
    ], {
        Q: "modern_industrialization:bronze_block",
        W: "enchanted:creeper_heart",
        E: "paganbless:runic_charge",
    });

    customPedestalCraft(event, {
        time: 200,
        tier: "simple",
        experience: 8.0,
        pattern: [
            'qwq',
            'ere',
            ' e '
        ],
        key: {
            q: 'spectrum:shimmerstone_gem',
            w: 'spectrum:onyx_shard',
            e: "minecraft:obsidian",
            r: "milf:onyx_table_core"
        },
        result: {
            "id": "spectrum:pedestal_onyx",
            "count": 1
        },
        advancement: "spectrum:create_onyx_shard",
        yield_upgrades: true
    })

    customPedestalCraft(event, {
        time: 200,
        tier: "advanced",
        experience: 16.0,
        pattern: [
            'eee',
            'qrq',
            ' w '
        ],
        key: {
            q: 'spectrum:bismuth_flake',
            w: 'spectrum:polished_onyx',
            e: "spectrum:moonstone_shard",
            r: "milf:moonstone_table_core"
        },
        result: {
            "id": "spectrum:pedestal_moonstone",
            "count": 1
        },
        advancement: "spectrum:lategame/collect_moonstone",
        yield_upgrades: true
    })



    let dyesOfTheOccult = "Dyes of the Occult"
    milfShaped(event, {
        pattern: [
            "wer",
            "tqt",
            "wer"
        ],
        key: {
            q: { item: "milf:blank_blueprint" },
            w: { item: "spectrum:citrine_shard" },
            e: { item: "minecraft:amethyst_shard" },
            r: { item: "spectrum:topaz_shard" },
            t: { item: "enchanted:whiff_of_magic" },

        },
        outputItems: [[{ "components": { "immersiveengineering:blueprint": `${dyesOfTheOccult}` }, "id": "immersiveengineering:blueprint" }, 1]]
    })

    function blueprint_recipe(inputs, output, blueprint) {
        ieBlueprintRecipe(event, {
            inputItems: inputs,
            outputItems: [[output]],
            category: blueprint
        })
    }

    const pedestalBasicCraft = (output, gem) => {
        blueprint_recipe(
            [
                [{ "tag": "immersiveengineering:treated_wood" }, 8],
                [{ "item": "minecraft:polished_diorite" }, 4],
                [{ "item": "milf:table_core" }, 1],
                [{ "item": gem }, 12]
            ],
            { "item": output }, dyesOfTheOccult
        );
    }
    pedestalBasicCraft('spectrum:pedestal_basic_topaz', 'spectrum:topaz_shard')
    pedestalBasicCraft('spectrum:pedestal_basic_amethyst', 'minecraft:amethyst_shard')
    pedestalBasicCraft('spectrum:pedestal_basic_citrine', 'spectrum:citrine_shard')

    // https://github.com/DaFuqs/Spectrum/blob/656a75a5a2a76fa259c1e2596901f06c27717b44/src/main/java/de/dafuqs/spectrum/registries/SpectrumPastelUpgradeSignatures.java
    // spectrum:raw_malachite -> malum:earthen_spirit
    // spectrum:raw_azurite -> malum:aqueous_spirit
    // spectrum:raw_bloodstone -> malum:sacred_spirit
    // spectrum:pure_malachite -> cognition:cognitive_crystal
    // spectrum:pure_azurite -> apotheosis:luminous_crystal_shard
    // spectrum:pure_bloodstone -> malum:strange_crystal
    // spectrum:resonance_shard -> eidolon_repraised:shadow_gem

    const item_nodes = [
        { id: "spectrum:connection_node", count: 8, material: "minecraft:quartz" },
        { id: "spectrum:provider_node", count: 2, material: "minecraft:amethyst_shard", amethyst: 2, },
        { id: "spectrum:sender_node", count: 2, material: "spectrum:citrine_shard", citrine: 2 },
        { id: "spectrum:storage_node", count: 2, material: "spectrum:topaz_shard", topaz: 2 },
        { id: "spectrum:gather_node", count: 2, material: "spectrum:onyx_shard", onyx: 2 },
    ]
    item_nodes.forEach(node => {
        customPedestalCraft(event, {
            time: 200,
            tier: "advanced",
            experience: 2.0,
            pattern: [
                ' r ',
                'rer',
                'qwq'
            ],
            key: {
                q: 'spectrum:polished_calcite',
                w: 'spectrum:polished_basalt',
                e: node.material,
                r: "enchanted:attuned_stone",
            },
            result: {
                "id": node.id,
                "count": node.count
            },
            amethyst: node.amethyst,
            citrine: node.citrine,
            topaz: node.topaz,
            onyx: node.onyx,
            advancement: "spectrum:unlocks/blocks/pastel_network",
            removeRecipe: true
        })
    });
    const fluid_nodes = [
        { id: "spectrum:fluid_provider_node", count: 2, material: "minecraft:amethyst_shard", amethyst: 2, },
        { id: "spectrum:fluid_sender_node", count: 2, material: "spectrum:citrine_shard", citrine: 2 },
        { id: "spectrum:fluid_storage_node", count: 2, material: "spectrum:topaz_shard", topaz: 2 },
        { id: "spectrum:fluid_gather_node", count: 2, material: "spectrum:onyx_shard", onyx: 2 },
    ]
    fluid_nodes.forEach(node => {
        customPedestalCraft(event, {
            time: 200,
            tier: "advanced",
            experience: 2.0,
            pattern: [
                ' t ',
                'rer',
                'qwq'
            ],
            key: {
                q: 'spectrum:polished_calcite',
                w: 'spectrum:polished_basalt',
                e: node.material,
                r: "enchanted:attuned_stone",
                t: "minecraft:glass_bottle",
            },
            result: {
                "id": node.id,
                "count": node.count
            },
            amethyst: node.amethyst,
            citrine: node.citrine,
            topaz: node.topaz,
            onyx: node.onyx,
            advancement: "spectrum:unlocks/blocks/pastel_network",
            removeRecipe: true
        })
    });
    
    const omni_nodes = [
        { id: "spectrum:omni_provider_node", count: 2, amethyst: 2, },
        { id: "spectrum:omni_sender_node", count: 2, citrine: 2 },
        { id: "spectrum:omni_storage_node", count: 2, topaz: 2 },
        { id: "spectrum:omni_gather_node", count: 2, onyx: 2 },
    ]
    omni_nodes.forEach((node, i) => {
        customPedestalCraftShapeless(event, {
            time: 200,
            tier: "advanced",
            experience: 2.0,
            ingredients: [
                { item: item_nodes[i + 1].id },
                { item: fluid_nodes[i].id },
                { item: "malum:refined_soulstone" },
            ],
            result: {
                "id": node.id,
                "count": node.count
            },
            amethyst: node.amethyst,
            citrine: node.citrine,
            topaz: node.topaz,
            onyx: node.onyx,
            advancement: "spectrum:unlocks/blocks/pastel_network",
            removeRecipe: true
        })
    });


})




