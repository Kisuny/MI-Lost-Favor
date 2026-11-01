LootJS.modifiers(event => {
    const ironOrGoldFilter = ItemFilter.anyOf(
        ItemFilter.item("minecraft:iron_ingot", false),
        ItemFilter.item("minecraft:gold_ingot", false),
    )

    const oreAddonLootTypes = [LootType.CHEST, LootType.ENTITY, LootType.FISHING, LootType.ARCHAEOLOGY, LootType.VAULT, LootType.GIFT, LootType.PIGLIN_BARTER, LootType.GENERIC]

    oreAddonLootTypes.forEach(type => {
        event.addTableModifier(type).group(group => {
            group.containsLoot(ironOrGoldFilter)
            group.pool(pool => {
                pool.when(c => c.randomChance(0.3))
                pool.addEntry(LootEntry.of("modern_industrialization:raw_tin", [1, 10]))
            })
            group.pool(pool => {
                pool.when(c => c.randomChance(0.3))
                pool.addEntry(LootEntry.of("minecraft:raw_copper", [1, 10]))
            })
        })
    })

})
