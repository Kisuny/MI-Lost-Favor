ServerEvents.recipes(event => {

    const REMOVE_BY_OUTPUT = [
        "extendedae:quartz_blend",
        "ae2:quartz_glass",
        "ae2:quartz_vibrant_glass",
        "extendedae:caner",
        "justdirethings:paradoxmachine"
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
    });
})