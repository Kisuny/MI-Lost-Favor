ServerEvents.recipes(event => {
    miMachineRecipe(event, {
        energy: 8, time: 600, machine: "modern_industrialization:chemical_reactor",
        inputItems: [
            [{ item: "grimoireofgaia:deco_garden_gnome" }, 1, 0],
            [{ item: "milf:grecall_concoction_t1" }],
            [{ item: "grimoireofgaia:experience_diamond" }, 2],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:creosote" }, 4000],
            [{ fluid: "immersivepetroleum:kerosene" }, 4000]
        ],
        outputItems: [
            [{ item: "milf:grecall_concoction_t2" }, 1]
        ]
    })
})