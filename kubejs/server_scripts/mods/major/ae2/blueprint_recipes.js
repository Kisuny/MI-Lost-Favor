ServerEvents.recipes(event => {

    // #region tier 1

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "ae2:fluix_crystal" }, 1],
            [{ "item": "ae2:quartz_glass" }, 1],
            [{ "tag": "modern_industrialization:item_pipes" }, 3]
        ],
        outputItems: [[{ "item": "ae2:fluix_glass_cable" }, 3]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "ae2:fluix_crystal" }, 5],
            [{ "item": "modern_industrialization:steel_item_input_hatch" }, 1],
            [{ "item": "modern_industrialization:steel_item_output_hatch" }, 1],
            [{ "item": "ae2:fluix_glass_cable" }, 1]
        ],
        outputItems: [[{ "item": "ae2:storage_bus" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "ae2:quartz_glass" }, 6],
            [{ "item": "immersiveengineering:light_bulb" }, 16],
            [{ "item": "immersiveengineering:resonanz_engineering" }, 1],
            [{ "item": "modern_industrialization:certus_quartz_large_plate" }, 4],
            [{ "item": "architects_palette:hazard_sign" }, 4]
        ],
        outputItems: [[{ "item": "mi_tweaks:microbial_fabricator" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "ae2:terminal" }, 1],
            [{ "item": "modern_industrialization:certus_quartz_plate" }, 4],
            [{ "item": "oritech:flux_gate" }, 1],
            [{ "item": "minecraft:crafting_table" }, 1]

        ],
        outputItems: [[{ "item": "ae2:crafting_terminal" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_plate" }, 6],
            [{ "item": "oritech:flux_gate" }, 1],
            [{ "item": "immersiveengineering:charging_station" }, 1],
            [{ "item": "spectrum:amethyst_powder" }, 13],
        ],
        outputItems: [[{ "item": "ae2:charger" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_plate" }, 6],
            [{ "item": "oritech:flux_gate" }, 1],
            [{ "item": "modern_industrialization:steel_compressor" }, 1],
            [{ "item": "milf:basic_motor" }, 2],
            [{ "item": "spectrum:amethyst_powder" }, 11],
        ],
        outputItems: [[{ "item": "ae2:inscriber" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 2],
            [{ "item": "modern_industrialization:certus_quartz_plate" }, 2],
            [{ "item": "modern_industrialization:wrench" }, 1],
        ],
        outputItems: [[{ "item": "ae2:certus_quartz_wrench" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "oritech:fluxite" }, 4],
            [{ "item": "modern_industrialization:electrum_wire" }, 4],
            [{ "item": "immersiveengineering:component_electronic_adv" }, 1],
            [{ "item": "modern_industrialization:rubber_sheet" }, 6],
            [{ "item": "modern_industrialization:steel_curved_plate" }, 4],
        ],
        outputItems: [[{ "item": "oritech:flux_gate" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "oritech:fluxite" }, 2],
            [{ "item": "ae2:charged_certus_quartz_crystal" }, 2],
            [{ "item": "modern_industrialization:copper_fine_wire" }, 4],
            [{ "item": "oritech:flux_gate" }, 1],
            [{ "item": "milf:lens" }, 4],
            [{ "item": "modern_industrialization:tumbaga_curved_plate" }, 4],
        ],
        outputItems: [[{ "item": "milf:rangefinder" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "milf:steel_infused_glass" }, 1],
            [{ "item": "modern_industrialization:steel_large_plate" }, 2],
            [{ "item": "modern_industrialization:steel_bolt" }, 8],
            [{ "item": "oritech:flux_gate" }, 1],
            [{ "item": "milf:rangefinder" }, 1],
            [{ "item": "oritech:enderic_lens" }, 1],
        ],
        outputItems: [[{ "item": "oritech:target_designator" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "oritech:flux_gate" }],
            [{ "item": "milf:lens" }, 1],
            [{ "item": "modern_industrialization:electrum_wire" }, 4],
            [{ "item": "ae2:charged_certus_quartz_crystal" }, 4],
            [{ "item": "modern_industrialization:iron_large_plate" }, 2],
        ],
        outputItems: [[{ "item": "oritech:enderic_lens" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    //#endregion

    // #region tier 2

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:silicon_steel_bolt" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_large_plate" }, 1],
            [{ "item": "oritech:plastic_sheet" }, 4],
        ],
        outputItems: [[{ "item": "ae2:silicon_press" }]],
        category: MILF_BLUEPRINTS.tier2AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:silicon_steel_bolt" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_large_plate" }, 1],
            [{ "item": "modern_industrialization:electronic_circuit_board" }, 1],
        ],
        outputItems: [[{ "item": "ae2:logic_processor_press" }]],
        category: MILF_BLUEPRINTS.tier2AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:biosteel_bolt" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 4],
            [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 1],
            [{ "item": "ae2:logic_processor" }, 4],
        ],
        outputItems: [[{ "item": "ae2:engineering_processor_press" }]],
        category: MILF_BLUEPRINTS.tier2AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "modern_industrialization:aluminum_bolt" }, 4],
            [{ "item": "modern_industrialization:adamant_rod" }, 4],
            [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 1],
            [{ "item": "ae2:logic_processor" }, 4],
        ],
        outputItems: [[{ "item": "ae2:calculation_processor_press" }]],
        category: MILF_BLUEPRINTS.tier2AE,
        removeRecipe: true
    })

})