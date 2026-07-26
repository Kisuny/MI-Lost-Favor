ServerEvents.recipes(event => {
    PLACER_BLOCKS.forEach(block => {
        const templateName = block.slice(5, -7)
        //const template = NBTIO.read(`kubejs/data/${PLACER_BLOCKS_TO_ITEM_NAME_MAP[block].split(':')[0]}/structure/multiblocks/${templateName}.nbt`)
        const template = NBT_HELPER.getNBTCompoundTag(PLACER_BLOCKS_TO_ITEM_NAME_MAP[block].split(':')[0], templateName, event.resourceManager)
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
                [{item:block}]
            ]
        })

    })

})
