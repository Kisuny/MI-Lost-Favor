NetworkEvents.dataReceived('milf_divine_mint_server_loot_data', (event) => {

    let player = event.getPlayer()
    let data = event.data

    for (let tierID of data.getAllKeys()) {

        let tierBosses = data.get(tierID)

        for (let bossID of tierBosses.getAllKeys()) {

            let itemArray = tierBosses.get(bossID)
            let jsItemArray = []

            itemArray.forEach(compoundTag => {

                for (let itemID of compoundTag.getAllKeys()) {
                    let itemDataTag = compoundTag.get(itemID)

                    let chance = itemDataTag.getFloat("chance")
                    let count = itemDataTag.getString("count")

                    let jsObject = {}
                    jsObject[itemID] = { chance: chance, count: count }

                    jsItemArray.push(jsObject)

                }

            })

            milfBosses[tierID][bossID] = Object.assign({}, milfBosses[tierID][bossID], { loot: jsItemArray })

        }

    }

})