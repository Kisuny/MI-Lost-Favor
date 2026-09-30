/**
 * IE bottling machine recipe
 *  - `args`:
 *      - `inputItems` : Array (max 3 elements) - each element looks like this : [{ tag|item : name }, amount], amount defaults to 1 if not specified
 *      - `outputItems` : Array (max 3 elements) - each element looks like this : [{ item : name }, amount], amount defaults to 1 if not specified
 *      - `inputFluids` : Array (max 1 elements) - each element looks like this : [{ fluid : name }, amount], amount defaults to 1000 if not specified
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
function ieBottlingMachineRecipe(event, args){
    let recipe = {
        type: "immersiveengineering:bottling_machine",
        inputs: [],
        results: [],
        fluid: Object.assign({},args.inputFluids[0][0], {amount: args.inputFluids[0][1] || 1000}),
    }
    args.inputItems.forEach((input) => {recipe.inputs.push(Object.assign({},{"basePredicate": input[0]}, {count:input[1] || 1}))})
    args.outputItems.forEach((out) => {recipe.results.push(Object.assign({},{"basePredicate": out[0]}, {count:out[1] || 1}))})
    if(!args.compatOff){
        miMachineRecipe(event, {energy:8, time:100, machine:"modern_industrialization:assembler",
            inputItems:args.inputItems,
            outputItems:args.outputItems,
            inputFluids:args.inputFluids
        })
    }
    if(args.removeRecipe){args.outputItems.forEach((out) => event.remove({output: out[0].item}))}
    if (args.removeRecipeType) {
        args.outputItems.forEach((out) => {
            event.remove({ output: out[0]?.item || `#${out[0].tag}`, type: args.removeRecipeType })
        })
    }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    // ieBottlingMachineRecipe(event, {
    //     outputItems:[
    //         [{item:"modern_industrialization:plastic_plate"}],
    //         [{item:"immersiveengineering:mold_plate"}, 1]
    //     ],
    //     inputFluids:[
    //         [{fluid:"milf:liquid_plastic"}, 100]
    //     ],
    //     inputItems:[
    //         [{item:"immersiveengineering:mold_plate"}, 1]
    //     ],
    //     compatOff:true
    // })

    ieBottlingMachineRecipe(event, {
        outputItems: [
            [{ item: "immersiveengineering:electric_lantern" }, 1],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:soldering_alloy" }, 200]
        ],
        inputItems: [
            [{ item: "milf:steel_infused_glass" }, 2],
            [{ item: "immersiveengineering:light_bulb" }, 1],
            [{ item: "modern_industrialization:copper_wire" }, 2]
        ],
        removeRecipe:true
    })

})