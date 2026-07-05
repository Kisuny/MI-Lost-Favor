ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "RPH",
            "LFP",
            "PLR",
        ],
        key: {
            "H": { "item": "modern_industrialization:steel_drill_head" },
            "F": { "item": "modern_industrialization:steel_tank" },
            "R": { "item": "immersiveengineering:component_iron" },
            "L": { "item": "modern_industrialization:iron_large_plate" },
            "P": { "item": "modern_industrialization:steel_gear" },

        },
        outputItems: [[{ id: "milf:big_bulky_drill" }, 1]]
    })

    milfShaped(event, {
        pattern: [
            "RPH",
            "LFP",
            "PLR",
        ],
        key: {
            "H": { "item": "modern_industrialization:bronze_drill_head" },
            "F": { "item": "modern_industrialization:bronze_tank" },
            "R": { "item": "modern_industrialization:invar_curved_plate" },
            "L": { "item": "modern_industrialization:invar_large_plate" },
            "P": { "item": "modern_industrialization:bronze_gear" },
            
        },
        outputItems: [[{ id: "milf:clunky_drill" }, 1]]
    })

    milfShaped(event, {
        pattern: [
            "R  ",
            "Rrr",
            "CRR"
        ],
        key: {
            R: { item: "modern_industrialization:steel_rod" },
            r: { item: "modern_industrialization:steel_ring" },
            C: { item: "immersiveengineering:component_iron" }
        },
        outputItems: [[{ id: "milf:mi_upgrader" }, 1]],
    })

    milfShaped(event, {
        pattern: [
            " FT",
            " SF",
            "S  ",
        ],
        key: {
            "T": { "item": "ytech:grass_twine" },
            "S": { "item": "minecraft:stick" },
            "F": { "item": "ytech:sharp_flint" },
        },
        outputItems: [[{ id: "milf:flint_pickaxe" }, 1]]
    })

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
        compatOff: true
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

    miMachineCraft(event, {
        energy: 2, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [[{ tag: "milf:artifacts" }]],
        outputItems: [[{ id: "milf:artifact_dust" }, 1, 0.3]],
    })

    customWorktable(event, {
        pattern: [
            "   ",
            " w ",
            " e "
        ],
        reagents: ["u   "],
        key: {
            "w": { "item": "milf:miasma_orb" },
            "e": { "tag": "c:drinks/watery" },
            "u": { "tag": "eidolon_repraised:patron_symbol" },
        },
        result: "milf:crimson_veil_elixir",
        count: 8
    })

    customAlchemicalForgeCraft(event, {
        affinities: [
            "toxony:decay",
            "toxony:soul",
            "toxony:moon"
        ],
        auxiliary: [
            {
                "item": "neovitae:tabula_animata"
            },
            {
                "item": "eidolon_repraised:shadow_gem"
            }
        ],
        main: {
            "item": "spectrum:onyx_block"
        },
        result: "milf:onyx_table_core"
    })

})
