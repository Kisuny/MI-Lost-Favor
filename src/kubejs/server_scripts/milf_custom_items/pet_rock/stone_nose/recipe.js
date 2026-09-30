ServerEvents.recipes(event => {

    const NOSE_ORES = [
        "modern_industrialization:raw_tin",
        "minecraft:raw_copper",
        "minecraft:raw_iron",
        "minecraft:raw_gold",
        "minecraft:coal",
        "modern_industrialization:raw_lead",
        "minecraft:emerald",
        "minecraft:redstone",
        "minecraft:diamond",
        "minecraft:lapis_lazuli",
        "minecraft:quartz",
        "modern_industrialization:bauxite_dust",
        "modern_industrialization:raw_nickel",
        "minecraft:netherite_scrap",
        "modern_industrialization:salt_dust",
        "modern_industrialization:raw_antimony",
        "modern_industrialization:raw_uranium",
        "modern_industrialization:raw_tungsten",
        "modern_industrialization:raw_titanium",
        "modern_industrialization:raw_platinum",
        "modern_industrialization:monazite_dust"
    ]

    NOSE_ORES.forEach(oreId => {
        noseRecipe(oreId)
    })

    function noseRecipe(oreId){
        customShrineRecipe(event, {
            time: 60,
            experience: 8.0,
            fluid: "spectrum:liquid_crystal",
            ingredients: [
                { "item": "ytech:pebble", count: 1 },
                { "item": "spectrum:onyx_shard", count: 2 },
                { "item": oreId, count: 4 },
                { "item": oreId, count: 8 },
                { "item": oreId, count: 16 },
                { "item": oreId, count: 32 },
                { "item": oreId, count: 64 },
            ],
            result: {
                id: "milf:stone_nose",
                count: 1,
                components: { "minecraft:custom_data": { "oreId": oreId } }
            }
        })
    }




})