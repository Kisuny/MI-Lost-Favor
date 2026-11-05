ServerEvents.recipes(event => {
    event.forEachRecipe({ type: 'modern_industrialization:quarry', not: { output: "#milf:nocompat" } }, r => {
        const rjson = JSON.parse(r.json)
        if (!Array.isArray(rjson.item_inputs)) { rjson.item_inputs = [rjson.item_inputs] }
        if (!Array.isArray(rjson.item_outputs)) { rjson.item_outputs = [rjson.item_outputs] }

        let inputItems = []
        let outputItems = []

        rjson.item_outputs.forEach((out) => {
            outputItems.push([out, out.amount, out.probability])
        })

        rjson.item_inputs.forEach((out) => {
            inputItems.push([out, out.amount, out.probability])
        })

        inputItems.push([{item: "milf:navigation_module"}, 1, 0.08])

        miMachineRecipe(event, {
            energy: (rjson.eu >= 8 ? rjson.eu : 8), time: rjson.duration, machine: "modern_industrialization:quarry",
            inputItems: inputItems,
            outputItems: outputItems,
            removeThisRecipeType:true,
        })

        //console.log(rjson);


    })
})