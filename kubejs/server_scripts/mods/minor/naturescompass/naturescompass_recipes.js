ServerEvents.recipes(event => {
    customMixingCauldron(event, {
        fluid: "minecraft:lava",
        fluidAmount: 1000,
        ingredients: [
            { "item": "minecraft:compass" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "hexerei:dowsing_rod" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
        ],
        output: "naturescompass:naturescompass",
        removeRecipe: true
    });
})