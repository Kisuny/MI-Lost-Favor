ServerEvents.tags("item", event => {


    let chests = event.get("sophisticatedstorage:all_storage").getObjectIds()
    let types = ["copper", "iron", "gold", "diamond", "netherite"]
    types.forEach(type => {
        let regex = new RegExp(`sophisticatedstorage:.*${type}.*`)
        chests.forEach(chest => {
            if (regex.test(chest.toString())) event.add(`milf:${type}_storage`, chest)
        })
    })

    Ingredient.of("@sophisticatedstorage").getItemIds().forEach(id => {
        let regex = new RegExp(`sophisticatedstorage:(.+?)_storage_connector`)
        if (regex.test(id)) event.add(`milf:soph_storage_connector`, id)
    })

})