ServerEvents.recipes(event => {
    let itemEntries = global.disabledItems

    itemEntries.forEach(entry => {
        let itemId = entry.id
        let replaceWithId = entry.replaceData.id
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