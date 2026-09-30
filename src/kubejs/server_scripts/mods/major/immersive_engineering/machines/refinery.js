function ieRefineryRecipe(event, args){
    let recipe = {
        type: "immersiveengineering:refinery",
        energy:args.energy || 80,
        input0:Object.assign({}, args.inputFluids[0][0], {amount:args.inputFluids[0][1] || 1000}),
        input1: Object.assign({}, args.inputFluids[1][0], {amount:args.inputFluids[1][1] || 1000}),
        result: {id:args.outputFluids[0][0].fluid, amount:args.outputFluids[0][1] || 1},
    }
    if(args.catalyst) recipe.catalyst = args.catalyst
    if(!args.compatOff){
        miMachineRecipe(event, {energy:48, time:200, machine:"modern_industrialization:chemical_plant",
            inputItems: [[args.catalyst, 1, 0]],
            inputFluids:args.inputFluids.map(entry => [entry[0], entry[1] * 100]),
            outputFluids: args.outputFluids.map(entry => [entry[0], entry[1] * 100])
        })
    }
    if (args.removeRecipe) { removeRecipesByOutputs(event, args)}
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    ieRefineryRecipe(event, {
        
        inputFluids:[
            [{ fluid:"immersiveengineering:biodiesel"} , 12 ], 
            [ {fluid :"modern_industrialization:toluene"} , 6 ]
        ],
        outputFluids: [[{ fluid: "immersiveengineering:high_power_biodiesel" }, 18]],
        catalyst: { item:"modern_industrialization:copper_plate" },
        removeRecipe: true
        
    })


    ieRefineryRecipe(event, {
        energy: 120,
        catalyst: { item: "modern_industrialization:aluminum_large_plate" },
        inputFluids: [
            [{ fluid: "modern_industrialization:shale_oil" }, 4],
            [{ fluid: "modern_industrialization:steam" }, 8]
        ],
        outputFluids: [
            [{ fluid: "milf:syngas" }, 3],
        ]
    })

    ieRefineryRecipe(event, {
        energy: 120,
        catalyst: { item: "modern_industrialization:titanium_dust" },
        inputFluids: [
            [{ fluid: "modern_industrialization:ethylene" }, 8],
            [{ fluid: "modern_industrialization:propene" }, 2]
        ],
        outputFluids: [
            [{ fluid: "modern_industrialization:polyethylene" }, 10],
        ],
        removeRecipe: true
    })
})

