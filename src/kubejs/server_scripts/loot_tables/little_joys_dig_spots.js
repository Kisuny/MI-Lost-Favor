LootJS.lootTables(event => {

    event.create("milf:dig_spot/orbs").createPool(pool => {
        global.milfOrbs.forEach(id => pool.addEntry(LootEntry.of(id, [1, 3])))
    })
    event.create("milf:dig_spot/recall").createPool(pool => {
        pool.addEntry(LootEntry.of("milf:recall_concoction"))
        pool.addEntry(LootEntry.of("milf:grecall_concoction_t1"))
    })
    event.create("milf:dig_spot/artifacts").createPool(pool => {
        pool.addEntry(LootEntry.tag("milf:artifacts", true))
    })

    const coinBundle = {
        function: "minecraft:set_contents",
        component: "minecraft:bundle_contents",
        entries: [
            {
                type: "minecraft:item", name: "devices:silver_coin",
                functions: [{ function: "minecraft:set_count", count: { type: "minecraft:uniform", min: 12, max: 38 } }]
            },
            {
                type: "minecraft:item", name: "devices:gold_coin",
                conditions: [{ condition: "minecraft:random_chance", chance: 0.6 }],
                functions: [{ function: "minecraft:set_count", count: { type: "minecraft:uniform", min: 10, max: 24 } }]
            },
            {
                type: "minecraft:item", name: "devices:orichalcum_coin",
                conditions: [{ condition: "minecraft:random_chance", chance: 0.15 }],
                functions: [{ function: "minecraft:set_count", count: { type: "minecraft:uniform", min: 1, max: 2 } }]
            }
        ]
    }

    const soilTables = ["dirt", "grass_block", "podzol", "mycelium", "moss_block", "mud", "clay", "gravel"]

    event.getLootTableIds().forEach(location => {
        let id = String(location)
        if (!id.startsWith("littlejoys:dig_spot/")) return
        let table = event.getLootTable(id)

        table.firstPool(pool => {
            pool.addEntry(LootEntry.reference("milf:dig_spot/orbs").withWeight(6))
            pool.addEntry(LootEntry.reference("milf:dig_spot/recall").withWeight(1))
            pool.addEntry(LootEntry.reference("milf:dig_spot/artifacts").withWeight(1))
        })

        if (soilTables.includes(id.substring("littlejoys:dig_spot/".length))) {
            table.modifyPool(1, pool => pool.addEntry(LootEntry.of("milf:larva", [1, 3]).withWeight(3)))
        }

        table.createPool(pool => {
            pool.when(c => c.randomChance(0.05))
            pool.addEntry(LootEntry.of("minecraft:bundle").jsonFunction(coinBundle))
        })
    })
})
