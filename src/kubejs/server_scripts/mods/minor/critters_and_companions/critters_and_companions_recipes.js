ServerEvents.recipes(event => {

    customMixingCauldron(event, {
        fluid: "minecraft:water",
        fluidAmount: 1000,
        ingredients: [
            { "item": "paganbless:runic_charge" },
            { "item": "crittersandcompanions:silk" },
            { "item": "crittersandcompanions:silk" },
            { "item": "crittersandcompanions:silk" },
            { "item": "crittersandcompanions:silk" },
            { "item": "crittersandcompanions:silk" },
            { "item": "crittersandcompanions:silk" },
            { "item": "crittersandcompanions:silk" },
        ],
        output: "crittersandcompanions:grappling_hook",
        removeRecipe: true
    });
})