registerPowerlessMIMachine('multiblock_packer_3000_safety_regulations_edition', {
    itemsIn: true, itemsOut: true, casing: 'sheetmetal_steel_casing',
    shape: [['AaBaA', 'abbba', 'CbDbC', 'abbba', 'AaBaA'],
    ['aAAAa', 'b   b', 'b   b', 'b   b', 'aaBaa'],
    ['BAAAB', 'b   b', 'D   D', 'b   b', 'BBBBB'],
    ['aAAAa', 'b   b', 'b   b', 'b   b', 'aaBaa'],
    ['AaBaA', 'abbba', 'Cb#bC', 'abbba', 'AaBaA']],
    shapeKeys: {
        "A": "immersiveengineering:slab_sheetmetal_steel",
        "a": { id: "immersiveengineering:sheetmetal_steel", hatches: MI_HATCHES.ALL },
        "B": "immersiveengineering:steel_scaffolding_standard",
        "b": "xkdeco:hollow_steel_beam",
        "C": "immersiveengineering:light_engineering",
        "D": "immersiveengineering:logic_unit"
    },
    pBar: { x: 54, y: 69, name: 'square' },
    //itemInputSlots: [[20, 35, 2, 1], [20, 53, 1, 1], [74, 35, 2, 1], [92, 53, 1, 1], [20, 107, 2, 1], [20, 89, 1, 1], [74, 107, 2, 1], [92, 89, 1, 1]],
    itemInputSlots: [[20, 35, 2, 2], [74, 35, 2, 2], [20, 89, 2, 2], [74, 89, 2, 2]],
    itemOutputSlots: [[56, 71, 1, 1]],
    mainCasing: 'treated_wood_casing', mainOverlays: 'multiblock_packer', frontOverlay: true
})

registerPowerlessMIMachine('deepbronze_fish_farm', {
    itemsIn: true, fluidsIn: true, fluidsOut: true, itemsOut: true, casing: 'riveted_deepbronze',
    shape: [['       ', '       ', '   A   ', '       ', '       '],
        [' aBbBa ', ' CcccC ', ' CcccC ', ' CcccC ', ' aBDBa '],
        [' dEeEd ', ' cFFFc ', ' cFFFc ', ' cfffc ', ' dGeGd '],
        [' begeb ', ' cFHFc ', 'AcFhFcA', ' cfIfc ', ' iegei '],
        [' dEeEd ', ' cFFFc ', ' cFFFc ', ' cfffc ', ' dGeGd '],
        [' aB#Ba ', ' CcccC ', ' CcccC ', ' CcccC ', ' aBbBa '],
        ['       ', '       ', '   A   ', '       ', '       ']],
    shapeKeys: {
        "A": {
            "id": "abyssal_decor:big_deepbronze_grate",
            "hatches": null,
            "stateProperties": "{face:\"wall\"}"
        },
        "a": {
            "id": "abyssal_decor:riveted_deepbronze",
            "hatches": MI_HATCHES.ALL,
        },
        "B": {
            "id": "abyssal_decor:large_deepbronze_pipe",
            "hatches": null,
            "stateProperties": "{axis:\"x\"}"
        },
        "b": {
            "id": "abyssal_decor:deepbronze_trim",
            "hatches": null,
            "stateProperties": "{axis:\"y\"}"
        },
        "C": {
            "id": "abyssal_decor:large_deepbronze_pipe",
            "hatches": null,
            "stateProperties": "{axis:\"y\"}"
        },
        "c": {
            "id": "ae2:quartz_glass",
            "hatches": null
        },
        "D": {
            "id": "abyssal_decor:deepbronze_trim",
            "hatches": null,
            "stateProperties": "{axis:\"z\"}"
        },
        "d": {
            "id": "abyssal_decor:large_deepbronze_pipe",
            "hatches": null,
            "stateProperties": "{axis:\"z\"}"
        },
        "E": {
            "id": "minecraft:sand",
            "hatches": null
        },
        "e": {
            "id": "abyssal_decor:coil_lantern",
            "hatches": null
        },
        "F": {
            "id": "minecraft:water",
            "hatches": null,
            "stateProperties": "{level:\"8\"}"
        },
        "f": {
            "id": "minecraft:water",
            "hatches": null,
            "stateProperties": "{level:\"0\"}"
        },
        "G": {
            "id": "xkdeco:factory_vent_fan",
            "hatches": null
        },
        "g": {
            "id": "embers:archaic_light",
            "hatches": null
        },
        "H": {
            "id": "abyssal_decor:tall_deepbronze_spire",
            "hatches": null,
            "stateProperties": "{face:\"floor\"}"
        },
        "h": {
            "id": "abyssal_decor:seabrass_catalyst",
            "hatches": null
        },
        "I": {
            "id": "abyssal_decor:tall_deepbronze_spire",
            "hatches": null,
            "stateProperties": "{face:\"ceiling\"}"
        },
        "i": {
            "id": "abyssal_decor:deepbronze_trim",
            "hatches": null,
            "stateProperties": "{axis:\"x\"}"
        }
    },
    pBar: { x: 77, y: 33, name: "fish" },
    //itemInputSlots: [[20, 35, 2, 1], [20, 53, 1, 1], [74, 35, 2, 1], [92, 53, 1, 1], [20, 107, 2, 1], [20, 89, 1, 1], [74, 107, 2, 1], [92, 89, 1, 1]],
    itemInputSlots: [[56, 27, 1, 2]],
    itemOutputSlots: [[102, 27, 1, 2]],
    mainCasing: 'deepbronze_trim', mainOverlays: "packer", frontOverlay: true
})

registerSinglePowerlessMIMachine('not_so_multi_but_still_block_packer_2099_3x3x3_edition', {
    itemsIn: true, itemsOut: true,
    pBar: { x: 78, y: 69, name: 'square' }, guiheight: 240,
    slots: { iIn: 12, iOut: 1 },
    itemSlots: [[44, 35, 2, 1], [44, 53, 1, 1], [98, 35, 2, 1], [116, 53, 1, 1], [44, 107, 2, 1], [44, 89, 1, 1], [98, 107, 2, 1], [116, 89, 1, 1], [80, 71, 1, 1]],
    mainCasing: 'treated_wood_casing', mainOverlays: 'multiblock_packer', frontOverlay: true
})

registerSinglePowerlessMIMachine('fish_trap', {
    itemsIn: true, itemsOut: true,
    pBar: { x: 77, y: 33, name: "fish" },
    slots: { iIn: 2, iOut: 2 },
    itemSlots: [[56, 27, 1, 2], [102, 27, 1, 2]],
    mainCasing: 'chart_crate', mainOverlays: 'fish_trap', frontOverlay: true, sideOverlay:true
})
