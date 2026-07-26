ServerEvents.recipes(event => {
    event.forEachRecipe({ output: "#another_furniture:drawers", input: "#minecraft:wooden_slabs" }, recipe => {
        //console.log(recipe.originalJson);
        transformShapedRecipe(event, recipe,
            originalPattern => {
                originalPattern[0] = "   "
                originalPattern[2] = "#B#"
                return originalPattern
            },
            originalKey => {
                originalKey.B = { item: "ytech:wooden_box" }
                return originalKey
            }
        )
    })
})

