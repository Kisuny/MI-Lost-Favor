ServerEvents.tags('item', event => {
    let noCompat = [
        //item outputs that will not be converted
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
            ieCrusherCraft(event, {
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
            ieCrusherCraft(event, {
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

    //plates
    event.forEachRecipe({ type: 'modern_industrialization:compressor', not : {output: "#milf:nocompat"}, output:"#c:plates"}, r => {
        const rjson = JSON.parse(r.json)
        pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_plate', (rjson.duration * rjson.eu * 6))
    })

    //curved_plates
    event.forEachRecipe({ type: 'modern_industrialization:compressor', not: { output: "#milf:nocompat" }, output: "#c:curved_plates" }, r => {
        const rjson = JSON.parse(r.json)
        pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'milf:hemispherical_press_mold', (rjson.duration * rjson.eu * 6))
    })

    //rings
    event.forEachRecipe({ type: 'modern_industrialization:compressor', not: { output: "#milf:nocompat" }, output: "#c:rings" }, r => {
        const rjson = JSON.parse(r.json)        
        pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'milf:hemispherical_press_mold', (rjson.duration * rjson.eu * 6))
    })

    //rods
    event.forEachRecipe({ type: 'modern_industrialization:cutting_machine', not : {output: "#milf:nocompat"}, output:"#c:rods"}, r => {
        const rjson = JSON.parse(r.json)
        pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_rod', (rjson.duration * rjson.eu * 6))
    })

    //gears
    event.forEachRecipe({ type: 'modern_industrialization:assembler', not: { output: "#milf:nocompat" }, output: "#c:gears" }, r => {
        const rjson = JSON.parse(r.json)
        let input = Object.assign({}, (rjson.item_inputs)[0], { amount: 1, tag: (rjson.item_inputs)[0].tag.replace("plates", "large_plates")})
        
        let output = Object.assign({}, (rjson.item_outputs)[0], { amount: 1 })
        pressCompatRecipe(input, output, 'immersiveengineering:mold_gear', (rjson.duration * rjson.eu * 12))
    })

    // wires
    event.forEachRecipe({ type: 'modern_industrialization:wiremill', not : {output: "#milf:nocompat"}, output:"#c:wires"}, r => {
        const rjson = JSON.parse(r.json)        
        event.remove({ output: (rjson.item_outputs)[0].item, type: "immersiveengineering:metal_press" })
    })
    //unpacker
    event.forEachRecipe({ type: 'modern_industrialization:unpacker', not : {output: "#milf:nocompat"}, output:["#c:ingots","#c:nuggets","#c:tiny_dusts"]}, r => {
        const rjson = JSON.parse(r.json)
        pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_unpacking', (rjson.duration * rjson.eu * 6))
    })
    //packer
    event.forEachRecipe({ type: 'modern_industrialization:packer', not : {output: "#milf:nocompat"}}, r => {
        const rjson = JSON.parse(r.json)
        if(!Array.isArray(rjson.item_inputs)){rjson.item_inputs = [rjson.item_inputs]}
        if(!Array.isArray(rjson.item_outputs)){rjson.item_outputs = [rjson.item_outputs]}
        if (rjson.item_inputs[0].amount == 9) { pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_packing_9', (rjson.duration * rjson.eu * 6))}
        else if (!(rjson.item_inputs)[1]) { pressCompatRecipe((rjson.item_inputs)[0], (rjson.item_outputs)[0], 'immersiveengineering:mold_packing_4', (rjson.duration * rjson.eu * 6))}
    })    
    //#endregion
})