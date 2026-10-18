ServerEvents.recipes(event => {

    milfStoneBasinRecipe(event, {
        inputItems: [
            [{ item: "minecraft:clay_ball" }],
            [{ item: "minecraft:clay_ball" }],
            [{ item: "milf:fire_clay_ball" }],
            [{ item: "minecraft:charcoal" }]
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 500]
        ],
        outputItems: [
            [{ id: "embers:caminite_blend" }, 6],
        ],
        requires_bellows: true,
        stirs: 4,
        removeRecipe:true
    })


})
