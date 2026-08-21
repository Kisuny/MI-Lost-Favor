ServerEvents.recipes(event => {
    event.remove({ id: 'minecraft:blast_furnace' })
    event.remove({ id: 'minecraft:tinted_glass' })
    event.remove({ id: 'minecraft:bread' })

    event.remove({output: "minecraft:enchanting_table"})
    event.replaceInput({ output:"minecraft:flint_and_steel" }, "iron_ingot","modern_industrialization:steel_ingot")
    event.replaceInput({ output:"minecraft:hopper" }, "iron_ingot","modern_industrialization:iron_plate")
    // YTech why do u change vanilla recipes with minecraft id :(
    event.replaceInput({mod: "minecraft"}, "ytech:flour", "minecraft:wheat")
    event.replaceInput({input: "minecraft:enchanting_table"}, "minecraft:enchanting_table", "apothic_enchanting:apothic_enchanting_table")

    yTechShaped(event, {
        pattern: [
            "#S ",
            "SN ",
            "  S"
        ],
        key: {
            "#": { "tag": "ytech:bone_needles" },
            "N": { "item": "modern_industrialization:tin_nugget" },
            "S": { "tag": "ytech:leather_strips" }
        },
        outputItems: [[{ id: "minecraft:lead" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    yTechShaped(event, {
        pattern: [
            "sRs",
            "STS",
            "@P#"
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "@": { "tag": "milf:knives" },
            "T": { "item": "minecraft:tripwire_hook" },
            "S": { "tag": "ytech:leather_strips" },
            "R": { "item": "modern_industrialization:iron_ring" },
            "s": { "item": "minecraft:stick" },
            "P": { "item": "ytech:wooden_plate" }
        },
        outputItems: [[{ id: "minecraft:crossbow" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    event.shapeless(Item.of("minecraft:flint"), ["minecraft:gravel", "minecraft:gravel", "minecraft:gravel"]);
    event.shapeless("9x minecraft:redstone", ["minecraft:redstone_block"]);

    // same recipe only for MI compat
    global.dyeColors.forEach(color => {
        yTechShaped(event, {
            pattern: [
                "# @",
                "WWW",
                "PPP"
            ],
            key: {
                "#": { "tag": "c:hammers" },
                "P": { "tag": "minecraft:wooden_slabs" },
                "@": { "tag": "c:saws" },
                "W": { "item": `minecraft:${color.name}_wool` }
            },
            outputItems: [[{ id: `minecraft:${color.name}_bed` }, 1]],
            removeRecipeType: "minecraft:crafting_shaped"
        })
    });

    yTechShaped(event, {
        pattern: [
            "d# ",
            "s  ",
            "s  ",
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "s": { "item": "minecraft:stick" },
            "d": { "item": "modern_industrialization:diamond_plate" },
        },
        outputItems: [[{ id: "minecraft:diamond_shovel" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    yTechShaped(event, {
        pattern: [
            "ddd",
            " s#",
            " s ",
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "s": { "item": "minecraft:stick" },
            "d": { "item": "modern_industrialization:diamond_plate" },
        },
        outputItems: [[{ id: "minecraft:diamond_pickaxe" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })
    
    yTechShaped(event, {
        pattern: [
            "ddd",
            " s#",
            " s ",
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "s": { "item": "minecraft:stick" },
            "d": { "item": "modern_industrialization:gold_plate" },
        },
        outputItems: [[{ id: "minecraft:golden_pickaxe" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    yTechShaped(event, {
        pattern: [
            "dd#",
            " s ",
            " s ",
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "s": { "item": "minecraft:stick" },
            "d": { "item": "modern_industrialization:diamond_plate" },
        },
        outputItems: [[{ id: "minecraft:diamond_hoe" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    yTechShaped(event, {
        pattern: [
            "d  ",
            "d  ",
            "s# ",
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "s": { "item": "minecraft:stick" },
            "d": { "item": "modern_industrialization:diamond_plate" },
        },
        outputItems: [[{ id: "minecraft:diamond_sword" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })
    
    yTechShaped(event, {
        pattern: [
            "d  ",
            "d  ",
            "s# ",
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "s": { "item": "minecraft:stick" },
            "d": { "item": "modern_industrialization:gold_plate" },
        },
        outputItems: [[{ id: "minecraft:golden_sword" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    yTechShaped(event, {
        pattern: [
            "dd#",
            "ds ",
            " s ",
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "s": { "item": "minecraft:stick" },
            "d": { "item": "modern_industrialization:diamond_plate" },
        },
        outputItems: [[{ id: "minecraft:diamond_axe" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })
    
    yTechShaped(event, {
        pattern: [
            "dd#",
            "ds ",
            " s ",
        ],
        key: {
            "#": { "tag": "c:hammers" },
            "s": { "item": "minecraft:stick" },
            "d": { "item": "modern_industrialization:gold_plate" },
        },
        outputItems: [[{ id: "minecraft:golden_axe" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    milfShaped(event, {
        pattern: [
            "dLd",
            "dSd",
            "   ",
        ],
        key: {
            "d": { "item": "modern_industrialization:diamond_plate" },
            S: { "item": "immersiveengineering:armor_steel_helmet" },
            L: { "item": "modern_industrialization:diamond_large_plate" },
        },
        outputItems: [[{ id: "minecraft:diamond_helmet" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    milfShaped(event, {
        pattern: [
            "dSd",
            "dLd",
            "ddd",
        ],
        key: {
            "d": { "item": "modern_industrialization:diamond_plate" },
            S: { "item": "immersiveengineering:armor_steel_chestplate" },
            L: { "item": "modern_industrialization:diamond_large_plate" },
        },
        outputItems: [[{ id: "minecraft:diamond_chestplate" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })
    milfShaped(event, {
        pattern: [
            "dLd",
            "dSd",
            "d d",
        ],
        key: {
            "d": { "item": "modern_industrialization:diamond_plate" },
            S: { "item": "immersiveengineering:armor_steel_leggings" },
            L: { "item": "modern_industrialization:diamond_large_plate" },

        },
        outputItems: [[{ id: "minecraft:diamond_leggings" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })
    
    milfShaped(event, {
        pattern: [
            "dSd",
            "d d",
            "   ",
        ],
        key: {
            "d": { "item": "modern_industrialization:diamond_plate" },
            S: { "item": "immersiveengineering:armor_steel_boots" },
        },
        outputItems: [[{ id: "minecraft:diamond_boots" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    yTechShaped(event, {
        pattern: [
            "S F",
            "l l",
            " l ",
        ],
        key: {
            "S": { "tag": "c:saws" },
            "F": { "tag": "c:files" },
            "l": { "tag": "minecraft:logs" },
        },
        outputItems: [[{ id: "minecraft:chest" }, 1]],
        compatOff:true
    })

    yTechShaped(event, {
        pattern: [
            "S F",
            "lll",
            "   ",
        ],
        key: {
            "S": { "tag": "c:saws" },
            "F": { "tag": "c:files" },
            "l": { "tag": "minecraft:logs" },
        },
        outputItems: [[{ id: "minecraft:barrel" }, 1]],
        compatOff:true
    })

    yTechShaped(event, {
        pattern: [
            "SP#",
            "RBP",
            "rRS",
        ],
        key: {
            "#": { "tag": "c:files" },
            "S": { "item": "ytech:leather_strips" },
            "R": { "item": "modern_industrialization:iron_rod" },
            "P": { "item": "modern_industrialization:iron_plate" },
            "B": { "item": "modern_industrialization:iron_bolt" },
            "r": { "item": "modern_industrialization:steel_ring" },
        },
        outputItems: [[{ id: "minecraft:shears" }, 1]],
        removeRecipe: true
    })


    milfShaped(event, {
        pattern: [
            " R ",
            "EQE",
            "QWQ"
        ],
        key: {
            Q: { item: "minecraft:crying_obsidian" },
            W: { item: "spectrum:onyx_shard" },
            E: { item: "modern_industrialization:diamond_plate" },
            R: { tag: "apothic_enchanting:tomes" },
        },
        outputItems: [[{ id: "apothic_enchanting:apothic_enchanting_table" }]],
        removeRecipe:true
    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "minecraft:short_grass" }, 1]],
        inputItems: [
            [{ "item": "minecraft:fern" }, 1],
            [{ "tag": "milf:knives" }, 1],
        ],
        category: "misc",
        removeRecipe: true
    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "minecraft:tall_grass" }, 1]],
        inputItems: [
            [{ "item": "minecraft:large_fern" }, 1],
            [{ "tag": "milf:knives" }, 1],
        ],
        category: "misc",
        removeRecipe: true
    })

    yTechShapeless(event, {
        outputItems: [[{ "id": "minecraft:short_grass" }, 1]],
        inputItems: [
            [{ "item": "minecraft:seagrass" }, 1],
            [{ "tag": "milf:knives" }, 1],
        ],
        category: "misc",
        removeRecipe: true
    })

    milfShapeless(event, {
        inputItems: [
            [{ "item": "modern_industrialization:steel_ring" }, 1],
            [{ "item": "minecraft:flint" }, 1]
        ],
        outputItems: [[{ "id": "minecraft:flint_and_steel" }]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " R ",
            "PTP",
            " P "
        ],
        key: {
            T: { item: "minecraft:torch" },
            P: { item: "modern_industrialization:iron_plate" },
            R: { item: "modern_industrialization:iron_ring" },
        },
        outputItems: [[{ id: "minecraft:lantern" }, 3]],
        removeRecipeType: "ytech:remaining_shaped_crafting"
    })

    milfShaped(event, {
        pattern: [
            " R ",
            "PTP",
            " P "
        ],
        key: {
            T: { item: "minecraft:soul_torch" },
            P: { item: "modern_industrialization:iron_plate" },
            R: { item: "modern_industrialization:iron_ring" },
        },
        outputItems: [[{ id: "minecraft:soul_lantern" }, 3]],
        removeRecipeType: "ytech:remaining_shaped_crafting"
    })


    customMixingCauldron(event, {
        fluid: "minecraft:lava",
        fluidAmount: 1000,
        ingredients: [
            { "item": "paganbless:boline" },
            { "item": "minecraft:flint" },
            { "item": "minecraft:flint" },
            { "item": "minecraft:flint" },
            { "item": "minecraft:flint" },
            { "item": "minecraft:flint" },
            { "item": "minecraft:flint" },
            { "item": "minecraft:flint" },
        ],
        output: "minecraft:flint_and_steel"
    });
})

KubeJSTweaks.beforeRecipes(event => {    

    const disableByRecipeID = [
        "minecraft:iron_bars"
    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })

})