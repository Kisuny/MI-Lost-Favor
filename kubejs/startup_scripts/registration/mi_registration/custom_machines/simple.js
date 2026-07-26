registerMIMachine('enigma_machine', {
    itemsIn: true, itemsOut: true, casing: 'treated_wood_casing',
    shape: [
        ['           ', '           ', '           ', '           ', '           ', '           '],
        ['    PPP    ', '    SSS    ', '           ', '           ', '           ', '           '],
        ['  PPPPPPP  ', '  MM   MM  ', '           ', '           ', '           ', '           '],
        ['  PPPPPPP  ', '  M     M  ', '           ', '           ', '           ', '           '],
        [' PPPMMMPPP ', ' S  HLH  S ', '    B B    ', '    B B    ', '    BBB    ', '    SMS    '],
        [' PPPMMMPPP ', ' S  LGL  S ', '     G     ', '     G     ', '    BGB    ', '    MMM    '],
        [' PPPMMMPPP ', ' S  H#H  S ', '    B B    ', '    B B    ', '    BBB    ', '    SMS    '],
        ['  PPPPPPP  ', '  M     M  ', '           ', '           ', '           ', '           '],
        ['  PPPPPPP  ', '  MM   MM  ', '           ', '           ', '           ', '           '],
        ['    PPP    ', '    SSS    ', '           ', '           ', '           ', '           '],
        ['           ', '           ', '           ', '           ', '           ', '           '],
    ],
    shapeKeys: {
        M: "immersiveengineering:sheetmetal_steel",
        P: "immersiveengineering:treated_wood_horizontal",
        H: { id: "immersiveengineering:basic_engineering", hatches: MI_HATCHES_ALL },
        S: "immersiveengineering:slab_sheetmetal_steel",
        L: "immersiveengineering:logic_unit",
        B: "xkdeco:hollow_steel_beam",
        G: "ae2:quartz_vibrant_glass"
    },
    pBar: { x: 58, y: 33, name: 'enigma_arrow' },
    itemInputSlots: [[40, 35, 1, 1], [50, 55, 1, 1], [50, 15, 1, 1]],
    itemOutputSlots: [[80, 35, 1, 1]],
    mainCasing: 'treated_wood_casing', mainOverlays: 'enigma_overlays', frontOverlay: true
})

registerMIMachine('radio_transcriber', {
    itemsIn: true, itemsOut: true, casing: 'treated_wood_casing',
    shape: [
        ['           ', '           ', '           ', '           ', '           '],
        ['           ', '           ', '           ', '           ', '           '],
        ['    sss    ', '           ', '           ', '           ', '           '],
        ['   sMHMs   ', '    BOB    ', '    wsw    ', '           ', '           '],
        ['  sM   Ms  ', '   B   B   ', '   w   w   ', '           ', '           '],
        ['  sH   Hs  ', '   L   L   ', '   s   s   ', '           ', '     T     '],
        ['  sM   Ms  ', '   B   B   ', '   w   w   ', '           ', '           '],
        ['   s   s   ', '           ', '     B     ', '           ', '           '],
        ['           ', '           ', '    E#I    ', '    wtw    ', '           '],
        ['           ', '           ', '           ', '           ', '           '],
        ['           ', '           ', '           ', '           ', '           '],
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
        I: { id: "immersiveengineering:basic_engineering", hatches: ["item_input"] },
        O: { id: "immersiveengineering:basic_engineering", hatches: ["item_output"] },
        E: { id: "immersiveengineering:basic_engineering", hatches: ["energy_input"] }
    },
    pBar: { x: 58, y: 33, name: 'radio_tower_ui' },
    itemInputSlots: [[41, 35, 1, 1], [60, 55, 1, 1]],
    itemOutputSlots: [[80, 35, 1, 1]],
    mainCasing: 'treated_wood_casing', mainOverlays: 'enigma_overlays', frontOverlay: true
})

registerMIMachine('machine_assembler', {
    itemsIn: true, itemsOut: true,
    casing: 'machine_plating_block',
    shape: [['AAA', 'aBa', 'AAA'],
    ['AAA', 'B B', 'AAA'],
    ['AAA', 'a#a', 'AAA']],
    shapeKeys: {
        "A": { id: "oritech:machine_plating_block", hatches: ["energy_input", "item_input", "item_output"] },
        "a": "immersiveengineering:light_engineering",
        "B": "immersiveengineering:logic_unit"
    },
    pBar: { x: 54, y: 69, name: 'square' },
    itemInputSlots: [[20, 35, 2, 2], [74, 35, 2, 2], [20, 89, 2, 2], [74, 89, 2, 2]],
    itemOutputSlots: [[56, 71, 1, 1]],
    mainCasing: 'light_engineering', mainOverlays: 'multiblock_packer', frontOverlay: true
})

registerMIMachine('steam_cracker', {
    itemsOut: true, fluidsIn: true, fluidsOut: true, casing: 'sheetmetal_steel_casing',
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
    shapeKeys: {
        "A": "immersiveengineering:steel_scaffolding_grate_top",
        "a": "immersiveengineering:fluid_pipe",
        "B": "immersiveengineering:slab_steel_scaffolding_grate_top",
        "b": "immersiveengineering:concrete_tile",
        "C": "immersiveengineering:steel_scaffolding_standard",
        "c": { id: "immersiveengineering:sheetmetal_steel", hatches: ["item_output"] },
        "D": "immersiveengineering:sheetmetal_steel",
        "d": "xkdeco:hollow_steel_beam",
        "E": { id: "immersiveengineering:sheetmetal_steel", hatches: ["energy_input"] },
        "e": "immersiveengineering:sheetmetal_aluminum",
        "F": { id: "immersiveengineering:sheetmetal_steel", hatches: ["fluid_output"] },
        "f": "immersiveengineering:slab_storage_steel",
        "G": { id: "immersiveengineering:sheetmetal_steel", hatches: ["fluid_input"] },
        "g": "immersiveengineering:radiator",
        "H": "immersiveengineering:light_engineering",
        "h": "immersiveengineering:heavy_engineering"
    },
    pBar: { x: 77, y: 73, name: 'arrow' },
    itemOutputSlots: [[102, 115, 2, 1]],
    fluidInputSlots: [[36, 75, 2, 1]],
    fluidOutputSlots: [[102, 55, 2, 3]],
    mainCasing: 'sheetmetal_steel_casing', mainOverlays: 'coke_oven', frontOverlay: true
})

registerMIMachine('desalter', {
    itemsOut: true, fluidsIn: true, fluidsOut: true, casing: 'sheetmetal_aluminum_casing',
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
    shapeKeys: {
        "A": "immersiveengineering:slab_concrete",
        "a": "immersiveengineering:sheetmetal_aluminum",
        "B": { id: "immersiveengineering:sheetmetal_aluminum", hatches: ["fluid_output"] },
        "b": "immersiveengineering:fluid_sorter",
        "C": "immersiveengineering:fluid_pipe",
        "c": "immersiveengineering:steel_scaffolding_grate_top",
        "D": "immersiveengineering:steel_fence",
        "d": { id: "immersiveengineering:sheetmetal_aluminum", hatches: ["item_output"] },
        "E": { id: "immersiveengineering:sheetmetal_aluminum", hatches: ["fluid_input"] },
        "e": "immersiveengineering:sheetmetal_steel",
        "F": "immersiveengineering:metal_ladder_none",
        "G": { id: "immersiveengineering:sheetmetal_aluminum", hatches: ["energy_input"] },
        "g": "xkdeco:hollow_steel_beam"
    },
    pBar: { x: 77, y: 53, name: 'arrow' },
    itemOutputSlots: [[61, 80, 3, 1]],
    fluidInputSlots: [[36, 55, 1, 1], [79, 35, 1, 1]],
    fluidOutputSlots: [[122, 55, 1, 1]],
    mainCasing: 'sheetmetal_aluminum_casing', mainOverlays: 'coke_oven', frontOverlay: true
})

registerMIMachine('electric_coke_oven', {
    itemsIn: true, itemsOut: true, fluidsIn: true, fluidsOut: true, casing: 'heatproof_machine_casing',
    shape: [['HHH', 'aaa', 'AaA', 'AaA'],
    ['HHH', 'a a', 'A A', 'AAA'],
    ['BAB', 'B#B', 'BAB', 'BAB']],
    shapeKeys: {
        "A": "modern_industrialization:heatproof_machine_casing",
        "a": "modern_industrialization:cupronickel_coil",
        "B": "modern_industrialization:invar_machine_casing_pipe",
        "H": { id: "modern_industrialization:heatproof_machine_casing", hatches: MI_HATCHES_ALL }
    },
    pBar: { x: 77, y: 33, name: 'arrow' },
    itemInputSlots: [[56, 35, 1, 2]],
    itemOutputSlots: [[102, 35, 1, 1]],
    fluidInputSlots: [[36, 35, 1, 1]],
    fluidOutputSlots: [[122, 35, 1, 1]],
    mainCasing: 'heatproof_machine_casing', mainOverlays: 'coke_oven', frontOverlay: true
})

registerSingleMIMachine('mi_furnace', {
    name: "Furnace", itemsIn: true, itemsOut: true, tiers: machineTiersAll,
    pBar: { x: 77, y: 33, name: 'arrow' }, efBar: { x: 38, y: 62 }, enBar: { x: 18, y: 30 },
    slots: { iIn: 1, iOut: 1 },
    itemSlots: [[56, 35, 1, 1], [102, 35, 1, 1]],
    frontOverlay: true
})

