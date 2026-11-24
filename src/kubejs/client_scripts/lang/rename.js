Object.entries({
    "sophisticatedbackpacks:copper_backpack": {
        langs: { "en_us": "Bronze Backpack", "ru_ru": "Бронзовый рюкзак" },
        types: ["Block", "Item"]
    },
    "sophisticatedbackpacks:iron_backpack": {
        langs: { "en_us": "Steel Backpack", "ru_ru": "Стальной рюкзак" },
        types: ["Block", "Item"]
    },
    "sophisticatedbackpacks:gold_backpack": {
        langs: { "en_us": "Aluminum Backpack", "ru_ru": "Алюминиевый рюкзак" },
        types: ["Block", "Item"]
    },
    "sophisticatedbackpacks:diamond_backpack": {
        langs: { "en_us": "Stainless Steel Backpack", "ru_ru": "Рюкзак из нержавеющей стали" },
        types: ["Block", "Item"]
    },
    "sophisticatedbackpacks:netherite_backpack": {
        langs: { "en_us": "Blastproof Backpack", "ru_ru": "Взрывостойкий рюкзак" },
        types: ["Block", "Item"]
    },
    "travelertoolbelt:netherite_belt": {
        langs: { "en_us": "Blastproof Belt", "ru_ru": "Взрывостойкий пояс" },
        types: ["Item"]
    },
    "travelertoolbelt:diamond_belt": {
        langs: { "en_us": "Stainless Steel Belt", "ru_ru": "Пояс из нержавеющей стали" },
        types: ["Item"]
    },
    "travelertoolbelt:gold_belt": {
        langs: { "en_us": "Aluminum Belt", "ru_ru": "Алюминиевый пояс" },
        types: ["Item"]
    },
    "travelertoolbelt:iron_belt": {
        langs: { "en_us": "Steel Belt", "ru_ru": "Стальной пояс" },
        types: ["Item"]
    },
    "travelertoolbelt:copper_belt": {
        langs: { "en_us": "Bronze Belt", "ru_ru": "Бронзовый пояс" },
        types: ["Item"]
    },
    "eidolon_repraised:raven_feather": {
        langs: { "en_us": "Crow Feather", "ru_ru": "Перо ворона" },
        types: ["Item"]
    },
    "oritech:plastic_sheet" : {
        langs: { "en_us": "Bioplastic Sheet" },
    },
    "immersiveengineering:sheetmetal_aluminum": {
        langs: { "en_us": "Corrosion-Resistant Sheetmetal" },
    },
    "immersiveengineering:slab_sheetmetal_aluminum": {
        langs: { "en_us": "Corrosion-Resistant Sheetmetal Slab" },
    },
    "immersiveengineering:alu_window": {
        langs: { "en_us": "Corrosion-Resistant Framed Window" },
    },
    "immersiveengineering:chute_aluminum": {
        langs: { "en_us": "Corrosion-Resistant Sheetmetal Chute" },
    },
    "modern_industrialization:invar_large_plate": {
        langs: { "en_us": "Invar Control Plate" },
    },
    "enchanted:diamond_vapour": {
        langs: { "en_us": "Gem Vapour", "ru_ru": "Гемный пар" },
        types: ["Item"]
    },
    "magnumtorch:emerald_magnum_torch": {
        langs: { "en_us": "Lead Magnum Torch", "ru_ru": "Большой свинцовый факел" },
        types: ["Block", "Item"]
    },
    "magnumtorch:diamond_magnum_torch": {
        langs: { "en_us": "Copper Magnum Torch", "ru_ru": "Большой медный факел" },
        types: ["Block", "Item"]
    }
}).forEach(([toRenameId, langData]) => {

    let { langs, types = ["Item"] } = langData

    Object.entries(langs).forEach(([lang, name]) => {
        ClientEvents.lang(lang, event => {
            types.forEach(type => {
                event[`rename${type}`](toRenameId, name)
            })
        })
    })
})
