LootJS.lootTables(event => {
    event
        .create("milf:gameplay/fishing/treasure")
        .createPool(pool => {
            pool.addEntry(
                LootEntry.reference("minecraft:gameplay/fishing/treasure").withWeight(1100)
            )
            pool.addEntry(LootEntry.of("enigmaticlegacyplus:earth_heart_fragment").withWeight(100))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_ingot").withWeight(20))
            pool.addEntry(LootEntry.of("milf:recall_concoction").withWeight(30))
            pool.addEntry(LootEntry.of("milf:grecall_concoction_t1").withWeight(20))
            pool.addEntry(LootEntry.of("bountiful:bountyboard").withWeight(50))
            pool.addEntry(LootEntry.of("bountiful:decree").withWeight(50))
            pool.addEntry(LootEntry.of("milf:transmutation_orb", [1, 6]).withWeight(50))
            pool.addEntry(LootEntry.of("milf:regal_orb", [1, 6]).withWeight(50))
            pool.addEntry(LootEntry.of("milf:divine_orb", [1, 6]).withWeight(50))
            pool.addEntry(LootEntry.of("milf:orb_of_alchemy", [1, 6]).withWeight(50))
            pool.addEntry(LootEntry.of("milf:orb_of_chance", [1, 6]).withWeight(50))
            pool.addEntry(LootEntry.of("milf:orb_of_annulment", [1, 6]).withWeight(50))
            pool.addEntry(LootEntry.of("milf:orb_of_regret", [1, 6]).withWeight(50))
            pool.addEntry(LootEntry.of("milf:orb_of_corruption", [1, 6]).withWeight(50))
            pool.addEntry(LootEntry.of("endrem:fishing_eye").withWeight(25))
            pool.addEntry(LootEntry.of("endrem:undead_eye").withWeight(25))
            pool.addEntry(LootEntry.of("endrem:magical_eye").withWeight(25))
            pool.addEntry(LootEntry.of("endrem:lost_eye").withWeight(25))
            pool.addEntry(LootEntry.of("endrem:guardian_eye").withWeight(25))
            pool.addEntry(LootEntry.of("endrem:exotic_eye").withWeight(25))
            pool.addEntry(LootEntry.of("endrem:cryptic_eye").withWeight(25))
            pool.addEntry(LootEntry.of("forbidden_arcanus:artisan_relic").withWeight(25))
            pool.addEntry(LootEntry.of("forbidden_arcanus:elementarium").withWeight(25))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_axe").withWeight(10))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_pickaxe").withWeight(10))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_shovel").withWeight(10))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_hoe").withWeight(10))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_sword").withWeight(10))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_helmet").withWeight(10))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_chestplate").withWeight(10))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_leggings").withWeight(10))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_boots").withWeight(10))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_fillet_knife").withWeight(10))
            pool.addEntry(LootEntry.of("aquaculture:neptunium_bow").withWeight(10))
            pool.addEntry(LootEntry.of("enigmaticlegacyplus:mending_mixture").withWeight(15))
            pool.addEntry(LootEntry.of("enigmaticlegacyplus:earth_heart").withWeight(10))
            pool.addEntry(LootEntry.tag("simplyswords:swords", true).withWeight(10))
            pool.addEntry(LootEntry.tag("simplybows:uniques", true).withWeight(1))
            pool.addEntry(LootEntry.tag("milf:artifacts", true).withWeight(1))
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