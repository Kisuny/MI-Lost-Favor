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
            "item": "enchanted:attuned_stone_charged"
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
            "item": "immersiveengineering:component_steel"
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
            "item": "modern_industrialization:electronic_circuit"
        },
        result: "milf:moonstone_table_core"
    })

    const pedestalBasicCraft = (output, gem) => {
        event.shaped(output, [
            'eee',
            'wrw',
            'wqw'
        ], {
            q: '#minecraft:planks',
            w: 'minecraft:tuff',
            e: gem,
            r: "milf:table_core",
        })
    }
    pedestalBasicCraft('spectrum:pedestal_basic_topaz', 'spectrum:topaz_shard')
    pedestalBasicCraft('spectrum:pedestal_basic_amethyst', 'minecraft:amethyst_shard')
    pedestalBasicCraft('spectrum:pedestal_basic_citrine', 'spectrum:citrine_shard')


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

})




