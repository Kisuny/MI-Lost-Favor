KubeJSTweaks.beforeRecipes(event => {

    const disableByRecipeID = [
        // netherexp:iron_scrap is not registered =\
        "netherexp:cooking/iron_nugget_from_iron_scrap",
    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })


})