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

    ytechMillingCraft(event,{
        inputItems:[[{item: "minecraft:raw_iron"}]],
        outputItems:[[{id:"milf:crushed_iron"}]],
        bonusChance: 0.5,
        compatOff:true
    })

    ytechMillingCraft(event,{
        inputItems:[[{item: "minecraft:coal"}]],
        outputItems:[[{id:"modern_industrialization:coal_dust"}]],
        bonusChance: 0,
        compatOff:true
    })

});
