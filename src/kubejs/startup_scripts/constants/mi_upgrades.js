//priority: 1
global.MI_UPGRADES = {

    'modern_industrialization:bronze_barrel': { 
        upgradeMaterials: [
            { id: "milf:steel_machine_bit", count: 1 }
        ], 
        upgradesTo: "modern_industrialization:steel_barrel" 
    },
    'modern_industrialization:steel_barrel': { 
        upgradeMaterials: [{ id: "modern_industrialization:frostproof_machine_casing", count: 1 }], 
        upgradesTo: "modern_industrialization:aluminum_barrel" 
    },
    'modern_industrialization:aluminum_barrel': { 
        upgradeMaterials: [{ id: "modern_industrialization:clean_stainless_steel_machine_casing", count: 1 }], 
        upgradesTo: "modern_industrialization:stainless_steel_barrel" 
    },
    'modern_industrialization:stainless_steel_barrel': { 
        upgradeMaterials: [{ id: "modern_industrialization:solid_titanium_machine_casing", count: 1 }], 
        upgradesTo: "modern_industrialization:titanium_barrel" 
    },

    'modern_industrialization:bronze_tank': { 
        upgradeMaterials: [
            { id: "milf:steel_machine_bit", count: 1 },
            { id: "milf:steel_infused_glass", count: 2 }
        ], 
        upgradesTo: "modern_industrialization:steel_tank" 
    },
    'modern_industrialization:steel_tank': { 
        upgradeMaterials: [{ id: "modern_industrialization:frostproof_machine_casing", count: 1 }], 
        upgradesTo: "modern_industrialization:aluminum_tank" 
    },
    'modern_industrialization:aluminum_tank': { 
        upgradeMaterials: [{ id: "modern_industrialization:clean_stainless_steel_machine_casing", count: 1 }], 
        upgradesTo: "modern_industrialization:stainless_steel_tank" 
    },
    'modern_industrialization:stainless_steel_tank': { 
        upgradeMaterials: [{ id: "modern_industrialization:solid_titanium_machine_casing", count: 1 }], 
        upgradesTo: "modern_industrialization:titanium_tank" 
    },

    //#region bronze to steel

    'extended_industrialization:bronze_composter': {
         upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
         upgradesTo: "extended_industrialization:steel_composter" 
        },
    'modern_industrialization:bronze_cutting_machine': { 
        upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
        upgradesTo: "modern_industrialization:steel_cutting_machine" 
    },
    'modern_industrialization:bronze_compressor': { 
        upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
        upgradesTo: "modern_industrialization:steel_compressor" 
    },
    'extended_industrialization:bronze_waste_collector': { 
        upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
        upgradesTo: "extended_industrialization:steel_waste_collector" 
    },
    'extended_industrialization:bronze_bending_machine': { 
        upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
        upgradesTo: "extended_industrialization:steel_bending_machine" 
    },
    'extended_industrialization:bronze_solar_boiler': { 
        upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
        upgradesTo: "extended_industrialization:steel_solar_boiler" 
    },
    'modern_industrialization:bronze_mixer': { 
        upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
        upgradesTo: "modern_industrialization:steel_mixer" 
    },
    'modern_industrialization:bronze_boiler': { 
        upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
        upgradesTo: "modern_industrialization:steel_boiler" 
    },
    'modern_industrialization:bronze_water_pump': {
        upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
        upgradesTo: "modern_industrialization:steel_water_pump" 
    },
    'modern_industrialization:bronze_macerator': { 
        upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
        upgradesTo: "modern_industrialization:steel_macerator" 
    },
    'modern_industrialization:bronze_mi_furnace': { 
        upgradeMaterials: [{ id: "modern_industrialization:steel_upgrade", count: 1 }], 
        upgradesTo: "modern_industrialization:steel_mi_furnace" 
    },

    //#endregion

    //#region steel to electric

    'extended_industrialization:steel_alloy_smelter': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:cupronickel_wire_magnetic", count: 4 },
            { id: "modern_industrialization:silicon_steel_curved_plate", count: 4 },
            { id: "modern_industrialization:adamant_large_plate", count: 2 }
        ],
        upgradesTo: "extended_industrialization:electric_alloy_smelter"
    },
    'extended_industrialization:steel_composter': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "milf:basic_motor", count: 4 },
            { id: "modern_industrialization:electrum_wire", count: 8 },
            { id: "modern_industrialization:bioresistant_alloy_large_plate", count: 3 }
        ],
        upgradesTo: "extended_industrialization:electric_composter"
    },
    'modern_industrialization:steel_water_pump': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:pump", count: 2 },
            { id: "modern_industrialization:aluminum_rotor", count: 3 },
            { id: "modern_industrialization:fluid_pipe", count: 6 }
        ],
        upgradesTo: "modern_industrialization:electric_water_pump"
    },
    'extended_industrialization:steel_brewery': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "milf:tempered_glass", count: 2 },
            { id: "modern_industrialization:aluminum_rotor", count: 1 },
            { id: "modern_industrialization:fluid_pipe", count: 3 }
        ],
        upgradesTo: "extended_industrialization:electric_brewery"
    },
    'extended_industrialization:steel_waste_collector': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:aluminum_rotor", count: 1 },
            { id: "modern_industrialization:silicon_steel_rod", count: 4 },
            { id: "modern_industrialization:fluid_pipe", count: 3 }
        ],
        upgradesTo: "extended_industrialization:electric_waste_collector"
    },
    'extended_industrialization:steel_honey_extractor': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:motor", count: 1 },
            { id: "milf:tempered_glass", count: 2 },
            { id: "modern_industrialization:silicon_steel_plate", count: 2 }
        ],
        upgradesTo: "extended_industrialization:electric_honey_extractor"
    },
    'modern_industrialization:steel_mi_furnace': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:cupronickel_wire_magnetic", count: 6 },
            { id: "modern_industrialization:inductor", count: 2 },
            { id: "modern_industrialization:adamant_large_plate", count: 1 }
        ],
        upgradesTo: "modern_industrialization:electric_mi_furnace"
    },
    'modern_industrialization:steel_mixer': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:large_motor", count: 1 },
            { id: "milf:tempered_glass", count: 5 },
            { id: "modern_industrialization:aluminum_rotor", count: 1 }
        ],
        upgradesTo: "modern_industrialization:electric_mixer"
    },
    'modern_industrialization:steel_cutting_machine': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:large_motor", count: 1 },
            { id: "modern_industrialization:invar_rotary_blade", count: 2 },
            { id: "modern_industrialization:conveyor", count: 2 }
        ],
        upgradesTo: "modern_industrialization:electric_cutting_machine"
    },
    'modern_industrialization:steel_wiremill': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:large_motor", count: 1 },
            { id: "modern_industrialization:steel_rod_magnetic", count: 3 },
            { id: "modern_industrialization:adamant_curved_plate", count: 5 }
        ],
        upgradesTo: "modern_industrialization:electric_wiremill"
    },
    'modern_industrialization:steel_macerator': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:large_motor", count: 2 },
            { id: "modern_industrialization:invar_rotary_blade", count: 2 },
            { id: "modern_industrialization:adamant_bolt", count: 12 }
        ],
        upgradesTo: "modern_industrialization:electric_macerator"
    },
    'modern_industrialization:steel_compressor': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:piston", count: 2 },
            { id: "modern_industrialization:adamant_large_plate", count: 4 },
            { id: "modern_industrialization:fluid_pipe", count: 4 }
        ],
        upgradesTo: "modern_industrialization:electric_compressor"
    },
    'extended_industrialization:steel_bending_machine': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:piston", count: 1 },
            { id: "modern_industrialization:adamant_curved_plate", count: 3 },
            { id: "modern_industrialization:fluid_pipe", count: 4 }
        ],
        upgradesTo: "extended_industrialization:electric_bending_machine"
    },
    'modern_industrialization:steel_unpacker': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:piston", count: 1 },
            { id: "modern_industrialization:motor", count: 1 },
            { id: "modern_industrialization:adamant_ring", count: 6 }
        ],
        upgradesTo: "modern_industrialization:electric_unpacker"
    },
    'modern_industrialization:steel_packer': {
        upgradeMaterials: [
            { id: "modern_industrialization:basic_machine_hull", count: 1 },
            { id: "modern_industrialization:piston", count: 1 },
            { id: "modern_industrialization:motor", count: 1 },
            { id: "modern_industrialization:adamant_ring", count: 6 }
        ],
        upgradesTo: "modern_industrialization:electric_packer"
    },

    //#endregion

    'modern_industrialization:lv_diesel_generator': {
        upgradeMaterials: [
            { id: "modern_industrialization:large_pump", count: 1 },
            { id: "modern_industrialization:adamant_gear", count: 2 },
            { id: "modern_industrialization:electrum_cable", count: 4 },
            { id: "modern_industrialization:plastic_large_plate", count: 4 }
        ],
        upgradesTo: "modern_industrialization:mv_diesel_generator"
    },

    'modern_industrialization:mv_diesel_generator': {
        upgradeMaterials: [
            { id: "modern_industrialization:stainless_steel_gear", count: 2 },
            { id: "modern_industrialization:advanced_pump", count: 1 },
            { id: "modern_industrialization:turbo_machine_hull", count: 1 },
            { id: "modern_industrialization:digital_circuit", count: 1 },
        ], 
        upgradesTo: "modern_industrialization:hv_diesel_generator"
    },

    'modern_industrialization:lv_steam_turbine': {
        upgradeMaterials: [
            { id: "modern_industrialization:large_motor", count: 3 },
            { id: "modern_industrialization:electrum_cable", count: 4 },
            { id: "modern_industrialization:aluminum_rotor", count: 1 },
            { id: "modern_industrialization:plastic_large_plate", count: 4 }
        ],
        upgradesTo: "modern_industrialization:mv_steam_turbine"
    },

    'modern_industrialization:mv_steam_turbine': {
        upgradeMaterials: [
            { id: "modern_industrialization:stainless_steel_rotor", count: 2 },
            { id: "modern_industrialization:advanced_motor", count: 1 },
            { id: "modern_industrialization:turbo_machine_hull", count: 1 },
            { id: "modern_industrialization:digital_circuit", count: 1 },
        ], 
        upgradesTo: "modern_industrialization:hv_steam_turbine"
    },

    "modern_industrialization:steel_item_input_hatch": {
        upgradeMaterials: [
            { id: "ae2:import_bus", count: 1 },
            { id: "milf:basic_machine_bit", count: 4 }
        ],
        upgradesTo: "modern_industrialization:advanced_item_input_hatch" 
    },
    "modern_industrialization:steel_fluid_input_hatch": {
        upgradeMaterials: [
            { id: "ae2:import_bus", count: 1 },
            { id: "milf:basic_machine_bit", count: 4 }
        ],
        upgradesTo: "modern_industrialization:advanced_fluid_input_hatch"
    },
    "modern_industrialization:steel_item_output_hatch": {
        upgradeMaterials: [
            { id: "ae2:export_bus", count: 1 },
            { id: "milf:basic_machine_bit", count: 4 }
        ],
        upgradesTo: "modern_industrialization:advanced_item_output_hatch"
    },
    "modern_industrialization:steel_fluid_output_hatch": {
        upgradeMaterials: [
            { id: "ae2:export_bus", count: 1 },
            { id: "milf:basic_machine_bit", count: 4 }
        ],
        upgradesTo: "modern_industrialization:advanced_fluid_output_hatch"
    },

}

const HATCH_MATERIALS = {
    "bronze": { upgradeMaterials: [{ id: "milf:steel_machine_bit", count: 4 }], nextTierMaterial: "steel" },
    //"steel": { upgradeMaterials: [{ id: "modern_industrialization:advanced_machine_hull", count: 1 }], nextTierMaterial: "advanced" },
    "advanced": { upgradeMaterials: [{ id: "modern_industrialization:turbo_machine_hull", count: 1 }], nextTierMaterial: "turbo" },
    "turbo": { upgradeMaterials: [{ id: "modern_industrialization:highly_advanced_machine_hull", count: 1 }], nextTierMaterial: "highly_advanced" },
}

const ENERGY_HATCH_TIERS = {
    "ie": { upgradeMaterials: [{ id: "milf:basic_machine_bit", count: 4 }], nextTierMaterial: "lv" },
    "lv": { upgradeMaterials: [{ id: "modern_industrialization:advanced_machine_hull", count: 1 }], nextTierMaterial: "mv" },
    "mv": { upgradeMaterials: [{ id: "modern_industrialization:turbo_machine_hull", count: 1 }], nextTierMaterial: "hv" },
    "hv": { upgradeMaterials: [{ id: "modern_industrialization:highly_advanced_machine_hull", count: 1 }], nextTierMaterial: "ev" },
    "ev": { upgradeMaterials: [{ id: "modern_industrialization:quantum_machine_hull", count: 1 }], nextTierMaterial: "superconductor" },
}

const HATCHES = {
    "item_input": { modId: "modern_industrialization" },
    "item_output": { modId: "modern_industrialization" },
    "fluid_input": { modId: "modern_industrialization" },
    "fluid_output": { modId: "modern_industrialization" },
    "mixed_input": { modId: "yet_another_industrialization" },
    "mixed_output": { modId: "yet_another_industrialization" },
}

const ENERGY_HATCHES = {
    "energy_input": { modId: "modern_industrialization" },
    "energy_output": { modId: "modern_industrialization" },
}

Object.entries(HATCH_MATERIALS).forEach(([material, materialData], index) => {
    let { upgradeMaterials, nextTierMaterial } = materialData
    Object.entries(HATCHES).forEach(([hatchType, hatchlData], index) => {
        let { modId } = hatchlData
        global.MI_UPGRADES[`${modId}:${material}_${hatchType}_hatch`] = {
            upgradeMaterials: upgradeMaterials,
            upgradesTo: `${modId}:${nextTierMaterial}_${hatchType}_hatch`
        }
    })
})

Object.entries(ENERGY_HATCH_TIERS).forEach(([material, materialData], index) => {
    let { upgradeMaterials, nextTierMaterial } = materialData
    Object.entries(ENERGY_HATCHES).forEach(([hatchType, hatchlData], index) => {
        let { modId } = hatchlData
        global.MI_UPGRADES[`${modId}:${material}_${hatchType}_hatch`] = {
            upgradeMaterials: upgradeMaterials,
            upgradesTo: `${modId}:${nextTierMaterial}_${hatchType}_hatch`
        }
    })
})