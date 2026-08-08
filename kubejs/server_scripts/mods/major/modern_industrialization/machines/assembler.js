ServerEvents.recipes(event => {

    // miMachineRecipe(event, {energy:8, time:200, machine:"modern_industrialization:assembler",
    //     inputItems:[
    //         [{item:"modern_industrialization:tin_cable"}, 4],
    //         [{item:"modern_industrialization:portable_storage_unit"}],
    //         [{item:"milf:tempered_glass"}],
    //     ],
    //     inputFluids:[
    //         [{fluid:"milf:liquid_plastic"}, 1000],
    //     ],
    //     outputItems:[
    //         [{item:"modern_industrialization:basic_machine_hull"}]
    //     ],
    //     removeRecipe:true
    // })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:electrum_cable" }, 8],
            [{ item: "modern_industrialization:invar_large_plate" }, 4],
            [{ item: "modern_industrialization:electric_mi_furnace" }],
            [{ item: "modern_industrialization:electronic_circuit" }],
            [{ item: "modern_industrialization:cupronickel_wire_magnetic" }, 16],

        ],
        outputItems: [
            [{ item: "mi_tweaks:large_electric_furnace" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {energy:8, time:200, machine:"modern_industrialization:assembler",
        inputItems:[
            [{tag:"c:cobblestones"}, 8],
        ],
        outputItems:[
            [{item:"minecraft:furnace"}]
        ],
        removeRecipe:true
    })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:electronic_circuit_board" }, 1],
            [{ item: "immersiveengineering:component_electronic_adv" }, 1],
            [{ item: "modern_industrialization:electrum_fine_wire" }, 5],

        ],
        outputItems: [
            [{ item: "modern_industrialization:overdrive_module" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "modern_industrialization:electronic_circuit_board" }, 1],
            [{ item: "oritech:plastic_sheet" }, 1],
            [{ item: "milf:tempered_glass" }, 1],
            [{ item: "modern_industrialization:electrum_fine_wire" }, 5],

        ],
        outputItems: [
            [{ item: "extended_industrialization:machine_config_card" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 8, time: 200, machine: "modern_industrialization:assembler",
        inputItems: [
            [{ item: "enchanted:attuned_stone_charged" }, 1],
            [{ item: "immersiveengineering:resonanz_engineering" }, 1],
            [{ item: "modern_industrialization:electronic_circuit" }, 2],
            [{ item: "modern_industrialization:silicon_steel_large_plate" }, 4]
        ],
        outputItems: [[{ item: "chunkloaders:basic_chunk_loader" }, 1]],
        removeRecipe: true
    })

})