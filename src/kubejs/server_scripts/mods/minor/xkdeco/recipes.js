ServerEvents.recipes(event => {

    //I wanna throw the DEV of this mod in the pit full of man-eating tapirs (^・ω・^ )
    //https://github.com/teaconmc/XKDeco/blob/1.21-neoforge/src/main/java/org/teacon/xkdeco/mixin/data/RecipeProviderMixin.java

    //event.remove({ type: "minecraft:stonecutting", output: "xkdeco:factory_vent_fan"})

    milfShaped(event, {
        pattern: [
            "BBB",
            "BcB",
            "BBB"
        ],
        key: {
            c: { item: "modern_industrialization:steel_machine_casing" },
            B: { item: "modern_industrialization:steel_bolt" },
        },
        outputItems: [[{ id: "xkdeco:steel_block" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "RDR",
            "RDR"
        ],
        key: {
            D: { item: "modern_industrialization:steel_double_ingot" },
            R: { item: "modern_industrialization:steel_rod" },
        },
        outputItems: [[{ id: "xkdeco:hollow_steel_beam" }, 3]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "CRC",
            "RrR",
            "CMC"
        ],
        key: {
            C: { item: "modern_industrialization:steel_curved_plate" },
            R: { item: "modern_industrialization:steel_rod" },
            r: { item: "modern_industrialization:steel_rotor" },
            M: { item: "milf:basic_motor" },
        },
        outputItems: [[{ id: "xkdeco:factory_vent_fan" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "CRC",
            "RrR",
            "CRC"
        ],
        key: {
            C: { item: "modern_industrialization:steel_large_plate" },
            R: { item: "modern_industrialization:steel_blade" },
            r: { item: "modern_industrialization:motor" },
        },
        outputItems: [[{ id: "xkdeco:factory_vent_fan_big" }, 1]],
        removeRecipe: true,
    })

    milfShaped(event, {
        pattern: [
            "P P",
            "   ",
            "P P"
        ],
        key: {
            P: { item: "modern_industrialization:steel_curved_plate" }
        },
        outputItems: [[{ id: "xkdeco:air_duct" }, 1]],
        removeRecipe: true,
    })
})

// milfDisableRecipesById([
//     "xkdeco:/stonecutter/steelwork/to/xkdeco/air_duct",
//     "xkdeco:/stonecutter/steelwork/exchange/xkdeco/air_duct"
// ])