global.miImpetusMaterials = [
    "steel", "aluminum", "antimony", "beryllium", "chromium", "iridium",
    "platinum", "stainless_steel", "titanium", "tungsten",
    "pure_azurite", "pure_bloodstone", "pure_malachite", "oblivion_alloy"
]

ItemEvents.modification(event => {

    event.modify([
        'usefulslime:slime_sling',
        'usefulslime:slime_helmet',
        'usefulslime:slime_chestplate',
        'usefulslime:slime_leggings',
        'usefulslime:slime_boots',
    ], item => {
        item.setUnbreakable()
    })

    global.miImpetusMaterials.forEach(material => {
        event.modify(`modern_industrialization:${material}_impetus`, item => {
            item.setMaxStackSize(1)
            item.setMaxDamage(800)
            item.setDamage(0)
        })
        event.modify(`modern_industrialization:${material}_fractured_impetus`, item => {
            item.setMaxStackSize(1)
        })
    })

    Object.entries({

        "ytech:lead_pickaxe": { 
            speed: 5.5, 
            correctForTag: "#minecraft:mineable/pickaxe"
        },
        "ytech:lead_shovel": { 
            speed: 5.5, 
            correctForTag: "#minecraft:mineable/shovel"
        },
        "ytech:lead_axe": { 
            speed: 5.5, 
            correctForTag: "#minecraft:mineable/axe"
        },
        "ytech:lead_hoe": { 
            speed: 5.5, 
            correctForTag: "#minecraft:mineable/hoe"
        },



        "ytech:bronze_pickaxe": { 
            speed: 6, 
            correctForTag: "#minecraft:mineable/pickaxe"
        },
        "ytech:bronze_shovel": { 
            speed: 6, 
            correctForTag: "#minecraft:mineable/shovel"
        },
        "ytech:bronze_axe": { 
            speed: 6, 
            correctForTag: "#minecraft:mineable/axe"
        },
        "ytech:bronze_hoe": { 
            speed: 6, 
            correctForTag: "#minecraft:mineable/hoe"
        },



        "minecraft:iron_pickaxe": { 
            speed: 7, 
            correctForTag: "#minecraft:mineable/pickaxe"
        },
        "minecraft:iron_axe": { 
            speed: 7, 
            correctForTag: "#minecraft:mineable/axe"
        },
        "minecraft:iron_hoe": { 
            speed: 7, 
            correctForTag: "#minecraft:mineable/hoe"
        },
        "minecraft:iron_shovel": { 
            speed: 7, 
            correctForTag: "#minecraft:mineable/shovel"
        },



        "embers:silver_pickaxe": { 
            speed: 7.5, 
            correctForTag: "#minecraft:mineable/pickaxe"
        },
        "embers:silver_axe": { 
            speed: 7.5, 
            correctForTag: "#minecraft:mineable/axe"
        },
        "embers:silver_hoe": { 
            speed: 7.5, 
            correctForTag: "#minecraft:mineable/hoe"
        },
        "embers:silver_shovel": { 
            speed: 7.5,
            correctForTag: "#minecraft:mineable/shovel"
        },



    }).forEach(([itemId, data]) => {

        let {correctForTag, incorrectForTag, speed} = data

        event.modify(itemId, item => {

            item.setTool({
                defaultMiningSpeed: 1,
                damagePerBlock: item.tool?.damagePerBlock || 1,
                rules: [
                    { correctForDrops: true, blocks: correctForTag, speed: speed },
                    { correctForDrops: false, blocks: incorrectForTag || "#minecraft:incorrect_for_iron_tool" }
                ]
            })

        })

    })

    Object.entries({
        ytechDepreciationCorner: {
            durability: (7 + 1) * 7,
            items: [
                "ytech:antler_pickaxe"
            ]
        },
        stoneAge: {
            durability: 109,
            items: [
                "milf:flint_pickaxe", 
                "milf:flint_chisel", 
                "milf:stone_hammer",
                "ytech:flint_axe", 
                "ytech:flint_knife", 
                "ytech:flint_spear"
            ]
        },
        lead: {
            durability: 331,
            items: [
                "ytech:lead_pickaxe", 
                "ytech:lead_axe", 
                "ytech:lead_shovel", 
                "ytech:lead_hoe", 
                "ytech:lead_sword",
                "ytech:lead_knife", 
                "ytech:lead_saw", 
                "ytech:lead_file", 
                "ytech:lead_hammer"
            ]
        },
        bronze: {
            durability: 109*5,
            items: [
                "ytech:bronze_pickaxe", 
                "ytech:bronze_axe", 
                "ytech:bronze_shovel", 
                "ytech:bronze_hoe", 
                "ytech:bronze_sword",
                "ytech:bronze_knife", 
                "ytech:bronze_saw", 
                "ytech:bronze_file", 
                "ytech:bronze_hammer"
            ]
        },
        iron: {
            durability: 701,
            items: [
                "minecraft:iron_pickaxe", 
                "minecraft:iron_axe", 
                "minecraft:iron_shovel", 
                "minecraft:iron_hoe", 
                "minecraft:iron_sword"
            ]
        },
        silver: {
            durability: 561,
            items: [
                "embers:silver_sword",
                "embers:silver_pickaxe",
                "embers:silver_axe",
                "embers:silver_shovel",
                "embers:silver_hoe"
            ]
        }
    }).forEach(([material, data]) => {
        let { durability, items } = data
        items.forEach(id => {
            event.modify(id, item => { item.maxDamage = durability })
        })
    })

    event.modify("ytech:stone_mortar_and_pestle", item => { item.maxDamage = 365 })

    event.modify("ytech:bronze_mesh", item => { item.maxDamage = 100 })
    event.modify("ars_hex:magebloom_brush", item => { item.maxDamage = 3000 })


    event.modify("cataclysm:ring_of_grudged", item => {
        item.attachCuriosCapability(
            CuriosJSCapabilityBuilder.create().addAttribute(
                "cataclysm:additional_critical_damage",
                "milf:ring_of_grudged", 10, "add_value"
            )
        )
    })

    event.modify('modern_industrialization:sodium_block', item => {
        item.modifyFood(food => {
            food.nutrition(2)
            food.saturation(2)
            food.effect('minecraft:nausea', 200, 0, 1)
        })
    })

    event.modify('milf:pet_rock', item => {
        item.modifyFood(food => {
            food.nutrition(4)
            food.saturation(0.25)
            food.effect('minecraft:nausea', 200, 0, 0.38)
        })
    })

    event.modify('oritech:machine_speed_addon', item => {
        item.setMaxStackSize(16)
    })

    event.modify('oritech:machine_efficiency_addon', item => {
        item.setMaxStackSize(16)
    })

    event.modify('oritech:machine_ultimate_addon', item => {
        item.setMaxStackSize(16)
    })

    event.modify('oritech:machine_yield_addon', item => {
        item.setMaxStackSize(16)
    })

    event.modify('ytech:clay_bucket', item => {
        //item.resetComponents().set($DataComponents.MAX_DAMAGE, 1)
        item.setMaxDamage(1)
        item.setMaxStackSize(1)
        item.setDamage(0)
        item.disableRepair()

    })

    // event.modify('milf:clay_bucket', item => {
    //     item.resetComponents().set("immersiveengineering:fluid", {})
    // })

    // Array.of(
    //     "milf:clay_bucket",
    //     "milf:clay_mold_axe",
    //     "milf:clay_mold_hammer",
    //     "milf:clay_mold_hoe",
    //     "milf:clay_mold_pickaxe",
    //     "milf:clay_mold_shovel",
    //     "milf:clay_mold_sword",
    //     "milf:clay_mold_ingot"
    // ).forEach(id => {
    //     event.modify(id, item => {
    //         item.resetComponents().set("immersiveengineering:fluid", {})
    //     })
    // })

    event.modify('malum:crude_scythe', item => {
        item.setMaxDamage(450)
        item.setAttackDamage(8)
        item.setAttackSpeed(-2.9)
    })

})