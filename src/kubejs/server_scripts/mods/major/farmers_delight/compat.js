ServerEvents.recipes(event => {




})


KubeJSTweaks.beforeRecipes(event => {

    const disableByRecipeID = [
        "farmersdelight:wheat_dough_from_eggs"
    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })

})