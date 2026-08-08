ServerEvents.recipes(event => {

    let placerInputs = {}

    PLACER_BLOCKS.forEach(placerId => {

        let templateName = placerId.slice(5, -7)

        let template = NBT_HELPER.getNBTCompoundTag(PLACER_BLOCK_TO_ITEM_NAME_MAP[placerId].split(':')[0], templateName, event.resourceManager)

        let blocksCount = {}




        for(let i in template.blocks){
            let state = template.blocks.getCompound(i).state;
            let blockID = String(template.palette.getCompound(state).Name).slice(1, -1)
            if(blockID == "minecraft:air") continue
            blocksCount[blockID] ? blocksCount[blockID]++ : blocksCount[blockID] = 1
        }
        let inputItems = []
        Object.entries(blocksCount).forEach(([blockID, count]) => {
            if(blockID == "immersiveengineering:fluid_pump" || blockID == "immersiveengineering:tesla_coil") {
                inputItems.push([{item:blockID}, count / 2])
                return
            }
            inputItems.push([{item:blockID}, count])
        })
        miMachineRecipe(event, {energy:1, time:200, machine:"modern_industrialization:multiblock_packer_3000_safety_regulations_edition",
            inputItems:inputItems,
            outputItems:[
                [{item:placerId}]
            ]
        })

        placerInputs[placerId] = inputItems

    })

    let placerUpgrades = {
        "milf:radio_tower_placer": "milf:radio_transcriber_placer",
    }

    let placersTierUpgrades = {
        "milf:machine_assembler_placer": {
            toPlacerId: "milf:machine_assembler_shape_1_placer",
            excludeId: "mi_tweaks:machine_assembler"
        }
    }

    Object.entries(placerUpgrades).forEach(([fromPlacerId, toPlacerId]) => {
        placerUpgradeRecipe(fromPlacerId, toPlacerId)
    })

    Object.entries(placersTierUpgrades).forEach(([fromPlacerId, { toPlacerId, excludeId }]) => {
        placerUpgradeRecipe(fromPlacerId, toPlacerId, excludeId)
    })

    function placerUpgradeRecipe(fromPlacerId, toPlacerId, excludeId) {
        let fromInputs = placerInputs[fromPlacerId]
        let toInputs = placerInputs[toPlacerId]

        let additionalItems = getEntriesDifference(fromInputs, toInputs)

        additionalItems = additionalItems.filter(entry => entry[0].item != excludeId)

        miMachineRecipe(event, {
            energy: 1, time: 200, machine: "modern_industrialization:multiblock_packer_3000_safety_regulations_edition",
            inputItems: additionalItems.concat([[{ item: fromPlacerId }]]),
            outputItems: [
                [{ item: toPlacerId }]
            ]
        })
    }

})

function getEntriesDifference(entryArray1, entryArray2) {

    let itemsMap1 = new $HashMap()
    let itemsMap2 = new $HashMap()

    entryArray2.forEach(([entry, count]) => {
        itemsMap2.merge(entry.item, count, accCount => accCount + count)
    })

    entryArray1.forEach(([entry, count]) => {
        itemsMap1.merge(entry.item, count, accCount => accCount + count)
    })

    let diffMap = $Stream.concat(
        itemsMap1.entrySet().stream(),
        itemsMap2.entrySet().stream(),
    ).collect($Collectors.toMap(
        entry => entry.getKey(),
        entry => entry.getValue(),
        (oldValue, newValue) => Math.abs(oldValue - newValue)
    ))

    diffMap.entrySet().removeIf(entry => entry.getValue() == 0)

    //console.log(diffMap);

    let differenceArray = []

    diffMap.forEach((itemId, count) => {
        differenceArray.push([
            {item:itemId},
            count
        ])
    })

    //console.log(differenceArray);
    

    return differenceArray

}
