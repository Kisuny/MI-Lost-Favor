/**
 * IE crusher recipe
 *  - `args`:
 *      - `energy` : self explanatory, defaults to 102400
 *      - `time` : time in ticks (20 = 1sec), defaults to 200
 *      - --------
 *      - `inputItems` : Array (max 1 elements) - each element looks like this : [{ tag|item : name }, amount], amount defaults to 1 if not specified
 *      - `outputItems` : Array (max ? elements) - first element looks like this : [{ item : name }, amount], every next one : [{ item : name }, amount, chance] amount defaults to 1 if not specified 
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
const ieCrusherCraft = (/**@type {$RecipesKubeEvent_} */ event, args) => {
    let recipe = {
        type: "immersiveengineering:crusher",
        input: args.inputItems[0][0],
        secondaries: [],
        energy: args.energy || 3200,
    }
    args.outputItems.forEach((out, index) => {
        (index == 0) ? recipe.result = {basePredicate:out[0], count:out[1] ?? 1} : recipe.secondaries.push({output:out[0], count:out[1] || 1, chance:out[2]})
    })
    if(!args.compatOff){
        let miEnergy = 4
        switch(args.compatTier){
            case "bronze":
                miEnergy = 2
                break
            case "steel":
                miEnergy = 4
                break
            case "electric":
                miEnergy = 8
                break
        }
        miMachineRecipe(event, {energy:miEnergy, time:args.time || 200, machine:"modern_industrialization:macerator",
            inputItems:args.inputItems,
            outputItems:args.outputItems
        })
    }
    if (args.oriCompat){
        oritechPulverizerRecipe(event, {
            inputItems: args.inputItems,
            outputItems: args.outputItems,
            compatOff: true,

        })
    }
    if(args.removeRecipe){args.outputItems.forEach((out) => {event.remove({output: out[0]})})}
    if (args.removeRecipeType) { args.outputItems.forEach((out) => {event.remove({output: out[0], type:args.removeRecipeType})}) }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    ieCrusherCraft(event,{
        inputItems:[[{"tag": "c:sandstone/uncolored_blocks"}]],
        outputItems:[
            [{item: "minecraft:sand"}, 2],
            [{item: "modern_industrialization:saltpeter_dust"}, 1, 0.5]
        ],
        compatTier:"steel",
    })

    ieCrusherCraft(event,{
        inputItems:[[{"tag": "c:sandstone/red_blocks"}]],
        outputItems:[
            [{item: "minecraft:red_sand"}, 2],
            [{item: "modern_industrialization:saltpeter_dust"}, 1, 0.5]
        ],
        compatTier:"steel",
    })

    ieCrusherCraft(event,{
        inputItems:[[{"item": "extendedae:entro_crystal"}]],
        outputItems:[[{item: "extendedae:entro_dust"}, 1]],
        compatTier: "electric",
    })

    ieCrusherCraft(event,{
        inputItems:[[{"item": "advanced_ae:shattered_singularity"}]],
        outputItems:[[{item: "advanced_ae:quantum_infused_dust"}, 2]],
        compatTier: "electric",
    })

    ieCrusherCraft(event,{
        inputItems:[[{"item": "modern_industrialization:fire_clay_brick"}]],
        outputItems:[[{item: "modern_industrialization:fire_clay_dust"}, 1]],
    })

    let spectrumPowderTypes = ["spectrum:topaz_powder", "spectrum:amethyst_powder", "spectrum:citrine_powder", "spectrum:onyx_powder", "spectrum:moonstone_powder", "spectrum:quitoxic_powder"]

    event.forEachRecipe({ type: 'spectrum:anvil_crushing', output: spectrumPowderTypes}, r => {
        const rjson = JSON.parse(r.json)
        if (rjson.result.id.split(":")[0] == "ae2") return
        if (Array.isArray(rjson.ingredient)) {
            rjson.ingredient.forEach(ing =>{
                ieCrusherCraft(event, {
                    inputItems: [[ing]],
                    outputItems: [[{item:rjson.result.id}, Math.floor(rjson.result.count / 2)], [{item:rjson.result.id}, 1, 0.5]]
                })
            })
        } else {
            ieCrusherCraft(event, {
                inputItems: [rjson.ingredient],
                outputItems: [[{item:rjson.result.id}, Math.floor(rjson.result.count / 2)], [{item:rjson.result.id}, 1, 0.5]]
            })
        }
        
    })  

    const oresToChange = ['iron', 'gold', 'copper', 'tin', 'lead']
    oresToChange.forEach(ore =>{

        ieCrusherCraft(event,{
            inputItems:[[{tag:`c:raw_materials/${ore}`}]],
            outputItems:[
                [{item:`milf:crushed_${ore}`}, 2],
                [{item:`milf:crushed_${ore}`}, 1, 0.5]
            ],
            compatTier:"bronze",
            oriCompat:true
        })
        // miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:macerator",
        //     inputItems:[
        //         [{tag:`c:raw_materials/${ore}`}],
        //     ],
        //     outputItems:[
        //         [{item:`milf:crushed_${ore}`}, 2],
        //         [{item:`milf:crushed_${ore}`}, 1, 0.5]
        //     ]
        // })
    })
})