ServerEvents.tags("item", event => {

    event.add("modern_industrialization:forge_hammer_tools", [
        "ytech:bronze_hammer",
        "ytech:stone_hammer",

    ])

    event.add("ytech:clay_molds", [
        "ytech:clay_bucket"
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

    event.add("ytech:sharp_flints", "#milf:knives")

    event.add("milf:coals_for_bloom", [
        "minecraft:coal",
        "minecraft:charcoal",
        "modern_industrialization:coal_dust",
        "modern_industrialization:coal_crushed_dust",
        "modern_industrialization:lignite_coal_crushed_dust",
        "modern_industrialization:lignite_coal",
        "modern_industrialization:lignite_coal_dust",
        "malum:arcane_charcoal",
        "grimoireofgaia:stone_coal"
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

    event.remove("ytech:require_valid_tool", "#minecraft:dirt")
})