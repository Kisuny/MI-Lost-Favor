//priority: 100
const en_usPlacer = "Placer"
const en_usEmptyBox = "Empty Box"
const ru_ruPlacer = "Установщик"
const ru_ruEmptyBox = "Пустая коробка"

/**
 * @typedef {Object} MultiblockEntry
 * @property {string | string[]} name - The id of the multiblock or [NBT_file_name, id]
 * @property {Object.<string, string>} langPlacers - Lang placer name. 
 * @property {Object.<string, string>} langBoxes - Lang empty box name.
 * @property {string} mod - The mod id
 * @property {number} [activeMachineShape] - Shape index for tiered MI machines
 */

/** @type {MultiblockEntry[]} */
const multiblocksForPlacers = [
    //#region immersivepetroleum
    {
        name:"hydrotreater",
        langPlacers: { "en_us": `High-Pressure Refinery Unit ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} рафинерии высокого давления`},
        langBoxes: { "en_us": `High-Pressure Refinery Unit ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} рафинерии высокого давления`},
        mod:"immersivepetroleum"
    },
    {
        name:"derrick",
        langPlacers: { "en_us": `Derrick ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} буровой вышки`},
        langBoxes: { "en_us": `Derrick ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} буровой вышки`},
        mod:"immersivepetroleum"
    },
    {
        name:"oiltank",
        langPlacers: { "en_us": `Oil Tank ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} нефтяного бака`},
        langBoxes: { "en_us": `Oil Tank ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} нефтяного бака`},
        mod:"immersivepetroleum"
    },
    {
        name:"pumpjack",
        langPlacers: { "en_us": `Pumpjack ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} качалки`},
        langBoxes: { "en_us": `Pumpjack ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} качалки`},
        mod:"immersivepetroleum"
    },
    {
        name:["distillationtower","distillation_tower"],
        langPlacers: { "en_us": `Distillation Tower ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} дистилляционной башни`},
        langBoxes: { "en_us": `Distillation Tower ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} дистилляционной башни`},
        mod:"immersivepetroleum"
    },
    {
        name:["cokerunit","coker_unit"],
        langPlacers: { "en_us": `Coker Unit ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} коксовой установки`},
        langBoxes: { "en_us": `Coker Unit ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} коксовой установки`},
        mod:"immersivepetroleum"
    },
    //#endregion

    //#region immersiveengineering

    //{name: 'alloy_smelter', langPlacers: {"en_us": `Alloy Smelter ${en_usPlacer}`}, langBoxes: {"en_us": `Alloy Smelter ${en_usEmptyBox}`}},
    {
        name: ['arcfurnace', 'arc_furnace'],
        langPlacers: {"en_us": `Arc Furnace ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} дуговой Печи`},
        langBoxes: {"en_us": `Arc Furnace ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} дуговой Печи`},
        mod:"immersiveengineering"
    },
    {
        name: 'assembler',
        langPlacers: { "en_us": `Assembler ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} сборщика` },
        langBoxes: { "en_us": `Assembler ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} сборщика` },
        mod:"immersiveengineering"
    },
    {
        name: 'auto_workbench',
        langPlacers: { "en_us": `Auto Workbench ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} автоматизированного верстака инженера` },
        langBoxes: { "en_us": `Auto Workbench ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} автоматизированного верстака инженера` },
        mod:"immersiveengineering"
    },
    //{name: 'blast_furnace', langPlacers: {"en_us": `Blast Furnace ${en_usPlacer}`}, langBoxes: {"en_us": `Blast Furnace ${en_usEmptyBox}`}},
    {
        name: 'bottling_machine',
        langPlacers: { "en_us": `Bottling Machine ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} разливочной машины` },
        langBoxes: { "en_us": `Bottling Machine ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} разливочной машины` },
        mod:"immersiveengineering"
    },
    {
        name: 'chunk_loader',
        langPlacers: { "en_us": `Chunk Loader ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} загрузчика чанков` },
        langBoxes: { "en_us": `Chunk Loader ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} загрузчика чанков` },
        mod:"immersiveengineering"
    },
    //{name: 'coke_oven', langPlacers: {"en_us": `Coke Oven ${en_usPlacer}`}, langBoxes: {"en_us": `Coke Oven ${en_usEmptyBox}`}},
    {
        name: 'crusher',
        langPlacers: { "en_us": `Crusher ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} дробителя` },
        langBoxes: { "en_us": `Crusher ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} дробителя` },
        mod:"immersiveengineering"
    },
    {
        name: 'diesel_generator',
        langPlacers: { "en_us": `Diesel Generator ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} дизельного генератора` },
        langBoxes: { "en_us": `Diesel Generator ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} дизельного генератора` },
        mod:"immersiveengineering"
    },
    {
        name: ['excavator_full', 'excavator'],
        langPlacers: { "en_us": `Excavator ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} экскаватора` },
        langBoxes: { "en_us": `Excavator ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} экскаватора` },
        mod:"immersiveengineering"
    },
    {
        name: 'fermenter',
        langPlacers: { "en_us": `Fermenter ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} бродильного аппарата` },
        langBoxes: { "en_us": `Fermenter ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} бродильного аппарата` },
        mod:"immersiveengineering"
    },
    //{name: 'improved_blast_furnace', langPlacers: {"en_us": `Improved Blast Furnace ${en_usPlacer}`}, langBoxes: {"en_us": `Improved Blast Furnace ${en_usEmptyBox}`}},
    {
        name: 'lightning_rod',
        langPlacers: { "en_us": `Lightning Rod ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} молниетвода` },
        langBoxes: { "en_us": `Lightning Rod ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} молниетвода` },
        mod:"immersiveengineering"
    },
    {
        name: 'metal_press',
        langPlacers: { "en_us": `Metal Press ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} металлического пресса` },
        langBoxes: { "en_us": `Metal Press ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} металлического пресса` },
        mod:"immersiveengineering"
    },
    {
        name: 'mixer',
        langPlacers: { "en_us": `Mixer ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} смесителя` },
        langBoxes: { "en_us": `Mixer ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} смесителя` },
        mod:"immersiveengineering"
    },
    {
        name: 'radio_tower',
        langPlacers: { "en_us": `Radio Tower ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} радио Вышки` },
        langBoxes: { "en_us": `Radio Tower ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} радио Вышки` },
        mod:"immersiveengineering"
    },
    {
        name: 'refinery',
        langPlacers: { "en_us": `Refinery ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} очистителя` },
        langBoxes: { "en_us": `Refinery ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} очистителя` },
        mod:"immersiveengineering"
    },
    {
        name: 'sawmill',
        langPlacers: { "en_us": `Sawmill ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} лесопилки` },
        langBoxes: { "en_us": `Sawmill ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} лесопилки` },
        mod:"immersiveengineering"
    },
    {
        name: ['sheetmetal_tank', 'tank'],
        langPlacers: { "en_us": `Fluid Tank ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} жидкостного резервуара` },
        langBoxes: { "en_us": `Fluid Tank ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} жидкостного резервуара` },
        mod:"immersiveengineering"
    },
    {
        name: 'shelf',
        langPlacers: { "en_us": `Shelf ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} полки` },
        langBoxes: { "en_us": `Shelf ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} полки` },
        mod:"immersiveengineering"
    },
    {
        name: 'silo',
        langPlacers: { "en_us": `Silo ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} бункера` },
        langBoxes: { "en_us": `Silo ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} бункера` },
        mod:"immersiveengineering"
    },
    {
        name: 'squeezer',
        langPlacers: { "en_us": `Squeezer ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} соковыжималки` },
        langBoxes: { "en_us": `Squeezer ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} соковыжималки` },
        mod:"immersiveengineering"
    },
    //#endregion

    //#region modern_industrialization
    {
        name: ['advanced_large_steam_boiler', 'advanced_large_steam_boiler'],
        langPlacers: {"en_us": `Advanced Large Steam Boiler ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} продвинутого большого парового котла`},
        langBoxes: {"en_us": `Advanced Large Steam Boiler ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} продвинутого большого парового котла`},
        mod:"modern_industrialization"
    },
    {
        name: ['coke_oven', 'coke_oven'],
        langPlacers: {"en_us": `Coke Oven ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} коксовой печи`},
        langBoxes: {"en_us": `Coke Oven ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} коксовой печи`},
        mod:"modern_industrialization"
    },
    // {
    //     name: ['distillation_tower', 'distillation_tower'],
    //     langPlacers: {"en_us": `Distillation Tower ${en_usPlacer}`},
    //     langBoxes: {"en_us": `Distillation Tower ${en_usEmptyBox}`},
    //     mod:"modern_industrialization"
    // },
    {
        name: ['electric_blast_furnace_cupronickel', 'electric_blast_furnace'],
        langPlacers: {"en_us": `Electric Blast Furnace Cupronickel ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} электрической доменной печи (купроникель)`},
        langBoxes: {"en_us": `Electric Blast Furnace Cupronickel ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} электрической доменной печи (купроникель)`},
        mod:"modern_industrialization",
        activeMachineShape:0
    },
    {
        name: ['electric_blast_furnace_kanthal', 'electric_blast_furnace'],
        langPlacers: {"en_us": `Electric Blast Furnace Kanthal ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} электрической доменной печи (кантал)`},
        langBoxes: {"en_us": `Electric Blast Furnace Kanthal ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} электрической доменной печи (кантал)`},
        mod:"modern_industrialization",
        activeMachineShape:1
    },
    {
        name: ['electric_quarry', 'electric_quarry'],
        langPlacers: {"en_us": `Electric Quarry ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} электрического карьера`},
        langBoxes: {"en_us": `Electric Quarry ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} электрического карьера`},
        mod:"modern_industrialization"
    },
    {
        name: ['fusion_reactor', 'fusion_reactor'],
        langPlacers: {"en_us": `Fusion Reactor ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} термоядерного реактора`},
        langBoxes: {"en_us": `Fusion Reactor ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} термоядерного реактора`},
        mod:"modern_industrialization"
    },
    {
        name: ['heat_exchanger', 'heat_exchanger'],
        langPlacers: {"en_us": `Heat Exchanger ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} теплообменника`},
        langBoxes: {"en_us": `Heat Exchanger ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} теплообменника`},
        mod:"modern_industrialization"
    },
    {
        name: ['high_pressure_advanced_large_steam_boiler', 'high_pressure_advanced_large_steam_boiler'],
        langPlacers: {"en_us": `High Pressure Advanced Large Steam Boiler ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} продвинутого большого парового котла высокого давления`},
        langBoxes: {"en_us": `High Pressure Advanced Large Steam Boiler ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} продвинутого большого парового котла высокого давления`},
        mod:"modern_industrialization"
    },
    {
        name: ['high_pressure_large_steam_boiler', 'high_pressure_large_steam_boiler'],
        langPlacers: {"en_us": `High Pressure Large Steam Boiler ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого парового котла высокого давления`},
        langBoxes: {"en_us": `High Pressure Large Steam Boiler ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого парового котла высокого давления`},
        mod:"modern_industrialization"
    },
    {
        name: ['implosion_compressor', 'implosion_compressor'],
        langPlacers: {"en_us": `Implosion Compressor ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} взрывного компрессора`},
        langBoxes: {"en_us": `Implosion Compressor ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} взрывного компрессора`},
        mod:"modern_industrialization"
    },
    {
        name: ['large_diesel_generator', 'large_diesel_generator'],
        langPlacers: {"en_us": `Large Diesel Generator ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого дизельного генератора`},
        langBoxes: {"en_us": `Large Diesel Generator ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого дизельного генератора`},
        mod:"modern_industrialization"
    },
    {
        name: ['large_steam_boiler', 'large_steam_boiler'],
        langPlacers: {"en_us": `Large Steam Boiler ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого парового котла`},
        langBoxes: {"en_us": `Large Steam Boiler ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого парового котла`},
        mod:"modern_industrialization"
    },
    {
        name: ['nuclear_reactor_extreme', 'nuclear_reactor'],
        langPlacers: {"en_us": `Nuclear Reactor Extreme ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} ядерного реактора (экстремальный)`},
        langBoxes: {"en_us": `Nuclear Reactor Extreme ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} ядерного реактора (экстремальный)`},
        mod:"modern_industrialization",
        activeMachineShape:3
    },
    {
        name: ['nuclear_reactor_large', 'nuclear_reactor'],
        langPlacers: {"en_us": `Nuclear Reactor Large ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} ядерного реактора (большой)`},
        langBoxes: {"en_us": `Nuclear Reactor Large ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} ядерного реактора (большой)`},
        mod:"modern_industrialization",
        activeMachineShape:2
    },
    {
        name: ['nuclear_reactor_medium', 'nuclear_reactor'],
        langPlacers: {"en_us": `Nuclear Reactor Medium ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} ядерного реактора (средний)`},
        langBoxes: {"en_us": `Nuclear Reactor Medium ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} ядерного реактора (средний)`},
        mod:"modern_industrialization",
        activeMachineShape:1
    },
    {
        name: ['nuclear_reactor_small', 'nuclear_reactor'],
        langPlacers: {"en_us": `Nuclear Reactor Small ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} ядерного реактора (малый)`},
        langBoxes: {"en_us": `Nuclear Reactor Small ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} ядерного реактора (малый)`},
        mod:"modern_industrialization",
        activeMachineShape:0
    },
    {
        name: ['oil_drilling_rig', 'oil_drilling_rig'],
        langPlacers: {"en_us": `Oil Drilling Rig ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} буровой нефтяной установки`},
        langBoxes: {"en_us": `Oil Drilling Rig ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} буровой нефтяной установки`},
        mod:"modern_industrialization"
    },
    {
        name: ['plasma_turbine', 'plasma_turbine'],
        langPlacers: {"en_us": `Plasma Turbine ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} плазменной турбины`},
        langBoxes: {"en_us": `Plasma Turbine ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} плазменной турбины`},
        mod:"modern_industrialization"
    },
    {
        name: ['pressurizer', 'pressurizer'],
        langPlacers: {"en_us": `Pressurizer ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} нагнетателя давления`},
        langBoxes: {"en_us": `Pressurizer ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} нагнетателя давления`},
        mod:"modern_industrialization"
    },
    {
        name: ['steam_blast_furnace', 'steam_blast_furnace'],
        langPlacers: {"en_us": `Steam Blast Furnace ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} паровой доменной печи`},
        langBoxes: {"en_us": `Steam Blast Furnace ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} паровой доменной печи`},
        mod:"modern_industrialization"
    },
    {
        name: ['steam_quarry', 'steam_quarry'],
        langPlacers: {"en_us": `Steam Quarry ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} парового карьера`},
        langBoxes: {"en_us": `Steam Quarry ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} парового карьера`},
        mod:"modern_industrialization"
    },
    {
        name: ['vacuum_freezer', 'vacuum_freezer'],
        langPlacers: {"en_us": `Vacuum Freezer ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} вакуумного морозильника`},
        langBoxes: {"en_us": `Vacuum Freezer ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} вакуумного морозильника`},
        mod:"modern_industrialization"
    },
    //#custom stuff
    {
        name: ['enigma_machine', 'enigma_machine'],
        langPlacers: {"en_us": `Enigma Machine ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} машины Энигма`},
        langBoxes: {"en_us": `Enigma Machine ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} машины Энигма`},
        mod:"modern_industrialization"
    },
    {
        name: ['radio_transcriber', 'radio_transcriber'],
        langPlacers: {"en_us": `Radio Transcriber ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} радиотранскрибера`},
        langBoxes: {"en_us": `Radio Transcriber ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} радиотранскрибера`},
        mod:"modern_industrialization"
    },
    {
        name: ['steam_cracker', 'steam_cracker'],
        langPlacers: {"en_us": `Steam Cracker ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} парового крекера`},
        langBoxes: {"en_us": `Steam Cracker ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} парового крекера`},
        mod:"modern_industrialization"
    },
    {
        name: ['desalter', 'desalter'],
        langPlacers: {"en_us": `Desalter ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} опреснителя`},
        langBoxes: {"en_us": `Desalter ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} опреснителя`},
        mod:"modern_industrialization"
    },
    {
        name: ['machine_assembler', 'machine_assembler'],
        langPlacers: { "en_us": `Machine Assembler ${en_usPlacer}` },
        langBoxes: { "en_us": `Machine Assembler ${en_usEmptyBox}` },
        mod: "modern_industrialization"
    },
    //#endregion

    //#region mi_tweaks
    {
        name:"advanced_steam_blast_furnace",
        langPlacers: { "en_us": `Advanced Steam Blast Furnace ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} улучшенной паровой доменной печи`},
        langBoxes: { "en_us": `Advanced Steam Blast Furnace ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} улучшенной паровой доменной печи`},
        mod:"mi_tweaks"
    },
    {
        name:"advanced_steam_alloy_smelter",
        langPlacers: { "en_us": `Advanced Steam Alloy Smelter ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} улучшенной паровой плавильни сплавов`},
        langBoxes: { "en_us": `Advanced Steam Alloy Smelter ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} улучшенной паровой плавильни сплавов`},
        mod:"mi_tweaks"
    },
    // {
    //     name:"bioactive_chamber",
    //     langPlacers: { "en_us": `Bioactive Chamber ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} биоактивной камеры`},
    //     langBoxes: { "en_us": `Bioactive Chamber ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} биоактивной камеры`},
    //     mod:"mi_tweaks",
    //     activeMachineShape: 0
    // },
    // {
    //     name:["bioactive_chamber_shape_1", "bioactive_chamber"],
    //     langPlacers: { "en_us": `Bioactive Chamber T2 ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} биоактивной камеры T2`},
    //     langBoxes: { "en_us": `Bioactive Chamber T2 ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} биоактивной камеры T2`},
    //     mod:"mi_tweaks",
    //     activeMachineShape: 1
    // },
    // {
    //     name:["bioactive_chamber_shape_2", "bioactive_chamber"],
    //     langPlacers: { "en_us": `Bioactive Chamber T3 ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} биоактивной камеры T3`},
    //     langBoxes: { "en_us": `Bioactive Chamber T3 ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} биоактивной камеры T3`},
    //     mod:"mi_tweaks",
    //     activeMachineShape: 2
    // },
    {
        name:"advanced_large_steam_furnace",
        langPlacers: { "en_us": `Advanced Large Steam Furnace ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} улучшенной большой паровой печи`},
        langBoxes: { "en_us": `Advanced Large Steam Furnace ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} улучшенной большой паровой печи`},
        mod:"mi_tweaks"
    },
    {
        name:"multiblock_packer_3000_safety_regulations_edition",
        langPlacers: { "en_us": `Multiblock Packer 3000 ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} мультиблочного упаковщика 3000`},
        langBoxes: { "en_us": `Multiblock Packer 3000 ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} мультиблочного упаковщика 3000`},
        mod:"mi_tweaks"
    },
    //#endregion

    //#region extended_industrialization
    {
        name:"large_electric_macerator",
        langPlacers: { "en_us": `Large Electric Macerator ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого электрического дробителя`},
        langBoxes: { "en_us": `Large Electric Macerator ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого электрического дробителя`},
        mod:"extended_industrialization"
    },
    {
        name:"large_steam_macerator",
        langPlacers: { "en_us": `Large Steam Macerator ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого парового дробителя`},
        langBoxes: { "en_us": `Large Steam Macerator ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого парового дробителя`},
        mod:"extended_industrialization"
    },

    {
        name:"tesla_tower",
        langPlacers: { "en_us": `Copper Tesla Tower ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} медной башни Тесла`},
        langBoxes: { "en_us": `Copper Tesla Tower ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} медной башни Тесла`},
        mod:"extended_industrialization",
        activeMachineShape: 0
    },
    {
        name:["tesla_tower_shape_1", "tesla_tower"],
        langPlacers: { "en_us": `Electrum Tesla Tower ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} электрумовой башни Тесла`},
        langBoxes: { "en_us": `Electrum Tesla Tower ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} электрумовой башни Тесла`},
        mod:"extended_industrialization",
        activeMachineShape: 1
    },
    {
        name:["tesla_tower_shape_2", "tesla_tower"],
        langPlacers: { "en_us": `Aluminum Tesla Tower ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} алюминиевой башни Тесла`},
        langBoxes: { "en_us": `Aluminum Tesla Tower ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} алюминиевой башни Тесла`},
        mod:"extended_industrialization",
        activeMachineShape: 2
    },
    {
        name:["tesla_tower_shape_3", "tesla_tower"],
        langPlacers: { "en_us": `Annealed Copper Tesla Tower ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} башни Тесла из отожжённой меди`},
        langBoxes: { "en_us": `Annealed Copper Tesla Tower ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} башни Тесла из отожжённой меди`},
        mod:"extended_industrialization",
        activeMachineShape: 3
    },
    {
        name:["tesla_tower_shape_4", "tesla_tower"],
        langPlacers: { "en_us": `Superconductor Tesla Tower ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} сверхпроводящей башни Тесла`},
        langBoxes: { "en_us": `Superconductor Tesla Tower ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} сверхпроводящей башни Тесла`},
        mod:"extended_industrialization",
        activeMachineShape: 4
    },
    
    //#endregion
    
    //#region yet_another_industrialization
    {
        name:"dragon_egg_energy_siphon",
        langPlacers: { "en_us": `Dragon Egg Energy Siphon ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} сифона энергии яйца дракона`},
        langBoxes: { "en_us": `Dragon Egg Energy Siphon ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} сифона энергии яйца дракона`},
        mod:"yet_another_industrialization"
    },
    {
        name:"pulse_detonation_generator",
        langPlacers: { "en_us": `Pulse Detonation Generator ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} импульсного детонационного генератора`},
        langBoxes: { "en_us": `Pulse Detonation Generator ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} импульсного детонационного генератора`},
        mod:"yet_another_industrialization"
    },

    {
        name:"arboreous_greenhouse",
        langPlacers: { "en_us": `Arboreous Greenhouse Grass Type ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} древесной теплицы (трава)`},
        langBoxes: { "en_us": `Arboreous Greenhouse Grass Type ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} древесной теплицы (трава)`},
        mod:"yet_another_industrialization",
        activeMachineShape: 0
    },
    {
        name:["arboreous_greenhouse_shape_1", 'arboreous_greenhouse'],
        langPlacers: { "en_us": `Arboreous Greenhouse Sand Type ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} древесной теплицы (песок)`},
        langBoxes: { "en_us": `Arboreous Greenhouse Sand Type ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} древесной теплицы (песок)`},
        mod:"yet_another_industrialization",
        activeMachineShape: 1
    },
    {
        name:["arboreous_greenhouse_shape_2", 'arboreous_greenhouse'],
        langPlacers: { "en_us": `Arboreous Greenhouse Netherrack Type ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} древесной теплицы (незерак)`},
        langBoxes: { "en_us": `Arboreous Greenhouse Netherrack Type ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} древесной теплицы (незерак)`},
        mod:"yet_another_industrialization",
        activeMachineShape: 2
    },
    {
        name:["arboreous_greenhouse_shape_3", 'arboreous_greenhouse'],
        langPlacers: { "en_us": `Arboreous Greenhouse End Stone Type ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} древесной теплицы (камень Края)`},
        langBoxes: { "en_us": `Arboreous Greenhouse End Stone Type ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} древесной теплицы (камень Края)`},
        mod:"yet_another_industrialization",
        activeMachineShape: 3
    },

    {
        name:"large_storage_unit",
        langPlacers: { "en_us": `Large Storage Unit LV ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого блока хранения LV`},
        langBoxes: { "en_us": `Large Storage Unit LV ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого блока хранения LV`},
        mod:"yet_another_industrialization",
        activeMachineShape: 0
    },
    {
        name:["large_storage_unit_shape_1", 'large_storage_unit'],
        langPlacers: { "en_us": `Large Storage Unit MV ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого блока хранения MV`},
        langBoxes: { "en_us": `Large Storage Unit MV ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого блока хранения MV`},
        mod:"yet_another_industrialization",
        activeMachineShape: 1
    },
    {
        name:["large_storage_unit_shape_2", 'large_storage_unit'],
        langPlacers: { "en_us": `Large Storage Unit HV ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого блока хранения HV`},
        langBoxes: { "en_us": `Large Storage Unit HV ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого блока хранения HV`},
        mod:"yet_another_industrialization",
        activeMachineShape: 2
    },
    {
        name:["large_storage_unit_shape_3", 'large_storage_unit'],
        langPlacers: { "en_us": `Large Storage Unit EV ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого блока хранения EV`},
        langBoxes: { "en_us": `Large Storage Unit EV ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого блока хранения EV`},
        mod:"yet_another_industrialization",
        activeMachineShape: 3
    },
    {
        name:["large_storage_unit_shape_4", 'large_storage_unit'],
        langPlacers: { "en_us": `Large Storage Unit SV ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого блока хранения SV`},
        langBoxes: { "en_us": `Large Storage Unit SV ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого блока хранения SV`},
        mod:"yet_another_industrialization",
        activeMachineShape: 4
    },
    {
        name:["large_storage_unit_shape_5", 'large_storage_unit'],
        langPlacers: { "en_us": `Large Storage Unit Ultimate ${en_usPlacer}`, "ru_ru": `${ru_ruPlacer} большого блока хранения (предельный)`},
        langBoxes: { "en_us": `Large Storage Unit Ultimate ${en_usEmptyBox}`, "ru_ru": `${ru_ruEmptyBox} большого блока хранения (предельный)`},
        mod:"yet_another_industrialization",
        activeMachineShape: 5
    },
    //#endregion
]

const en_usOreSample = "Ore Sample"
const ru_ruOreSample = "Образец руды"
const samplesData = [
    { 
        lang: { "en_us": `Iron ${en_usOreSample}`, "ru_ru": `Железный ${ru_ruOreSample}` }, 
        itemName: "iron", directory: "minecraft", 
        oreData: {
            deepslate: "minecraft:deepslate_iron_ore",
            normal: "minecraft:iron_ore",
            raw: "minecraft:raw_iron"
        },
        oreTier: 0
    },
    { 
        lang: { "en_us": `Gold ${en_usOreSample}`, "ru_ru": `Золотой ${ru_ruOreSample}` }, 
        itemName: "gold", directory: "minecraft", 
        oreData: {
            deepslate: "minecraft:deepslate_gold_ore",
            normal: "minecraft:gold_ore",
            raw: "minecraft:raw_gold"
        },
        oreTier: 1
    },
    { 
        lang: { "en_us": `Diamond ${en_usOreSample}`, "ru_ru": `Алмазный ${ru_ruOreSample}` }, 
        itemName: "diamond", directory: "minecraft", bedrockTexture: "spectrum:block/pure_diamond_block",
        oreData: {
            deepslate: "minecraft:deepslate_diamond_ore",
            normal: "minecraft:diamond_ore",
            raw: "modern_industrialization:diamond_crushed_dust"
        },
        oreTier: 1
    },
    { 
        lang: { "en_us": `Copper ${en_usOreSample}`, "ru_ru": `Медный ${ru_ruOreSample}` }, 
        itemName: "copper", directory: "minecraft",
        oreData: {
            deepslate: "minecraft:deepslate_copper_ore",
            normal: "minecraft:copper_ore",
            raw: "minecraft:raw_copper"
        },
        oreTier: 0
    },
    { 
        lang: { "en_us": `Coal ${en_usOreSample}`, "ru_ru": `Угольный ${ru_ruOreSample}` }, 
        itemName: "coal", directory: "minecraft", bedrockTexture: "minecraft:block/coal_block",
        oreData: {
            deepslate: "minecraft:deepslate_coal_ore",
            normal: "minecraft:coal_ore",
            raw: "modern_industrialization:coal_crushed_dust"
        },
        oreTier: 0
    },
    { 
        lang: { "en_us": `Emerald ${en_usOreSample}`, "ru_ru": `Изумрудный ${ru_ruOreSample}` }, 
        itemName: "emerald", directory: "minecraft", bedrockTexture: "spectrum:block/pure_emerald_block",
        oreData: {
            deepslate: "minecraft:deepslate_emerald_ore",
            normal: "minecraft:emerald_ore",
            raw: "modern_industrialization:emerald_crushed_dust"
        },
        oreTier: 1
    },
    { 
        lang: { "en_us": `Lapis ${en_usOreSample}`, "ru_ru": `Лазуритовый ${ru_ruOreSample}` }, 
        itemName: "lapis", directory: "minecraft", bedrockTexture: "minecraft:block/lapis_block",
        oreData: {
            deepslate: "minecraft:deepslate_lapis_ore",
            normal: "minecraft:lapis_ore",
            raw: "modern_industrialization:lapis_crushed_dust"
        },
        oreTier: 1
    },
    { 
        lang: { "en_us": `Redstone ${en_usOreSample}`, "ru_ru": `Редстоуновый ${ru_ruOreSample}` }, 
        itemName: "redstone", directory: "minecraft", bedrockTexture: "minecraft:block/redstone_block",
        oreData: {
            deepslate: "minecraft:deepslate_redstone_ore",
            normal: "minecraft:redstone_ore",
            raw: "modern_industrialization:redstone_crushed_dust"
        },
        oreTier: 1
    },
    { 
        lang: { "en_us": `Ancient Debris Sample`, "ru_ru": `${ru_ruOreSample} Древних Осколков` }, 
        itemName: "ancient_debris", directory: "minecraft", uniqueBase: "minecraft:block/netherrack", 
        uniqueOre: "minecraft:block/ancient_debris_top", bedrockTexture: "minecraft:block/ancient_debris_top",
        oreData: {
            normal: "minecraft:ancient_debris",
            raw: "minecraft:netherite_scrap"
        },
        oreTier: 3
    },
    { 
        lang: { "en_us": `Nether Quartz ${en_usOreSample}`, "ru_ru": `Кварцевый ${ru_ruOreSample}` }, 
        itemName: "nether_quartz", directory: "minecraft", uniqueBase: "minecraft:block/netherrack", bedrockTexture: "spectrum:block/pure_quartz_block",
        oreData: {
            normal: "minecraft:nether_quartz_ore",
            raw: "modern_industrialization:quartz_crushed_dust"
        },
        oreTier: 2
    },
    { 
        lang: { "en_us": `Nether Gold ${en_usOreSample}`, "ru_ru": `${ru_ruOreSample} Адского Золота` }, 
        itemName: "nether_gold", directory: "minecraft", uniqueBase: "minecraft:block/netherrack", bedrockTexture: "minecraft:block/raw_gold_block",
        oreData: {
            normal: "minecraft:nether_gold_ore",
            raw: "milf:crushed_gold"
        },
        oreTier: 2
    },
    { 
        lang: { "en_us": `Antimony ${en_usOreSample}`, "ru_ru": `${ru_ruOreSample} Сурьмы` }, 
        itemName: "antimony", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_antimony_ore",
            normal: "modern_industrialization:antimony_ore",
            raw: "modern_industrialization:raw_antimony"
        },
        oreTier: 2
    },
    { 
        lang: { "en_us": `Bauxite ${en_usOreSample}`, "ru_ru": `Бокситовый ${ru_ruOreSample}` }, 
        itemName: "bauxite", directory: "modern_industrialization", bedrockTexture: "modern_industrialization:block/bauxite_block",
        oreData: {
            deepslate: "modern_industrialization:deepslate_bauxite_ore",
            normal: "modern_industrialization:bauxite_ore",
            raw: "modern_industrialization:bauxite_crushed_dust"
        },
        oreTier: 2
    },
    { 
        lang: { "en_us": `Iridium ${en_usOreSample}`, "ru_ru": `Иридиевый ${ru_ruOreSample}` }, 
        itemName: "iridium", directory: "modern_industrialization",
        oreData: {
            normal: "modern_industrialization:iridium_ore",
            raw: "modern_industrialization:raw_iridium"
        },
        oreTier: 3
    },
    { 
        lang: { "en_us": `Lead ${en_usOreSample}`, "ru_ru": `Свинцовый ${ru_ruOreSample}` }, 
        itemName: "lead", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_lead_ore",
            normal: "modern_industrialization:lead_ore",
            raw: "modern_industrialization:raw_lead"
        },
        oreTier: 0
    },
    { 
        lang: { "en_us": `Monazite ${en_usOreSample}`, "ru_ru": `Монацитовый ${ru_ruOreSample}` }, 
        itemName: "monazite", directory: "modern_industrialization", bedrockTexture: "modern_industrialization:block/monazite_block",
        oreData: {
            deepslate: "modern_industrialization:deepslate_monazite_ore",
            normal: "modern_industrialization:monazite_ore",
            raw: "modern_industrialization:monazite_crushed_dust"
        },
        oreTier: 3
    },
    {
        lang: { "en_us": `Nickel ${en_usOreSample}`, "ru_ru": `Никельевый ${ru_ruOreSample}` }, 
        itemName: "nickel", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_nickel_ore",
            normal: "modern_industrialization:nickel_ore",
            raw: "modern_industrialization:raw_nickel"
        },
        oreTier: 1
    },
    { 
        lang: { "en_us": `Platinum ${en_usOreSample}`, "ru_ru": `Платиновый ${ru_ruOreSample}` }, 
        itemName: "platinum", directory: "modern_industrialization",
        oreData: {
            normal: "modern_industrialization:platinum_ore",
            raw: "modern_industrialization:raw_platinum"
        },
        oreTier: 3
     },
    { 
        lang: { "en_us": `Salt ${en_usOreSample}`, "ru_ru": `${ru_ruOreSample} Соли` }, 
        itemName: "salt", directory: "modern_industrialization", bedrockTexture: "modern_industrialization:block/salt_block",
        oreData: {
            deepslate: "modern_industrialization:deepslate_salt_ore",
            normal: "modern_industrialization:salt_ore",
            raw: "modern_industrialization:salt_crushed_dust"
        },
        oreTier: 1
    },
    { 
        lang: { "en_us": `Quartz ${en_usOreSample}`, "ru_ru": `Кварцевый ${ru_ruOreSample}` }, 
        itemName: "quartz", directory: "modern_industrialization", bedrockTexture: "spectrum:block/pure_quartz_block",
        oreData: {
            normal: "modern_industrialization:quartz_ore",
            raw: "modern_industrialization:quartz_crushed_dust"
        },
        oreTier: 1
    },
    {
        lang: { "en_us": `Tin ${en_usOreSample}`, "ru_ru": `Оловянный ${ru_ruOreSample}` }, 
        itemName: "tin", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_tin_ore",
            normal: "modern_industrialization:tin_ore",
            raw: "modern_industrialization:raw_tin"
        },
        oreTier: 0
    },
    {
        lang: { "en_us": `Titanium ${en_usOreSample}`, "ru_ru": `Титановый ${ru_ruOreSample}` }, 
        itemName: "titanium", directory: "modern_industrialization",
        oreData: {
            normal: "modern_industrialization:titanium_ore",
            raw: "modern_industrialization:raw_titanium"
        },
        oreTier: 3
    },
    { 
        lang: { "en_us": `Tungsten ${en_usOreSample}`, "ru_ru": `Вольфрамовый ${ru_ruOreSample}` }, 
        itemName: "tungsten", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_tungsten_ore",
            normal: "modern_industrialization:tungsten_ore",
            raw: "modern_industrialization:raw_tungsten"
        },
        oreTier: 3
    },
    { 
        lang: { "en_us": `Uranium ${en_usOreSample}`, "ru_ru": `Урановый ${ru_ruOreSample}` }, 
        itemName: "uranium", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_uranium_ore",
            normal: "modern_industrialization:uranium_ore",
            raw: "modern_industrialization:raw_uranium"
        },
        oreTier: 2
    }
]

global.AnotherDefinitelyUniqueNameForPlacerBlocksThisTime = global.AnotherDefinitelyUniqueNameForPlacerBlocksThisTime || {}
global.AnotherDefinitelyUniqueNameForBoxes = global.AnotherDefinitelyUniqueNameForBoxes || {}

samplesData.forEach(ore => {

    let sampleId = `${ore.itemName}_ore_sample`

    createNewBlock(sampleId, {
        blockType: "cardinal",
        defaultCutout: true,
        box: [2, 0, 2, 14, 5, 14, true],
        soundType: "stone",
        property: BlockProperties.WATERLOGGED,
        tagBlock: 'minecraft:mineable/pickaxe',
        lang: ore.lang
    })

    ore.sampleId = `milf:${sampleId}`

    createNewBlock(`bedrock_${sampleId}`, {
        blockType: "cardinal",
        defaultCutout: true,
        box: [0, 0, 0, 16, 18, 16, true],
        soundType: "amethyst",
        hardness: -1,
        tagBlock: [
            'spectrum:unbreakable', "minecraft:wither_immune", "minecraft:dragon_immune",
            "minecraft:geode_invalid_blocks", "minecraft:blocks_wind_charge_explosions", "minecraft:features_cannot_replace",
            "milf:bedrock_samples",

            "oritech:resource_nodes"
        ],
        tag: "milf:bedrock_ore_samples",
        lang: ore.lang
    })

    ore.bedrockSampleId = `milf:bedrock_${sampleId}`
})

global.oresWithSamples = samplesData

const enabledProperty = $BooleanProperty.create("enabled")
const activeMachineShapeProperty = $IntegerProperty.create("machine_shape", 0, 5)
const previewOffsetProperty = $IntegerProperty.create("preview_offset", 0, 5)

multiblocksForPlacers.forEach(template => {
    const [nameString, itemName] = Array.isArray(template.name) ? [template.name[0], template.name[1]] : [template.name, template.name]
    if(template.activeMachineShape){

    }
    createNewBlock(`${nameString}_placer`, {
        blockType: "cardinal",
        defaultCutout: true,
        box: [2, 0, 1, 14, 9, 15, true],
        soundType: 'bamboo',
        tagBlock: "milf:placers",
        tag: "milf:placers",
        property: (template.activeMachineShape == undefined ? [enabledProperty, previewOffsetProperty] : [enabledProperty, activeMachineShapeProperty, previewOffsetProperty]),
        defaultState: (template.activeMachineShape == undefined ? { cycle: enabledProperty } : { cycle: enabledProperty , setProperty:{property:activeMachineShapeProperty, value:template.activeMachineShape}}),
        parentModel: "milf:block/placer_closed",
        lang: template.langPlacers
    })
    global.AnotherDefinitelyUniqueNameForPlacerBlocksThisTime[`milf:${nameString}_placer`] = `${template.mod}:${itemName}`
    createNewBlock(`${nameString}_empty_box`, {
        blockType: "cardinal",
        defaultCutout: true,
        box: [2, 0, 1, 14, 9, 15, true],
        soundType: 'bamboo',
        tagBlock: "milf:empty_box",
        tag: "milf:empty_box",
        property: (template.activeMachineShape == undefined ? [enabledProperty, previewOffsetProperty] : [enabledProperty, activeMachineShapeProperty, previewOffsetProperty]),
        defaultState: (template.activeMachineShape == undefined ? { cycle: enabledProperty } : { cycle: enabledProperty , setProperty:{property:activeMachineShapeProperty, value:template.activeMachineShape}}),
        parentModel: "milf:block/placer_open",
        noDrops: true,
        lang: template.langBoxes
    })
    global.AnotherDefinitelyUniqueNameForBoxes[`milf:${nameString}_empty_box`] = `${template.mod}:${itemName}`
})

//JSONs shenanigans

// ore_list.forEach(ore => {

//     let modelsJsonPath = `kubejs/assets/milf/models/block/bedrock_${ore.itemName}_ore_sample.json`
//     let modelsJson = {
//         "parent": `milf:block/bedrock_ore_sample`,
//         "textures": {
//             "2": `${ore.directory}:block/raw_${ore.itemName}_block`,
//         }
//     }
//     if (ore.bedrockTexture) { modelsJson.textures["2"] = ore.bedrockTexture }
//     JsonIO.write(modelsJsonPath, modelsJson)

// })


// ore_list.forEach(ore => {
//     const blockstatesJsonPath = `kubejs/assets/milf/blockstates/${ore.itemName}_ore_sample.json`;
//     const blockstatesJson = {"variants": {"": []}}

//     for(let i = 1; i <=6; i++){
//         let modelsJsonPath = `kubejs/assets/milf/models/block/ore_samples/${ore.itemName}_ore_sample_${i}.json`
//         let modelsJson = {
//             "parent": `milf:block/ore_sample_${i}`,
//             "textures": {
//                 "ore": `${ore.directory}:block/${ore.itemName}_ore`,
//             }
//         }
//         if(ore.uniqueBase){modelsJson.textures["0"] = ore.uniqueBase}
//         if(ore.uniqueOre){modelsJson.textures["ore"] = ore.uniqueOre}
//         JsonIO.write(modelsJsonPath, JSON.stringify(modelsJson, null, 2))
//         blockstatesJson.variants[""].push(
//                 {"model": `milf:block/ore_samples/${ore.itemName}_ore_sample_${i}`,"weight":1},
//                 {"model": `milf:block/ore_samples/${ore.itemName}_ore_sample_${i}`, "y": 90,"weight":1},
//                 {"model": `milf:block/ore_samples/${ore.itemName}_ore_sample_${i}`, "y": 180,"weight":1},
//                 {"model": `milf:block/ore_samples/${ore.itemName}_ore_sample_${i}`, "y": 270,"weight":1},
//         )
//     }
//     JsonIO.write(blockstatesJsonPath, JSON.stringify(blockstatesJson, null, 2))
// })

// multiblocksForPlacers.forEach(name => {
//     const [nameString, itemName] = Array.isArray(name.name) ? [name.name[0], name.name[1]] : [name.name, name.name]
//     const emiJsonPath = `milf/assets/emi/recipe/additions/${nameString}_placer.json`;
//     const left = {
//         "type": "item",
//         "id": `milf:${nameString}_placer`,
//         "remainder": `item:milf:${nameString}_empty_box`
//     }
//     const right = {
//         "type": "item",
//         "id": "immersiveengineering:hammer",
//         "chance": 0
//     }
//     const Json = {
//         "type": "emi:world_interaction",
//         "left":left,
//         "right":right,
//         "output": `item:${name.mod}:${itemName}`
//     }
//     JsonIO.write(emiJsonPath, Json)
// }) 
