/**
 * @typedef {Object} MilfShapedArgs
 * @property {Object.<string, any>} key
 * @property {string[]} pattern
 * @property {Array<[{id: string}, number]>} outputItems
 * @property {Object} [replace]
 * @property {boolean} [compatOff] - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
 * @property {boolean} [removeRecipe] - if true: removes all other default recipes with this output
 * @property {string} [removeRecipeType] - removes all other recipes with this output of the specified type
 */

/**
 * @param {import("dev.latvian.mods.kubejs.recipe.RecipesKubeEvent").$RecipesKubeEvent$$Original} event
 * @param {MilfShapedArgs} args
 * @returns {void}
 */

function milfShaped(event, args){
    let recipe = {
        type: "minecraft:crafting_shaped",
        category: "misc",
        key: args.key,
        pattern: args.pattern,
        result: Object.assign({},args.outputItems[0][0], {count: args.outputItems[0][1] || 1}),
    }
    if(args.replace){
        recipe.replace = args.replace
    }
    if(!args.compatOff){
        let itemInputs = []
        let amounts = args.pattern.join("")
        
        Object.entries(args.key).forEach(m =>{
            let regex = new RegExp(m[0],'g')
            if(args.replace && Object.keys(args.replace).includes(m[0]) && m[1].item == args.replace[m[0]].item){
                //console.log(m[1]);
                
                itemInputs.push([m[1], (amounts.match(regex) || []).length, 0])
            } else {
                itemInputs.push([m[1], (amounts.match(regex) || []).length])
            }
            //itemInputs.push((amounts.match(regex) || []).length + "x " + m[1])
        })
        miMachineRecipe(event, {energy:2, time:200, machine:"modern_industrialization:assembler",
            inputItems:itemInputs,
            outputItems:[[{item:recipe.result.id}, recipe.result.count]]
        })
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].id})}
    if(args.removeRecipeType){event.remove({output: args.outputItems[0][0].id, type: args.removeRecipeType})}
    event.custom(recipe)
}

function milfShapeless(event, args){
    let recipe = {
        type: "minecraft:crafting_shapeless",
        category: "misc",
        ingredients: args.inputItems.map(i => Object.assign({}, i[0], i[1] > 1 ? {count: i[1]} : {})),
        result: Object.assign({}, args.outputItems[0][0], {count: args.outputItems[0][1] || 1}),
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].id})}
    if(args.removeRecipeType){event.remove({output: args.outputItems[0][0].id, type: args.removeRecipeType})}
    event.custom(recipe)
}

function milfSmelting(/**@type {$RecipesKubeEvent_}*/ event, args){
    let recipe = {
        type: "minecraft:smelting",
        category: "misc",
        cookingtime:args.cookingtime || 200,
        experience: args.experience || 0.7,
        ingredient: args.inputItems[0][0],
        result: Object.assign({},args.outputItems[0][0], {count: args.outputItems[0][1] || 1}),
    }
    if(!args.compatOff){
        miMachineRecipe(event, {energy:2, time:200, machine:"modern_industrialization:mi_furnace",
            inputItems:args.inputItems,
            outputItems:[[{item:recipe.result.id}, recipe.result.count]]
        })
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].id})}
    if(args.removeRecipeType){event.remove({output: args.outputItems[0][0].id, type: args.removeRecipeType})}
    event.custom(recipe)
}

function milfCampfire(event, args){
    let recipe = {
        type: "minecraft:campfire_cooking",
        cookingtime: args.cookingtime || 100,
        experience: args.experience || 0.5,
        ingredient: Object.assign({}, args.inputItems[0][0], { count: args.inputItems[0][1] || 1 }),
        result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
    }
    if (!args.compatOff) {
        miMachineRecipe(event, {
            energy: 2, time: 200, machine: "modern_industrialization:mi_furnace",
            inputItems: args.inputItems,
            outputItems: args.outputItems
        })
    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    event.custom(recipe)
}

function transformShapedRecipe(event, recipe, transformPattern, transformKey){
    let rJSON = JSON.parse(recipe.json)
    //console.log(rJSON);
    
    rJSON.pattern = transformPattern(rJSON.pattern)
    rJSON.key = transformKey(rJSON.key)

    milfShaped(event, {
        pattern: rJSON.pattern,
        key: rJSON.key,
        outputItems: [[rJSON.result]]
    })

    event.remove({ id: recipe.getId(), type: rJSON.type })
}

function transformShapedRecipesForAll(event, ids, transformPattern, transformKey ){
    event.forEachRecipe({ or: ids.map(id => { return { output: id, type:"minecraft:crafting_shaped"}}) }, recipe => {
        transformShapedRecipe(event, recipe, transformPattern, transformKey)
    })
}