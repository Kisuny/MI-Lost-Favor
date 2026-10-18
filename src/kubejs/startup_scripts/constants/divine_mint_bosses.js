global.milfBosses = {
    tier4:{

        "cataclysm:the_harbinger": { structure: "cataclysm:ancient_factory"},
        "cataclysm:ancient_remnant": { structure: "cataclysm:cursed_pyramid"},
        "cataclysm:ignis": { structure: "cataclysm:burning_arena"},
        "cataclysm:netherite_monstrosity": {structure: "cataclysm:soul_black_smith", additionalTransformations: (pose) => {
            pose.scale(0.8, 0.8, 1)
        }},
        "cataclysm:maledictus": { structure: "cataclysm:frosted_prison" },
        "cataclysm:ender_guardian": { structure: "cataclysm:ruined_citadel" },
        "cataclysm:the_leviathan": { structure: "cataclysm:sunken_city", isStructureExclusive: true },
        "cataclysm:scylla": { structure: "cataclysm:acropolis" },
        
        "fdbosses:malkuth": { structure: "fdbosses:malkuth_arena", isStructureExclusive: true },
        "fdbosses:chesed": { structure: "fdbosses:chesed_arena", isStructureExclusive: true },
        "fdbosses:geburah": { fakeItemToRender: "fdbosses:geburah_trophy", structure: "fdbosses:geburah_arena", isStructureExclusive: true },
    },

    tier3:{
        // summoned in the ars nouveau 
        // "ars_nouveau:wilden_boss": { structure: "" },
        "legendary_monsters:ancient_guardian": { structure: "legendary_monsters:ancient_stronghold" },
        "legendary_monsters:dune_sentinel": { structure: "legendary_monsters:ruined_pyramid" },
        "legendary_monsters:overgrown_colossus": { structure: "legendary_monsters:mossy_temple" },
        "legendary_monsters:frostbitten_golem": { structure: "legendary_monsters:frostbitten_temple" },
        "legendary_monsters:warped_fungussus": { structure: "legendary_monsters:warped_fungussus_nest" },
        "legendary_monsters:skeletosaurus": { structure: "legendary_monsters:skeletosaurus_nest" },
        "legendary_monsters:lava_eater": { structure: "legendary_monsters:lava_eater_spawn" },
        "legendary_monsters:withered_abomination": { structure: "legendary_monsters:soul_fortress_remains" },
        "legendary_monsters:cloud_golem": { structure: "legendary_monsters:cloudy_temple", isStructureExclusive: true },
        "legendary_monsters:shulker_mimic": { structure: "legendary_monsters:shulker_tower" },
        "legendary_monsters:endersent": { structure: "legendary_monsters:ancient_tower_remains" },
        "legendary_monsters:annihilation_pursuer": { structure: "legendary_monsters:space_station" },
        "legendary_monsters:the_obliterator": { structure: "legendary_monsters:space_station", isStructureExclusive: true },
        "legendary_monsters:posessed_paladin": { structure: "legendary_monsters:collapsed_kingdom", isStructureExclusive: true },

        "netherman:azazel_human": { structure: "netherman:maze" },
        "netherman:azazel": { structure: "" },
    },

    tier2:{

        "minecraft:warden":{},
        "minecraft:wither": { fakeLoot: [{ "minecraft:nether_star": { count: "1", chance: 1.0 }}]},
        "minecraft:elder_guardian": {},
        "minecraft:ender_dragon": {additionalTransformations: (pose) => {
            pose.mulPose($Axis.YP.rotation(Math.PI))
        }}

    },

    tier1:{

        "mowziesmobs:umvuthi": { structure: "mowziesmobs:umvuthana_grove",
        resurrectionItems: [
            { id: "minecraft:feather", count: 8 },
            { id: "devices:gold_coin", count: 5 },
            // { id: "knightlib:great_essence", count: 2 },
            { id: "minecraft:chicken", count: 1 }
        ]},
        "mowziesmobs:ferrous_wroughtnaut": { structure: "mowziesmobs:wrought_chamber" },
        "mowziesmobs:frostmaw": {structure: "mowziesmobs:frostmaw_spawn", additionalTransformations: (pose) => {
            pose.scale(0.8, 0.8, 1)
        }},
        "cataclysm:amethyst_crab": { structure: "cataclysm:amethyst_nest" }
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
