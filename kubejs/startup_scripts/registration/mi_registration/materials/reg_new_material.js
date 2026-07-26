MIMaterialEvents.addMaterials(event => {

    event.createMaterial('Constantan', 'constantan', 0xf1885b,
        builder => {
        builder
            .materialSet('shiny')
            .addParts('ingot', 'nugget', 'dust', 'tiny_dust', 'plate')
            .defaultRecipes()
    })

    event.createMaterial('Saltpeter', 'saltpeter', 0x9C9E9E,
        builder => {
        builder
            .materialSet('shiny')
            .addParts('dust', 'tiny_dust')
            .defaultRecipes()
    })

    event.createMaterial('HOP Graphite', 'hop_graphite', 0x111212,
        builder => {
        builder
            .materialSet('dull')
            .addParts('ingot', 'dust', 'tiny_dust', 'plate')
            .defaultRecipes()
    })

    event.createMaterial('Plastic', 'plastic', 0x9A9F9C,
        builder => {
        builder
            .materialSet('dull')
            .addParts('plate', "large_plate", 'dust', 'tiny_dust')
            .defaultRecipes()
    })

    event.createMaterial('Netherite', 'netherite', 0x5a5455, builder => {
        builder.addParts('nugget', 'rod', 'tiny_dust')
            .addExternalPart('ingot', 'minecraft:netherite_ingot')
            .addExternalPart('dust', 'extended_industrialization:netherite_dust')
            .defaultRecipes()
    })

    event.createMaterial('Certus quartz', 'certus_quartz', 0xd5f4f7,
        builder => {
        builder
            .materialSet('shiny')
            .addExternalPart('ingot', 'ae2:certus_quartz_crystal')
            .addExternalPart('dust', 'ae2:certus_quartz_dust')
            .addParts('rod', "plate", "large_plate")
            .machineCasing(8.0)
            .defaultRecipes()
    })

    event.createMaterial('Bioresistant Alloy', 'bioresistant_alloy', 0x54ccc2,
        builder => {
        builder
            .materialSet('shiny')
            .addParts("ingot", 'rod', "plate", "large_plate", "ring", "curved_plate", "bolt", "gear", "dust", 'tiny_dust')
            .machineCasing(8.0)
            .specialCasing("Bioresistant Machine Casing", "bioresistant_machine_casing", 8.0)
            .defaultRecipes()
    })

    event.createMaterial('Tumbaga', 'tumbaga', 0xb0501c,
        builder => {
        builder
            .materialSet('shiny')
            .addParts("ingot", 'rod', "plate", "large_plate", "ring", "curved_plate", "bolt", "gear", "dust", 'tiny_dust')
            .machineCasing(8.0)
            .specialCasing("Bioactive Machine Casing", "bioactive_machine_casing", 8.0)
            .defaultRecipes()
    })

    event.createMaterial('Carbon Steel', 'carbon_steel', 0x15203b,
        builder => {
        builder
            .materialSet('shiny')
            .addParts("ingot", 'rod', "plate", "large_plate", "ring", "curved_plate", "bolt", "gear", "dust", 'tiny_dust')
            .machineCasing(8.0)
            .specialCasing("Biointensive Machine Casing", "biointensive_machine_casing", 8.0)
            .defaultRecipes()
    })

})