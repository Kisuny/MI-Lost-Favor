registerBatchMIMachineFromExisting('advanced_large_steam_furnace', {
    steam: true, casing: 'modern_industrialization:fire_clay_bricks', recipeType: "modern_industrialization:mi_furnace",
    emiWorkstations: ["modern_industrialization:bronze_mi_furnace"],
    shape: [['AAA', 'aaa', 'aaa'],
    ['BAB', 'B B', 'BaB'],
    ['AAA', 'a#a', 'aaa']],
    shapeKeys: {
        "A": { id: "modern_industrialization:fire_clay_bricks", hatches: MI_HATCHES.ALL },
        "a": "modern_industrialization:bronze_plated_bricks",
        "B": "modern_industrialization:bronze_machine_casing_pipe"
    },
    mainCasing: 'bronze_plated_bricks', mainOverlays: 'mi_furnace', frontOverlay: true,
    batchsize: 8, costMulti: 0.75
})

registerBatchMIMachineFromExisting('advanced_steam_blast_furnace', {
    steam: true, casing: 'steel_plated_bricks', recipeType: "modern_industrialization:blast_furnace",
    emiWorkstations: ["modern_industrialization:steam_blast_furnace"],
    shape: [['AaaaA', 'AaaaA', 'AaaaA', ' BBB '],
    ['aaaaa', 'a   a', 'a   a', 'BAAAB'],
    ['aaaaa', 'a   a', 'a   a', 'BAAAB'],
    ['aaaaa', 'a   a', 'a   a', 'BAAAB'],
    ['AaaaA', 'Aa#aA', 'AaaaA', ' BBB ']],
    shapeKeys: {
        "A": "immersiveengineering:blastbrick",
        "a": { id: "extended_industrialization:steel_plated_bricks", hatches: MI_HATCHES.ALL },
        "B": "immersiveengineering:slab_blastbrick"
    },
    mainCasing: 'steel_plated_bricks', mainOverlays: 'blast_furnace', frontOverlay: true,
    batchsize: 8, costMulti: 0.75
})

registerBatchMIMachine('advanced_steam_alloy_smelter', {
    steam: true, itemsIn: true, itemsOut: true, fluidsIn: true, fluidsOut: true, casing: 'steel_plated_bricks',
    shape: [['AAaAA', 'AAaAA', 'AAaAA', 'BBaBB'],
    ['AAbAA', 'A   A', 'A   A', 'BAaAB'],
    ['abbba', 'a   a', 'a   a', 'aaaaa'],
    ['AAbAA', 'A   A', 'A   A', 'BAaAB'],
    ['AAaAA', 'AA#AA', 'AAaAA', 'BBaBB']],
    shapeKeys: {
        "A": "immersiveengineering:alloybrick",
        "a": { id: "extended_industrialization:steel_plated_bricks", hatches: MI_HATCHES.ALL },
        "B": "immersiveengineering:slab_alloybrick",
        "b": "modern_industrialization:fire_clay_bricks"
    },
    pBar: { x: 88, y: 33, name: 'arrow' },
    itemInputSlots: [[40, 35, 2, 1]],
    itemOutputSlots: [[120, 35, 1, 1]],
    mainCasing: 'steel_plated_bricks', mainOverlays: 'coke_oven', frontOverlay: true,
    batchsize: 8, costMulti: 0.75
})