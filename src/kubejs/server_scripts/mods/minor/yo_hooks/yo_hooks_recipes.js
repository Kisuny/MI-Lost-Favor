ServerEvents.recipes(event => {

    let materials = ["iron", "gold", "diamond"]

    materials.forEach(material => {

        milfShaped(event, {
            pattern: [
                " HR",
                " RR",
                "S  "
            ],
            key: {
                R: { item: "modern_industrialization:steel_ring" },
                H: { item: `yo_hooks:${material}_hook_head` },
                S: { tag: "milf:sticks" }
            },
            outputItems: [[{ id: `yo_hooks:${material}_grappling_hook` }, 1]],
            removeRecipe: true,

        })

        milfShaped(event, {
            pattern: [
                " PP",
                " PR",
                "   "
            ],
            key: {
                R: { item: "modern_industrialization:steel_ring" },
                P: { item: `modern_industrialization:${material}_plate` },
            },
            outputItems: [[{ id: `yo_hooks:${material}_hook_head` }, 1]],
            removeRecipe: true,

        })

    })




})