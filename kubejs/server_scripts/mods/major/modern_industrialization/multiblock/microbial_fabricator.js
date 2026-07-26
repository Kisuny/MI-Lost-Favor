ServerEvents.recipes(event => {


    miMachineRecipe(event, {
        energy: 1, time: 1200, machine: "modern_industrialization:microbial_fabricator_basic",
        inputItems: [
            [{ tag: "oritech:biomatter" }, 5, 0.8],
            [{ tag: "oritech:biomatter" }, 3, 0.5],
            [{ tag: "oritech:biomatter" }, 2, 0.3],
        ],
        inputFluids: [
            [{ fluid: "minecraft:water" }, 150, 0.9],
            [{ fluid: "minecraft:water" }, 100, 0.6],
        ],
        outputItems: [[{ item: "oritech:biomass" }, 1]],
        outputFluids: [
            [{ fluid: "oritech:still_biofuel" }, 125, 0.64],
        ],
        custom_condition: "microbial_fabricator"
    })

    miMachineRecipe(event, {
        energy: 60, time: 600, machine: "modern_industrialization:microbial_fabricator_basic",
        inputItems: [
            [{ item: "milf:space_hive" }, 1, 0],
            [{ tag: "minecraft:meat" }, 1, 0.79],
            [{ tag: "minecraft:meat" }, 1, 0.74],
        ],
        inputFluids: [
            [{ fluid: "oritech:still_biofuel" }, 125],
            [{ fluid: "oritech:still_biofuel" }, 125],
        ],
        //outputItems: [[{ item: "oritech:biomass" }, 1]],
        outputFluids: [
            [{ fluid: "milf:alien_goo" }, 500],
        ],
        custom_condition: "microbial_fabricator"
    })

    miMachineRecipe(event, {
        energy: 64, time: 200, machine: "modern_industrialization:microbial_fabricator_basic",
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
        custom_condition: "microbial_fabricator"
    })

})

MIRecipeEvents.customCondition(event => {

    event.registerWithIcon(`microbial_fabricator`,
        (context, recipe) => {
            let block = context.level.getBlock(context.blockEntity.blockPos)
            let data = block.getEntityData()
            let maxEu = data.getLong("recipeMaxEu")

            if (maxEu >= 20) {
                
                block.setEntityData(Object.assign({}, data, { recipeMaxEu: 12, efficiencyTicks: 1}))
                context.blockEntity.setChanged()
                context.blockEntity.sync()
            }
            
            return true
        },
        Item.of("mi_tweaks:microbial_fabricator"),
        Text.translatable(`milf.mi_condition.microbial_fabricator`)
    )

})