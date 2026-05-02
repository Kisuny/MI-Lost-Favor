function justdirethingsGoospread(event, args){
    let recipe = {
        type: "justdirethings:goospread",
        craftingDuration: args.craftingDuration || 2400,
        ingredient: args.inputItems[0][0],
        input: {Name:args.inputItems[0][0].item, Properties: {level:args.level || "0"}},
        output: {Name:args.outputItems[0][0].item, Properties: {level:args.level || "0"}},
        id:args.id || "milf:" + args.outputItems[0][0].item.split(':')[1],
        tierRequirement:args.tierRequirement || 1
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].item})}
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    justdirethingsGoospread(event,{
        inputItems: [[{ item: "extendedae:machine_frame"}]],
        outputItems: [[{ item:"ae2:controller"}]],
        craftingDuration:10000,
        tierRequirement:4
    }) 

})