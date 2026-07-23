ServerEvents.recipes(event => {

    var tier1token = "milf:mysterious_disk"
    var tier2token = "milf:storage_disk"
    var tier3token = "milf:automation_disk"
    var tier4token = "milf:quantum_disk"


    function inscriber_recipe(output,bottom,middle,top){
        let recipe = { 
            "type": "ae2:inscriber",
            "ingredients": {},
            "mode" : "incribe"
        }
        recipe.result = output[0]
        recipe.result.count = output[1]
        recipe.ingredients.bottom = bottom
        recipe.ingredients.middle = middle
        recipe.ingredients.top = top
        event.custom(recipe)
    }

    inscriber_recipe([{"id": tier1token}],{"item": "milf:storage_blueprint"},{"item": "milf:cd"},{"tag": "c:dusts/certus_quartz"})
    inscriber_recipe([{"id": tier2token}],{"item": "milf:automation_blueprint"},{"item": "milf:cd"},{"tag": "c:dusts/fluix"})
    inscriber_recipe([{ "id": tier3token }], { "item": "milf:quantum_blueprint" }, { "item": "milf:cd" }, { "item": "modern_industrialization:titanium_dust"})
    inscriber_recipe([{"id": tier4token}],{"item": "milf:divine_blueprint"},{"item": "milf:cd"},{"tag": "c:dusts/entro"})


})