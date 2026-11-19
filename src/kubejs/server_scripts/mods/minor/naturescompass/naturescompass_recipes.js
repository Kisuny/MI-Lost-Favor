ServerEvents.recipes(event => {
    customMixingCauldron(event, {
        fluid: "minecraft:water",
        fluidAmount: 1000,
        ingredients: [
            { "item": "minecraft:compass" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:essence_of_the_forest" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
            { "item": "paganbless:black_thorn_log" },
        ],
        output: "naturescompass:naturescompass",
        removeRecipe: true
    });
})