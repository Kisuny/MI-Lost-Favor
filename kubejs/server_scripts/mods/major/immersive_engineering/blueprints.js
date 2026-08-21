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
    tier5AE: "Divine Blueprint",


    /**
     * @returns {Record<Exclude<keyof typeof MILF_BLUEPRINTS, 'getAsItem'>, BlueprintItem>} 
     */
    get getAsItem() {
        let result = {}

        let blueprintToColorMap = {
            tier1AE: "#84b9ff",
            tier2AE: "#fff678",
            tier3AE: "#8de8ff",
            tier4AE: "#c795ff",
            tier5AE: "#abffc0",

            miBasicComponents: "#F06E28",
            miComponents: "#28B1F0",
            usefulTools: "#ccac7c",
        }

        for (const key of Object.keys(this)) {
            if (key != "getAsItem" && key != "getDisk") {
                result[key] = {
                    id: "immersiveengineering:blueprint",
                    count: 1,
                    components: {
                        "immersiveengineering:blueprint": this[key],
                        "minecraft:item_name": "{'text':'" + this[key] + "','color':'" + (blueprintToColorMap[key] || "#FCFCFD") + "'}"
                    }
                }
            }
        }

        return result
    },

    get getDisk(){

        return {
            tier1AE: "milf:mysterious_disk",
            tier2AE: "milf:mysterious_disk",
            tier3AE: "milf:storage_disk",
            tier4AE: "milf:automation_disk",
            tier5AE: "milf:quantum_disk",
        }

    },

    getKeyFromValue(value){
        return Object.keys(this).find(key => this[key] == value)
    }
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

        let miArgs = {
            energy: 2, time: 200, machine: "modern_industrialization:assembler",
            inputItems: args.inputItems,
            outputItems: [[{ item: recipe.result.id }, recipe.result.count]]
        }

        let disk = MILF_BLUEPRINTS.getDisk[MILF_BLUEPRINTS.getKeyFromValue(args.category)]

        //console.log(disk);
        

        if (disk){
            miArgs.requiredDisk = { item: disk }
        }

        miMachineRecipe(event, miArgs)
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



