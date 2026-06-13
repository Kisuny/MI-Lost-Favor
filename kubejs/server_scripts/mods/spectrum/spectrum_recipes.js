ServerEvents.recipes(event => {
    const removing_by_recipe_id = [
        "spectrum:smelting/blackslag_ores/iron",
        "spectrum:enchanter/spectrum_books/indestructible",
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


    customAlchemicalForgeCraft(event, {
        affinities: [
            "toxony:heat",
            "toxony:soul",
            "toxony:decay"
        ],
        auxiliary: [
            {
                "item": "modern_industrialization:bronze_block"
            },
            {
                "item": "enchanted:creeper_heart"
            }
        ],
        main: {
            "item": "neovitae:activation_crystal_weak"
        },
        result: "milf:table_core"
    })
    customAlchemicalForgeCraft(event, {
        affinities: [
            "toxony:heat",
            "toxony:soul",
            "toxony:decay"
        ],
        auxiliary: [
            {
                "item": "spectrum:onyx_block"
            },
            {
                "item": "occultism:demonic_meat"
            }
        ],
        main: {
            "item": "modern_industrialization:electronic_circuit"
        },
        result: "milf:onyx_table_core"
    })
    customAlchemicalForgeCraft(event, {
        affinities: [
            "toxony:heat",
            "toxony:soul",
            "toxony:decay"
        ],
        auxiliary: [
            {
                "item": "spectrum:moonstone_block"
            },
            {
                "item": "occultism:dragonyst_dust"
            }
        ],
        main: {
            "item": "modern_industrialization:processing_unit"
        },
        result: "milf:moonstone_table_core"
    })


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
        ieBlueprintCraft(event, {
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
                [{ "item": "eidolon_repraised:shadow_gem" }, 1],
                [{ "item": gem }, 12]
            ],
            { "item": output }, dyesOfTheOccult
        );
    }
    pedestalBasicCraft('spectrum:pedestal_basic_topaz', 'spectrum:topaz_shard')
    pedestalBasicCraft('spectrum:pedestal_basic_amethyst', 'minecraft:amethyst_shard')
    pedestalBasicCraft('spectrum:pedestal_basic_citrine', 'spectrum:citrine_shard')



})




