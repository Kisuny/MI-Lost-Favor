LootJS.lootTables(event => {
    event.getLootTable("starcatcher:waterlogged_satchel/extra_loot").firstPool().addEntry("devices:orichalcum_coin")

    event
        .create("milf:fish_treasure")
        .createPool(pool => {
            pool.addEntry(
                LootEntry.reference("minecraft:gameplay/fishing/treasure").withWeight(200)
            )
            pool.addEntry(LootEntry.of("aquaculture:neptunium_ingot").withWeight(20))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_axe").withWeight(1))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_pickaxe").withWeight(1))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_shovel").withWeight(1))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_hoe").withWeight(1))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_sword").withWeight(1))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_helmet").withWeight(1))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_chestplate").withWeight(1))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_leggings").withWeight(1))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_boots").withWeight(1))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_fillet_knife").withWeight(1))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_bow").withWeight(1))
        })



    const referenceList = [
        "aquaculture:gameplay/fishing/fish",
        "aquaculture:gameplay/fishing/junk",
        "aquaculture:gameplay/fishing/neptunium",
        "aquaculture:gameplay/fishing/lava/fish",
        "aquaculture:gameplay/fishing/lava/fishing",
        "aquaculture:gameplay/fishing/lava/junk",
        "aquaculture:gameplay/fishing/lava/treasure",
        "aquaculture:gameplay/fishing/neptunium",
        "aquaculture:gameplay/fishing/nether/fish",
        "aquaculture:gameplay/fishing/nether/fishing",
        "aquaculture:gameplay/fishing/nether/junk",
        "aquaculture:gameplay/fishing/nether/treasure",
    ]
    referenceList.forEach(reference => {
        event.getLootTable("minecraft:gameplay/fishing").removeReference(reference)
    })

})