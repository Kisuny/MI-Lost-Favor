registerTieredMIMachine('microbial_fabricator', {
    itemsIn: true, itemsOut: true, casing: 'bioresistant_machine_casing', customName: "Microbial Fabricator",
    tiers: [
        {
            id: "microbial_fabricator_basic", name: "Basic Tier", casing: "carbon_plating_block",
            shape: [['AAA', 'aaa', 'AAA'],
                ['ABA', 'a#a', 'AAA'],
                ['AAA', 'aaa', 'AAA']],
            shapeKeys: {
                "A": { id: "oritech:carbon_plating_block", hatches: MI_HATCHES.ALL },
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
                "A": { id: "modern_industrialization:bioresistant_machine_casing", hatches: MI_HATCHES.ALL },
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

registerTieredMIMachine('machine_assembler', {
    itemsIn: true, itemsOut: true,
    casing: 'machine_plating_block',
    tiers: [
        {
            id: "basic_machine_assembler", name: "Basic Tier", casing: "machine_plating_block",
            shape: [['AAA', 'aBa', 'AAA'],
                ['AAA', 'BbB', 'AAA'],
                ['AAA', 'a#a', 'AAA']],
            shapeKeys: {
                "A": {
                    "id": "oritech:machine_plating_block",
                    "hatches": MI_HATCHES.ITEM.concat(MI_HATCHES.INPUT.ENERGY)
                },
                "a": {
                    "id": "immersiveengineering:light_engineering",
                    "hatches": null
                },
                "B": {
                    "id": "xkdeco:factory_vent_fan",
                    "hatches": null
                },
                "b": {
                    "id": "oritech:machine_extender",
                    "hatches": null,
                    "stateProperties": "{addon_used:\"false\"}"
                }
            },
            workstationID: "oritech:machine_extender",
            maxBaseEU: 33,
            recipe: { itemsIn: true, itemsOut: true}
        },

        {
            id: "advanced_machine_assembler", name: "Advanced Tier", casing: "machine_plating_block",
            shape: [[' AAA ', 'AaBaA', 'ABbBA', 'AaBaA', ' AAA '],
                ['AAAAA', 'a   a', 'B   B', 'a   a', 'AACAA'],
                ['AAcAA', 'B D B', 'b d b', 'B E B', 'ACcCA'],
                ['AAAAA', 'a   a', 'B   B', 'a   a', 'AACAA'],
                [' AAA ', 'AaBaA', 'AB#BA', 'AaBaA', ' AAA ']],
            shapeKeys: {
                "A": {
                    "id": "oritech:machine_plating_block",
                    "hatches": MI_HATCHES.ALL
                },
                "a": {
                    "id": "immersiveengineering:logic_unit",
                    "hatches": null
                },
                "B": {
                    "id": "immersiveengineering:light_engineering",
                    "hatches": null
                },
                "b": {
                    "id": "xkdeco:factory_vent_fan_big",
                    "hatches": null
                },
                "C": {
                    "id": "xkdeco:factory_vent_fan",
                    "hatches": null
                },
                "c": {
                    "id": "immersiveengineering:heavy_engineering",
                    "hatches": null
                },
                "D": {
                    "id": "oritech:machine_ultimate_addon",
                    "hatches": null,
                    "stateProperties": "{addon_used:\"false\",face:\"floor\"}"
                },
                "d": {
                    "id": "oritech:machine_extender",
                    "hatches": null,
                    "stateProperties": "{addon_used:\"false\"}"
                },
                "E": {
                    "id": "oritech:machine_ultimate_addon",
                    "hatches": null,
                    "stateProperties": "{addon_used:\"false\",face:\"ceiling\"}"
                }
            },
            workstationID: "oritech:machine_ultimate_addon",
            maxBaseEU: 71,
            recipe: { itemsIn: true, itemsOut: true}
        }
    ],

    pBar: { x: 54, y: 69, name: 'square' },
    itemInputSlots: [[20, 35, 2, 2], [74, 35, 2, 2], [20, 89, 2, 2], [74, 89, 2, 2]],
    //fluidInputSlots: [[29, 71, 1, 1], [56, 44, 1, 1], [83, 71, 1, 1], [56, 98, 1, 1]],
    itemOutputSlots: [[56, 71, 1, 1]],
    mainCasing: 'light_engineering', mainOverlays: 'multiblock_packer', frontOverlay: true
})