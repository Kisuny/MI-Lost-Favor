ServerEvents.recipes(event => {

    let itemIdsAlreadyHandledByEI = new $HashSet()

    event.forEachRecipe({ type: "extended_industrialization:bending_machine", not: { output: "#milf:nocompat" } }, recipe => {
        let recipeJson = JSON.parse(recipe.json)
        let miItemInputs = ensureArray(recipeJson.item_inputs)
        let miItemOutputs = ensureArray(recipeJson.item_outputs)

        let miOutput = miItemOutputs[0]

        itemIdsAlreadyHandledByEI.add(miOutput.item)

    })

    event.forEachRecipe({ type: "modern_industrialization:compressor", not: { output: "#milf:nocompat" } }, recipe => {
        let recipeJson = JSON.parse(recipe.json)
        let miItemInputs = ensureArray(recipeJson.item_inputs)
        let miItemOutputs = ensureArray(recipeJson.item_outputs)

        let miOutput = miItemOutputs[0]

        if (itemIdsAlreadyHandledByEI.contains(miOutput.item)) return

        let miInput = miItemInputs[0]

        let shouldAddRecipe = false

        if (miInput.item){
            let item = Item.of(miInput.item)

            if (item && (item.hasTag("c:plates") || item.hasTag("c:rods") )) {
                shouldAddRecipe = true
            }

        } else {

            let key = $TagKey.create($Registries.ITEM, $ResourceLocation.parse(miInput.tag))
            let tagItems = $BuiltInRegistries.ITEM.getOrCreateTag(key)

            shouldAddRecipe = tagItems.stream().anyMatch(holder => {
                let currentItem = Item.of(holder.value())
                return currentItem && (currentItem.hasTag("c:plates")) || (currentItem.hasTag("c:rods"))
            })


        }

        if (shouldAddRecipe) {            

            miMachineRecipe(event, {
                energy: recipeJson.eu, time: recipeJson.duration / 2, machine: "extended_industrialization:bending_machine",
                inputItems: miItemInputs.map(entry => [entry]),
                outputItems: miItemOutputs.map(entry => [entry])
            })
        }



    })

    function ensureArray(miEntry) {
        return Array.isArray(miEntry) ? miEntry : [miEntry]
    }

})