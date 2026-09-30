ServerEvents.recipes(event => {
    event.forEachRecipe({ type: 'extended_industrialization:alloy_smelter', not : {output: "#milf:nocompat"}}, r => {
        const rjson = JSON.parse(r.json)
        miMachineRecipe(event, {
            machine:"modern_industrialization:advanced_steam_alloy_smelter",
            energy:rjson.eu,
            time:rjson.duration,
            inputItems:rjson.item_inputs.map(item => [item]),
            outputItems:rjson.item_outputs.map(item => [item])
        })
    })
})