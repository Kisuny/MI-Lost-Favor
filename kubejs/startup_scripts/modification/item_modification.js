ItemEvents.modification(event => {
    
    const ytech_tool_modification = [
        { itemName: 'ytech:copper_pickaxe', maxDamage: 64, multiplier: 3, speed: 5.5, type: 'pickaxe' },
        { itemName: 'ytech:copper_shovel', maxDamage: 64, multiplier: 3, speed: 5.5, type: 'shovel' },
        { itemName: 'ytech:copper_axe', maxDamage: 64, multiplier: 3, speed: 5.5, type: 'axe' },
        { itemName: 'ytech:copper_hoe', maxDamage: 64, multiplier: 3, speed: 5.5, type: 'hoe' },
        { itemName: 'ytech:lead_pickaxe', maxDamage: 32, multiplier: 3, speed: 3, type: 'pickaxe' },
        { itemName: 'ytech:lead_shovel', maxDamage: 32, multiplier: 3, speed: 3, type: 'shovel' },
        { itemName: 'ytech:lead_axe', maxDamage: 32, multiplier: 3, speed: 3, type: 'axe' },
        { itemName: 'ytech:lead_hoe', maxDamage: 32, multiplier: 3, speed: 3, type: 'hoe' },
        { itemName: 'ytech:tin_pickaxe', maxDamage: 28, multiplier: 3, speed: 16, type: 'pickaxe' },
        { itemName: 'ytech:tin_shovel', maxDamage: 28, multiplier: 3, speed: 16, type: 'shovel' },
        { itemName: 'ytech:tin_axe', maxDamage: 28, multiplier: 3, speed: 16, type: 'axe' },
        { itemName: 'ytech:tin_hoe', maxDamage: 28, multiplier: 3, speed: 16, type: 'hoe' },
        { itemName: 'ytech:bronze_pickaxe', maxDamage: 384, multiplier: 2, speed: 5.5, type: 'pickaxe' },
        { itemName: 'ytech:bronze_shovel', maxDamage: 384, multiplier: 2, speed: 5.5, type: 'shovel' },
        { itemName: 'ytech:bronze_axe', maxDamage: 384, multiplier: 2, speed: 5.5, type: 'axe' },
        { itemName: 'ytech:bronze_hoe', maxDamage: 384, multiplier: 2, speed: 5.5, type: 'hoe' },
        { itemName: 'minecraft:iron_pickaxe', maxDamage: 384, multiplier: 1, speed: 6, type: 'pickaxe' },
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

            item.maxDamage = tool.maxDamage * tool.multiplier;
        });
    });

    const hammer_modification = [
        { itemName: 'ytech:stone_hammer', maxDamage: 70 },
        { itemName: 'ytech:bronze_hammer', maxDamage: 300 },
        { itemName: 'ytech:tin_hammer', maxDamage: 125 },
        { itemName: 'ytech:lead_hammer', maxDamage: 200 },
        { itemName: 'ytech:iron_hammer', maxDamage: 250 },
        { itemName: 'ytech:golden_hammer', maxDamage: 64 },
        { itemName: 'ytech:copper_hammer', maxDamage: 150 },
    ]

    hammer_modification.forEach(hammer => {
        event.modify(hammer.itemName, item => {
            item.maxDamage = hammer.maxDamage * 3
        })
    });

    event.modify("ytech:stone_mortar_and_pestle", item => {item.maxDamage = 365})

    event.modify("ytech:bronze_mesh", item => {item.maxDamage = 100})
    event.modify("ars_hex:magebloom_brush", item => {item.maxDamage = 3000})


    event.modify("cataclysm:ring_of_grudged", item =>{
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

})