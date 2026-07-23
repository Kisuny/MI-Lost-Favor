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
    ieRefineryRecipe(event, {
        outputFluids:[[ {fluid :"modern_industrialization:hydrogen"} , 16 ]],
        inputFluids:[[ {fluid :"immersiveengineering:ethanol"} , 8 ], [ {fluid :"modern_industrialization:steam"} , 16 ]],
        compatOff:true,
        catalyst: { item:"modern_industrialization:nickel_plate" }
        
    })

    ieRefineryRecipe(event, {
        outputFluids:[[ {fluid :"modern_industrialization:styrene"} , 16 ]],
        inputFluids:[[ {fluid :"modern_industrialization:benzene"} , 8 ], [ {fluid :"modern_industrialization:ethylene"} , 8 ]],
        compatOff:true,
        catalyst: { item:"modern_industrialization:copper_plate" }
        
    })

    ieRefineryRecipe(event, {
        outputFluids:[[ {fluid :"immersiveengineering:high_power_biodiesel"} , 16 ]],
        inputFluids:[[ {fluid :"immersivepetroleum:diesel"} , 8 ], [ {fluid :"modern_industrialization:toluene"} , 8 ]],
        compatOff:true,
        catalyst: { item:"modern_industrialization:copper_plate" }
        
    })

    ieRefineryRecipe(event, {
        outputFluids:[[ {fluid :"immersivepetroleum:benzol"} , 16 ]],
        inputFluids:[[ {fluid :"modern_industrialization:benzene"} , 12 ], [ {fluid :"modern_industrialization:toluene"} , 4 ]],
        compatOff:true,
        catalyst: { item:"modern_industrialization:raw_platinum" }
        
    })

    ieRefineryRecipe(event, {
        outputFluids:[[ {fluid :"immersivepetroleum:gasoline"} , 16 ]],
        inputFluids:[[ {fluid :"immersivepetroleum:benzol"} , 12 ], [ {fluid :"modern_industrialization:toluene"} , 4 ]],
        compatOff:true,
        catalyst: { item:"modern_industrialization:raw_platinum" }
    })
})

