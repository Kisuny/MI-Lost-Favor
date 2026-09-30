//priority: 100
const en_usOreSample = "Ore Sample"
const en_usBedrock = "Bedrock"
const ru_ruOreSample = "Образец руды"

const samplesData = [
    //#region t0
    { 
        sampleLang: { "en_us": `Iron ${en_usOreSample}`, "ru_ru": `Железный ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Iron ${en_usOreSample}`},
        itemName: "iron", directory: "minecraft", 
        oreData: {
            deepslate: "minecraft:deepslate_iron_ore",
            normal: "minecraft:iron_ore",
            raw: "minecraft:raw_iron"
        },
        oreTier: 0
    },

    {
        sampleLang: { "en_us": `Copper ${en_usOreSample}`, "ru_ru": `Медный ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Copper ${en_usOreSample}` },
        itemName: "copper", directory: "minecraft",
        oreData: {
            deepslate: "minecraft:deepslate_copper_ore",
            normal: "minecraft:copper_ore",
            raw: "minecraft:raw_copper"
        },
        oreTier: 0
    },

    {
        sampleLang: { "en_us": `Coal ${en_usOreSample}`, "ru_ru": `Угольный ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Coal ${en_usOreSample}` },
        itemName: "coal", directory: "minecraft", bedrockTexture: "minecraft:block/coal_block",
        oreData: {
            deepslate: "minecraft:deepslate_coal_ore",
            normal: "minecraft:coal_ore",
            raw: "modern_industrialization:coal_crushed_dust"
        },
        oreTier: 0
    },

    {
        sampleLang: { "en_us": `Lead ${en_usOreSample}`, "ru_ru": `Свинцовый ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Lead ${en_usOreSample}` },
        itemName: "lead", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_lead_ore",
            normal: "modern_industrialization:lead_ore",
            raw: "modern_industrialization:raw_lead"
        },
        oreTier: 0
    },

    {
        sampleLang: { "en_us": `Tin ${en_usOreSample}`, "ru_ru": `Оловянный ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Tin ${en_usOreSample}` },
        itemName: "tin", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_tin_ore",
            normal: "modern_industrialization:tin_ore",
            raw: "modern_industrialization:raw_tin"
        },
        oreTier: 0
    },
    //#endregion

    //#region t1
    { 
        sampleLang: { "en_us": `Gold ${en_usOreSample}`, "ru_ru": `Золотой ${ru_ruOreSample}` }, 
        bedrockSampleLang: { "en_us": `${en_usBedrock} Iron ${en_usOreSample}` },
        itemName: "gold", directory: "minecraft", 
        oreData: {
            deepslate: "minecraft:deepslate_gold_ore",
            normal: "minecraft:gold_ore",
            raw: "minecraft:raw_gold"
        },
        oreTier: 1
    },

    {
        sampleLang: { "en_us": `Diamond ${en_usOreSample}`, "ru_ru": `Алмазный ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Diamond ${en_usOreSample}` },
        itemName: "diamond", directory: "minecraft", bedrockTexture: "spectrum:block/pure_diamond_block",
        oreData: {
            deepslate: "minecraft:deepslate_diamond_ore",
            normal: "minecraft:diamond_ore",
            raw: "modern_industrialization:diamond_crushed_dust"
        },
        oreTier: 1
    },

    {
        sampleLang: { "en_us": `Emerald ${en_usOreSample}`, "ru_ru": `Изумрудный ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Emerald ${en_usOreSample}` },
        itemName: "emerald", directory: "minecraft", bedrockTexture: "spectrum:block/pure_emerald_block",
        oreData: {
            deepslate: "minecraft:deepslate_emerald_ore",
            normal: "minecraft:emerald_ore",
            raw: "modern_industrialization:emerald_crushed_dust"
        },
        oreTier: 1
    },

    {
        sampleLang: { "en_us": `Lapis ${en_usOreSample}`, "ru_ru": `Лазуритовый ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Lapis ${en_usOreSample}` },
        itemName: "lapis", directory: "minecraft", bedrockTexture: "minecraft:block/lapis_block",
        oreData: {
            deepslate: "minecraft:deepslate_lapis_ore",
            normal: "minecraft:lapis_ore",
            raw: "modern_industrialization:lapis_crushed_dust"
        },
        oreTier: 1
    },

    {
        sampleLang: { "en_us": `Redstone ${en_usOreSample}`, "ru_ru": `Редстоуновый ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Redstone ${en_usOreSample}` },
        itemName: "redstone", directory: "minecraft", bedrockTexture: "minecraft:block/redstone_block",
        oreData: {
            deepslate: "minecraft:deepslate_redstone_ore",
            normal: "minecraft:redstone_ore",
            raw: "modern_industrialization:redstone_crushed_dust"
        },
        oreTier: 1
    },

    {
        sampleLang: { "en_us": `Nickel ${en_usOreSample}`, "ru_ru": `Никельевый ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Nickel ${en_usOreSample}` },
        itemName: "nickel", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_nickel_ore",
            normal: "modern_industrialization:nickel_ore",
            raw: "modern_industrialization:raw_nickel"
        },
        oreTier: 1
    },

    {
        sampleLang: { "en_us": `Salt ${en_usOreSample}`, "ru_ru": `${ru_ruOreSample} Соли` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Salt ${en_usOreSample}` },
        itemName: "salt", directory: "modern_industrialization", bedrockTexture: "modern_industrialization:block/salt_block",
        oreData: {
            deepslate: "modern_industrialization:deepslate_salt_ore",
            normal: "modern_industrialization:salt_ore",
            raw: "modern_industrialization:salt_crushed_dust"
        },
        oreTier: 1
    },

    {
        sampleLang: { "en_us": `Quartz ${en_usOreSample}`, "ru_ru": `Кварцевый ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Quartz ${en_usOreSample}` },
        itemName: "quartz", directory: "modern_industrialization", bedrockTexture: "spectrum:block/pure_quartz_block",
        oreData: {
            normal: "modern_industrialization:quartz_ore",
            raw: "modern_industrialization:quartz_crushed_dust"
        },
        oreTier: 1
    },
    //#endregion

    //#region t2
    {
        sampleLang: { "en_us": `Nether Quartz ${en_usOreSample}`, "ru_ru": `Кварцевый ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Nether Quartz ${en_usOreSample}` },
        itemName: "nether_quartz", directory: "minecraft", uniqueBase: "minecraft:block/netherrack", bedrockTexture: "spectrum:block/pure_quartz_block",
        oreData: {
            normal: "minecraft:nether_quartz_ore",
            raw: "modern_industrialization:quartz_crushed_dust"
        },
        oreTier: 2
    },

    {
        sampleLang: { "en_us": `Nether Gold ${en_usOreSample}`, "ru_ru": `${ru_ruOreSample} Адского Золота` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Nether Gold ${en_usOreSample}` },
        itemName: "nether_gold", directory: "minecraft", uniqueBase: "minecraft:block/netherrack", bedrockTexture: "minecraft:block/raw_gold_block",
        oreData: {
            normal: "minecraft:nether_gold_ore",
            raw: "milf:crushed_gold"
        },
        oreTier: 2
    },

    {
        sampleLang: { "en_us": `Antimony ${en_usOreSample}`, "ru_ru": `${ru_ruOreSample} Сурьмы` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Antimony ${en_usOreSample}` },
        itemName: "antimony", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_antimony_ore",
            normal: "modern_industrialization:antimony_ore",
            raw: "modern_industrialization:raw_antimony"
        },
        oreTier: 2
    },

    {
        sampleLang: { "en_us": `Bauxite ${en_usOreSample}`, "ru_ru": `Бокситовый ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Bauxite ${en_usOreSample}` },
        itemName: "bauxite", directory: "modern_industrialization", bedrockTexture: "modern_industrialization:block/bauxite_block",
        oreData: {
            deepslate: "modern_industrialization:deepslate_bauxite_ore",
            normal: "modern_industrialization:bauxite_ore",
            raw: "modern_industrialization:bauxite_crushed_dust"
        },
        oreTier: 2
    },

    {
        sampleLang: { "en_us": `Uranium ${en_usOreSample}`, "ru_ru": `Урановый ${ru_ruOreSample}` },
        bedrockSampleLang: { "en_us": `${en_usBedrock} Uranium ${en_usOreSample}` },
        itemName: "uranium", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_uranium_ore",
            normal: "modern_industrialization:uranium_ore",
            raw: "modern_industrialization:raw_uranium"
        },
        oreTier: 2
    },
    //#endregion

    //#region t3
    { 
        sampleLang: { "en_us": `Ancient Debris Sample`, "ru_ru": `${ru_ruOreSample} Древних Осколков` }, 
        bedrockSampleLang: { "en_us": `${en_usBedrock} Ancient Debris Sample`},
        itemName: "ancient_debris", directory: "minecraft", uniqueBase: "minecraft:block/netherrack", 
        uniqueOre: "minecraft:block/ancient_debris_top", bedrockTexture: "minecraft:block/ancient_debris_top",
        oreData: {
            normal: "minecraft:ancient_debris",
            raw: "minecraft:netherite_scrap"
        },
        oreTier: 3
    },

    { 
        sampleLang: { "en_us": `Iridium ${en_usOreSample}`, "ru_ru": `Иридиевый ${ru_ruOreSample}` }, 
        bedrockSampleLang: { "en_us": `${en_usBedrock} Iridium ${en_usOreSample}`},
        itemName: "iridium", directory: "modern_industrialization",
        oreData: {
            normal: "modern_industrialization:iridium_ore",
            raw: "modern_industrialization:raw_iridium"
        },
        oreTier: 3
    },

    { 
        sampleLang: { "en_us": `Monazite ${en_usOreSample}`, "ru_ru": `Монацитовый ${ru_ruOreSample}` }, 
        bedrockSampleLang: { "en_us": `${en_usBedrock} Monazite ${en_usOreSample}`},
        itemName: "monazite", directory: "modern_industrialization", bedrockTexture: "modern_industrialization:block/monazite_block",
        oreData: {
            deepslate: "modern_industrialization:deepslate_monazite_ore",
            normal: "modern_industrialization:monazite_ore",
            raw: "modern_industrialization:monazite_crushed_dust"
        },
        oreTier: 3
    },

    { 
        sampleLang: { "en_us": `Platinum ${en_usOreSample}`, "ru_ru": `Платиновый ${ru_ruOreSample}` }, 
        bedrockSampleLang: { "en_us": `${en_usBedrock} Platinum ${en_usOreSample}`},
        itemName: "platinum", directory: "modern_industrialization",
        oreData: {
            normal: "modern_industrialization:platinum_ore",
            raw: "modern_industrialization:raw_platinum"
        },
        oreTier: 3
    },


    {
        sampleLang: { "en_us": `Titanium ${en_usOreSample}`, "ru_ru": `Титановый ${ru_ruOreSample}` }, 
        bedrockSampleLang: { "en_us": `${en_usBedrock} Titanium ${en_usOreSample}`},
        itemName: "titanium", directory: "modern_industrialization",
        oreData: {
            normal: "modern_industrialization:titanium_ore",
            raw: "modern_industrialization:raw_titanium"
        },
        oreTier: 3
    },

    { 
        sampleLang: { "en_us": `Tungsten ${en_usOreSample}`, "ru_ru": `Вольфрамовый ${ru_ruOreSample}` }, 
        bedrockSampleLang: { "en_us": `${en_usBedrock} Tungsten ${en_usOreSample}`},
        itemName: "tungsten", directory: "modern_industrialization",
        oreData: {
            deepslate: "modern_industrialization:deepslate_tungsten_ore",
            normal: "modern_industrialization:tungsten_ore",
            raw: "modern_industrialization:raw_tungsten"
        },
        oreTier: 3
    }
    //#endregion

]

samplesData.forEach(ore => {

    let sampleId = `${ore.itemName}_ore_sample`

    createNewBlock(sampleId, {
        blockType: "cardinal",
        defaultCutout: true,
        box: [2, 0, 2, 14, 5, 14, true],
        soundType: "stone",
        property: BlockProperties.WATERLOGGED,
        tagBlock: 'minecraft:mineable/pickaxe',
        lang: ore.sampleLang
    })

    ore.sampleId = `milf:${sampleId}`

    createNewBlock(`bedrock_${sampleId}`, {
        blockType: "cardinal",
        defaultCutout: true,
        box: [0, 0, 0, 16, 18, 16, true],
        soundType: "amethyst",
        hardness: -1,
        tagBlock: [
            'spectrum:unbreakable', "minecraft:wither_immune", "minecraft:dragon_immune",
            "minecraft:geode_invalid_blocks", "minecraft:blocks_wind_charge_explosions", "minecraft:features_cannot_replace",
            "milf:bedrock_samples",

            "oritech:resource_nodes"
        ],
        tag: "milf:bedrock_ore_samples",
        lang: ore.bedrockSampleLang
    })

    ore.bedrockSampleId = `milf:bedrock_${sampleId}`
})

global.oresWithSamples = samplesData


//JSONs shenanigans

// ore_list.forEach(ore => {

//     let modelsJsonPath = `kubejs/assets/milf/models/block/bedrock_${ore.itemName}_ore_sample.json`
//     let modelsJson = {
//         "parent": `milf:block/bedrock_ore_sample`,
//         "textures": {
//             "2": `${ore.directory}:block/raw_${ore.itemName}_block`,
//         }
//     }
//     if (ore.bedrockTexture) { modelsJson.textures["2"] = ore.bedrockTexture }
//     JsonIO.write(modelsJsonPath, modelsJson)

// })


// ore_list.forEach(ore => {
//     const blockstatesJsonPath = `kubejs/assets/milf/blockstates/${ore.itemName}_ore_sample.json`;
//     const blockstatesJson = {"variants": {"": []}}

//     for(let i = 1; i <=6; i++){
//         let modelsJsonPath = `kubejs/assets/milf/models/block/ore_samples/${ore.itemName}_ore_sample_${i}.json`
//         let modelsJson = {
//             "parent": `milf:block/ore_sample_${i}`,
//             "textures": {
//                 "ore": `${ore.directory}:block/${ore.itemName}_ore`,
//             }
//         }
//         if(ore.uniqueBase){modelsJson.textures["0"] = ore.uniqueBase}
//         if(ore.uniqueOre){modelsJson.textures["ore"] = ore.uniqueOre}
//         JsonIO.write(modelsJsonPath, JSON.stringify(modelsJson, null, 2))
//         blockstatesJson.variants[""].push(
//                 {"model": `milf:block/ore_samples/${ore.itemName}_ore_sample_${i}`,"weight":1},
//                 {"model": `milf:block/ore_samples/${ore.itemName}_ore_sample_${i}`, "y": 90,"weight":1},
//                 {"model": `milf:block/ore_samples/${ore.itemName}_ore_sample_${i}`, "y": 180,"weight":1},
//                 {"model": `milf:block/ore_samples/${ore.itemName}_ore_sample_${i}`, "y": 270,"weight":1},
//         )
//     }
//     JsonIO.write(blockstatesJsonPath, JSON.stringify(blockstatesJson, null, 2))
// })

// multiblocksForPlacers.forEach(name => {
//     const [nameString, itemName] = Array.isArray(name.name) ? [name.name[0], name.name[1]] : [name.name, name.name]
//     const emiJsonPath = `milf/assets/emi/recipe/additions/${nameString}_placer.json`;
//     const left = {
//         "type": "item",
//         "id": `milf:${nameString}_placer`,
//         "remainder": `item:milf:${nameString}_empty_box`
//     }
//     const right = {
//         "type": "item",
//         "id": "immersiveengineering:hammer",
//         "chance": 0
//     }
//     const Json = {
//         "type": "emi:world_interaction",
//         "left":left,
//         "right":right,
//         "output": `item:${name.mod}:${itemName}`
//     }
//     JsonIO.write(emiJsonPath, Json)
// }) 
