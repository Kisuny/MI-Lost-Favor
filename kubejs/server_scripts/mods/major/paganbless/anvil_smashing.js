/**
 * Paganbless anvil smashing recipe
 *  - `args`:
 *      - `inputItems` : Array (max 3 elements) - each element looks like this : [{ tag|item : name }, amount], amount defaults to 1 if not specified
 *      - `outputItems` : Array (max 1 elements) - each element looks like this : [{ id : name }, amount], amount defaults to 1 if not specified
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
const anvilSmashingCraft = (event, args) => {
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

    function anvil_recipe(inputs, output) {
        anvilSmashingCraft(event, {
            inputItems: inputs,
            outputItems: [output],
            removeRecipe: true
        })
    }

    anvil_recipe(
        [
            [{ "tag": "c:bolts/aluminum" }, 4],
            [{ "tag": "c:rods/aluminum" }, 4],
            [{ "tag": "c:ingots/aluminum" }, 2],
        ],
        [{ "id": 'hangglider:glider_framework' }, 1]
    )


    anvil_recipe(
        [
            [{ "tag": "c:bolts/iron" }, 4],
            [{ "tag": "c:plates/iron" }, 2],
            [{ "tag": "c:dusts/iron" }, 4],
        ],
        [{ "id": 'moderndynamics:inhibitor' }, 2]
    )

    anvil_recipe(
        [
            [{ "tag": "c:bolts/iron" }, 4],
            [{ "tag": "c:plates/iron" }, 2],
            [{ "tag": "c:dusts/lead" }, 4],
        ],
        [{ "id": 'moderndynamics:attractor' }, 1]
    )

    anvil_recipe(
        [
            [{ "tag": "c:bolts/iron" }, 4],
            [{ "tag": "c:plates/iron" }, 2],
            [{ "tag": "c:dusts/redstone" }, 4],
        ],
        [{ "id": 'moderndynamics:extractor' }, 1]
    )

    anvil_recipe(
        [
            [{ "tag": "c:bolts/iron" }, 4],
            [{ "tag": "c:plates/iron" }, 2],
            [{ "tag": "c:dusts/bronze" }, 4],
        ],
        [{ "id": 'moderndynamics:filter' }, 1]
    )

    anvil_recipe(
        [
            [{ "item": "milf:bronze_glass" }, 4],
            [{ "item": "modern_industrialization:copper_plate" }, 6],
        ],
        [{ "id": 'moderndynamics:fluid_pipe' }, 8]

    )

    anvil_recipe(
        [
            [{ "item": "milf:bronze_glass" }, 2],
            [{ "item": "modern_industrialization:iron_large_plate" }, 2],
        ],
        [{ "id": 'moderndynamics:item_pipe' }, 6]

    )

    //#region mi stuff

    function casingMIRecipe(material, outputID) {
        anvil_recipe(
            [
                [{ "tag": `c:bolts/${material}` }, 8],
                [{ "tag": `c:gears/${material}` }, 1],
                [{ "tag": `c:plates/${material}` }, 8],
            ],
            [{ "id": outputID ?? `modern_industrialization:${material}_machine_casing` }, 1]
        );
    }

    casingMIRecipe('bronze')
    casingMIRecipe('steel')
    casingMIRecipe('invar', 'modern_industrialization:heatproof_machine_casing')
    casingMIRecipe('titanium', 'modern_industrialization:solid_titanium_machine_casing')
    casingMIRecipe('stainless_steel', 'modern_industrialization:clean_stainless_steel_machine_casing')
    casingMIRecipe('aluminum', 'modern_industrialization:frostproof_machine_casing')
    casingMIRecipe('bioresistant_alloy', "modern_industrialization:bioresistant_machine_casing")
    casingMIRecipe('tumbaga')
    casingMIRecipe('silicon_steel')

    anvil_recipe(
        [
            [{ "tag": "c:bolts/bronze" }, 8],
            [{ "item": "modern_industrialization:fire_clay_bricks" }, 1],
            [{ "tag": "c:plates/bronze" }, 8],
        ],
        [{ "id": 'modern_industrialization:bronze_plated_bricks' }, 1]
    )

    // anvil_recipe(
    //     [
    //         [{ "tag": "c:bolts/steel" }, 8],
    //         [{ "item": "modern_industrialization:fire_clay_bricks" }, 1],
    //         [{ "tag": "c:plates/steel" }, 8],
    //     ],
    //     [{ "id": 'extended_industrialization:steel_plated_bricks' }, 1]
    // )

    anvil_recipe(
        [
            [{ "tag": "c:plates/copper" }, 2],
            [{ "tag": "c:bolts/copper" }, 4],
        ],
        [{ "id": 'milf:small_copper_fluid_container' }, 1]
    )

    anvil_recipe(
        [
            [{ "tag": "c:plates/steel" }, 2],
            [{ "tag": "c:bolts/steel" }, 4],
        ],
        [{ "id": 'milf:small_steel_fluid_container' }, 1]
    )

    anvil_recipe(
        [
            [{ "item": "immersiveengineering:fluid_pipe" }, 6],
            [{ "item": "milf:steel_infused_glass" }, 1],
            [{ "item": "milf:steel_machine_bit" }, 10],
        ],
        [{ "id": 'modern_industrialization:steel_upgrade' }, 1]
    )

    anvil_recipe(
        [
            [{ "tag": "c:bolts/bronze" }, 4],
            [{ "tag": "c:rods/bronze" }, 1],
            [{ "tag": "c:plates/bronze" }, 2],
        ],
        [{ "id": 'modern_industrialization:wrench' }, 1]
    )

    anvil_recipe(
        [
            [{ "item": "knightlib:great_essence" }, 13],
        ],
        [{ "id": 'grimoireofgaia:experience_iron' }, 1]
    )

    //#endregion

    //spectrum compat
    event.forEachRecipe({ type: 'spectrum:anvil_crushing', not : {output: "#milf:nocompat"}}, r => {
        const rjson = JSON.parse(r.json)
        if (rjson.result.id.split(":")[0] == "ae2") return
        if (Array.isArray(rjson.ingredient)) {
            rjson.ingredient.forEach(ing =>{
                anvilSmashingCraft(event, {
                    inputItems: [[ing]],
                    outputItems: [[rjson.result]],
                    compatOff:true
                })
            })
        } else {
            anvilSmashingCraft(event, {
                inputItems: [rjson.ingredient],
                outputItems: [[rjson.result]],
                compatOff:true
            })
        }
        
    })

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