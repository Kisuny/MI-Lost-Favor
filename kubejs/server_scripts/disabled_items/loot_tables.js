LootJS.lootTables(event => {

    const lootTypes = [LootType.CHEST, LootType.ENTITY, LootType.FISHING, LootType.ARCHAEOLOGY, LootType.VAULT, LootType.GIFT, LootType.PIGLIN_BARTER, LootType.GENERIC]
    let itemEntries = global.disabledItems

    //console.log(itemEntries);
    

    itemEntries.forEach(entry => {
        let itemId = entry.id
        let replaceWithId = entry.replaceData.id
        if (replaceWithId == null) {
            removeFromAllTables(itemId)
        } else {
            let isReplaced = false
            entry.replaceData.in.forEach(replaceInfo => {
                switch (replaceInfo) {
                    case "LOOT_TABLES":
                        replaceInAllTables(itemId, replaceWithId)
                        isReplaced = true
                        break
                }
            })

            if (!isReplaced) {
                removeFromAllTables(itemId)
            }

        }
    })

    function removeFromAllTables(itemId){
        //console.log(itemId);
        
        event.modifyLootTables(lootTypes).removeItem(ItemFilter.item(itemId, false), true)
        // lootTypes.forEach(loot_type => {
        //     const lootName = (loot_type && typeof loot_type.name === 'function') ? loot_type.name() : String(loot_type)
        //     event.modifyLootTables(loot_type).removeItem(itemId, true)
        // })
    }

    function replaceInAllTables(itemId, replaceWithId) {
        //console.log(itemId, replaceWithId);

        event.modifyLootTables(lootTypes).replaceItem(ItemFilter.item(itemId, false), replaceWithId, true)
        
        // lootTypes.forEach(loot_type => {
        //     const lootName = (loot_type && typeof loot_type.name === 'function') ? loot_type.name() : String(loot_type)
        //     event.modifyLootTables(loot_type).replaceItem(itemId, replaceWithId, true)
        // })
    }



})