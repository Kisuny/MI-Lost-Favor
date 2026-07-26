ServerEvents.recipes(event => {
    
    event.remove({output: "angelring:angel_ring"})
    addHephaestusRitual("angel_ring", {
        enhancers: "forbidden_arcanus:divine_pact",
        forgeTier: 4,
        essences: { aureal: 5000, blood: 25000, souls: 200, experience: 5000 },
        mainIngredient: "angelring:diamond_ring",
        inputs: [
            { item: "hexerei:broom_thruster_brush", amount: 1 },
            { tag: "hexerei:brooms", amount: 1 },
            { item: "forbidden_arcanus:dark_nether_star", amount: 1 },
            { item: "modern_industrialization:diesel_jetpack", amount: 1 },
            { item: "enchanted:flying_ointment", amount: 1 },
            { item: "spectrum:bismuth_crystal", amount: 1 },
            { item: "spectrum:aether_vestiges", amount: 1 },
            { item: "eidolon_repraised:gravity_belt", amount: 1 },
        ],
        result: "angelring:angel_ring",
    })
    
})