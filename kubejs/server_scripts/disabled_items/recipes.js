ServerEvents.recipes(event => {
    let itemEntries = global.disabledItems

    itemEntries.forEach(entry => {
        let itemId = entry.id
        let replaceWithId = entry.replaceData.id
        if (replaceWithId == null){
            event.remove({ output: itemId })
        } else {
            let isReplaced = false
            entry.replaceData.in.forEach(replaceInfo => {
                switch (replaceInfo) {
                    case "RECIPE_INPUTS":
                        event.replaceInput({ input: itemId }, itemId, replaceWithId)
                        isReplaced = true
                        break

                    case "RECIPE_OUTPUTS":
                        event.replaceOutput({ output: itemId }, itemId, replaceWithId)
                        isReplaced = true
                        break
                }
            })

            if (!isReplaced){
                event.remove({ output: itemId })
            }

        }
    })
    

})