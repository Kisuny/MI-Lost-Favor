ClientEvents.generateAssets("before_mods", event => {

    Object.entries(global.PLACER_BLOCK_TO_ITEM_NAME_MAP).forEach(([placerId, itemName]) => {

        let json = {
            "type": "emi:world_interaction",
            "left": {
                "type": "item",
                "id": `${placerId}`,
                "remainder": `item:${placerId.replace("_placer", "_empty_box")}`
            },
            "right": {
                "type": "item",
                "id": "immersiveengineering:hammer",
                "chance": 0
            },
            "output": `item:${itemName}`
        }

        //console.log(json);

        event.json(`emi:recipe/additions/${placerId.replace("milf:", "")}`, json)

    })

})
