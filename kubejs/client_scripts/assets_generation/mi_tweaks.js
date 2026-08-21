ClientEvents.generateAssets("before_mods", event => {
    Object.entries(global.miTweaksMachinesData).forEach(([machineId, data]) => {

        let machineResourceLocation = `mi_tweaks:${machineId}`

        let { frontOverlay, topOverlay, sideOverlay, mainCasing, mainOverlays } = data.model.block

        event.json(`mi_tweaks:blockstates/${machineId}`, {
            "variants": {
                "": {
                    "model": `mi_tweaks:block/${machineId}`
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
            modelJson.default_overlays.front = `modern_industrialization:block/machines/${mainOverlays}/overlay_front`
            modelJson.default_overlays.front_active = `modern_industrialization:block/machines/${mainOverlays}/overlay_front_active`
        }

        if (topOverlay) {
            modelJson.default_overlays.top = `modern_industrialization:block/machines/${mainOverlays}/overlay_top`
            modelJson.default_overlays.top_active = `modern_industrialization:block/machines/${mainOverlays}/overlay_top_active`
        }

        if (sideOverlay) {
            modelJson.default_overlays.side = `modern_industrialization:block/machines/${mainOverlays}/overlay_side`
            modelJson.default_overlays.side_active = `modern_industrialization:block/machines/${mainOverlays}/overlay_side_active`
        }

        event.json(`mi_tweaks:models/block/${machineId}`, modelJson)

        event.json(`mi_tweaks:models/item/${machineId}`, {
            "parent": `mi_tweaks:block/${machineId}`
        })

    })
})