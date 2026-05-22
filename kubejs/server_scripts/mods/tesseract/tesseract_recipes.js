ServerEvents.recipes(event => {
    
    event.remove({output: [
        "tesseract:tesseract",
    ]})
    addHephaestusRitual("tesseract", {
        enhancers: "forbidden_arcanus:maledictus_pact",
        essences: { aureal: 5000, blood: 2000, souls: 20, experience: 2000 },
        mainIngredient: "modern_industrialization:singularity",
        inputs: [
            { item: "simplyswords:runic_tablet", amount: 1 },
            { item: "advanced_ae:shattered_singularity", amount: 4 },
            { item: "modern_industrialization:titanium_large_plate", amount: 3 },
        ],
        forgeTier: 4,
        result: "tesseract:tesseract",
        resultCount: 2,
    })  
})