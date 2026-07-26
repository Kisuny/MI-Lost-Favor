function ieMixerRecipe(event, args){
    let recipe = {
        type: "immersiveengineering:mixer",
        energy:args.energy || 3200,
        inputs: [],
        result:{
            id:args.outputFluids[0][0].fluid,
            amount:args.outputFluids[0][1] || 1000
        },
        fluid:Object.assign({}, args.inputFluids[0][0], {amount:args.inputFluids[0][1] || 1000})
    }
    args.inputItems.forEach((input) => {recipe.inputs.push(Object.assign({},{"basePredicate": input[0]}, {count:input[1] || 1}))})
    if(!args.compatOff){
        miMachineRecipe(event, {energy:8, time:100, machine:"modern_industrialization:mixer",
            inputItems:args.inputItems,
            inputFluids:args.inputFluids,
            outputFluids:args.outputFluids
        })
    }
    if(args.removeRecipe){args.outputFluids.forEach((out) => event.remove({output: out[0].fluid}))}
    event.custom(recipe)
}

ServerEvents.recipes(event => {

})