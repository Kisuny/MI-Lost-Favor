ServerEvents.recipes(event => {
    global.oresWithSamples.forEach(oreEntry => {
        oritechDrillRecipe(event, {
            time: 1,
            inputItems: [[{ item: oreEntry.bedrockSampleId }, 1]],
            outputItems: [[{ item: oreEntry.oreData.raw}, 1]]
        })
    })
})