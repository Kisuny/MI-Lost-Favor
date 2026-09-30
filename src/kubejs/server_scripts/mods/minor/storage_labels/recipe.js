ServerEvents.recipes(event => {
    milfShaped(event, {
        pattern: [
            "P P",
            "P P",
            "P P"
        ],
        key: {
            P: {tag:"c:paper"}
        },
        outputItems:[[{"id": "labels:label"}, 6]],
        removeRecipe:true
    })

})