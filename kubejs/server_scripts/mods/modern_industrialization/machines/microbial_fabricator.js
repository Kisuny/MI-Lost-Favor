ServerEvents.recipes(event => {

    miMachineRecipe(event, {energy:16, time:1000, machine:"modern_industrialization:microbial_fabricator",
        inputItems:[
            [{item:"spectrum:bottle_of_fading"}, 1],
            [{item:"ae2:mysterious_cube"}, 1],
            [{item:"spectrum:onyx_powder"}, 4],
        ],
        outputItems:[
            [{item:"justdirethings:gooblock_tier1"}, 1]
        ],
        removeRecipe:true,
    })

    miMachineRecipe(event, {energy:16, time:2000, machine:"modern_industrialization:microbial_fabricator",
        inputItems:[
            [{item:"spectrum:bottle_of_failing"}, 1],
            [{item:"justdirethings:gooblock_tier1"}, 1],
            [{item:"spectrum:midnight_chip"}, 4],
        ],
        outputItems:[
            [{item:"justdirethings:gooblock_tier2"}, 1]
        ],
        removeRecipe:true,
        custom_condition:"milf:microbial_fabricator_bioactive_coating"
    })

    miMachineRecipe(event, {
        energy: 16, time: 2000, machine: "modern_industrialization:microbial_fabricator",
        inputItems: [
            [{ item: "spectrum:bottle_of_decay_away" }, 1],
            [{ item: "justdirethings:gooblock_tier2" }, 1],
            [{ item: "spectrum:bottle_of_decay_away" }, 1],
        ],
        outputItems: [
            [{ item: "justdirethings:gooblock_tier1" }, 2]
        ],
        removeRecipe: true,
        custom_condition: "milf:microbial_fabricator_bioactive_coating"
    })

    miMachineRecipe(event, {energy:16, time:4000, machine:"modern_industrialization:microbial_fabricator",
        inputItems:[
            [{item:"spectrum:bottle_of_ruin"}, 1],
            [{item:"justdirethings:gooblock_tier2"}, 1],
            [{item:"spectrum:moonstone_powder"}, 4],
        ],
        outputItems:[
            [{item:"justdirethings:gooblock_tier3"}, 1]
        ],
        removeRecipe:true,
        custom_condition:"milf:microbial_fabricator_thermophilic_dermis"
    })

    miMachineRecipe(event, {
        energy: 16, time: 4000, machine: "modern_industrialization:microbial_fabricator",
        inputItems: [
            [{ item: "spectrum:bottle_of_decay_away" }, 1],
            [{ item: "justdirethings:gooblock_tier3" }, 1],
            [{ item: "spectrum:bottle_of_decay_away" }, 1],
        ],
        outputItems: [
            [{ item: "justdirethings:gooblock_tier2" }, 2]
        ],
        removeRecipe: true,
        custom_condition: "milf:microbial_fabricator_thermophilic_dermis"
    })

    miMachineRecipe(event, {
        energy: 16, time: 10000, machine: "modern_industrialization:microbial_fabricator",
        inputItems: [
            [{ item: "spectrum:moonstruck_nectar" }, 1],
            [{ item: "justdirethings:gooblock_tier3" }, 1],
            [{ item: "spectrum:resonance_shard" }, 4],
        ],
        outputItems: [
            [{ item: "justdirethings:gooblock_tier4" }, 1]
        ],
        removeRecipe: true,
        custom_condition: "milf:microbial_fabricator_symbiote_membrane"
    })

    miMachineRecipe(event, {
        energy: 16, time: 10000, machine: "modern_industrialization:microbial_fabricator",
        inputItems: [
            [{ item: "spectrum:bottle_of_decay_away" }, 1],
            [{ item: "justdirethings:gooblock_tier4" }, 1],
            [{ item: "spectrum:bottle_of_decay_away" }, 1],
        ],
        outputItems: [
            [{ item: "justdirethings:gooblock_tier3" }, 2]
        ],
        removeRecipe: true,
        custom_condition: "milf:microbial_fabricator_symbiote_membrane"
    })


    miMachineRecipe(event, {energy:16, time:4000, machine:"modern_industrialization:microbial_fabricator",
        inputItems:[
            [{item:"spectrum:vegetal"}, 64],
            [{item:"modern_industrialization:rubber_sheet"}, 1],
            [{ item:"justdirethings:coal_t1"}, 16],
        ],
        outputItems:[
            [{item:"milf:bioactive_coating"}, 1]
        ],
        removeRecipe:true,
    })

    miMachineRecipe(event, {energy:16, time:8000, machine:"modern_industrialization:microbial_fabricator",
        inputItems:[
            [{item:"spectrum:stratine_gem"}, 1],
            [{item:"modern_industrialization:rubber_sheet"}, 1],
            [{ item:"ae2:annihilation_core"}, 1],
        ],
        outputItems:[
            [{item:"milf:thermophilic_dermis"}, 1]
        ],
        removeRecipe:true,
    })

    miMachineRecipe(event, {energy:16, time:12000, machine:"modern_industrialization:microbial_fabricator",
        inputItems:[
            [{item:"spectrum:aether_vestiges"}, 1],
            [{item:"modern_industrialization:rubber_sheet"}, 1],
            [{ item:"extendedae:entro_shard"}, 1],
        ],
        outputItems:[
            [{item:"milf:symbiote_membrane"}, 1]
        ],
        removeRecipe:true,
    })

    miMachineRecipe(event, {energy:16, time:12000, machine:"modern_industrialization:microbial_fabricator",
        inputItems:[
            [{item:"justdirethings:gooblock_tier3"}, 1],
            [{item:"milf:blank_blueprint"}, 1],
            [{item:"spectrum:onyx_powder"}, 16],
        ],
        outputItems:[
            [{item:"milf:goo_coated_blank_blueprint"}, 1]
        ],
        removeRecipe:true,
    })


})



MIRecipeEvents.customCondition(event => {
    let coatings = ["bioactive_coating", "thermophilic_dermis", "symbiote_membrane"]
    coatings.forEach(coating =>{
        event.register(`milf:microbial_fabricator_${coating}`,
                (context, recipe) => {
                    if(context.level.getBlock(context.blockEntity.blockPos).entityData.upgradesItemStack.id == `milf:${coating}`){
                        return true
                    } 
                    return false
                },
                Text.of(`A ${idToName(coating)} must be used as a machine upgrade`));
    })

    function idToName(id) {
        return id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

});