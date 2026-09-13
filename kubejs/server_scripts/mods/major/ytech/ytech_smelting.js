function ytechSmeltingRecipe(event, args) {
    let recipe = {
        type: "ytech:smelting",
        minTemp: args.minTemp || 1000,
        smeltingTime: args.smeltingTime || 200,
        mold: args.mold || {tag: "ytech:molds/ingot"},
        ingredient:args.inputItems[0][0],
        inputCount:args.inputItems[0][1] || 1,
        result: Object.assign({},args.outputItems[0][0], {count: args.outputItems[0][1] || 1}),
    }
    if(!args.compatOff){
        // miMachineRecipe(event, {energy:4, time:200, machine:"extended_industrialization:alloy_smelter",
        //     inputItems:args.inputItems,
        //     outputItems:[[{item:recipe.result.id}, recipe.result.count]]
        // })
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].id})}
    event.custom(recipe)
}

ServerEvents.recipes(event => {
    ytechSmeltingRecipe(event, {
        inputItems:[
            [{ item: "modern_industrialization:bronze_ingot"}],
        ],
        outputItems:[
            [{ id:"milf:molten_bronze_clay_bucket"}]
        ],
        mold: { item: "ytech:clay_bucket"},
        minTemp: 1000,
    })
})