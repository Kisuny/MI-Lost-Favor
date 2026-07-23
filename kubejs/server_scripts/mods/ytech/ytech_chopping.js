/**
 * Ytech chopping recipe
 *  - `args`:
 *      - `inputItems` : Array (max 1 elements) - each element looks like this : [{ tag|item : name }, amount], amount defaults to 1 if not specified
 *      - `outputItems` : Array (max 1 elements) - each element looks like this : [{ id : name }, amount], amount defaults to 1 if not specified
 *      - `hitCount` : defaults to 3
 *      - `tool` : {item|tag : name}, defaults to {tag : "minecraft:axes"}
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
const ytechChoppingCraft = (event, args) => {
    let recipe = {
        type: "ytech:chopping",
        hitCount: args.hitCount || 3,
        tool: args.tool || {tag : "minecraft:axes"},
        ingredient: args.inputItems[0][0],
        result: Object.assign({},args.outputItems[0][0], {count: args.outputItems[0][1] || 1}),
    }
    if(!args.compatOff){
        miMachineRecipe(event, {energy:2, time:100, machine:"modern_industrialization:cutting_machine",
            inputItems:args.inputItems,
            outputItems:[[{item:recipe.result.id}, recipe.result.count]],
            inputFluids:[[{fluid:"modern_industrialization:lubricant"}, 1]]
        })
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].id})}
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    ytechChoppingCraft(event,{
        inputItems:[[{tag: "c:bones"}]],
        outputItems:[[{id:"ytech:bone_needle"}]],
        tool: {tag : "milf:knives"},
    })

    ytechChoppingCraft(event,{
        inputItems:[[{item: "minecraft:iron_nugget"}]],
        outputItems:[[{id:"milf:needle"}]],
        tool: {tag : "milf:knives"},
    })

    ytechChoppingCraft(event, {
        inputItems: [[{ tag: "minecraft:wooden_slabs" }]],
        outputItems: [[{ id: "minecraft:stick" }, 2]],
        tool: { tag: "minecraft:axes" },
        removeRecipe: true
    })

    ytechChoppingCraft(event,{
        inputItems:[[{item: "ytech:terracotta_bricks"}]],
        outputItems:[[{id:"ytech:terracotta_aqueduct"}]],
        tool: {tag : "c:hammers"},
        removeRecipe:true
    })

    ytechChoppingCraft(event,{
        inputItems:[[{item: "minecraft:mud_bricks"}]],
        outputItems:[[{id:"ytech:mudbrick_aqueduct"}]],
        tool: {tag : "c:hammers"},
        removeRecipe:true
    })

    ytechChoppingCraft(event,{
        inputItems:[[{item: "minecraft:stone_bricks"}]],
        outputItems:[[{id:"ytech:stone_aqueduct"}]],
        tool: {tag : "c:hammers"},
        removeRecipe:true
    })

    ytechChoppingCraft(event, {
        inputItems: [[{ item: "architects_palette:rotten_flesh_block" }]],
        outputItems: [[{ id: "milf:larva" }, 3]],
        tool: { item: "minecraft:stick" },
        compatOff:true
    })


    ytechChoppingCraft(event, {
        outputItems: [[{ "id": "minecraft:stick" }, 1]],
        inputItems: [[{ "item": "milf:twig" }],],
        tool: { tag: "milf:knives" }  
    })

})