milfDisableRecipesById([
    "relics:gold_ingot_from_golden_tooth",
    "relics:gold_nugget_from_golden_tooth"
])

ServerEvents.recipes(event => {
    embersMeltingRecipe(event, {
        inputItems: [
            [{ item: "relics:golden_tooth" }, 1],
        ],
        outputFluids: [
            [{ fluid: "embers:molten_gold" }, 30]
        ]
    })
})