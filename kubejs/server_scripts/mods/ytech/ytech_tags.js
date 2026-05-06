ServerEvents.tags("item", event => {
    event.removeAllTagsFrom([
        "ytech:tin_plate",
        "ytech:lead_plate",
        "ytech:copper_plate",
        "ytech:golden_plate",
        "ytech:bronze_plate",
        "ytech:iron_plate",
        "ytech:lead_ingot",
        "ytech:tin_ingot",
        "ytech:bronze_ingot",
        "ytech:bronze_rod",
        "ytech:tin_rod",
        "ytech:lead_rod",
        "ytech:copper_rod",
        "ytech:golden_rod",
        "ytech:iron_rod",
        "ytech:golden_bolt",
        "ytech:iron_bolt",
        "ytech:bronze_bolt",
        "ytech:copper_bolt",
        "ytech:tin_bolt",
        "ytech:lead_bolt",
        "ytech:bronze_block",
        "ytech:tin_block",
        "ytech:nether_iron_ore",
        "ytech:nether_copper_ore",
        "ytech:lead_block",
        'ytech:gold_axe_head_part', 
        'ytech:copper_axe_head_part', 
        'ytech:tin_axe_head_part', 
        'ytech:tin_sword_blade_part', 
        'ytech:tin_pickaxe_head_part', 
        'ytech:copper_sword_blade_part', 
        'ytech:lead_axe_head_part', 
        'ytech:copper_sword', 
        'ytech:copper_shears', 
        'ytech:lead_sword', 
        'ytech:tin_sword', 
        'ytech:tin_shovel', 
        'ytech:lead_shovel', 
        'ytech:copper_shovel', 
        'ytech:tin_shears', 
        'ytech:lead_shears', 
        'ytech:golden_shears', 
        'ytech:copper_axe', 
        'ytech:copper_pickaxe', 
        'ytech:tin_pickaxe', 
        'ytech:lead_pickaxe', 
        'ytech:lead_sword_blade_part', 
        'ytech:lead_pickaxe_head_part', 
        'ytech:copper_pickaxe_head_part', 
        'ytech:lead_axe', 
        'ytech:tin_axe', 
        'ytech:gold_sword_blade_part',
        'ytech:gold_pickaxe_head_part',
        'ytech:tin_mortar_and_pestle', 
        'ytech:lead_mortar_and_pestle', 
        'ytech:iron_mortar_and_pestle', 
        'ytech:copper_mortar_and_pestle', 
        'ytech:golden_mortar_and_pestle', 
        'ytech:tin_knife', 
        'ytech:lead_knife', 
        'ytech:iron_knife', 
        'ytech:golden_knife', 
        'ytech:copper_knife', 
        'ytech:copper_hoe', 
        'ytech:lead_hoe', 
        'ytech:tin_hoe', 
        'ytech:tin_hammer', 
        'ytech:lead_hammer', 
        'ytech:iron_hammer', 
        'ytech:golden_hammer', 
        'ytech:copper_hammer', 
        'ytech:tin_file', 
        'ytech:lead_file', 
        'ytech:iron_file', 
        'ytech:golden_file', 
        'ytech:copper_file', 
        'ytech:tin_hammer_head_part', 
        'ytech:lead_hammer_head_part', 
        'ytech:gold_hammer_head_part', 
        'ytech:copper_hammer_head_part', 
        'ytech:copper_saw', 
        'ytech:golden_saw', 
        'ytech:iron_saw', 
        'ytech:lead_saw', 
        'ytech:tin_saw',
    ])

    event.add("modern_industrialization:forge_hammer_tools", [
        "ytech:bronze_hammer",
        "ytech:lead_hammer",
        "ytech:copper_hammer",
        "ytech:iron_hammer",
        "ytech:iron_hammer",
        "ytech:stone_hammer",
        "ytech:golden_hammer",
        "ytech:tin_hammer"
    ])

    event.add("ytech:molds/hoe_head", [
        "milf:hoe_head_clay_mold",
        "milf:hoe_head_sand_mold",
    ])
    
    event.add("ytech:molds/shovel_head", [
        "milf:shovel_head_clay_mold",
        "milf:shovel_head_sand_mold",
    ])
    event.add("ytech:molds", [
        "milf:hoe_head_clay_mold",
        "milf:hoe_head_sand_mold",
        "milf:shovel_head_clay_mold",
        "milf:shovel_head_sand_mold",
    ])
    event.add("ytech:clay_molds", [
        "milf:hoe_head_clay_mold",
        "milf:shovel_head_clay_mold",
    ])
    event.add("ytech:clay_molds/hoe_head", [
        "milf:hoe_head_clay_mold",
    ])
    event.add("ytech:clay_molds/shovel_head", [
        "milf:shovel_head_clay_mold",
    ])
    event.add("ytech:sand_molds/hoe_head", [
        "milf:hoe_head_sand_mold",
    ])
    event.add("ytech:sand_molds/shovel_head", [
        "milf:shovel_head_sand_mold",
    ])
    event.add("ytech:unfired_molds", [
        "milf:unfired_hoe_head_mold",
        "milf:unfired_shovel_head_mold",
    ])
    event.add("ytech:unfired_molds/hoe_head", [
        "milf:unfired_hoe_head_mold",
    ])
    event.add("ytech:unfired_molds/shovel_head", [
        "milf:unfired_shovel_head_mold",
    ])
    event.add("ytech:sand_molds", [
        "milf:hoe_head_sand_mold",
        "milf:shovel_head_sand_mold",
    ])
    event.add("ytech:patterns", [
        "milf:hoe_head_pattern",
        "milf:shovel_head_pattern",
    ])
    event.add("ytech:patterns/hoe_head", [
        "milf:hoe_head_pattern",
    ])
    event.add("ytech:patterns/shovel_head", [
        "milf:shovel_head_pattern",
    ])
    event.add("ytech:parts", [
        "milf:bronze_hoe_head_part",
        "milf:bronze_shovel_head_part",
    ])
    event.add("ytech:parts/hoe_heads/bronze", [
        "milf:bronze_hoe_head_part",
    ])
    event.add("ytech:parts/shovel_heads/bronze", [
        "milf:bronze_shovel_head_part",
    ])
    event.add("ytech:parts/hoe_heads", [
        "milf:bronze_hoe_head_part",
    ])
    event.add("ytech:parts/shovel_heads", [
        "milf:bronze_shovel_head_part",
    ])

    event.add("ytech:sharp_flints", [
        'farmersdelight:golden_knife',
        'farmersdelight:diamond_knife',
        'farmersdelight:netherite_knife',
        'farmersdelight:iron_knife']
    )



    event.add("milf:coals_for_bloom", [
        "minecraft:coal",
        "minecraft:charcoal",
        "modern_industrialization:coal_crushed_dust",
        "modern_industrialization:lignite_coal_crushed_dust",
        "malum:arcane_charcoal"
    ])

    event.add("ytech:sharp_flints", ["ytech:flint_knife", ""])

    const tags_for_meat = [
        "c:foods",
        "c:foods/cooked_meats",
        "minecraft:wolf_food",
        "more_sounds:food"
    ]
    tags_for_meat.forEach(tag => {
        event.add(tag, "ytech:cooked_venison")
    });

    event.add("c:buckets", "ytech:water_clay_bucket")
    event.add("c:buckets/water", "ytech:water_clay_bucket")

})

ServerEvents.tags("block", event => {
    event.add("minecraft:mineable/pickaxe", "#ytech:aqueducts")
})