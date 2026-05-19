ServerEvents.recipes(event => {

    const gadgetPairs = [
        ["building", "milf:building_card"],
        ["exchanging", "milf:exchanging_card"],
        ["destruction", "milf:destruction_card"],
        ["copy_paste", "milf:copying_card"],
        ["cut_paste", "milf:cutting_card"],
    ]

    gadgetPairs.forEach(([gadget, card]) => {
        miMachineCraft(event, {
            energy: 8, time: 200, machine: "modern_industrialization:assembler",
            inputItems: [
                [{ item: "modern_industrialization:analog_circuit" }, 2],
                [{ item: "immersiveengineering:component_electronic" }, 3],
                [{ item: "modern_industrialization:steel_large_plate" }, 2],
                [{ item: card }, 1],
            ],
            inputFluids: [
                [{ fluid: "modern_industrialization:soldering_alloy" }, 500]
            ],
            outputItems: [
                [{ item: `buildinggadgets2:gadget_${gadget}` }]
            ],
            removeRecipe: true
        })
    });

    const cardPairs = [
        ["milf:building_card", "minecraft:grass_block"],
        ["milf:exchanging_card", "minecraft:ender_pearl"],
        ["milf:destruction_card", "modern_industrialization:trash_can"],
        ["milf:copying_card", "minecraft:map"],
        ["milf:cutting_card", "minecraft:shears"],
    ]

    cardPairs.forEach(([cardType, material]) => {
        milfShapeless(event, {
            inputItems: [
                [{ item: "modern_industrialization:analog_circuit" }],
                [{ item: material }],
            ],
            outputItems: [[{ id: cardType }]]
        })
    });



})