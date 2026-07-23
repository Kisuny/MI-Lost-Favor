ServerEvents.recipes(event => {

    var tier1bp = "Mysterious Blueprint"
    var tier2bp = "Storage Blueprint"
    var tier3bp = "Automation Blueprint"
    var tier4bp = "Quantum Blueprint"
    var tier5bp = "Divine Blueprint"

    var tier1token = "milf:mysterious_disk"
    var tier2token = "milf:storage_disk"
    var tier3token = "milf:automation_disk"
    var tier4token = "milf:quantum_disk"

    function blueprint_recipe(inputs, output, bpTier) {
        ieBlueprintRecipe(event, {
            inputItems: inputs,
            outputItems: [[output]],
            category: bpTier,
            removeRecipe: true,
            compatOff: true
        })
    }

    // #region tier 1
    blueprint_recipe(
        [
            [{ "item": "ae2:fluix_crystal" }, 3],
            [{ "item": "moderndynamics:item_pipe" }, 1]
        ],
        { "item": "ae2:fluix_glass_cable" },
        tier1bp
    );

    blueprint_recipe(
        [
            [{ "item": "ae2:fluix_crystal" }, 5],
            [{ "item": "modern_industrialization:advanced_item_input_hatch" }, 1],
            [{ "item": "modern_industrialization:advanced_item_output_hatch" }, 1],
            [{ "item": "moderndynamics:item_pipe" }, 1]
        ],
        { "item": "ae2:storage_bus" },
        tier1bp
    );

    blueprint_recipe(
        [
            [{ "item": "ae2:fluix_crystal" }, 3],
            [{ "item": "modern_industrialization:rubber_sheet" }, 12],
            [{ "item": "modern_industrialization:basic_machine_hull" }, 1],
            [{ "item": "modern_industrialization:certus_quartz_plate" }, 4]
        ],
        { "item": "modern_industrialization:microbial_fabricator" },
        tier1bp
    );

    blueprint_recipe(
        [
            [{ "item": "ae2:fluix_crystal" }, 4],
            [{ "item": "ae2:terminal" }, 1],
            [{ "item": "minecraft:crafting_table" }, 1],
            [{ "item": "modern_industrialization:electronic_circuit" }, 1],
            [{ "item": "modern_industrialization:cupronickel_wire_magnetic" }, 8]
        ],
        { "item": "ae2:crafting_terminal" },
        tier1bp
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 4],
            [{ "item": "modern_industrialization:advanced_machine_hull" }, 1],
            [{ "item": "modern_industrialization:electronic_circuit" }, 1],
            [{ "item": "modern_industrialization:copper_wire" }, 16]
        ],
        { "item": "ae2:charger" },
        tier1bp
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 4],
            [{ "item": "modern_industrialization:advanced_machine_hull" }, 1],
            [{ "item": "modern_industrialization:electronic_circuit" }, 1],
            [{ "item": "modern_industrialization:piston" }, 4],
            [{ "item": "modern_industrialization:motor" }, 4]
        ],
        { "item": "ae2:inscriber" },
        tier1bp
    );

    blueprint_recipe(
        [
            [{ "item": "ae2:certus_quartz_crystal" }, 4],
            [{ "item": "modern_industrialization:wrench" }, 1]
        ],
        { "item": "ae2:certus_quartz_wrench" },
        tier1bp
    );
    //#endregion

    // #region tier 2
    blueprint_recipe(
        [
            [{ "tag": "c:plates/aluminum" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
            [{ "tag": "c:ingots/steel" }, 2],
            [{ "tag": "c:dusts/silicon" }, 2]
        ],
        { "item": "ae2:silicon_press" },
        tier2bp
    );

    blueprint_recipe(
        [
            [{ "tag": "c:plates/aluminum" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
            [{ "tag": "c:ingots/steel" }, 2],
            [{ "tag": "c:dusts/gold" }, 2]
        ],
        { "item": "ae2:logic_processor_press" },
        tier2bp
    );

    blueprint_recipe(
        [
            [{ "tag": "c:plates/aluminum" }, 16],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 12],
            [{ "tag": "c:ingots/steel" }, 6],
            [{ "tag": "c:dusts/certus_quartz" }, 4]
        ],
        { "item": "milf:cell_press" },
        tier2bp
    );

    blueprint_recipe(
        [
            [{ "tag": "c:plates/aluminum" }, 2],
            [{ "item": "milf:cell_half" }, 2],
            [{ "tag": "c:bolts/aluminum" }, 8]
        ],
        { "item": "ae2:item_cell_housing" },
        tier2bp
    );

    blueprint_recipe(
        [
            [{ "tag": "c:plates/copper" }, 2],
            [{ "item": "milf:cell_half" }, 2],
            [{ "tag": "c:bolts/copper" }, 8]
        ],
        { "item": "ae2:fluid_cell_housing" },
        tier2bp
    );
    //#endregion

    // #region tier 3
    blueprint_recipe(
        [
            [{ "tag": "c:plates/aluminum" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
            [{ "item": "forbidden_arcanus:obsidiansteel_ingot" }, 4],
            [{ "item": "forbidden_arcanus:corrupti_dust" }, 16],
            [{ "item": "ae2:certus_quartz_dust" }, 2]
        ],
        { "item": "ae2:calculation_processor_press" },
        tier3bp
    );

    blueprint_recipe(
        [
            [{ "tag": "c:plates/aluminum" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
            [{ "item": "forbidden_arcanus:obsidiansteel_ingot" }, 4],
            [{ "item": "forbidden_arcanus:corrupti_dust" }, 16],
            [{ "tag": "c:dusts/aluminum" }, 2]
        ],
        { "item": "ae2:engineering_processor_press" },
        tier3bp
    );

    blueprint_recipe(
        [
            [{ "tag": "c:plates/aluminum" }, 16],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 12],
            [{ "tag": "c:ingots/steel" }, 6],
            [{ "tag": "c:dusts/certus_quartz" }, 4]
        ],
        { "item": "milf:core_press" },
        tier3bp
    );
    //#endregion

    // #region tier 4
    blueprint_recipe(
        [
            [{ "tag": "c:plates/stainless_steel" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
            [{ "item": "modern_industrialization:stainless_steel_ingot" }, 4],
            [{ "item": "modern_industrialization:ruby_dust" }, 16],
            [{ "item": "ae2:certus_quartz_dust" }, 2]
        ],
        { "item": "advanced_ae:quantum_processor_press" },
        tier4bp
    );

    blueprint_recipe(
        [
            [{ "tag": "c:plates/stainless_steel" }, 4],
            [{ "item": "modern_industrialization:certus_quartz_rod" }, 8],
            [{ "item": "modern_industrialization:stainless_steel_ingot" }, 4],
            [{ "item": "ae2:fluix_dust" }, 16],
            [{ "item": "ae2:certus_quartz_dust" }, 2]
        ],
        { "item": "megacells:accumulation_processor_press" },
        tier4bp
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:celestigem_curved_plate" }, 16],
            [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 8],
            [{ "item": "modern_industrialization:piston" }, 32],
            [{ "item": "ae2:fluix_dust" }, 4]
        ],
        { "item": "ae2:condenser" },
        tier4bp
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:celestigem_large_plate" }, 8],
            [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 8],
            [{ "item": "spectrum:bedrock_dust" }, 16],
            [{ "item": "modern_industrialization:chemical_reactor" }, 1]
        ],
        { "item": "advanced_ae:reaction_chamber" },
        tier4bp
    );
    //#endregion

    // #region tier 5

    blueprint_recipe(
        [
            [{ "item": "spectrum:pure_malachite" }, 4],
            [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 8],
            [{ "item": "spectrum:moonstone_shard" }, 8],
            [{ "item": "modern_industrialization:assembler" }, 1]
        ],
        { "item": "extendedae:crystal_assembler" },
        tier5bp
    );

    blueprint_recipe(
        [
            [{ "item": "spectrum:pure_malachite" }, 4],
            [{ "item": "modern_industrialization:stainless_steel_large_plate" }, 8],
            [{ "item": "modern_industrialization:invar_rotary_blade" }, 4],
            [{ "item": "modern_industrialization:electric_cutting_machine" }, 1]
        ],
        { "item": "extendedae:circuit_cutter" },
        tier5bp
    );

    //#endregion

});