ServerEvents.recipes(event => {
    
    
    customThaumInfusion(event, {
        catalyst: 'angelring:diamond_ring',
        components: 
        [
            "ars_hex:archwood_broom",
            "enchanted:flying_ointment",
            "modern_industrialization:diesel_jetpack",
            "embers:cinder_jet",
            "neovitae:tabula_aetherea",
            "neovitae:prismatic_spiritus_gem",
            "neovitae:deus_shard",
            "modern_industrialization:quantum_circuit",
            "enigmaticlegacyplus:majestic_elytra",
        ],
        aspects: { volatus: 64, aer: 40, motus: 32, praecantatio: 24, potentia: 24, desiderium: 16 },
        instability: 25, 
        research: 'thaumaturge:infusion',
        result: 'angelring:angel_ring',
        removeOutput: true

    })
    
})