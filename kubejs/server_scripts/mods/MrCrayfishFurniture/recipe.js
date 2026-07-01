ServerEvents.recipes(event => {
    cfmFryingCraft(event, {
        inputItems: [[{ tag: "milf:sweet_berries" }]],
        outputItems: [[{ id: "refurbished_furniture:sweet_berry_jam" }]],
        removeRecipe: true,
        compatOff:true
    })

    milfShaped(event, {
        pattern: [
            'SBS',
            'PCP',
            'PPP'
        ],
        key: {
            S: { tag: "minecraft:wooden_slabs" },
            C: { item: "immersiveengineering:light_engineering" },
            P: { tag: "minecraft:planks" },
            B: { item: "immersiveengineering:sawblade" }
        },
        outputItems: [[{ id: "refurbished_furniture:workbench" }, 1]],
        removeRecipe: true
    })
})