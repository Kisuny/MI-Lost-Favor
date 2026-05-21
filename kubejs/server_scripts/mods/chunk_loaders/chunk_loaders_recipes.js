ServerEvents.recipes(event => {
    milfShaped(event, {
        pattern: [
            "wew",
            "eqe",
            "wew"
        ],
        key: {
            q: { item: "modern_industrialization:analog_circuit" },
            w: { item: "enchanted:attuned_stone_charged" },
            e: { item: "immersiveengineering:heavy_engineering" }
        },
        outputItems: [[{ id: "chunkloaders:basic_chunk_loader" }]],
        removeRecipe: true
    })
    milfShaped(event, {
        pattern: [
            "wew",
            "eqe",
            "wew"
        ],
        key: {
            q: { item: "chunkloaders:basic_chunk_loader" },
            w: { item: "modern_industrialization:advanced_machine_hull" },
            e: { item: "modern_industrialization:electronic_circuit" }
        },
        outputItems: [[{ id: "chunkloaders:advanced_chunk_loader" }]],
        removeRecipe: true
    })
    milfShaped(event, {
        pattern: [
            "wew",
            "eqe",
            "wew"
        ],
        key: {
            q: { item: "chunkloaders:advanced_chunk_loader" },
            w: { item: "modern_industrialization:quantum_machine_hull" },
            e: { item: "modern_industrialization:quantum_circuit" }
        },
        outputItems: [[{ id: "chunkloaders:ultimate_chunk_loader" }]],
        removeRecipe: true
    })
    
})