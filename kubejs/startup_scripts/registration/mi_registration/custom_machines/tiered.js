// registerTieredMIMachine('bioactive_chamber', {
//     itemsIn: true, itemsOut: true, casing: 'bioresistant_machine_casing', customName: "Bioactive Chamber",
//     tiers: [
//         {
//             id: "bioactive_chamber_bioresistant_tier", name: "Bioresistant Tier", casing: "bioresistant_machine_casing",
//             shape: [['     ', ' AAA ', '     ', '     ', '     '],
//             ['  A  ', 'AaBaA', '  B  ', ' aBa ', '  A  '],
//             [' AAA ', 'AB BA', ' B B ', ' B B ', ' AAA '],
//             ['  A  ', 'AaBaA', '  B  ', ' aBa ', '  A  '],
//             ['     ', ' A#A ', '     ', '     ', '     ']],
//             shapeKeys: {
//                 "A": "modern_industrialization:bioresistant_machine_casing",
//                 "a": "modern_industrialization:bioresistant_alloy_machine_casing",
//                 "B": "ae2:quartz_vibrant_glass"
//             },
//             workstationID: "modern_industrialization:bioresistant_machine_casing"
//         },

//         {
//             id: "bioactive_chamber_bioactive_tier", name: "Bioactive Tier", casing: "bioactive_machine_casing",
//             shape: [['     ', ' AAA ', '     ', ' aaa ', '     '],
//             ['  A  ', 'ABbBA', '  b  ', 'aCbCa', '  a  '],
//             [' AAA ', 'Ab bA', ' b b ', 'ab ba', ' aaa '],
//             ['  A  ', 'ABbBA', '  b  ', 'aCbCa', '  a  '],
//             ['     ', ' A#A ', '     ', ' aaa ', '     ']],
//             shapeKeys: {
//                 "A": "modern_industrialization:bioresistant_machine_casing",
//                 "a": "modern_industrialization:bioactive_machine_casing",
//                 "B": "modern_industrialization:bioresistant_alloy_machine_casing",
//                 "b": "ae2:quartz_vibrant_glass",
//                 "C": "modern_industrialization:tumbaga_machine_casing"
//             },
//             workstationID: "modern_industrialization:bioactive_machine_casing"
//         },

//         {
//             id: "bioactive_chamber_biointensive_tier", name: "Biointensive Tier", casing: "biointensive_machine_casing",
//             shape: [['     ', ' AAA ', '     ', ' aaa ', '     ', ' BBB ', '     '],
//             ['  A  ', 'AbCbA', '  C  ', 'acCca', '  C  ', 'BDCDB', '  B  '],
//             [' AAA ', 'AC CA', ' C C ', 'aC Ca', ' C C ', 'BC CB', ' BBB '],
//             ['  A  ', 'AbCbA', '  C  ', 'acCca', '  C  ', 'BDCDB', '  B  '],
//             ['     ', ' A#A ', '     ', ' aaa ', '     ', ' BBB ', '     ']],
//             shapeKeys: {
//                 "A": "modern_industrialization:bioresistant_machine_casing",
//                 "a": "modern_industrialization:bioactive_machine_casing",
//                 "B": "modern_industrialization:biointensive_machine_casing",
//                 "b": "modern_industrialization:bioresistant_alloy_machine_casing",
//                 "C": "ae2:quartz_vibrant_glass",
//                 "c": "modern_industrialization:tumbaga_machine_casing",
//                 "D": "modern_industrialization:carbon_steel_machine_casing"
//             },
//             workstationID: "modern_industrialization:biointensive_machine_casing"
//         }
//     ],
//     pBar: { x: 54, y: 69, name: 'square' },
//     itemInputSlots: [[20, 35, 2, 1], [20, 53, 1, 1], [74, 35, 2, 1], [92, 53, 1, 1], [20, 107, 2, 1], [20, 89, 1, 1], [74, 107, 2, 1], [92, 89, 1, 1]],
//     itemOutputSlots: [[56, 71, 1, 1]],
//     mainCasing: 'bioresistant_machine_casing', mainOverlays: 'bioactive_chamber', frontOverlay: true
// })

registerTieredMIMachine('microbial_fabricator', {
    itemsIn: true, itemsOut: true, casing: 'bioresistant_machine_casing', customName: "Microbial Fabricator",
    tiers: [
        {
            id: "microbial_fabricator_basic", name: "Basic Tier", casing: "carbon_plating_block",
            shape: [['AAA', 'aaa', 'AAA'],
                ['ABA', 'a#a', 'AAA'],
                ['AAA', 'aaa', 'AAA']],
            shapeKeys: {
                "A": { id: "oritech:carbon_plating_block", hatches: MI_HATCHES_ALL },
                "a": "ae2:quartz_glass",
                "B": "immersiveengineering:resonanz_engineering"
            },
            workstationID: "oritech:carbon_plating_block"
        },

        {
            id: "microbial_fabricator_bioresistant", name: "Bioresistant Tier", casing: "bioresistant_machine_casing",
            shape: [['AAA', 'aaa', 'aaa', 'aaa', 'AAA'],
                ['AAA', 'aBa', 'a#a', 'aBa', 'AAA'],
                ['AAA', 'aaa', 'aaa', 'aaa', 'AAA']],
            shapeKeys: {
                "A": { id: "modern_industrialization:bioresistant_machine_casing", hatches: MI_HATCHES_ALL },
                "a": "ae2:quartz_glass",
                "B": "immersiveengineering:resonanz_engineering"
            },
            workstationID: "modern_industrialization:bioresistant_machine_casing"
        }
    ],
    pBar: { x: 58, y: 33, name: 'enigma_arrow' },
    itemInputSlots: [[50, 15, 1, 1], [40, 35, 1, 1], [50, 55, 1, 1]],
    itemOutputSlots: [[80, 35, 1, 1]],
    mainCasing: 'resonanz_engineering', mainOverlays: 'microbial_fabricator', frontOverlay: true, sideOverlay: true
})