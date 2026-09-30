ServerEvents.recipes(event => {

    event.replaceInput({ id: 'supplementaries:pancake' }, 'minecraft:wheat', 'ytech:flour')
    yTechShaped(event, {
        pattern: [
            " S ",
            "PBP",
            "P#P"
        ],
        key: {
            "#": { "tag": "ytech:bone_needles" },
            "P": { "item": "ytech:grass_twine" },
            "S": { "tag": "ytech:leather_strips" },
            "B": { "item": "ytech:basket" }
        },
        outputItems: [[{ id: "supplementaries:lunch_basket" }, 1]],
        removeRecipeType: "minecraft:crafting_shaped"
    })

    event.shapeless('4x minecraft:ink_sac', ['supplementaries:antique_ink'])

})