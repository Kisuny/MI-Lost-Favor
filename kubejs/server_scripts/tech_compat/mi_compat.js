ServerEvents.tags('item', event => {
    let noCompat = [
        //item outputs that will not be converted
        /.*fine_wire/,
        "modern_industrialization:diamond_tiny_dust",
        "modern_industrialization:blastproof_alloy_plate",
        "minecraft:stick",
        "minecraft:chain",
        "modern_industrialization:fire_clay_bricks",
    ]

    event.add('milf:nocompat', noCompat)
})

ServerEvents.recipes(event => {
    //macerator to crusher
    function crusherAndPulverizer(ingredient, result, miEnergy){
        let ieOutput = []
        let oriOutput = []
        result.forEach((out) => {
            ieOutput.push([{ item: out.item }, out.amount, out.probability])
            oriOutput.push([{ id: out.item }, out.amount, out.probability])
        })

        let item
        let isRawOre = false
        let isOre = false

        if (ingredient.item){            
            item = Item.of(ingredient.item)
            if (item && (item.hasTag("c:raw_materials")) || (item.hasTag("c:crushed_ores"))) {
                isRawOre = true
            }
            if (item && item.hasTag("c:ores")) {
                isOre = true
            }
        } else {
            let key = $TagKey.create($Registries.ITEM, $ResourceLocation.parse(ingredient.tag))
            let tagItems = $BuiltInRegistries.ITEM.getOrCreateTag(key)
            isRawOre = tagItems.stream().anyMatch(holder => {
                let currentItem = Item.of(holder.value())
                return currentItem && (currentItem.hasTag("c:raw_materials")) || (currentItem.hasTag("c:crushed_ores"))
            })
            isOre = tagItems.stream().anyMatch(holder => {
                let currentItem = Item.of(holder.value())
                return currentItem && currentItem.hasTag("c:ores")
            })
        }

        if(isOre){
            ieCrusherCraft(event, {
                inputItems: ingredient.tag ? [[{ tag: ingredient.tag }, ingredient.amount]] : [[{ item: ingredient.item }, ingredient.amount]],
                outputItems: ieOutput.map(entry => [entry[0], Math.ceil(entry[1] * 1.5), entry[2]]),
                energy: miEnergy,
                compatOff: true,
                removeRecipeType: "immersiveengineering:crusher"
            })
        } else {
            ieCrusherCraft(event, {
                inputItems: ingredient.tag ? [[{ tag: ingredient.tag }, ingredient.amount]] : [[{ item: ingredient.item }, ingredient.amount]],
                outputItems: ieOutput,
                energy: miEnergy,
                compatOff: true,
                removeRecipeType: "immersiveengineering:crusher"
            })
        }



        if (isRawOre && oriOutput.length <= 2){
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


    //#region press
    function press_mi(ingredients, result, mold, miEnergy){
        iePressCraft(event, {
            inputItems: ingredients.tag ? [[{tag:ingredients.tag}, ingredients.amount]] : [[{item:ingredients.item}, ingredients.amount]],
            outputItems: [[{id:result.item}, result.amount]],
            mold: {item : mold},
            energy: miEnergy,
            compatOff: true,
        })
        event.remove({ type: 'immersiveengineering:metal_press', output:result.item})
    }

    //plates
    event.forEachRecipe({ type: 'modern_industrialization:compressor', not : {output: "#milf:nocompat"}, output:"#c:plates"}, r => {
        const rjson = JSON.parse(r.json)
        press_mi((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_plate', (rjson.duration * rjson.eu))
    })
    
    //rods
    event.forEachRecipe({ type: 'modern_industrialization:cutting_machine', not : {output: "#milf:nocompat"}, output:"#c:rods"}, r => {
        const rjson = JSON.parse(r.json)
        press_mi((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_rod', (rjson.duration * rjson.eu))
    })

    //wires
    // event.forEachRecipe({ type: 'modern_industrialization:wiremill', not : {output: "#milf:nocompat"}, output:"#c:wires"}, r => {
    //     const rjson = JSON.parse(r.json)
    //     press_mi((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_wire', (rjson.duration * rjson.eu))
    // })
    //unpacker
    event.forEachRecipe({ type: 'modern_industrialization:unpacker', not : {output: "#milf:nocompat"}, output:["#c:ingots","#c:nuggets","#c:tiny_dusts"]}, r => {
        const rjson = JSON.parse(r.json)
        press_mi((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_unpacking', (rjson.duration * rjson.eu))
    })
    //packer
    event.forEachRecipe({ type: 'modern_industrialization:packer', not : {output: "#milf:nocompat"}}, r => {
        const rjson = JSON.parse(r.json)
        if(!Array.isArray(rjson.item_inputs)){rjson.item_inputs = [rjson.item_inputs]}
        if(!Array.isArray(rjson.item_outputs)){rjson.item_outputs = [rjson.item_outputs]}
        if(rjson.item_inputs[0].amount == 9){press_mi((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_packing_9', (rjson.duration * rjson.eu))}
        else if(!(rjson.item_inputs)[1]){press_mi((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_packing_4', (rjson.duration * rjson.eu))}
    })    
    //#endregion
})