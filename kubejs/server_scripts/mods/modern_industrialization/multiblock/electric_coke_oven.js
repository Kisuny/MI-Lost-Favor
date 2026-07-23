ServerEvents.recipes(event => {
    event.forEachRecipe({ type: 'modern_industrialization:coke_oven', not : {output: "#milf:nocompat"}}, r => {
        const rjson = JSON.parse(r.json)
        miMachineRecipe(event, {
            machine:"modern_industrialization:electric_coke_oven",
            energy:rjson.eu,
            time:rjson.duration,
            inputItems:[[rjson.item_inputs]],
            outputItems:[[rjson.item_outputs]],
            outputFluids:[[rjson.fluid_outputs]]
        })
    })
})