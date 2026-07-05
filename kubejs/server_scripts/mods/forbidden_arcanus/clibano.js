// https://wiki.valhelsia.net/external-mods/forbidden-and-arcanus/wiki/1.21.x/blocks/clibano

/**
 * @typedef {"fire" | "soul_fire" | "enchanted_fire"} ClibanoFireType
 */
/**
 * @typedef {"forbidden_arcanus:artisan_relic" | "forbidden_arcanus:crimson_stone" | "forbidden_arcanus:soul_crimson_stone" | "forbidden_arcanus:elementarium" | "forbidden_arcanus:divine_pact" | "forbidden_arcanus:maledictus_pact" | "forbidden_arcanus:crescent_moon"} ClibanoEnhancer
 */
/**
 * @typedef {"forbidden_arcanus:copper" | "forbidden_arcanus:iron" | "forbidden_arcanus:obsidian" | "forbidden_arcanus:arcane_crystal_dust"} ClibanoResidueType
 */
/**
 * @typedef {Object} ClibanoCombustionArgs
 * @property {string | {tag: string}} first - first ingredient (required if no `ingredient`)
 * @property {string | {tag: string}} [second] - second ingredient (optional, only for two-ingredient recipes)
 * @property {string | {tag: string}} [ingredient] - single ingredient (use instead of first/second)
 * @property {string} result - result item id (required)
 * @property {number} [resultCount] - default is 1
 * @property {ClibanoCategory} [category] - default is "misc"
 * @property {number} [cookingTime] - default is 100
 * @property {number} [experience] - default is 0
 * @property {ClibanoFireType} [fireType] - default is "fire"
 * @property {ClibanoEnhancer} [enhancer] - enhancer item (optional)
 * @property {{type: ClibanoResidueType, chance: number}} [residue] - residue output (optional)
 * @property {boolean} [removeRecipe] - remove existing recipe for the result (optional)
 * @property {boolean} [removeRecipeType] - remove existing recipe by type for the result (optional)
 */

/**
 * @param {Internal.KubeJSRecipesEvent} event
 * @param {string} id - recipe id without namespace
 * @param {ClibanoCombustionArgs} args
 */
function addClibanoCombustion(event, id, args) {
    const toIngredient = v => typeof v === "string" ? { item: v } : { tag: v.tag }

    const recipe = {
        type: "forbidden_arcanus:clibano_combustion",
        category: args.category ?? "misc",
        cooking_time: args.cookingTime ?? 100,
        experience: args.experience ?? 0,
        fire_type: args.fireType ?? "fire",
        ingredients: args.ingredient !== undefined
            ? toIngredient(args.ingredient)
            : { first: toIngredient(args.first), second: toIngredient(args.second) },
        result: {
            count: args.resultCount ?? 1,
            id: args.result,
        },
    }
    if (args.enhancer !== undefined) recipe.enhancer = args.enhancer
    if (args.residue !== undefined) recipe.residue = args.residue

    event.custom(recipe).id(`milf:${id}`)
    if (args.removeRecipe) { event.remove({ output: args.result }) }
    if (args.removeRecipeType) { event.remove({ output: args.result, type: args.removeRecipeType }) }
}

/**
 * @typedef {Object} ResidueTypeArgs
 * @property {string} result - result item id (required)
 * @property {number} [resultCount] - default is 1
 * @property {number} [requiredAmount] - default is 9
 * @property {string} [translate] - translation key for name, default is "residue.forbidden_arcanus.<id>"
 */

/**
 * @param {string} id - residue type id without namespace
 * @param {ResidueTypeArgs} options
 */
function addResidueType(id, options) {
    const json = {
        combine_info: {
            required_amount: options.requiredAmount !== undefined ? options.requiredAmount : 9,
            result: {
                count: options.resultCount !== undefined ? options.resultCount : 1,
                id: options.result
            }
        },
        name: {
            translate: options.translate !== undefined ? options.translate : `residue.forbidden_arcanus.${id}`
        }
    }

    // JsonIO.write(`kubejs/data/forbidden_arcanus/forbidden_arcanus/residue_type/${id}.json`, json)
}

function clibanoCombustionOreCraft(event, oreName, outputItem, exp, chance) {
    addClibanoCombustion(event, `${oreName}_ingot_from_clibano_combustion`, {
        ingredient: { tag: `c:ores/${oreName}` },
        result: outputItem,
        fireType: "fire",
        cookingTime: 100,
        experience: exp,
        residue: { type: `forbidden_arcanus:${oreName}`, chance: chance }
    })
    
    addClibanoCombustion(event, `${oreName}_ingot_from_clibano_combusting_raw_${oreName}`, {
        ingredient: { tag: `c:raw_materials/${oreName}` },
        result: outputItem,
        fireType: "fire",
        cookingTime: 100,
        experience: exp,
        residue: { type: `forbidden_arcanus:${oreName}`, chance: chance }
    })
}

ServerEvents.recipes(event => {
    
    addResidueType("iesnium", { result: "occultism:iesnium_block" })
    // Custom alloy exmaple
    addClibanoCombustion(event, "obsidiansteel_ingot_from_clibano_combustion", {
        first: { tag: "c:ingots/aluminum" },
        second: "occultism:obsidian_dust",
        result: "forbidden_arcanus:obsidiansteel_ingot",
        enhancer: "forbidden_arcanus:artisan_relic",
        fireType: "soul_fire",
        cookingTime: 100,
        experience: 0.5,
        residue: { type: "forbidden_arcanus:copper", chance: 0.33 },
        removeRecipe: true
    })
    
    // default ore example
    clibanoCombustionOreCraft(event, "iesnium", "occultism:iesnium_ingot", 1.0, 0.05)


})
