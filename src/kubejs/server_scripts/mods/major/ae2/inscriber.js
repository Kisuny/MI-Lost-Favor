function aeInscriberRecipe(event, args){
    let recipe = {
        type: "ae2:inscriber",
        mode: args.mode || "press",
        key: args.key,
        ingredients: args.inputItems.reduce((accumulator, currentValue, index) => { 
            switch (index) {
                case 0:
                    accumulator.middle = currentValue[0]
                    break;
                case 1:
                    accumulator.top = currentValue[0]
                    break;
                case 2:
                    accumulator.bottom = currentValue[0]
                    break;
            }
            return accumulator
        }, {}),
        result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
    }

    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    aeInscriberRecipe(event, {
        inputItems: [
            [{ "item": "milf:tempered_glass" }, 1],
            [{ "item": "modern_industrialization:steel_curved_plate" }, 1],
            [{ "item": "milf:hemispherical_press_mold" }, 1],
        ],
        outputItems: [[{ "id": "milf:lens" }, 1]],
        mode: "inscribe"
    })

    aeInscriberRecipe(event, {
        inputItems: [
            [{ "item": "milf:cd" }, 1],
            [{ "item": MILF_BLUEPRINTS.getDisk.tier2AE }, 1],
            [{ "item": "modern_industrialization:biosteel_large_plate" }, 1],
        ],
        outputItems: [[{ "id": MILF_BLUEPRINTS.getDisk.tier2AE }, 1]],
        mode: "inscribe"
    })

    aeInscriberRecipe(event, {
        inputItems: [
            [{ "item": "milf:cd" }, 1],
            [{ "item": MILF_BLUEPRINTS.getDisk.tier3AE }, 1],
            [{ "item": "modern_industrialization:adamant_large_plate" }, 1],
        ],
        outputItems: [[{ "id": MILF_BLUEPRINTS.getDisk.tier3AE }, 1]],
        mode: "inscribe"
    })

    aeInscriberRecipe(event, {
        inputItems: [
            [{ "item": "milf:cd" }, 1],
            [{ "item": MILF_BLUEPRINTS.getDisk.tier4AE }, 1],
            [{ "item": "modern_industrialization:battery_alloy_large_plate" }, 1],
        ],
        outputItems: [[{ "id": MILF_BLUEPRINTS.getDisk.tier4AE }, 1]],
        mode: "inscribe"
    })
})