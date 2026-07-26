//priority: 2

global.miTweaksTags = global.miTweaksTags || []

const MI_HATCHES_ALL = ["energy_input", "item_input", "item_output", "fluid_input", "fluid_output"]
const machineTiersAll = ["bronze", "steel", "electric"]

function registerSingleMIMachine(name, args){
    let recipe
    MIMachineEvents.registerRecipeTypes(event => {
        recipe = event.register(name)
        args.itemsIn && (recipe = recipe.withItemInputs())
        args.itemsOut && (recipe = recipe.withItemOutputs())
        args.fluidsIn && (recipe = recipe.withFluidInputs())
        args.fluidsOut && (recipe = recipe.withFluidOutputs())
    })
    MIMachineEvents.registerMachines(event => {
        event.craftingSingleBlock(
            args.name || idToName(name), name, recipe, args.tiers || ["electric"], args.guiheight || -1, 
            event.progressBar(args.pBar?.x || 60, args.pBar?.y || 60, args.pBar?.name || "arrow"),
            event.efficiencyBar(args.efBar?.x || 48, args.efBar?.y || 86), event.energyBar(args.enBar?.x || 14, args.enBar?.y || 44),
            args.slots?.iIn || 0, args.slots?.iOut || 0, args.slots?.fIn || 0, args.slots?.fOut || 0, args.slots?.capacity || 16,
            items => {
                if(!args.itemSlots) {return items}
                args.itemSlots.forEach(slot => items.addSlots.apply(items, slot))
                return items
            },
            fluids => {
                if(!args.fluidSlots) {return fluids}
                args.fluidSlots.forEach(slot => fluids.addSlots.apply(fluids, slot))
                return fluids
            },
            args.frontOverlay || false, args.topOverlay || false, args.sideOverlay || false
        ) 
    })
}

function registerSinglePowerlessMIMachine(name, args){
    let recipe
    MIMachineEvents.registerRecipeTypes(event => {
        recipe = event.register(name)
        args.itemsIn && (recipe = recipe.withItemInputs())
        args.itemsOut && (recipe = recipe.withItemOutputs())
        args.fluidsIn && (recipe = recipe.withFluidInputs())
        args.fluidsOut && (recipe = recipe.withFluidOutputs())
    })
    MITweaksMachineEvents.registerPowerlessMachines(event => {
        event.singleblock(
            args.name || idToName(name), name, recipe, args.guiheight || -1, 
            event.progressBar(args.pBar?.x || 60, args.pBar?.y || 60, args.pBar?.name || "arrow"),
            args.slots?.iIn || 0, args.slots?.iOut || 0, args.slots?.fIn || 0, args.slots?.fOut || 0, args.slots?.capacity || 16,
            items => {
                if(!args.itemSlots) {return items}
                args.itemSlots.forEach(slot => items.addSlots.apply(items, slot))
                return items
            },
            fluids => {
                if(!args.fluidSlots) {return fluids}
                args.fluidSlots.forEach(slot => fluids.addSlots.apply(fluids, slot))
                return fluids
            },
            args.mainCasing || "steel", args.mainOverlays || 'enigma_overlays', 
            args.frontOverlay || false, args.topOverlay || false, args.sideOverlay || false,
            args.baseEU || 1, args.redstone || true
        ) 
    })
    jsonDataForMITweaksMachine(name, args.mainCasing, args.mainOverlays)
}

function registerMIMachine(name, args){
    let recipe
    MIMachineEvents.registerRecipeTypes(event => {
        recipe = event.register(name)
        args.itemsIn && (recipe = recipe.withItemInputs())
        args.itemsOut && (recipe = recipe.withItemOutputs())
        args.fluidsIn && (recipe = recipe.withFluidInputs())
        args.fluidsOut && (recipe = recipe.withFluidOutputs())
    })
    MIMachineEvents.registerMachines(event => {
        let shape = event.layeredShape(args.casing , args.shape)
        Object.entries(args.shapeKeys).forEach(([key, block]) => {
            let actualBlock = (typeof block === "string") ? block : block.id
            shape = shape.key(key, event.memberOfBlock(actualBlock), block.hatches ? event.hatchOf(block.hatches) : event.noHatch())
        })
        shape = shape.build()
        const multiTypeFunction = args.steam ? event.simpleSteamCraftingMultiBlock : event.simpleElectricCraftingMultiBlock
        multiTypeFunction.apply(event, [
            args.customName || idToName(name), name, recipe, shape, event.progressBar(args.pBar?.x || 60, args.pBar?.y || 60, args.pBar?.name || "arrow"),
            itemInputs => {
                if(!args.itemInputSlots) {return itemInputs}
                args.itemInputSlots.forEach(slot => itemInputs.addSlots.apply(itemInputs, slot))
                return itemInputs
            },
            itemOutputs => {
                if(!args.itemOutputSlots) {return itemOutputs}
                args.itemOutputSlots.forEach(slot => itemOutputs.addSlots.apply(itemOutputs, slot))
                return itemOutputs
            },
            fluidInputs => {
                if(!args.fluidInputSlots) {return fluidInputs}
                args.fluidInputSlots.forEach(slot => fluidInputs.addSlots.apply(fluidInputs, slot))
                return fluidInputs
            },
            fluidOutputs => {
                if(!args.fluidOutputSlots) {return fluidOutputs}
                args.fluidOutputSlots.forEach(slot => fluidOutputs.addSlots.apply(fluidOutputs, slot))
                return fluidOutputs
            },
            args.mainCasing || 'treated_wood_casing', args.mainOverlays || 'enigma_overlays', args.frontOverlay || false, args.topOverlay || false, args.sideOverlay || false
        ]) 
    })
}

function registerPowerlessMIMachine(name, args){
    let recipe
    MIMachineEvents.registerRecipeTypes(event => {
        recipe = event.register(name)
        args.itemsIn && (recipe = recipe.withItemInputs())
        args.itemsOut && (recipe = recipe.withItemOutputs())
        args.fluidsIn && (recipe = recipe.withFluidInputs())
        args.fluidsOut && (recipe = recipe.withFluidOutputs())
    })
    MITweaksMachineEvents.registerPowerlessMachines(event => {
        let shape = event.layeredShape(args.casing , args.shape)
        Object.entries(args.shapeKeys).forEach(([key, block]) => {
            let actualBlock = (typeof block === "string") ? block : block.id
            shape = shape.key(key, event.memberOfBlock(actualBlock), block.hatches ? event.hatchOf(block.hatches) : event.noHatch())
        })
        shape = shape.build()
        const multiTypeFunction = event.multiblock
        multiTypeFunction.apply(event, [
            args.customName || idToName(name), name, recipe, shape, event.progressBar(args.pBar?.x || 60, args.pBar?.y || 60, args.pBar?.name || "arrow"),
            itemInputs => {
                if(!args.itemInputSlots) {return itemInputs}
                args.itemInputSlots.forEach(slot => itemInputs.addSlots.apply(itemInputs, slot))
                return itemInputs
            },
            itemOutputs => {
                if(!args.itemOutputSlots) {return itemOutputs}
                args.itemOutputSlots.forEach(slot => itemOutputs.addSlots.apply(itemOutputs, slot))
                return itemOutputs
            },
            fluidInputs => {
                if(!args.fluidInputSlots) {return fluidInputs}
                args.fluidInputSlots.forEach(slot => fluidInputs.addSlots.apply(fluidInputs, slot))
                return fluidInputs
            },
            fluidOutputs => {
                if(!args.fluidOutputSlots) {return fluidOutputs}
                args.fluidOutputSlots.forEach(slot => fluidOutputs.addSlots.apply(fluidOutputs, slot))
                return fluidOutputs
            },
            args.mainCasing || 'treated_wood_casing', args.mainOverlays || 'enigma_overlays', args.frontOverlay || false, args.topOverlay || false, args.sideOverlay || false,
            args.baseRecipeEU || 1, args.redstoneControlModule || true
        ]) 
    })
    jsonDataForMITweaksMachine(name, args.mainCasing, args.mainOverlays)
}

function registerBatchMIMachine(name, args){
    let recipe
    MIMachineEvents.registerRecipeTypes(event => {
        recipe = event.register(name)
        args.itemsIn && (recipe = recipe.withItemInputs())
        args.itemsOut && (recipe = recipe.withItemOutputs())
        args.fluidsIn && (recipe = recipe.withFluidInputs())
        args.fluidsOut && (recipe = recipe.withFluidOutputs())
    })
    MITweaksMachineEvents.registerBatchMultiblocks(event => {
        let shape = event.layeredShape(args.casing , args.shape)
        Object.entries(args.shapeKeys).forEach(([key, block]) => {
            let actualBlock = (typeof block === "string") ? block : block.id
            shape = shape.key(key, event.memberOfBlock(actualBlock), block.hatches ? event.hatchOf(block.hatches) : event.noHatch())
        })
        shape = shape.build()
        const multiTypeFunction = args.steam ? event.steamStandalone : event.electricStandalone
        multiTypeFunction.apply(event, [
            idToName(name), name, recipe, shape, event.progressBar(args.pBar?.x || 60, args.pBar?.y || 60, args.pBar?.name || "arrow"),
            itemInputs => {
                if(!args.itemInputSlots) {return itemInputs}
                args.itemInputSlots.forEach(slot => itemInputs.addSlots.apply(itemInputs, slot))
                return itemInputs
            },
            itemOutputs => {
                if(!args.itemOutputSlots) {return itemOutputs}
                args.itemOutputSlots.forEach(slot => itemOutputs.addSlots.apply(itemOutputs, slot))
                return itemOutputs
            },
            fluidInputs => {
                if(!args.fluidInputSlots) {return fluidInputs}
                args.fluidInputSlots.forEach(slot => fluidInputs.addSlots.apply(fluidInputs, slot))
                return fluidInputs
            },
            fluidOutputs => {
                if(!args.fluidOutputSlots) {return fluidOutputs}
                args.fluidOutputSlots.forEach(slot => fluidOutputs.addSlots.apply(fluidOutputs, slot))
                return fluidOutputs
            },
            args.mainCasing || 'treated_wood_casing', args.mainOverlays || 'enigma_overlays', args.frontOverlay || false, args.topOverlay || false, args.sideOverlay || false,
            args.batchsize || 8, args.costMulti || 1
        ]) 
    })
    jsonDataForMITweaksMachine(name, args.mainCasing, args.mainOverlays)
}

function registerTieredMIMachine(name, args){
    let basicRecipeType
    MIMachineEvents.registerRecipeTypes(event => {
        basicRecipeType = event.register(name)
        args.itemsIn && (basicRecipeType = basicRecipeType.withItemInputs())
        args.itemsOut && (basicRecipeType = basicRecipeType.withItemOutputs())
        args.fluidsIn && (basicRecipeType = basicRecipeType.withFluidInputs())
        args.fluidsOut && (basicRecipeType = basicRecipeType.withFluidOutputs())
    })

    args.tiers.forEach(tier => {        

        let tierRecipe = tier.recipe
        if (!tierRecipe) {
            tier.recipeType = basicRecipeType
            return
        }

        MIMachineEvents.registerRecipeTypes(event => {
            let tierRecipeType = event.register(tier.id)
            tierRecipe.itemsIn && (tierRecipeType = tierRecipeType.withItemInputs())
            tierRecipe.itemsOut && (tierRecipeType = tierRecipeType.withItemOutputs())
            tierRecipe.fluidsIn && (tierRecipeType = tierRecipeType.withFluidInputs())
            tierRecipe.fluidsOut && (tierRecipeType = tierRecipeType.withFluidOutputs())
            tier.recipeType = tierRecipeType
        })
    })

    MITweaksMachineEvents.registerTieredMultiblocks(event => {
        let tiersArray = []
        args.tiers.forEach(tier => {
            let shape = event.layeredShape(tier.casing , tier.shape)
            Object.entries(tier.shapeKeys).forEach(([key, block]) => {
                let actualBlock = (typeof block === "string") ? block : block.id
                shape = shape.key(key, event.memberOfBlock(actualBlock), block.hatches ? event.hatchOf(block.hatches) : event.noHatch())
            })
            shape = shape.build()
            if (args.fromExisting) basicRecipeType = event.getRecipeType(args.fromExisting)
            tiersArray.push(event.createTier(
                tier.id,
                tier.recipeType || basicRecipeType,
                shape,
                (workstations) => workstations.add(tier.workstationID),
                tier.maxBaseEU || 128,
                tier.batchsize || 1,
                tier.costMulti || 1
            ))
        })
        

        if(args.fromExisting){
            let multiTypeFunction = args.steam ? event.steam : event.electric
            multiTypeFunction.apply(event, [
                idToName(name), name,
                (tiers) => {
                    tiersArray.forEach(tier => {
                        tiers.add(tier)
                    })
                },
                args.mainCasing || 'treated_wood_casing', args.mainOverlays || 'enigma_overlays', args.frontOverlay || false, args.topOverlay || false, args.sideOverlay || false
            ])

            
        } else {
            let multiTypeFunction = args.steam ? event.steamStandalone : event.electricStandalone

            multiTypeFunction.apply(event, [
                idToName(name), name,
                (tiers) => {
                    tiersArray.forEach(tier => {
                        tiers.add(tier)
                    })
                },
                event.progressBar(args.pBar?.x || 60, args.pBar?.y || 60, args.pBar?.name || "arrow"),
                itemInputs => {
                    if (!args.itemInputSlots) { return itemInputs }
                    args.itemInputSlots.forEach(slot => itemInputs.addSlots.apply(itemInputs, slot))
                    return itemInputs
                },
                itemOutputs => {
                    if (!args.itemOutputSlots) { return itemOutputs }
                    args.itemOutputSlots.forEach(slot => itemOutputs.addSlots.apply(itemOutputs, slot))
                    return itemOutputs
                },
                fluidInputs => {
                    if (!args.fluidInputSlots) { return fluidInputs }
                    args.fluidInputSlots.forEach(slot => fluidInputs.addSlots.apply(fluidInputs, slot))
                    return fluidInputs
                },
                fluidOutputs => {
                    if (!args.fluidOutputSlots) { return fluidOutputs }
                    args.fluidOutputSlots.forEach(slot => fluidOutputs.addSlots.apply(fluidOutputs, slot))
                    return fluidOutputs
                },
                args.mainCasing || 'treated_wood_casing', args.mainOverlays || 'enigma_overlays', args.frontOverlay || false, args.topOverlay || false, args.sideOverlay || false
            ])

        }

    })
    jsonDataForMITweaksTieredMachine(name, args.mainCasing, args.mainOverlays, args.tiers)
}

function registerBatchMIMachineFromExisting(name, args){
    MITweaksMachineEvents.registerBatchMultiblocks(event => {
        let shape = event.layeredShape(args.casing , args.shape)
        Object.entries(args.shapeKeys).forEach(([key, block]) => {
            let actualBlock = (typeof block === "string") ? block : block.id
            shape = shape.key(key, event.memberOfBlock(actualBlock), block.hatches ? event.hatchOf(block.hatches) : event.noHatch())
        })
        shape = shape.build()
        const multiTypeFunction = args.steam ? event.steam : event.electric
        multiTypeFunction.apply(event, [
            idToName(name), name, event.getRecipeType(args.recipeType), shape,
            (emiWorkstations) => emiWorkstations.add.apply(emiWorkstations, args.emiWorkstations),
            args.mainCasing || 'treated_wood_casing', args.mainOverlays || 'enigma_overlays', args.frontOverlay || false, args.topOverlay || false, args.sideOverlay || false,
            args.batchsize, args.costMulti
        ]) 
    })
    jsonDataForMITweaksMachine(name, args.mainCasing, args.mainOverlays)
}

function saveJsonToPath(path, json){
    //JsonIO.write(path, JSON.stringify(json, null, 2))
    JsonIO.write(path, json)
}

function jsonDataForMITweaksTieredMachine(machineName, mainCasing, mainOverlays, tiers){
    tiers.forEach(tier => {
        global.langCustomStuff[`custom_multiblock_tier.mi_tweaks.${tier.id}`] = Object.assign({ "en_us": tier.name || idToName(tier.id)})
        global.langCustomStuff[`rei_categories.mi_tweaks.${tier.id}`] = Object.assign({ "en_us": tier.name || idToName(tier.id) })
    })
    jsonDataForMITweaksMachine(machineName, mainCasing, mainOverlays)
}

function jsonDataForMITweaksMachine(machineName, mainCasing, mainOverlays){
    global.langCustomStuff[`block.mi_tweaks.${machineName}`] = Object.assign({ "en_us": idToName(machineName)})
    global.langCustomStuff[`rei_categories.modern_industrialization.${machineName}`] = Object.assign({ "en_us": idToName(machineName)})
    global.langCustomStuff[`rei_categories.mi_tweaks.${machineName}`] = Object.assign({ "en_us": idToName(machineName)})
    global.miTweaksTags.push(`mi_tweaks:${machineName}`)
    return
    let blockstatesPath = `kubejs/assets/mi_tweaks/blockstates/${machineName}.json`;
    let blockstatesJson = {
        "variants": {
            "": {
                "model": `mi_tweaks:block/${machineName}`
            }
        }
    }
    saveJsonToPath(blockstatesPath, blockstatesJson)

    let modelPath = `kubejs/assets/mi_tweaks/models/block/${machineName}.json`;
    let modelJson = {
        "casing": `modern_industrialization:${mainCasing}`,
        "default_overlays": {
            "fluid_auto": "modern_industrialization:block/overlays/fluid_auto",
            "front": `modern_industrialization:block/machines/${mainOverlays}/overlay_front`,
            "front_active": `modern_industrialization:block/machines/${mainOverlays}/overlay_front_active`,
            "side": `modern_industrialization:block/machines/${mainOverlays}/overlay_front`,
            "side_active": `modern_industrialization:block/machines/${mainOverlays}/overlay_front_active`,
            "item_auto": "modern_industrialization:block/overlays/item_auto",
            "output": "modern_industrialization:block/overlays/output"
        },
        "loader": "modern_industrialization:machine"
    }
    saveJsonToPath(modelPath, modelJson)

    let itemPath = `kubejs/assets/mi_tweaks/models/item/${machineName}.json`;
    let itemJson = {
        "parent": `mi_tweaks:block/${machineName}`
    }
    saveJsonToPath(itemPath, itemJson)

    let dataPath = `kubejs/data/mi_tweaks/loot_table/blocks/${machineName}.json`;
    let dataJson = {
        "type": "minecraft:block",
        "pools": [
            {
                "bonus_rolls": 0.0,
                "conditions": [
                    {
                        "condition": "minecraft:survives_explosion"
                    }
                ],
                "entries": [
                    {
                        "type": "minecraft:item",
                        "name": `mi_tweaks:${machineName}`
                    }
                ],
                "rolls": 1.0
            }
        ],
        "random_sequence": `mi_tweaks:blocks/${machineName}`
    }
    saveJsonToPath(dataPath, dataJson)
}
