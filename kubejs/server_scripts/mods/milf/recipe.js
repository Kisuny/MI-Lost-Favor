ServerEvents.recipes(event => {

    yTechShaped(event, {
        pattern: [
            "Q#Q",
            "CMC",
            " Q ",
        ],
        key: {
            "C": { "item": "spectrum:citrine_shard" },
            "#": { "tag": "c:files" },
            "Q": { "tag": "c:gems/quartz" },
            "M": { "item": "enchanted:reek_of_misfortune" },
        },
        outputItems: [[{ id: "milf:amber_visage" }, 1]]
    })

    yTechShaped(event, {
        pattern: [
            "N#s",
            "BMB",
            "SES"
        ],
        key: {
            "#": { tag: "c:mortar_and_pestles" },
            N: { item: "milf:nutmeg" },
            E: { tag: "c:eggs" },
            B: { item: "minecraft:cocoa_beans" },
            S: { item: "minecraft:sugar" },
            M: { item: "minecraft:milk_bucket" },
            s: { item: "minecraft:stick" },
        },
        outputItems: [[{ id: "milf:eggnog" }, 1]],
        compatOff:true
    })

    customMixingCauldron(event, {
        fluid: "minecraft:water",
        fluidAmount: 1000,
        ingredients: [
            { "item": "minecraft:glass_bottle" },
            { "tag": "hexerei:flower_biproduct" },
            { "item": "minecraft:poisonous_potato" },
            { "tag": "spectrum:gemstone_shards" },
            { "tag": "spectrum:gemstone_shards" },
            { "tag": "spectrum:gemstone_shards" },
            { "item": "minecraft:poisonous_potato" },
            { "tag": "hexerei:flower_biproduct" }
        ],
        output: "milf:recall_concoction",
        amount: 2,
        removeRecipe: true
    })

    customMixingCauldron(event, {
        fluid: "modern_industrialization:creosote",
        fluidAmount: 1000,
        ingredients: [
            { "item": "minecraft:glass_bottle" },
            { "item": "modern_industrialization:steel_dust" },
            { "item": "milf:larva" },
            { "item": "milf:recall_concoction" },
            { "item": "modern_industrialization:steel_dust" },
            { "item": "milf:recall_concoction" },
            { "item": "milf:larva" },
            { "item": "modern_industrialization:steel_dust" }
        ],
        output: "milf:grecall_concoction_t1",
        amount: 1,
        removeRecipe: true
    })

    customAlchemicalForgeCraft(event, {
        affinities: [
            "toxony:heat",
            "toxony:nether",
            "toxony:decay"
        ],
        auxiliary: [
            {
                "item": "eidolon_edoni:stimulating_incense"
            },
            {
                "item": "eidolon_repraised:soul_harvest_incense"
            }
        ],
        main: {
            "item": "eidolon_repraised:shadow_gem"
        },
        result: "milf:miasma_orb"
    })

})
