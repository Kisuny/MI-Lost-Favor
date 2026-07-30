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

})