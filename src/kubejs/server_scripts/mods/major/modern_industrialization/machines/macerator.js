ServerEvents.recipes(event => {
    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [[{ tag: "c:ores/redstone" }, 1]],
        outputItems: [[{ item: "modern_industrialization:redstone_crushed_dust" }, 4], [{ item: "paganbless:cinnabar" }, 1]],
        ieCompat:true
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [[{ item: "paganbless:cinnabar" }, 1]],
        outputItems: [[{ item: "minecraft:redstone" }, 3]],
        ieCompat: true
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [[{ item: "minecraft:player_head" }, 1]],
        outputItems: [[{ item: "grimoireofgaia:meat" }, 1], [{ item: "grimoireofgaia:meat" }, 1, 0.25]],
        ieCompat: true
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [[{ item: "modern_industrialization:lignite_coal_crushed_dust" }, 1]],
        outputItems: [
            [{ item: "modern_industrialization:lignite_coal_dust" }, 1], 
            [{ item: "modern_industrialization:lignite_coal_dust" }, 1, 0.65],
            [{ item: "modern_industrialization:sulfur_dust" }, 1, 0.5]
        ],
        removeRecipeType: "modern_industrialization:macerator",
        ieCompat: true
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [[{ item: "embers:ember_crystal" }, 1]],
        outputItems: [
            [{ item: "embers:ember_grit" }, 5]
        ],
        ieCompat: true
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [[{ item: "embers:ember_shard" }, 1]],
        outputItems: [
            [{ item: "embers:ember_grit" }, 1],
            [{ item: "embers:ember_grit" }, 1, 0.58]
        ],
        ieCompat: true
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [[{ item: "milf:everburning_roots_heart" }, 1]],
        outputItems: [
            [{ item: "embers:ember_crystal" }, 2],
            [{ item: "embers:ember_crystal" }, 1, 0.49],
            [{ item: "embers:ember_crystal_cluster" }, 1, 0.37],
            
        ],
        removeRecipeType: "modern_industrialization:macerator",
        ieCompat: true,
        compatOff:true
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:macerator",
        inputItems: [[{ item: "milf:everburning_roots_veins" }, 1]],
        outputItems: [
            [{ item: "embers:ember_shard" }, 1],
            [{ item: "embers:ember_shard" }, 1, 0.77],
            [{ item: "embers:ember_shard" }, 1, 0.33],
        ],
        removeRecipeType: "modern_industrialization:macerator",
        ieCompat: true,
        compatOff: true
    })
})