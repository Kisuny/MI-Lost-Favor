ServerEvents.recipes(event => {
    cfmFryingCraft(event, {
        inputItems: [[{ tag: "milf:sweet_berries" }]],
        outputItems: [[{ id: "refurbished_furniture:sweet_berry_jam" }]],
        removeRecipe: true,
        compatOff:true
    })
})