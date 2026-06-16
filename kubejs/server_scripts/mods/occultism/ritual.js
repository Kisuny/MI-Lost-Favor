//https://github.com/klikli-dev/occultism-kubejs/blob/version/1.21.1/runs/client/kubejs/server_scripts/example.js 

ServerEvents.recipes(event => {


    // event.recipes.occultism.ritual(
    //     'ars_elemental:curio_bag',
    //     [
    //         "hexerei:infused_fabric",
    //         "hexerei:infused_fabric",
    //         "hexerei:infused_fabric",
    //         "enchanted:creeper_heart"
    //     ],
    //     '#c:chests',
    //     'occultism:craft_foliot'
    // ).dummy("milf:craft_curio_bag")

    event.recipes.occultism.ritual(
        'milf:vial_of_liquid_confidence',
        [
            "occultism:afrit_essence",
            "paganbless:wican_ward",
            "paganbless:chopped_rue",
            "paganbless:chopped_lavender",
            "enchanted:soul_of_the_world",
            "enchanted:mystic_unguent",
            "enchanted:drop_of_luck",
            "enchanted:tear_of_the_goddess",
            "spectrum:onyx_shard",
        ],
        'toxony:toxin_flask',
        'occultism:craft_afrit',
        180
    ).dummy("milf:craft_vial_of_liquid_confidence")



    event.recipes.occultism.ritual(
        'ars_nouveau:alakarkinos_se',
        [
            "#milf:claws",
            "occultism:spirit_attuned_gem",
            "neovitae:cinder_heart_fragment",
        ],
        'minecraft:nautilus_shell',
        'occultism:possess_afrit',
        10
    )
        .entityToSummon('ars_nouveau:alakarkinos')
        .ritualType("occultism:summon")
        .dummy("milf:alakarkinos")


    event.recipes.occultism.ritual(
        'ars_nouveau:starbuncle_se',
        [
            "modern_industrialization:gold_plate",
            "modern_industrialization:gold_plate",
            "modern_industrialization:gold_plate",
            "occultism:spirit_attuned_gem",
            "neovitae:cinder_heart_fragment",
        ],
        'minecraft:gold_block',
        'occultism:possess_afrit',
        10
    )
        .entityToSummon('ars_nouveau:starbuncle')
        .ritualType("occultism:summon")
        .dummy("milf:starbuncle")

    event.recipes.occultism.ritual(
        'ars_nouveau:whirlisprig_se',
        [
            "minecraft:wheat_seeds",
            "ars_nouveau:magebloom",
            "ars_nouveau:magebloom_crop",
            "occultism:spirit_attuned_gem",
            "neovitae:cinder_heart_fragment",
        ],
        'minecraft:bamboo',
        'occultism:possess_afrit',
        10
    )
        .entityToSummon('ars_nouveau:whirlisprig')
        .ritualType("occultism:summon")
        .dummy("milf:whirlisprig")
    
    event.recipes.occultism.ritual(
        'ars_nouveau:drygmy_se',
        [
            "#c:seeds",
            "ars_nouveau:source_gem",
            "minecraft:wheat",
            "occultism:spirit_attuned_gem",
            "neovitae:cinder_heart_fragment",
        ],
        '#c:bones',
        'occultism:possess_afrit',
        10
    )
        .entityToSummon('ars_nouveau:drygmy')
        .ritualType("occultism:summon")
        .dummy("milf:drygmy")
    
    event.recipes.occultism.ritual(
        'ars_elemental:siren_charm',
        [
            "#minecraft:fishes",
            "#minecraft:fishes",
            "#minecraft:fishes",
            "minecraft:prismarine_shard",
            "occultism:spirit_attuned_gem",
            "neovitae:cinder_heart_fragment",
        ],
        'minecraft:heart_of_the_sea',
        'occultism:possess_afrit',
        10
    )
        .entityToSummon('ars_elemental:siren_entity')
        .ritualType("occultism:summon")
        .dummy("milf:siren")

});