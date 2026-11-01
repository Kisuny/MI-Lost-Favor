const lootReplacements = [
    { item: "minecraft:iron_ingot", replace_item: "minecraft:raw_iron" },
    { item: "minecraft:gold_ingot", replace_item: "minecraft:raw_gold" },
    { item: "minecraft:gold_block", replace_item: "minecraft:raw_gold_block", skipBlockTables: true },
    { item: "minecraft:iron_block", replace_item: "minecraft:raw_iron_block", skipBlockTables: true },
    { item: "minecraft:copper_ingot", replace_item: "minecraft:raw_copper" },
    { item: "minecraft:copper_block", replace_item: "minecraft:raw_copper_block", skipBlockTables: true },
    { item: "minecraft:leather", replace_item: "ytech:raw_hide" },
    { item: "ytech:crushed_gold", replace_item: "modern_industrialization:gold_dust"},
    { item: "ytech:crushed_cassiterite", replace_item: "modern_industrialization:tin_dust"}
]

LootJS.lootTables(event => {
    event.getLootTableIds().forEach(location => {
        let id = String(location)
        let isBlockTable = id.includes(":blocks/")
        let table = event.getLootTable(id)

        lootReplacements.forEach(entry => {
            if (entry.skipBlockTables && isBlockTable) return
            table.replaceItem(ItemFilter.item(entry.item, false), entry.replace_item, true)
        })
    })

    event.modifyLootTables(LootType.BLOCK).replaceItem(ItemFilter.item("minecraft:stick", false), "milf:twig", true)
})

LootJS.modifiers(event => {
    let modifier = event.addTableModifier(LootType.CHEST, LootType.ENTITY, LootType.FISHING, LootType.ARCHAEOLOGY, LootType.VAULT, LootType.GIFT, LootType.PIGLIN_BARTER, LootType.GENERIC)

    lootReplacements.forEach(entry => {
        modifier.replaceLoot(entry.item, entry.replace_item, true)
    })
})
