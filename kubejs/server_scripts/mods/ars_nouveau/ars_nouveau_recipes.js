ServerEvents.recipes(event => {
    const removing_by_recipe_id = [
        "ars_nouveau:archwood_to_chest",
        "starbunclemania:fluid/lava_to_source",
        "starbunclemania:fluid/milk_to_source",
        "ars_elemental:caster_bag",
        "ars_nouveau:apprentice_book_upgrade",
        "ars_nouveau:archmage_book_upgrade",
    ]

    removing_by_recipe_id.forEach(id => {
        event.remove({ id: id })
    });

    event.remove({ type: "ars_nouveau:enchantment" })
    event.remove({ type: "ars_nouveau:reactive_enchantment" })
    event.remove({ output: "ars_nouveau:novice_spell_book" })
    event.remove({ output: "ars_nouveau:scribes_table" })
    event.remove({ output: "ars_additions:handy_haversack" })
    event.remove({output: [
        "ars_nouveau:novice_spell_book",
        "ars_nouveau:scribes_table",
        "ars_additions:handy_haversack",
        "ars_nouveau:mycelial_sourcelink",
        "ars_nouveau:agronomic_sourcelink",
        "ars_nouveau:vitalic_sourcelink",
        "ars_nouveau:alchemical_sourcelink",
    ]})
    addHephaestusRitual("apprentice_spell_book", {
        enhancers: "forbidden_arcanus:elementarium",
        essences: { aureal: 500, blood: 5000, souls: 2, experience: 100 },
        mainIngredient: "ars_nouveau:novice_spell_book",
        inputs: [
            { item: "occultism:dragonyst_dust", amount: 1 },
            { item: "forbidden_arcanus:obsidiansteel_ingot", amount: 7 },
        ],
        result: "ars_nouveau:apprentice_spell_book",
    })

    addHephaestusRitual("archmage_book_upgrade", {
        enhancers: "forbidden_arcanus:elementarium",
        essences: { aureal: 1000, blood: 30000, souls: 150, experience: 2500 },
        mainIngredient: "ars_nouveau:apprentice_spell_book",
        inputs: [
            { item: "ars_nouveau:wilden_tribute", amount: 1 },
            { item: "minecraft:nether_star", amount: 1 },
            { item: "minecraft:totem_of_undying", amount: 1 },
            { item: "ars_nouveau:source_gem_block", amount: 1 },
            { item: "spectrum:moonstruck_nectar", amount: 1 },
        ],
        forgeTier: 4,
        result: "ars_nouveau:archmage_spell_book",
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

    const glyphIngredientReplacementsForTier1AndTier2 = {
        'ars_nouveau:earth_essence': 'enchanted:breath_of_the_goddess',
        'ars_nouveau:air_essence': 'enchanted:flying_ointment',
        'ars_nouveau:wilden_wing': 'enchanted:wool_of_bat',
        'ars_nouveau:water_essence': 'enchanted:brew_of_the_depths',
        'ars_nouveau:conjuration_essence': 'enchanted:happenstance_oil',
        'ars_nouveau:abjuration_essence': 'enchanted:soul_of_the_world',
        'ars_nouveau:manipulation_essence': 'modern_industrialization:wrench',
        'ars_nouveau:runic_chalk': 'enchanted:ritual_chalk',
        'ars_nouveau:fire_essence': 'enchanted:fire_poppet',
        'starbunclemania:fluid_jar': 'modern_industrialization:bronze_fluid_input_hatch',
        'ars_nouveau:magebloom': 'minecraft:torchflower',
        'sauce:anima_essence': 'occultism:cruelty_essence',
    }

    Ingredient.of('#ars_nouveau:tier_1_glyphs').itemIds.forEach(glyph => {
        event.forEachRecipe({ type: 'ars_nouveau:glyph', output: glyph }, recipe => {
            const data = JSON.parse(recipe.json.toString())

            recipe.remove()

            const newInputs = data.inputs
                .concat([{ item: 'milf:glyph_frame_t1' }])
                .map(input => {
                    if (input.item && glyphIngredientReplacementsForTier1AndTier2[input.item]) {
                        return { item: glyphIngredientReplacementsForTier1AndTier2[input.item] }
                    }
                    return input
                })

            event.custom({
                type: 'ars_nouveau:glyph',
                exp: data.exp,
                inputs: newInputs,
                output: data.output
            })
        })
    })
    Ingredient.of('#ars_nouveau:tier_2_glyphs').itemIds.forEach(glyph => {
        event.forEachRecipe({ type: 'ars_nouveau:glyph', output: glyph }, recipe => {
            const data = JSON.parse(recipe.json.toString())

            recipe.remove()

            const newInputs = data.inputs
                .concat([{ item: 'milf:glyph_frame_t2' }])
                .map(input => {
                    if (input.item && glyphIngredientReplacementsForTier1AndTier2[input.item]) {
                        return { item: glyphIngredientReplacementsForTier1AndTier2[input.item] }
                    }
                    return input
                })

            event.custom({
                type: 'ars_nouveau:glyph',
                exp: data.exp,
                inputs: newInputs,
                output: data.output
            })
        })
    })

    Ingredient.of('#ars_nouveau:tier_3_glyphs').itemIds.forEach(glyph => {
        event.forEachRecipe({ type: 'ars_nouveau:glyph', output: glyph }, recipe => {
            const data = JSON.parse(recipe.json.toString())

            recipe.remove()

            const newInputs = data.inputs.concat([{ item: 'milf:glyph_frame_t3' }])

            event.custom({
                type: 'ars_nouveau:glyph',
                exp: data.exp,
                inputs: newInputs,
                output: data.output
            })
        })
    })

    customAlchemicalForgeCraft(event, {
        affinities: [
            "toxony:decay",
            "toxony:soul",
            "toxony:wind"
        ],
        auxiliary: [
            {
                "item": "paganbless:runic_charge"
            },
            {
                "item": "paganbless:athame"
            }
        ],
        main: {
            "item": "minecraft:writable_book"
        },
        result: "ars_nouveau:novice_spell_book"
    })
    customAlchemicalForgeCraft(event, {
        affinities: [
            "toxony:soul",
            "toxony:forest",
            "toxony:ocean"
        ],
        auxiliary: [
            {
                "item": "thaumon:research_notes"
            },
            {
                "item": "supplementaries:antique_ink"
            }
        ],
        main: {
            "item": "minecraft:cartography_table"
        },
        result: "ars_nouveau:scribes_table"
    })

    milfShaped(event, {
        pattern: [
            "QQQ",
            "QWQ",
            "QQQ"
        ],
        key: {
            Q: { item: "minecraft:paper" },
            W: { item: "paganbless:runic_charge" }
        },
        outputItems: [[{ "id": "milf:glyph_frame_t1" }, 1]]
    })
    milfShaped(event, {
        pattern: [
            "WQW",
            "QEQ",
            "WQW"
        ],
        key: {
            Q: { item: "occultism:iesnium_nugget" },
            W: { item: "cognition:fluorescent_jelly" },
            E: { item: "milf:glyph_frame_t1" },
        },
        outputItems: [[{ "id": "milf:glyph_frame_t2" }, 1]]
    })
    milfShaped(event, {
        pattern: [
            "WQW",
            "QEQ",
            "WQW"
        ],
        key: {
            Q: { item: "spectrum:paltaeria_fragments" },
            W: { item: "spectrum:stratine_fragments" },
            E: { item: "milf:glyph_frame_t2" },
        },
        outputItems: [[{ "id": "milf:glyph_frame_t3" }, 1]]
    })
    milfShaped(event, {
        pattern: [
            "trt",
            "eqe",
            "ewe"
        ],
        key: {
            q: { item: "minecraft:writable_book" },
            w: { item: "paganbless:runic_charge" },
            e: { item: "toxony:toxic_leather" },
            r: { item: "minecraft:amethyst_shard" },
            t: { item: "crittersandcompanions:silk" },
        },
        outputItems: [[{ "id": "ars_nouveau:annotated_codex" }, 1]],
        removeRecipe: true,
        compatOff: true
    })

    customPedestalCraft(event, {
        time: 1000,
        tier: "complex",
        experience: 2.0,
        citrine: 16,
        topaz: 4,
        amethyst: 2,
        moonstone: 20,
        onyx: 8,
        pattern: [
            'ewe',
            'eqe',
            'ewe'
        ],
        key: {
            q: 'spectrum:bismuth_crystal',
            w: 'spectrum:pure_gold',
            e: "ars_nouveau:archwood_planks"
        },
        result: {
            "id": "ars_nouveau:imbuement_chamber",
            "count": 1
        },
        advancement: "spectrum:lategame/collect_pure_resource",
        removeRecipe: true
    })

    miMachineCraft(event, {energy:2, time:100,
        inputItems:[
            [{tag: "spectrum:gemstone_shards"}],
        ],
        inputFluids:[
            [{fluid:"modern_industrialization:high_pressure_steam"}, 200],
            [{fluid:"spectrum:liquid_crystal"}, 100]
        ],
        outputFluids:[
            [{fluid:"milf:ethereal_source"}, 1000]
        ]
    })

    customPedestalCraft(event, {
        time: 1000,
        tier: "complex",
        experience: 2.0,
        citrine: 10,
        topaz: 20,
        moonstone: 10,
        onyx: 16,
        pattern: [
            'ewe',
            'rqr',
            'ewe'
        ],
        key: {
            q: 'modern_industrialization:titanium_tank',
            w: 'ars_nouveau:source_gem',
            e: "ars_nouveau:sourcestone",
            r: "ars_nouveau:sourcestone",
        },
        result: {
            "id": "starbunclemania:fluid_sourcelink",
            "count": 1
        },
        advancement: "spectrum:lategame/craft_moonstone_pedestal",
        removeRecipe: true
    })
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


    customWorktable(event, {
        pattern: [
            " ye",
            " wy",
            "t  "
        ],
        reagents: ["u   "],
        key: {
            "w": { "item": "paganbless:black_thorn_staff" },
            "e": { "item": "enchanted:attuned_stone" },
            "t": { "item": "eidolon_repraised:arcane_gold_ingot" },
            "y": { "item": "eidolon_repraised:gold_inlay" },
            "u": { "item": "eidolon_repraised:soul_shard" },
        },
        result: "ars_nouveau:dominion_wand",
        removeRecipe: true
    })

    customWorktable(event, {
        pattern: [
            "wyw",
            " q ",
            "ere"
        ],
        reagents: ["utut"],
        key: {
            "q": { "item": "minecraft:lectern" },
            "w": { "item": "eidolon_repraised:arcane_gold_ingot" },
            "e": { "item": "eidolon_repraised:gold_inlay" },
            "r": { "item": "immersiveengineering:steel_fence" },
            "y": { "item": "minecraft:heavy_weighted_pressure_plate" },
            "t": { "item": "enchanted:attuned_stone" },
            "u": { "item": "eidolon_repraised:soul_shard" },
        },
        result: "ars_nouveau:storage_lectern",
        removeRecipe: true
    })
})