/**
 * @typedef {Object} MilfCrushOutput
 * @property {{id: string}} stack
 * @property {number} [count]
 * @property {number} [chance] default 1.0
 * @property {number} [maxRange] - default 1
 */

/**
 * @typedef {Object} MilfCrushArgs
 * @property {{item: string}|{tag: string}} input
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
    if (args.removeRecipe) { event.remove({ input: args.input.item || `#${args.input.tag}`, type: "ars_nouveau:crush" }) }
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


//#region MI Compat for macerator
// Items/tags listed here are skipped entirely and will not get an auto-converted crush recipe.
// Use a plain id for an item input ("minecraft:sugar_cane") or a "#"-prefixed id for a tag input ("#c:ores/iron").
const milfMacToCrushExcludedInputs = [
    "minecraft:sugar_cane",
    "minecraft:blaze_rod",
    "minecraft:gravel",
    "minecraft:cobblestone",
    "#c:sandstone/uncolored_blocks",
    "#c:sandstone/red_blocks",
    "minecraft:poppy",
    "minecraft:rose_bush",
]

// Recipes producing any(!) of these output items are skipped entirely, regardless of input.
const milfMacToCrushExcludedOutputs = [
    // "minecraft:sugar",
    // "minecraft:blaze_powder",
]


 //Converts a single modern_industrialization:macerator-style input/outputs pair into an ars_nouveau:crush recipe.
 //Shared by the bulk conversion below (ars_nouveau_crush.js) and the inline compat hook in miMachineRecipe
 //(modern_industrialization/recipes.js), so every macerator recipe - vanilla or custom - only needs this in one place.
function milfMacToCrush(event, input, rawOutputs, logId) {
    if (!input || (!input.item && !input.tag)) {
        return false
    }

    const inputId = input.item ? input.item : `#${input.tag}`
    if (milfMacToCrushExcludedInputs.includes(inputId)) {
        return false
    }

    if ((rawOutputs || []).some(o => milfMacToCrushExcludedOutputs.includes(o.item))) {
        return false
    }

    const outputs = (rawOutputs || []).map(o => ({
        stack: { id: o.item },
        count: o.amount,
        chance: o.probability != undefined ? o.probability : 1.0,
        maxRange: 1
    }))

    const badOutput = outputs.find(o => !o.stack.id)
    if (!outputs.length || badOutput) {
        return false
    }

    milfArsNouveauCrush(event, {
        input: input.item ? { item: input.item } : { tag: input.tag },
        outputs: outputs,
        removeRecipe: true
    })

    const outputsLabel = outputs.map(o => `${o.stack.id} x${o.count}${o.chance < 1.0 ? ` (${o.chance * 100}%)` : ''}`).join(', ')
    // console.log(`[milf/crush] added ${logId || inputId}: ${inputId} -> ${outputsLabel}`)
    return true
}

ServerEvents.recipes(event => {
    // Auto-add ars_nouveau:crush recipes based on every modern_industrialization:macerator recipe that
    // already exists at this point (vanilla MI recipes are present from the start; custom ones added by
    // later-loading scripts are covered separately via the miMachineRecipe compat hook, see milfMacToCrush).
    let milfMacToCrushCount = 0
    let milfMacToCrushSkipped = 0
    // console.log("[milf/crush] converting modern_industrialization:macerator recipes to ars_nouveau:crush...")
    event.forEachRecipe({ type: "modern_industrialization:macerator" }, r => {
        const rjson = JSON.parse(r.json)
        if (!Array.isArray(rjson.item_inputs)) { rjson.item_inputs = [rjson.item_inputs] }
        if (!Array.isArray(rjson.item_outputs)) { rjson.item_outputs = [rjson.item_outputs] }

        if (milfMacToCrush(event, rjson.item_inputs[0], rjson.item_outputs, r.id)) {
            milfMacToCrushCount++
        } else {
            milfMacToCrushSkipped++
        }
    })
    // console.log(`[milf/crush] done: ${milfMacToCrushCount} recipes added, ${milfMacToCrushSkipped} skipped`)
})
//#endregion

