
ServerEvents.tags("item", event => {

    event.add("modern_industrialization:forge_hammer_tools", [
        "ytech:bronze_hammer",
        "milf:stone_hammer",

    ])

    Object.entries({
        hoe: {
            partName: "head"
        },
        shovel: {
            partName: "head"
        },
        sword: {
            partName: "blade"
        },
        hammer: {
            partName: "head"
        },
        axe: {
            partName: "head"
        },
        pickaxe: {
            partName: "head"
        }
    }).forEach(([part, data]) => {

        let {partName} = data

        let materials = ["bronze", "lead"]

        materials.forEach(material => {
            event.add(`ytech:parts/${part}_${partName}s/${material}`, [
                `milf:${material}_${part}_${partName}`,
            ])
        })


    })


    // event.add("ytech:parts", [
    //     "milf:bronze_hoe_head",
    //     "milf:bronze_shovel_head",
    // ])
    // event.add("ytech:parts/hoe_heads/bronze", [
    //     "milf:bronze_hoe_head",
    // ])
    // event.add("ytech:parts/shovel_heads/bronze", [
    //     "milf:bronze_shovel_head",
    // ])
    // event.add("ytech:parts/hoe_heads", [
    //     "milf:bronze_hoe_head",
    // ])
    // event.add("ytech:parts/shovel_heads", [
    //     "milf:bronze_shovel_head",
    // ])

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