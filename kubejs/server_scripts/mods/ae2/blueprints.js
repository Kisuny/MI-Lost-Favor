ServerEvents.recipes(event => {

    // #region tier 1

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "ae2:fluix_crystal" }, 3],
            [{ "item": "moderndynamics:item_pipe" }, 1]
        ],
        outputItems: [[{ "item": "ae2:fluix_glass_cable" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "ae2:fluix_crystal" }, 5],
            [{ "item": "modern_industrialization:steel_item_input_hatch" }, 1],
            [{ "item": "modern_industrialization:steel_item_output_hatch" }, 1],
            [{ "item": "moderndynamics:item_pipe" }, 1]
        ],
        outputItems: [[{ "item": "ae2:storage_bus" }]],
        category: MILF_BLUEPRINTS.tier1AE,
        removeRecipe: true
    })

    ieBlueprintRecipe(event, {
        inputItems: [
            [{ "item": "oritech:fluxite" }, 12],
            [{ "item": "ae2:fluix_glass_cable" }, 4],
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
            [{ "item": "oritech:fluxite" }, 4],
            [{ "item": "ae2:terminal" }, 1],
            [{ "item": "modern_industrialization:certus_quartz_plate" }, 4],
            [{ "item": "immersiveengineering:component_electronic_adv" }, 1],
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
            [{ "item": "immersiveengineering:component_electronic_adv" }, 1],
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
            [{ "item": "immersiveengineering:component_electronic_adv" }, 1],
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

    //#endregion

    // #region tier 2
    // blueprint_recipe(
    //     [
    //         [{ "tag": "c:plates/aluminum" }, 4],
    //         [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
    //         [{ "tag": "c:ingots/steel" }, 2],
    //         [{ "tag": "c:dusts/silicon" }, 2]
    //     ],
    //     { "item": "ae2:silicon_press" },
    //     tier2bp
    // );

    // blueprint_recipe(
    //     [
    //         [{ "tag": "c:plates/aluminum" }, 4],
    //         [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
    //         [{ "tag": "c:ingots/steel" }, 2],
    //         [{ "tag": "c:dusts/gold" }, 2]
    //     ],
    //     { "item": "ae2:logic_processor_press" },
    //     tier2bp
    // );

    // blueprint_recipe(
    //     [
    //         [{ "tag": "c:plates/aluminum" }, 16],
    //         [{ "item": "modern_industrialization:certus_quartz_rod" }, 12],
    //         [{ "tag": "c:ingots/steel" }, 6],
    //         [{ "tag": "c:dusts/certus_quartz" }, 4]
    //     ],
    //     { "item": "milf:cell_press" },
    //     tier2bp
    // );

    // blueprint_recipe(
    //     [
    //         [{ "tag": "c:plates/aluminum" }, 2],
    //         [{ "item": "milf:cell_half" }, 2],
    //         [{ "tag": "c:bolts/aluminum" }, 8]
    //     ],
    //     { "item": "ae2:item_cell_housing" },
    //     tier2bp
    // );

    // blueprint_recipe(
    //     [
    //         [{ "tag": "c:plates/copper" }, 2],
    //         [{ "item": "milf:cell_half" }, 2],
    //         [{ "tag": "c:bolts/copper" }, 8]
    //     ],
    //     { "item": "ae2:fluid_cell_housing" },
    //     tier2bp
    // );
    // //#endregion

    // // #region tier 3
    // blueprint_recipe(
    //     [
    //         [{ "tag": "c:plates/aluminum" }, 4],
    //         [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
    //         [{ "item": "forbidden_arcanus:obsidiansteel_ingot" }, 4],
    //         [{ "item": "forbidden_arcanus:corrupti_dust" }, 16],
    //         [{ "item": "ae2:certus_quartz_dust" }, 2]
    //     ],
    //     { "item": "ae2:calculation_processor_press" },
    //     tier3bp
    // );

    // blueprint_recipe(
    //     [
    //         [{ "tag": "c:plates/aluminum" }, 4],
    //         [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
    //         [{ "item": "forbidden_arcanus:obsidiansteel_ingot" }, 4],
    //         [{ "item": "forbidden_arcanus:corrupti_dust" }, 16],
    //         [{ "tag": "c:dusts/aluminum" }, 2]
    //     ],
    //     { "item": "ae2:engineering_processor_press" },
    //     tier3bp
    // );

    // blueprint_recipe(
    //     [
    //         [{ "tag": "c:plates/aluminum" }, 16],
    //         [{ "item": "modern_industrialization:certus_quartz_rod" }, 12],
    //         [{ "tag": "c:ingots/steel" }, 6],
    //         [{ "tag": "c:dusts/certus_quartz" }, 4]
    //     ],
    //     { "item": "milf:hemispherical_press_mold" },
    //     tier3bp
    // );
    // //#endregion

    // // #region tier 4
    // blueprint_recipe(
    //     [
    //         [{ "tag": "c:plates/stainless_steel" }, 4],
    //         [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
    //         [{ "item": "modern_industrialization:stainless_steel_ingot" }, 4],
    //         [{ "item": "modern_industrialization:ruby_dust" }, 16],
    //         [{ "item": "ae2:certus_quartz_dust" }, 2]
    //     ],
    //     { "item": "advanced_ae:quantum_processor_press" },
    //     tier4bp
    // );

    // blueprint_recipe(
    //     [
    //         [{ "tag": "c:plates/stainless_steel" }, 4],
    //         [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
    //         [{ "item": "modern_industrialization:stainless_steel_ingot" }, 4],
    //         [{ "item": "ae2:fluix_dust" }, 16],
    //         [{ "item": "ae2:certus_quartz_dust" }, 2]
    //     ],
    //     { "item": "megacells:accumulation_processor_press" },
    //     tier4bp
    // );

    // blueprint_recipe(
    //     [
    //         [{ "item": "modern_industrialization:carbon_steel_curved_plate" }, 16],
    //         [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 8],
    //         [{ "item": "modern_industrialization:piston" }, 32],
    //         [{ "item": "ae2:fluix_dust" }, 4]
    //     ],
    //     { "item": "ae2:condenser" },
    //     tier4bp
    // );

    // blueprint_recipe(
    //     [
    //         [{ "item": "modern_industrialization:carbon_steel_large_plate" }, 8],
    //         [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 8],
    //         [{ "item": "spectrum:bedrock_dust" }, 16],
    //         [{ "item": "modern_industrialization:chemical_reactor" }, 1]
    //     ],
    //     { "item": "advanced_ae:reaction_chamber" },
    //     tier4bp
    // );
    // //#endregion

    // // #region tier 5

    // blueprint_recipe(
    //     [
    //         [{ "item": "spectrum:pure_malachite" }, 4],
    //         [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 8],
    //         [{ "item": "spectrum:moonstone_shard" }, 8],
    //         [{ "item": "modern_industrialization:assembler" }, 1]
    //     ],
    //     { "item": "extendedae:crystal_assembler" },
    //     tier5bp
    // );

    // blueprint_recipe(
    //     [
    //         [{ "item": "spectrum:pure_malachite" }, 4],
    //         [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 8],
    //         [{ "item": "modern_industrialization:invar_rotary_blade" }, 4],
    //         [{ "item": "modern_industrialization:electric_cutting_machine" }, 1]
    //     ],
    //     { "item": "extendedae:circuit_cutter" },
    //     tier5bp
    // );

    // //#endregion

})