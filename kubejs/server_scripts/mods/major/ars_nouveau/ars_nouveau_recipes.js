ServerEvents.recipes(event => {
    const removing_by_recipe_id = [
        "ars_nouveau:archwood_to_chest",
        "starbunclemania:fluid/lava_to_source",
        "starbunclemania:fluid/milk_to_source",
        "ars_elemental:caster_bag",
        "ars_nouveau:apprentice_book_upgrade",
        "ars_nouveau:archmage_book_upgrade",
        "ars_nouveau:novice_spellbook_alt",
        "ars_nouveau:novice_spell_book",
    ]

    removing_by_recipe_id.forEach(id => {
        event.remove({ id: id })
    });

    event.remove({ type: "ars_nouveau:enchantment" })
    event.remove({ type: "ars_nouveau:reactive_enchantment" })
    event.remove({ output: "ars_additions:handy_haversack" })
    event.remove({output: [
        "ars_additions:handy_haversack",
        "ars_nouveau:mycelial_sourcelink",
        "ars_nouveau:agronomic_sourcelink",
        "ars_nouveau:vitalic_sourcelink",
        "ars_nouveau:alchemical_sourcelink",
        "ars_additions:source_spawner",
        "ars_nouveau:stable_warp_scroll",
        "ars_controle:scroll_holder",
        "ars_nouveau:warp_scroll",
    ]})

    //remove all glyphs recipes 
    Ingredient.of('#milf:glyphs').itemIds.forEach(glyph => {
        event.remove({output: glyph})
    })

    event.remove({
        output: [
            "ars_nouveau:volcanic_sourcelink",
            "ars_nouveau:dowsing_rod",
        ]
    })
    event.shaped("ars_nouveau:dowsing_rod", [
        " Q ",
        "WRW",
        "   "
    ], {
        Q: "minecraft:gold_ingot",
        W: "#minecraft:planks",
        R: "enchanted:whiff_of_magic",
    });

    event.remove({ output: "ars_elemental:curio_bag" })
    event.shaped("ars_elemental:curio_bag", [
        "CFC",
        "BAB",
        "DBD"
    ], {
        C: "modern_industrialization:iron_rod",
        B: "hexerei:infused_fabric",
        D: "modern_industrialization:iron_large_plate",
        A: "#c:chests",
        F: "enchanted:creeper_heart"
    });

    milfShaped(event, {
        pattern: [
            "trt",
            "eqe",
            "ewe"
        ],
        key: {
            q: { item: "minecraft:writable_book" },
            w: { item: "paganbless:runic_charge" },
            e: { item: "hexerei:infused_fabric" },
            r: { item: "minecraft:amethyst_shard" },
            t: { item: "crittersandcompanions:silk" },
        },
        outputItems: [[{ "id": "ars_nouveau:annotated_codex" }, 1]],
        removeRecipe: true,
        compatOff: true
    })

    event.replaceInput({ output: 'ars_nouveau:imbuement_chamber' }, 'minecraft:gold_ingot', 'embers:dawnstone_plate')

    customPedestalCraft(event, {
        time: 400,
        tier: "advanced",
        experience: 1.0,
        citrine: 2,
        topaz: 5,
        onyx: 2,
        pattern: [
            'wqw',
            'ere',
            'wqw'
        ],
        key: {
            q: 'minecraft:blaze_powder',
            w: 'minecraft:gold_block',
            e: "spectrum:vegetal",
            r: "ars_elemental:curio_bag",
        },
        result: {
            "id": "ars_elemental:caster_bag",
            "count": 1
        },
        advancement: "spectrum:create_onyx_shard"
    })


    customPedestalCraft(event, {
        time: 200,
        tier: "basic",
        experience: 2.0,
        citrine: 4,
        topaz: 8,
        amethyst: 12,
        pattern: [
            ' ew',
            ' qe',
            'r  '
        ],
        key: {
            q: 'paganbless:black_thorn_staff',
            w: "enchanted:attuned_stone",
            e: "#c:plates/dawnstone",
            r: "embers:dawnstone_ingot",
        },
        result: {
            "id": "ars_nouveau:dominion_wand",
            "count": 1
        },
        advancement: "spectrum:place_pedestal",
        removeRecipe: true
    })

    customPedestalCraft(event, {
        time: 1200,
        tier: "basic",
        experience: 2.0,
        citrine: 12,
        topaz: 2,
        amethyst: 8,
        pattern: [
            'wtw',
            'yqy',
            'ere'
        ],
        key: {
            q: 'minecraft:lectern',
            w: "embers:dawnstone_ingot",
            e: "#c:plates/dawnstone",
            r: "immersiveengineering:steel_fence",
            t: "minecraft:heavy_weighted_pressure_plate",
            y: "enchanted:attuned_stone",
        },
        result: {
            "id": "ars_nouveau:storage_lectern",
            "count": 1
        },
        advancement: "spectrum:place_pedestal",
        removeRecipe: true
    })

    customPedestalCraft(event, {
        time: 400,
        tier: "simple",
        experience: 1.0,
        citrine: 2,
        topaz: 5,
        pattern: [
            'wtw',
            'wrw',
            'wqw'
        ],
        key: {
            q: 'ytech:millstone',
            w: 'ars_nouveau:source_gem',
            r: "minecraft:writable_book",
            t: "ytech:bronze_anvil",
        },
        result: {
            id: "ars_elemental:anima_caster_tome",
            count: 1,
            components: {
                custom_name: '{"color":"gray","text":"Hephaestus Touch"}',
                "sauce:school_tome_caster": {
                    flavor_text: "A gift from the <magic>ancient smith</magic>, reducing matter to its primordial form",
                    spells: {
                        0: {
                            color: { b: 127, g: 127, id: "ars_nouveau:constant", r: 127 },
                            name: "Leshy's Mercy",
                            particleTimeline: {
                                "ars_nouveau:touch": {
                                    onResolvingEffect: {
                                        motion: { propMap: {}, type: "ars_nouveau:burst" },
                                        particleOptions: {
                                            properties: {
                                                "ars_nouveau:density": { density: 10, radius: 0.1, spawnType: "SPHERE" },
                                                "ars_nouveau:emitter": { age: 0, rotation: { x: 0.0, y: 0.0 } },
                                                "ars_nouveau:particle_type": {
                                                    particleType: "ars_nouveau:campfire_cosy_smoke",
                                                    subProperties: {
                                                        "ars_nouveau:color": {
                                                            particleColor: { b: 127, g: 127, id: "ars_nouveau:constant", r: 127 },
                                                            tintDisabled: 1
                                                        }
                                                    }
                                                }
                                            },
                                            type: "ars_nouveau:campfire_cosy_smoke"
                                        }
                                    },
                                    resolveSound: { sound: { pitch: 0.45, sound: { id: "ars_nouveau:mace_smash_air" } } },
                                    type: "ars_nouveau:touch"
                                }
                            },
                            recipe: ["ars_nouveau:glyph_touch", "ars_nouveau:glyph_crush", "ars_nouveau:glyph_sensitive"],
                            sound: {}
                        }
                    }
                }
            }
        },
        advancement: "spectrum:place_pedestal"
    })


    miMachineRecipe(event, {energy:2, time:40, machine:"modern_industrialization:source_alembic",
        inputItems:[
            [{tag:"milf:basic_gemstone_shards"}, 6],
        ],
        inputFluids: [
            [{ fluid: "supplementaries:lumisene" }, 200]
        ],
        outputFluids: [
            [{ fluid: "milf:ethereal_source" }, 500]
        ],
    })

    customMixingCauldron(event, {
        fluid: "minecraft:water",
        fluidAmount: 1000,
        ingredients: [
            { "item": "eidolon_repraised:parchment" },
            { "tag": "hexerei:flower_biproduct" },
            { "tag": "hexerei:flower_biproduct" },
            { "tag": "hexerei:flower_biproduct" },
            { "item": "paganbless:runic_charge" },
            { "tag": "hexerei:flower_biproduct" },
            { "tag": "hexerei:flower_biproduct" },
            { "tag": "hexerei:flower_biproduct" },
        ],
        output: "ars_additions:codex_entry"
    })

    customPedestalCraft(event, {
        time: 1000,
        tier: "basic",
        experience: 2.0,
        citrine: 12,
        topaz: 12,
        amethyst: 24,
        pattern: [
            'qwe',
            'rt ',
            '   '
        ],
        key: {
            q: 'minecraft:book',
            w: "ytech:bronze_pickaxe",
            e: "ytech:bronze_axe",
            r: "ytech:bronze_sword",
            t: "ytech:bronze_shovel",
        },
        result: {
            "id": "ars_nouveau:novice_spell_book",
            "count": 1
        },
        advancement: "spectrum:place_pedestal"
    })

})