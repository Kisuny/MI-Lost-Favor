ServerEvents.recipes(event => {
    const removing_by_recipe_id = [
        "spectrum:smelting/blackslag_ores/iron",
        "spectrum:enchanter/spectrum_books/indestructible",
        "spectrum:blasting/ore/shimmerstone_ores",
        "spectrum:smelting/ore/shimmerstone_ores",
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
    
    event.shapeless('milf:gem_composite', [
        '4x milf:mixed_gem_powder',
    ])
    miMachineRecipe(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:'spectrum:citrine_powder'},],
            [{item: 'spectrum:amethyst_powder'}, ],
            [{item: 'spectrum:topaz_powder'}],
        ],
        outputItems:[[{item:"milf:mixed_gem_powder"}, 2]]
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



})




