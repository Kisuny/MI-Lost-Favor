ServerEvents.recipes(event => {

    miMachineRecipe(event, {
        energy: 32, time: 200, machine: "modern_industrialization:basic_machine_assembler",
        inputItems: [
            [{ "item": "immersiveengineering:sheetmetal_steel" }, 32],
            [{ "tag": "immersiveengineering:treated_wood" }, 12],
            [{ "item": "immersiveengineering:logic_unit" }, 4],
            [{ "item": "immersiveengineering:component_electronic_adv" }, 1],
            [{ "item": "immersiveengineering:wirecoil_steel" }, 12],
        ],
        outputItems: [[{ "item": "modern_industrialization:radio_transcriber" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 32, time: 200, machine: "modern_industrialization:basic_machine_assembler",
        inputItems: [
            [{ "item": "immersiveengineering:sheetmetal_steel" }, 32],
            [{ "tag": "immersiveengineering:treated_wood" }, 12],
            [{ "item": "immersiveengineering:component_electronic_adv" }, 1],
            [{ "item": "immersiveengineering:wirecoil_steel" }, 12],
            [{ "item": "milf:tempered_glass" }, 4],
            [{ "item": "milf:punched_card" }, 8],
        ],
        outputItems: [[{ "item": "modern_industrialization:enigma_machine" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 32, time: 200, machine: "modern_industrialization:basic_machine_assembler",
        inputItems: [
            [{ item: "immersiveengineering:component_electronic_adv" }, 1],
            [{ item: "modern_industrialization:cupronickel_wire_magnetic" }, 8],
            [{ item: "immersiveengineering:wirecoil_steel" }, 6],
            [{ item: "modern_industrialization:heatproof_machine_casing" }],
        ],
        outputItems: [
            [{ item: "modern_industrialization:electric_blast_furnace" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 32, time: 200, machine: "modern_industrialization:basic_machine_assembler",
        inputItems: [
            [{ item: "immersiveengineering:component_electronic_adv" }, 1],
            [{ item: "modern_industrialization:cupronickel_wire_magnetic" }, 4],
            [{ item: "modern_industrialization:steel_rod" }, 19],
            [{ item: "modern_industrialization:heatproof_machine_casing" }],
        ],
        outputItems: [
            [{ item: "modern_industrialization:electric_coke_oven" }]
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 32, time: 200, machine: "modern_industrialization:basic_machine_assembler",
        inputItems: [
            [{ item: "modern_industrialization:large_motor" }, 4],
            [{ item: "modern_industrialization:electronic_circuit" }, 2],
            [{ item: "modern_industrialization:silicon_steel_large_plate" }, 6],
            [{ item: "immersiveengineering:wirecoil_steel" }, 4],
            [{ item: "modern_industrialization:aluminum_drill" }, 4],
        ],
        outputItems: [
            [{ item: "modern_industrialization:electric_quarry" }]
        ],
        removeRecipe: true
    })

})


