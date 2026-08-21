createNewFluid("liquid_plastic", {textureType:"thick", color: Number("0xFFFFFF"), lang: { "en_us": "Liquid Plastic", "ru_ru": "Жидкий пластик" }})
createNewFluid("evcl_copolymer", { textureType: "thick", color: Number("0xd0d9f7"), lang: { "en_us": "Ethylene-Vinyl Chloride Copolymer" } })

createNewFluid("silicone_modified_phenolic_resin", { textureType: "thick", color: Number("0x778751"), lang: { "en_us": "Silicone-modified Phenolic Resin" } })
//createNewFluid("desalted_crude_oil", {textureType:"thick", color: Number("0x292520"), lang: { "en_us": "Desalted Crude Oil", "ru_ru": "Обессоленная нефть" }})
createNewFluid("high_sulfur_kerosene", {textureType:"thin", color: Number("0x735b3e"), lang: { "en_us": "High Sulfur Kerosene", "ru_ru": "Высокосернистый керосин" }})


createNewFluid("ethereal_source", {
    textureType:"thin",
    stillTexture: "milf:fluid/ethereal_source",
    flowingTexture: "milf:fluid/ethereal_source",
    lang: { "en_us": "Ethereal Source", "ru_ru": "Эфирный источник" }
})

createNewFluid("alien_goo", {
    stillTexture: "milf:fluid/alien_goo",
    flowingTexture: "milf:fluid/alien_goo",
})

createNewFluid("shimmersteel_essence", {textureType:"thick", color: Number("0xC18A36"), lang: { "ru_ru": "Эссенция сверкостали" }})
createNewFluid("syngas", {
    stillTexture: "milf:fluid/syngas",
    flowingTexture: "milf:fluid/syngas",
    fluidTag: "c:gaseous",
    noBlock:true
})

createNewFluid("purified_syngas", {
    stillTexture: "milf:fluid/purified_syngas",
    flowingTexture: "milf:fluid/purified_syngas",
    fluidTag: "c:gaseous",
    noBlock: true
})
