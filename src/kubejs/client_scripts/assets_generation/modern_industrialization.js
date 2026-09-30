ClientEvents.generateAssets("after_mods", event => {
    Object.entries(global.miMachinesAssetsData).forEach(([machineId, data]) => {

        let machineResourceLocation = `modern_industrialization:${machineId}`

        let { frontOverlay, topOverlay, sideOverlay, mainCasing } = data

        event.json(`modern_industrialization:blockstates/${machineId}`, {
            "variants": {
                "": {
                    "model": `modern_industrialization:block/${machineId}`
                }
            }
        })

        let modelJson = {
            "casing": `modern_industrialization:${mainCasing}`,
            "default_overlays": {
                "fluid_auto": "modern_industrialization:block/overlays/fluid_auto",
                "item_auto": "modern_industrialization:block/overlays/item_auto",
                "output": "modern_industrialization:block/overlays/output"
            },
            "loader": "modern_industrialization:machine"
        }

        if (frontOverlay) {
            modelJson.default_overlays.front = frontOverlay.idle
            modelJson.default_overlays.front_active = frontOverlay.active
        }

        if (topOverlay) {
            modelJson.default_overlays.top = topOverlay.idle
            modelJson.default_overlays.top_active = topOverlay.active
        }

        if (sideOverlay) {
            modelJson.default_overlays.side = sideOverlay.idle
            modelJson.default_overlays.side_active = sideOverlay.active
        }

        event.json(`modern_industrialization:models/block/${machineId}`, modelJson)

        event.json(`modern_industrialization:models/item/${machineId}`, {
            "parent": `modern_industrialization:block/${machineId}`
        })

    })
})