ServerEvents.recipes(event => {
    yTechShaped(event, {
        pattern: [
            'PEE',
            'PDE',
            'HPP'
        ],
        key: {
            E: { item: "paganbless:essence_of_the_forest" },
            P: { item: "modern_industrialization:iron_plate" },
            D: { item: "modern_industrialization:iron_double_ingot" },
            H: { tag: "c:hammers" }
        },
        outputItems: [[{ id: "milf:orb_of_the_forest" }, 1]],
        compatOff: true
    })
})