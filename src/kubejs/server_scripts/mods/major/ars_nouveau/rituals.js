ServerEvents.recipes(event => {


    customPedestalCraft(event, {
        time: 1000,
        tier: "basic",
        experience: 2.0,
        pattern: [
            'tqt',
            'rwr',
            ' e '
        ],
        key: {
            q: 'enchanted:attuned_stone_charged',
            w: 'supplementaries:pedestal',
            e: "modern_industrialization:gold_rod",
            r: "modern_industrialization:gold_bolt",
            t: "enchanted:soul_of_the_world",
        },
        result: {
            "id": "ars_nouveau:ritual_brazier",
            "count": 1
        },
        advancement: "spectrum:place_pedestal",
        yield_upgrades: true
    })
    event.remove({ output: "ars_nouveau:ritual_brazier" })
    event.replaceInput({ output: "ars_additions:wayfinder" }, "minecraft:amethyst_shard", "enchanted:attuned_stone")

    const rituals = [
        { id: "ars_nouveau:ritual_burrowing", pedestal_tier: "basic", topaz: 2, amethyst: 2, citrine: 2, onyx: 0, moonstone: 0 },
        { id: "ars_nouveau:ritual_challenge", pedestal_tier: "basic", topaz: 2, amethyst: 2, citrine: 2, onyx: 0, moonstone: 0 },
        { id: "ars_nouveau:ritual_sunrise", pedestal_tier: "basic", topaz: 2, amethyst: 2, citrine: 2, onyx: 0, moonstone: 0 },
        { id: "ars_nouveau:ritual_animal_summon", pedestal_tier: "basic", topaz: 2, amethyst: 2, citrine: 2, onyx: 0, moonstone: 0 },
        { id: "ars_nouveau:ritual_forestation", pedestal_tier: "basic", topaz: 2, amethyst: 2, citrine: 2, onyx: 0, moonstone: 0 },
        { id: "ars_nouveau:ritual_moonfall", pedestal_tier: "basic", topaz: 2, amethyst: 2, citrine: 2, onyx: 0, moonstone: 0 },
        { id: "ars_nouveau:ritual_flowering", pedestal_tier: "basic", topaz: 2, amethyst: 2, citrine: 2, onyx: 0, moonstone: 0 },
        {
            id: "ars_additions:ritual_locate_structure", pedestal_tier: "basic", topaz: 10, amethyst: 10, citrine: 10, onyx: 0, moonstone: 0,
            addition_ingredients: [{ "item": "enchanted:ender_dew" }]
        },
        { id: "ars_nouveau:ritual_cloudshaping", pedestal_tier: "advanced", topaz: 10, amethyst: 10, citrine: 10, onyx: 2, moonstone: 0 },
        { id: "ars_elemental:ritual_repulsion", pedestal_tier: "advanced", topaz: 10, amethyst: 10, citrine: 10, onyx: 2, moonstone: 0 },
        { id: "ars_nouveau:ritual_animal_summon", pedestal_tier: "advanced", topaz: 10, amethyst: 10, citrine: 10, onyx: 2, moonstone: 0 },
        { id: "ars_elemental:ritual_attraction", pedestal_tier: "advanced", topaz: 10, amethyst: 10, citrine: 10, onyx: 2, moonstone: 0 },
        { id: "ars_nouveau:ritual_scrying", pedestal_tier: "advanced", topaz: 10, amethyst: 10, citrine: 10, onyx: 2, moonstone: 0 },
        { id: "ars_elemental:ritual_detection", pedestal_tier: "advanced", topaz: 10, amethyst: 10, citrine: 10, onyx: 2, moonstone: 0 },
        { id: "ars_nouveau:ritual_overgrowth", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_elemental:ritual_archwood_forestation", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_nouveau:ritual_disintegration", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_elemental:ritual_tesla_coil", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_elemental:ritual_squirrels", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_nouveau:ritual_warping", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_nouveau:ritual_conjure_island_plains", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_nouveau:ritual_flight", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_nouveau:ritual_restoration", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_nouveau:ritual_fertility", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_nouveau:ritual_gravity", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_elemental:ritual_archwood_forest", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_nouveau:ritual_sanctuary", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_nouveau:ritual_binding", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        { id: "ars_nouveau:ritual_harvest", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        // ritual_awakening - crafted via mixing cauldron instead
        { id: "ars_nouveau:ritual_conjure_island_desert", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0 },
        {
            id: "ars_nouveau:ritual_wilden_summon", pedestal_tier: "advanced", topaz: 20, amethyst: 20, citrine: 20, onyx: 8, moonstone: 0,
            addition_ingredients: [{ "item": "malum:block_of_cthonic_gold" }, { "item": "malum:refined_soulstone" }]
        },
    ]

    customMixingCauldron(event, {
        fluid: "minecraft:lava",
        fluidAmount: 1000,
        ingredients: [
            { "item": "minecraft:stone" },
            { "item": "paganbless:chopped_lavender" },
            { "item": "enchanted:wool_of_bat" },
            { "item": "enchanted:tongue_of_dog" },
            { "item": "enchanted:creeper_heart" },
            { "item": "enchanted:attuned_stone" },
            { "item": "enchanted:water_artichoke" },
            { "item": "paganbless:chopped_lavender" },
        ],
        output: "ars_nouveau:ritual_awakening",
        removeRecipe: true
    })

    // item -> item
    var replacementsItemToItem = {
        "ars_nouveau:earth_essence": "enchanted:breath_of_the_goddess",
        "ars_nouveau:red_archwood_sapling": "enchanted:tongue_of_dog",
        "ars_nouveau:green_archwood_sapling": "enchanted:creeper_heart",
        "ars_nouveau:blue_archwood_sapling": "enchanted:water_artichoke",
        "ars_nouveau:purple_archwood_sapling": "enchanted:wool_of_bat",
    };

    // item -> tag
    var replacementsItemToTag = {
        "ars_nouveau:purple_archwood_log": "minecraft:logs",
    };

    // tag -> item
    var replacementsTagToItem = {
        "c:gems/source": "enchanted:attuned_stone",
    };

    // tag -> tag
    var replacementsTagToTag = {
        "ars_nouveau:magic_shards": "malum:mob_drops",
    };

    rituals.forEach(ritual => {
        event.findRecipes({ output: ritual.id }).forEach(rec => {
            let advancement = "spectrum:place_pedestal"
            let baseJson = JSON.parse(rec.json.toString());
            let baseIngredients = baseJson.ingredients || [];

            let ingredients = [];
            if (ritual.addition_ingredients) ingredients = ingredients.concat(ritual.addition_ingredients);
            ingredients = ingredients.concat(baseIngredients);

            if (ritual.pedestal_tier == "advanced") {
                advancement = "spectrum:create_onyx_shard"
            } else if (ritual.pedestal_tier == "complex") {
                advancement = "spectrum:lategame/craft_moonstone_pedestal";
            }
            ingredients = ingredients.map(function (i) {
                // item -> item
                if (i && i.item && replacementsItemToItem[i.item]) {
                    return Object.assign({}, i, { item: replacementsItemToItem[i.item] });
                }

                // item -> tag
                if (i && i.item && replacementsItemToTag[i.item]) {
                    return { tag: replacementsItemToTag[i.item] };
                }

                // tag -> item 
                if (i && i.tag && replacementsTagToItem[i.tag]) {
                    return { item: replacementsTagToItem[i.tag] };
                }

                // tag -> tag
                if (i && i.tag && replacementsTagToTag[i.tag]) {
                    return { tag: replacementsTagToTag[i.tag] };
                }

                return i;
            });

            customPedestalCraftShapeless(event, {
                tier: ritual.pedestal_tier,
                time: 600,
                topaz: ritual.topaz,
                amethyst: ritual.amethyst,
                citrine: ritual.citrine,
                onyx: ritual.onyx,
                moonstone: ritual.moonstone,
                experience: 2.0,
                ingredients: ingredients,
                result: {
                    "id": ritual.id,
                    "count": 1
                },
                advancement: advancement
            });

        })
        event.remove({ output: ritual.id })
    });

})
