/**
 * IE Arc furnace recipe
 *  - `args`:
 *      - `energy` : self explanatory, defaults to 102400
 *      - `time` : time in ticks (20 = 1sec), defaults to 200
 *      - --------
 *      - `inputItems` : Array (max 5 elements) - each element looks like this : [{ tag|item : name }, amount], amount defaults to 1 if not specified
 *      - `outputItems` : Array (max ? elements) - each element looks like this : [{ item : name }, amount], amount defaults to 1 if not specified
 *      - `slag` : true(1 slag) or an array of arrays of the following structure : [{ tag|item : name }, amount], defaults to 1 item 
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
const ieArcFurnaceCraft = (event, args) => {
    let recipe = {
        type: "immersiveengineering:arc_furnace",
        additives: [],
        results: [],
        secondaries: [],
        energy: args.energy || 102400,
        time: args.time || 200
    }
    args.inputItems.forEach((input, index) => {index == 0 ? recipe.input = {basePredicate:input[0], count:input[1] || 1} : recipe.additives.push({basePredicate:input[0], count:input[1] || 1})})
    args.outputItems.forEach((out) => {out[2] ? recipe.secondaries.push({output:{basePredicate:out[0], count:out[1] || 1}, chance:out[2]}) : recipe.results.push({basePredicate:out[0], count:out[1] || 1})})
    if (args.slag){recipe.slag = args.slag == true ? {basePredicate: {"item": "immersiveengineering:slag"}, count: 1} : {basePredicate: args.slag[0][0], count: args.slag[0][1] || 1}}
    if(!args.compatOff){
        miMachineRecipe(event, {energy:32, time:args.time || 200, machine:"modern_industrialization:blast_furnace",
            inputItems:args.inputItems,
            outputItems:args.outputItems.concat(args.slag == true ? [[{"item": "immersiveengineering:slag"}]] : args.slag || [[]])
        })
    }
    if(args.removeRecipe){event.remove(args.outputItems.forEach((out) => {event.remove({output: out})}))}
    if (args.removeRecipeType) {
        args.outputItems.forEach((out) => {
            event.remove({ output: out[0]?.item || `#${out[0].tag}`, type: args.removeRecipeType })
        })
    }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    ieArcFurnaceCraft(event,{
        inputItems:[
            [{"item": "ae2:mysterious_cube"}, 1],
            [{"item": "spectrum:bottle_of_fading"}, 4],
            [{"item": "spectrum:light_blue_pigment"}, 32]
        ],
        outputItems:[
            [{"item": "ae2:controller"}, 1],
            [{"item": "ae2:terminal"}, 1],
            [{"item": "milf:blueprint_pack"}, 1],
            [{"item": "milf:disk_from_space"}, 1],

        ],
        slag:[
            [{"item": "spectrum:vegetal"}, 4]
        ]
    })

    ieArcFurnaceCraft(event,{
        inputItems:[
            [{"tag": "minecraft:smelts_to_glass"}, 6],
            [{"tag": "c:dusts/certus_quartz"}, 3],
            [{"tag": "c:dusts/quartz"}, 2]
        ],
        outputItems:[
            [{"item": "ae2:quartz_glass"}, 6]

        ],
        slag:[
            [{"item": "extendedae:quartz_blend"}, 3]
        ]
    })

    ieArcFurnaceCraft(event,{
        inputItems:[
            [{ "tag": "minecraft:smelts_to_glass"}, 6],
            [{"tag": "c:dusts/certus_quartz"}, 3],
            [{"tag": "c:dusts/quartz"}, 2],
            [{"item": "spectrum:shimmerstone_gem"}, 3]
        ],
        outputItems:[
            [{"item": "ae2:quartz_vibrant_glass"}, 6]
        ],
        slag:[
            [{"item": "extendedae:quartz_blend"}, 3]
        ]
    })

    ieArcFurnaceCraft(event,{
        inputItems:[
            [{"tag": "c:sands"}, 3],
            [{"tag": "c:dusts/aluminum"}, 3],
            [{"tag": "c:dusts/quartz"}, 2],
            [{"tag": "c:dusts/lead"}, 2],
        ],
        outputItems:[
            [{"item": "milf:tempered_glass"}, 3]
        ],
        slag:true
    })

    ieArcFurnaceCraft(event,{
        inputItems:[
            [{"item": "minecraft:iron_ingot"}, 3],
            [{"item": "modern_industrialization:coke_dust"}, 1]
        ],
        outputItems:[
            [{"item": "modern_industrialization:steel_ingot"}, 3]
        ],
        slag:true
    })

    ieArcFurnaceCraft(event, {
        inputItems: [
            [{ "item": "minecraft:netherrack" }, 1],
            [{ "item": "minecraft:basalt" }, 1]
        ],
        outputItems: [
            [{ "item": "minecraft:nether_brick" }, 2]
        ],
        slag: [
            [{ "item": "supplementaries:ash" }, 1]
        ]
    })

    //wth
    ieArcFurnaceCraft(event,{
        inputItems:[
            [{"item": "minecraft:netherite_helmet"}, 1],
            [{"item": "spectrum:horse_head"}, 4],
            [{"tag": "immersiveengineering:treated_wood"}, 16],
            [{"tag": "c:nuggets/copper"}, 6],
            [{"item": "minecraft:netherite_block"}, 4]
        ],
        outputItems:[
            [{"item": "milf:meze_109"}, 1]
        ],
        slag:[
            [{"item": "spectrum:skeleton_horse_head"}, 4]
        ]
    })

    ieArcFurnaceCraft(event, {
        inputItems: [
            [{ "item": "modern_industrialization:bauxite_dust" }, 12],
            [{ "item": "modern_industrialization:carbon_dust" }, 2],
        ],
        outputItems: [
            [{ "item": "modern_industrialization:aluminum_ingot" }, 3],
            [{ "item": "modern_industrialization:titanium_tiny_dust" }, 2],
            [{ "item": "modern_industrialization:titanium_tiny_dust" }, 1, 0.5],
            [{ "item": "modern_industrialization:titanium_tiny_dust" }, 1, 0.3],
            [{ "item": "modern_industrialization:titanium_tiny_dust" }, 1, 0.1]
        ],
        slag: [
            [{ "item": "milf:ferrosilicon_dust" }, 2]
        ],
        removeRecipeType:"immersiveengineering:arc_furnace",
        compatOff:true
    })

    ieArcFurnaceCraft(event, {
        inputItems: [
            [{ "item": "extendedae:quartz_blend" }, 1],
            [{ "item": "modern_industrialization:coke_dust" }, 2],
        ],
        outputItems: [
            [{ "item": "ae2:silicon" }, 1],
            [{ "item": "modern_industrialization:hop_graphite_dust" }, 1, 0.08]
        ],
        removeRecipeType: "immersiveengineering:arc_furnace",
        compatOff: true
    })

})