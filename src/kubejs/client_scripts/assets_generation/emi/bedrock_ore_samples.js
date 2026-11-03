ClientEvents.generateAssets("before_mods", event => {

    global.oresWithSamples.forEach((oreEntry) => {

        let json = {
            "type": "emi:world_interaction",
            "left": {
                "type": "item",
                "id": `minecraft:bedrock`,
                "remainder": `item:${oreEntry.oreData.raw}`
            },
            "right": {
                "type": "item",
                "id": "immersiveengineering:sample_drill",
                "remainder": `item:immersivepetroleum:oil_can`
                
            },
            "output": `item:milf:bedrock_${oreEntry.itemName}_ore_sample`
        }

        //console.log(json);

        event.json(`emi:recipe/additions/bedrock_${oreEntry.itemName}_ore_sample`, json)

    })

})