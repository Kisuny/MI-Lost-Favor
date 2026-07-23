ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "ewe",
            "wqw",
            "ewe"
        ],
        key: {
            q: { item:"immersiveengineering:component_electronic"},
            w: { item: "immersiveengineering:heavy_engineering"},
            e: { item: "modern_industrialization:rubber_sheet"},
        },
        outputItems:[[{"id": "sfm:manager"}]],
        removeRecipe:true
    })
    milfShaped(event, {
        pattern: [
            "rqr",
            "wew",
            "rqr"
        ],
        key: {
            q: { item:"milf:basic_pump"},
            w: { item: "modern_industrialization:steel_water_pump"},
            e: { item: "immersiveengineering:component_electronic"},
            r: { item: "modern_industrialization:iron_large_plate"},
        },
        outputItems:[[{"id": "sfm:water_tank"}]],
        removeRecipe:true
    })
    milfShaped(event, {
        pattern: [
            "qqq",
            "rep",
            "www"
        ],
        key: {
            q: {item:"moderndynamics:fluid_pipe"},
            w: {item:"moderndynamics:item_pipe"},
            e: {item:"moderndynamics:machine_extender"},
            r: { item:"milf:basic_motor"},
            p: { item: "milf:basic_pump" },
        },
        outputItems:[[{"id": "sfm:cable"}, 6]],
        removeRecipe:true
    })
    
})