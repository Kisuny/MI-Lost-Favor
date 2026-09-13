let VANILLA_STEAM_MI_MACHINES = {
    "modern_industrialization:compressor": {
        minTier: "bronze",
        minRecipeCategory: "modern_industrialization:bronze_compressor",
        pBar: { x: 77, y: 34, name: "compress" },
        efBar: { x: 38, y: 62 },
        enBar: { x: 18, y: 30 },
        itemsIn: true, itemsOut: true,
        fluidsIn: false, fluidsOut: false,
        slots: { iIn: 1, iOut: 1, fIn: 0, fOut: 0 },
        itemSlots: [[56, 35, 1, 1], [102, 35, 1, 1]],
        mainOverlays: "compressor",
        frontOverlay: true,
        topOverlay: true,
        sideOverlay: true
    },
    "modern_industrialization:cutting_machine": {
        minTier: "bronze",
        minRecipeCategory: "modern_industrialization:bronze_cutting_machine",
        pBar: { x: 88, y: 31, name: "slice" },
        efBar: { x: 38, y: 62 },
        enBar: { x: 15, y: 34 },
        itemsIn: true, itemsOut: true,
        fluidsIn: true, fluidsOut: false,
        slots: { iIn: 1, iOut: 1, fIn: 1, fOut: 0 },
        itemSlots: [[60, 35, 1, 1], [120, 35, 1, 1]],
        fluidSlots: [[40, 35, 1, 1]],
        mainOverlays: "cutting_machine",
        frontOverlay: true,
        topOverlay: false,
        sideOverlay: false
    },
    "modern_industrialization:macerator": {
        minTier: "bronze",
        minRecipeCategory: "modern_industrialization:bronze_macerator",
        pBar: { x: 77, y: 33, name: "macerate" },
        efBar: { x: 38, y: 66 },
        enBar: { x: 18, y: 34 },
        itemsIn: true, itemsOut: true,
        fluidsIn: false, fluidsOut: false,
        slots: { iIn: 1, iOut: 4, fIn: 0, fOut: 0 },
        itemSlots: [[56, 35, 1, 1], [102, 27, 2, 2]],
        mainOverlays: "macerator",
        frontOverlay: true,
        topOverlay: true,
        sideOverlay: false
    },
    "modern_industrialization:mi_furnace": {
        minTier: "bronze",
        minRecipeCategory: "modern_industrialization:bronze_mi_furnace",
        pBar: { x: 77, y: 33, name: "arrow" },
        efBar: { x: 38, y: 62 },
        enBar: { x: 18, y: 30 },
        itemsIn: true, itemsOut: true,
        fluidsIn: false, fluidsOut: false,
        slots: { iIn: 1, iOut: 1, fIn: 0, fOut: 0 },
        itemSlots: [[56, 35, 1, 1], [102, 35, 1, 1]],
        mainOverlays: "mi_furnace",
        frontOverlay: true,
        topOverlay: false,
        sideOverlay: false
    },
    "modern_industrialization:mixer": {
        minTier: "bronze",
        minRecipeCategory: "modern_industrialization:bronze_mixer",
        pBar: { x: 103, y: 33, name: "arrow" },
        efBar: { x: 50, y: 66 },
        enBar: { x: 15, y: 34 },
        itemsIn: true, itemsOut: true,
        fluidsIn: true, fluidsOut: true,
        slots: { iIn: 4, iOut: 2, fIn: 2, fOut: 2 },
        itemSlots: [[62, 27, 2, 2], [129, 27, 1, 2]],
        fluidSlots: [[42, 27, 1, 2], [149, 27, 1, 2]],
        mainOverlays: "mixer",
        frontOverlay: true,
        topOverlay: true,
        sideOverlay: true
    },
    "modern_industrialization:unpacker": {
        minTier: "steel",
        minRecipeCategory: "modern_industrialization:steel_unpacker",
        pBar: { x: 77, y: 33, name: "arrow" },
        efBar: { x: 38, y: 66 },
        enBar: { x: 18, y: 30 },
        itemsIn: true, itemsOut: true,
        fluidsIn: false, fluidsOut: false,
        slots: { iIn: 1, iOut: 2, fIn: 0, fOut: 0 },
        itemSlots: [[56, 36, 1, 1], [102, 27, 1, 2]],
        mainOverlays: "unpacker",
        frontOverlay: true,
        topOverlay: false,
        sideOverlay: false
    },
    "modern_industrialization:packer": {
        minTier: "steel",
        minRecipeCategory: "modern_industrialization:steel_packer",
        guiheight: 178,
        pBar: { x: 77, y: 33, name: "arrow" },
        efBar: { x: 38, y: 74 },
        enBar: { x: 18, y: 30 },
        itemsIn: true, itemsOut: true,
        fluidsIn: false, fluidsOut: false,
        slots: { iIn: 3, iOut: 1, fIn: 0, fOut: 0 },
        itemSlots: [[56, 18, 1, 3], [102, 36, 1, 1]],
        mainOverlays: "packer",
        frontOverlay: true,
        topOverlay: false,
        sideOverlay: false
    },
    "modern_industrialization:wiremill": {
        minTier: "steel",
        minRecipeCategory: "modern_industrialization:steel_wiremill",
        pBar: { x: 77, y: 34, name: "wiremill" },
        efBar: { x: 38, y: 62 },
        enBar: { x: 18, y: 30 },
        itemsIn: true, itemsOut: true,
        fluidsIn: false, fluidsOut: false,
        slots: { iIn: 1, iOut: 1, fIn: 0, fOut: 0 },
        itemSlots: [[56, 35, 1, 1], [102, 35, 1, 1]],
        mainOverlays: "wiremill",
        frontOverlay: true,
        topOverlay: true,
        sideOverlay: false
    }
}

global.VANILLA_MI_MACHINES_VARIATIONS = {}

function addSlotToMachineData(typeCallback, slotDataArray, data) {
    let newData = JSON.parse(JSON.stringify(data))
    typeCallback(newData, slotDataArray)
    return newData
}

const MI_SLOT_TYPE_CALLBACK = {

    itemInput: (data, slotDataArray) => {
        data.itemsIn = true
        data.slots.iIn++
        if (!data.itemSlots) data.itemSlots = []
        data.itemSlots.unshift(slotDataArray)
    },

    itemOutput: (data, slotDataArray) => {
        data.itemsOut = true
        data.slots.iOut++
        if (!data.itemSlots) data.itemSlots = []
        data.itemSlots.splice(data.slots.iIn, 0, slotDataArray)
    },

    fluidInput: (data, slotDataArray) => {
        data.fluidsIn = true
        data.slots.fIn++
        if (!data.fluidSlots) data.fluidSlots = []
        data.fluidSlots.unshift(slotDataArray)
    },

    fluidOutput: (data, slotDataArray) => {
        data.fluidsOut = true
        data.slots.fOut++
        if (!data.fluidSlots) data.fluidSlots = []
        data.fluidSlots.splice(data.slots.fIn, 0, slotDataArray)
    }
}

addMachineVariations(
    VANILLA_STEAM_MI_MACHINES,
    (machineId) => `ember_powered_${machineId.split(":")[1]}`,
    (data) => addSlotToMachineData(MI_SLOT_TYPE_CALLBACK.itemInput, [12, 35, 1, 1], data),
    (variationId, modifiedData) => {return {
        argsCallback: (args) => {
            if (args.inputItems) {
                args.inputItems.unshift([{ item: "embers:ember_grit" }, 1, 0.71])
            } else {
                args.inputItems = [[{ item: "embers:ember_grit" }, 1, 0.71]]
            }

            args.energy = 1

            args.time = args.time / 1.5 | 0
        },

        argsPredicate: (args) => {
            return args.energy <= 4
        },

        category: `mi_tweaks:${variationId}`,
        addAsWorkstationTo: getAllCategoriesUpToSteel(modifiedData)
    }},
    (variationId, modifiedData) => {
        registerSinglePowerlessMIMachine(
            variationId,
            Object.assign({}, modifiedData, {
                mainCasing: "chart_crate",
            })
        )
    }
)

addMachineVariations(
    VANILLA_STEAM_MI_MACHINES,
    (machineId) => `solar_powered_${machineId.split(":")[1]}`,
    (data) => JSON.parse(JSON.stringify(data)),
    (variationId, modifiedData) => {return {
        argsCallback: (args) => {
            args.custom_condition = "solar_powered",

            args.energy = 1

            args.time = args.time / 2 | 0
        },

        argsPredicate: (args) => {
            return args.energy <= 4
        },

        category: `mi_tweaks:${variationId}`,
        addAsWorkstationTo: getAllCategoriesUpToSteel(modifiedData)
    }},
    (variationId, modifiedData) => {
        registerSinglePowerlessMIMachine(
            variationId,
            Object.assign({}, modifiedData, {
                mainCasing: "machine_core_3",
            })
        )
    }
)

addMachineVariations(
    VANILLA_STEAM_MI_MACHINES,
    (machineId) => `basic_electric_${machineId.split(":")[1]}`,
    (data) => {
        let modifiedData = addSlotToMachineData(MI_SLOT_TYPE_CALLBACK.itemInput, [3, 35, 1, 1], data)
        return addSlotToMachineData(MI_SLOT_TYPE_CALLBACK.fluidInput, [21, 35, 1, 1], modifiedData)
    },
    (variationId, modifiedData) => {
        return {
            argsCallback: (args) => {
                if (args.inputItems) {
                    args.inputItems.unshift([{ item: "modern_industrialization:redstone_battery" }, 1, 0.07])
                } else {
                    args.inputItems = [[{ item: "modern_industrialization:redstone_battery" }, 1, 0.07]]
                }

                if (args.inputFluids) {
                    args.inputFluids.unshift([{ fluid: "immersiveengineering:redstone_acid" }, 25, 0.72])
                } else {
                    args.inputFluids = [[{ fluid: "immersiveengineering:redstone_acid" }, 25, 0.72]]
                }

                args.energy = 1

                args.time = args.time / 5 | 0

            },

            argsPredicate: (args) => {
                return args.energy <= 4
            },

            category: `mi_tweaks:${variationId}`,
            addAsWorkstationTo: getAllCategoriesUpToSteel(modifiedData)
        }
    },
    (variationId, modifiedData) => {

        // (^._.^)ﾉ

        // registerSingleMIMachine(
        //     variationId,
        //     Object.assign({}, modifiedData, {
        //         tiers: ["electric"],
        //         customModelData:{
        //             mainCasing: "treated_wood_casing",
        //             frontOverlay: modifiedData.frontOverlay ? {
        //                 idle: `modern_industrialization:block/machines/${modifiedData.mainOverlays}/overlay_front`,
        //                 active: `modern_industrialization:block/machines/${modifiedData.mainOverlays}/overlay_front_active`
        //             } : null,
        //             topOverlay: modifiedData.topOverlay ? {
        //                 idle: `modern_industrialization:block/machines/${modifiedData.mainOverlays}/overlay_top`,
        //                 active: `modern_industrialization:block/machines/${modifiedData.mainOverlays}/overlay_top_active`
        //             } : null,
        //             sideOverlay: modifiedData.sideOverlay ? {
        //                 idle: `modern_industrialization:block/machines/${modifiedData.mainOverlays}/overlay_side`,
        //                 active: `modern_industrialization:block/machines/${modifiedData.mainOverlays}/overlay_side_active`
        //             } : null

        //         }
        //     })
        // )

        registerSinglePowerlessMIMachine(
            variationId,
            Object.assign({}, modifiedData, {
                mainCasing: "rs_engineering",
            })
        )
    }
)

function getAllCategoriesUpToSteel(data){
    let categories = [data.minRecipeCategory]

    if(data.minTier == "bronze"){
        categories.push(data.minRecipeCategory.replace("bronze", "steel"))
    }

    return categories
}

function addMachineVariations(machineEntries, machineIdCallback,machineDataCallback, recipeDataFactory, registrationCallback){
    Object.entries(machineEntries).forEach(([machineId, data]) => {

        let variationId = machineIdCallback(machineId)

        let modifiedData = machineDataCallback(data)

        global.VANILLA_MI_MACHINES_VARIATIONS[machineId] = global.VANILLA_MI_MACHINES_VARIATIONS[machineId] || {}

        global.VANILLA_MI_MACHINES_VARIATIONS[machineId][`modern_industrialization:${variationId}`] = recipeDataFactory(variationId, modifiedData)

        registrationCallback(variationId, modifiedData)

    })
}
