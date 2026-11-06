Object.entries({
    "iron_items_1": [
        {
            itemId: [

                'minecraft:iron_shovel', 
                'minecraft:iron_axe', 
                'minecraft:iron_hoe', 
                'minecraft:iron_sword', 

                "farmersdelight:iron_knife",
                "minecraft:bucket",
                "minecraft:water_bucket",
                "minecraft:cod_bucket",
                "minecraft:salmon_bucket",
                "minecraft:tropical_fish_bucket",
                "minecraft:pufferfish_bucket",
                "minecraft:axolotl_bucket",
                "minecraft:tadpole_bucket",
                "minecraft:lava_bucket",
                "minecraft:milk_bucket"

            ],
            replaceWith: "immersiveengineering:seed"
        }
    ],

    "iron_items_2": [
        {
            itemId: [

                'minecraft:iron_pickaxe',
                'minecraft:iron_helmet',
                'minecraft:iron_chestplate',
                'minecraft:iron_leggings',
                'minecraft:iron_boots',

            ],
            replaceWith: "immersiveengineering:seed"
        }
    ],


}).forEach(([stageId, itemEntries]) => {

    AStages.customizeStage(stageId).whenGranted(event => {

        let player = event.getPlayer()
        if (player) {
            player.sendData("milf_new_stage", {
                stage: stageId
            })
        }

    })

    itemEntries.forEach(itemEntry => {
        itemRestriction(stageId, itemEntry)
    })
})



function itemRestriction(stageId, itemEntry) {

    let { itemId, replaceWith } = itemEntry

    let itemIds = Array.isArray(itemId) ? itemId : [itemId]

    AStages.addRestrictionForItem(`${stageId}/item/${itemIds[0]}`, stageId, itemIds)

    itemIds.forEach(id => {

        AStages.addRestrictionForLoot(`${stageId}/loot/${id}`, stageId)
            .applyEverywhere()
            .restrictItems([id])
            .replacer(stack => {
                if (stack.id == id) {
                    return Item.of(replaceWith, stack.getCount())
                }

                return stack
            })
    })

}