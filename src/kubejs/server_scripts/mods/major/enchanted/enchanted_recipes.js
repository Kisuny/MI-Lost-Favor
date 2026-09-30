ServerEvents.recipes(event => {

    event.remove({id: "enchanted:distilling/demon_heart_diamond_vapour"})

    customMixingCauldron(event, {
        fluid: "minecraft:water",
        fluidAmount: 1000,
        ingredients: [
            { "item": "farmersdelight:golden_knife" },
            { "item": "minecraft:emerald" },
            { "item": "paganbless:chopped_rue" },
            { "item": "paganbless:chopped_lavender" },
            { "item": "hexerei:belladonna_flowers" },
            { "item": "hexerei:yellow_dock_flowers" },
            { "item": "hexerei:mugwort_flowers" },
            { "item": "minecraft:emerald" },
        ],
        heatRequirement: "heated",
        output: "enchanted:arthana",
        removeRecipe: true
    })

    function anvil_recipe(inputs, output) {
        anvilSmashingCraft(event, {
            inputItems: inputs,
            outputItems: [output],
            removeRecipe: true
        })
    }


    customPedestalCraft(event, {
        time: 1000,
        tier: "basic",
        experience: 2.0,
        citrine: 4,
        topaz: 2,
        amethyst: 8,
        pattern: [
            'eqe',
            'www',
            'qrq'
        ],
        key: {
            q: 'minecraft:iron_ingot',
            w: 'minecraft:iron_bars',
            e: 'spectrum:shimmerstone_gem',
            r: 'paganbless:runic_charge',
        },
        result: {
            "id": "enchanted:witch_oven",
            "count": 1
        },
        advancement: "spectrum:place_pedestal",
        removeRecipe: true
    });

    pedestalFromRecipe(event, {
        id: "enchanted:fume_funnel",
        tier: "basic",
        time: 200,
        experience: 4.0,
        amethyst: 8,
        advancement: "spectrum:place_pedestal"
    });
    
    pedestalFromRecipe(event, {
        id: "enchanted:broom",
        tier: "basic",
        time: 200,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    
    pedestalFromRecipe(event, {
        id: "enchanted:ritual_chalk",
        tier: "basic",
        time: 200,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "enchanted:fume_filter",
        tier: "basic",
        time: 200,
        experience: 4.0,
        amethyst: 4,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "enchanted:poppet_shelf",
        tier: "basic",
        time: 800,
        experience: 4.0,
        amethyst: 8,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "enchanted:altar",
        tier: "basic",
        time: 200,
        experience: 4.0,
        amethyst: 2,
        citrine: 6,
        topaz: 2,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "enchanted:chalice",
        tier: "basic",
        time: 400,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "enchanted:candelabra",
        tier: "basic",
        time: 400,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "enchanted:poppet",
        tier: "basic",
        time: 400,
        amethyst: 4,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "enchanted:spinning_wheel",
        tier: "basic",
        time: 800,
        amethyst: 4,
        citrine: 4,
        topaz: 4,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "enchanted:circle_talisman",
        tier: "basic",
        time: 800,
        citrine: 4,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });
    pedestalFromRecipe(event, {
        id: "enchanted:distillery",
        tier: "basic",
        time: 800,
        amethyst: 16,
        citrine: 4,
        topaz: 4,
        experience: 4.0,
        advancement: "spectrum:place_pedestal"
    });


    customPedestalCraft(event, {
        time: 1000,
        tier: "basic",
        experience: 2.0,
        citrine: 8,
        amethyst: 4,
        pattern: [
            'ewe',
            'rqr',
            ' t '
        ],
        key: {
            q: 'minecraft:cauldron',
            w: 'paganbless:runic_charge',
            e: 'spectrum:shimmerstone_gem',
            r: 'crittersandcompanions:silk',
            t: 'minecraft:smooth_stone_slab'
        },
        result: {
            "id": "enchanted:kettle",
            "count": 1
        },
        advancement: "spectrum:place_pedestal",
        removeRecipe: true
    });

    customPestleAndMortarCraft(event, {
        ingredients: [
            { "item": "minecraft:calcite" },
            { "item": "minecraft:calcite" },
            { "item": "minecraft:calcite" },
            { "item": "minecraft:calcite" },
            { "item": "minecraft:calcite" },
        ],
        output: "enchanted:quicklime",
        amount: 5,
        removeRecipe: true,
        grindingTime: 100
    })


    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [
            [{ item: "minecraft:calcite" }],
        ],
        outputItems: [
            [{ item: "enchanted:quicklime" }, 1],
            [{ item: "enchanted:quicklime" }, 1, 0.1]
        ]
    })

    customMixingCauldron(event, {
        fluid: "minecraft:lava",
        fluidAmount: 1000,
        ingredients: [
            { "item": "immersive_aircraft:nether_engine" },
            { "item": "modern_industrialization:steel_ingot" },
            { "item": "modern_industrialization:steel_ingot" },
            { "item": "modern_industrialization:steel_ingot" },
            { "item": "modern_industrialization:steel_ingot" },
            { "item": "modern_industrialization:steel_ingot" },
            { "item": "modern_industrialization:steel_ingot" },
            { "item": "modern_industrialization:steel_ingot" }
        ],
        output: "hexerei:broom_thruster_brush",
        amount: 1,
        heat: "heated"
    })


    miMachineRecipe(event, {
        energy: 2, time: 40, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ item: "minecraft:diamond" }, 2],
            [{ item: "enchanted:whiff_of_magic" }, 1],
        ],
        inputFluids: [
            [{ fluid: "minecraft:lava" }, 1000],
        ],
        outputItems: [[{ item: "enchanted:attuned_stone" }, 2]]
    });

})