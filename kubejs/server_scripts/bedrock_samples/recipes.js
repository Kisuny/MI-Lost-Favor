ServerEvents.recipes(event => {
    global.oresWithSamples.forEach(oreEntry => {
        oritechDrillRecipe(event, {
            time: 1,
            inputItems: [[{ item: oreEntry.bedrockSampleId }, 1]],
            outputItems: [[{ item: oreEntry.oreData.raw}, 1]]
        })

        if (oreEntry.oreTier == 0){
            miMachineRecipe(event, {
                energy: 4, time: 300, machine: "modern_industrialization:quarry",
                inputItems: [
                    [{ item: "modern_industrialization:copper_drill" }, 1, 0.45]
                ],
                outputItems: [
                    [{ item: oreEntry.oreData?.deepslate || oreEntry.oreData.normal }, 1, 0.45],
                    [{ item: "minecraft:gravel"}, 1, 0.75]
                ],
                custom_condition: `${oreEntry.bedrockSampleId}`
            })
        }




    })
})

MIRecipeEvents.customCondition(event => {

    global.oresWithSamples.forEach(oreEntry => {

        let bedrockSampleId = oreEntry.bedrockSampleId        

        event.register(`${bedrockSampleId}`,
            (context, recipe) => {

                let blockBelow = context.level.getBlock(context.blockEntity.blockPos.below()[context.blockEntity.orientation.facingDirection.getOpposite().getName()]()).id
                if (blockBelow == bedrockSampleId) {
                    return true
                }      
                
                return false
            },
            Text.translatable(`milf.mi_condition.quarry`, Item.getItem(bedrockSampleId).getDescription())
        )

    })
})