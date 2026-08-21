ServerEvents.recipes(event => {


    miMachineRecipe(event, {
        energy: 4, time: 6000, machine: "modern_industrialization:enigma_machine",
        inputItems: [
            [{ item: "milf:blank_blueprint" }, 1],
            [{ item: "milf:5d_memory_crystal" }, 1, 0],
            [{ item: "milf:disk_from_space" }, 1, 0]
        ],
        inputFluids: [
            [{fluid: "minecraft:water"}, 2000],
            [{ fluid: "minecraft:water" }, 2000]
        ],
        outputItems: [[MILF_BLUEPRINTS.getAsItem.tier1AE, 1]],
    })

    miMachineRecipe(event, {
        energy: 24, time: 5000, machine: "modern_industrialization:enigma_machine",
        inputItems: [
            [{ item: "milf:blank_blueprint" }, 1],
            [{ item: "milf:5d_memory_crystal" }, 1, 0],
            [{ item: "milf:space_hive" }, 1, 0]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:benzene" }, 1000],
            [{ fluid: "modern_industrialization:toluene" }, 1000]
        ],
        outputItems: [[MILF_BLUEPRINTS.getAsItem.tier2AE, 1]],
    })

    miMachineRecipe(event, {
        energy: 32, time: 4000, machine: "modern_industrialization:enigma_machine",
        inputItems: [
            [{ item: "milf:cd" }, 1],
            [{ item: "milf:5d_memory_crystal" }, 1, 0],
            [{ item: "modern_industrialization:biosteel_dust" }, 16]
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 1000],
            [{ fluid: "modern_industrialization:toluene" }, 1000]
        ],
        custom_condition: "cd_reader",
        outputItems: [[{item : MILF_BLUEPRINTS.getDisk.tier2AE}, 1]],
    })

    miMachineRecipe(event, {
        energy: 42, time: 3500, machine: "modern_industrialization:enigma_machine",
        inputItems: [
            [{ item: "milf:cd" }, 1],
            [{ item: "milf:5d_memory_crystal" }, 1, 0],
            [{ item: "modern_industrialization:adamant_dust" }, 16]
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:oxygen" }, 1000],
            [{ fluid: "modern_industrialization:nitrogen" }, 1000]
        ],
        custom_condition: "cd_reader",
        outputItems: [[{ item: MILF_BLUEPRINTS.getDisk.tier3AE }, 1]],
    })

    miMachineRecipe(event, {
        energy: 51, time: 3700, machine: "modern_industrialization:enigma_machine",
        inputItems: [
            [{ item: "milf:cd" }, 1],
            [{ item: "milf:5d_memory_crystal" }, 1, 0],
            [{ item: "ae2:fluix_dust" }, 16]
        ],
        inputFluids: [
            [{ fluid: "oritech:still_sheol_fire" }, 1000],
            [{ fluid: "modern_industrialization:acrylic_glue" }, 1000]
        ],
        custom_condition: "cd_reader",
        outputItems: [[{ item: MILF_BLUEPRINTS.getDisk.tier4AE }, 1]],
    })
    
})