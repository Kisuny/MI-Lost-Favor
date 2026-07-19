createNewBlock("saeta_plush", { blockType: "cardinal", renderType: "cutout", notSolid: true, waterlogged: true, soundType: "wool", stackSize: 1, rarity: "epic", box: [4, 0, 4, 12, 12, 12], lang: { "en_us": "Saeta Plush", "ru_ru": "Плюшевая Saeta" } })
createNewBlock("kisuny_plush", { blockType: "cardinal", renderType: "cutout", notSolid: true, waterlogged: true, soundType: "wool", stackSize: 1, rarity: "epic", box: [4, 0, 4, 12, 12, 12], lang: { "en_us": "Kisuny Plush", "ru_ru": "Плюшевый Kisuny" } })
createNewBlock("radio_tower_block", { hardness: 1, soundType: "chain", requiresTool: true, tagBlock: 'minecraft:mineable/pickaxe', lang: { "en_us": "Radio tower block", "ru_ru": "Блок радио вышки" } })
createNewBlock("radio_tower_slab", { texturePath: 'milf:block/radio_tower_block', blockType: "slab", hardness: 1, soundType: "chain", requiresTool: true, tagBlock: 'minecraft:mineable/pickaxe', lang: { "en_us": "Radio tower slab", "ru_ru": "Плита радио вышки" } })

createNewBlock("reservoir_rock", { hardness: 5, soundType: "deepslate", requiresTool: true, tagBlock: 'minecraft:mineable/pickaxe' })

createNewBlock("chunk_flag", { property: enabledProperty, soundType: "wood", box: [5, 0, 5, 11, 1, 11, true], defaultCutout: true, tagBlock: 'minecraft:mineable/axe', lang: { "en_us": "Chunk flag", "ru_ru": "Флаг чанка" } })

createNewBlock("abstraction_portal", { hardness: 20, soundType: "amethyst", requiresTool: true, tagBlock: ['minecraft:mineable/pickaxe', "minecraft:needs_diamond_tool"] })
createNewBlock("concreteness_portal", {
    hardness: -1, soundType: "amethyst", requiresTool: true, lightLevel: 15, tagBlock: 
    [
    'spectrum:unbreakable', "minecraft:wither_immune", "minecraft:dragon_immune", 
    "minecraft:geode_invalid_blocks", "minecraft:blocks_wind_charge_explosions", "minecraft:features_cannot_replace"
    ]
})
