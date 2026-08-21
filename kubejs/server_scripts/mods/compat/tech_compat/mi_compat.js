ServerEvents.tags('item', event => {
    let noCompat = [
        //item outputs that will not be converted
        "modern_industrialization:blastproof_alloy_plate",
        "minecraft:stick",
        "minecraft:chain",
        "modern_industrialization:fire_clay_bricks",
    ]

    event.add('milf:nocompat', noCompat)
})

ServerEvents.recipes(event => {

    //#region macerator
    function crusherAndPulverizer(ingredient, result, miEnergy){
        let ieOutput = []
        let oriOutput = []
        result.forEach((out) => {
            ieOutput.push([{ item: out.item }, out.amount, out.probability])
            oriOutput.push([{ id: out.item }, out.amount, out.probability])
        })

        let item
        let isRawOreInput = false
        let isOreInput = false
        let isCrushedDustInput = false

        if (ingredient.item){            
            item = Item.of(ingredient.item)
            if (item && (item.hasTag("c:raw_materials")) || (item.hasTag("c:crushed_ores"))) {
                isRawOreInput = true
            }
            if (item && item.hasTag("c:ores")) {
                isOreInput = true
            }
            if (item && item.hasTag("c:crushed_dusts")) {
                isCrushedDustInput = true
            }
        } else {
            let key = $TagKey.create($Registries.ITEM, $ResourceLocation.parse(ingredient.tag))
            let tagItems = $BuiltInRegistries.ITEM.getOrCreateTag(key)
            isRawOreInput = tagItems.stream().anyMatch(holder => {
                let currentItem = Item.of(holder.value())
                return currentItem && (currentItem.hasTag("c:raw_materials")) || (currentItem.hasTag("c:crushed_ores"))
            })
            isOreInput = tagItems.stream().anyMatch(holder => {
                let currentItem = Item.of(holder.value())
                return currentItem && currentItem.hasTag("c:ores")
            })
            isCrushedDustInput = tagItems.stream().anyMatch(holder => {
                let currentItem = Item.of(holder.value())
                return currentItem && currentItem.hasTag("c:crushed_dusts")
            })
        }

        if(isOreInput){
            ieCrusherRecipe(event, {
                inputItems: ingredient.tag ? [[{ tag: ingredient.tag }, ingredient.amount]] : [[{ item: ingredient.item }, ingredient.amount]],
                outputItems: ieOutput.map(entry => [
                    entry[0], Math.ceil(entry[1] * 1.3), entry[2]
                ]).concat(ieOutput.map(entry => [
                    entry[0], Math.ceil(1), 0.65
                ])),
                energy: miEnergy,
                compatOff: true,
                removeRecipeType: "immersiveengineering:crusher"
            })
        } else {
            ieCrusherRecipe(event, {
                inputItems: ingredient.tag ? [[{ tag: ingredient.tag }, ingredient.amount]] : [[{ item: ingredient.item }, ingredient.amount]],
                outputItems: ieOutput,
                energy: miEnergy,
                compatOff: true,
                removeRecipeType: "immersiveengineering:crusher"
            })
        }

        if (isCrushedDustInput){
            oritechGrinderRecipe(event, {
                inputItems: ingredient.tag ? [[{ tag: ingredient.tag }, ingredient.amount]] : [[{ item: ingredient.item }, ingredient.amount]],
                outputItems: oriOutput,
                compatOff: true,
            })
        }



        if (isRawOreInput && oriOutput.length <= 2){
            //console.log(ingredient);
            
            oritechPulverizerRecipe(event, {
                inputItems: ingredient.tag ? [[{ tag: ingredient.tag }, ingredient.amount]] : [[{ item: ingredient.item }, ingredient.amount]],
                outputItems: oriOutput,
                compatOff: true,

            })
        }        

        //event.remove({ type: 'immersiveengineering:crusher', output:result[0].item})

    }

    event.remove({ type: 'immersiveengineering:crusher', output:"minecraft:amethyst_shard"})
    event.remove({ type: 'immersiveengineering:crusher', output: "minecraft:emerald" })
    event.remove({ type: 'immersiveengineering:crusher', output: "minecraft:coal" })
    event.remove({ type: 'immersiveengineering:crusher', output: "minecraft:diamond" })

    event.forEachRecipe({ type: 'modern_industrialization:macerator', not : {output: "#milf:nocompat"}}, r => {
        const rjson = JSON.parse(r.json)
        if(!Array.isArray(rjson.item_inputs)){rjson.item_inputs = [rjson.item_inputs]}
        if(!Array.isArray(rjson.item_outputs)){rjson.item_outputs = [rjson.item_outputs]}
        crusherAndPulverizer((rjson.item_inputs)[0], rjson.item_outputs, rjson.duration * rjson.eu * 10)

        rjson.item_outputs.forEach(output =>{            
            event.remove({ type: 'immersiveengineering:crusher', output:output?.item || `#${output?.tag}`})
        })

        rjson.item_inputs.forEach(input =>{            
            event.remove({ type: 'immersiveengineering:crusher', input:input?.item ||  `#${input?.tag}`})
        })
    })

    //#endregion

    //#region press
    function pressCompatRecipe(ingredients, result, mold, miEnergy){
        iePressRecipe(event, {
            inputItems: ingredients.tag ? [[{tag:ingredients.tag}, ingredients.amount]] : [[{item:ingredients.item}, ingredients.amount]],
            outputItems: [[{id:result.item}, result.amount]],
            mold: {item : mold},
            energy: miEnergy,
            compatOff: true,
        })
        event.remove({ type: 'immersiveengineering:metal_press', output:result.item})
    }

    event.forEachRecipe({ type: 'modern_industrialization:compressor', not : {output: "#milf:nocompat"}, output:"#c:plates"}, r => {
        const rjson = JSON.parse(r.json)
        pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_plate', (rjson.duration * rjson.eu * 6))
    })

    event.forEachRecipe({ type: 'modern_industrialization:compressor', not: { output: "#milf:nocompat" }, output: "#c:curved_plates" }, r => {
        const rjson = JSON.parse(r.json)
        pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'milf:hemispherical_press_mold', (rjson.duration * rjson.eu * 6))
    })

    event.forEachRecipe({ type: 'modern_industrialization:compressor', not: { output: "#milf:nocompat" }, output: "#c:rings" }, r => {
        const rjson = JSON.parse(r.json)        
        pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'milf:hemispherical_press_mold', (rjson.duration * rjson.eu * 6))
    })

    event.forEachRecipe({ type: 'modern_industrialization:cutting_machine', not : {output: "#milf:nocompat"}, output:"#c:rods"}, r => {
        const rjson = JSON.parse(r.json)
        pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_rod', (rjson.duration * rjson.eu * 6))
    })

    event.forEachRecipe({ type: 'modern_industrialization:assembler', not: { output: "#milf:nocompat" }, output: "#c:gears" }, r => {
        const rjson = JSON.parse(r.json)
        let input = Object.assign({}, (rjson.item_inputs)[0], { amount: 1, tag: (rjson.item_inputs)[0].tag.replace("plates", "large_plates")})
        
        let output = Object.assign({}, (rjson.item_outputs)[0], { amount: 1 })
        pressCompatRecipe(input, output, 'immersiveengineering:mold_gear', (rjson.duration * rjson.eu * 12))
    })

    event.forEachRecipe({ type: 'modern_industrialization:wiremill', not : {output: "#milf:nocompat"}, output:"#c:wires"}, r => {
        const rjson = JSON.parse(r.json)        
        event.remove({ output: (rjson.item_outputs)[0].item, type: "immersiveengineering:metal_press" })
    })
    event.forEachRecipe({ type: 'modern_industrialization:unpacker', not : {output: "#milf:nocompat"}, output:["#c:ingots","#c:nuggets","#c:tiny_dusts"]}, r => {
        const rjson = JSON.parse(r.json)
        pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_unpacking', (rjson.duration * rjson.eu * 6))
    })
    event.forEachRecipe({ type: 'modern_industrialization:packer', not : {output: "#milf:nocompat"}}, r => {
        const rjson = JSON.parse(r.json)
        if(!Array.isArray(rjson.item_inputs)){rjson.item_inputs = [rjson.item_inputs]}
        if(!Array.isArray(rjson.item_outputs)){rjson.item_outputs = [rjson.item_outputs]}
        if (rjson.item_inputs[0].amount == 9) { 
            pressCompatRecipe(
                (rjson.item_inputs)[0], 
                (rjson.item_outputs)[0], 
                'immersiveengineering:mold_packing_9', 
                (rjson.duration * rjson.eu * 6)
            )
        } else if (rjson.item_inputs[0].amount == 4) { 
            pressCompatRecipe(
                (rjson.item_inputs)[0], 
                (rjson.item_outputs)[0], 
                'immersiveengineering:mold_packing_4', 
                (rjson.duration * rjson.eu * 6)
            )
        }
    })

    let itemIdsAlreadyHandledByMI = new $HashSet()

    event.forEachRecipe({type: "modern_industrialization:packer"}, recipe => {
        let recipeJson = JSON.parse(recipe.json)
        let miItemInputs = ensureArray(recipeJson.item_inputs)
        let miItemOutputs = ensureArray(recipeJson.item_outputs)        

        let miOutput = miItemOutputs[0]

        if (miItemInputs.length != 1) return
        if (miOutput.amount != 1) return

        let miInput = miItemInputs[0]


        if (miInput.amount == 4) {

            itemIdsAlreadyHandledByMI.add(miOutput.item)

            miMachineRecipe(event, {
                energy: recipeJson.eu, time: recipeJson.duration, machine: "modern_industrialization:packer",
                outputItems: miItemOutputs.map(output => [output]),
                inputItems: miItemInputs.map(input => [input])
                    .concat([[{ item: "immersiveengineering:mold_packing_4"}, 1, 0]]),
                removeThisRecipeType: true
            })
        }

        if (miInput.amount == 9) {

            itemIdsAlreadyHandledByMI.add(miOutput.item)

            miMachineRecipe(event, {
                energy: recipeJson.eu, time: recipeJson.duration, machine: "modern_industrialization:packer",
                outputItems: miItemOutputs.map(output => [output]),
                inputItems: miItemInputs.map(input => [input])
                    .concat([[{ item: "immersiveengineering:mold_packing_9" }, 1, 0]]),
                removeThisRecipeType: true
            })
        }
        
    })

    let itemIdsAlreadyHandledByMIAndIE = new $HashSet(itemIdsAlreadyHandledByMI)

    event.forEachRecipe({ type: "immersiveengineering:metal_press" }, recipe => {
        let recipeJson = JSON.parse(recipe.json)
        let mold = recipeJson.mold

        if (mold != "immersiveengineering:mold_packing_9" && mold != "immersiveengineering:mold_packing_4") return

        itemIdsAlreadyHandledByMIAndIE.add(recipeJson.result.id)

    })
    

    event.forEachRecipe({ 
        type: 'minecraft:crafting_shaped', 
        not: { or: [{ mod: "xkdeco" }, { mod: "extendedae" }, { mod: "oritech" }]} 
    }, recipe => {
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        if(result.count != 1) return
        if (itemIdsAlreadyHandledByMIAndIE.contains(result.id)) return

        let pattern = rJSON.pattern
        let key = rJSON.key

        let miInputs = getItemInputsFromShaped({
            pattern: pattern,
            key: key
        })

        if (miInputs.length != 1) return

        let input = miInputs[0]
        let inputCount = input[1]

        if (inputCount == 4) {

            //eh (^._.^)ﾉ
            if (pattern[0][2] == undefined || pattern[0][2] == " ") {

                iePressRecipe(event, {
                    inputItems: miInputs,
                    outputItems: [[{ id: result.id }]],
                    mold: { item: "immersiveengineering:mold_packing_4" },
                    energy: 3200,
                    compatOff: true
                })

                if (itemIdsAlreadyHandledByMI.contains(result.id)) return

                miMachineRecipe(event, {
                    energy: 2, time: 100, machine: "modern_industrialization:packer",
                    outputItems: [[{ id: result.id }]],
                    inputItems: miInputs.concat([[{ item: "immersiveengineering:mold_packing_4" }, 1, 0]]),
                })
            }
            
        }

        if (inputCount == 9) {

            iePressRecipe(event, {
                inputItems: miInputs,
                outputItems: [[{ id: result.id }]],
                mold: { item: "immersiveengineering:mold_packing_9" },
                energy: 3200,
                compatOff: true
            })

            if (itemIdsAlreadyHandledByMI.contains(result.id)) return

            miMachineRecipe(event, {
                energy: 2, time: 100, machine: "modern_industrialization:packer",
                outputItems: [[{ id: result.id }]],
                inputItems: miInputs.concat([[{ item: "immersiveengineering:mold_packing_9" }, 1, 0]]),
            })

        }        

    })

    event.forEachRecipe({
        type: 'minecraft:crafting_shapeless',
        not: { or: [{ mod: "xkdeco" }, { mod: "extendedae" }, { mod: "oritech" }] }
    }, recipe => {
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        if (result.count != 1) return
        if (itemIdsAlreadyHandledByMIAndIE.contains(result.id)) return

        let ingredients = rJSON.ingredients

        if (ingredients.length != 4 && ingredients.length != 9) return        

        let areSame = false

        function checkIfSame(type) {
            let first = ingredients[0][type]

            //console.log(first);
            

            for (let i = 1; i < ingredients.length; i++) {
                if (ingredients[i][type] != first) return false
            }
            return true
        }

        if (ingredients[0].tag) {
            areSame = checkIfSame("tag")

        }

        if (ingredients[0].item) {
            areSame = checkIfSame("item")

        }

        if (!areSame) return

        //console.log(result);

        let miInputs = [[ingredients[0], ingredients.length]]
        let input = miInputs[0]
        let inputCount = input[1]

        if (inputCount == 4) {


            iePressRecipe(event, {
                inputItems: miInputs,
                outputItems: [[{ id: result.id }]],
                mold: { item: "immersiveengineering:mold_packing_4" },
                energy: 3200,
                compatOff: true
            })

            if (itemIdsAlreadyHandledByMI.contains(result.id)) return

            miMachineRecipe(event, {
                energy: 2, time: 100, machine: "modern_industrialization:packer",
                outputItems: [[{ id: result.id }]],
                inputItems: miInputs.concat([[{ item: "immersiveengineering:mold_packing_4" }, 1, 0]]),
            })
            

        }

        if (inputCount == 9) {

            iePressRecipe(event, {
                inputItems: miInputs,
                outputItems: [[{ id: result.id }]],
                mold: { item: "immersiveengineering:mold_packing_9" },
                energy: 3200,
                compatOff: true
            })

            if (itemIdsAlreadyHandledByMI.contains(result.id)) return

            miMachineRecipe(event, {
                energy: 2, time: 100, machine: "modern_industrialization:packer",
                outputItems: [[{ id: result.id }]],
                inputItems: miInputs.concat([[{ item: "immersiveengineering:mold_packing_9" }, 1, 0]]),
            })

        }

    })

    function ensureArray(miEntry){
        return Array.isArray(miEntry) ? miEntry : [miEntry]
    }

    //#endregion
})