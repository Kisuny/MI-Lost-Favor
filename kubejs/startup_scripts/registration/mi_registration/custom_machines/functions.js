//priority: 2

let $SimpleMember = Java.loadClass("aztech.modern_industrialization.machines.multiblocks.SimpleMember")
let $BlockState = Java.loadClass("net.minecraft.world.level.block.state.BlockState")
let $TagParser = Java.loadClass("net.minecraft.nbt.TagParser")
let $NbtUtils = Java.loadClass("net.minecraft.nbt.NbtUtils")

global.miTweaksTags = global.miTweaksTags || []

const machineTiersAll = ["bronze", "steel", "electric"]

let miRecipeRegistry = {}

function shapeMemberOf(event, blockEntry){

    if (blockEntry.id) {
        if (blockEntry.tag) {
            return $SimpleMember.forBlockTagId(blockEntry.id, blockEntry.tag)
        }

        if (blockEntry.stateProperties) {
            let propertiesString = blockEntry.stateProperties
            let propertiesTag = $TagParser.parseTag(propertiesString)

            let stateCompoundTag = new $CompoundTag()

            stateCompoundTag.putString("Name", blockEntry.id)
            stateCompoundTag.put("Properties",propertiesTag)

            let blockState = $NbtUtils.readBlockState(
                $BuiltInRegistries.BLOCK.asLookup(),
                stateCompoundTag
            )

            if (blockState.isAir()) return $SimpleMember.forBlockId(blockEntry.id)
            

            return $SimpleMember.forBlockState(blockState)
        }

        return $SimpleMember.forBlockId(blockEntry.id)
    }

    if (typeof blockEntry == "string") return $SimpleMember.forBlockId(blockEntry)

    return $SimpleMember.forBlockId("minecraft:bedrock")

}

function registerMIRecipeType(id, { itemsIn, itemsOut, fluidsIn, fluidsOut }){
    MIMachineEvents.registerRecipeTypes(event => {
        let recipe = event.register(id)
        itemsIn && (recipe = recipe.withItemInputs())
        itemsOut && (recipe = recipe.withItemOutputs())
        fluidsIn && (recipe = recipe.withFluidInputs())
        fluidsOut && (recipe = recipe.withFluidOutputs())
        miRecipeRegistry[id] = recipe
    })

}

let addSlotsCallback = (slots, slotArray) => {
    if (!slotArray) return slots
    slotArray.forEach(slot => slots.addSlots.apply(slots, slot))
    return slots
}

function createMultiSlotCallbacks({ itemInputSlots, itemOutputSlots, fluidInputSlots, fluidOutputSlots }){

    return [
        items => addSlotsCallback(items, itemInputSlots),
        items => addSlotsCallback(items, itemOutputSlots),
        fluids => addSlotsCallback(fluids, fluidInputSlots),
        fluids => addSlotsCallback(fluids, fluidOutputSlots)
    ]
}

function createSingleSlotCallbacks({ itemSlots, fluidSlots }) {
    return {
        itemsCallback: items => addSlotsCallback(items, itemSlots),
        fluidsCallback: fluids => addSlotsCallback(fluids, fluidSlots)
    }
}

function defaultProgressBar(event, pBar) {
    return event.progressBar(pBar?.x || 60, pBar?.y || 60, pBar?.name || "arrow")
}

function buildMachineShape(event, args) {
    let shape = event.layeredShape(args.casing, args.shape)
    Object.entries(args.shapeKeys).forEach(([key, blockEntry]) => {
        let member = shapeMemberOf(event, blockEntry)
        let hatch = blockEntry.hatches ? event.hatchOf(blockEntry.hatches) : event.noHatch()
        shape = shape.key(key, member, hatch)
    })
    return shape.build()
}

function getOverlaysOrDefaults(args) {
    return {
        mainCasing: args.mainCasing || 'treated_wood_casing',
        mainOverlays: args.mainOverlays || 'enigma_overlays',
        frontOverlay: args.frontOverlay || false,
        topOverlay: args.topOverlay || false,
        sideOverlay: args.sideOverlay || false
    }
}

function registerMIMultiblock(eventType, eventKey, id, args, multiTypeCallback, extraArgs) {
    registerMIRecipeType(id, args)

    eventType[eventKey](event => {
        let shape = buildMachineShape(event, args)
        let [itemInputsCallback, itemOutputsCallback, fluidInputsCallback, fluidOutputsCallback] = createMultiSlotCallbacks(args)
        let overlays = getOverlaysOrDefaults(args)

        let multiTypeFunction = multiTypeCallback(event, args.steam)

        let baseArgs = [
            args.customName || idToName(id), id,
            miRecipeRegistry[id],
            shape,
            defaultProgressBar(event, args.pBar),
            itemInputsCallback,
            itemOutputsCallback,
            fluidInputsCallback,
            fluidOutputsCallback,
            overlays.mainCasing, overlays.mainOverlays, overlays.frontOverlay, overlays.topOverlay, overlays.sideOverlay
        ]

        let allArgs = extraArgs ? baseArgs.concat(extraArgs) : baseArgs.slice()

        multiTypeFunction.apply(event, allArgs)
    })
}

function registerSingleMIMachine(id, args){
    registerMIRecipeType(id, args)
    let { itemsCallback, fluidsCallback } = createSingleSlotCallbacks(args)
    let overlays = getOverlaysOrDefaults(args)

    MIMachineEvents.registerMachines(event => {
        event.craftingSingleBlock(
            args.name || idToName(id), id, 
            miRecipeRegistry[id], 
            args.tiers || ["electric"], args.guiheight || -1, 
            defaultProgressBar(event, args.pBar),
            event.efficiencyBar(args.efBar?.x || 48, args.efBar?.y || 86), event.energyBar(args.enBar?.x || 14, args.enBar?.y || 44),
            args.slots?.iIn || 0, args.slots?.iOut || 0, args.slots?.fIn || 0, args.slots?.fOut || 0, args.slots?.capacity || 16,
            itemsCallback,
            fluidsCallback,
            overlays.frontOverlay, overlays.topOverlay, overlays.sideOverlay
        ) 
    })
    args.tiers.forEach(tier =>{
        if (tier == "electric") return
        milfData.addCredit(`${tier}_${id}`, "mi_machine", "modern_industrialization")
    })
    
}

function registerSinglePowerlessMIMachine(id, args){
    registerMIRecipeType(id, args)
    let { itemsCallback, fluidsCallback } = createSingleSlotCallbacks(args)
    let overlays = getOverlaysOrDefaults(args)
    MITweaksMachineEvents.registerPowerlessMachines(event => {
        event.singleblock(
            args.name || idToName(id), id, 
            miRecipeRegistry[id], 
            args.guiheight || -1, 
            defaultProgressBar(event, args.pBar),
            args.slots?.iIn || 0, args.slots?.iOut || 0, args.slots?.fIn || 0, args.slots?.fOut || 0, args.slots?.capacity || 16,
            itemsCallback,
            fluidsCallback,
            args.mainCasing || "steel", args.mainOverlays || 'enigma_overlays', 
            overlays.frontOverlay, overlays.topOverlay, overlays.sideOverlay,
            args.baseEU || 1, args.redstone || true
        ) 
    })
    jsonDataForMITweaksMachine(id, args)
}

// registerTestMIMachine('test', {
//     itemsIn: true, itemsOut: true, fluidsIn: true, fluidsOut: true, casing: 'heatproof_machine_casing',
//     shape: [['HHH', 'aaa', 'AaA', 'AaA'],
//     ['HHH', 'a a', 'A A', 'AAA'],
//     ['BAB', 'B#B', 'BAB', 'BAB']],
//     shapeKeys: {
//         "A": "modern_industrialization:heatproof_machine_casing",
//         "a": "modern_industrialization:cupronickel_coil",
//         "B": "modern_industrialization:invar_machine_casing_pipe",
//         "H": { id: "modern_industrialization:heatproof_machine_casing", hatches: MI_HATCHES.ALL }
//     },
//     pBar: { x: 77, y: 33, name: 'arrow' },
//     itemInputSlots: [[56, 35, 1, 2]],
//     itemOutputSlots: [[102, 35, 1, 1]],
//     fluidInputSlots: [[36, 35, 1, 1]],
//     fluidOutputSlots: [[122, 35, 1, 1]],
//     mainCasing: 'heatproof_machine_casing', mainOverlays: 'coke_oven', frontOverlay: true
// })

// function registerTestMIMachine(id, args) {
//     let recipe
//     MIMachineEvents.registerRecipeTypes(event => {
//         recipe = event.register(id)
//         args.itemsIn && (recipe = recipe.withItemInputs())
//         args.itemsOut && (recipe = recipe.withItemOutputs())
//         args.fluidsIn && (recipe = recipe.withFluidInputs())
//         args.fluidsOut && (recipe = recipe.withFluidOutputs())
//     })
//     MIMachineEvents.registerMachines(event => {
//         let shape = event.layeredShape(args.casing, args.shape)
//         Object.entries(args.shapeKeys).forEach(([key, block]) => {
//             let actualBlock = (typeof block === "string") ? block : block.id
//             shape = shape.key(key, $SimpleMember.forBlockState(Block.getBlock("minecraft:oak_stairs")
//             .getStateDefinition().getPossibleStates().getLast()), 
//             block.hatches ? event.hatchOf(block.hatches) : event.noHatch()
//         )
//         })
//         shape = shape.build()
//         const multiTypeFunction = args.steam ? event.simpleSteamCraftingMultiBlock : event.simpleElectricCraftingMultiBlock
//         multiTypeFunction.apply(event, [
//             args.customName || idToName(id), id, recipe, shape, event.progressBar(args.pBar?.x || 60, args.pBar?.y || 60, args.pBar?.name || "arrow"),
//             itemInputs => {
//                 if (!args.itemInputSlots) { return itemInputs }
//                 args.itemInputSlots.forEach(slot => itemInputs.addSlots.apply(itemInputs, slot))
//                 return itemInputs
//             },
//             itemOutputs => {
//                 if (!args.itemOutputSlots) { return itemOutputs }
//                 args.itemOutputSlots.forEach(slot => itemOutputs.addSlots.apply(itemOutputs, slot))
//                 return itemOutputs
//             },
//             fluidInputs => {
//                 if (!args.fluidInputSlots) { return fluidInputs }
//                 args.fluidInputSlots.forEach(slot => fluidInputs.addSlots.apply(fluidInputs, slot))
//                 return fluidInputs
//             },
//             fluidOutputs => {
//                 if (!args.fluidOutputSlots) { return fluidOutputs }
//                 args.fluidOutputSlots.forEach(slot => fluidOutputs.addSlots.apply(fluidOutputs, slot))
//                 return fluidOutputs
//             },
//             args.mainCasing || 'treated_wood_casing', args.mainOverlays || 'enigma_overlays', args.frontOverlay || false, args.topOverlay || false, args.sideOverlay || false
//         ])
//     })
//     milfData.addCredit(`${id}`, "mi_machine", "modern_industrialization")
// }

function registerMIMachine(id, args){
    registerMIMultiblock(MIMachineEvents, "registerMachines", id, args,
        (event, isSteam) => isSteam ? event.simpleSteamCraftingMultiBlock : event.simpleElectricCraftingMultiBlock
    )
    milfData.addCredit(`${id}`, "mi_machine", "modern_industrialization")
}

function registerPowerlessMIMachine(id, args){
    let extraArgs = [args.baseRecipeEU || 1, args.redstoneControlModule || true]
    registerMIMultiblock(MITweaksMachineEvents, "registerPowerlessMachines", id, args,
        (event) => event.multiblock,
        extraArgs
    )
    jsonDataForMITweaksMachine(id, args)
}

function registerBatchMIMachine(id, args){
    let extraArgs = [args.batchsize || 8, args.costMulti || 1]
    registerMIMultiblock(MITweaksMachineEvents, "registerBatchMultiblocks", id, args,
        (event, isSteam) => isSteam ? event.steamStandalone : event.electricStandalone,
        extraArgs
    )
    jsonDataForMITweaksMachine(id, args)
}

function registerTieredMIMachine(id, args){
    registerMIRecipeType(id, args)

    args.tiers.forEach(tier => {        
        let tierRecipe = tier.recipe
        if (!tierRecipe) { return }
        registerMIRecipeType(tier.id, tierRecipe)
    })

    MITweaksMachineEvents.registerTieredMultiblocks(event => {
        let tiersArray = []
        args.tiers.forEach(tierArgs => {
            let recipeType = miRecipeRegistry[tierArgs.id] || miRecipeRegistry[id]
            let shape = buildMachineShape(event, tierArgs)
            if (args.fromExisting) recipeType = event.getRecipeType(args.fromExisting)
            tiersArray.push(event.createTier(
                tierArgs.id,
                recipeType,
                shape,
                (workstations) => workstations.add(tierArgs.workstationID),
                tierArgs.maxBaseEU || 128,
                tierArgs.batchsize || 1,
                tierArgs.costMulti || 1
            ))
        })

        let overlays = getOverlaysOrDefaults(args)

        if(args.fromExisting){
            let multiTypeFunction = args.steam ? event.steam : event.electric

            multiTypeFunction.apply(event, [
                idToName(id), id,
                (tiers) => {
                    tiersArray.forEach(tier => {
                        tiers.add(tier)
                    })
                },
                overlays.mainCasing, overlays.mainOverlays, overlays.frontOverlay, overlays.topOverlay, overlays.sideOverlay
            ])

            
        } else {
            let multiTypeFunction = args.steam ? event.steamStandalone : event.electricStandalone
            let [itemInputsCallback, itemOutputsCallback, fluidInputsCallback, fluidOutputsCallback] = createMultiSlotCallbacks(args)

            multiTypeFunction.apply(event, [
                idToName(id), id,
                (tiers) => {
                    tiersArray.forEach(tier => {
                        tiers.add(tier)
                    })
                },
                defaultProgressBar(event, args.pBar),
                itemInputsCallback,
                itemOutputsCallback,
                fluidInputsCallback,
                fluidOutputsCallback,
                overlays.mainCasing, overlays.mainOverlays, overlays.frontOverlay, overlays.topOverlay, overlays.sideOverlay
            ])

        }

    })
    jsonDataForMITweaksTieredMachine(id, args)
}

function registerBatchMIMachineFromExisting(id, args){
    MITweaksMachineEvents.registerBatchMultiblocks(event => {
        let shape = buildMachineShape(event, args)
        const multiTypeFunction = args.steam ? event.steam : event.electric
        let overlays = getOverlaysOrDefaults(args)
        multiTypeFunction.apply(event, [
            idToName(id), id, event.getRecipeType(args.recipeType), shape,
            (emiWorkstations) => emiWorkstations.add.apply(emiWorkstations, args.emiWorkstations),
            overlays.mainCasing, overlays.mainOverlays, overlays.frontOverlay, overlays.topOverlay, overlays.sideOverlay,
            args.batchsize, args.costMulti
        ]) 
    })
    jsonDataForMITweaksMachine(id, args)
}

function saveJsonToPath(path, json){
    JsonIO.write(path, json)
}

function jsonDataForMITweaksTieredMachine(machineName, args){
    let {tiers} = args
    tiers.forEach(tier => {
        global.langCustomStuff[`custom_multiblock_tier.mi_tweaks.${tier.id}`] = Object.assign({ "en_us": tier.name || idToName(tier.id)})
        global.langCustomStuff[`rei_categories.mi_tweaks.${tier.id}`] = Object.assign({ "en_us": tier.name || idToName(tier.id) })
    })
    jsonDataForMITweaksMachine(machineName, args)
}

function jsonDataForMITweaksMachine(machineId, args){
    let { mainCasing, mainOverlays } = args
    global.langCustomStuff[`block.mi_tweaks.${machineId}`] = Object.assign({ "en_us": idToName(machineId)})
    global.langCustomStuff[`rei_categories.modern_industrialization.${machineId}`] = Object.assign({ "en_us": idToName(machineId)})
    global.langCustomStuff[`rei_categories.mi_tweaks.${machineId}`] = Object.assign({ "en_us": idToName(machineId)})
    milfData.addCredit(`${machineId}`, "mi_machine", "mi_tweaks")
    global.miTweaksTags.push(`mi_tweaks:${machineId}`)
    return
    let blockstatesPath = `kubejs/assets/mi_tweaks/blockstates/${machineId}.json`
    let blockstatesJson = {
        "variants": {
            "": {
                "model": `mi_tweaks:block/${machineId}`
            }
        }
    }
    saveJsonToPath(blockstatesPath, blockstatesJson)

    let modelPath = `kubejs/assets/mi_tweaks/models/block/${machineId}.json`
    let modelJson = {
        "casing": `modern_industrialization:${mainCasing}`,
        "default_overlays": {
            "fluid_auto": "modern_industrialization:block/overlays/fluid_auto",
            "item_auto": "modern_industrialization:block/overlays/item_auto",
            "output": "modern_industrialization:block/overlays/output"
        },
        "loader": "modern_industrialization:machine"
    }

    if (args.frontOverlay){
        modelJson.default_overlays.front = `modern_industrialization:block/machines/${mainOverlays}/overlay_front`
        modelJson.default_overlays.front_active = `modern_industrialization:block/machines/${mainOverlays}/overlay_front_active`
    }

    if (args.topOverlay){
        modelJson.default_overlays.top = `modern_industrialization:block/machines/${mainOverlays}/overlay_top`
        modelJson.default_overlays.top_active = `modern_industrialization:block/machines/${mainOverlays}/overlay_top_active`
    }

    if (args.sideOverlay) {
        modelJson.default_overlays.side = `modern_industrialization:block/machines/${mainOverlays}/overlay_side`
        modelJson.default_overlays.side_active = `modern_industrialization:block/machines/${mainOverlays}/overlay_side_active`
    }

    

    saveJsonToPath(modelPath, modelJson)

    let itemPath = `kubejs/assets/mi_tweaks/models/item/${machineId}.json`
    let itemJson = {
        "parent": `mi_tweaks:block/${machineId}`
    }
    saveJsonToPath(itemPath, itemJson)

    let dataPath = `kubejs/data/mi_tweaks/loot_table/blocks/${machineId}.json`
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
                        "name": `mi_tweaks:${machineId}`
                    }
                ],
                "rolls": 1.0
            }
        ],
        "random_sequence": `mi_tweaks:blocks/${machineId}`
    }
    saveJsonToPath(dataPath, dataJson)
}
