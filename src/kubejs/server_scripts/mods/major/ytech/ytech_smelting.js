function ytechSmeltingRecipe(event, args) {
    let recipe = {
        type: "ytech:smelting",
        minTemp: args.minTemp || 1000,
        smeltingTime: args.smeltingTime || 200,
        //mold: args.mold || {tag: "ytech:molds/ingot"},
        ingredient:args.inputItems[0][0],
        inputCount:args.inputItems[0][1] || 1,
        result: Object.assign({},args.outputItems[0][0], {count: args.outputItems[0][1] || 1}),
    }
    if(args.mold)  {
        recipe.mold = args.mold
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

    event.remove({type: "ytech:smelting"})
    event.remove({ type: "ytech:hammering" })
    event.remove({ type: "ytech:drying" })
    event.remove({ type: "ytech:alloying" })

    milfSmelting(event, {
        inputItems: [
            [{ item: "ytech:unfired_amphora" }]
        ],
        outputItems: [
            [{ id: "ytech:amphora" }]
        ]
    })

    milfSmelting(event, {
        inputItems: [
            [{ item: "ytech:unfired_decoration_pot" }]
        ],
        outputItems: [
            [{ id: "minecraft:decorated_pot" }]
        ]
    })

    milfSmelting(event, {
        inputItems: [
            [{ item: "ytech:unfired_flower_pot" }]
        ],
        outputItems: [
            [{ id: "minecraft:flower_pot" }]
        ]
    })

    // ytechSmeltingRecipe(event, {
    //     inputItems:[
    //         [{ item: "modern_industrialization:bronze_ingot"}],
    //     ],
    //     outputItems:[
    //         [{ id:"milf:molten_bronze_clay_bucket"}]
    //     ],
    //     mold: { item: "ytech:clay_bucket"},
    //     minTemp: 1000,
    // })
})