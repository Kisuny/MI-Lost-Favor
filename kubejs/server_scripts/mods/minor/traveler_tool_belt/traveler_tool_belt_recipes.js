ServerEvents.recipes(event => {
    yTechShaped(event, {
        pattern: [
            "SLS",
            "L#L",
            "SSS"
        ],
        key: {
            "#": { "tag": "ytech:bone_needles" },
            "L": { "item": "minecraft:leather" },
            "S": { "tag": "ytech:leather_strips" }
        },
        outputItems: [[{ id: "travelertoolbelt:belt" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    // I do this because replaceInput cannot replace tags.
    // This recipe also requires travelertoolbelt:belt_shaped recipe type.
    const upgrades = [
        { from: 'travelertoolbelt:belt', to: 'travelertoolbelt:copper_belt', plate: 'bronze' },
        { from: 'travelertoolbelt:copper_belt', to: 'travelertoolbelt:iron_belt', plate: 'steel' },
        { from: 'travelertoolbelt:iron_belt', to: 'travelertoolbelt:gold_belt', plate: 'aluminum' },
        { from: 'travelertoolbelt:gold_belt', to: 'travelertoolbelt:diamond_belt', plate: 'stainless_steel' }
    ];

    upgrades.forEach(upgrade => {
        event.custom({
            "type": "travelertoolbelt:belt_shaped",
            "category": "equipment",
            "key": {
                "A": {
                    "item": `modern_industrialization:${upgrade.plate}_plate`
                },
                "B": {
                    "item": upgrade.from
                }
            },
            "pattern": [
                " A ",
                "ABA",
                " A "
            ],
            "result": {
                "count": 1,
                "id": upgrade.to
            }
        })
        event.remove({ output: upgrade.to })
    })

    event.replaceInput({ output: 'travelertoolbelt:netherite_belt' }, 'minecraft:netherite_ingot', 'modern_industrialization:blastproof_alloy_plate')
})