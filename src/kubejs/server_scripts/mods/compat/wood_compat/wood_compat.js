ServerEvents.recipes(event => {

    let plankToSlab = {}

    let hexereiWood = {
        "hexerei:mahogany_logs": "hexerei:mahogany_planks",
        "hexerei:willow_logs": "hexerei:willow_planks",
        "hexerei:witch_hazel_logs": "hexerei:witch_hazel_planks"
    }

    event.forEachRecipe({type: 'minecraft:crafting_shapeless', input: '#minecraft:logs', output: '#minecraft:planks'}, recipe =>{
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)

        let ingredients = rJSON.ingredients
        let result = rJSON.result        

        yTechShapeless(event, {
            outputItems: [[{id:result.id}, 1]],
            inputItems:[ingredients, [{tag:"minecraft:axes"}]],
            category:"building",
            removeRecipeType:"crafting_shapeless",
            compatOff:true
        })

        yTechShapeless(event, {
            outputItems: [[{id:result.id}, 4]],
            inputItems:[ingredients, [{tag:"c:saws"}]],
            category:"building",
            removeRecipeType:"crafting_shapeless",
            compatOff:true
        })

        ytechChoppingCraft(event,{
            inputItems:[ingredients],
            outputItems:[[{id:result.id}, 2]],
            tool: {tag : "minecraft:axes"},
            removeRecipeType:"ytech:chopping",
            compatOff:true
        })

        miMachineRecipe(event, {energy: 2, time: 100, machine: "modern_industrialization:cutting_machine",
            inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
            inputItems: [ingredients],
            outputItems: [[{item:result.id}, 6]],
            removeRecipeType:"modern_industrialization:cutting_machine",
        })
        
    })

    Object.entries(hexereiWood).forEach(([logTag, planks]) =>{
        yTechShapeless(event, {
            outputItems: [[{ id: planks }, 1]],
            inputItems: [[{tag: logTag}], [{ tag: "minecraft:axes" }]],
            category: "building",
            removeRecipeType: "crafting_shapeless",
            compatOff: true
        })

        yTechShapeless(event, {
            outputItems: [[{ id: planks }, 3]],
            inputItems: [[{ tag: logTag }], [{ tag: "c:saws" }]],
            category: "building",
            removeRecipeType: "crafting_shapeless",
            compatOff: true
        })

        ytechChoppingCraft(event, {
            inputItems: [[{ tag: logTag }]],
            outputItems: [[{ id: planks }, 2]],
            tool: { tag: "minecraft:axes" },
            removeRecipeType: "ytech:chopping",
            compatOff: true
        })

        miMachineRecipe(event, {
            energy: 2, time: 100, machine: "modern_industrialization:cutting_machine",
            inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
            inputItems: [[{ tag: logTag }]],
            outputItems: [[{ item: planks }, 6]],
            removeRecipeType: "modern_industrialization:cutting_machine",
        })
    })

    event.forEachRecipe({type: 'minecraft:crafting_shaped', input: '#minecraft:planks', output: '#minecraft:slabs'}, recipe =>{
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        let input = Object.values(rJSON.key)[0]
        if(Array.isArray(input)) input = input[0]

        yTechShapeless(event, {
            outputItems: [[{id:result.id}, 1]],
            inputItems:[[input, 1], [{tag:"minecraft:axes"}]],
            category:"building",
            removeRecipeType:"crafting_shaped",
            compatOff:true
        })        

        ytechChoppingCraft(event, {
            inputItems: [[input, 1]],
            outputItems: [[{ id: result.id }, 2]],
            tool: { tag: "minecraft:axes" }
        })

        yTechShapeless(event, {
            outputItems: [[{id:result.id}, 2]],
            inputItems:[[input, 1], [{tag:"c:saws"}]],
            category:"building",
            removeRecipeType:"crafting_shaped",
            compatOff:true
        })

        miMachineRecipe(event, {energy: 2, time: 100, machine: "modern_industrialization:cutting_machine",
            inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
            inputItems: [[input, 1]],
            outputItems: [[{item:result.id}, 2]],
            removeRecipeType:"modern_industrialization:cutting_machine",
        })
        
        plankToSlab[input.item] = result.id
    })

    let addedVanillaWoodTypes = new $HashSet()

    event.forEachRecipe({ type: 'ytech:remaining_shapeless_crafting', input: '#minecraft:planks', output: '#minecraft:slabs' }, recipe => {
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        let input = rJSON.ingredients.filter(entry => {
            return !["minecraft:axes", "c:saws"].includes(Object.values(entry)[0])
        })[0]
        //if (Array.isArray(input)) input = input[0]

        //console.log(input);

        
        if (!addedVanillaWoodTypes.contains(input.item)){
            ytechChoppingCraft(event, {
                inputItems: [[input, 1]],
                outputItems: [[{ id: result.id }, 2]],
                tool: { tag: "minecraft:axes" },
                compatOff: true
            })

            yTechShapeless(event, {
                outputItems: [[{ id: result.id }, 1]],
                inputItems: [[input, 1], [{ tag: "minecraft:axes" }]],
                category: "building",
                removeRecipeType: "ytech:remaining_shapeless_crafting",
                compatOff: true
            })

            yTechShapeless(event, {
                outputItems: [[{ id: result.id }, 2]],
                inputItems: [[input, 1], [{ tag: "c:saws" }]],
                category: "building",
                removeRecipeType: "ytech:remaining_shapeless_crafting",
                compatOff: true
            })

            addedVanillaWoodTypes.add(input.item)
        }

    })

    addedVanillaWoodTypes = new $HashSet()

    event.forEachRecipe({ type: 'ytech:remaining_shapeless_crafting', input: '#minecraft:logs', output: '#minecraft:planks' }, recipe => {
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        let input = rJSON.ingredients.filter(entry => {
            return !["minecraft:axes", "c:saws"].includes(Object.values(entry)[0])
        })[0]
        //if (Array.isArray(input)) input = input[0]

        //console.log(input);

        //console.log(input);
        input.tag = input.item + "s"
        delete input.item

        if (!addedVanillaWoodTypes.contains(input.item)) {

            yTechShapeless(event, {
                outputItems: [[{ id: result.id }, 4]],
                inputItems: [[input, 1], [{ tag: "c:saws" }]],
                category: "building",
                removeRecipeType: "ytech:remaining_shapeless_crafting",
                compatOff: true
            })

            yTechShapeless(event, {
                outputItems: [[{ id: result.id }, 1]],
                inputItems: [[input, 1], [{ tag: "minecraft:axes" }]],
                category: "building",
                compatOff: true
            })

            addedVanillaWoodTypes.add(input.tag)
        }

    })

    event.forEachRecipe({ type: 'ytech:remaining_shaped_crafting', input: '#minecraft:planks', output: '#minecraft:stairs' }, recipe => {
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        let input = rJSON.key.P        

        miMachineRecipe(event, {
            energy: 2, time: 100, machine: "modern_industrialization:cutting_machine",
            inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
            inputItems: [[input, 1]],
            outputItems: [[{ item: result.id }, 1]],
            //removeRecipeType: "modern_industrialization:cutting_machine",
        })


    })

    event.forEachRecipe({type: 'minecraft:crafting_shaped', input: '#minecraft:planks', output: '#minecraft:stairs'}, recipe =>{
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        let input = Object.values(rJSON.key)[0]
        if(Array.isArray(input)) input = input[0]

        milfShaped(event, {
            pattern: [
                "P ",
                "BB",
                "SS"
            ],
            key: {
                P: input,
                B: { item: "ytech:wooden_bolt" },
                S: { item: plankToSlab[input.item] }
            },
            outputItems: [[{id:result.id}, 2]],
            compatOff:true,
            removeRecipeType:"crafting_shaped"
            //removeRecipeType:"minecraft:crafting_shaped"
        })

        miMachineRecipe(event, {
            energy: 2, time: 100, machine: "modern_industrialization:cutting_machine",
            inputFluids: [[{ fluid: "modern_industrialization:lubricant" }, 1]],
            inputItems: [[input, 1]],
            outputItems: [[{ item: result.id }, 1]],
            //removeRecipeType: "modern_industrialization:cutting_machine",
        })


    })

    event.forEachRecipe({type: 'minecraft:crafting_shaped', input: '#minecraft:planks', output: '#minecraft:fence_gates'}, recipe =>{
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        //console.log(rJSON);
        let input
        Object.values(rJSON.key).forEach(value =>{
            let actualValue = Array.isArray(value) ? value[0] : value
            if(actualValue.tag){
                if (actualValue.tag.includes("plank")){
                    input = actualValue
                }
            } else {
                if (actualValue.item.includes("plank")){
                    input = actualValue
                }
            }

            
        })

        milfShaped(event, {
            pattern: [
                "BPB",
                "SPS"
            ],
            key: {
                P: input,
                B: { item: "ytech:wooden_bolt" },
                S: { item: "minecraft:stick"}
            },
            outputItems: [[{id:result.id}, 2]],
            compatOff:true,
            removeRecipeType:"crafting_shaped"
            //removeRecipeType:"minecraft:crafting_shaped"
        })
    })

    event.forEachRecipe({type: 'minecraft:crafting_shaped', input: '#minecraft:planks', output: '#minecraft:wooden_pressure_plates'}, recipe =>{
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        let input = Object.values(rJSON.key)[0]
        if(Array.isArray(input)) input = input[0]
        
        milfShaped(event, {
            pattern: [
                "PPP",
                "BBB"
            ],
            key: {
                P: input,
                B: { item: "ytech:wooden_bolt" }
            },
            outputItems: [[{id:result.id}, 1]],
            compatOff:true,
            removeRecipeType:"crafting_shaped"
            //removeRecipeType:"minecraft:crafting_shaped"
        })
    })

    event.forEachRecipe({type: 'minecraft:crafting_shaped', input: '#minecraft:planks', output: '#minecraft:doors'}, recipe =>{
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        let input = Object.values(rJSON.key)[0]
        if(Array.isArray(input)) input = input[0]
        
        milfShaped(event, {
            pattern: [
                "PP ",
                "PPB",
                "PP "
            ],
            key: {
                P: input,
                B: { item: "ytech:wooden_bolt" }
            },
            outputItems: [[{id:result.id}, 1]],
            compatOff:true,
            removeRecipeType:"crafting_shaped"
            //removeRecipeType:"minecraft:crafting_shaped"
        })
    })

    event.forEachRecipe({type: 'minecraft:crafting_shaped', input: '#minecraft:planks', output: '#minecraft:trapdoors'}, recipe =>{
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)
        let result = rJSON.result
        let input = Object.values(rJSON.key)[0]
        if(Array.isArray(input)) input = input[0]
        
        milfShaped(event, {
            pattern: [
                " B ",
                "PPP",
                "PPP"
            ],
            key: {
                P: input,
                B: { item: "ytech:wooden_bolt" }
            },
            outputItems: [[{id:result.id}, 2]],
            compatOff:true,
            removeRecipeType:"crafting_shaped"
            //removeRecipeType:"minecraft:crafting_shaped"
        })
    })

    event.forEachRecipe({type: 'minecraft:crafting_shapeless', input: '#minecraft:planks', output: '#minecraft:buttons'}, recipe =>{
        //console.log(recipe.getOriginalRecipe().getIngredients().getFirst().getTagKey());
        let rJSON = JSON.parse(recipe.json)
        let ingredients = rJSON.ingredients
        let result = rJSON.result
                
        yTechShapeless(event, {
            outputItems: [[{id:result.id}, 1]],
            inputItems:[ingredients, [{item:"ytech:wooden_bolt"}]],
            category:"building",
            removeRecipeType:"crafting_shapeless",
            compatOff:true
        })
    })

    const types = ["ytech:remaining_shaped_crafting", "ytech:remaining_shapeless_crafting"];

    types.forEach(type => {
        event.forEachRecipe({
            mod: "minecraft",
            type: type,
            output:
                [
                    "#minecraft:fences",
                    "#minecraft:fence_gates",
                    "#minecraft:wooden_pressure_plates",
                    "#minecraft:wooden_stairs",
                    "#minecraft:wooden_doors",
                    "#minecraft:trapdoors",
                    "#minecraft:buttons",
                    "#minecraft:boats"
                ]
        }, recipe => {
            //console.log(recipe.originalRecipeResult.id);

            const originalJson = JSON.parse(recipe.json);

            for (const key in originalJson.key) {
                if (originalJson.key[key].tag && ["c:files", "c:hammers", "c:saws"].includes(originalJson.key[key].tag)) {
                    delete originalJson.key[key];
                    originalJson.pattern = originalJson.pattern.map(row => row.replace(new RegExp(key, 'g'), ' '));
                }
            }

            if (originalJson.ingredients) {
                originalJson.ingredients = (originalJson.ingredients || [])
                    .filter(i => !(i.tag && ["c:files", "c:hammers", "c:saws"].includes(i.tag)));
            }

            event.remove({ output: recipe.originalRecipeResult.id });
            event.custom(originalJson);
        });
    });

    const logsToTagsTypes = ["ytech:remaining_shaped_crafting", "ytech:remaining_shapeless_crafting", "ytech:chopping"]

    logsToTagsTypes.forEach(type => {
        event.forEachRecipe({
            mod: "minecraft",
            type: type,
            output:
                [
                    "#minecraft:planks"
                ]
        }, recipe => {

            const originalJson = JSON.parse(recipe.json)

            if (originalJson.ingredients) {
                originalJson.ingredients = (originalJson.ingredients || [])
                    .map(i =>{ 
                        if (!i.item) return i
                        if (i.item.includes("_log")) {
                            return { tag: i.item + "s" }
                        }
                        if (i.item.includes("bamboo_block")) {
                            return { tag: i.item + "s" }
                        }
                        if (i.item.includes("_stem")) {
                            return { tag: i.item + "s" }
                        }
                    })
            }

            event.remove({ id: recipe.getId(), type: type })
            event.custom(originalJson)
        })

        event.forEachRecipe({
            mod: "ytech",
            type: type,
            output:
                [
                    "#minecraft:planks"
                ]
        }, recipe => {

            const originalJson = JSON.parse(recipe.json)

            if (originalJson.ingredients) {
                originalJson.ingredients = (originalJson.ingredients || [])
                    .map(i => {
                        if (!i.item) return i
                        if (i.item.includes("_log")) {
                            return { tag: i.item + "s" }
                        }
                        if (i.item.includes("bamboo_block")){
                            return { tag: i.item + "s" }
                        }
                        if (i.item.includes("_stem")) {
                            return { tag: i.item + "s" }
                        }
                        
                    })
            }

            if (originalJson.ingredient) {
                originalJson.ingredient = { tag: originalJson.ingredient.item + "s"}
            }

            event.remove({ id: recipe.getId(), type: type })
            event.custom(originalJson)
        })
    })


});
