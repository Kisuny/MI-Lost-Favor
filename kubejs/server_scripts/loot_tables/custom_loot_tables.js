LootJS.lootTables(event => {
    event
        .create("milf:archaeology/magic")
        .createPool(pool => {
            pool.addEntry(LootEntry.of("malum:raw_brilliance").withWeight(80))
            pool.addEntry(LootEntry.of("malum:cthonic_gold").withWeight(80))
            pool.addEntry(LootEntry.of("malum:cthonic_gold_fragment").withWeight(100))
            pool.addEntry(LootEntry.of("malum:tainted_rock").withWeight(100))
            pool.addEntry(LootEntry.of("malum:twisted_rock").withWeight(100))
            pool.addEntry(LootEntry.of("eidolon_repraised:soul_shard").withWeight(60))
            pool.addEntry(LootEntry.of("spectrum:shimmerstone_gem").withWeight(100))
            pool.addEntry(LootEntry.of("spectrum:onyx_powder").withWeight(50))
            pool.addEntry(LootEntry.of("minecraft:ghast_tear").withWeight(50))
        })



})