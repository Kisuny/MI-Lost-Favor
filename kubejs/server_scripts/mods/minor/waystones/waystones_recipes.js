ServerEvents.recipes(event => {

    event.remove({
        output: [
            "waystones:return_scroll",
            "waystones:blank_scroll",
            "waystones:warp_scroll",
        ]
    })

    function anvil_recipe(inputs, output) {
        anvilSmashingCraft(event, {
            inputItems: inputs,
            outputItems: [output],
            removeRecipe: true
        })
    }

    anvil_recipe(
        [
            [{ "item": "minecraft:amethyst_shard" }, 4],
            [{ "item": "enchanted:attuned_stone_charged" }, 1],
            [{ "item": "enchanted:whiff_of_magic" }, 4],
        ],
        [{ "id": 'waystones:warp_stone' }, 1]
    );

    Ingredient.of('#waystones:waystones').itemIds.forEach(item => {
        pedestalFromRecipe(event, {
            id: item,
            tier: "basic",
            time: 400,
            amethyst: 16,
            citrine: 4,
            topaz: 4,
            experience: 4.0,
            advancement: "spectrum:place_pedestal"
        });
    })
    Ingredient.of('#waystones:portstones').itemIds.forEach(item => {
        pedestalFromRecipe(event, {
            id: item,
            tier: "basic",
            time: 400,
            amethyst: 8,
            experience: 4.0,
            advancement: "spectrum:place_pedestal"
        });
    })
    Ingredient.of('#waystones:sharestones').itemIds.forEach(item => {
        pedestalFromRecipe(event, {
            id: item,
            tier: "basic",
            time: 400,
            amethyst: 16,
            citrine: 4,
            topaz: 4,
            experience: 4.0,
            advancement: "spectrum:place_pedestal"
        });
    })

    pedestalFromRecipe(event, {
        id: "waystones:twinbound_feather",
        tier: "basic",
        time: 200,
        amethyst: 2,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "waystones:epitaph",
        tier: "basic",
        time: 200,
        amethyst: 4,
        citrine: 4,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "waystones:dormant_shard",
        tier: "basic",
        time: 200,
        amethyst: 4,
        citrine: 4,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "waystones:warp_dust",
        tier: "basic",
        time: 200,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "waystones:portal_scroll",
        tier: "basic",
        time: 200,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "waystones:warp_plate",
        tier: "basic",
        amethyst: 8,
        time: 200,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });


})