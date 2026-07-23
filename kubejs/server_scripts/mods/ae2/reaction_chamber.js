ServerEvents.recipes(event => {

    let craft_removal_list = [
        "extendedae:entro_crystal"
    ]

    function ae_reaction_chamber_recipe(items,output,fluid,energy,fluidOut){
        energy = energy || 20000
        let recipe = {
            "type": "advanced_ae:reaction",
            "input_energy" : energy,
            "input_items": [],
            "output": {
                "#": output[1],
                "id": output[0]
            }
        }
        recipe.output["#t"] = fluidOut ? "ae2:f" : "ae2:i"
        recipe.input_fluid = Array.isArray(fluid) ? {"amount" : fluid[1]} : {"amount" : 1000}
        recipe.input_fluid.ingredient =  Array.isArray(fluid) ? {"fluid" : fluid[0]} : {"fluid" : "minecraft:water"}
        items.forEach(i => {
            let k = {"ingredient" : i[0]}
            k.amount = i[1]
            recipe.input_items.push(k)
        });
        event.custom(recipe)
        craft_removal_list.push(output[0])
    }


    ae_reaction_chamber_recipe(
        [
            [{ "item": "advanced_ae:quantum_alloy" }, 8],
            [{ "item": "extendedae:entro_crystal" }, 4],
            [{ "item": "advanced_ae:quantum_storage_component" }, 1],

        ],
        ["advanced_ae:quantum_alloy_plate", 1], ["advanced_ae:quantum_infusion_source", 1000], 444444
    )

    ae_reaction_chamber_recipe(
        [
            [{ "item": "ae2:fluix_dust" }, 3],
            [{ "item": "ae2:fluix_crystal" }, 3],
            [{ "tag": "c:ender_pearls" }, 1],

        ],
        ["ae2:fluix_pearl", 1], {}, 44444
    )

    ae_reaction_chamber_recipe(
        [
            [{ "item": "ae2:singularity" }, 1],
            [{ "item": "megacells:sky_steel_ingot" }, 1],
            [{ "item": "megacells:sky_bronze_ingot" }, 1],

        ],
        ["advanced_ae:quantum_alloy", 2], ["advanced_ae:quantum_infusion_source", 1000], 444444
    )

    ae_reaction_chamber_recipe(
        [
            [{ "item": "ae2:singularity" }, 1],
            [{ "item": "spectrum:pure_bloodstone" }, 1],
            [{ "item": "spectrum:doombloom_seed" }, 1],

        ],
        ["advanced_ae:shattered_singularity", 2], ["minecraft:lava", 1000], 444444
    )

    ae_reaction_chamber_recipe(
        [
            [{ "item": "spectrum:black_pigment" }, 16],
            [{ "tag": "c:ingots/steel" }, 4],
            [{ "item": "spectrum:bone_ash" }, 8],
            [{ "item": "spectrum:moonstone_powder" }, 8],
        ],
        ["megacells:sky_steel_ingot", 4], ["minecraft:lava", 1000], 4444
    )

    ae_reaction_chamber_recipe(
        [
            [{ "item": "spectrum:brown_pigment" }, 16],
            [{ "tag": "c:ingots/bronze" }, 4],
            [{ "item": "spectrum:bone_ash" }, 8],
            [{ "item": "spectrum:moonstone_powder" }, 8],
        ],
        ["megacells:sky_bronze_ingot", 4], ["minecraft:lava", 1000], 4444
    )

    event.forEachRecipe({output:craft_removal_list}, r => {
        event.remove({output: r.getOriginalRecipeResult()})
    })

})