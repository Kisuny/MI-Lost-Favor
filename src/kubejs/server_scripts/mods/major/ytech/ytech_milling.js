/**
 * Ytech milling recipe
 *  - `args`:
 *      - `inputItems` : Array (max 1 elements) - each element looks like this : [{ tag|item : name }, amount], amount defaults to 1 if not specified
 *      - `outputItems` : Array (max 1 elements) - each element looks like this : [{ id : name }, amount], amount defaults to 1 if not specified
 *      - `bonusChance` : Additional item chance (from 0 to 1), defaults to 0
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
const ytechMillingCraft = (event, args) => {
    let recipe = {
        type: "ytech:milling",
        bonusChance: args.bonusChance || 0,
        ingredient: args.inputItems[0][0],
        result: Object.assign({},args.outputItems[0][0], {count: args.outputItems[0][1] || 1}),
    }
    if(!args.compatOff){
        miMachineRecipe(event, {energy:2, time:100, machine:"modern_industrialization:macerator",
            inputItems:args.inputItems,
            outputItems: args.bonusChance ? [[{item:recipe.result.id}, recipe.result.count], [{item:recipe.result.id}, recipe.result.count, args.bonusChance]] :[[{item:recipe.result.id}, recipe.result.count]],
        })
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].id})}
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    entriesForEach({
        "minecraft:raw_iron": "milf:crushed_iron",
        "minecraft:raw_copper": "milf:crushed_copper",
        "minecraft:raw_gold": "milf:crushed_gold",
        "modern_industrialization:raw_lead": "milf:crushed_lead",
        "modern_industrialization:raw_tin": "milf:crushed_tin"
    }, ([rawOre, crushedOre]) =>{

        ytechMillingCraft(event, {
            inputItems: [[{ item: rawOre }]],
            outputItems: [[{ id: crushedOre }]],
            bonusChance: 0.5,
            compatOff: true
        })

    })

})
