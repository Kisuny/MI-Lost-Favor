registerTieredMIMachine('large_electric_furnace', {
    fromExisting: "modern_industrialization:mi_furnace",
    casing: 'modern_industrialization:heatproof_machine_casing',
    tiers: [
        {
            id: "large_electric_furnace_cupronickel_tier", name: "Cupronickel", casing: "heatproof_machine_casing",
            shape: [['AAA', 'aaa', 'aaa', 'AAA'],
            ['BAB', 'B B', 'B B', 'BAB'],
            ['A#A', 'aaa', 'aaa', 'AAA']],
            shapeKeys: {
                "A": { id: "modern_industrialization:heatproof_machine_casing", hatches: MI_HATCHES.ALL },
                "a": "modern_industrialization:cupronickel_coil",
                "B": "modern_industrialization:invar_machine_casing_pipe"
            },
            workstationID: "modern_industrialization:bronze_mi_furnace",
            batchsize: 8, costMulti: 1
        },

        {
            id: "large_electric_furnace_kanthal_tier", name: "Kanthal", casing: "heatproof_machine_casing",
            shape: [['AAA', 'aaa', 'aaa', 'AAA'],
            ['BAB', 'B B', 'B B', 'BAB'],
            ['A#A', 'aaa', 'aaa', 'AAA']],
            shapeKeys: {
                "A": { id: "modern_industrialization:heatproof_machine_casing", hatches: MI_HATCHES.ALL },
                "a": "modern_industrialization:kanthal_coil",
                "B": "modern_industrialization:invar_machine_casing_pipe"
            },
            workstationID: "modern_industrialization:bronze_mi_furnace",
            batchsize: 16, costMulti: 1.2
        },

    ],
    mainCasing: 'heatproof_machine_casing', mainOverlays: 'mi_furnace', frontOverlay: true
})

registerTieredMIMachine('electric_coke_oven', {
    casing: 'modern_industrialization:heatproof_machine_casing',
    tiers: [
        {
            id: "electric_coke_oven_cupronickel", name: "Cupronickel", casing: "heatproof_machine_casing",
            shape: [['HHH', 'BBB', 'ABA', 'ABA'],
                ['HHH', 'B B', 'A A', 'AAA'],
                ['aAa', 'a#a', 'aAa', 'aAa']],
            shapeKeys: {
                "A": {
                    "id": "modern_industrialization:heatproof_machine_casing",
                    "hatches": null
                },
                "H": {
                    "id": "modern_industrialization:heatproof_machine_casing",
                    "hatches": MI_HATCHES.ALL
                },
                "a": {
                    "id": "modern_industrialization:invar_machine_casing_pipe",
                    "hatches": null
                },
                "B": {
                    "id": "modern_industrialization:cupronickel_coil",
                    "hatches": null
                }
            },
            workstationID: "modern_industrialization:coke_oven",
            recipe: { itemsIn: true, itemsOut: true, fluidsIn: true, fluidsOut: true },
            fromExisting: "modern_industrialization:coke_oven",
            batchsize: 3, costMulti: 1.1,
            maxBaseEU: 31
        },

        {
            id: "electric_coke_oven_carbon", name: "Carbon", casing: "heatproof_machine_casing",
            shape: [['HHH', 'BBB', 'ABA', 'ABA'],
            ['HHH', 'B B', 'A A', 'AAA'],
            ['aAa', 'a#a', 'aAa', 'aAa']],
            shapeKeys: {
                "A": {
                    "id": "modern_industrialization:heatproof_machine_casing",
                    "hatches": null
                },
                "H": {
                    "id": "modern_industrialization:heatproof_machine_casing",
                    "hatches": MI_HATCHES.ALL
                },
                "a": {
                    "id": "modern_industrialization:invar_machine_casing_pipe",
                    "hatches": null
                },
                "B": {
                    "id": "modern_industrialization:carbon_coil",
                    "hatches": null
                }
            },
            //recipe: { itemsIn: true, itemsOut: true, fluidsIn: true, fluidsOut: true },
            workstationID: "modern_industrialization:carbon_coil",
            recipe: { itemsIn: true, itemsOut: true, fluidsIn: true, fluidsOut: true },
            fromExisting: "modern_industrialization:coke_oven",
            batchsize: 5, costMulti: 1,
            maxBaseEU: 69
        },

        {
            id: "electric_coke_oven_kanthal", name: "Kanthal", casing: "heatproof_machine_casing",
            shape: [['HHH', 'BBB', 'ABA', 'ABA'],
            ['HHH', 'B B', 'A A', 'AAA'],
            ['aAa', 'a#a', 'aAa', 'aAa']],
            shapeKeys: {
                "A": {
                    "id": "modern_industrialization:heatproof_machine_casing",
                    "hatches": null
                },
                "H": {
                    "id": "modern_industrialization:heatproof_machine_casing",
                    "hatches": MI_HATCHES.ALL
                },
                "a": {
                    "id": "modern_industrialization:invar_machine_casing_pipe",
                    "hatches": null
                },
                "B": {
                    "id": "modern_industrialization:kanthal_coil",
                    "hatches": null
                }
            },
            workstationID: "modern_industrialization:coke_oven",
            fromExisting: "modern_industrialization:coke_oven",
            batchsize: 10, costMulti: 0.85,
            maxBaseEU: 122
        },

    ],

    pBar: { x: 77, y: 33, name: 'arrow' },
    itemInputSlots: [[56, 35, 1, 3]],
    itemOutputSlots: [[102, 35, 1, 3]],
    fluidInputSlots: [[36, 35, 1, 3]],
    fluidOutputSlots: [[122, 35, 1, 3]],

    mainCasing: 'heatproof_machine_casing', mainOverlays: 'coke_oven', frontOverlay: true
})

Object.entries({
    'modern_industrialization:compressor': {minTier: "bronze"},
    'modern_industrialization:cutting_machine': { minTier: "bronze" },
    'modern_industrialization:macerator': { minTier: "bronze" },
    'modern_industrialization:mi_furnace': { minTier: "bronze" },
    'modern_industrialization:mixer': { minTier: "bronze" },
    'modern_industrialization:unpacker': { minTier: "steel" },
    'modern_industrialization:packer': { minTier: "steel" },
    'modern_industrialization:wiremill': { minTier: "steel" }
    
}).forEach(([fromExistingId, daat]) => {
    let machine = fromExistingId.split(":")[1]
    let id = `large_steam_${machine}`
    registerTieredMIMachine(id, {
        fromExisting: fromExistingId, steam: true,
        casing: 'steel_plated_bricks',
        tiers: [
            {
                id: `${id}_steel_plated`, name: "Steel Tier", casing: "steel_plated_bricks",
                shape: [['AaA', 'AaA'],
                    ['A#A', 'AAA']],
                shapeKeys: {
                    "A": {
                        "id": "extended_industrialization:steel_plated_bricks",
                        "hatches": MI_HATCHES.ALL
                    },
                    "a": {
                        "id": "modern_industrialization:steel_machine_casing_pipe",
                        "hatches": null
                    }
                },
                workstationID: `modern_industrialization:${daat.minTier}_${machine}`,
                reiCategory: `modern_industrialization:${daat.minTier}_${machine}`,
                batchsize: 4, costMulti: 1.25, maxBaseEU: 4
            },

            {
                id: `${id}_vent`, name: "Vent Tier", casing: "steel_plated_bricks",
                shape: [['AaA', 'ABA', 'bBb'],
                    ['CcC', 'CcC', 'DaD'],
                    ['C#C', 'CCC', 'DDD']],
                shapeKeys: {
                    "A": {
                        "id": "xkdeco:air_duct",
                        "hatches": null,
                        "stateProperties": "{down:\"true\",up:\"true\"}"
                    },
                    "a": {
                        "id": "xkdeco:factory_vent_fan",
                        "hatches": null
                    },
                    "B": {
                        "id": "immersiveengineering:heavy_engineering",
                        "hatches": null
                    },
                    "b": {
                        "id": "xkdeco:air_duct",
                        "hatches": null,
                        "stateProperties": "{down:\"true\",up:\"false\"}"
                    },
                    "C": {
                        "id": "extended_industrialization:steel_plated_bricks",
                        "hatches": MI_HATCHES.ALL
                    },
                    "c": {
                        "id": "modern_industrialization:steel_machine_casing_pipe",
                        "hatches": null
                    },
                    "D": {
                        "id": "xkdeco:air_duct",
                        "hatches": null,
                        "stateProperties": "{down:\"false\",up:\"false\"}"
                    }
                },
                workstationID: `modern_industrialization:${daat.minTier}_${machine}`,
                reiCategory: `modern_industrialization:steel_${machine}`,
                batchsize: 6, costMulti: 1.1, maxBaseEU: 6
            },
        ],
        mainCasing: 'steel_plated_bricks', mainOverlays: machine, frontOverlay: true
    })
})