ServerEvents.recipes(event => {

    const REMOVE_BY_OUTPUT = [
        "extendedae:quartz_blend",
        "ae2:quartz_glass",
        "ae2:quartz_vibrant_glass",
        "extendedae:caner",
    ]

    //default recipes removal
    event.forEachRecipe({output:REMOVE_BY_OUTPUT}, r => {
        event.remove({output: r.getOriginalRecipeResult()})
    })

    event.remove({ type: 'ae2:inscriber' })
    event.remove({ type: 'extendedae:circuit_cutter' })
    /*
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⣀⠐⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣄⠀⣀⡑⠫⡀⡆⢀⣤⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⡀⠀⠠⣀⣀⣀⠠⠿⠚⠉⠀⠈⢂⣀⡵⠋⣽⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠱⣄⠀⢀⣁⠠⠤⠀⢀⣀⠀⠀⢠⠃⠀⢠⠋⠀⠀⠀⠀⠀ AE Horse
    ⠀⠀⠀⠀⠈⠂⠀⣀⡤⠒⠉⢀⡀⠤⠒⠙⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀
    ⠀⣀⠀⠈⠓⠎⠩⠁⠀⡀⣴⣍⠀⠀⠀⠀⠀⠀⣰⠀⠀⠀⠀⠀⠀⠀
    ⠀⠉⠙⠕⢦⡀⠀⠀⠀⠸⡁⠍⠀⠀⠀⠀⡀⠘⡉⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠈⠀⠈⠁⣒⣈⡠⠋⡆⠀⢰⠀⠀⠃⠀⡇⠀⠀⠀⠀⠀⠀⠀
    ⠀⡰⠊⠉⠉⠉⠉⣉⠄⠀⢀⠑⡀⠈⠀⠀⠀⡐⠀⠀⠀⠀⠀⠀⠀⠀
    ⢠⠁⣠⠄⠒⠈⠁⠀⠀⡐⢸⠀⢡⡀⠀⠀⡄⠀⡄⠀⠀⠀⠀⠀⠀⠀
    ⠀⢰⢃⠠⠤⠤⠀⡠⠊⠀⡄⠀⠸⡷⠀⠰⢧⠀⡇⠀⣀⠀⠀⠀⠀⠀
    ⠀⢸⠃⠀⠀⡤⠚⠁⢀⠂⠃⠀⠘⠤⢄⡤⠌⠀⡷⡀⠀⠉⠒⢤⠀⠀
    ⠀⠘⠀⠀⣼⠁⠀⡔⠁⢸⠀⠀⠀⠀⠀⠀⠀⠀⡇⢡⠀⠀⠀⠀⠱⠀
    ⠀⠀⠀⠀⢻⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⡄⠀⠀⠀⠀⠇
    ⠀⠀⠀⠀⠀⠙⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⡇⠀⠀⠀⠀⠠
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠈
    */

    const remove_by_output = [
        "extendedae:ex_inscriber"
    ]

    remove_by_output.forEach(id => {
            event.remove({ output: id })
        })


    const ingotToPlateAE2Replace = ["iron", "gold", ]
    ingotToPlateAE2Replace.forEach(element => {
        event.replaceInput(
        { mod: "ae2" },
        `minecraft:${element}_ingot`,
        `modern_industrialization:${element}_plate`
    )
    })
})

KubeJSTweaks.beforeRecipes(event => {

    const disableByRecipeID = [
        "ae2:smelting/silicon_from_certus_quartz_dust",
        "extendedae:smelting/quartz_blend",
        "ae2:blasting/silicon_from_certus_quartz_dust",
        "extendedae:blasting/quartz_blend",

        "spectrum:mod_integration/ae2/cinderhearth/silicon",
        "spectrum:mod_integration/ae2/cinderhearth/silicon_from_rock_crystal"
    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })

})