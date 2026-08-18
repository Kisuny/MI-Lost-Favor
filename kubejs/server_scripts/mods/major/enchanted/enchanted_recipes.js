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

    anvil_recipe(
        [
            [{ "item": "minecraft:iron_ingot" }, 5],
            [{ "item": "minecraft:iron_bars" }, 2],
            [{ "item": "paganbless:runic_charge" }, 1],
        ],
        [{ "id": 'enchanted:witch_oven' }, 1]
    );

    anvil_recipe(
        [
            [{ "item": "minecraft:cauldron" }, 1],
            [{ "item": "paganbless:runic_charge" }, 1],
        ],
        [{ "id": 'enchanted:kettle' }, 1]
    );

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