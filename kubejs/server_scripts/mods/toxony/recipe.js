ServerEvents.recipes(event => {
    const removeById = [
        "toxony:mortar/green_dye_alt",
        "toxony:mortar/green_dye",
        "toxony:mortar_pestle",
    ]

    removeById.forEach(id => {
        event.remove({id: id});
    });

    event.remove({output: [
        "toxony:redstone_mortar",
    ]})

    
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "tag": "toxony:possible_ingredients" },
            { "tag": "toxony:possible_ingredients"},
            { "tag": "toxony:possible_ingredients"},
            { "item": "minecraft:nether_wart"},
        ],
        output: "toxony:affinity_fusion_mix",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "tag": "toxony:ingredients/poisonous" },
            { "tag": "toxony:plants/poisonous"},
            { "item": "minecraft:bone_meal"},
            { "item": "enchanted:foul_fume"},
        ],
        output: "toxony:poison_paste",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb" },
            { "item": "blaze_powder"},
            { "item": "toxony:warproot"},
            { "item": "toxony:empty_tox_pot"},
        ],
        output: "toxony:witchfire_tox_pot",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb" },
            { "item": "glow_ink_sac"},
            { "item": "toxony:empty_oil_pot"},
        ],
        output: "toxony:glowing_oil_pot",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "tag": "toxony:possible_ingredients" },
            { "tag": "toxony:possible_ingredients"},
            { "tag": "toxony:possible_ingredients"},
            { "item": "toxony:toxin"},
            { "item": "bowl"},
        ],
        output: "toxony:pure_blend",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "tag": "toxony:possible_ingredients" },
            { "tag": "toxony:possible_ingredients"},
            { "item": "toxony:toxic_paste"},
            { "item": "bowl"},
        ],
        output: "toxony:toxic_blend",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "ghast_tear" },
            { "item": "honeycomb"},
            { "item": "toxony:sunspot"},
            { "item": "toxony:empty_tox_pot"},
        ],
        output: "toxony:regeneration_tox_pot",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb"},
            { "item": "toxony:toxic_paste"},
            { "item": "toxony:acid_slimeball"},
            { "item": "toxony:acid_slimeball"},
            { "item": "toxony:empty_oil_pot"},
        ],
        output: "toxony:acid_oil_pot",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "toxony:toxic_paste"}
        ],
        output: "green_dye",
        amount: 8,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "toxony:poison_paste"}
        ],
        output: "green_dye",
        amount: 4,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb"},
            { "item": "fermented_spider_eye"},
            { "item": "toxony:water_hemlock"},
            { "item": "toxony:empty_oil_pot"},
        ],
        output: "toxony:fatigue_oil_pot",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb"},
            { "item": "toxony:toxic_paste"},
        ],
        output: "toxony:oil_base",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb"},
            { "item": "toxony:toxic_paste"},
            { "item": "toxony:toxin"},
            { "item": "toxony:empty_tox_pot"},
        ],
        output: "toxony:toxin_tox_pot",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb"},
            { "item": "magma_cream"},
            { "item": "toxony:empty_oil_pot"},
        ],
        output: "toxony:fire_resistance_oil_pot",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb"},
            { "item": "toxony:poison_paste"},
            { "item": "toxony:empty_oil_pot"},
        ],
        output: "toxony:poison_oil_pot",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb"},
            { "item": "toxony:warproot"},
            { "item": "toxony:acid_slimeball"},
            { "item": "toxony:bog_bone"},
            { "item": "toxony:empty_tox_pot"},
        ],
        output: "toxony:acid_tox_pot",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb"},
            { "item": "fermented_spider_eye"},
            { "item": "toxony:moonlight_hemlock"},
            { "item": "toxony:empty_tox_pot"},
        ],
        output: "toxony:smoke_tox_pot",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "toxony:poison_paste"},
            { "tag": "toxony:possible_ingredients"},
            { "item": "bowl"},
        ],
        output: "toxony:poison_blend",
        removeRecipe: true,
        grindingTime: 60
    })
    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "honeycomb"},
            { "item": "toxony:toxic_paste"},
            { "item": "toxony:toxic_spit"},
            { "item": "toxony:ocelot_mint"},
            { "item": "toxony:empty_oil_pot"},
        ],
        output: "toxony:mending_oil_pot",
        removeRecipe: true,
        grindingTime: 60
    })

    // Mixer equivalents
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{tag:"toxony:possible_ingredients"}],
            [{tag:"toxony:possible_ingredients"}],
            [{tag:"toxony:possible_ingredients"}],
            [{item:"minecraft:nether_wart"}],
        ],
        outputItems:[[{item:"toxony:affinity_fusion_mix"}, 2]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{tag:"toxony:ingredients/poisonous"}],
            [{tag:"toxony:plants/poisonous"}],
            [{item:"minecraft:bone_meal"}],
            [{item:"enchanted:foul_fume"}],
        ],
        outputItems:[[{item:"toxony:poison_paste"}, 2]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"minecraft:honeycomb"}],
            [{item:"minecraft:blaze_powder"}],
            [{item:"toxony:warproot"}],
            [{item:"toxony:empty_tox_pot"}],
        ],
        outputItems:[[{item:"toxony:witchfire_tox_pot"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"minecraft:glow_ink_sac"}],
            [{item:"toxony:empty_oil_pot"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:glowing_oil_pot"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{tag:"toxony:possible_ingredients"}],
            [{tag:"toxony:possible_ingredients"}],
            [{item:"toxony:toxin"}],
            [{item:"minecraft:bowl"}],
        ],
        outputItems:[[{item:"toxony:pure_blend"}, 2]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{tag:"toxony:possible_ingredients"}],
            [{tag:"toxony:possible_ingredients"}],
            [{item:"toxony:toxic_paste"}],
            [{item:"minecraft:bowl"}],
        ],
        outputItems:[[{item:"toxony:toxic_blend"}, 2]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"minecraft:ghast_tear"}],
            [{item:"toxony:sunspot"}],
            [{item:"toxony:empty_tox_pot"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:regeneration_tox_pot"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"toxony:toxic_paste"}],
            [{item:"toxony:acid_slimeball"}, 2],
            [{item:"toxony:empty_oil_pot"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:acid_oil_pot"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"toxony:toxic_paste"}],
        ],
        outputItems:[[{item:"minecraft:green_dye"}, 8]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"toxony:poison_paste"}],
        ],
        outputItems:[[{item:"minecraft:green_dye"}, 4]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"minecraft:fermented_spider_eye"}],
            [{item:"toxony:water_hemlock"}],
            [{item:"toxony:empty_oil_pot"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:fatigue_oil_pot"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"toxony:toxic_paste"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:oil_base"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"toxony:toxic_paste"}],
            [{item:"toxony:toxin"}],
            [{item:"toxony:empty_tox_pot"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:toxin_tox_pot"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"minecraft:magma_cream"}],
            [{item:"toxony:empty_oil_pot"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:fire_resistance_oil_pot"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"toxony:poison_paste"}],
            [{item:"toxony:empty_oil_pot"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:poison_oil_pot"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"toxony:warproot"}],
            [{item:"toxony:acid_slimeball"}],
            [{item:"toxony:bog_bone"}],
            [{item:"toxony:empty_tox_pot"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:acid_tox_pot"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"minecraft:fermented_spider_eye"}],
            [{item:"toxony:moonlight_hemlock"}],
            [{item:"toxony:empty_tox_pot"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:smoke_tox_pot"}]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"toxony:poison_paste"}],
            [{tag:"toxony:possible_ingredients"}],
            [{item:"minecraft:bowl"}],
        ],
        outputItems:[[{item:"toxony:poison_blend"}, 2]]
    })
    miMachineCraft(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"toxony:toxic_paste"}],
            [{item:"toxony:toxic_spit"}],
            [{item:"toxony:ocelot_mint"}],
            [{item:"toxony:empty_oil_pot"}],
        ],
        inputFluids:[
            [{fluid:"extended_industrialization:honey"}, 100]
        ],
        outputItems:[[{item:"toxony:mending_oil_pot"}]]
    })

});

