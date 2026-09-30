/**
 * args:
 *  - ingredients (array)   : ingredients array (required)
 *  - output (string)       : result item id (required)
 *  - amount (number)       : result count, default 1
 *  - grindingTime (number) : grinding duration, default 20
 *  - removeRecipe (bool)   : if true, also calls `event.remove({ output: args.output })`
 *
 * Notes:
 *  - If `removeRecipe` is true, the recipe matching `output` will be removed.
 */
const customPestleAndMortarCraft = (event, args) => {
    event.custom({
        "type": "hexerei:pestle_and_mortar",
        "ingredients": args.ingredients,
        "output": {
            "id": args.output,
            "count": args.amount || 1
        },
        "grindingTime": args.grindingTime || 20
    });
    if (args.removeRecipe === true) {
        event.remove({ output: args.output });
    }
};



ServerEvents.recipes(event => {

    //For future

})