ServerEvents.recipes(event => {
    let craft_removal_list = [
        "extendedae:entro_crystal"
    ]

    function ae_crystal_assembler_recipe(items,output,fluid){
        let recipe = {
            "type": "extendedae:crystal_assembler",
            "input_items": [],
            "output": {
                "count": output[1],
                "id": output[0]
            }
        }
        if(Array.isArray(fluid)){
            recipe.input_fluid = {"amount" : fluid[1]} 
            recipe.input_fluid.ingredient = {"fluid" : fluid[0]} 
        }
        items.forEach(i => {
            let k = {"ingredient" : i[0]}
            k.amount = i[1]
            recipe.input_items.push(k)
        });
        event.custom(recipe)
        craft_removal_list.push(output[0])
    }

    ae_crystal_assembler_recipe(
        [
            [{ "item": "extendedae:entro_shard" }, 8],
            [{ "item": "spectrum:doombloom_seed" }, 1],
        ],
        ["extendedae:entro_seed", 1], ["spectrum:liquid_crystal", 500]
    )

    ae_crystal_assembler_recipe(
        [
            [{ "item":"advanced_ae:quantum_storage_128"}, 2],
            [{ "item":"advanced_ae:quantum_unit"}, 1],
            [{ "item":"advanced_ae:quantum_accelerator"}, 1],
            [{ "item":"advanced_ae:quantum_processor"}, 4],
            [{ "item":"advanced_ae:shattered_singularity"}, 2],
            [{ "item":"advanced_ae:adv_pattern_provider"}, 1],
        ],
        ["advanced_ae:quantum_core",1], ["advanced_ae:quantum_infusion_source", 6000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"ae2:crafting_unit"}, 1],
            [{ "item":"advanced_ae:quantum_processor"}, 1],
            [{ "item":"advanced_ae:quantum_structure"}, 1],
        ],
        ["advanced_ae:quantum_unit",1], ["advanced_ae:quantum_infusion_source", 500]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"megacells:sky_steel_ingot"}, 4],
            [{ "item":"ae2:quartz_glass"}, 4],
        ],
        ["advanced_ae:quantum_structure", 2]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"spectrum:moonstone_powder"}, 4],
            [{ "item":"ae2:quartz_glass"}, 1],
            [{ "item":"extendedae:entro_ingot"}, 4],
            [{ "item":"modern_industrialization:stainless_steel_ingot"}, 4],
        ],
        ["extendedae:machine_frame", 1]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"megacells:sky_steel_ingot"}, 2],
            [{ "item":"megacells:sky_bronze_ingot"}, 2],
            [{ "item":"extendedae:entro_dust"}, 4],
            [{ "item":"ae2:ender_dust"}, 4],
        ],
        ["extendedae:entro_ingot", 4], ["spectrum:liquid_crystal", 2000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"advanced_ae:quantum_unit"}, 1],
            [{ "item":"advanced_ae:quantum_alloy_plate"}, 2],
            [{ "item":"advanced_ae:shattered_singularity"}, 4],
            [{ "item":"advanced_ae:quantum_storage_component"}, 1],
            [{ "item":"extendedae:concurrent_processor"}, 8],
        ],
        ["advanced_ae:quantum_storage_128",1], ["advanced_ae:quantum_infusion_source", 2000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"advanced_ae:quantum_unit"}, 1],
            [{ "item":"advanced_ae:quantum_alloy_plate"}, 2],
            [{ "item":"advanced_ae:shattered_singularity"}, 4],
            [{ "item":"megacells:mega_crafting_accelerator"}, 2],
            [{ "item":"extendedae:concurrent_processor"}, 8],
        ],
        ["advanced_ae:quantum_accelerator",1], ["advanced_ae:quantum_infusion_source", 2000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"advanced_ae:quantum_unit"}, 1],
            [{ "item":"advanced_ae:shattered_singularity"}, 4],
            [{ "item":"megacells:cell_component_256m"}, 1],
        ],
        ["advanced_ae:quantum_storage_256",1], ["advanced_ae:quantum_infusion_source", 1000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"advanced_ae:quantum_unit"}, 1],
            [{ "item":"advanced_ae:shattered_singularity"}, 8],
            [{ "item":"advanced_ae:quantum_storage_256"}, 2],
            [{ "item":"advanced_ae:quantum_alloy_plate"}, 2],
            [{ "item":"extendedae:concurrent_processor"}, 16],
        ],
        ["advanced_ae:data_entangler",1], ["advanced_ae:quantum_infusion_source", 4000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"advanced_ae:quantum_unit"}, 1],
            [{ "item":"advanced_ae:shattered_singularity"}, 8],
            [{ "item":"advanced_ae:quantum_accelerator"}, 4],
            [{ "item":"advanced_ae:quantum_alloy_plate"}, 2],
            [{ "item":"extendedae:concurrent_processor"}, 16],
        ],
        ["advanced_ae:quantum_multi_threader",1], ["advanced_ae:quantum_infusion_source", 4000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"extendedae:ex_molecular_assembler"}, 1],
            [{ "item":"advanced_ae:shattered_singularity"}, 4],
            [{ "item":"advanced_ae:quantum_accelerator"}, 2],
            [{ "item":"advanced_ae:quantum_alloy_plate"}, 1],
            [{ "item":"extendedae:concurrent_processor"}, 4],
        ],
        ["advanced_ae:quantum_crafter",1], ["advanced_ae:quantum_infusion_source", 2000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"extendedae:concurrent_processor"}, 4],
            [{ "item":"modern_industrialization:stainless_steel_rod_magnetic"}, 4],
            [{ "item":"extendedae:machine_frame"}, 1],
            [{ "item":"spectrum:storm_stone"}, 8],
        ],
        ["extendedae:crystal_fixer", 1]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"extendedae:machine_frame"}, 1],
            [{ "item":"extendedae:concurrent_processor"}, 2],
            [{ "item":"advanced_ae:quantum_processor"}, 1],
            [{ "item":"megacells:accumulation_processor"}, 4],
            [{ "item":"ae2:engineering_processor"}, 8],
            [{ "item":"ae2:calculation_processor"}, 16],
            [{ "item":"ae2:logic_processor"}, 32],
        ],
        ["ae2:controller",1], ["advanced_ae:quantum_infusion_source", 1000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"extendedae:entro_ingot"}, 4],
        ],
        ["extendedae:entro_block", 1]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"advanced_ae:shattered_singularity"}, 4],
            [{ "item":"advanced_ae:quantum_alloy_plate"}, 2],
            [{ "item":"extendedae:concurrent_processor"}, 16],
            [{ "item":"advanced_ae:quantum_processor"}, 4],
            [{ "item":"minecraft:netherite_helmet"}, 1],
            [{ "item":"ae2:wireless_access_point"}, 1],
        ],
        ["advanced_ae:quantum_helmet",1], ["advanced_ae:quantum_infusion_source", 2000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"advanced_ae:shattered_singularity"}, 4],
            [{ "item":"advanced_ae:quantum_alloy_plate"}, 2],
            [{ "item":"extendedae:concurrent_processor"}, 16],
            [{ "item":"advanced_ae:quantum_processor"}, 4],
            [{ "item":"minecraft:netherite_chestplate"}, 1],
            [{ "item":"ae2:wireless_access_point"}, 1],
        ],
        ["advanced_ae:quantum_chestplate",1], ["advanced_ae:quantum_infusion_source", 2000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"advanced_ae:shattered_singularity"}, 4],
            [{ "item":"advanced_ae:quantum_alloy_plate"}, 2],
            [{ "item":"extendedae:concurrent_processor"}, 16],
            [{ "item":"advanced_ae:quantum_processor"}, 4],
            [{ "item":"minecraft:netherite_leggings"}, 1],
            [{ "item":"ae2:wireless_access_point"}, 1],
        ],
        ["advanced_ae:quantum_leggings",1], ["advanced_ae:quantum_infusion_source", 2000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"advanced_ae:shattered_singularity"}, 4],
            [{ "item":"advanced_ae:quantum_alloy_plate"}, 2],
            [{ "item":"extendedae:concurrent_processor"}, 16],
            [{ "item":"advanced_ae:quantum_processor"}, 4],
            [{ "item":"minecraft:netherite_boots"}, 1],
            [{ "item":"ae2:wireless_access_point"}, 1],
        ],
        ["advanced_ae:quantum_boots",1], ["advanced_ae:quantum_infusion_source", 2000]
    );

    ae_crystal_assembler_recipe(
        [
            [{ "item":"ae2:advanced_card"}, 4],
            [{ "item":"advanced_ae:quantum_alloy_plate"}, 1],
            [{ "item":"extendedae:concurrent_processor"}, 4],
            [{ "item":"advanced_ae:quantum_processor"}, 1],
        ],
        ["advanced_ae:quantum_upgrade_base",1], ["advanced_ae:quantum_infusion_source", 500]
    );

    event.forEachRecipe({output:craft_removal_list}, r => {
        event.remove({output: r.getOriginalRecipeResult()})
    })

})