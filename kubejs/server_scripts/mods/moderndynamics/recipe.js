ServerEvents.recipes(event => {
    
    const replaceItems = ["copper", "iron"]

    replaceItems.forEach(item => {
        event.replaceInput(
            { input: `minecraft:${item}_ingot`, mod: "moderndynamics" },
            `minecraft:${item}_ingot`,
            `modern_industrialization:${item}_plate`
        )
    })

})

KubeJSTweaks.beforeRecipes(event => {    

    // const disableByRecipeID = [
    //     /moderndynamics:cable.*/
    // ]

    // disableByRecipeID.forEach(id => {
    //     event.disable(id)
    // })

})