/**
 * @typedef {Object} MilfCrushOutput
 * @property {{id: string}} stack
 * @property {number} [count]
 * @property {number} [chance] default 1.0
 * @property {number} [maxRange] - default 1
 */

/**
 * @typedef {Object} MilfCrushArgs
 * @property {{item: string}} input
 * @property {MilfCrushOutput[]} outputs
 * @property {boolean} [removeRecipe] 
 */

/**
 * @param {import("dev.latvian.mods.kubejs.recipe.RecipesKubeEvent").$RecipesKubeEvent$$Original} event
 * @param {MilfCrushArgs} args
 */
function milfArsNouveauCrush(event, args) {
    let recipe = {
        type: "ars_nouveau:crush",
        input: args.input,
        output: args.outputs.map(o => ({
            chance: o.chance != undefined ? o.chance : 1.0,
            maxRange: o.maxRange || 1,
            stack: {
                count: o.count || 1,
                id: o.stack.id
            }
        }))
    }
    if (args.removeRecipe) { event.remove({ input: args.input.item, type: "ars_nouveau:crush" }) }
    event.custom(recipe)
}

ServerEvents.recipes(event => {
    
    milfArsNouveauCrush(event, {
        input: { item: "minecraft:glowstone" },
        outputs: [
            { stack: { id: "minecraft:glowstone_dust" }, count: 2, chance: 1.0, maxRange: 1 },
            { stack: { id: "spectrum:shimmerstone_gem" }, count: 1, chance: 1.0, maxRange: 1 },
            { stack: { id: "spectrum:shimmerstone_gem" }, count: 1, chance: 0.5, maxRange: 3 }
        ],
        removeRecipe: true
    })
})
