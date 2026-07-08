ServerEvents.recipes(event => {

    const locate_structure_list = [
        {
            id: "lich_tower", pedestal_items: [
                { "item": "enchanted:whiff_of_magic" },
                { "item": "minecraft:skeleton_skull" },
                { "item": "enchanted:ender_dew" },
            ]
        },
        {
            id: "void_blossom", pedestal_items: [
                { "item": "enchanted:ender_dew" },
                { "item": "enchanted:breath_of_the_goddess" },
                { "item": "paganbless:chopped_lavender" },
            ]
        },
        {
            id: "gauntlet_arena", pedestal_items: [
                { "item": "enchanted:tongue_of_dog" },
                { "item": "enchanted:demonic_blood" },
            ]
        },
        {
            id: "obsidilith_arena", pedestal_items: [
                { "item": "minecraft:end_stone" },
                { "item": "enchanted:whiff_of_magic" },
            ]
        },
        {
            id: "bastille", pedestal_items: [
                { "item": "minecraft:raw_iron" },
                { "item": "minecraft:crossbow" },
                { "item": "minecraft:emerald_block" },
            ]
        },
        {
            id: "nether_trial", pedestal_items: [
                { "item": "enchanted:demonic_blood" },
                { "item": "minecraft:netherite_scrap" },
            ]
        },
        {
            id: "acropolis", pedestal_items: [
                { "item": "cataclysm:storm_eye" },
            ]
        },
        {
            id: "ancient_factory", pedestal_items: [
                { "item": "cataclysm:mech_eye" },
            ]
        },
        {
            id: "cursed_pyramid", pedestal_items: [
                { "item": "cataclysm:desert_eye" },
            ]
        },
        {
            id: "frosted_prison", pedestal_items: [
                { "item": "cataclysm:cursed_eye" },
            ]
        },
        {
            id: "sunken_city", pedestal_items: [
                { "item": "cataclysm:abyss_eye" },
            ]
        },
        {
            id: "burning_arena", pedestal_items: [
                { "item": "cataclysm:flame_eye" },
            ]
        },
        {
            id: "soul_black_smith", pedestal_items: [
                { "item": "cataclysm:monstrous_eye" },
            ]
        },
        {
            id: "ruined_citadel", pedestal_items: [
                { "item": "cataclysm:void_eye" },
            ]
        },
        {
            id: "chesed_arena", pedestal_items: [
                { "item": "fdbosses:eye_of_chesed" },
            ]
        },
        {
            id: "geburah_arena", pedestal_items: [
                { "item": "fdbosses:eye_of_geburah" },
            ]
        },
        {
            id: "malkuth_arena", pedestal_items: [
                { "item": "fdbosses:eye_of_malkuth" },
            ]
        },
        {
            id: "myths_and_legends_graveyard", pedestal_items: [
                { "item": "minecraft:skeleton_skull" },
                { "item": "minecraft:skeleton_skull" },
            ]
        },
        {
            id: "cataclysm_amethyst_nest", pedestal_items: [
                { "item": "minecraft:amethyst_block" },
                { "item": "minecraft:amethyst_block" },
                { "item": "minecraft:amethyst_block" },
            ]
        },
        {
            id: "born_in_chaos_v1_infernal_pumpkin", pedestal_items: [
                { "item": "minecraft:jack_o_lantern" },
                { "item": "enchanted:foul_fume" },
            ]
        },
        {
            id: "companions_monkey_temple", pedestal_items: [
                { "item": "minecraft:cocoa_beans" },
                { "item": "enchanted:candelabra" },
            ]
        },
        {
            id: "monastery", pedestal_items: [
                { "item": "minecraft:goat_horn" },
                { "item": "minecraft:red_terracotta" },
            ]
        },
        {
            id: "wrought_chamber", pedestal_items: [
                { "item": "minecraft:iron_sword" },
                { "item": "minecraft:iron_sword" },
            ]
        },
        {
            id: "frostmaw_spawn", pedestal_items: [
                { "item": "minecraft:powder_snow_bucket" },
                { "item": "toxony:snow_mint" },
            ]
        },
        {
            id: "umvuthana_grove", pedestal_items: [
                { "item": "ytech:lion_man" },
                { "item": "ytech:wild_horse" },
                { "item": "ytech:venus_of_hohle_fels" },
                { "item": "ytech:shell_beads" },
            ]
        },
        {
            id: "fortress", pedestal_items: [
                { "item": "minecraft:nether_brick" },
                { "item": "minecraft:nether_brick" },
                { "item": "minecraft:nether_brick" },
                { "item": "minecraft:nether_brick" },
            ]
        },
        {
            id: "weeping_well", pedestal_items: [
                { "tag": "c:buckets" },
                { "item": "devices:orichalcum_coin" }
            ]
        },
    ]

    locate_structure_list.forEach(s => {
        event.custom({
            "type": "eidolon_repraised:ritual_brazier_location",
            "focus_items": [],
            "health_requirement": 0.0,
            "pedestal_items": s.pedestal_items,
            "reagent": { "item": "minecraft:map" },
            "structure": `ars_additions:${s.id}`
        })
    })

})