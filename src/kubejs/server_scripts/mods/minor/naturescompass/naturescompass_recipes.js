ServerEvents.recipes(event => {
    customMixingCauldron(event, {
        fluid: "minecraft:lava",
        fluidAmount: 1000,
        ingredients: [
            { "item": "minecraft:compass" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "spectrum:vegetal_block" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
        ],
        output: "naturescompass:naturescompass",
        removeRecipe: true
    });
})