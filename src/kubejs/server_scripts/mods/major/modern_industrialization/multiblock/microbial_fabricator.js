ServerEvents.recipes(event => {

    //#region basic tier

    miMachineRecipe(event, {
        energy: 1, time: 1200, machine: "modern_industrialization:microbial_fabricator_basic",
        inputItems: [
            [{ tag: "oritech:biomatter" }, 4, 0.7],
            [{ tag: "oritech:biomatter" }, 3, 0.4],
            [{ tag: "oritech:biomatter" }, 2, 0.25],
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 150, 0.9],
            [{ fluid: "minecraft:water" }, 100, 0.6],
        ],
        outputItems: [[{ item: "oritech:biomass" }, 1]],
        outputFluids: [
            [{ fluid: "oritech:still_biofuel" }, 125, 0.64],
        ],
    })

    miMachineRecipe(event, {
        energy: 10, time: 100, machine: "modern_industrialization:microbial_fabricator_basic",
        inputItems: [
            [{ item: "modern_industrialization:quartz_dust" }, 1, 0.51],
            [{ item: "minecraft:quartz" }, 1],
            [{ item: "modern_industrialization:quartz_dust" }, 1, 0.27],
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 125, 0.54],
            [{ fluid: "milf:alien_goo" }, 125, 0.34],
        ],
        outputItems: [[{ item: "ae2:certus_quartz_crystal" }, 1, 0.64]]
    })

    miMachineRecipe(event, {
        energy: 34, time: 231, machine: "modern_industrialization:microbial_fabricator_basic",
        inputItems: [
            [neoCompound([
                { tag: "minecraft:meat" },
                { tag: "c:foods/raw_fish" }
            ]), 1, 0.79],
            [{ item: "milf:space_hive" }, 1, 0],
            [neoCompound([
                { tag: "minecraft:meat" },
                { tag: "c:foods/raw_fish" }
            ]), 1, 0.74],
        ],
        inputFluids: [
            [{ fluid: "oritech:still_biofuel" }, 125],
            [{ fluid: "oritech:still_biofuel" }, 125],
        ],
        outputFluids: [
            [{ fluid: "milf:alien_goo" }, 500],
        ],
    })

    miMachineRecipe(event, {
        energy: 40, time: 200, machine: "modern_industrialization:microbial_fabricator_basic",
        inputItems: [
            [{ item: "modern_industrialization:wood_pulp" }, 6],
            [{ item: "oritech:biomass_block" }, 1],
            [{ item: "minecraft:bone_meal" }, 4],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:sugar_solution" }, 500, 0.93],
            [{ fluid: "milf:alien_goo" }, 125, 0.84],
        ],
        outputItems: [[{ item: "oritech:raw_biopolymer" }, 1]],
    })

    miMachineRecipe(event, {
        energy: 12, time: 100, machine: "modern_industrialization:microbial_fabricator_basic",
        inputItems: [
            [{ item: "oritech:biomass" }, 1, 0.88],
            [{ item: "oritech:biosteel_ingot" }, 1],
            [{ item: "oritech:biomass" }, 1, 0.33],
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 125, 0.24],
            [{ fluid: "milf:alien_goo" }, 125, 0.11],
        ],
        outputItems: [[{ item: "modern_industrialization:bioresistant_alloy_ingot" }, 1, 0.82]]
    })

    miMachineRecipe(event, {
        energy: 16, time: 100, machine: "modern_industrialization:microbial_fabricator_basic",
        inputItems: [
            [{ item: "spectrum:amethyst_powder" }, 1, 0.78],
            [{ item: "minecraft:amethyst_shard" }, 1],
            [{ item: "spectrum:amethyst_powder" }, 1, 0.63],
        ],
        inputFluids: [
            [{ fluid: "immersiveengineering:redstone_acid" }, 250, 0.64],
            [{ fluid: "modern_industrialization:sugar_solution" }, 250, 0.81],
        ],
        outputItems: [[{ item: "oritech:fluxite" }, 1, 0.66]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 16, time: 100, machine: "modern_industrialization:microbial_fabricator_basic",
        inputItems: [
            [{ item: "ae2:ender_dust" }, 1, 0.18],
            [{ item: "abyssal_decor:block_of_pearl" }, 1],
            [{ item: "ae2:ender_dust" }, 1, 0.13],
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 250, 0.94],
            [{ fluid: "milf:alien_goo" }, 250, 0.83],
        ],
        outputItems: [[{ item: "minecraft:ender_pearl" }, 1, 0.86]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 32, time: 400, machine: "modern_industrialization:microbial_fabricator_basic",
        inputItems: [
            [{ item: "ae2:ender_dust" }, 8, 0.71],
            [{ item: "minecraft:amethyst_shard" }, 2],
            [{ item: "ae2:ender_dust" }, 8, 0.84],
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 500, 0.83],
            [{ fluid: "milf:alien_goo" }, 500, 0.75],
        ],
        outputItems: [[{ item: "minecraft:echo_shard" }, 1, 0.74]],
    })

    //#endregion

    //#region bioresistant tier

    miMachineRecipe(event, {
        energy: 44, time: 200, machine: "modern_industrialization:microbial_fabricator_bioresistant",
        inputItems: [
            [{ item: "ae2:charged_certus_quartz_crystal" }, 1, 0.43],
            [{ item: "milf:space_hive" }, 1, 0],
            [{ item: "ae2:charged_certus_quartz_crystal" }, 1, 0.54],
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 75, 0.23],
            [{ fluid: "milf:alien_goo" }, 75, 0.36],
        ],
        outputItems: [
            [{ item: "milf:space_hive" }, 1, 0.1],
        ],
    })

    miMachineRecipe(event, {
        energy: 44, time: 700, machine: "modern_industrialization:microbial_fabricator_bioresistant",
        inputItems: [
            [{ item: "oritech:biomass_block" }, 1, 0.93],
            [{ item: "milf:space_hive" }, 1, 0],
            [{ item: "oritech:biomass_block" }, 1, 0.84],
        ],
        inputFluids: [
            [{ fluid: "oritech:still_biofuel" }, 75, 0.23],
            [{ fluid: "oritech:still_biofuel" }, 75, 0.36],
        ],
        outputFluids: [
            [{ fluid: "milf:alien_goo" }, 200],
        ],
    })

    miMachineRecipe(event, {
        energy: 61, time: 200, machine: "modern_industrialization:microbial_fabricator_bioresistant",
        inputItems: [
            [{ item: "modern_industrialization:adamant_dust" }, 1],
            [{ item: "ae2:ender_dust" }, 3],
            [{ item: "oritech:fluxite" }, 2],
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 125, 0.95],
            [{ fluid: "milf:alien_goo" }, 125, 0.65],
        ],
        outputItems: [[{ item: "oritech:enderic_compound" }, 1]],
    })

    miMachineRecipe(event, {
        energy: 66, time: 100, machine: "modern_industrialization:microbial_fabricator_bioresistant",
        inputItems: [
            [{ item: "minecraft:deepslate" }, 1, 0.71],
            [{ item: "milf:space_hive" }, 1, 0],
            [{ item: "minecraft:deepslate" }, 1, 0.84],
        ],
        inputFluids: [
            [{ fluid: "milf:alien_goo" }, 100, 0.53],
            [{ fluid: "milf:alien_goo" }, 100, 0.45],
        ],
        outputItems: [[{ item: "ae2:sky_stone_block" }, 2, 0.72]],
    })

    //#endregion

})