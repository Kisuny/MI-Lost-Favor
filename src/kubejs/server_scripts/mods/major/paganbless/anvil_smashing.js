/**
 * Paganbless anvil smashing recipe
 *  - `args`:
 *      - `inputItems` : Array (max 3 elements) - each element looks like this : [{ tag|item : name }, amount], amount defaults to 1 if not specified
 *      - `outputItems` : Array (max 1 elements) - each element looks like this : [{ id : name }, amount], amount defaults to 1 if not specified
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
function paganAnvilSmashingRecipe(event, args) {
    let recipe = {
        type: "paganbless:anvil_smashing",
        ingredients: [],
        result: Object.assign({},args.outputItems[0][0], {count: args.outputItems[0][1] || args.outputItems[0][0].count || 1}),
    }
    args.inputItems.forEach((input) => {recipe.ingredients.push(Object.assign({},input[0], {count:input[1] || 1}))})
    if(!args.compatOff){
        miMachineRecipe(event, {energy:2, time:200, machine:"modern_industrialization:packer",
            inputItems:args.inputItems,
            outputItems:[[{item:recipe.result.id}, recipe.result.count]]
        })
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].id})}
    event.custom(recipe)
}


ServerEvents.recipes(event => {

    function anvulRecipe(inputs, output) {
        paganAnvilSmashingRecipe(event, {
            inputItems: inputs,
            outputItems: [output],
            removeRecipe: true
        })
    }

    anvulRecipe(
        [
            [{ "tag": "c:bolts/aluminum" }, 4],
            [{ "tag": "c:rods/aluminum" }, 4],
            [{ "tag": "c:ingots/aluminum" }, 2],
        ],
        [{ "id": 'hangglider:glider_framework' }, 1]
    )


    //#region mi stuff

    anvulRecipe(
        [
            [{ "tag": "c:bolts/bronze" }, 8],
            [{ "item": "modern_industrialization:fire_clay_bricks" }, 1],
            [{ "tag": "c:plates/bronze" }, 8],
        ],
        [{ "id": 'modern_industrialization:bronze_plated_bricks' }, 1]
    )

    anvulRecipe(
        [
            [{ "item": "immersiveengineering:fluid_pipe" }, 2],
            [{ "item": "milf:steel_infused_glass" }, 2],
            [{ "item": "milf:steel_machine_bit" }, 4],
        ],
        [{ "id": 'modern_industrialization:steel_upgrade' }, 1]
    )

    anvulRecipe(
        [
            [{ "item": "minecraft:stick" }, 2],
            [{ "item": "modern_industrialization:iron_bolt" }, 3],
            [{ "item": "modern_industrialization:iron_rod" }, 2],
        ],
        [{ "id": 'minecraft:iron_pickaxe' }, 1]
    )

    //#endregion

    //spectrum compat
    // event.forEachRecipe({ type: 'spectrum:anvil_crushing', not : {output: "#milf:nocompat"}}, r => {
    //     const rjson = JSON.parse(r.json)
    //     if (rjson.result.id.split(":")[0] == "ae2") return
    //     if (Array.isArray(rjson.ingredient)) {
    //         rjson.ingredient.forEach(ing =>{
    //             anvilSmashingCraft(event, {
    //                 inputItems: [[ing]],
    //                 outputItems: [[rjson.result]],
    //                 compatOff:true
    //             })
    //         })
    //     } else {
    //         anvilSmashingCraft(event, {
    //             inputItems: [rjson.ingredient],
    //             outputItems: [[rjson.result]],
    //             compatOff:true
    //         })
    //     }
        
    // })

    //mi compat

    event.forEachRecipe({ type: 'paganbless:anvil_smashing', not: { output: "#milf:nocompat" }}, r => {
        const rjson = JSON.parse(r.json)

        if (rjson.result.id == "minecraft:redstone") return

        const inputItems = rjson.ingredients.map(ingredient => {
            let itemOrTagKey = Object.keys(ingredient).find(key => key != "count")
            let itemOrTag = {}
            itemOrTag[itemOrTagKey] = ingredient[itemOrTagKey]
            
            return [itemOrTag, ingredient.count]
        })        

        miMachineRecipe(event, {
            energy: 2, time: 200, machine: "modern_industrialization:packer",
            inputItems: inputItems,
            outputItems: [[{ item: rjson.result.id }, rjson.result.count]]
        })
        
        //press_mi((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_unpacking', (rjson.duration * rjson.eu))
    })

})