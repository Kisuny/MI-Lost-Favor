// https://github.com/evanbones/emi-plus-plus/issues/38
ClientEvents.generateAssets("after_mods", (event) => {
    /**
     * Add a new group to EMI++
     * @param {Special.Mod | 'pack' | 'c'} mod
     * @param {string} name The name of the group
     * @param {'group' | 'tag' | 'regex'} type
     * @param {Special.ItemTag | Special.Item[]} data
     */
    function add(mod, name, type, data) {
        const file = `${mod}:stack_groups/${name}`
        const obj = { type: `emixx:${type}` }

        if (type === "group") {
            obj.contents = data
        } else if (type === "tag") {
            obj.tag = data
        } else if (type === "regex") {
            obj.type = "emixx:group"
            obj.contents = Ingredient.of(new RegExp(data)).itemIds.toArray()
        }

        event.json(file, obj)
    }

    for (const entry of global.emixxGroups) {
        if (entry.type === "tag") {
            add(entry.mod || "milf", entry.name, "tag", entry.tag)
        } else if (entry.type === "group") {
            add(entry.mod || "milf", entry.name, "group", entry.items)
        }
    }
})
