registerMIMachine('enigma_machine', {
    itemsIn: true, itemsOut: true, fluidsIn: true, casing: 'treated_wood_casing',
    shape: [
        ['AaA', 'BaB', 'bFb', 'bcb', 'BaB', 'DdD'],
        ['aEa', 'aea', 'FeF', 'cec', 'aea', 'ddd'],
        ['AaA', 'B#B', 'bCb', 'bcb', 'BaB', 'DdD']
    ],
    shapeKeys: {
        "A": {
            "id": "xkdeco:air_duct",
            "hatches": null,
            "stateProperties": "{down:\"false\",up:\"false\"}"
        },
        "a": {
            "id": "immersiveengineering:logic_unit",
            "hatches": null
        },
        "B": {
            "id": "immersiveengineering:basic_engineering",
            "hatches": MI_HATCHES.ALL
        },
        "b": {
            "id": "xkdeco:hollow_steel_beam",
            "hatches": null,
            "stateProperties": "{up:\"true\"}"
        },
        "C": {
            "id": "immersiveengineering:steel_wallmount",
            "hatches": null,
            "stateProperties": "{orientation:\"vert_up\"}"
        },
        "c": {
            "id": "immersiveengineering:steel_wallmount",
            "hatches": null,
            "stateProperties": "{orientation:\"vert_down\"}"
        },
        "D": {
            "id": "immersiveengineering:slab_sheetmetal_steel",
            "hatches": null,
            "stateProperties": "{type:\"bottom\"}"
        },
        "d": {
            "id": "immersiveengineering:sheetmetal_steel",
            "hatches": null
        },
        "E": {
            "id": "architects_palette:polished_glowstone",
            "hatches": null
        },
        "e": {
            "id": "ae2:quartz_glass",
            "hatches": null
        },
        "F": {
            "id": "immersiveengineering:steel_wallmount",
            "hatches": null,
            "stateProperties": "{orientation:\"side_down\"}"
        }
    },
    pBar: { x: 58, y: 33, name: 'enigma_machine' },
    itemInputSlots: [[40, 35, 1, 1], [50, 55, 1, 1],  [50, 15, 1, 1]],
    fluidInputSlots: [[70, 55, 1, 1], [70, 15, 1, 1]],
    itemOutputSlots: [[80, 35, 1, 1]],
    mainCasing: 'treated_wood_casing', mainOverlays: 'enigma_overlays', frontOverlay: true
})

registerMIMachine('radio_transcriber', {
    itemsIn: true, itemsOut: true, casing: 'treated_wood_casing',
    shape: [
        ['BAdAB', 'BcdcB', 'BAdAB', 'BDEDB', '     '],
        ['A   A', 'c   c', 'A   A', 'D   D', '     '],
        ['d   d', 'd   d', 'd   d', 'E   E', '  e  '],
        ['A   A', 'c   c', 'A   A', 'D   D', '     '],
        ['B   B', 'B   B', 'BBBBB', 'BB BB', '     '],
        ['     ', '     ', ' A#A ', ' BbB ', '  C  ']
    ],
    shapeKeys: {
        "A": {
            "id": "immersiveengineering:basic_engineering",
            "hatches": MI_HATCHES.ALL
        },
        "B": {
            "id": "xkdeco:hollow_steel_beam",
            "hatches": null,
            "stateProperties": "{up:\"true\"}"
        },
        "b": {
            "id": "immersiveengineering:tesla_coil",
            "hatches": null,
            "stateProperties": "{multiblockslave:\"false\"}"
        },
        "C": {
            "id": "immersiveengineering:tesla_coil",
            "hatches": null,
            "stateProperties": "{multiblockslave:\"true\"}"
        },
        "c": {
            "id": "xkdeco:air_duct",
            "hatches": null,
            "stateProperties": "{down:\"true\",up:\"true\"}"
        },
        "D": {
            "id": "xkdeco:hollow_steel_beam",
            "hatches": null,
            "stateProperties": "{up:\"false\"}"
        },
        "d": {
            "id": "modern_industrialization:steel_machine_casing_pipe",
            "hatches": null
        },
        "E": {
            "id": "xkdeco:factory_vent_fan",
            "hatches": null
        },
        "e": {
            "id": "immersiveengineering:radio_tower",
            "hatches": null
        }
    },
    pBar: { x: 58, y: 33, name: 'radio_tower_ui' },
    itemInputSlots: [[41, 35, 1, 1], [60, 55, 1, 1]],
    itemOutputSlots: [[80, 35, 1, 1]],
    mainCasing: 'treated_wood_casing', mainOverlays: 'enigma_overlays', frontOverlay: true
})


registerMIMachine('steam_cracker', {
    itemsOut: true, fluidsIn: true, fluidsOut: true, casing: 'sheetmetal_steel_casing',
    shape: [
        ['A         A', 'A   a a   A', 'A   a a   A', 'AaaaaaaaaaA', 'Aa a a a aA', 'ABBBBBBBBBA', '           ', '           ', '           ', '           ', '  ABBBBBA  ', '           ', '           ', '           ', '  ABBBBBA  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
        [' bCCC CCCb ', ' b  a a  b ', ' bddd dddb ', 'abbbbbbbbba', 'aaeaeaeaeaa', 'BDe e e eDB', ' Ae e e eA ', ' AeaeaeaeA ', ' AbabababA ', ' ADaaaaaDA ', ' ADDBBBDDA ', ' A       A ', ' A a   a A ', ' A aaaaa A ', ' ADDBBBDDA ', '  DD   DD  ', '  ff   ff  ', '           ', '  BBBBBBB  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
        [' CDDfffDDC ', '  D aaa D  ', ' d       d ', 'abbbbbbbbba', ' eegegegee ', 'BeeHeHeHeeB', ' eeHeHeHee ', ' eegegegee ', ' bbbbbbbbb ', ' DeeeaeeeD ', 'ADeeeBeeeDA', '  eee eee  ', '  eee eee  ', '  eeeaeee  ', 'ADeeeBeeeDA', ' Deee eeeD ', ' feee eeef ', '  eee eee  ', ' BeeeBeeeB ', '  eee eee  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
        [' CDDfffDDC ', '   D a D   ', ' d       d ', 'abbeebeebba', 'aag     gaa', 'B H     H B', '  H     H  ', ' ag     ga ', ' abeebeeba ', ' ae eae ea ', 'BDe eBe eDB', '  e e e e  ', ' ae e e ea ', ' ae eae ea ', 'BDe eBe eDB', ' De e e eD ', ' fe e e ef ', '  e e e e  ', ' Beee eeeB ', '  eee eee  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
        [' CffhhhffC ', 'aaa  a  aaa', 'ad       da', 'abbebbbebba', ' ee     ee ', 'Bee     eeB', ' ee     ee ', ' ee     ee ', ' bbebbbebb ', ' aeeeaeeea ', 'BBeeeBeeeBB', '  eee eee  ', '  eee eee  ', ' aeeeaeeea ', 'BBeeeBeeeBB', '  eeeAeee  ', '  eeeAeee  ', '  eeeAeee  ', ' BeeeAeeeB ', '  eeeAeee  ', '     A     ', '     A     ', '     A     ', '    BAB    ', '           ', '           ', '           ', '           '],
        ['  ffhhhff  ', '  aaaaaaa  ', '     a     ', 'abbbbabbbba', 'aag  a  gaa', 'B H  a  H B', '  H  a  H  ', ' ag  a  ga ', ' abbbabbba ', ' aaaaaaaaa ', 'BBBBBaBBBBB', '     a     ', '     a     ', ' aaaaaaaaa ', 'BBBBBaBBBBB', '    AaA    ', '    AaA    ', '    AaA    ', ' BB AaA BB ', '    AaA    ', '    AaA    ', '    AaA    ', '    AaA    ', '    AaA    ', '     a     ', '     a     ', '     a     ', '     a     '],
        [' CffhhhffC ', 'aaa  a  aaa', 'ad       da', 'abbebbbebba', ' ee     ee ', 'Bee     eeB', ' ee     ee ', ' ee     ee ', ' bbebbbebb ', ' aeeeaeeea ', 'BBeeeBeeeBB', '  eee eee  ', '  eee eee  ', ' aeeeaeeea ', 'BBeeeBeeeBB', '  eeeAeee  ', '  eeeAeee  ', '  eeeAeee  ', ' BeeeAeeeB ', '  eeeAeee  ', '     A     ', '     A     ', '     A     ', '    BAB    ', '           ', '           ', '           ', '           '],
        [' CDDfffDDC ', '   D a D   ', ' d       d ', 'abbeebeebba', 'aag     gaa', 'B H     H B', '  H     H  ', ' ag     ga ', ' abeebeeba ', ' ae eae ea ', 'BDe eBe eDB', '  e e e e  ', ' ae e e ea ', ' ae eae ea ', 'BDe eBe eDB', ' De e e eD ', ' fe e e ef ', '  e e e e  ', ' Beee eeeB ', '  eee eee  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
        [' CDDfffDDC ', '  DGaaaGD  ', ' d       d ', 'abbbbbbbbba', ' eegegegee ', 'BeeHeHeHeeB', ' eeHeHeHee ', ' eegegegee ', ' bbbbbbbbb ', ' DeeeaeeeD ', 'ADeeeBeeeDA', '  eee eee  ', '  eee eee  ', '  eeeaeee  ', 'ADeeeBeeeDA', ' Deee eeeD ', ' feee eeef ', '  eee eee  ', ' BeeeBeeeB ', '  eee eee  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
        [' bCCCcCCCb ', ' b  a#a  b ', ' bdddEdddb ', 'abbbbbbbbba', 'aaeaeaeaeaa', 'BDe e e eDB', ' Ae e e eA ', ' AeaeaeaeA ', ' AbabababA ', ' ADaaaaaDA ', ' ADDBBBDDA ', ' AF     FA ', ' AFa   aFA ', ' AFaaaaaFA ', ' ADDBBBDDA ', '  DD   DD  ', '  ff   ff  ', '           ', '  BBBBBBB  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           '],
        ['A         A', 'A   a a   A', 'A   a a   A', 'AaaaaaaaaaA', 'Aa a a a aA', 'ABBBBBBBBBA', '           ', '           ', '           ', '           ', '  ABBBBBA  ', '           ', '           ', '           ', '  ABBBBBA  ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ', '           ']
    ],
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
    pBar: { x: 89, y: 85, name: 'steam' },
    itemOutputSlots: [[73, 130, 3, 1]],
    fluidInputSlots: [[91, 65, 1, 1], [91, 109, 1, 1]],
    fluidOutputSlots: [
        [31, 91, 1, 1],
        [42, 56, 1, 1],
        [72, 34, 1, 1],
        [110, 34, 1, 1],
        [140, 56, 1, 1],
        [151, 91, 1, 1]
    ],
    mainCasing: 'sheetmetal_steel_casing', mainOverlays: 'coke_oven', frontOverlay: true
})

registerMIMachine('chemical_plant', {
    itemsIn: true, itemsOut: true, fluidsIn: true, fluidsOut: true, casing: 'reinforced_steel_machine_casing',
    shape: [
        ['acgbk', 'acgjb', 'acgjL', 'achhh', 'aEIII', '     ', '     ', 'BBBB ', '     ', '     ', '     ', '     '],
        ['ACGJb', 'ACGJj', 'ACGJj', 'ACCCh', 'BCCCI', ' CCC ', ' CCC ', 'BCCCB', ' eFe ', '     ', '     ', '     '],
        ['ACCGK', ' CHGK', ' CHGK', 'ACHCh', 'BCHCI', ' CHC ', ' CHC ', 'BCACB', ' FAF ', '  A  ', '  A  ', '  A  '],
        ['ACCCc', ' CCCc', ' CCCc', 'ACCCc', 'BCCCE', ' CCC ', ' CCC ', 'BCCCB', ' eFe ', '     ', '     ', '     '],
        ['Abfba', 'AD#Da', 'Adbda', 'AAAAa', 'BBBBa', '    a', '    a', ' BBBa', '     ', '     ', '     ', '     ']
    ],
    shapeKeys: {
        "A": {
            "id": "immersiveengineering:fluid_pipe",
            "hatches": null
        },
        "a": {
            "id": "immersiveengineering:steel_scaffolding_grate_top",
            "hatches": null
        },
        "B": {
            "id": "immersiveengineering:slab_steel_scaffolding_grate_top",
            "hatches": null,
            "stateProperties": "{type:\"top\"}"
        },
        "b": {
            "id": "immersiveengineering:heavy_engineering",
            "hatches": null
        },
        "C": {
            "id": "immersiveengineering:sheetmetal_aluminum",
            "hatches": null
        },
        "c": {
            "id": "xkdeco:air_duct",
            "hatches": null,
            "stateProperties": "{down:\"true\",up:\"true\"}"
        },
        "D": {
            "id": "modern_industrialization:reinforced_steel_machine_casing",
            "hatches": null
        },
        "d": {
            "id": "immersiveengineering:radiator",
            "hatches": null
        },
        "E": {
            "id": "xkdeco:air_duct",
            "hatches": null,
            "stateProperties": "{down:\"true\",up:\"false\"}"
        },
        "e": {
            "id": "immersiveengineering:slab_sheetmetal_aluminum",
            "hatches": null,
            "stateProperties": "{type:\"bottom\"}"
        },
        "F": {
            "id": "immersiveengineering:slab_sheetmetal_aluminum",
            "hatches": null,
            "stateProperties": "{type:\"double\"}"
        },
        "f": {
            "id": "modern_industrialization:reinforced_steel_machine_casing",
            "hatches": MI_HATCHES.INPUT.ENERGY
        },
        "G": {
            "id": "modern_industrialization:steel_machine_casing_pipe",
            "hatches": null
        },
        "g": {
            "id": "modern_industrialization:reinforced_steel_machine_casing",
            "hatches": MI_HATCHES.INPUT.FLUID
        },
        "H": {
            "id": "modern_industrialization:titanium_machine_casing_pipe",
            "hatches": null
        },
        "h": {
            "id": "immersiveengineering:fluid_pipe",
            "hatches": null
        },
        "I": {
            "id": "xkdeco:air_duct",
            "hatches": null,
            "stateProperties": "{down:\"false\",up:\"false\"}"
        },
        "J": {
            "id": "modern_industrialization:invar_machine_casing_pipe",
            "hatches": null
        },
        "j": {
            "id": "immersiveengineering:radiator",
            "hatches": null
        },
        "K": {
            "id": "modern_industrialization:reinforced_steel_machine_casing",
            "hatches": MI_HATCHES.OUTPUT.FLUID
        },
        "k": {
            "id": "modern_industrialization:reinforced_steel_machine_casing",
            "hatches": MI_HATCHES.OUTPUT.ITEM
        },
        "L": {
            "id": "modern_industrialization:reinforced_steel_machine_casing",
            "hatches": MI_HATCHES.INPUT.ITEM
        }
    },
    pBar: { x: 58, y: 33, name: 'enigma_arrow' },
    fluidInputSlots: [[40, 35, 1, 1], [50, 15, 1, 1], [50, 55, 1, 1]],
    itemInputSlots: [[20, 35, 1, 1]],

    itemOutputSlots: [[100, 35, 1, 1]],
    fluidOutputSlots: [[80, 35, 1, 1], [90, 15, 1, 1], [90, 55, 1, 1]],
    mainCasing: 'reinforced_steel_machine_casing', mainOverlays: 'electric_blast_furnace', frontOverlay: true
})

// registerMIMachine('desalter', {
//     itemsOut: true, fluidsIn: true, fluidsOut: true, casing: 'sheetmetal_aluminum_casing',
//     shape: [[' AAAAA ', '       ', '       ', '       ', '       ', '       ', '       '],
//     ['AAAAAAA', '  aaa  ', '  aBa  ', '  aba  ', ' CCCCC ', '       ', '       '],
//     ['AAaaaAA', ' a C a ', ' a   a ', ' a   a ', ' CaaaC ', '  ccc  ', '  DDD  '],
//     ['AAaaaAA', ' a C d ', ' a   a ', ' E   b ', ' CaaaC ', '  ccc  ', '  D D  '],
//     ['AAaaaAA', ' a C a ', ' a   a ', ' a   a ', ' CaaaC ', '  ccc  ', '  D D  '],
//     ['AAaaaAA', ' a C d ', ' a   a ', ' E   b ', ' CaaaC ', '  ccc  ', '  D D  '],
//     ['AAaaaAA', ' a C a ', ' a   a ', ' a   a ', ' CaaaC ', '  ccc  ', '  D D  '],
//     ['AAaaaAA', ' a C d ', ' a   a ', ' E   b ', ' CaaaC ', '  ccc  ', '  D D  '],
//     ['AAaaaAA', ' a C a ', ' a   a ', ' a   a ', ' Caaac ', '  cccc ', '  D DD '],
//     ['AAeeeAA', ' e C eF', ' e   eF', ' e   eF', ' CeeeeF', '  ccceF', '  D    '],
//     ['AAaaaAA', ' a C a ', ' a   a ', ' a   a ', ' Caaac ', '  cccc ', '  D DD '],
//     ['AAAAAAA', '  aba  ', '  a#a  ', '  aGa  ', ' Cggg  ', '  ggg  ', '  DDD  '],
//     [' AAAAA ', ' CCC   ', ' C     ', ' C     ', ' C     ', '       ', '       ']],
//     shapeKeys: {
//         "A": "immersiveengineering:slab_concrete",
//         "a": "immersiveengineering:sheetmetal_aluminum",
//         "B": { id: "immersiveengineering:sheetmetal_aluminum", hatches: ["fluid_output"] },
//         "b": "immersiveengineering:fluid_sorter",
//         "C": "immersiveengineering:fluid_pipe",
//         "c": "immersiveengineering:steel_scaffolding_grate_top",
//         "D": "immersiveengineering:steel_fence",
//         "d": { id: "immersiveengineering:sheetmetal_aluminum", hatches: ["item_output"] },
//         "E": { id: "immersiveengineering:sheetmetal_aluminum", hatches: ["fluid_input"] },
//         "e": "immersiveengineering:sheetmetal_steel",
//         "F": "immersiveengineering:metal_ladder_none",
//         "G": { id: "immersiveengineering:sheetmetal_aluminum", hatches: ["energy_input"] },
//         "g": "xkdeco:hollow_steel_beam"
//     },
//     pBar: { x: 77, y: 53, name: 'arrow' },
//     itemOutputSlots: [[61, 80, 3, 1]],
//     fluidInputSlots: [[36, 55, 1, 1], [79, 35, 1, 1]],
//     fluidOutputSlots: [[122, 55, 1, 1]],
//     mainCasing: 'sheetmetal_aluminum_casing', mainOverlays: 'coke_oven', frontOverlay: true
// })

registerMIMachine('source_alembic', {
    itemsIn: true, itemsOut: true, fluidsIn: true, fluidsOut: true, casing: 'sourcestone_machine_casing',
    shape: [
        ['    AAAAA    ', '             ', '    AAAAA    ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             '],
        ['  AAAAAAAAA  ', '    aaaaa    ', '  AAAAAAAAA  ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             '],
        [' AAAAAAAAAAA ', '   BBBBBBB   ', ' AAAAAAAAAAA ', '             ', '             ', '             ', '     bbb     ', '     bbb     ', '     bbb     ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             '],
        [' AAAAAAAAAAA ', '  BBBBBBBBB  ', ' AAAAAAAAAAA ', '             ', '     bbb     ', '    bbbbb    ', '   bbCCCbb   ', '   bbCCCbb   ', '   bb   bb   ', '    bbbbb    ', '     bbb     ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             '],
        ['AAAAAAAAAAAAA', ' aBBBBBBBBBa ', 'AAAAAAAAAAAAA', '     ccc     ', '    bbbbb    ', '   bCCCCCb   ', '   bCCCCCb   ', '   bCCCCCb   ', '   b CCC b   ', '   b     b   ', '    bbbbb    ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             '],
        ['AAAAAAAAAAAAA', ' aBBBBBBBBBa ', 'AAAAAAAAAAAAA', '    cbbbc    ', '   bbCCCbb   ', '   bCCCCCb   ', '  bCCCCCCCb  ', '  bCCCCCCCb  ', '  bCCCCCC b  ', '   b  C  b   ', '   bb   bb   ', '     bbb     ', '     bbb     ', '     AAA     ', '     bbb     ', '     bbb     ', '     bbb     ', '     bAb     ', '     DAD     '],
        ['AAAAAAAAAAAAA', ' aBBBBBBBBBa ', 'AAAAAAAAAAAAA', '  ccAbbbAcc  ', '  DbbCCCbbD  ', ' cAbCCCCCbAc ', ' DbCCCCCCCbD ', ' DbCCCCCCCbD ', ' DbCCCCCC bD ', ' cAb CCC bAc ', '  Dbb C bbD  ', '  ccAbCbAcc  ', '    Db bD    ', '    DAdAD    ', '     b b     ', '     b b     ', '     b b     ', '     A A     ', '     A A     '],
        ['AAAAAAAAAAAAA', ' aBBBBBBBBBa ', 'AAAAAAAAAAAAA', '    cbbbc    ', '   bbCCCbb   ', '   bCCCCCb   ', '  bCCCCCCCb  ', '  bCCCCCC b  ', '  b CCCCC b  ', '   b  CC b   ', '   bb   bb   ', '     bbb     ', '     bbb     ', '     AAA     ', '     bbb     ', '     bbb     ', '     bbb     ', '     bAb     ', '     DAD     '],
        ['AAAAAAAAAAAAA', ' aBBBBBBBBBa ', 'AAAAAAAAAAAAA', '     ccc     ', '    bbbbb    ', '   bCCCCCb   ', '   bCCCCCb   ', '   bCCCCCb   ', '   b CCC b   ', '   b     b   ', '    bbbbb    ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             '],
        [' AAAAAAAAAAA ', '  BBBBBBBBB  ', ' AAAAAAAAAAA ', '             ', '     bbb     ', '    bbbbb    ', '   bbCCCbb   ', '   bbCCCbb   ', '   bb   bb   ', '    bbbbb    ', '     bbb     ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             '],
        [' AAAAAAAAAAA ', '   BBBBBBB   ', ' AAAAAAAAAAA ', '             ', '             ', '             ', '     bbb     ', '     bbb     ', '     bbb     ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             '],
        ['  AAAAAAAAA  ', '    aaBaa    ', '  AAAAAAAAA  ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             '],
        ['    AAAAA    ', '      #      ', '    AAAAA    ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ', '             ']
    ],
    shapeKeys: {
        "A": {id: "ars_nouveau:sourcestone_large_bricks", tag: "ars_nouveau:purple_bricks"},
        "a": {id: "ars_nouveau:sourcestone", tag: "ars_nouveau:sourcestones", hatches: MI_HATCHES.ALL},
        "B": {id: "ars_nouveau:sourcestone", tag: "ars_nouveau:sourcestones"},
        "b": {id: "spectrum:amethyst_glass", tag: "spectrum:gemstone_glass"},
        "C": {id: "spectrum:amethyst_powder_block", tag: "spectrum:gemstone_powder_blocks"},
        "c": {id: "ars_nouveau:sourcestone_large_bricks_slab", tag: "ars_nouveau:purple_brick_slabs"},
        "D": "ars_additions:sourcestone_wall",
        "d": {id: "minecraft:campfire", tag:  "minecraft:campfires"},
    },
    pBar: { x: 58, y: 33, name: 'arrow' },
    itemInputSlots: [[40, 15, 3, 1]],
    itemOutputSlots: [[100, 15, 1, 1]],
    fluidInputSlots: [[40, 55, 1, 1]],
    fluidOutputSlots: [[100, 55, 1, 1]],
    mainCasing: 'sourcestone_machine_casing', mainOverlays: 'blast_furnace', frontOverlay: true
})

registerSingleMIMachine('mi_furnace', {
    name: "Furnace", itemsIn: true, itemsOut: true, tiers: machineTiersAll,
    pBar: { x: 77, y: 33, name: 'arrow' }, efBar: { x: 38, y: 62 }, enBar: { x: 18, y: 30 },
    slots: { iIn: 1, iOut: 1 },
    itemSlots: [[56, 35, 1, 1], [102, 35, 1, 1]],
    frontOverlay: true
})

