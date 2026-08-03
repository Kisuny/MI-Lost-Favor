//priority: 100

global.PLACER_BLOCK_TO_ITEM_NAME_MAP = global.PLACER_BLOCK_TO_ITEM_NAME_MAP || {}
global.EMPTY_BOX_BLOCK_TO_ITEM_NAME_MAP = global.EMPTY_BOX_BLOCK_TO_ITEM_NAME_MAP || {}

const enabledProperty = $BooleanProperty.create("enabled")
const activeMachineShapeProperty = $IntegerProperty.create("machine_shape", 0, 5)
const previewOffsetProperty = $IntegerProperty.create("preview_offset", 0, 5)

global.PLACER_ENABLED_PROPERTY = enabledProperty
global.PLACER_ACTIVE_MACHINE_SHAPE_PROPERTY = activeMachineShapeProperty
global.PLACER_PREVIEW_OFFSET_PROPERTY = previewOffsetProperty

function registerPlacer(id, mod, args){

    let PLACER_LANG = {
        en_us: "Placer",
        ru_ru: "Установщик"
    }

    let EMPTY_BOX_LANG = {
        en_us: "Empty Box",
        ru_ru: "Пустая коробка"
    }

    args = args || {}

    let nbtFIleName = args.nbtFIleName || id

    let langPrefix = args.langPrefix || {}
    let langSuffix = args.langSuffix || {}

    langPrefix.en_us = langPrefix.en_us || idToName(id)

    let placerLangObject = {}
    let boxLangObject = {}

    Object.entries(langPrefix).forEach(([lang, prefix]) => {
        placerLangObject[lang] = `${prefix} ${PLACER_LANG[lang]}`
        boxLangObject[lang] = `${prefix} ${EMPTY_BOX_LANG[lang]}`
    })

    Object.entries(langSuffix).forEach(([lang, suffix]) => {
        placerLangObject[lang] = `${(placerLangObject[lang] || PLACER_LANG[lang])} ${suffix}`
        boxLangObject[lang] = `${(boxLangObject[lang] || EMPTY_BOX_LANG[lang])} ${suffix}`
    })


    createNewBlock(`${id}_placer`, {
        blockType: "cardinal",
        defaultCutout: true,
        box: [2, 0, 1, 14, 9, 15, true],
        soundType: 'bamboo',
        tagBlock: "milf:placers",
        tag: "milf:placers",
        property: (args.activeMachineShape != undefined ? [enabledProperty, activeMachineShapeProperty, previewOffsetProperty] : [enabledProperty, previewOffsetProperty]),
        defaultState: (args.activeMachineShape != undefined ? { cycle: enabledProperty, setProperty: { property: activeMachineShapeProperty, value: args.activeMachineShape } } : { cycle: enabledProperty } ),
        parentModel: "milf:block/placer_closed",
        lang: placerLangObject
    })
    global.PLACER_BLOCK_TO_ITEM_NAME_MAP[`milf:${id}_placer`] = `${mod}:${nbtFIleName}`
    createNewBlock(`${id}_empty_box`, {
        blockType: "cardinal",
        defaultCutout: true,
        box: [2, 0, 1, 14, 9, 15, true],
        soundType: 'bamboo',
        tagBlock: "milf:empty_box",
        tag: "milf:empty_box",
        property: (args.activeMachineShape != undefined ? [enabledProperty, activeMachineShapeProperty, previewOffsetProperty] : [enabledProperty, previewOffsetProperty]),
        defaultState: (args.activeMachineShape != undefined ? { cycle: enabledProperty, setProperty: { property: activeMachineShapeProperty, value: args.activeMachineShape } } : { cycle: enabledProperty }),
        parentModel: "milf:block/placer_open",
        noDrops: true,
        lang: boxLangObject
    })
    global.EMPTY_BOX_BLOCK_TO_ITEM_NAME_MAP[`milf:${id}_empty_box`] = `${mod}:${nbtFIleName}`

}

//#region immersivepetroleum
registerPlacer("hydrotreater", "immersivepetroleum", {
    langPrefix: { en_us: "High-Pressure Refinery Unit" },
    langSuffix: { ru_ru: "рафинерии высокого давления" }
})

registerPlacer("derrick", "immersivepetroleum", {
    langSuffix: { ru_ru: "буровой вышки" }
})

registerPlacer("oiltank", "immersivepetroleum", {
    langPrefix: { en_us: "Oil Tank" },
    langSuffix: { ru_ru: "нефтяного бака" }
})

registerPlacer("pumpjack", "immersivepetroleum", {
    langSuffix: { ru_ru: "качалки" }
})

registerPlacer("distillationtower", "immersivepetroleum", {
    nbtFIleName: "distillation_tower",
    langPrefix: { en_us: "Distillation Tower" },
    langSuffix: { ru_ru: "дистилляционной башни" }
})

registerPlacer("cokerunit", "immersivepetroleum", {
    nbtFIleName: "coker_unit",
    langPrefix: { en_us: "Coker Unit" },
    langSuffix: { ru_ru: "коксовой установки" }
})

//#endregion

//#region immersiveengineering
registerPlacer("arcfurnace", "immersiveengineering", {
    nbtFIleName: "arc_furnace",
    langPrefix: { en_us: "Arc Furnace" },
    langSuffix: { ru_ru: "дуговой Печи" }
})

registerPlacer("assembler", "immersiveengineering", {
    langSuffix: { ru_ru: "сборщика" }
})

registerPlacer("auto_workbench", "immersiveengineering", {
    langSuffix: { ru_ru: "автоматизированного верстака инженера" }
})

registerPlacer("bottling_machine", "immersiveengineering", {
    langSuffix: { ru_ru: "разливочной машины" }
})

registerPlacer("chunk_loader", "immersiveengineering", {
    langSuffix: { ru_ru: "загрузчика чанков" }
})

registerPlacer("crusher", "immersiveengineering", {
    langSuffix: { ru_ru: "дробителя" }
})

registerPlacer("diesel_generator", "immersiveengineering", {
    langSuffix: { ru_ru: "дизельного генератора" }
})

registerPlacer("excavator_full", "immersiveengineering", {
    nbtFIleName: "excavator",
    langPrefix: { en_us: "Excavator" },
    langSuffix: { ru_ru: "экскаватора" }
})

registerPlacer("fermenter", "immersiveengineering", {
    langSuffix: { ru_ru: "бродильного аппарата" }
})

registerPlacer("lightning_rod", "immersiveengineering", {
    langSuffix: { ru_ru: "молниетвода" }
})

registerPlacer("metal_press", "immersiveengineering", {
    langSuffix: { ru_ru: "металлического пресса" }
})

registerPlacer("mixer", "immersiveengineering", {
    langSuffix: { ru_ru: "смесителя" }
})

registerPlacer("radio_tower", "immersiveengineering", {
    langSuffix: { ru_ru: "радио Вышки" }
})

registerPlacer("refinery", "immersiveengineering", {
    langSuffix: { ru_ru: "очистителя" }
})

registerPlacer("sawmill", "immersiveengineering", {
    langSuffix: { ru_ru: "лесопилки" }
})

registerPlacer("sheetmetal_tank", "immersiveengineering", {
    nbtFIleName: "tank",
    langPrefix: { en_us: "Fluid Tank" },
    langSuffix: { ru_ru: "жидкостного резервуара" }
})

registerPlacer("shelf", "immersiveengineering", {
    langSuffix: { ru_ru: "полки" }
})

registerPlacer("silo", "immersiveengineering", {
    langSuffix: { ru_ru: "бункера" }
})

registerPlacer("squeezer", "immersiveengineering", {
    langSuffix: { ru_ru: "соковыжималки" }
})

//#endregion

//#region modern_industrialization
registerPlacer("advanced_large_steam_boiler", "modern_industrialization", {
    langSuffix: { ru_ru: "продвинутого большого парового котла" }
})

registerPlacer("coke_oven", "modern_industrialization", {
    langSuffix: { ru_ru: "коксовой печи" }
})

registerPlacer("electric_blast_furnace_cupronickel", "modern_industrialization", {
    nbtFIleName: "electric_blast_furnace",
    activeMachineShape: 0,
    langSuffix: { ru_ru: "электрической доменной печи (купроникель)" }
})

registerPlacer("electric_blast_furnace_kanthal", "modern_industrialization", {
    nbtFIleName: "electric_blast_furnace",
    activeMachineShape: 1,
    langSuffix: { ru_ru: "электрической доменной печи (кантал)" }
})

registerPlacer("electric_quarry", "modern_industrialization", {
    langSuffix: { ru_ru: "электрического карьера" }
})

registerPlacer("fusion_reactor", "modern_industrialization", {
    langSuffix: { ru_ru: "термоядерного реактора" }
})
registerPlacer("heat_exchanger", "modern_industrialization", {
    langSuffix: { ru_ru: "теплообменника" }
})

registerPlacer("high_pressure_advanced_large_steam_boiler", "modern_industrialization", {
    langSuffix: { ru_ru: "продвинутого большого парового котла высокого давления" }
})

registerPlacer("high_pressure_large_steam_boiler", "modern_industrialization", {
    langSuffix: { ru_ru: "большого парового котла высокого давления" }
})

registerPlacer("implosion_compressor", "modern_industrialization", {
    langSuffix: { ru_ru: "взрывного компрессора" }
})

registerPlacer("large_diesel_generator", "modern_industrialization", {
    langSuffix: { ru_ru: "большого дизельного генератора" }
})

registerPlacer("large_steam_boiler", "modern_industrialization", {
    langSuffix: { ru_ru: "большого парового котла" }
})

registerPlacer("nuclear_reactor_extreme", "modern_industrialization", {
    nbtFIleName: "nuclear_reactor",
    activeMachineShape: 3,
    langPrefix: { en_us: "Nuclear Reactor Extreme" },
    langSuffix: { ru_ru: "ядерного реактора (экстремальный)" }
})

registerPlacer("nuclear_reactor_large", "modern_industrialization", {
    nbtFIleName: "nuclear_reactor",
    activeMachineShape: 2,
    langPrefix: { en_us: "Nuclear Reactor Large" },
    langSuffix: { ru_ru: "ядерного реактора (большой)" }
})

registerPlacer("nuclear_reactor_medium", "modern_industrialization", {
    nbtFIleName: "nuclear_reactor",
    activeMachineShape: 1,
    langPrefix: { en_us: "Nuclear Reactor Medium" },
    langSuffix: { ru_ru: "ядерного реактора (средний)" }
})

registerPlacer("nuclear_reactor_small", "modern_industrialization", {
    nbtFIleName: "nuclear_reactor",
    activeMachineShape: 0,
    langPrefix: { en_us: "Nuclear Reactor Small" },
    langSuffix: { ru_ru: "ядерного реактора (малый)" }
})

registerPlacer("oil_drilling_rig", "modern_industrialization", {
    langSuffix: { ru_ru: "буровой нефтяной установки" }
})

registerPlacer("plasma_turbine", "modern_industrialization", {
    langSuffix: { ru_ru: "плазменной турбины" }
})

registerPlacer("pressurizer", "modern_industrialization", {
    langSuffix: { ru_ru: "нагнетателя давления" }
})

registerPlacer("steam_blast_furnace", "modern_industrialization", {
    langSuffix: { ru_ru: "паровой доменной печи" }
})

registerPlacer("steam_quarry", "modern_industrialization", {
    langSuffix: { ru_ru: "парового карьера" }
})

registerPlacer("vacuum_freezer", "modern_industrialization", {
    langSuffix: { ru_ru: "вакуумного морозильника" }
})

registerPlacer("enigma_machine", "modern_industrialization", {
    langSuffix: { ru_ru: "машины Энигма" }
})

registerPlacer("radio_transcriber", "modern_industrialization", {
    langSuffix: { ru_ru: "радиотранскрибера" }
})

registerPlacer("steam_cracker", "modern_industrialization", {
    langSuffix: { ru_ru: "парового крекера" }
})

registerPlacer("desalter", "modern_industrialization", {
    langSuffix: { ru_ru: "опреснителя" }
})

//#endregion

//#region mi_tweaks
registerPlacer("advanced_steam_blast_furnace", "mi_tweaks", {
    langSuffix: { ru_ru: "улучшенной паровой доменной печи" }
})

registerPlacer("advanced_steam_alloy_smelter", "mi_tweaks", {
    langSuffix: { ru_ru: "улучшенной паровой плавильни сплавов" }
})

registerPlacer("machine_assembler", "mi_tweaks", {
    activeMachineShape: 0,
    langPrefix: { en_us: "Basic Machine Assembler" }
})

registerPlacer("machine_assembler_shape_1", "mi_tweaks", {
    nbtFIleName: "machine_assembler",
    activeMachineShape: 1,
    langPrefix: { en_us: "Advanced Machine Assembler" }
})

registerPlacer("advanced_large_steam_furnace", "mi_tweaks", {
    langSuffix: { ru_ru: "улучшенной большой паровой печи" }
})

registerPlacer("multiblock_packer_3000_safety_regulations_edition", "mi_tweaks", {
    langPrefix: { en_us: "Multiblock Packer 3000" },
    langSuffix: { ru_ru: "мультиблочного упаковщика 3000" }
})

//#region extended_industrialization
registerPlacer("large_electric_macerator", "extended_industrialization", {
    langSuffix: { ru_ru: "большого электрического дробителя" }
})

registerPlacer("large_steam_macerator", "extended_industrialization", {
    langSuffix: { ru_ru: "большого парового дробителя" }
})

registerPlacer("tesla_tower", "extended_industrialization", {
    activeMachineShape: 0,
    langPrefix: { en_us: "Copper Tesla Tower" },
    langSuffix: { ru_ru: "медной башни Тесла" }
})

registerPlacer("tesla_tower_shape_1", "extended_industrialization", {
    nbtFIleName: "tesla_tower",
    activeMachineShape: 1,
    langPrefix: { en_us: "Electrum Tesla Tower" },
    langSuffix: { ru_ru: "электрумовой башни Тесла" }
})

registerPlacer("tesla_tower_shape_2", "extended_industrialization", {
    nbtFIleName: "tesla_tower",
    activeMachineShape: 2,
    langPrefix: { en_us: "Aluminum Tesla Tower" },
    langSuffix: { ru_ru: "алюминиевой башни Тесла" }
})

registerPlacer("tesla_tower_shape_3", "extended_industrialization", {
    nbtFIleName: "tesla_tower",
    activeMachineShape: 3,
    langPrefix: { en_us: "Annealed Copper Tesla Tower" },
    langSuffix: { ru_ru: "башни Тесла из отожжённой меди" }
})

registerPlacer("tesla_tower_shape_4", "extended_industrialization", {
    nbtFIleName: "tesla_tower",
    activeMachineShape: 4,
    langPrefix: { en_us: "Superconductor Tesla Tower" },
    langSuffix: { ru_ru: "сверхпроводящей башни Тесла" }
})

//#endregion

//#region yet_another_industrialization
registerPlacer("dragon_egg_energy_siphon", "yet_another_industrialization", {
    langSuffix: { ru_ru: "сифона энергии яйца дракона" }
})

registerPlacer("pulse_detonation_generator", "yet_another_industrialization", {
    langSuffix: { ru_ru: "импульсного детонационного генератора" }
})

registerPlacer("arboreous_greenhouse", "yet_another_industrialization", {
    activeMachineShape: 0,
    langPrefix: { en_us: "Arboreous Greenhouse Grass Type" },
    langSuffix: { ru_ru: "древесной теплицы (трава)" }
})

registerPlacer("arboreous_greenhouse_shape_1", "yet_another_industrialization", {
    nbtFIleName: "arboreous_greenhouse",
    activeMachineShape: 1,
    langPrefix: { en_us: "Arboreous Greenhouse Sand Type" },
    langSuffix: { ru_ru: "древесной теплицы (песок)" }
})

registerPlacer("arboreous_greenhouse_shape_2", "yet_another_industrialization", {
    nbtFIleName: "arboreous_greenhouse",
    activeMachineShape: 2,
    langPrefix: { en_us: "Arboreous Greenhouse Netherrack Type" },
    langSuffix: { ru_ru: "древесной теплицы (незерак)" }
})

registerPlacer("arboreous_greenhouse_shape_3", "yet_another_industrialization", {
    nbtFIleName: "arboreous_greenhouse",
    activeMachineShape: 3,
    langPrefix: { en_us: "Arboreous Greenhouse End Stone Type" },
    langSuffix: { ru_ru: "древесной теплицы (камень Края)" }
})

registerPlacer("large_storage_unit", "yet_another_industrialization", {
    activeMachineShape: 0,
    langPrefix: { en_us: "Large Storage Unit LV" },
    langSuffix: { ru_ru: "большого блока хранения LV" }
})

registerPlacer("large_storage_unit_shape_1", "yet_another_industrialization", {
    nbtFIleName: "large_storage_unit",
    activeMachineShape: 1,
    langPrefix: { en_us: "Large Storage Unit MV" },
    langSuffix: { ru_ru: "большого блока хранения MV" }
})

registerPlacer("large_storage_unit_shape_2", "yet_another_industrialization", {
    nbtFIleName: "large_storage_unit",
    activeMachineShape: 2,
    langPrefix: { en_us: "Large Storage Unit HV" },
    langSuffix: { ru_ru: "большого блока хранения HV" }
})

registerPlacer("large_storage_unit_shape_3", "yet_another_industrialization", {
    nbtFIleName: "large_storage_unit",
    activeMachineShape: 3,
    langPrefix: { en_us: "Large Storage Unit EV" },
    langSuffix: { ru_ru: "большого блока хранения EV" }
})

registerPlacer("large_storage_unit_shape_4", "yet_another_industrialization", {
    nbtFIleName: "large_storage_unit",
    activeMachineShape: 4,
    langPrefix: { en_us: "Large Storage Unit SV" },
    langSuffix: { ru_ru: "большого блока хранения SV" }
})

registerPlacer("large_storage_unit_shape_5", "yet_another_industrialization", {
    nbtFIleName: "large_storage_unit",
    activeMachineShape: 5,
    langPrefix: { en_us: "Large Storage Unit Ultimate" },
    langSuffix: { ru_ru: "большого блока хранения (предельный)" }
})

//#endregion