

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
            workstationID: "oritech:carbon_plating_block",
            maxBaseEU: 41,
            recipe: { itemsIn: true, itemsOut: true, fluidsIn: true, fluidsOut: true }
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
            workstationID: "modern_industrialization:bioresistant_machine_casing",
            maxBaseEU: 66,
            recipe: { itemsIn: true, itemsOut: true, fluidsIn: true, fluidsOut: true }
        }
    ],
    pBar: { x: 58, y: 33, name: 'enigma_arrow' },
    itemInputSlots: [[50, 15, 1, 1], [40, 35, 1, 1], [50, 55, 1, 1]],
    fluidInputSlots: [[30, 15, 1, 1], [30, 55, 1, 1]],

    itemOutputSlots: [[80, 35, 1, 1]],
    fluidOutputSlots: [[100, 35, 1, 1]],
    mainCasing: 'resonanz_engineering', mainOverlays: 'microbial_fabricator', frontOverlay: true, sideOverlay: true
})