//priority: 10
const MILF_BLUEPRINTS = {
    craftingComponents: "components",
    molds: "molds",

    miBasicComponents: "MI Basic Components",
    miComponents: "MI Components",
    usefulTools: "Useful Tools",

    tier1AE: "Mysterious Blueprint",
    tier2AE: "Storage Blueprint",
    tier3AE: "Automation Blueprint",
    tier4AE: "Quantum Blueprint",
    tier5AE: "Divine Blueprint"
}

/**
 * IE blueprint recipe
 *  - `args`:
 *      - `inputItems` : an array of arrays of the following structure : [{ tag|item : name }, amount], items defaults to 1 item
 *      - `outputItems` : an array of arrays of the following structure : [{ item : name }, amount], items defaults to 1 item
 *      - `category` : blueprint category
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
const ieBlueprintRecipe = (event, args) => {
    let result = JSON.parse(JSON.stringify(args.outputItems[0][0]))
    //console.log(result);
    if (result.hasOwnProperty("item")){
        result["id"] = result["item"]
        delete result["item"]
    }
    //console.log(result);
    let recipe = {
        type: "immersiveengineering:blueprint",
        inputs: [],
        category: args.category,
        result: Object.assign({} ,result, {count: args.outputItems[0][1] || 1}),
    }
    args.inputItems.forEach((input) => {recipe.inputs.push(Object.assign({},{"basePredicate": input[0]}, {count:input[1] || 1}))})
    if(!args.compatOff){
        let token = args.blueprintCompatItem
        miMachineRecipe(event, {energy:2, time:200, machine:"modern_industrialization:assembler",
            inputItems:args.inputItems,
            outputItems:[[{item:recipe.result.id}, recipe.result.count]],
            token:token
        })
    }
    if(args.removeRecipe){event.remove({output: args.outputItems[0][0].item})}
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].item, type: args.removeRecipeType }) }
    //console.log(recipe);
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:iron_large_plate" }, 1],
            [{ "item": "modern_industrialization:steel_gear" }, 1],
            [{ "item": "modern_industrialization:copper_nugget" }, 15],
            [{ "item": "modern_industrialization:rubber_sheet" }, 2]
        ],
        outputItems: [[{ "item": "immersiveengineering:component_iron" }, 2]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipe: true,
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:steel_large_plate" }, 1],
            [{ "item": "modern_industrialization:iron_gear" }, 1],
            [{ "item": "modern_industrialization:bronze_nugget" }, 15],
            [{ "item": "modern_industrialization:rubber_sheet" }, 2]
        ],
        outputItems: [[{ "item": "immersiveengineering:component_steel" }, 2]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipe: true,
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "immersiveengineering:component_electronic" }, 1],
            [{ "item": "modern_industrialization:aluminum_wire" }, 4],
            [{ "item": "modern_industrialization:transistor" }, 2],
            [{ "item": "modern_industrialization:diode" }, 2],
            [{ "item": "immersiveengineering:electron_tube" }, 2]
        ],
        outputItems: [[{ "item": "immersiveengineering:component_electronic_adv" }, 1]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipe: true,
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:copper_wire" }, 2],
            [{ "item": "modern_industrialization:copper_nugget" }, 2],
            [{ "item": "modern_industrialization:rubber_sheet" }, 1],
            [{ "tag": "c:glass_blocks" }, 1]
        ],
        outputItems: [[{ "item": "immersiveengineering:light_bulb" }, 1]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipe: true,
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:electrum_wire" }, 2],
            [{ "item": "modern_industrialization:steel_curved_plate" }, 2],
            [{ "item": "modern_industrialization:invar_rod" }, 1],
            [{ "tag": "c:glass_blocks" }, 1]
        ],
        outputItems: [[{ "item": "immersiveengineering:electron_tube" }, 2]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipe: true,
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "immersiveengineering:slab_storage_steel" }, 1],
            [{ "item": "modern_industrialization:steel_curved_plate" }, 8],
            [{ "item": "modern_industrialization:steel_rod" }, 8]
        ],
        outputItems: [[{ "item": "milf:hemispherical_press_mold" }, 1]],
        category: MILF_BLUEPRINTS.molds,
        removeRecipe: true,
    })

    Ingredient.of("#milf:press_molds").itemIds.forEach(moldId => {
        if (moldId == "milf:hemispherical_press_mold") return
        ieBlueprintRecipe(event, {
            inputItems: [
                [{ "item": "modern_industrialization:steel_large_plate" }, 1],
                [{ "item": "modern_industrialization:steel_rod" }, 4],
                [{ "item": "immersiveengineering:wirecutter" }, 1],
            ],
            outputItems: [[{ "item": moldId }, 1]],
            category: MILF_BLUEPRINTS.molds,
            removeRecipe: true,
        })
    })

})



