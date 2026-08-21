function ieHydrotreaterRecipe(event, args){
    let recipe = {
        type: "immersivepetroleum:hydrotreater",
        energy:args.energy || 8000,
        input:Object.assign({}, args.inputFluids[0][0], {amount:args.inputFluids[0][1] || 1000}),
        secondary_input: Object.assign({}, args.inputFluids[1][0], {amount:args.inputFluids[1][1] || 1000}),
        result: {id:args.outputFluids[0][0].fluid, amount:args.outputFluids[0][1] || 1},
        time:args.time || 100
    }
    if (args.outputItems) recipe.secondary_result = { output: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1, chance: args.outputItems[0][2] || 1 })}
    if(!args.compatOff){
        miMachineRecipe(event, {
            energy: 8, time: recipe.time, machine:"modern_industrialization:chemical_plant",
            outputItems:args.outputItems,
            inputFluids: args.inputFluids,
            outputFluids: args.outputFluids
        })
    }
    if (args.removeRecipe) { removeRecipesByOutputs(event, args) }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    ieHydrotreaterRecipe(event, {
        outputItems:[[ { id: "modern_industrialization:sulfur_dust"}, 1, 0.4]],
        outputFluids:[[ {fluid :"modern_industrialization:naphtha"} , 100 ]],
        inputFluids:[
            [ {fluid :"modern_industrialization:sulfuric_naphtha"} , 100 ], 
            [ {fluid :"modern_industrialization:hydrogen"} , 20 ]
        ],
        time:30
    })

    ieHydrotreaterRecipe(event, {

        inputFluids: [
            [{ fluid: "immersivepetroleum:benzol" }, 120],
            [{ fluid: "modern_industrialization:sulfuric_acid" }, 80]
        ],
        outputFluids: [[{ fluid: "modern_industrialization:benzene" }, 200]],
        time: 40
    })

    ieHydrotreaterRecipe(event, {

        inputFluids: [
            [{ fluid: "modern_industrialization:benzene" }, 120],
            [{ fluid: "modern_industrialization:ethylene" }, 20]
        ],
        outputFluids: [[{ fluid: "immersivepetroleum:gasoline" }, 140]],
        time: 30
    })

    ieHydrotreaterRecipe(event, {

        inputFluids: [
            [{ fluid: "immersivepetroleum:diesel" }, 200],
            [{ fluid: "immersiveengineering:high_power_biodiesel" }, 50]
        ],
        outputFluids: [[{ fluid: "modern_industrialization:boosted_diesel" }, 250]],
        time: 60,
        removeRecipe: true

    })

    ieHydrotreaterRecipe(event, {
        outputItems: [[{ id: "modern_industrialization:sulfur_dust" }, 1, 0.4]],
        outputFluids:[[ {fluid :"immersivepetroleum:diesel"} , 100 ]],
        inputFluids:[
            [ {fluid :"immersivepetroleum:diesel_sulfur"} , 100 ], 
            [ {fluid :"modern_industrialization:hydrogen"} , 20 ]
        ],
        //compatOff:true,
        time:30
    })

    ieHydrotreaterRecipe(event, {
        outputItems: [[{ id: "modern_industrialization:sulfur_dust" }, 1, 0.4]],
        outputFluids:[[ {fluid :"immersivepetroleum:kerosene"} , 100 ]],
        inputFluids:[
            [ {fluid :"milf:high_sulfur_kerosene"} , 100 ], 
            [ {fluid :"modern_industrialization:hydrogen"} , 20 ]
        ],
        //compatOff:true,
        time:30
    })

    // ieHydrotreaterRecipe(event, {
    //     outputItems:[[ { id: "immersivepetroleum:paraffin_wax"}, 1]],
    //     outputFluids:[[ {fluid :"immersivepetroleum:lubricant"} , 100 ]],
    //     inputFluids:[[ {fluid :"modern_industrialization:lubricant"} , 100 ], [ {fluid :"modern_industrialization:hydrogen"} , 20 ]],
    //     //compatOff:true,
    //     time:30
    // })

})