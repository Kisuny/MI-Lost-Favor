

ClientEvents.generateAssets("before_mods", event => {

    Object.entries(global.MI_UPGRADES).forEach(([fromId, data]) => {
        let { upgradesTo } = data

        let json = {
            "type": "emi:world_interaction",
            "left": {
                "type": "item",
                "id": `${fromId}`,
            },
            "right": {
                "type": "item",
                "id": "milf:mi_upgrader"
            },
            "output": `item:${upgradesTo}`
        }

        event.json(`emi:recipe/additions/${upgradesTo.split(":")[1]}`, json)
    })

})