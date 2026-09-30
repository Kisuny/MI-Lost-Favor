ClientEvents.generateAssets("before_mods", event => {

    Object.entries(global.electromagnetRecipes).forEach(([inputId, recipeData]) => {

        let { outputId } = recipeData

        let json = {
            "type": "emi:world_interaction",
            "left": {
                "type": "item",
                "id": `${inputId}`,
            },
            "right": {
                "type": "item",
                "id": "immersiveengineering:electromagnet"
            },
            "output": `item:${outputId}`
        }

        event.json(`emi:recipe/additions/${outputId.split(":")[1]}`, json)

    })

})