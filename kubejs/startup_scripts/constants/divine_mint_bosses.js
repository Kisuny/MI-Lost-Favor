global.milfBosses = {
    tier4:{

        "cataclysm:the_harbinger": { structure: "cataclysm:ancient_factory"},
        "cataclysm:ancient_remnant": { structure: "cataclysm:cursed_pyramid"},
        "cataclysm:ignis": { structure: "cataclysm:burning_arena"},
        "cataclysm:netherite_monstrosity": { structure: "cataclysm:soul_black_smith" },
        "cataclysm:maledictus": { structure: "cataclysm:frosted_prison" },
        "cataclysm:ender_guardian": { structure: "cataclysm:ruined_citadel" },
        "cataclysm:the_leviathan": { structure: "cataclysm:sunken_city", isStructureExclusive: true },
        "cataclysm:scylla": { structure: "cataclysm:acropolis" },
        "ars_nouveau:wilden_boss": { structure: "" }

    },

    tier3:{

        "fdbosses:malkuth": { structure: "fdbosses:malkuth_arena", isStructureExclusive: true },
        "fdbosses:chesed": { structure: "fdbosses:chesed_arena", isStructureExclusive: true },
        "fdbosses:geburah": { fakeItemToRender: "fdbosses:geburah_trophy", structure: "fdbosses:geburah_arena", isStructureExclusive: true },
        "bosses_of_mass_destruction:void_blossom": { fakeItemToRender: "bosses_of_mass_destruction:void_blossom", structure: "bosses_of_mass_destruction:void_blossom" },
        "bosses_of_mass_destruction:obsidilith": { fakeItemToRender: "bosses_of_mass_destruction:obsidian_heart", structure: "bosses_of_mass_destruction:obsidilith_arena", structureExclusive:true },
        "bosses_of_mass_destruction:lich": { structure: "bosses_of_mass_destruction:lich_tower" },
        "bosses_of_mass_destruction:gauntlet": { structure: "bosses_of_mass_destruction:gauntlet_arena", isStructureExclusive: true },
        "eternal_starlight:lunar_monstrosity": { structure: "" }
    },

    tier2:{

        "minecraft:warden":{},
        "minecraft:wither": { fakeLoot: [{ "minecraft:nether_star": { count: "1", chance: 1.0 }}]},
        "minecraft:elder_guardian": {},
        "minecraft:ender_dragon": {}

    },

    tier1:{

        "mowziesmobs:umvuthi": { structure: "mowziesmobs:umvuthana_grove" },
        "mowziesmobs:ferrous_wroughtnaut": { structure: "mowziesmobs:wrought_chamber" },
        "mowziesmobs:frostmaw": { structure: "mowziesmobs:frostmaw_spawn" },
        "cataclysm:amethyst_crab": { structure: "cataclysm:amethyst_nest" },
        "companions:sacred_pontiff": { structure: "companions:companions_monkey_temple" },
        "mythsandlegends:black_charro": { structure: "mythsandlegends:graveyard" },
        "born_in_chaos_v1:sir_pumpkinhead": { fakeLootEntity: "born_in_chaos_v1:pumpkinhead", structure: "born_in_chaos_v1:infernal_pumpkin" } //I HATE MCREATOR MODS

    }

}

global.milfEffects = {
    "minecraft:speed": { resourceLocation: $ResourceLocation.parse("minecraft:textures/mob_effect/speed.png"), modifier: 1.4 },
    "minecraft:regeneration": { resourceLocation: $ResourceLocation.parse("minecraft:textures/mob_effect/regeneration.png"), modifier: 2 },
    "minecraft:resistance": { resourceLocation: $ResourceLocation.parse("minecraft:textures/mob_effect/resistance.png"), modifier: 1.7 },
    "minecraft:strength": { resourceLocation: $ResourceLocation.parse("minecraft:textures/mob_effect/strength.png"), modifier: 1.6 },
    "minecraft:health_boost": { resourceLocation: $ResourceLocation.parse("minecraft:textures/mob_effect/health_boost.png"), modifier: 1.2 },
    "none": { resourceLocation: $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/divine_mint_gui_none.png"), modifier: 1 }
}

global.milfDifficulties = {
    "normal": { resourceLocation: $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/difficulty/normal.png"), modifier: 1, name: Component.translatable("milf.divine_mint.gui.difficulty.normal") },
    "hard": { resourceLocation: $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/difficulty/hard.png"), modifier: 1.5, name: Component.translatable("milf.divine_mint.gui.difficulty.hard") },
    //"coin": { resourceLocation: $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/divine_coin_gui.png"), modifier: 1.5, name: Component.translatable("milf.divine_mint.gui.difficulty.hard") },
}
