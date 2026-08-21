ServerEvents.recipes(event => {

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "milf:blank_card" }, 1],
            [{ item: "oritech:flux_gate" }, 2],
            [{ item: "modern_industrialization:robot_arm" }, 1],
            [{ item: "minecraft:grass_block" }, 54],

        ],
        inputFluids: [
            [{ fluid: "milf:silicone_modified_phenolic_resin" }, 1000],
            [{ fluid: "milf:liquid_plastic" }, 200]
        ],
        outputItems: [
            [{ item: "milf:building_card" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "milf:blank_card" }, 1],
            [{ item: "oritech:flux_gate" }, 2],
            [{ item: "modern_industrialization:piston" }, 1],
            [{ item: "minecraft:magma_block" }, 54],

        ],
        inputFluids: [
            [{ fluid: "milf:silicone_modified_phenolic_resin" }, 1000],
            [{ fluid: "milf:liquid_plastic" }, 200]
        ],
        outputItems: [
            [{ item: "milf:destruction_card" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "milf:blank_card" }, 1],
            [{ item: "oritech:flux_gate" }, 1],
            [{ item: "modern_industrialization:large_motor" }, 1]

        ],
        inputFluids: [
            [{ fluid: "milf:silicone_modified_phenolic_resin" }, 1000],
            [{ fluid: "milf:liquid_plastic" }, 200]
        ],
        outputItems: [
            [{ item: "milf:exchanging_card" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "milf:blank_card" }, 1],
            [{ item: "oritech:flux_gate" }, 3],
            [{ item: "modern_industrialization:large_motor" }, 1],
            [{ item: "modern_industrialization:large_pump" }, 1]

        ],
        inputFluids: [
            [{ fluid: "milf:silicone_modified_phenolic_resin" }, 1000],
            [{ fluid: "milf:liquid_plastic" }, 200]
        ],
        outputItems: [
            [{ item: "milf:cutting_card" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 12, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "milf:blank_card" }, 1],
            [{ item: "oritech:flux_gate" }, 2],
            [{ item: "modern_industrialization:large_motor" }, 2],
            [{ item: "modern_industrialization:large_pump" }, 2]

        ],
        inputFluids: [
            [{ fluid: "milf:silicone_modified_phenolic_resin" }, 1000],
            [{ fluid: "milf:liquid_plastic" }, 200]
        ],
        outputItems: [
            [{ item: "milf:copying_card" }]
        ],
        removeRecipe: true
    })

    let cards = {
        "milf:building_card": "buildinggadgets2:gadget_building",
        "milf:exchanging_card": "buildinggadgets2:gadget_exchanging",
        "milf:copying_card": "buildinggadgets2:gadget_copy_paste",
        "milf:cutting_card": "buildinggadgets2:gadget_cut_paste",
        "milf:destruction_card": "buildinggadgets2:gadget_destruction",
    }

    Object.entries(cards).forEach(([card, gadget]) => {
        miMachineRecipe(event, {
            energy: 42, time: 200, machine: "modern_industrialization:assembler",
            inputItems: [
                [{ item: card }, 1],
                [{ item: "modern_industrialization:portable_storage_unit" }, 2],
                [{ item: "oritech:plastic_sheet" }, 4],
                [{ item: "milf:tempered_glass" }, 2]

            ],
            inputFluids: [
                [{ fluid: "milf:liquid_plastic" }, 500]
            ],
            outputItems: [
                [{ item: gadget }]
            ],
            removeRecipe: true
        })
    })

})