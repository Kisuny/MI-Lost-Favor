ServerEvents.recipes(event => {


    // event.remove({id: [
    //     'modern_industrialization:materials/copper/smelting/dust_to_ingot_smelting',
    // ]})

    event.remove({output: [
        'modern_industrialization:steel_furnace', 
        'modern_industrialization:electric_furnace', 
        'modern_industrialization:bronze_furnace',
        "extended_industrialization:large_steam_furnace",
        "extended_industrialization:large_electric_furnace"
    ]})

    event.forEachRecipe({ type: 'minecraft:smelting' }, kubeRecipe => {
        let { originalRecipeResult: result, originalRecipeIngredients: ingredients } = kubeRecipe; 
        event.recipes.modern_industrialization.mi_furnace(2, 200).itemIn(ingredients).itemOut(result);
/*         const rjson = JSON.parse(kubeRecipe.json)
        if (Array.isArray(rjson.ingredient)) {
            rjson.ingredient.forEach(ing =>{
                miMachineCraft(event, {energy:2, time:200, machine:"modern_industrialization:furnace",
                    inputItems: [[ing]],
                    outputItems: [[rjson.result]]
                })
            })
        } else {
            miMachineCraft(event, {energy:2, time:200, machine:"modern_industrialization:furnace",
                inputItems: [[rjson.ingredient]],
                outputItems: [[rjson.result]]
            })
        } */

    });
    
    // Adding recipes that have been deleted 
    miMachineCraft(event, {energy:2, time:200, machine:"modern_industrialization:mi_furnace",
        inputItems:[[{item:"minecraft:raw_copper"}, 1]],
        outputItems:[[{item:"minecraft:copper_ingot"}, 1]]
    })

    miMachineCraft(event, {energy:2, time:200, machine:"modern_industrialization:mi_furnace",
        inputItems:[[{item:"minecraft:raw_iron"}, 1]],
        outputItems:[[{item:"minecraft:iron_ingot"}, 1]]
    })

    miMachineCraft(event, {energy:2, time:200, machine:"modern_industrialization:mi_furnace",
        inputItems:[[{item:"minecraft:raw_gold"}, 1]],
        outputItems:[[{item:"minecraft:gold_ingot"}, 1]]
    })

    miMachineCraft(event, {energy:2, time:200, machine:"modern_industrialization:mi_furnace",
        inputItems:[[{tag:"c:sands"}, 1]],
        outputItems:[[{item:"minecraft:glass"}, 1]]
    })

    miMachineCraft(event, {energy:2, time:200, machine:"modern_industrialization:mi_furnace",
        inputItems:[[{tag:"c:cobblestones"}, 1]],
        outputItems:[[{item:"minecraft:stone"}, 1]]
    })

    miMachineCraft(event, {
        energy: 2, time: 200, machine: "modern_industrialization:mi_furnace",
        inputItems: [[{ item: "ytech:unfired_flower_pot" }, 1]],
        outputItems: [[{ item: "minecraft:flower_pot" }, 1]]
    })

    const minecraft_metals_for_furnace = ['copper', 'gold', 'iron'];
    const MI_metals_for_furnace = ['antimony', 'lead', 'tin', 'nickel'];

    MI_metals_for_furnace.forEach(metal => {        
        event.remove({type: 'minecraft:smelting', input: `modern_industrialization:raw_${metal}`})
        event.remove({type: 'minecraft:smelting', input: `modern_industrialization:${metal}_dust`})
        event.remove({type: 'minecraft:smelting', input: `modern_industrialization:${metal}_ore`})
        event.remove({type: 'minecraft:smelting', input: `modern_industrialization:deepslate_${metal}_ore`})
        event.remove({type: 'minecraft:smelting', input: `modern_industrialization:${metal}_tiny_dust`})
    });

    minecraft_metals_for_furnace.forEach(metal => {        
        event.remove({type: 'minecraft:smelting', input: `minecraft:raw_${metal}`})
        event.remove({type: 'minecraft:smelting', input: `modern_industrialization:${metal}_dust`})
        event.remove({type: 'minecraft:smelting', input: `minecraft:${metal}_ore`})
        event.remove({type: 'minecraft:smelting', input: `minecraft:deepslate_${metal}_ore`})
        event.remove({type: 'minecraft:smelting', input: `modern_industrialization:${metal}_tiny_dust`})
    });

    event.remove({type: 'minecraft:smelting', input: `modern_industrialization:raw_iridium`})
    event.remove({type: 'minecraft:smelting', input: `modern_industrialization:iridium_dust`})
    event.remove({type: 'minecraft:smelting', input: `modern_industrialization:iridium_ore`})
    event.remove({type: 'minecraft:smelting', input: `modern_industrialization:iridium_tiny_dust`})

    event.remove({ type: 'minecraft:smelting', input: `modern_industrialization:bronze_dust` })

})

/* 
KubeJSTweaks.beforeRecipes(event =>{
    let regex = new RegExp(".*\_exported_mi_furnace")
    event.disable(regex)
}) */
