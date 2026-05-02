ServerEvents.recipes(event => {

    miMachineCraft(event, {energy:8, time:200, machine:"modern_industrialization:assembler",
        inputItems:[
            [{item:"modern_industrialization:tin_cable"}, 4],
            [{item:"modern_industrialization:portable_storage_unit"}],
            [{item:"milf:tempered_glass"}],
        ],
        inputFluids:[
            [{fluid:"milf:liquid_plastic"}, 1000],
        ],
        outputItems:[
            [{item:"modern_industrialization:basic_machine_hull"}]
        ],
        removeRecipe:true
    })

    miMachineCraft(event, {energy:8, time:200, machine:"modern_industrialization:assembler",
        inputItems:[
            [{item:"modern_industrialization:tin_cable"}, 4],
            [{item:"modern_industrialization:cupronickel_wire_magnetic"}, 8],
            [{item:"modern_industrialization:portable_storage_unit"}],
            [{item:"modern_industrialization:heatproof_machine_casing"}],
            [{item:"milf:tempered_glass"}],
        ],
        outputItems:[
            [{item:"modern_industrialization:electric_blast_furnace"}]
        ],
        removeRecipe:true
    })

    miMachineCraft(event, {energy:8, time:200, machine:"modern_industrialization:assembler",
        inputItems:[
            [{item:"modern_industrialization:electrum_cable"}, 4],
            [{item:"modern_industrialization:cupronickel_wire_magnetic"}, 8],
            [{item:"modern_industrialization:portable_storage_unit"}],
            [{item:"modern_industrialization:heatproof_machine_casing"}],
            [{item:"modern_industrialization:electronic_circuit"}],
            [{item:"modern_industrialization:steel_rod_magnetic"}, 4],

        ],
        outputItems:[
            [{item:"modern_industrialization:electric_coke_oven"}]
        ],
        removeRecipe:true
    })

    miMachineCraft(event, {
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

    miMachineCraft(event, {energy:8, time:200, machine:"modern_industrialization:assembler",
        inputItems:[
            [{tag:"c:cobblestones"}, 8],
        ],
        outputItems:[
            [{item:"minecraft:furnace"}]
        ],
        removeRecipe:true
    })

    miMachineCraft(event, {energy:8, time:200, machine:"modern_industrialization:assembler",
        inputItems:[
            [{tag:"modern_industrialization:iron_plate"}, 6],
        ],
        outputItems:[
            [{item:"immersiveengineering:fluid_pipe"}, 8]
        ]
    })

})