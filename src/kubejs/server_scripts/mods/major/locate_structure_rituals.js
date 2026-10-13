const locate_structure_rituals = [
    {
        name: "bastille", structure: "takesapillage:bastille", items: [
            "minecraft:raw_iron",
            "minecraft:crossbow",
            "minecraft:emerald_block",
        ]
    },
    {
        name: "nether_trial", structure: "hellish_trials:nether_trial", items: [
            "enchanted:demonic_blood",
            "minecraft:netherite_scrap",
        ]
    },
    {
        name: "acropolis", structure: "cataclysm:acropolis", items: [
            "cataclysm:storm_eye",
        ]
    },
    {
        name: "ancient_factory", structure: "cataclysm:ancient_factory", items: [
            "cataclysm:mech_eye",
        ]
    },
    {
        name: "cursed_pyramid", structure: "cataclysm:cursed_pyramid", items: [
            "cataclysm:desert_eye",
        ]
    },
    {
        name: "frosted_prison", structure: "cataclysm:frosted_prison", items: [
            "cataclysm:cursed_eye",
        ]
    },
    {
        name: "sunken_city", structure: "cataclysm:sunken_city", items: [
            "cataclysm:abyss_eye",
        ]
    },
    {
        name: "burning_arena", structure: "cataclysm:burning_arena", items: [
            "cataclysm:flame_eye",
        ]
    },
    {
        name: "soul_black_smith", structure: "cataclysm:soul_black_smith", items: [
            "cataclysm:monstrous_eye",
        ]
    },
    {
        name: "ruined_citadel", structure: "cataclysm:ruined_citadel", items: [
            "cataclysm:void_eye",
        ]
    },
    {
        name: "chesed_arena", structure: "fdbosses:chesed_arena", items: [
            "fdbosses:eye_of_chesed",
        ]
    },
    {
        name: "geburah_arena", structure: "fdbosses:geburah_arena", items: [
            "fdbosses:eye_of_geburah",
        ]
    },
    {
        name: "malkuth_arena", structure: "fdbosses:malkuth_arena", items: [
            "fdbosses:eye_of_malkuth",
        ]
    },
    {
        name: "cataclysm_amethyst_nest", structure: "cataclysm:amethyst_nest", items: [
            "minecraft:amethyst_block",
            "minecraft:amethyst_block",
            "minecraft:amethyst_block",
        ]
    },
    {
        name: "monastery", structure: "mowziesmobs:monastery", items: [
            "minecraft:goat_horn",
            "minecraft:red_terracotta",
        ]
    },
    {
        name: "wrought_chamber", structure: "mowziesmobs:wrought_chamber", items: [
            "minecraft:iron_sword",
            "minecraft:iron_sword",
        ]
    },
    {
        name: "frostmaw_spawn", structure: "mowziesmobs:frostmaw_spawn", items: [
            "minecraft:powder_snow_bucket",
            "toxony:snow_mint",
        ]
    },
    {
        name: "umvuthana_grove", structure: "mowziesmobs:umvuthana_grove", items: [
            "ytech:lion_man",
            "ytech:wild_horse",
            "ytech:venus_of_hohle_fels",
            "ytech:shell_beads",
        ]
    },
    {
        name: "pedestal_ruins_stone", structure: "spectrum:pedestal_ruins_stone", items: [
            "minecraft:stone",
            "spectrum:light_blue_pigment",
            "spectrum:magenta_pigment",
            "spectrum:lime_pigment",
        ]
    },
    {
        name: "pedestal_ruins_deepslate", structure: "spectrum:pedestal_ruins_deepslate", items: [
            "minecraft:deepslate",
            "spectrum:light_blue_pigment",
            "spectrum:magenta_pigment",
            "spectrum:lime_pigment",
        ]
    },
    {
        name: "fortress", structure: "betterfortresses:fortress", items: [
            "minecraft:nether_brick",
            "minecraft:nether_brick",
            "minecraft:nether_brick",
            "minecraft:nether_brick",
        ]
    },
    {
        name: "weeping_well", structure: "malum:weeping_well", items: [
            "devices:orichalcum_coin",
            "minecraft:water_bucket",
        ]
    },
]

ServerEvents.generateData("before_mods", event => {
    locate_structure_rituals.forEach(ritual => {
        event.json(`ars_additions:tags/worldgen/structure/${ritual.name}`, {
            "values": [{ "id": ritual.structure, "required": false }]
        })
    })
})

ServerEvents.recipes(event => {

    locate_structure_rituals.forEach(ritual => {
        let tag = `ars_additions:${ritual.name}`

        event.custom({
            "type": "ars_additions:locate_structure",
            "augments": ritual.items.map(item => ({ "key": item })),
            "id": tag,
            "structure": { "tag": tag }
        }).id(`ars_additions:locate_structure/${ritual.name}`)

        event.custom({
            "type": "eidolon_repraised:ritual_brazier_location",
            "focus_items": [],
            "health_requirement": 0.0,
            "id": `eidolon_repraised:ritual_locate_${ritual.name}`,
            "pedestal_items": ritual.items.map(item => ({ "item": item })),
            "reagent": { "item": "minecraft:map" },
            "structure": tag
        }).id(`eidolon_repraised:rituals/ritual_locate_${ritual.name}`)
    })

})
