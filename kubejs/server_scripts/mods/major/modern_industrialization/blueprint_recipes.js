ServerEvents.recipes(event => {

    //#region craftingComponents

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:rubber_sheet" }, 1],
            [{ "item": "modern_industrialization:gold_plate" }, 2],
            [{ "item": "modern_industrialization:copper_wire" }, 2]
        ],
        outputItems: [[{ "item": "modern_industrialization:capacitor" }]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipeType: "minecraft:crafting_shaped",
        compatOff:true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:rubber_sheet" }, 2],
            [{ "item": "modern_industrialization:copper_plate" }, 2],
            [{ "item": "modern_industrialization:copper_wire" }, 2]
        ],
        outputItems: [[{ "item": "modern_industrialization:analog_circuit_board" }]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipeType: "minecraft:crafting_shaped",
        compatOff: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "minecraft:paper" }, 3],
            [{ "item": "modern_industrialization:coal_dust" }, 2],
            [{ "item": "modern_industrialization:copper_wire" }, 1]
        ],
        outputItems: [[{ "item": "modern_industrialization:resistor" }, 5]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipeType: "minecraft:crafting_shaped",
        compatOff: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:steel_rod" }, 1],
            [{ "item": "modern_industrialization:copper_wire" }, 6]
        ],
        outputItems: [[{ "item": "modern_industrialization:inductor" }, 1]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipeType: "minecraft:crafting_shaped",
        compatOff: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:inductor" }, 1],
            [{ "item": "modern_industrialization:resistor" }, 3],
            [{ "item": "modern_industrialization:capacitor" }, 2],
            [{ "item": "modern_industrialization:analog_circuit_board" }, 1],
            [{ "item": "modern_industrialization:copper_wire" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:analog_circuit" }, 1]],
        category: MILF_BLUEPRINTS.craftingComponents,
        removeRecipeType: "minecraft:crafting_shaped",
        compatOff: true
    })

    //#endregion

    //#region usefulTools

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:steel_nugget" }, 6],
            [{ "item": "modern_industrialization:steel_curved_plate" }, 1],
            [{ "item": "modern_industrialization:steel_ring" }, 1],
            [{ "item": "immersiveengineering:stick_treated" }, 2]
        ],
        outputItems: [[{ "item": "immersiveengineering:wirecutter" }]],
        category: MILF_BLUEPRINTS.usefulTools,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "immersiveengineering:component_iron" }, 2],
            [{ "item": "modern_industrialization:copper_drill_head" }, 1],
            [{ "item": "milf:small_steel_fluid_container" }, 1],
            [{ "item": "modern_industrialization:iron_large_plate" }, 4],
            [{ "item": "modern_industrialization:diamond_dust" }, 3]
        ],
        outputItems: [[{ "item": "modern_industrialization:steam_mining_drill" }]],
        category: MILF_BLUEPRINTS.usefulTools,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "immersiveengineering:component_iron" }, 2],
            [{ "item": "modern_industrialization:copper_curved_plate" }, 4],
            [{ "item": "milf:small_steel_fluid_container" }, 1],
            [{ "item": "modern_industrialization:iron_large_plate" }, 4],
            [{ "item": "modern_industrialization:diamond_dust" }, 3],
            [{ "item": "modern_industrialization:rubber_sheet" }, 6]
        ],
        outputItems: [[{ "item": "extended_industrialization:steam_chainsaw" }]],
        category: MILF_BLUEPRINTS.usefulTools,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "immersiveengineering:component_iron" }, 1],
            [{ "item": "milf:small_steel_fluid_container" }, 1],
            [{ "item": "minecraft:red_dye" }, 4],
            [{ "item": "modern_industrialization:rubber_sheet" }, 3],
            [{ "item": "modern_industrialization:steel_curved_plate" }, 2],
        ],
        outputItems: [[{ "item": "immersivepetroleum:oil_can" }]],
        category: MILF_BLUEPRINTS.usefulTools,
        removeRecipe: true
    })

    //#endregion

    //#region miBasicComponents

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "oritech:magnetic_coil" }, 2],
            [{ "item": "modern_industrialization:copper_plate" }, 4],
            [{ "item": "modern_industrialization:iron_rod" }, 2],
            [{ "item": "immersiveengineering:wirecoil_electrum_ins" }, 2],
        ],
        outputItems: [[{ "item": "milf:basic_motor" }]],
        category: MILF_BLUEPRINTS.miBasicComponents,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:battery_alloy_curved_plate" }, 6],
            [{ "item": "modern_industrialization:battery_alloy_plate" }, 2],
            [{ "item": "minecraft:redstone" }, 3],
            [{ "item": "immersiveengineering:wirecoil_electrum_ins" }, 2],
        ],
        outputItems: [[{ "item": "modern_industrialization:redstone_battery" }]],
        category: MILF_BLUEPRINTS.miBasicComponents,
        removeRecipeType: "minecraft:crafting_shaped",
        compatOff: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "milf:basic_motor" }, 1],
            [{ "item": "modern_industrialization:copper_rotor" }, 2],
            [{ "item": "modern_industrialization:copper_curved_plate" }, 2],
            [{ "item": "moderndynamics:fluid_pipe" }, 2],
        ],
        outputItems: [[{ "item": "milf:basic_pump" }]],
        category: MILF_BLUEPRINTS.miBasicComponents,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "milf:basic_motor" }, 2],
            [{ "item": "modern_industrialization:rubber_sheet" }, 8],
            [{ "item": "immersiveengineering:wirecoil_electrum_ins" }, 2],
        ],
        outputItems: [[{ "item": "modern_industrialization:conveyor" }]],
        category: MILF_BLUEPRINTS.miBasicComponents,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "milf:basic_motor" }, 2],
            [{ "item": "milf:basic_pump" }, 1],
            [{ "item": "modern_industrialization:analog_circuit" }, 1],
            [{ "item": "modern_industrialization:conveyor" }, 1],
        ],
        outputItems: [[{ "item": "modern_industrialization:basic_upgrade" }]],
        category: MILF_BLUEPRINTS.miBasicComponents,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:silicon_steel_plate" }, 4],
            [{ "item": "modern_industrialization:copper_wire" }, 2],
            [{ "item": "modern_industrialization:iron_rod" }, 2],
            [{ "item": "modern_industrialization:tin_cable" }, 2],
            [{ "item": "modern_industrialization:steel_rod_magnetic" }, 1]
        ],
        outputItems: [[{ "item": "modern_industrialization:motor" }]],
        category: MILF_BLUEPRINTS.miBasicComponents,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:silicon_steel_curved_plate" }, 2],
            [{ "item": "moderndynamics:fluid_pipe" }, 3],
            [{ "item": "modern_industrialization:motor" }, 1],
            [{ "item": "modern_industrialization:tin_rotor" }, 2],
        ],
        outputItems: [[{ "item": "modern_industrialization:pump" }]],
        category: MILF_BLUEPRINTS.miBasicComponents,
        removeRecipe: true
    })


    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:electronic_circuit_board" }, 1],
            [{ "item": "modern_industrialization:transistor" }, 2],
            [{ "item": "modern_industrialization:diode" }, 1],
            [{ "item": "immersiveengineering:component_electronic_adv" }, 1],
            [{ "item": "modern_industrialization:redstone_battery" }, 1],
            [{ "item": "modern_industrialization:electrum_cable" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:electronic_circuit" }]],
        category: MILF_BLUEPRINTS.miBasicComponents,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:diamond_tiny_dust" }, 55],
            [{ "item": "modern_industrialization:invar_large_plate" }, 1],
            [{ "item": "immersiveengineering:sawblade" }, 1],
            [{ "item": "immersiveengineering:wirecutter" }, 1],
        ],
        outputItems: [[{ "item": "modern_industrialization:invar_rotary_blade" }]],
        category: MILF_BLUEPRINTS.miBasicComponents,
        removeRecipe: true
    })

    //#endregion


    //#region miComponents

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:silicon_steel_large_plate" }, 4],
            [{ "item": "modern_industrialization:silicon_steel_plate" }, 3],
            [{ "item": "modern_industrialization:steel_rod_magnetic" }, 3],
            [{ "item": "modern_industrialization:copper_fine_wire" }, 12],
            [{ "item": "modern_industrialization:adamant_rod" }, 6],
            [{ "item": "modern_industrialization:tin_cable" }, 9],
        ],
        outputItems: [[{ "item": "modern_industrialization:large_motor" }]],
        category: MILF_BLUEPRINTS.miComponents,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:large_motor" }, 2],
            [{ "item": "modern_industrialization:silicon_steel_curved_plate" }, 4],
            [{ "item": "modern_industrialization:aluminum_rotor" }, 4],
            [{ "item": "milf:tempered_glass" }, 6],
        ],
        outputItems: [[{ "item": "modern_industrialization:large_pump" }]],
        category: MILF_BLUEPRINTS.miComponents,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:motor" }, 3],
            [{ "item": "modern_industrialization:steel_large_plate" }, 1],
            [{ "item": "modern_industrialization:steel_gear" }, 1],
            [{ "item": "modern_industrialization:steel_rod" }, 4],
            [{ "item": "modern_industrialization:silicon_steel_curved_plate" }, 4],
            [{ "item": "modern_industrialization:copper_fine_wire" }, 3],
        ],
        outputItems: [[{ "item": "modern_industrialization:piston" }]],
        category: MILF_BLUEPRINTS.miComponents,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:silicon_steel_curved_plate" }, 4],
            [{ "item": "modern_industrialization:silicon_steel_rod" }, 3],
            [{ "item": "modern_industrialization:electronic_circuit" }, 1],
            [{ "item": "modern_industrialization:motor" }, 2],
            [{ "item": "modern_industrialization:piston" }, 1],
        ],
        outputItems: [[{ "item": "modern_industrialization:robot_arm" }]],
        category: MILF_BLUEPRINTS.miComponents,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:battery_alloy_curved_plate" }, 6],
            [{ "item": "modern_industrialization:battery_alloy_plate" }, 2],
            [{ "item": "modern_industrialization:silicon_dust" }, 3],
            [{ "item": "modern_industrialization:electrum_cable" }, 2],
        ],
        outputItems: [[{ "item": "modern_industrialization:silicon_battery" }]],
        category: MILF_BLUEPRINTS.miBasicComponents,
        removeRecipeType: "minecraft:crafting_shaped",
        compatOff: true
    })

    //#endregion

    //#region 

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:silicon_steel_curved_plate" }, 4],
            [{ "item": "oritech:machine_ultimate_addon" }, 1],
            [{ "item": "milf:cd" }, 1],
            [{ "item": "modern_industrialization:motor" }, 1],
            [{ "item": "modern_industrialization:copper_fine_wire" }, 8],
        ],
        outputItems: [[{ "item": "milf:cd_reader" }]],
        category: MILF_BLUEPRINTS.tier2AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:adamant_machine_casing" }, 1],
            [{ "item": "modern_industrialization:adamant_curved_plate" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_plate" }, 4],
        ],
        outputItems: [[{ "item": "modern_industrialization:hardened_machine_casing" }]],
        category: MILF_BLUEPRINTS.tier2AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ item: "modern_industrialization:electronic_circuit" }, 1],
            [{ item: "modern_industrialization:electrum_fine_wire" }, 4],
            [{ item: "modern_industrialization:silicon_steel_plate" }, 4]
        ],
        outputItems: [
            [{ item: "milf:blank_card" }]
        ],
        category: MILF_BLUEPRINTS.tier2AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ item: "immersiveengineering:storage_steel" }, 4],
            [{ item: "modern_industrialization:silicon_steel_large_plate" }, 4]
        ],
        outputItems: [
            [{ item: "milf:cell_press" }]
        ],
        category: MILF_BLUEPRINTS.tier2AE,
        removeRecipe: true
    })

    //$endregion
})
