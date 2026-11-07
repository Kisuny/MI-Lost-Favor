global.miImpetusMaterials = [
    "steel", "aluminum", "antimony", "beryllium", "chromium", "iridium",
    "platinum", "stainless_steel", "titanium", "tungsten",
    "pure_azurite", "pure_bloodstone", "pure_malachite", "oblivion_alloy"
]

ItemEvents.modification(event => {

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

    const ytech_tool_modification = [
        { itemName: 'ytech:copper_pickaxe', speed: 5.5, type: 'pickaxe' },
        { itemName: 'ytech:copper_shovel', speed: 5.5, type: 'shovel' },
        { itemName: 'ytech:copper_axe', speed: 5.5, type: 'axe' },
        { itemName: 'ytech:copper_hoe', speed: 5.5, type: 'hoe' },
        { itemName: 'ytech:lead_pickaxe', speed: 3, type: 'pickaxe' },
        { itemName: 'ytech:lead_shovel', speed: 3, type: 'shovel' },
        { itemName: 'ytech:lead_axe', speed: 3, type: 'axe' },
        { itemName: 'ytech:lead_hoe', speed: 3, type: 'hoe' },
        { itemName: 'ytech:tin_pickaxe', speed: 16, type: 'pickaxe' },
        { itemName: 'ytech:tin_shovel', speed: 16, type: 'shovel' },
        { itemName: 'ytech:tin_axe', speed: 16, type: 'axe' },
        { itemName: 'ytech:tin_hoe', speed: 16, type: 'hoe' },
        { itemName: 'ytech:bronze_pickaxe', speed: 5.5, type: 'pickaxe' },
        { itemName: 'ytech:bronze_shovel', speed: 5.5, type: 'shovel' },
        { itemName: 'ytech:bronze_axe', speed: 5.5, type: 'axe' },
        { itemName: 'ytech:bronze_hoe', speed: 5.5, type: 'hoe' },
        { itemName: 'minecraft:iron_pickaxe', speed: 6, type: 'pickaxe' },
    ];

    const blockTagByType = {
        pickaxe: "#minecraft:mineable/pickaxe",
        shovel: "#minecraft:mineable/shovel",
        axe: "#minecraft:mineable/axe",
        hoe: "#minecraft:mineable/hoe"
    };

    ytech_tool_modification.forEach(tool => {
        event.modify(tool.itemName, item => {
            const tag = blockTagByType[tool.type] || "#minecraft:incorrect_for_iron_tool";

            const correctRule = {
                correctForDrops: true,
                blocks: tag
            };
            if (tool.speed !== undefined) correctRule.speed = tool.speed;

            item.setTool({
                damagePerBlock: item.tool?.damagePerBlock || 1,
                rules: [
                    correctRule,
                    { correctForDrops: false, blocks: "#minecraft:incorrect_for_iron_tool" }
                ]
            });
        });
    });

    const toolDurabilityByMaterial = {
        stone_age: {
            durability: 250,
            items: [
                "milf:flint_pickaxe", "milf:flint_chisel", "milf:stone_hammer",
                "ytech:flint_axe", "ytech:flint_knife", "ytech:flint_spear", "ytech:antler_pickaxe"
            ]
        },
        lead: {
            durability: 500,
            items: [
                "ytech:lead_pickaxe", "ytech:lead_axe", "ytech:lead_shovel", "ytech:lead_hoe", "ytech:lead_sword",
                "ytech:lead_knife", "ytech:lead_saw", "ytech:lead_file", "ytech:lead_hammer"
            ]
        },
        bronze: {
            durability: 1000,
            items: [
                "ytech:bronze_pickaxe", "ytech:bronze_axe", "ytech:bronze_shovel", "ytech:bronze_hoe", "ytech:bronze_sword",
                "ytech:bronze_knife", "ytech:bronze_saw", "ytech:bronze_file", "ytech:bronze_hammer"
            ]
        },
        iron: {
            durability: 1400,
            items: [
                "minecraft:iron_pickaxe", "minecraft:iron_axe", "minecraft:iron_shovel", "minecraft:iron_hoe", "minecraft:iron_sword"
            ]
        }
    }

    Object.keys(toolDurabilityByMaterial).forEach(material => {
        const entry = toolDurabilityByMaterial[material]
        entry.items.forEach(id => {
            event.modify(id, item => { item.maxDamage = entry.durability })
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