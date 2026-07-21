ServerEvents.recipes(event => {

    event.recipes.modern_industrialization.enigma_machine(42, 100)
        .itemIn('milf:blueprint_pack', 0)
        .itemIn('spectrum:guidebook', 0)
        .itemIn('milf:disk_from_space', 0)
        .itemOut("milf:mysterious_blueprint")

    event.recipes.modern_industrialization.enigma_machine(42, 100)
        .itemIn('milf:blueprint_pack', 0)
        .itemIn('milf:mysterious_blueprint', 0)
        .itemIn('milf:old_tablet', 0)
        .itemOut("milf:storage_blueprint")

    event.recipes.modern_industrialization.enigma_machine(42, 1000)
        .itemIn('milf:blueprint_pack', 0)
        .itemIn('milf:storage_blueprint', 0)
        .itemIn('milf:old_diary', 0)
        .itemOut("milf:automation_blueprint")

    event.recipes.modern_industrialization.enigma_machine(42, 1000)
        .itemIn('milf:blueprint_pack', 0)
        .itemIn('milf:automation_blueprint', 0)
        .itemIn('milf:holy_book_of_color', 0)
        .itemOut("milf:quantum_blueprint")

/*     event.recipes.modern_industrialization.enigma_machine(42, 10000)
        .itemIn('milf:blueprint_pack', 0)
        .itemIn('milf:quantum_blueprint', 0)
        .itemIn('milf:old_notes', 0)
        .itemOut("milf:divine_blueprint") */


    miMachineCraft(event, {energy:8, time:6000, machine:"modern_industrialization:enigma_machine",
        inputItems:[
            [{item:"milf:blank_blueprint"}, 1],
            [{item:"milf:punched_card"}, 1],
            [{item:"milf:punched_card"}, 1]
        ],
        outputItems:[[{
            "components": { "immersiveengineering:blueprint": "MI Components" },
            "id": "immersiveengineering:blueprint"
        }, 1]],
    })
})