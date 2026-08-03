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

registerSinglePowerlessMIMachine('not_so_multi_but_still_block_packer_2099_3x3x3_edition', {
    itemsIn: true, itemsOut: true,
    pBar: { x: 78, y: 69, name: 'square' }, guiheight: 240,
    slots: { iIn: 12, iOut: 1 },
    itemSlots: [[44, 35, 2, 1], [44, 53, 1, 1], [98, 35, 2, 1], [116, 53, 1, 1], [44, 107, 2, 1], [44, 89, 1, 1], [98, 107, 2, 1], [116, 89, 1, 1], [80, 71, 1, 1]],
    mainCasing: 'treated_wood_casing', mainOverlays: 'multiblock_packer', frontOverlay: true
})
