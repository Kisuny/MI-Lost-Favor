ServerEvents.recipes(event => {


    function ae_circuit_cutter_recipe(input,output){
        let recipe = {
            "type": "extendedae:circuit_cutter",
            "output": {
                "count": output[1],
                "id": output[0]
            }
        }
        recipe.input = {"ingredient": input}
        event.custom(recipe)
    }

    ae_circuit_cutter_recipe({"item" : "extendedae:entro_block"}, ["extendedae:concurrent_processor_print", 1])

    ae_circuit_cutter_recipe({"item" : "megacells:sky_steel_block"}, ["megacells:printed_accumulation_processor", 16])
    ae_circuit_cutter_recipe({"item" : "ae2:quartz_block"}, ["ae2:printed_calculation_processor", 8])
    ae_circuit_cutter_recipe({"item" : "modern_industrialization:aluminum_block"}, ["ae2:printed_engineering_processor", 16])
    ae_circuit_cutter_recipe({"item" : "minecraft:gold_block"}, ["ae2:printed_logic_processor", 16])
    ae_circuit_cutter_recipe({"item" : "advanced_ae:quantum_alloy_block"}, ["advanced_ae:printed_quantum_processor", 16])
    ae_circuit_cutter_recipe({"tag" : "c:storage_blocks/silicon"}, ["ae2:printed_silicon", 16])


})