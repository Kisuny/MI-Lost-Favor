ServerEvents.recipes(event => {
    miMachineRecipe(event, {
        energy: 4, time: 656, machine: "modern_industrialization:blast_furnace",
        inputItems: [
            [{ item: "oritech:raw_biopolymer" }, 1],
            [{ item: "immersiveengineering:mold_plate" }, 1, 0],
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 250],
        ],
        outputItems: [[{ item: "oritech:plastic_sheet" }, 1]],
        outputFluids: [
            [{ fluid: "modern_industrialization:steam" }, 200],
        ],
        //removeRecipe:true
    })

    miMachineRecipe(event, {
        energy: 25, time: 93, machine: "modern_industrialization:blast_furnace",
        inputItems: [
            [{ item: "oritech:biomass" }, 1, 0.89],
            [{ item: "modern_industrialization:iron_dust" }, 4],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:sugar_solution" }, 250],
        ],
        outputItems: [[{ item: "oritech:biosteel_ingot" }, 4]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 31, time: 222, machine: "modern_industrialization:blast_furnace",
        inputItems: [
            [{ item: "modern_industrialization:titanium_tiny_dust" }, 3],
            [{ item: "modern_industrialization:adamant_dust" }, 1]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:ethylene" }, 100],
            [{ fluid: "immersiveengineering:ethanol" }, 100]
        ],

        outputFluids: [
            [{ fluid: "milf:liquid_plastic" }, 50],
        ],

    })

    miMachineRecipe(event, {
        energy: 25, time: 93, machine: "modern_industrialization:blast_furnace",
        inputItems: [
            [{ item: "modern_industrialization:steel_dust" }, 9],
            [{ item: "modern_industrialization:silicon_dust" }, 1],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:sulfuric_acid" }, 100],
        ],
        outputItems: [[{ item: "modern_industrialization:silicon_steel_ingot" }, 10]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 22, time: 1122, machine: "modern_industrialization:blast_furnace",
        inputItems: [
            [{ item: "grimoireofgaia:deco_garden_gnome" }, 1, 0],
            [{ item: "milf:grecall_concoction_t1" }],
            [{ item: "grimoireofgaia:experience_diamond" }, 2],
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 500],
            [{ fluid: "modern_industrialization:sugar_solution" }, 2000]
        ],
        outputItems: [
            [{ item: "milf:grecall_concoction_t2" }, 1]
        ]
    })



})