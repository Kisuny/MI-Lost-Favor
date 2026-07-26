ServerEvents.recipes(event => {

    event.remove({output: [
        "waystones:return_scroll",
        "waystones:blank_scroll",
        "waystones:warp_scroll",
    ]})

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

})