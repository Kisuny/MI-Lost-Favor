ServerEvents.recipes(event => {

    customWorktable(event, {
        pattern: [
            " qq", 
            " qq", 
            "q  "
        ],
        reagents: ["w   "],
        key: {
            "q": { "item": "crittersandcompanions:silk" },
            "w": { "item": "eidolon_repraised:holy_symbol" },
        },
        result: "crittersandcompanions:grappling_hook",
        removeRecipe: true
    })

})