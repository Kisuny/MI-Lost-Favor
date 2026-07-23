/**
 * Ytech alloying recipe
 *  - `args`:
 *      - `inputItems` : Array (max 2 elements) - each element looks like this : [{ tag|item : name }, amount], amount defaults to 1 if not specified
 *      - `outputItems` : Array (max 1 elements) - each element looks like this : [{ id : name }, amount], amount defaults to 1 if not specified
 *      - `minTemp` : defaults to 1000
 *      - `smeltingTime` : defaults to 200
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
const ytechAlloyingCraft = (event, args) => {
    let recipe = {
        type: "ytech:alloying",
        minTemp: args.minTemp || 1000,
        smeltingTime: args.smeltingTime || 200,
        ingredient1: {ingredient:args.inputItems[0][0], count:args.inputItems[0][1] || 1},
        ingredient2: {ingredient:args.inputItems[1][0], count:args.inputItems[1][1] || 1},
        result: Object.assign({},args.outputItems[0][0], {count: args.outputItems[0][1] || 1}),
    }
    if(!args.compatOff){
        miMachineRecipe(event, {energy:4, time:200, machine:"extended_industrialization:alloy_smelter",
            inputItems:args.inputItems,
            outputItems:[[{item:recipe.result.id}, recipe.result.count]]
        })
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].id})}
    event.custom(recipe)
}
ServerEvents.recipes(event => {

    ytechAlloyingCraft(event, {
        inputItems:[
            [{tag: "c:sands"}],
            [{tag: "c:dusts/bronze"}]
        ],
        outputItems:[
            [{id:"milf:bronze_glass"},2]
        ],
        minTemp: 1000
    })

    ytechAlloyingCraft(event, {
        inputItems:[
            [{tag: "c:sands"}],
            [{tag: "c:dusts/steel"}]
        ],
        outputItems:[
            [{id:"milf:steel_infused_glass"},2]
        ],
        minTemp: 1200
    })

    ytechAlloyingCraft(event, {
        inputItems:[
            [{tag: "c:cobblestones"}],
            [{item: "ytech:pebble"}]
        ],
        outputItems:[
            [{id:"minecraft:stone"}]
        ],
        minTemp: 800
    })

    ytechAlloyingCraft(event, {
        inputItems:[
            [{item: "minecraft:copper_ingot"}, 3],
            [{item: "modern_industrialization:tin_ingot"}]
        ],
        outputItems:[
            [{id:"modern_industrialization:bronze_ingot"}, 4]
        ],
        minTemp: 1085,
        compatOff:true
    })

})