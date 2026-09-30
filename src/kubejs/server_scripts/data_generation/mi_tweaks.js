ServerEvents.generateData("before_mods", event => {

    Object.entries(global.miTweaksMachinesData).forEach(([machineId, data]) => {
        event.json(`mi_tweaks:loot_table/blocks/${machineId}`, {
            "type": "minecraft:block",
            "pools": [
                {
                    "bonus_rolls": 0.0,
                    "conditions": [
                        {
                            "condition": "minecraft:survives_explosion"
                        }
                    ],
                    "entries": [
                        {
                            "type": "minecraft:item",
                            "name": `mi_tweaks:${machineId}`
                        }
                    ],
                    "rolls": 1.0
                }
            ],
            "random_sequence": `mi_tweaks:blocks/${machineId}`
        })
    })
    
})