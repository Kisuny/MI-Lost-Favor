ServerEvents.recipes(event => {
    let itemEntries = global.disabledItems

    itemEntries.forEach(entry => {
        let itemId = entry.id
        let replaceWithId = entry.replaceData.id
        let regexMapping = entry.replaceData.regexMapping

        if (regexMapping) {
            getItemIdsByRegex(itemId).forEach(id => {
                let material = id.match(itemId)[1]
                let replaceWithRegexId = regexMapping(material)
                entry.replaceData.in.forEach(replaceInfo => {
                    switch (replaceInfo) {
                        case "RECIPE_INPUTS":
                            event.replaceInput({ input: id }, id, replaceWithRegexId)
                            break

                        case "RECIPE_OUTPUTS":
                            event.replaceOutput({ output: id }, id, replaceWithRegexId)
                            break
                    }
                })
                
                
            })
        }

        if (replaceWithId == null){
            event.remove({ output: itemId })
            event.remove({ input: itemId })
        } else {
            let isInput = false
            let isOutput = false
            entry.replaceData.in.forEach(replaceInfo => {
                switch (replaceInfo) {
                    case "RECIPE_INPUTS":
                        event.replaceInput({ input: itemId }, itemId, replaceWithId)
                        isInput = true
                        break

                    case "RECIPE_OUTPUTS":
                        event.replaceOutput({ output: itemId }, itemId, replaceWithId)
                        isOutput = true
                        break
                }
            })

            if (isOutput && !isInput){
                event.remove({ input: itemId })
            }

            if (!isOutput && isInput) {
                event.remove({ output: itemId })
            }

            if (!isOutput && !isInput){
                event.remove({ input: itemId })
                event.remove({ output: itemId })
            }

        }
    })

    let fluidEntries = global.disabledFluids

    fluidEntries.forEach(entry => {
        let fluidId = entry.id
        let replaceWithId = entry.replaceData.id

        let fluid = Fluid.of(fluidId)

        let bucket = fluid.getFluid().bucket

        if (bucket){
            event.remove({ output: bucket.getId() })
            event.remove({ input: bucket.getId() })
        }
        

        if (replaceWithId == null) {
            event.remove({ output: fluid })
            event.remove({ input: fluid })
        } else {

            let replaceWithFluid = Fluid.of(replaceWithId)

            let isInput = false
            let isOutput = false
            entry.replaceData.in.forEach(replaceInfo => {
                switch (replaceInfo) {
                    case "RECIPE_INPUTS":
                        event.replaceInput({ input: fluid }, fluid, replaceWithFluid)
                        isInput = true
                        break

                    case "RECIPE_OUTPUTS":
                        event.replaceOutput({ output: fluid }, fluid, replaceWithFluid)
                        isOutput = true
                        break
                }
            })

            if (isOutput && !isInput) {
                event.remove({ input: fluid })
            }

            if (!isOutput && isInput) {
                event.remove({ output: fluid })
            }

            if (!isOutput && !isInput) {
                event.remove({ input: fluid })
                event.remove({ output: fluid })
            }

        }
    })    

})