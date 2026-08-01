ServerEvents.recipes(event => {

    event.recipes.modern_industrialization.enigma_machine(42, 100)
        .itemIn('milf:blueprint_pack', 0)
        .itemIn('milf:punched_card', 0)
        .itemIn('milf:disk_from_space', 0)
        .itemOut("milf:mysterious_blueprint")

    miMachineRecipe(event, {
        energy: 4, time: 6000, machine: "modern_industrialization:enigma_machine",
        inputItems: [
            [{ item: "milf:punched_card" }, 1],
            [{ item: "milf:blueprint_pack" }, 1],
            [{ item: "milf:disk_from_space" }, 1]
        ],
        outputItems: [[{ item: "milf:mysterious_blueprint"}, 1]],
    })
    
})