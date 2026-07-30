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
 */
function addHephaestusRitual(id, options) {
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

        // JsonIO.write(`kubejs/data/forbidden_arcanus/forbidden_arcanus/hephaestus_forge/ritual/${id}.json`, json)
    }


ServerEvents.recipes(event => {

    addHephaestusRitual("eternal_stella", {
        enhancers: "forbidden_arcanus:divine_pact",
        essences: { aureal: 2000, blood: 10000, souls: 100, experience: 5000 },
        mainIngredient: "forbidden_arcanus:xpetrified_orb",
        inputs: [
            { item: "spectrum:downstone_fragments", amount: 1 },
            { item: "minecraft:barrier", amount: 1 },
            { item: "modern_industrialization:blastproof_alloy_ingot", amount: 5 },
            { item: "forbidden_arcanus:stellarite_block", amount: 1 },
        ],
        forgeTier: 5,
        result: "forbidden_arcanus:eternal_stella",
    })

    addHephaestusRitual("upgrade_tier_2", {
        essences: { aureal: 500, blood: 6000, souls: 10 },
        mainIngredient: "forbidden_arcanus:edelwood_planks",
        inputs: [
            { item: "forbidden_arcanus:arcane_crystal", amount: 4 },
            { item: "spectrum:onyx_shard", amount: 4 },
        ],
        matchTierExact: true,
        result: { tier: 2 },
    })

    addHephaestusRitual("upgrade_tier_3", {
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
    })

    addHephaestusRitual("upgrade_tier_4", {
        essences: { aureal: 2000, blood: 12000, souls: 100 },
        mainIngredient: "spectrum:bedrock_dust_block",
        inputs: [
            { item: "forbidden_arcanus:stellarite_piece", amount: 4 },
            { item: "forbidden_arcanus:rune", amount: 4 },
        ],
        forgeTier: 3,
        matchTierExact: true,
        result: { tier: 4 },
    })

    addHephaestusRitual("upgrade_tier_5", {
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
    })

})
