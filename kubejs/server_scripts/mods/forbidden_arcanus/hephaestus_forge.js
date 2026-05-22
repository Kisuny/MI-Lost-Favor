// https://wiki.valhelsia.net/external-mods/forbidden-and-arcanus/wiki/datapack-guide/hephaestus-forge-rituals
// This type of recipe requires a full restart!

// NOTE: enhancers:"forbidden_arcanus:crimson_stone", "forbidden_arcanus:soul_crimson_stone" not obtainable in survival yet.
// If necessary, you'll need to add a method for obtaining
// https://wiki.valhelsia.net/external-mods/forbidden-and-arcanus/wiki/datapack-guide/enhancers
/**
 * @typedef {"forbidden_arcanus:artisan_relic" | "forbidden_arcanus:crimson_stone" | "forbidden_arcanus:soul_crimson_stone" | "forbidden_arcanus:elementarium" | "forbidden_arcanus:divine_pact" | "forbidden_arcanus:maledictus_pact" | "forbidden_arcanus:crescent_moon"} HephaestusEnhancer
 */
// NOTE: Magic Circles can be configured using JSON files within a data pack in the path:
// `data/<namespace>/forbidden_arcanus/magic_circle.`
// https://wiki.valhelsia.net/external-mods/forbidden-and-arcanus/wiki/datapack-guide/magic-circles
/**
 * @typedef {"forbidden_arcanus:create_item" | "forbidden_arcanus:upgrade_tier" | "forbidden_arcanus:upgrade_final_tier" } HephaestusMagicCircle
 */

/**
 * @typedef {Object} HephaestusRitualArgs
 * @property {string | {tag: string}} mainIngredient - required
 * @property {{aureal?: number, blood?: number, souls?: number, experience?: number}} essences - required
 * @property {Array<{item?: string, tag?: string, amount?: number}>} inputs - max 8 items (required)
 * @property {string | {tier: number}} result - required
 * @property {number} [resultCount] - default is 1
 * @property {HephaestusEnhancer} [enhancers] - enhancer item that can be used in the ritual (optional)
 * @property {number} [forgeTier] - minimum forge tier required to perform the ritual, from 1 to 5 (default is 1)
 * @property {HephaestusMagicCircle} [magicCircle] - required (default is "forbidden_arcanus:create_item")
 * @property {boolean} [matchTierExact] - if true, the ritual will only match a forge of the exact tier specified in forgeTier (optional)
 */

/**
 * @param {string} id - file name without .json
 * @param {HephaestusRitualArgs} options
 * @returns {{ path: string, json: object }}
 */
function buildHephaestusRitual(id, options) {
    const {
        mainIngredient,
        essences,
        inputs,
        result,
        enhancers,
        forgeTier,
        magicCircle,
        matchTierExact
    } = options
    const resultCount = options.resultCount ?? 1

    const isUpgradeTier = typeof result === "object" && result.tier !== undefined
    const circle = magicCircle ?? (isUpgradeTier ? "forbidden_arcanus:upgrade_tier" : "forbidden_arcanus:create_item")

    const json = {}

    if (enhancers !== undefined) json.enhancers = enhancers
    json.essences = essences
    if (forgeTier !== undefined) json.forge_tier = forgeTier

    json.inputs = inputs.map(input => ({
        amount: input.amount ?? 1,
        ingredient: input.tag ? { tag: input.tag } : { item: input.item }
    }))

    json.magic_circle = circle
    json.main_ingredient = typeof mainIngredient === "string" ? { item: mainIngredient } : { tag: mainIngredient.tag }

    if (matchTierExact !== undefined) json.match_tier_exact = matchTierExact

    if (isUpgradeTier) {
        json.result = { type: "forbidden_arcanus:upgrade_tier", result_tier: result.tier }
    } else {
        json.result = {
            type: "forbidden_arcanus:create_item",
            result_item: { count: resultCount, id: result }
        }
    }

    return {
        path: `data/forbidden_arcanus/forbidden_arcanus/hephaestus_forge/ritual/${id}.json`,
        json
    }
}

ServerEvents.generateData(event => {

    const rituals = [
        // forbidden_arcanus
        buildHephaestusRitual("eternal_stella", {
            enhancers: "forbidden_arcanus:divine_pact",
            essences: { aureal: 2000, blood: 10000, souls: 100, experience: 5000 },
            mainIngredient: "forbidden_arcanus:xpetrified_orb",
            inputs: [
                { item: "spectrum:downstone_fragments", amount: 1 },
                { item: "occultism:dragonyst_dust", amount: 1 },
                { item: "modern_industrialization:blastproof_alloy_ingot", amount: 5 },
                { item: "forbidden_arcanus:stellarite_block", amount: 1 },
            ],
            forgeTier: 5,
            result: "forbidden_arcanus:eternal_stella",
        }),
        buildHephaestusRitual("upgrade_tier_2", {
            essences: { aureal: 500, blood: 6000, souls: 10 },
            mainIngredient: "forbidden_arcanus:edelwood_planks",
            inputs: [
                { item: "forbidden_arcanus:arcane_crystal", amount: 4 },
                { item: "spectrum:onyx_shard", amount: 4 },
            ],
            matchTierExact: true,
            result: { tier: 2 },
        }),
        buildHephaestusRitual("upgrade_tier_3", {
            essences: { aureal: 1000, blood: 9000, souls: 50 },
            mainIngredient: "forbidden_arcanus:chiseled_polished_darkstone",
            inputs: [
                { item: "forbidden_arcanus:arcane_crystal", amount: 2 },
                { item: "spectrum:stratine_gem", amount: 2 },
                { item: "forbidden_arcanus:deorum_ingot", amount: 4 },
            ],
            forgeTier: 2,
            matchTierExact: true,
            result: { tier: 3 },
        }),
        buildHephaestusRitual("upgrade_tier_4", {
            essences: { aureal: 2000, blood: 12000, souls: 100 },
            mainIngredient: "spectrum:bedrock_dust_block",
            inputs: [
                { item: "forbidden_arcanus:stellarite_piece", amount: 4 },
                { item: "forbidden_arcanus:rune", amount: 4 },
            ],
            forgeTier: 3,
            matchTierExact: true,
            result: { tier: 4 },
        }),
        buildHephaestusRitual("upgrade_tier_5", {
            essences: { aureal: 5000, blood: 20000, souls: 500 },
            mainIngredient: "spectrum:aether_vestiges",
            inputs: [
                { item: "minecraft:sculk_catalyst", amount: 4 },
                { item: "forbidden_arcanus:dark_nether_star", amount: 2 },
                { item: "forbidden_arcanus:dragon_scale", amount: 2 },
            ],
            forgeTier: 4,
            magicCircle: "forbidden_arcanus:upgrade_final_tier",
            matchTierExact: true,
            result: { tier: 5 },
        }),

        // angel_ring
        buildHephaestusRitual("angel_ring", {
            enhancers: "forbidden_arcanus:divine_pact",
            forgeTier: 4,
            essences: { aureal: 5000, blood: 25000, souls: 200, experience: 5000 },
            mainIngredient: "angelring:diamond_ring",
            inputs: [
                { item: "hexerei:broom_thruster_brush", amount: 1 },
                { tag: "hexerei:brooms", amount: 1 },
                { item: "forbidden_arcanus:dark_nether_star", amount: 1 },
                { item: "modern_industrialization:diesel_jetpack", amount: 1 },
                { item: "enchanted:flying_ointment", amount: 1 },
                { item: "spectrum:bismuth_crystal", amount: 1 },
                { item: "spectrum:aether_vestiges", amount: 1 },
                { item: "eidolon_repraised:gravity_belt", amount: 1 },
            ],
            result: "angelring:angel_ring",
        }),

        // apotheosis
        buildHephaestusRitual("simple_reforging_table", {
            enhancers: "forbidden_arcanus:elementarium",
            essences: { aureal: 250, blood: 5000, souls: 10, experience: 666 },
            mainIngredient: "minecraft:smithing_table",
            inputs: [
                { item: "milf:blaze_core", amount: 1 },
                { item: "minecraft:smooth_stone", amount: 3 },
                { item: "forbidden_arcanus:obsidiansteel_ingot", amount: 2 },
                { item: "apotheosis:epic_material", amount: 2 },
            ],
            result: "apotheosis:simple_reforging_table",
        }),
        buildHephaestusRitual("reforging_table", {
            enhancers: "forbidden_arcanus:maledictus_pact",
            essences: { aureal: 5000, blood: 25000, souls: 200, experience: 5000 },
            mainIngredient: "apotheosis:simple_reforging_table",
            inputs: [
                { item: "milf:electronic_ender_core", amount: 1 },
                { item: "spectrum:bismuth_crystal", amount: 3 },
                { item: "apotheosis:mythic_material", amount: 2 },
                { item: "forbidden_arcanus:dark_nether_star", amount: 2 },
            ],
            forgeTier: 4,
            result: "apotheosis:reforging_table",
        }),
        buildHephaestusRitual("augmenting_table", {
            enhancers: "forbidden_arcanus:maledictus_pact",
            essences: { aureal: 10000, blood: 100000, souls: 500, experience: 5000 },
            mainIngredient: "malum:umbral_spirit",
            inputs: [
                { item: "spectrum:aether_vestiges", amount: 1 },
                { item: "malum:block_of_malignant_pewter", amount: 3 },
                { item: "apotheosis:mythic_material", amount: 2 },
                { item: "forbidden_arcanus:stellarite_block", amount: 2 },
            ],
            forgeTier: 5,
            result: "apotheosis:augmenting_table",
        }),

        // ars_nouveau
        buildHephaestusRitual("apprentice_spell_book", {
            enhancers: "forbidden_arcanus:elementarium",
            essences: { aureal: 500, blood: 5000, souls: 2, experience: 100 },
            mainIngredient: "ars_nouveau:novice_spell_book",
            inputs: [
                { item: "occultism:dragonyst_dust", amount: 1 },
                { item: "forbidden_arcanus:obsidiansteel_ingot", amount: 7 },
            ],
            result: "ars_nouveau:apprentice_spell_book",
        }),
        buildHephaestusRitual("archmage_book_upgrade", {
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
        }),

        // devices
        buildHephaestusRitual("magical_pouch", {
            enhancers: "forbidden_arcanus:crimson_stone",
            essences: { aureal: 50, blood: 500, souls: 20, experience: 220 },
            mainIngredient: "devices:devices_pouch",
            inputs: [
                { item: "minecraft:nether_star", amount: 1 },
                { item: "hexerei:infused_fabric", amount: 2 },
                { item: "modern_industrialization:aluminum_plate", amount: 2 },
            ],
            result: "devices:magical_pouch",
        }),

        // ender_storage
        buildHephaestusRitual("ender_pouch", {
            enhancers: "forbidden_arcanus:maledictus_pact",
            essences: { aureal: 20, blood: 500, souls: 2, experience: 100 },
            mainIngredient: "ars_elemental:curio_bag",
            inputs: [
                { item: "simplyswords:runic_tablet", amount: 1 },
                { item: "dungeonsdelight:ancient_egg", amount: 1 },
                { item: "forbidden_arcanus:obsidiansteel_ingot", amount: 2 },
                { item: "modern_industrialization:gold_curved_plate", amount: 4 },
            ],
            result: "enderstorage:ender_pouch",
        }),
        buildHephaestusRitual("ender_chest", {
            enhancers: "forbidden_arcanus:maledictus_pact",
            resultCount: 2,
            essences: { aureal: 10, blood: 2000, souls: 5, experience: 500 },
            mainIngredient: "minecraft:ender_chest",
            inputs: [
                { item: "dungeonsdelight:ancient_egg", amount: 1 },
                { item: "forbidden_arcanus:obsidiansteel_ingot", amount: 2 },
                { item: "modern_industrialization:gold_curved_plate", amount: 5 },
            ],
            result: "enderstorage:ender_chest",
        }),
        buildHephaestusRitual("ender_tank", {
            enhancers: "forbidden_arcanus:maledictus_pact",
            essences: { aureal: 10, blood: 4000, souls: 5, experience: 100 },
            mainIngredient: "modern_industrialization:bronze_tank",
            inputs: [
                { item: "dungeonsdelight:ancient_egg", amount: 1 },
                { item: "forbidden_arcanus:obsidiansteel_ingot", amount: 2 },
                { item: "modern_industrialization:gold_curved_plate", amount: 5 },
            ],
            result: "enderstorage:ender_tank",
            resultCount: 2,
        }),

        // simple_magnets
        buildHephaestusRitual("advanced_magnet", {
            enhancers: "forbidden_arcanus:elementarium",
            essences: { aureal: 200, blood: 1000, souls: 10, experience: 666 },
            mainIngredient: "simplemagnets:basicmagnet",
            inputs: [
                { item: "companions:relic_gold", amount: 5 },
                { item: "bosses_of_mass_destruction:charged_ender_pearl", amount: 1 },
                { item: "milf:magnet_part", amount: 2 },
            ],
            result: "simplemagnets:advancedmagnet",
        }),

        // tempad
        buildHephaestusRitual("tempad_time_steel", {
            enhancers: "forbidden_arcanus:elementarium",
            essences: { },
            mainIngredient: "minecraft:iron_ingot",
            inputs: [
                { item: "modern_industrialization:stainless_steel_ingot", amount: 2 },
                { item: "minecraft:netherite_ingot", amount: 2 },
            ],
            resultCount: 2,
            result: "tempad:time_steel",
        }),

        // tesseract
        buildHephaestusRitual("tesseract", {
            enhancers: "forbidden_arcanus:maledictus_pact",
            essences: { aureal: 5000, blood: 2000, souls: 20, experience: 2000 },
            mainIngredient: "modern_industrialization:singularity",
            inputs: [
                { item: "simplyswords:runic_tablet", amount: 1 },
                { item: "advanced_ae:shattered_singularity", amount: 4 },
                { item: "modern_industrialization:titanium_large_plate", amount: 3 },
            ],
            forgeTier: 4,
            result: "tesseract:tesseract",
            resultCount: 2,
        }),
    ]

    for (const { path, json } of rituals) {
        event.addJson(path, json)
    }

})
