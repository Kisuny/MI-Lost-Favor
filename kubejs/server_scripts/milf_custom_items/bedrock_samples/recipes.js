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
                    [{ item: "modern_industrialization:copper_drill" }, 1, 0.40]
                ],
                outputItems: [
                    [{ item: oreEntry.oreData?.deepslate || oreEntry.oreData.normal }, 1, 0.45],
                    [{ item: "minecraft:gravel"}, 1, 0.75],
                    [{ item: "minecraft:dirt" }, 1, 0.45]
                ],
                custom_condition: `${oreEntry.bedrockSampleId}`
            })

            miMachineRecipe(event, {
                energy: 3, time: 240, machine: "modern_industrialization:quarry",
                inputItems: [
                    [{ item: "modern_industrialization:bronze_drill" }, 1, 0.30]
                ],
                outputItems: [
                    [{ item: oreEntry.oreData?.deepslate || oreEntry.oreData.normal }, 1, 0.65],
                    [{ item: "minecraft:cobblestone" }, 1, 0.55],
                    [{ item: "minecraft:gravel" }, 1, 0.55]
                ],
                custom_condition: `${oreEntry.bedrockSampleId}`
            })

            miMachineRecipe(event, {
                energy: 4, time: 120, machine: "modern_industrialization:quarry",
                inputItems: [
                    [{ item: "modern_industrialization:gold_drill" }, 1, 0.65]
                ],
                outputItems: [
                    [{ item: oreEntry.oreData?.deepslate || oreEntry.oreData.normal }, 1, 0.9],
                    [{ item: "minecraft:sandstone" }, 1, 0.65],
                    [{ item: "minecraft:andesite" }, 1, 0.25],
                    [{ item: "minecraft:diorite" }, 1, 0.25],
                    [{ item: "minecraft:granite" }, 1, 0.25]
                ],
                custom_condition: `${oreEntry.bedrockSampleId}`
            })
        }

        if (oreEntry.oreTier == 1) {
            miMachineRecipe(event, {
                energy: 4, time: 360, machine: "modern_industrialization:quarry",
                inputItems: [
                    [{ item: "modern_industrialization:bronze_drill" }, 1, 0.45]
                ],
                outputItems: [
                    [{ item: oreEntry.oreData?.deepslate || oreEntry.oreData.normal }, 1, 0.5],
                    [{ item: "minecraft:gravel" }, 1, 0.75]
                ],
                custom_condition: `${oreEntry.bedrockSampleId}`
            })

            miMachineRecipe(event, {
                energy: 4, time: 260, machine: "modern_industrialization:quarry",
                inputItems: [
                    [{ item: "modern_industrialization:steel_drill" }, 1, 0.3]
                ],
                outputItems: [
                    [{ item: oreEntry.oreData?.deepslate || oreEntry.oreData.normal }, 1, 0.7],
                    [{ item: "minecraft:cobblestone" }, 1, 0.55],
                    [{ item: "minecraft:cobbled_deepslate" }, 1, 0.85],
                    [{ item: "minecraft:gravel" }, 1, 0.55]
                ],
                custom_condition: `${oreEntry.bedrockSampleId}`
            })
        }

        if (oreEntry.oreTier == 2) {
            miMachineRecipe(event, {
                energy: 4, time: 600, machine: "modern_industrialization:quarry",
                inputItems: [
                    [{ item: "modern_industrialization:aluminum_drill" }, 1, 0.6]
                ],
                outputItems: [
                    [{ item: oreEntry.oreData?.deepslate || oreEntry.oreData.normal }, 1, 0.9],
                    [{ item: "minecraft:cobbled_deepslate" }, 1, 0.75],
                    [{ item: "minecraft:tuff" }, 1, 0.3]
                ],
                custom_condition: `${oreEntry.bedrockSampleId}`
            })
        }


    })
})

MIRecipeEvents.customCondition(event => {

    global.oresWithSamples.forEach(oreEntry => {

        let bedrockSampleId = oreEntry.bedrockSampleId        

        event.registerWithIcon(`${bedrockSampleId}`,
            (context, recipe) => {

                let blockBelow = context.level.getBlock(context.blockEntity.blockPos.below()[context.blockEntity.orientation.facingDirection.getOpposite().getName()]()).id
                if (blockBelow == bedrockSampleId) {
                    return true
                }      
                
                return false
            },
            Item.of(`${bedrockSampleId}`),
            Text.translatable(`milf.mi_condition.quarry`, Item.getItem(bedrockSampleId).getDescription())
        )

    })
})