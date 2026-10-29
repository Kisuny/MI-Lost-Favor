milfDisableRecipesById([
    "royalvariations:gold_ingot_from_smelting_royal_bone",
    "royalvariations:gold_ingot_from_blasting_royal_bone"
])

ServerEvents.recipes(event => {
    embersMeltingRecipe(event, {
        inputItems: [
            [{ item: "royalvariations:royal_bone" }, 1],
        ],
        outputFluids: [
            [{ fluid: "embers:molten_gold" }, 120]
        ]
    })
})