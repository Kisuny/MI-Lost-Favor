createNewItem("steaming_iron_ingot", { food: { nutrition: 4, saturation: 0, alwaysEdible: true, eaten: "setOnFire", effects: [['minecraft:nausea', 200, 0, 1], ['minecraft:darkness', 100, 0, 1]] }, lang: { "en_us": "Steaming iron ingot", "ru_ru": "Жареный железный слиток" }})
createNewItem("concrete_popsicle", { food: { nutrition: 1, saturation: 9, alwaysEdible: false, effects: [['minecraft:slowness', 100, 10, 1]] }, lang: { "en_us": "Concrete popsicle", "ru_ru": "Бетонное мороженое" }})
createNewItem("uranium_sandwich", { food: { nutrition: 1, saturation: 20000, alwaysEdible: true, effects: [['minecraft:hunger', 200, 3, 1], ['minecraft:poison', 1000, 0, 1]] }, lang: { "en_us": "Uranium sandwich", "ru_ru": "Урановый бутерброд" }})
createNewItem('larva', { food: { nutrition: 4, saturation: 0.5, alwaysEdible: true, effects: [['minecraft:hunger', 80, 0, 1]] }})
createNewItem('eggnog', { stackSize: 16, useAnimation: "drink", food: { nutrition: 5, saturation: 2.5 } })

global.getConfidence = (/**@type {$FoodEatenKubeEvent_}*/ ctx) => {
    if (ctx.player.level.clientSide) return
    let player = ctx.entity;
    let player_name = player.profile.name
    ctx.server.runCommandSilent(`astages add ${player_name} the_gatekeeper`)
}
createNewItem("vial_of_liquid_confidence", {
    useAnimation: "drink",
    rarity: 'epic',
    food: { nutrition: 1, saturation: 0, alwaysEdible: true, eaten: "getConfidence" },
    lang: { "en_us": "Vial of liquid confidence", "ru_ru": "Флакон жидкой уверенности" }
})
global.drinkCrimsonVeilElixir = (/**@type {$FoodEatenKubeEvent_}*/ ctx) => {
    if (ctx.player.level.clientSide) return
    let player = ctx.entity;
    player.getPersistentData().putBoolean("crimson_veil_potion_drinked", true)
}
createNewItem("crimson_veil_elixir", {
    useAnimation: "drink",
    rarity: 'epic',
    food: { nutrition: 1, saturation: 0, alwaysEdible: true, eaten: "drinkCrimsonVeilElixir" },
    lang: { "en_us": "Crimson Veil Elixir", "ru_ru": "Эликсир Багряной Завесы" }
})

createNewItem('amber_visage', { stackSize: 16, rarity: 'epic', lang: { "en_us": "Amber visage", "ru_ru": "Янтарный облик" } })
createNewItem('table_core', {rarity: 'rare', lang: { "en_us": "Table Core", "ru_ru": "Ядро Стола" } })
createNewItem('onyx_table_core', {rarity: 'rare', lang: { "ru_ru": "Ониксовое Ядро Стола" } })
createNewItem('moonstone_table_core', {rarity: 'rare', lang: { "ru_ru": "Луннокаменное Ядро Стола" } })

createNewItem('dev_pen')
createNewItem('nbt_pen')

createNewItem('transmutation_orb', {use:{animation:"block"}, lang: { "en_us": "Transmutation Orb", "ru_ru": "Сфера Трансмутации" }})
createNewItem('regal_orb', {use:{animation:"block"}, lang: { "en_us": "Regal Orb", "ru_ru": "Королевская Сфера" }})
createNewItem('divine_orb', {use:{animation:"block"}, lang: { "en_us": "Divine Orb", "ru_ru": "Божественная Сфера" }})
createNewItem('orb_of_alchemy', {use:{animation:"block"}, lang: { "en_us": "Orb of Alchemy", "ru_ru": "Сфера Алхимии" }})
createNewItem('orb_of_chance', {use:{animation:"block"}, lang: { "en_us": "Orb of Chance", "ru_ru": "Сфера Удачи" }})
createNewItem('orb_of_annulment', {use:{animation:"block"}, lang: { "en_us": "Orb of Annulment", "ru_ru": "Сфера Аннулирования" }})
createNewItem('orb_of_regret', {use:{animation:"block"}, lang: { "en_us": "Orb of Regret", "ru_ru": "Сфера Сожаления" }})
createNewItem('orb_of_corruption', {use:{animation:"block"}, lang: { "en_us": "Orb of Corruption", "ru_ru": "Сфера Порчи" }})
createNewItem('orb_of_the_forest', {use:{animation:"block"}, lang: { "en_us": "Orb of the Forest", "ru_ru": "Сфера Леса" }})

createNewItem('rune_of_piercing', {stackSize: 16, rarity: 'rare', lang : { "en_us": "Rune of Piercing", "ru_ru": "Руна Пронзания" }})
createNewItem('rune_of_armor', {stackSize: 16, rarity: 'rare', lang : { "en_us": "Rune of Armor", "ru_ru": "Руна Брони" }})
createNewItem('rune_of_bloodshed', {stackSize: 16, rarity: 'rare', lang : { "en_us": "Rune of Bloodshed", "ru_ru": "Руна Кровопролития" }})
createNewItem('rune_of_diversity', {stackSize: 16, rarity: 'rare', lang : { "en_us": "Rune of Diversity", "ru_ru": "Руна Разнообразия" }})
createNewItem('rune_of_fishing', {stackSize: 16, rarity: 'rare', lang : { "en_us": "Rune of Fishing", "ru_ru": "Руна Рыбалки" }})
createNewItem('rune_of_mining', {stackSize: 16, rarity: 'rare', lang : { "en_us": "Rune of Mining", "ru_ru": "Руна Добычи" }})
createNewItem('blaze_core', {stackSize: 1, rarity: 'epic', lang : { "en_us": "Blaze Core", "ru_ru": "Ядро Пламени" }})
createNewItem('electronic_ender_core', {stackSize: 1, rarity: 'epic', lang : { "en_us": "Electronic Ender Core", "ru_ru": "Электронное Ядро Энда" }})
createNewItem('magnet_part', {stackSize: 16, lang : { "en_us": "Magnet Part", "ru_ru": "Магнитная часть" }})
createNewItem('polarized_magnet_part', { stackSize: 16, lang: { "en_us": "Polarized Magnet Part" } })


createNewItem('needle', { maxDamage: 500, tag: "ytech:bone_needles", lang: { "en_us": "Needle", "ru_ru": "Игла" }})
createNewItem('crushed_copper', { tag: ["c:crushed_ores", "c:crushed_ores/copper"], lang: { "en_us": "Сrushed copper", "ru_ru": "Измельченная медь" }})
createNewItem('crushed_gold', { tag: ["c:crushed_ores", "c:crushed_ores/gold"], lang: { "en_us": "Сrushed gold", "ru_ru": "Измельченное золото" }})
createNewItem('crushed_iron', { tag: ["c:crushed_ores", "c:crushed_ores/iron"], lang: { "en_us": "Сrushed iron", "ru_ru": "Измельченное железо" }})
createNewItem('crushed_lead', { tag: ["c:crushed_ores", "c:crushed_ores/lead"], lang: { "en_us": "Сrushed lead", "ru_ru": "Измельченный свинец" }})
createNewItem('crushed_tin', { tag: ["c:crushed_ores", "c:crushed_ores/tin"], lang: { "en_us": "Сrushed tin", "ru_ru": "Измельченное олово" }})

createNewItem('twig')
createNewItem('unfired_fire_clay_brick')
createNewItem('fire_clay_ball')
createNewItem('ferrosilicon_dust')


createNewItem('bronze_glass', { stackSize: 8, lang: { "en_us": "Bronze glass", "ru_ru": "Бронзовое стекло" } })
createNewItem('steel_infused_glass', { stackSize: 8, lang: { "en_us": "Steel infused glass", "ru_ru": "Стальное стекло" } })
createNewItem('tempered_glass', { stackSize: 8, lang: { "en_us": "Tempered glass", "ru_ru": "Закаленное стекло" } })

createNewItem('bronze_machine_bit', {tag: "milf:ba_bits", stackSize: 32, lang: { "en_us": "Bronze machine bit", "ru_ru": "Бронзовый фрагмент механизма" } })
createNewItem('steel_machine_bit', { tag: "milf:ba_bits", stackSize: 32, lang: { "en_us": "Steel machine bit", "ru_ru": "Стальной фрагмент механизма" } })
createNewItem('basic_machine_bit', {  stackSize: 32, lang: { "en_us": "Basic machine bit", "ru_ru": "Базовый фрагмент механизма" } })
createNewItem('small_copper_fluid_container', { texturePath: 'milf:item/copper_fluid_container', lang: { "en_us": "Small copper fluid container", "ru_ru": "Небольшой медный контейнер для жидкости" } })
createNewItem('small_steel_fluid_container', { texturePath: 'milf:item/steel_fluid_container', lang: { "en_us": "Small steel fluid container", "ru_ru": "Небольшой стальной контейнер для жидкости" } })

createNewItem('basic_motor')
createNewItem('basic_pump')

createNewItem('space_hive')
createNewItem('kerogen')


createNewItem('rangefinder', { lang: { "en_us": "Rangefinder", "ru_ru": "Дальномер" } })
createNewItem('cd_reader', { stackSize: 12, lang: { "en_us": "CD Reader", "ru_ru": "CD-Привод" } })
createNewItem('lens', { lang: { "en_us": "Lens", "ru_ru": "Линза" } })

createNewItem('cd', { stackSize: 8, lang: { "en_us": "CD", "ru_ru": "CD" } })
createNewItem('5d_memory_crystal', { stackSize: 1, lang: { "en_us": "5D Memory Crystal" } })

createNewItem('mysterious_disk', { stackSize: 1, lang: { "ru_ru": "Таинственный диск" } })
createNewItem('storage_disk', { stackSize: 1, lang: { "ru_ru": "Диск Хранения данных" } })
createNewItem('automation_disk', { stackSize: 1, lang: {  "ru_ru": "Диск автоматизации" } })
createNewItem('quantum_disk', { stackSize: 1, lang: { "ru_ru": "Квантовый диск" } })

createNewItem('hemispherical_press_mold', { stackSize: 1 })

createNewItem("meze_109", { itemType: "helmet", material: 'milf:meze', stackSize: 1, rarity: 'epic' })

createNewItem('flint_pickaxe', { stackSize: 1, itemType: "pickaxe", tool: { tier: "flint" } })

createNewItem('ms_s_second_order', {
    stackSize: 1, itemType: "sword", lang: { "en_us": "Ms S's Second Order" },
    use: {
        animation: "spear",
        duration: 100000,
    },
    tool: {
        tier: "s_silver", 
        attackDamageBaseline: 8,
        speedBaseline: -0.7
    } 
})

createNewItem('grappling_gun', {
    stackSize: 1, use: {
        animation: "bow",
        duration: 100000,
    }, 
})

createNewItem('zipped_zipline', { stackSize: 19})

createNewItem('mi_upgrader', { stackSize: 1, lang: { "en_us": "MI Upgrader", "ru_ru": "Улучшатель MI" } })
createNewItem('mi_replacer', { stackSize: 1, lang: { "en_us": "MI Replacer En Masse" } })

createNewItem('pet_rock_on_a_leash', { stackSize: 1, maxDamage:25, lang: { "en_us": "Pet Rock on a Leash", "ru_ru": "Питомец Камень на Поводке" } })
createNewItem('pet_rock', { stackSize: 1, lang: { "en_us": "Pet Rock", "ru_ru": "Питомец Камень" } })
createNewItem('sniffer', { stackSize: 1, lang: { "en_us": "Sniffer" } })

createNewItem('stone_nose', {
    stackSize: 1,
    use: {
        animation: "bow",
        duration: 35,
        conditions(level, player, hand) {
            if (!level.isClientSide()) player.sendData("milf_stone_nose_start_sound")
            return true
        },
        releaseUsing(itemStack, level, entity, tick) {
            if (!level.isClientSide()) entity.sendData("milf_stone_nose_sound_interrupted")
        },
        finishUsing(itemStack, level, entity) {

            let dataComponent = itemStack.get($DataComponents.CUSTOM_DATA)
            if (!dataComponent) return itemStack

            let player = entity
            if (level.isClientSide()) return itemStack

            let itemData = dataComponent.copyTag()
            let oreId = itemData.getString("oreId")

            let oresToScan = new $ListTag()
            oresToScan.add($StringTag.valueOf(oreId))

            let dataToSend = new $CompoundTag()
            dataToSend.put("oresToScan", oresToScan)

            player.sendData("milf_stone_nose_used", dataToSend)

            player.cooldowns.addCooldown(itemStack, 100)
            itemStack.shrink(1)
            return itemStack

        }
    },
    dynamicName(itemStack){
        let noseNameComponent = Component.translatable("item.milf.stone_nose")
        let dataComponent = itemStack.get($DataComponents.CUSTOM_DATA)
        if (!dataComponent) return noseNameComponent

        let itemData = dataComponent.copyTag()
        let oreId = itemData.getString("oreId")

        let oreItem = $BuiltInRegistries.ITEM.get(oreId)
        let oreNameComponent = oreItem.getName(oreItem.getDefaultInstance())

        

        let noseNameWithOre = Component.ofString("")
        noseNameWithOre.append(noseNameComponent).append(" ").append(Component.translatable("milf.stone_nose.ore_type", oreNameComponent))

        return noseNameWithOre
    }
})

createNewItem('divine_mint', { stackSize: 1})
createNewItem('divine_coin', { stackSize: 1 })

createNewItem('bound_spirit', { stackSize: 1, food: { nutrition: 4, saturation: 1, alwaysEdible: true } })
createNewItem('nutmeg', { stackSize: 62 })

createNewItem("bits_mold", { lang: { "en_us": "Bits Mold", "ru_ru": "Форма для фрагментов" } })
createNewItem("cement", { lang: { "en_us": "Cement", "ru_ru": "Цемент" } })

createNewItem('old_diary', { stackSize: 1, lang: { "en_us": "Old diary", "ru_ru": "Старый дневник" } })
createNewItem('old_tablet', { stackSize: 1, lang: { "en_us": "Old tablet", "ru_ru": "Старая табличка" } })
createNewItem('disk_from_space', { stackSize: 1, lang: { "en_us": "Disk from space", "ru_ru": "Внеземной диск" } })
createNewItem('holy_book_of_color', { texturePath: 'milf:item/color_holy_book', stackSize: 1, lang: { "en_us": "Holy book of color", "ru_ru": "Священная книга цвета" } })

createNewItem('punched_card', { stackSize: 8, lang: { "en_us": "Punched Card", "ru_ru": "Перфокарта" } })
createNewItem('blank_blueprint', { stackSize: 63, lang: { "en_us": "Blank Blueprint", "ru_ru": "Пустой чертеж" } })

createNewItem('core_hull', { lang: { "en_us": "Core hull", "ru_ru": "Основа ядра" } })

createNewItem('cell_half', { lang: { "en_us": "Cell half", "ru_ru": "Часть ячейки" } })
createNewItem('cell_press', { stackSize: 16, lang: { "en_us": "Cell press", "ru_ru": "Пресс для ячейки" } })

// createNewItem('blueprint_pack', { stackSize: 1, lang: { "en_us": "Blueprint Pack", "ru_ru": "Набор чертежей" } })
// createNewItem('mysterious_blueprint', { texturePath: 'milf:item/blueprint_t1', stackSize: 1, lang: { "en_us": "Mysterious blueprint", "ru_ru": "Таинственный чертёж" } })
// createNewItem('storage_blueprint', { texturePath: 'milf:item/blueprint_t2', stackSize: 1, lang: { "en_us": "Storage blueprint", "ru_ru": "Чертёж хранения" } })
// createNewItem('automation_blueprint', { texturePath: 'milf:item/blueprint_t3', stackSize: 1, lang: { "en_us": "Automation blueprint", "ru_ru": "Чертёж автоматизации" } })
// createNewItem('quantum_blueprint', { texturePath: 'milf:item/blueprint_t4', stackSize: 1, lang: { "en_us": "Quantum blueprint", "ru_ru": "Квантовый чертёж" } })
// createNewItem('divine_blueprint', { texturePath: 'milf:item/blueprint_t5', stackSize: 1, lang: { "en_us": "Divine blueprint", "ru_ru": "Божественный чертёж" } })

createNewItem('unfired_shovel_head_mold', { lang: { "en_us": "Unfired shovel Head Mold", "ru_ru": "Необожженная форма лопаты" } })
createNewItem('shovel_head_sand_mold', { lang: { "en_us": "Shovel Head sand mold", "ru_ru": "Форма лопаты из песка" } })
createNewItem('shovel_head_clay_mold', {maxDamage: 16, lang: { "en_us": "Shovel Head clay mold", "ru_ru": "Форма лопаты из глины" } })
createNewItem('shovel_head_pattern', { lang: { "en_us": "Shovel Head Pattern", "ru_ru": "Шаблон лопаты" } })
createNewItem('bronze_shovel_head_part', { lang: { "en_us": "Bronze Shovel Head Part", "ru_ru": "Часть лопаты из бронзы" } })

createNewItem('unfired_hoe_head_mold', { lang: { "en_us": "Unfired Hoe Head Mold", "ru_ru": "Необожженная форма мотыги" } })
createNewItem('hoe_head_sand_mold', { lang: { "en_us": "Hoe Head Sand Mold", "ru_ru": "Форма мотыги из песка" } })
createNewItem('hoe_head_clay_mold', { maxDamage: 16, lang: { "en_us": "Hoe Head Clay Mold", "ru_ru": "Форма мотыги из глины" } })
createNewItem('hoe_head_pattern', { lang: { "en_us": "Hoe Head Pattern", "ru_ru": "Шаблон мотыги" } })
createNewItem('bronze_hoe_head_part', { lang: { "en_us": "Bronze Hoe Head Part", "ru_ru": "Часть мотыги из бронзы" } })

createNewItem('building_card', { lang: { "ru_ru": "Карта строительства" } })
createNewItem('destruction_card', { lang: {  "ru_ru": "Карта разрушения" } })
createNewItem('exchanging_card', { lang: {  "ru_ru": "Карта обмена" } })
createNewItem('copying_card', { lang: {  "ru_ru": "Карта копирования" } })
createNewItem('cutting_card', { lang: {  "ru_ru": "Карта резки" } })
createNewItem('blank_card', { lang: { "en_us": "Blank Card" } })
createNewItem('miasma_orb', { lang: { "ru_ru": "Сфера скверны" }, stackSize: 1, rarity: 'epic'  })
createNewItem('artifact_dust', { lang: { "ru_ru": "Артефактная пыль" }, stackSize: 15, rarity: 'epic'  })
createNewItem('mixed_gem_powder', { lang: { "ru_ru": "Порошок драгоценных камней" } })
createNewItem('soul_of_the_helpless', { lang: { "ru_ru": "Душа беспомощного" }, stackSize: 16, rarity: 'epic'  })

