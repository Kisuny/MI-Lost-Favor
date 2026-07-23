/**
 * AE in world fluid recipe
 *  - `args`:
 *      - `inputItems` : Array (max ? elements) - each element looks like this : [{ tag|item : name }, amount], amount defaults to 1 if not specified
 *      - `outputItems` : Array (max 1 elements) - each element looks like this : [{ id : name }, amount], amount defaults to 1 if not specified
 *      - `inputFluids` : Array (max 1 elements) - each element looks like this : [{ fluid : name }]
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
const aeInWorldRecipe = (event, args) => {
    let recipe = {
        type: "ae2:transform",
        circumstance:{type: "fluid", tag:args.inputFluids[0][0].fluid},
        ingredients: [],
        result: Object.assign({},args.outputItems[0][0], {count: args.outputItems[0][1] || 1}),
    }
    args.inputItems.forEach((input) => {recipe.ingredients.push(Object.assign({},input[0], {count:input[1] || 1}))})
    if(!args.compatOff){
        miMachineRecipe(event, {energy:2, time:200, machine:"modern_industrialization:mixer",
            inputItems:args.inputItems,
            outputItems:[[{item:recipe.result.id}, recipe.result.count]],
            inputFluids:[[args.inputFluids[0][0], 1000, 0]]
        })
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].id})}
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    aeInWorldRecipe(event,{
        inputItems:[
            [{ "item": "ae2:charged_certus_quartz_crystal" }, 1],
            [{ "tag": "c:gems/quartz" }, 1],
            [{ "item": "minecraft:amethyst_shard" }, 1],
        ],
        outputItems:[[{id:"ae2:fluix_crystal"}]],
        inputFluids: [[{fluid : "minecraft:water"}]],
        removeRecipe:true
    })

    aeInWorldRecipe(event,{
        inputItems:[
            [{ "item": "milf:quantum_blueprint" }, 1],
            [{ "item": "extendedae:entro_shard" }, 1],
            [{ "item": "spectrum:moonstone_core" }, 1],
        ],
        outputItems:[[{id:"milf:divine_blueprint"}]],
        inputFluids: [[{fluid : "justdirethings:refined_t3_fluid_source"}]],
        removeRecipe:true
    })

})