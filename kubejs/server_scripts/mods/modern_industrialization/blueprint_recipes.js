ServerEvents.recipes(event => {

    let miBasicComponents = "MI Basic Components"
    let miComponents = "MI Components"
    let miTools = "Useful Tools"

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "modern_industrialization:steel_ring" }, 1],
            [{ "item": "minecraft:flint" }, 1]
        ],
        outputItems: [[{ "item": "minecraft:flint_and_steel" }]],
        category: miTools,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "modern_industrialization:steel_ring" }, 6],
            [{ "item": "yo_hooks:iron_hook_head" }, 1],
            [{ "item": "minecraft:stick" }, 1]
        ],
        outputItems: [[{ "item": "yo_hooks:iron_grappling_hook" }]],
        category: miTools,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "modern_industrialization:steel_curved_plate" }, 2],
            [{ "item": "modern_industrialization:steel_nugget" }, 1],
            [{ "item": "modern_industrialization:iron_plate" }, 1]
        ],
        outputItems: [[{ "item": "measurements:tape_measure" }]],
        category: miTools,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "immersiveengineering:component_iron" }, 2],
            [{ "item": "modern_industrialization:copper_drill_head" }, 1],
            [{ "item": "milf:small_steel_fluid_container" }, 1],
            [{ "item": "modern_industrialization:iron_large_plate" }, 4],
            [{ "item": "modern_industrialization:diamond_dust" }, 3]
        ],
        outputItems: [[{ "item": "modern_industrialization:steam_mining_drill" }]],
        category: miTools,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "immersiveengineering:component_iron" }, 2],
            [{ "item": "modern_industrialization:copper_curved_plate" }, 4],
            [{ "item": "milf:small_steel_fluid_container" }, 1],
            [{ "item": "modern_industrialization:iron_large_plate" }, 4],
            [{ "item": "modern_industrialization:diamond_dust" }, 3],
            [{ "item": "modern_industrialization:rubber_sheet" }, 6]
        ],
        outputItems: [[{ "item": "extended_industrialization:steam_chainsaw" }]],
        category: miTools,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "tag": "c:rods/steel" }, 2],
            [{ "item": "modern_industrialization:copper_fine_wire" }, 8],
            [{ "item": "modern_industrialization:tin_cable" }, 2],
            [{ "item": "modern_industrialization:steel_rod_magnetic" }, 1]
        ],
        outputItems: [[{ "item": "modern_industrialization:motor" }]],
        category: miComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "tag": "c:dusts/glowstone" }, 4],
            [{ "tag": "c:rods/steel" }, 2],
            [{ "item": "modern_industrialization:copper_fine_wire" }, 8],
            [{ "item": "milf:lens" }, 2],
            [{ "item": "modern_industrialization:analog_circuit" }, 1],
        ],
        outputItems: [[{ "item": "milf:rangefinder" }]],
        category: miComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "modern_industrialization:rubber_sheet" }, 6],
            [{ "item": "modern_industrialization:motor" }, 2],
            [{ "item": "modern_industrialization:tin_cable" }, 1],
        ],
        outputItems: [[{ "item": "modern_industrialization:conveyor" }]],
        category: miComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "tag": "c:plates/steel" }, 3],
            [{ "tag": "c:rods/steel" }, 2],
            [{ "tag": "c:gears/steel" }, 1],
            [{ "item": "modern_industrialization:motor" }, 1],
            [{ "item": "modern_industrialization:tin_cable" }, 2],
        ],
        outputItems: [[{ "item": "modern_industrialization:piston" }]],
        category: miComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "tag": "c:bolts/tin" }, 2],
            [{ "item": "moderndynamics:fluid_pipe" }, 3],
            [{ "item": "modern_industrialization:motor" }, 1],
            [{ "item": "modern_industrialization:tin_rotor" }, 3],
        ],
        outputItems: [[{ "item": "modern_industrialization:pump" }]],
        category: miComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "tag": "c:plates/battery_alloy" }, 4],
            [{ "item": "modern_industrialization:analog_circuit" }, 1],
            [{ "item": "modern_industrialization:battery_alloy_curved_plate" }, 2],
            [{ "item": "modern_industrialization:tin_cable"}, 2],
        ],
        outputItems: [[{ "item": "modern_industrialization:portable_storage_unit" }]],
        category: miComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "tag": "c:rods/steel" }, 2],
            [{ "item": "modern_industrialization:analog_circuit" }, 1],
            [{ "item": "modern_industrialization:motor" }, 2],
            [{ "item": "modern_industrialization:piston" }, 1],
            [{ "item": "modern_industrialization:tin_cable"}, 3],
        ],
        outputItems: [[{ "item": "modern_industrialization:robot_arm" }]],
        category: miComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "tag": "c:bolts/steel" }, 1],
            [{ "tag": "c:plates/aluminum" }, 2],
            [{ "item": "modern_industrialization:analog_circuit" }, 1],
            [{ "item": "milf:cd" }, 1],
            [{ "item": "modern_industrialization:motor" }, 1],
            [{ "item": "modern_industrialization:copper_fine_wire" }, 8],
        ],
        outputItems: [[{ "item": "milf:cd_reader" }]],
        category: miComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "tag": "c:tiny_dusts/diamond" }, 16],
            [{ "tag": "c:plates/invar" }, 4],
            [{ "item": "immersiveengineering:sawblade" }, 1],
        ],
        outputItems: [[{ "item": "modern_industrialization:invar_rotary_blade" }]],
        category: miComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "modern_industrialization:steel_large_plate" }, 5],
            [{ "item": "modern_industrialization:steel_plate" }, 4],
            [{ "item": "modern_industrialization:steel_bolt" }, 32],
        ],
        outputItems: [[{ "item": "milf:bits_mold" }]],
        category: miComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "oritech:magnetic_coil" }, 2],
            [{ "item": "modern_industrialization:copper_plate" }, 4],
            [{ "item": "modern_industrialization:iron_rod" }, 2],
            [{ "item": "immersiveengineering:wirecoil_electrum_ins" }, 2],
        ],
        outputItems: [[{ "item": "milf:basic_motor" }]],
        category: miBasicComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "milf:basic_motor" }, 1],
            [{ "item": "modern_industrialization:copper_rotor" }, 2],
            [{ "item": "modern_industrialization:copper_curved_plate" }, 2],
            [{ "item": "moderndynamics:fluid_pipe" }, 2],
        ],
        outputItems: [[{ "item": "milf:basic_pump" }]],
        category: miBasicComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "milf:basic_motor" }, 2],
            [{ "item": "modern_industrialization:rubber_sheet" }, 8],
            [{ "item": "immersiveengineering:wirecoil_electrum_ins" }, 2],
        ],
        outputItems: [[{ "item": "modern_industrialization:conveyor" }]],
        category: miBasicComponents,
        removeRecipe: true
    })

    ieBlueprintCraft(event, {
        inputItems: [
            [{ "item": "milf:basic_motor" }, 2],
            [{ "item": "milf:basic_pump" }, 1],
            [{ "item": "modern_industrialization:analog_circuit" }, 1],
            [{ "item": "modern_industrialization:conveyor" }, 1],
        ],
        outputItems: [[{ "item": "modern_industrialization:basic_upgrade" }]],
        category: miBasicComponents,
        removeRecipe: true
    })

})
