ServerEvents.recipes(event => {

    milfShaped(event, {
        pattern: [
            "ewe",
            "wqw",
            "ewe"
        ],
        key: {
            q: {item:"modern_industrialization:analog_circuit"},
            w: {item: "sfm:cable"},
            e: {tag: "c:chests"},
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
            q: {item:"modern_industrialization:pump"},
            w: {item: "enchanted:whiff_of_magic"},
            e: {item: "modern_industrialization:basic_machine_hull"},
            r: {item: "immersiveengineering:light_engineering"},
        },
        outputItems:[[{"id": "sfm:water_tank"}]],
        removeRecipe:true
    })
    milfShaped(event, {
        pattern: [
            "qqq",
            "rer",
            "www"
        ],
        key: {
            q: {item:"moderndynamics:fluid_pipe"},
            w: {item:"moderndynamics:item_pipe"},
            e: {item:"moderndynamics:machine_extender"},
            r: {item:"minecraft:iron_bars"},
        },
        outputItems:[[{"id": "sfm:cable"}, 16]],
        removeRecipe:true
    })
    
})