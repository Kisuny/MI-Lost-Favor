ServerEvents.recipes(event => {
    const PEDESTAL_TACKLE = [
        { id: "starcatcher:hook", amethyst: 1, citrine: 1, topaz: 1 },
        { id: "starcatcher:vanilla_hook", citrine: 2 },
        {
            id: "starcatcher:stone_hook",
            citrine: 2,
            replace: [
                { from: "minecraft:iron_nugget", to: "#milf:fishes/stone" },
            ],
        },
        { id: "starcatcher:rusty_hook", citrine: 2 },
        { id: "starcatcher:split_hook", citrine: 2 },
        {
            id: "starcatcher:heavy_hook",
            citrine: 2,
            replace: [
                { from: "minecraft:iron_nugget", to: "#milf:fishes/iron" },
            ],
        },
        { id: "starcatcher:copper_hook", citrine: 2 },
        { id: "starcatcher:exposed_copper_hook", citrine: 2 },
        { id: "starcatcher:weathered_copper_hook", topaz: 2 },
        { id: "starcatcher:oxidised_copper_hook", topaz: 2 },
        {
            id: "starcatcher:mossy_hook",
            topaz: 2,
            replace: [
                { from: "minecraft:iron_nugget", to: "#milf:fishes/mossy" },
            ],
        },
        {
            id: "starcatcher:frozen_hook",
            topaz: 2,
            replace: [
                { from: "minecraft:blue_ice", to: "#milf:fishes/frozen" },
            ],
        },
        {
            id: "starcatcher:echoing_hook",
            amethyst: 2,
            replace: [
                { from: "minecraft:diamond", to: "#milf:fishes/echo" },
            ],
        },
        {
            id: "starcatcher:amethyst_hook",
            amethyst: 4,
            replace: [
                { from: "minecraft:diamond", to: "#milf:fishes/amethyst" },
            ],
        },
        {
            id: "starcatcher:shiny_hook",
            topaz: 4,
            replace: [
                { from: "minecraft:diamond", to: "spectrum:topaz_shard" },
                { from: "minecraft:iron_nugget", to: "abyssal_decor:white_pearl" },
            ],
        },
        {
            id: "starcatcher:gold_hook",
            citrine: 4,
            replace: [
                { from: "minecraft:gold_ingot", to: "spectrum:citrine_shard" },
                { from: "minecraft:gold_nugget", to: "devices:gold_coin" },
            ],
        },
        { id: "starcatcher:starcatcher_rod", amethyst: 1, citrine: 1, topaz: 1 },
        { id: "starcatcher:bobber", amethyst: 1, citrine: 1, topaz: 1 },
        { id: "starcatcher:vanilla_bobber", citrine: 2 },
        { id: "starcatcher:clear_bobber", topaz: 2 },
        { id: "starcatcher:cloud_bobber", topaz: 2 },
        { id: "starcatcher:leaf_bobber", topaz: 2 },
        { id: "starcatcher:slimey_bobber", topaz: 2 },
        { id: "starcatcher:glowing_bobber", citrine: 2 },
        {
            id: "starcatcher:dripstone_bobber",
            citrine: 2,
            replace: [
                { from: "minecraft:pointed_dripstone", to: "#milf:fishes/dripstone" },
            ],
        },
        {
            id: "starcatcher:steady_bobber",
            citrine: 2,
            replace: [
                { from: "minecraft:iron_ingot", to: "#milf:fishes/iron" },
            ],
        },
        {
            id: "starcatcher:golden_bobber",
            citrine: 4,
            replace: [
                { from: "minecraft:gold_ingot", to: "spectrum:citrine_shard" },
                { from: "minecraft:gold_block", to: "#milf:fishes/golden" },
            ],
        },
    ];

    PEDESTAL_TACKLE.forEach(recipe => {
        pedestalFromRecipe(event, Object.assign({
            tier: "basic",
            time: 100,
            advancement: "spectrum:place_pedestal",
        }, recipe));
    });
});
