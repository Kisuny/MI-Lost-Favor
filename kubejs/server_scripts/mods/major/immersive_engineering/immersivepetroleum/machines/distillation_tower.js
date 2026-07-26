function ieDistillationRecipe(event, args){
    let recipe = {
        type: "immersivepetroleum:distillation",
        energy:args.energy || 3200,
        byproducts:[],
        input: Object.assign({}, args.inputFluids[0][0], {amount:args.inputFluids[0][1] || 1000}),
        results:[],
        time:args.time || 1
    }
    args.outputItems && args.outputItems.forEach((output) => {recipe.byproducts.push({chance:output[2] || 0.1, output:output[0]})})
    args.outputFluids.forEach((output) => {recipe.results.push({id:output[0].fluid, amount:output[1] || 10})})
    if(!args.compatOff){
        miMachineRecipe(event, {energy:8, time:100, machine:"modern_industrialization:distillation_tower",
            outputItems:args.outputItems,
            inputFluids:args.inputFluids,
            outputFluids:args.outputFluids
        })
    }
    //if(args.removeRecipe){args.outputFluids.forEach((out) => {event.remove({output: out[0].fluid})})}
    event.custom(recipe)
}

ServerEvents.recipes(event => {
    ieDistillationRecipe(event, {
        outputItems:[
            [ { "id": "immersivepetroleum:bitumen" }, 1 , 0.1]
        ],
        inputFluids:[[ {fluid :"milf:desalted_crude_oil"} , 100 ]],
        outputFluids:[
            [ {fluid :"modern_industrialization:sulfuric_naphtha"} , 20 ], 
            [ {fluid :"milf:high_sulfur_kerosene"} , 10 ],
            [ {fluid :"immersivepetroleum:diesel_sulfur"} , 15 ],
            [ {fluid :"modern_industrialization:sulfuric_heavy_fuel"} , 40 ],
            [ {fluid :"modern_industrialization:lubricant"} , 5 ]
        ],
        compatOff:true,
        time:1
    })

    ieDistillationRecipe(event, {
        inputFluids: [[{ fluid: "modern_industrialization:sulfuric_light_fuel" }, 100]],
        outputFluids: [
            [{ fluid: "modern_industrialization:sulfuric_naphtha" }, 50],
            [{ fluid: "milf:high_sulfur_kerosene" }, 20],
            [{ fluid: "immersivepetroleum:diesel_sulfur" }, 30]
        ],
        compatOff: true,
        time: 5
    })

    ieDistillationRecipe(event, {
        inputFluids: [[{ fluid: "modern_industrialization:sulfuric_heavy_fuel" }, 100]],
        outputFluids: [
            [{ fluid: "modern_industrialization:sulfuric_light_fuel" }, 60],
            [{ fluid: "milf:high_sulfur_kerosene" }, 15],
            [{ fluid: "immersivepetroleum:diesel_sulfur" }, 10]
        ],
        outputItems: [
            [{ "id": "immersivepetroleum:bitumen" }, 1, 0.17]
        ],
        compatOff: true,
        time: 3
    })
})

