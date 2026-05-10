MIMachineEvents.registerCasings(event => {
    event.registerBlockImitation("treated_wood_casing", "immersiveengineering:basic_engineering");
    event.registerBlockImitation("sheetmetal_steel_casing", "immersiveengineering:sheetmetal_steel");
    event.registerBlockImitation("sheetmetal_aluminum_casing", "immersiveengineering:sheetmetal_aluminum");

    event.registerBlockImitation("fire_clay_bricks", "modern_industrialization:fire_clay_bricks");
    event.registerBlockImitation("blast_brick", "immersiveengineering:blastbrick");
    event.registerBlockImitation("steel_plated_bricks", "extended_industrialization:steel_plated_bricks");

    event.registerBlockImitation("bioresistant_machine_casing", "modern_industrialization:bioresistant_machine_casing");
    event.registerBlockImitation("bioactive_machine_casing", "modern_industrialization:bioactive_machine_casing");
    event.registerBlockImitation("biointensive_machine_casing", "modern_industrialization:biointensive_machine_casing");
})

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
    let recipe
    MIMachineEvents.registerRecipeTypes(event => {
        recipe = event.register(name)
        args.itemsIn && (recipe = recipe.withItemInputs())
        args.itemsOut && (recipe = recipe.withItemOutputs())
        args.fluidsIn && (recipe = recipe.withFluidInputs())
        args.fluidsOut && (recipe = recipe.withFluidOutputs())
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
            if (args.fromExisting) recipe = event.getRecipeType(args.fromExisting)
            tiersArray.push(event.createTier(
                tier.id,
                recipe,
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

registerMIMachine('enigma_machine', {itemsIn: true, itemsOut: true, casing: 'treated_wood_casing',
    shape: [
        ['           ','           ','           ','           ','           ','           '],
        ['    PPP    ','    SSS    ','           ','           ','           ','           '],
        ['  PPPPPPP  ','  MM   MM  ','           ','           ','           ','           '],
        ['  PPPPPPP  ','  M     M  ','           ','           ','           ','           '],
        [' PPPMMMPPP ',' S  HLH  S ','    B B    ','    B B    ','    BBB    ','    SMS    '],
        [' PPPMMMPPP ',' S  LGL  S ','     G     ','     G     ','    BGB    ','    MMM    '],
        [' PPPMMMPPP ',' S  H#H  S ','    B B    ','    B B    ','    BBB    ','    SMS    '],
        ['  PPPPPPP  ','  M     M  ','           ','           ','           ','           '],
        ['  PPPPPPP  ','  MM   MM  ','           ','           ','           ','           '],
        ['    PPP    ','    SSS    ','           ','           ','           ','           '],
        ['           ','           ','           ','           ','           ','           '],
    ],
    shapeKeys: {
        M: "immersiveengineering:sheetmetal_steel",
        P: "immersiveengineering:treated_wood_horizontal",
        H: {id: "immersiveengineering:basic_engineering", hatches: MI_HATCHES_ALL},
        S: "immersiveengineering:slab_sheetmetal_steel",
        L: "immersiveengineering:logic_unit",
        B: "xkdeco:hollow_steel_beam",
        G: "ae2:quartz_vibrant_glass"
    },
    pBar: {x: 58, y: 33, name: 'enigma_arrow'},
    itemInputSlots: [[40, 35, 1, 1], [50, 55, 1, 1], [50, 15, 1, 1]],
    itemOutputSlots: [[80, 35, 1, 1]],
    mainCasing:'treated_wood_casing', mainOverlays: 'enigma_overlays', frontOverlay: true
})

registerMIMachine('radio_transcriber', {itemsIn: true, itemsOut: true, casing: 'treated_wood_casing',
    shape: [
        ['           ','           ','           ','           ','           '],
        ['           ','           ','           ','           ','           '],
        ['    sss    ','           ','           ','           ','           '],
        ['   sMHMs   ','    BOB    ','    wsw    ','           ','           '],
        ['  sM   Ms  ','   B   B   ','   w   w   ','           ','           '],
        ['  sH   Hs  ','   L   L   ','   s   s   ','           ','     T     '],
        ['  sM   Ms  ','   B   B   ','   w   w   ','           ','           '],
        ['   s   s   ','           ','     B     ','           ','           '],
        ['           ','           ','    E#I    ','    wtw    ','           '],
        ['           ','           ','           ','           ','           '],
        ['           ','           ','           ','           ','           '],
    ],
    shapeKeys: {
        M: "immersiveengineering:sheetmetal_steel",
        s: "immersiveengineering:slab_storage_steel",
        T: "immersiveengineering:radio_tower",
        B: "xkdeco:hollow_steel_beam",
        L: "immersiveengineering:logic_unit",
        w: "immersiveengineering:steel_wallmount",
        t: "immersiveengineering:tesla_coil",
        H: "immersiveengineering:basic_engineering",
        I: {id: "immersiveengineering:basic_engineering", hatches: ["item_input"]},
        O: {id: "immersiveengineering:basic_engineering", hatches: ["item_output"]},
        E: {id: "immersiveengineering:basic_engineering", hatches: ["energy_input"]}
    },
    pBar: {x: 58, y: 33, name: 'radio_tower_ui'},
    itemInputSlots: [[41, 35, 1, 1], [60, 55, 1, 1]],
    itemOutputSlots: [[80, 35, 1, 1]],
    mainCasing:'treated_wood_casing', mainOverlays: 'enigma_overlays', frontOverlay: true
})

registerPowerlessMIMachine('multiblock_packer_3000_safety_regulations_edition', {itemsIn: true, itemsOut: true, casing: 'sheetmetal_steel_casing',
    shape: [['AaBaA', 'abbba', 'CbDbC', 'abbba', 'AaBaA'],
            ['aAAAa', 'b   b', 'b   b', 'b   b', 'aaBaa'],
            ['BAAAB', 'b   b', 'D   D', 'b   b', 'BBBBB'],
            ['aAAAa', 'b   b', 'b   b', 'b   b', 'aaBaa'],
            ['AaBaA', 'abbba', 'Cb#bC', 'abbba', 'AaBaA']],
    shapeKeys: {
        "A": "immersiveengineering:slab_sheetmetal_steel",
        "a": { id: "immersiveengineering:sheetmetal_steel", hatches: MI_HATCHES_ALL },
        "B": "immersiveengineering:steel_scaffolding_standard",
        "b": "xkdeco:hollow_steel_beam",
        "C": "immersiveengineering:light_engineering",
        "D": "immersiveengineering:logic_unit"
    },
    // shape: [['AaA', 'BbB', 'AaA'], 
    //         ['a a', 'b b', 'aaa'], 
    //         ['AaA', 'B#B', 'AaA']],
    // shapeKeys: {"A":{id:"immersiveengineering:sheetmetal_steel", hatches:MI_HATCHES_ALL},
    //             "a":"immersiveengineering:steel_scaffolding_standard",
    //             "B":"immersiveengineering:light_engineering",
    //             "b":"immersiveengineering:basic_engineering"},
    pBar: {x: 54, y: 69, name: 'square'},
    //itemInputSlots: [[20, 35, 2, 1], [20, 53, 1, 1], [74, 35, 2, 1], [92, 53, 1, 1], [20, 107, 2, 1], [20, 89, 1, 1], [74, 107, 2, 1], [92, 89, 1, 1]],
    itemInputSlots: [[20, 35, 2, 2], [74, 35, 2, 2], [20, 89, 2, 2], [74, 89, 2, 2]],
    itemOutputSlots: [[56, 71, 1, 1]],
    mainCasing:'treated_wood_casing', mainOverlays: 'multiblock_packer', frontOverlay: true
})

registerMIMachine('steam_cracker', {itemsOut: true, fluidsIn:true, fluidsOut:true, casing: 'sheetmetal_steel_casing',
    shape: [['A         A', 'A   a a   A', 'A   a a   A', 'AaaaaaaaaaA', 'Aa a a a aA', 'ABBBBBBBBBA', '           ', '           ', '           ', '           ', '  ABBBBBA  ', '           ', '           ', '           ', '  ABBBBBA  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
            [' bCCCcCCCb ', ' b  aDa  b ', ' bdddEdddb ', 'abbbbbbbbba', 'aaeaeaeaeaa', 'BDe e e eDB', ' Ae e e eA ', ' AeaeaeaeA ', ' AbabababA ', ' ADaaaaaDA ', ' ADDBBBDDA ', ' AD     DA ', ' AFa   aFA ', ' ADaaaaaDA ', ' ADDBBBDDA ', '  DD   DD  ', '  ff   ff  ', '           ', '  BBBBBBB  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
            [' CDDfffDDC ', '  DGaaaGD  ', ' d       d ', 'abbbbbbbbba', ' eegegegee ', 'BeeHeHeHeeB', ' eeHeHeHee ', ' eegegegee ', ' bbbbbbbbb ', ' DeeeaeeeD ', 'ADeeeBeeeDA', ' Deee eeeD ', ' Feee eeeF ', ' DeeeaeeeD ', 'ADeeeBeeeDA', ' Deee eeeD ', ' feee eeef ', '  eee eee  ', ' BeeeBeeeB ', '  eee eee  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
            [' CDDfffDDC ', '  GD a DG  ', ' d       d ', 'abbeebeebba', 'aag     gaa', 'B H     H B', '  H     H  ', ' ag     ga ', ' abeebeeba ', ' ae eae ea ', 'BDe eBe eDB', '  e e e e  ', ' ae e e ea ', ' ae eae ea ', 'BDe eBe eDB', ' De e e eD ', ' fe e e ef ', '  e e e e  ', ' Beee eeeB ', '  eee eee  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
            [' CffhhhffC ', 'aaa  a  aaa', 'ad       da', 'abbebbbebba', ' ee     ee ', 'Bee     eeB', ' ee     ee ', ' ee     ee ', ' bbebbbebb ', ' aeeeaeeea ', 'BBeeeBeeeBB', '  eee eee  ', '  eee eee  ', ' aeeeaeeea ', 'BBeeeBeeeBB', '  eeeAeee  ', '  eeeAeee  ', '  eeeAeee  ', ' BeeeAeeeB ', '  eeeAeee  ', '     A     ', '     A     ', '     A     ', '    BAB    ', '           ', '           ', '           ', '           '],
            [' cffhhhffc ', ' DaaaaaaaD ', ' E   a   E ', 'abbbbabbbba', 'aag  a  gaa', 'B H  a  H B', '  H  a  H  ', ' ag  a  ga ', ' abbbabbba ', ' aaaaaaaaa ', 'BBBBBaBBBBB', '     a     ', '     a     ', ' aaaaaaaaa ', 'BBBBBaBBBBB', '    AaA    ', '    AaA    ', '    AaA    ', ' BB AaA BB ', '    AaA    ', '    AaA    ', '    AaA    ', '    AaA    ', '    AaA    ', '     a     ', '     a     ', '     a     ', '     a     '],
            [' CffhhhffC ', 'aaa  a  aaa', 'ad       da', 'abbebbbebba', ' ee     ee ', 'Bee     eeB', ' ee     ee ', ' ee     ee ', ' bbebbbebb ', ' aeeeaeeea ', 'BBeeeBeeeBB', '  eee eee  ', '  eee eee  ', ' aeeeaeeea ', 'BBeeeBeeeBB', '  eeeAeee  ', '  eeeAeee  ', '  eeeAeee  ', ' BeeeAeeeB ', '  eeeAeee  ', '     A     ', '     A     ', '     A     ', '    BAB    ', '           ', '           ', '           ', '           '],
            [' CDDfffDDC ', '  GD a DG  ', ' d       d ', 'abbeebeebba', 'aag     gaa', 'B H     H B', '  H     H  ', ' ag     ga ', ' abeebeeba ', ' ae eae ea ', 'BDe eBe eDB', '  e e e e  ', ' ae e e ea ', ' ae eae ea ', 'BDe eBe eDB', ' De e e eD ', ' fe e e ef ', '  e e e e  ', ' Beee eeeB ', '  eee eee  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
            [' CDDfffDDC ', '  DGaaaGD  ', ' d       d ', 'abbbbbbbbba', ' eegegegee ', 'BeeHeHeHeeB', ' eeHeHeHee ', ' eegegegee ', ' bbbbbbbbb ', ' DeeeaeeeD ', 'ADeeeBeeeDA', ' Deee eeeD ', ' Feee eeeF ', ' DeeeaeeeD ', 'ADeeeBeeeDA', ' Deee eeeD ', ' feee eeef ', '  eee eee  ', ' BeeeBeeeB ', '  eee eee  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
            [' bCCCcCCCb ', ' b  a#a  b ', ' bdddEdddb ', 'abbbbbbbbba', 'aaeaeaeaeaa', 'BDe e e eDB', ' Ae e e eA ', ' AeaeaeaeA ', ' AbabababA ', ' ADaaaaaDA ', ' ADDBBBDDA ', ' AD     DA ', ' AFa   aFA ', ' ADaaaaaDA ', ' ADDBBBDDA ', '  DD   DD  ', '  ff   ff  ', '           ', '  BBBBBBB  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
            ['A         A', 'A   a a   A', 'A   a a   A', 'AaaaaaaaaaA', 'Aa a a a aA', 'ABBBBBBBBBA', '           ', '           ', '           ', '           ', '  ABBBBBA  ', '           ', '           ', '           ', '  ABBBBBA  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ']],
    shapeKeys: {"A": "immersiveengineering:steel_scaffolding_grate_top",
                "a": "immersiveengineering:fluid_pipe",
                "B": "immersiveengineering:slab_steel_scaffolding_grate_top",
                "b": "immersiveengineering:concrete_tile",
                "C": "immersiveengineering:steel_scaffolding_standard",
                "c": {id:"immersiveengineering:sheetmetal_steel", hatches:["item_output"]},
                "D": "immersiveengineering:sheetmetal_steel",
                "d": "xkdeco:hollow_steel_beam",
                "E": {id:"immersiveengineering:sheetmetal_steel", hatches:["energy_input"]},
                "e": "immersiveengineering:sheetmetal_aluminum",
                "F": {id:"immersiveengineering:sheetmetal_steel", hatches:["fluid_output"]},
                "f": "immersiveengineering:slab_storage_steel",
                "G": {id:"immersiveengineering:sheetmetal_steel", hatches:["fluid_input"]},
                "g": "immersiveengineering:radiator",
                "H": "immersiveengineering:light_engineering",
                "h": "immersiveengineering:heavy_engineering"},
    pBar: {x: 77, y: 73, name: 'arrow'},
    itemOutputSlots: [[102, 115, 2, 1]],
    fluidInputSlots:[[36, 75,2,1]],
    fluidOutputSlots: [[102, 55, 2, 3]],
    mainCasing:'sheetmetal_steel_casing', mainOverlays: 'coke_oven', frontOverlay: true
})

registerMIMachine('desalter', {itemsOut: true, fluidsIn:true, fluidsOut:true, casing: 'sheetmetal_aluminum_casing',
    shape: [[' AAAAA ', '       ', '       ', '       ', '       ', '       ', '       '],
            ['AAAAAAA', '  aaa  ', '  aBa  ', '  aba  ', ' CCCCC ', '       ', '       '],
            ['AAaaaAA', ' a C a ', ' a   a ', ' a   a ', ' CaaaC ', '  ccc  ', '  DDD  '],
            ['AAaaaAA', ' a C d ', ' a   a ', ' E   b ', ' CaaaC ', '  ccc  ', '  D D  '],
            ['AAaaaAA', ' a C a ', ' a   a ', ' a   a ', ' CaaaC ', '  ccc  ', '  D D  '],
            ['AAaaaAA', ' a C d ', ' a   a ', ' E   b ', ' CaaaC ', '  ccc  ', '  D D  '],
            ['AAaaaAA', ' a C a ', ' a   a ', ' a   a ', ' CaaaC ', '  ccc  ', '  D D  '],
            ['AAaaaAA', ' a C d ', ' a   a ', ' E   b ', ' CaaaC ', '  ccc  ', '  D D  '],
            ['AAaaaAA', ' a C a ', ' a   a ', ' a   a ', ' Caaac ', '  cccc ', '  D DD '],
            ['AAeeeAA', ' e C eF', ' e   eF', ' e   eF', ' CeeeeF', '  ccceF', '  D    '],
            ['AAaaaAA', ' a C a ', ' a   a ', ' a   a ', ' Caaac ', '  cccc ', '  D DD '],
            ['AAAAAAA', '  aba  ', '  a#a  ', '  aGa  ', ' Cggg  ', '  ggg  ', '  DDD  '],
            [' AAAAA ', ' CCC   ', ' C     ', ' C     ', ' C     ', '       ', '       ']],
    shapeKeys: {"A": "immersiveengineering:slab_concrete",
                "a": "immersiveengineering:sheetmetal_aluminum",
                "B": {id:"immersiveengineering:sheetmetal_aluminum", hatches:["fluid_output"]},
                "b": "immersiveengineering:fluid_sorter",
                "C": "immersiveengineering:fluid_pipe",
                "c": "immersiveengineering:steel_scaffolding_grate_top",
                "D": "immersiveengineering:steel_fence",
                "d": {id:"immersiveengineering:sheetmetal_aluminum", hatches:["item_output"]},
                "E": {id:"immersiveengineering:sheetmetal_aluminum", hatches:["fluid_input"]},
                "e": "immersiveengineering:sheetmetal_steel",
                "F": "immersiveengineering:metal_ladder_none",
                "G": {id:"immersiveengineering:sheetmetal_aluminum", hatches:["energy_input"]},
                "g": "xkdeco:hollow_steel_beam"},
    pBar: {x: 77, y: 53, name: 'arrow'},
    itemOutputSlots: [[61, 80, 3, 1]],
    fluidInputSlots:[[36, 55,1,1], [79, 35, 1, 1]],
    fluidOutputSlots: [[122, 55, 1, 1]],
    mainCasing:'sheetmetal_aluminum_casing', mainOverlays: 'coke_oven', frontOverlay: true
})

registerMIMachine('electric_coke_oven', {itemsIn: true, itemsOut: true, fluidsIn:true, fluidsOut:true, casing: 'heatproof_machine_casing',
    shape: [['HHH', 'aaa', 'AaA', 'AaA'], 
            ['HHH', 'a a', 'A A', 'AAA'], 
            ['BAB', 'B#B', 'BAB', 'BAB']],
    shapeKeys: {"A":"modern_industrialization:heatproof_machine_casing",
                "a":"modern_industrialization:cupronickel_coil",
                "B":"modern_industrialization:invar_machine_casing_pipe",
                "H":{id:"modern_industrialization:heatproof_machine_casing", hatches:MI_HATCHES_ALL}},
    pBar: {x: 77, y: 33, name: 'arrow'},
    itemInputSlots: [[56, 35, 1, 2]],
    itemOutputSlots: [[102, 35, 1, 1]],
    fluidInputSlots:[[36, 35,1,1]],
    fluidOutputSlots: [[122, 35, 1, 1]],
    mainCasing:'heatproof_machine_casing', mainOverlays: 'coke_oven', frontOverlay: true
})

registerBatchMIMachineFromExisting('advanced_large_steam_furnace', {steam:true, casing: 'modern_industrialization:fire_clay_bricks', recipeType:"modern_industrialization:mi_furnace",
    emiWorkstations:["modern_industrialization:bronze_mi_furnace"],
    shape: [['AAA', 'aaa', 'aaa'], 
            ['BAB', 'B B', 'BaB'], 
            ['AAA', 'a#a', 'aaa']],
    shapeKeys: {"A":{id:"modern_industrialization:fire_clay_bricks", hatches: MI_HATCHES_ALL},
                "a":"modern_industrialization:bronze_plated_bricks",
                "B":"modern_industrialization:bronze_machine_casing_pipe"
    },
    mainCasing:'bronze_plated_bricks', mainOverlays: 'mi_furnace', frontOverlay: true,
    batchsize:8, costMulti:0.75
})

// registerBatchMIMachineFromExisting('large_electric_furnace', {casing: 'modern_industrialization:heatproof_machine_casing', recipeType:"modern_industrialization:mi_furnace",
//     emiWorkstations:["modern_industrialization:bronze_mi_furnace"],
//     shape: [['AAA', 'aaa', 'aaa', 'AAA'], 
//             ['BAB', 'B B', 'B B', 'BAB'], 
//             ['A#A', 'aaa', 'aaa', 'AAA']],
//     shapeKeys: {"A":{id:"modern_industrialization:heatproof_machine_casing", hatches: MI_HATCHES_ALL},
//                 "a":"modern_industrialization:cupronickel_coil",
//                 "B":"modern_industrialization:invar_machine_casing_pipe"},
//     mainCasing:'heatproof_machine_casing', mainOverlays: 'mi_furnace', frontOverlay: true,
//     batchsize:8, costMulti:0.75
// })

registerTieredMIMachine('large_electric_furnace', {
    fromExisting: "modern_industrialization:mi_furnace",
    casing: 'modern_industrialization:heatproof_machine_casing',
    tiers: [
        {
            id: "large_electric_furnace_cupronickel_tier", name: "Cupronickel", casing: "heatproof_machine_casing",
            shape: [['AAA', 'aaa', 'aaa', 'AAA'],
            ['BAB', 'B B', 'B B', 'BAB'],
            ['A#A', 'aaa', 'aaa', 'AAA']],
            shapeKeys: {
                "A": { id: "modern_industrialization:heatproof_machine_casing", hatches: MI_HATCHES_ALL },
                "a": "modern_industrialization:cupronickel_coil",
                "B": "modern_industrialization:invar_machine_casing_pipe"
            },
            workstationID: "modern_industrialization:bronze_mi_furnace",
            batchsize: 8, costMulti: 1
        },

        {
            id: "large_electric_furnace_kanthal_tier", name: "Kanthal", casing: "heatproof_machine_casing",
            shape: [['AAA', 'aaa', 'aaa', 'AAA'],
            ['BAB', 'B B', 'B B', 'BAB'],
            ['A#A', 'aaa', 'aaa', 'AAA']],
            shapeKeys: {
                "A": { id: "modern_industrialization:heatproof_machine_casing", hatches: MI_HATCHES_ALL },
                "a": "modern_industrialization:kanthal_coil",
                "B": "modern_industrialization:invar_machine_casing_pipe"
            },
            workstationID: "modern_industrialization:bronze_mi_furnace",
            batchsize: 16, costMulti: 1.2
        },

    ],
    mainCasing: 'heatproof_machine_casing', mainOverlays: 'mi_furnace', frontOverlay: true
})

registerBatchMIMachineFromExisting('advanced_steam_blast_furnace', {steam:true, casing: 'steel_plated_bricks', recipeType:"modern_industrialization:blast_furnace",
    emiWorkstations:["modern_industrialization:steam_blast_furnace"],
    shape: [['AaaaA', 'AaaaA', 'AaaaA', ' BBB '], 
            ['aaaaa', 'a   a', 'a   a', 'BAAAB'], 
            ['aaaaa', 'a   a', 'a   a', 'BAAAB'], 
            ['aaaaa', 'a   a', 'a   a', 'BAAAB'], 
            ['AaaaA', 'Aa#aA', 'AaaaA', ' BBB ']],
    shapeKeys: {"A":"immersiveengineering:blastbrick",
                "a":{id:"extended_industrialization:steel_plated_bricks", hatches: MI_HATCHES_ALL},
                "B":"immersiveengineering:slab_blastbrick"},
    mainCasing:'steel_plated_bricks', mainOverlays: 'blast_furnace', frontOverlay: true,
    batchsize:8, costMulti:0.75
})

registerBatchMIMachine('advanced_steam_alloy_smelter', {steam:true, itemsIn: true, itemsOut: true,fluidsIn: true, fluidsOut: true, casing: 'steel_plated_bricks',
    shape: [['AAaAA', 'AAaAA', 'AAaAA', 'BBaBB'], 
            ['AAbAA', 'A   A', 'A   A', 'BAaAB'], 
            ['abbba', 'a   a', 'a   a', 'aaaaa'], 
            ['AAbAA', 'A   A', 'A   A', 'BAaAB'], 
            ['AAaAA', 'AA#AA', 'AAaAA', 'BBaBB']],
    shapeKeys: {"A":"immersiveengineering:alloybrick",
                "a":{id:"extended_industrialization:steel_plated_bricks", hatches: MI_HATCHES_ALL},
                "B":"immersiveengineering:slab_alloybrick",
                "b":"modern_industrialization:fire_clay_bricks"},
    pBar: {x: 88, y: 33, name: 'arrow'},
    itemInputSlots: [[40, 35, 2, 1]],
    itemOutputSlots: [[120, 35,1,1]],
    mainCasing:'steel_plated_bricks', mainOverlays: 'coke_oven', frontOverlay: true,
    batchsize:8, costMulti:0.75
})

registerTieredMIMachine('bioactive_chamber', {itemsIn: true, itemsOut: true, casing: 'bioresistant_machine_casing', customName: "Bioactive Chamber",
    tiers:[ 
        {id:"bioactive_chamber_bioresistant_tier", name:"Bioresistant Tier", casing: "bioresistant_machine_casing", 
            shape: [['     ', ' AAA ', '     ', '     ', '     '], 
                    ['  A  ', 'AaBaA', '  B  ', ' aBa ', '  A  '], 
                    [' AAA ', 'AB BA', ' B B ', ' B B ', ' AAA '], 
                    ['  A  ', 'AaBaA', '  B  ', ' aBa ', '  A  '], 
                    ['     ', ' A#A ', '     ', '     ', '     ']], 
            shapeKeys: {"A":"modern_industrialization:bioresistant_machine_casing",
                        "a":"modern_industrialization:ferricore_machine_casing",
                        "B":"ae2:quartz_vibrant_glass"} , 
            workstationID: "modern_industrialization:bioresistant_machine_casing"},

        {id:"bioactive_chamber_bioactive_tier", name:"Bioactive Tier", casing: "bioactive_machine_casing", 
            shape: [['     ', ' AAA ', '     ', ' aaa ', '     '], 
                    ['  A  ', 'ABbBA', '  b  ', 'aCbCa', '  a  '], 
                    [' AAA ', 'Ab bA', ' b b ', 'ab ba', ' aaa '], 
                    ['  A  ', 'ABbBA', '  b  ', 'aCbCa', '  a  '], 
                    ['     ', ' A#A ', '     ', ' aaa ', '     ']], 
            shapeKeys: {"A":"modern_industrialization:bioresistant_machine_casing",
                        "a":"modern_industrialization:bioactive_machine_casing",
                        "B":"modern_industrialization:ferricore_machine_casing",
                        "b":"ae2:quartz_vibrant_glass",
                        "C":"modern_industrialization:blazegold_machine_casing"} , 
            workstationID: "modern_industrialization:bioactive_machine_casing"},

        {id:"bioactive_chamber_biointensive_tier", name:"Biointensive Tier", casing: "biointensive_machine_casing", 
            shape: [['     ', ' AAA ', '     ', ' aaa ', '     ', ' BBB ', '     '], 
                    ['  A  ', 'AbCbA', '  C  ', 'acCca', '  C  ', 'BDCDB', '  B  '], 
                    [' AAA ', 'AC CA', ' C C ', 'aC Ca', ' C C ', 'BC CB', ' BBB '], 
                    ['  A  ', 'AbCbA', '  C  ', 'acCca', '  C  ', 'BDCDB', '  B  '], 
                    ['     ', ' A#A ', '     ', ' aaa ', '     ', ' BBB ', '     ']], 
            shapeKeys: {"A":"modern_industrialization:bioresistant_machine_casing",
                        "a":"modern_industrialization:bioactive_machine_casing",
                        "B":"modern_industrialization:biointensive_machine_casing",
                        "b":"modern_industrialization:ferricore_machine_casing",
                        "C":"ae2:quartz_vibrant_glass",
                        "c":"modern_industrialization:blazegold_machine_casing",
                        "D":"modern_industrialization:celestigem_machine_casing"} , 
            workstationID: "modern_industrialization:biointensive_machine_casing"}
    ],
    pBar: {x: 54, y: 69, name: 'square'},
    itemInputSlots: [[20, 35, 2, 1], [20, 53, 1, 1], [74, 35, 2, 1], [92, 53, 1, 1], [20, 107, 2, 1], [20, 89, 1, 1], [74, 107, 2, 1], [92, 89, 1, 1]],
    itemOutputSlots: [[56, 71, 1, 1]],
    mainCasing:'bioresistant_machine_casing', mainOverlays: 'bioactive_chamber', frontOverlay: true
})

registerSingleMIMachine('mi_furnace', {name:"Furnace", itemsIn: true, itemsOut: true, tiers:machineTiersAll,
    pBar: {x: 77, y: 33, name: 'arrow'}, efBar: {x: 38, y: 62}, enBar: {x: 18, y: 30},
    slots:{iIn:1, iOut:1},
    itemSlots: [[56, 35, 1, 1], [102, 35, 1, 1]],
    frontOverlay: true
})

registerSingleMIMachine('microbial_fabricator', {name:"Microbial Fabricator", itemsIn: true, itemsOut: true,
    pBar: {x: 58, y: 33, name: 'enigma_arrow'}, efBar: {x: 62, y: 75000}, enBar: {x: 18, y: 35},
    slots:{iIn:3, iOut:1},
    itemSlots: [[50, 15, 1, 1], [40, 35, 1, 1], [50, 55, 1, 1], [80, 35, 1, 1]],
    frontOverlay: true, sideOverlay:true
})

registerSinglePowerlessMIMachine('not_so_multi_but_still_block_packer_2099_3x3x3_edition', { itemsIn: true, itemsOut: true,
    pBar: {x: 78, y: 69, name: 'square'}, guiheight: 240,
    slots:{iIn:12, iOut:1},
    itemSlots: [[44, 35, 2, 1], [44, 53, 1, 1], [98, 35, 2, 1], [116, 53, 1, 1], [44, 107, 2, 1], [44, 89, 1, 1], [98, 107, 2, 1], [116, 89, 1, 1], [80, 71, 1, 1]],
    mainCasing:'treated_wood_casing', mainOverlays: 'multiblock_packer', frontOverlay: true
})



function saveJsonToPath(path, json){
    //JsonIO.write(path, JSON.stringify(json, null, 2))
    JsonIO.write(path, json)
}

function jsonDataForMITweaksTieredMachine(machineName, mainCasing, mainOverlays, tiers){
    tiers.forEach(tier => {
        global.langCustomStuff[`custom_multiblock_tier.mi_tweaks.${tier.id}`] = Object.assign({ "en_us": tier.name || idToName(tier.id)})
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
