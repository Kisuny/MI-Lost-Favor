/**
 * @param {Internal.RecipesEventJS} event
 * @param {{
 *   input: { item: string, count?: number },
 *   result: { id: string, count?: number },
 *   extraInputs: Array<{ item: string, count?: number }>,
 *   spirits: Array<{
 *     count: number,
 *     type: 'malum:sacred' | 'malum:wicked' | 'malum:arcane' | 'malum:eldritch' | 'malum:aerial' | 'malum:aqueous' | 'malum:earthen' | 'malum:infernal' | 'malum:umbral'
 *   }>
 * }} args
 */
const spiritInfusion = (event, args) => {
    event.custom({
        type: "malum:spirit_infusion",
        input: args.input,
        result: args.result,
        extraInputs: args.extraInputs,
        spirits: args.spirits
    })
}

ServerEvents.recipes(event => {

    event.remove({ id: "malum:copper_nugget_from_ingot" })
    event.remove({ id: "malum:copper_ingot_from_nugget" })
    event.remove({ output: "malum:crude_scythe" })


    
    spiritInfusion(event, {
        input: { item: "spectrum:moonstone_block", count: 1 },
        extraInputs: [
            {
                item: "modern_industrialization:electronic_circuit",
                count: 2
            },
            {
                item: "occultism:dragonyst_dust",
                count: 1
            },
            {
                item: "malum:malignant_pewter_plating",
                count: 4
            },
            {
                item: "malum:fused_consciousness",
                count: 1
            },
        ],
        spirits: [
            { type: "malum:earthen", count: 16 },
            { type: "malum:wicked", count: 8 },
            { type: "malum:arcane", count: 22 },
            { type: "malum:umbral", count: 1 },
        ],
        result: {
            id: "milf:moonstone_table_core",
            count: 1
        }
    })
})
