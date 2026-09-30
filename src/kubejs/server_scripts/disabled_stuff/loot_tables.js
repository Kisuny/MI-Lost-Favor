LootJS.lootTables(event => {

    //const lootTypes = [LootType.UNKNOWN,LootType.CHEST, LootType.ENTITY, LootType.FISHING, LootType.ARCHAEOLOGY, LootType.VAULT, LootType.GIFT, LootType.PIGLIN_BARTER, LootType.GENERIC]
    const lootTypes = LootType.values().map(type => type.name()).map(typeName => LootType[typeName])
    let itemEntries = global.disabledItems

    //console.log(lootTypes);
    

    //console.log(itemEntries);
    

    itemEntries.forEach(entry => {
        let itemId = entry.id
        let replaceWithId = entry.replaceData.id
        let regexMapping = entry.replaceData.regexMapping
        //console.log(regexMapping);
        
        if (regexMapping) {
            getItemIdsByRegex(itemId).forEach(id => {
                let match = id.match(itemId)
                let material = match[1]
                replaceInAllTables(id, regexMapping(material))
            })
            return
        }
        if (replaceWithId == null) {
            removeFromAllTables(itemId)
        } else {
            let isReplaced = false
            entry.replaceData.in.forEach(replaceInfo => {
                switch (replaceInfo) {
                    case "LOOT_TABLES":
                        replaceInAllTablesWithRegexCheck(itemId, replaceWithId)
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
        if (isRegex(itemId)){
            getItemIdsByRegex(itemId).forEach(id => {
                event.modifyLootTables(lootTypes).removeItem(ItemFilter.item(id, false), true)
            })
            return
        }
        event.modifyLootTables(lootTypes).removeItem(ItemFilter.item(itemId, false), true)
        // lootTypes.forEach(loot_type => {
        //     const lootName = (loot_type && typeof loot_type.name === 'function') ? loot_type.name() : String(loot_type)
        //     event.modifyLootTables(loot_type).removeItem(itemId, true)
        // })
    }

    function replaceInAllTablesWithRegexCheck(itemId, replaceWithId) {
        //console.log(itemId, replaceWithId);
        if (isRegex(itemId)){
            getItemIdsByRegex(itemId).forEach(id => {
                event.modifyLootTables(lootTypes).replaceItem(ItemFilter.item(id, false), replaceWithId, true)
            })
            return
        }

        replaceInAllTables(itemId, replaceWithId)
        //event.modifyLootTables(lootTypes).replaceItem(ItemFilter.item(itemId, false), replaceWithId, true)
        
    }

    function replaceInAllTables(itemId, replaceWithId) {
        event.modifyLootTables(lootTypes).replaceItem(ItemFilter.item(itemId, false), replaceWithId, true)
    } 

    function isRegex(id){
        try {
            new RegExp(id)
            return true
        } catch (error) {
            return false
        }
    }

})