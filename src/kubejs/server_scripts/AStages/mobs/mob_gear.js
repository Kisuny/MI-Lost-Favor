let $MobGearPlayerUtils = Java.loadClass("com.alessandro.astages.api.util.APlayerUtils")
let $MobGearEnchantmentHelper = Java.loadClass("net.minecraft.world.item.enchantment.EnchantmentHelper")
let $MobGearEquipmentSlot = Java.loadClass("net.minecraft.world.entity.EquipmentSlot")
let $MobGearOptional = Java.loadClass("java.util.Optional")
let $MobGearAttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")
let $MobGearOperation = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation")
let $MobGearTagKey = Java.loadClass("net.minecraft.tags.TagKey")

const MOB_GEAR_PENDING_KEY = "milf_mob_gear_pending"

const MOB_GEAR_CHANCE = 0.6

const MOB_GEAR_NO_DROP = [
    "@thaumaturge",
    "@aquaculture",
    "@legendary_monsters",
    "@malum",
    "@embers",
]

const MOB_GEAR_ARMOR_SLOTS = [
    $MobGearEquipmentSlot.HEAD,
    $MobGearEquipmentSlot.CHEST,
    $MobGearEquipmentSlot.LEGS,
    $MobGearEquipmentSlot.FEET,
]

const MOB_GEAR_SLOT_CACHE = {}

const MOB_GEAR_TAG_CACHE = {}

const MOB_GEAR_ENTITY_TAG_CACHE = {}

const MOB_GEAR_LOOKUP_CACHE = { mobs: {}, specials: {} }

const mobGearArmorSet = (material, pieces) => {
    let base = material.indexOf(":") == -1 ? `minecraft:${material}` : material
    let names = Object.assign({ helmet: "helmet", chestplate: "chestplate", leggings: "leggings", boots: "boots" }, pieces || {})
    return [names.helmet, names.chestplate, names.leggings, names.boots].map(piece => `${base}_${piece}`)
}

const mobGearTools = (material) => [
    `minecraft:${material}_sword`,
    `minecraft:${material}_sword`,
    `minecraft:${material}_axe`,
    `minecraft:${material}_pickaxe`,
    `minecraft:${material}_shovel`,
]

const MOB_GEAR_BUFF_ID = "milf:mob_gear_buff"

const mobGearBuffs = (chance, maxCount, scale) => ({
    chance: chance,
    maxCount: maxCount,
    pool: [
        { id: "minecraft:generic.max_health", op: "ADD_MULTIPLIED_BASE", min: 0.2 * scale, max: 0.4 * scale },
        { id: "minecraft:generic.attack_damage", op: "ADD_MULTIPLIED_BASE", min: 0.15 * scale, max: 0.3 * scale },
        { id: "minecraft:generic.movement_speed", op: "ADD_MULTIPLIED_BASE", min: 0.05 * scale, max: 0.1 * scale },
        { id: "minecraft:generic.armor", op: "ADD_VALUE", min: 2 * scale, max: 4 * scale },
        { id: "minecraft:generic.knockback_resistance", op: "ADD_VALUE", min: 0.2 * scale, max: 0.4 * scale },
    ],
})

const MOB_GEAR_TIERS = [
    {
        stage: "mob_gear_leather",
        buffs: mobGearBuffs(0.2, 1, 0.5),
        armorChance: 0.35,
        weaponChance: 0.3,
        dropChance: 0.085,
        armor: mobGearArmorSet("leather").concat(
            ["milf:fishnets"],
            mobGearArmorSet("toxony:hunter", {helmet: "hat", chestplate: "coat"}),
            mobGearArmorSet("toxony:plague_doctor", {helmet: "hood", chestplate: "coat"}),
            ["mowziesmobs:umvuthana_mask_fury", "mowziesmobs:umvuthana_mask_fear", "mowziesmobs:umvuthana_mask_rage", "mowziesmobs:umvuthana_mask_bliss", "mowziesmobs:umvuthana_mask_misery", "mowziesmobs:umvuthana_mask_faith", "mowziesmobs:sol_visage"]
        ),
        weapons: ["ytech:flint_axe", "ytech:flint_knife", "ytech:flint_spear", "milf:flint_pickaxe", "dungeonsdelight:flint_cleaver"],
    },
    {
        stage: "mob_gear_gold",
        buffs: mobGearBuffs(0.25, 1, 0.75),
        armorChance: 0.25,
        weaponChance: 0.25,
        dropChance: 0.085,
        armor: mobGearArmorSet("golden").concat(
            mobGearArmorSet("chainmail"), 
            mobGearArmorSet("copper"),
            mobGearArmorSet("toxony:plaguebringer", {helmet: "mask", chestplate: "coat"}),
            ["embers:ashen_goggles", "embers:ashen_cloak", "embers:ashen_leggings", "embers:ashen_boots"]
        ),
        weapons: mobGearTools("golden").concat(
            mobGearTools("copper"), 
            ["#simplyswords:gold_gear"]
        ),
        enchant: { chance: 0.08, minLevel: 3, maxLevel: 10 },
    },
    {
        stage: "mob_gear_iron",
        buffs: mobGearBuffs(0.3, 2, 1),
        armorChance: 0.2,
        weaponChance: 0.2,
        dropChance: 0.06,
        armor: mobGearArmorSet("iron").concat(
            mobGearArmorSet("mythsandlegends:ironshade"),
            mobGearArmorSet("mythsandlegends:soulpiercer"),
            mobGearArmorSet("mythsandlegends:winter_stalker"),
            mobGearArmorSet("immersiveengineering:armor_steel"),
            mobGearArmorSet("eidolon_repraised:silver"),
            mobGearArmorSet("toxony:professional_hunter", {helmet: "hat", chestplate: "coat"}),
            mobGearArmorSet("thaumaturge:thaumium", { helmet: "helm", chestplate: "chest", leggings: "legs" })

        ),
        weapons: mobGearTools("iron").concat(
            ['#simplyswords:iron_gear', '#simplyswords:uniques']
        ),
        enchant: { chance: 0.15, minLevel: 5, maxLevel: 15 },
    },
    {
        stage: "mob_gear_diamond",
        buffs: mobGearBuffs(0.35, 2, 1.5),
        armorChance: 0.12,
        weaponChance: 0.12,
        dropChance: 0.03,
        armor: mobGearArmorSet("diamond").concat(
            mobGearArmorSet("monsterplus:crystal"),
            ["thaumaturge:crimson_plate_helm", "thaumaturge:crimson_plate_chest", "thaumaturge:crimson_plate_legs"],
            ["thaumaturge:crimson_robe_helm", "thaumaturge:crimson_robe_chest", "thaumaturge:crimson_robe_legs"],
            ["thaumaturge:crimson_ranger_helm", "thaumaturge:crimson_ranger_chest", "thaumaturge:crimson_ranger_legs", "thaumaturge:crimson_boots"],
            ["hexerei:witch_helmet", "hexerei:mushroom_witch_hat", "hexerei:witch_chestplate", "hexerei:witch_boots"],
            mobGearArmorSet("royalvariations:royal_knight", { chestplate: "cuirass" }),
            mobGearArmorSet("aquaculture:neptunium"),
            mobGearArmorSet("malum:soul_stained_steel")
        ),
        weapons: mobGearTools("diamond").concat(
            ['#simplyswords:diamond_gear']
        ),
        bows: ["aquaculture:neptunium_bow", "#simplybows:uniques"],
        enchant: { chance: 0.25, minLevel: 10, maxLevel: 22 },
    },
    {
        stage: "mob_gear_netherite",
        buffs: mobGearBuffs(0.4, 3, 2),
        armorChance: 0.06,
        weaponChance: 0.06,
        dropChance: 0.01,
        armor: mobGearArmorSet("netherite").concat(
            ["eidolon_repraised:bonelord_helm", "eidolon_repraised:bonelord_chestplate", "eidolon_repraised:bonelord_greaves"],
            mobGearArmorSet("legendary_monsters:annihilator"),   
            mobGearArmorSet("thaumaturge:void", { helmet: "helm", chestplate: "chest", leggings: "legs" })
        ),
        weapons: mobGearTools("netherite").concat(
            ['#simplyswords:netherite_gear']
        ),
        enchant: { chance: 0.35, minLevel: 15, maxLevel: 30 },
        effects: {
            chance: 0.25,
            maxCount: 3,
            pool: [
                { id: "minecraft:strength", maxAmplifier: 1 },
                { id: "minecraft:speed", maxAmplifier: 1 },
                { id: "minecraft:resistance", maxAmplifier: 0 },
                { id: "minecraft:fire_resistance", maxAmplifier: 0 },
                { id: "minecraft:regeneration", maxAmplifier: 0 },
                { id: "minecraft:absorption", maxAmplifier: 2 },
            ],
        },
    },
]

const MOB_GEAR_MOBS = {
    "minecraft:zombie": { armor: true, weapon: true },
    "minecraft:zombie_villager": { armor: true, weapon: true },
    "minecraft:husk": { armor: true, weapon: true },
    "minecraft:drowned": { armor: true, weapon: true, keepMainHand: ["minecraft:trident"] },
    "minecraft:zombified_piglin": { armor: true, weapon: true },
    "minecraft:wither_skeleton": { armor: true, weapon: true },
    "minecraft:skeleton": { armor: true, weapon: false, ranged: true },
    "minecraft:stray": { armor: true, weapon: false, ranged: true },
    "minecraft:bogged": { armor: true, weapon: false, ranged: true },
    "minecraft:piglin": { armor: true, weapon: false },
    "#milf:creepers": { armor: false, weapon: false },
    "minecraft:spider": { armor: false, weapon: false },
    "minecraft:cave_spider": { armor: false, weapon: false },
    "#milf:endermen": { armor: false, weapon: false },
    "minecraft:witch": { armor: false, weapon: false },
    "minecraft:pillager": { armor: false, weapon: false },
    "minecraft:slime": { armor: false, weapon: false },
    "minecraft:magma_cube": { armor: false, weapon: false },
    "minecraft:phantom": { armor: false, weapon: false },
    "minecraft:blaze": { armor: false, weapon: false },
    "minecraft:ghast": { armor: false, weapon: false },
    "minecraft:hoglin": { armor: false, weapon: false },
    "minecraft:ravager": { armor: false, weapon: false },
    "minecraft:vex": { armor: false, weapon: false },

    "eidolon_repraised:giant_skeleton": { armor: true, weapon: false },
    "eidolon_repraised:zombie_brute": { armor: true, weapon: true },
    "eidolon_repraised:necromancer": { armor: false, weapon: false },
    "eidolon_repraised:wraith": { armor: false, weapon: false },

    "darkerdepths:glowshroom_monster": { armor: false, weapon: false },
    "darkerdepths:body_snatcher": { armor: false, weapon: false },
    "darkerdepths:void_soul_knight": { armor: false, weapon: false },
    "darkerdepths:scorcher": { armor: false, weapon: false },

    "monsterplus:crystal_zombie": { armor: true, weapon: true },
    "monsterplus:swamp_zombie": { armor: true, weapon: true },
    "enderzoology:infested_zombie": { armor: true, weapon: true },
    "rottencreatures:burned": { armor: true, weapon: true },
    "rottencreatures:frostbitten": { armor: true, weapon: true },
    "rottencreatures:zap": { armor: true, weapon: true },
    "rottencreatures:swampy": { armor: true, weapon: true },
    "rottencreatures:zombie_lackey": { armor: true, weapon: true },
    "rottencreatures:skeleton_lackey": { armor: true, weapon: true },
    "variantsandventures:thicket": { armor: true, weapon: true },
    "enderzoology:fallen_knight": { armor: true, weapon: false },
    "rottencreatures:undead_miner": { armor: true, weapon: false },
    "rottencreatures:immortal": { armor: true, weapon: false },
    "rottencreatures:mummy": { armor: true, weapon: false },
    "variantsandventures:gelid": { armor: true, weapon: false },
    "monsterplus:glow_skeleton": { armor: true, weapon: false, ranged: true },
    "monsterplus:overgrown_skeleton": { armor: true, weapon: false, ranged: true },
    "monsterplus:spectral_skeleton": { armor: true, weapon: false, ranged: true },
    "variantsandventures:murk": { armor: true, weapon: false, ranged: true },
    "variantsandventures:verdant": { armor: true, weapon: false, ranged: true },

    "cataclysm:koboleton": { armor: false, weapon: false },
    "cataclysm:deepling_brute": { armor: false, weapon: false },
    "enderzoology:fallen_mount": { armor: false, weapon: false },
    "monsterplus:ancient_hero": { armor: false, weapon: false },
    "mythsandlegends:cogling": { armor: false, weapon: false },
    "mythsandlegends:draugr": { armor: false, weapon: false },
    "mythsandlegends:gargoyle": { armor: false, weapon: false },
    "mythsandlegends:karakondjul": { armor: false, weapon: false },
    "mythsandlegends:possessed_armor": { armor: false, weapon: false },
    "mythsandlegends:possessed_armor_archer": { armor: false, weapon: false },
    "mythsandlegends:possessed_armor_lancer": { armor: false, weapon: false },
    "royalvariations:royal_zombie": { armor: false, weapon: false },
    "cataclysm:deepling": { armor: false, weapon: false },
    "cataclysm:deepling_angler": { armor: false, weapon: false },
    "cataclysm:lionfish": { armor: false, weapon: false },
    "enderzoology:concussion_creeper": { armor: false, weapon: false },
    "enderzoology:dire_wolf": { armor: false, weapon: false },
    "enderzoology:enderminy": { armor: false, weapon: false },
    "enderzoology:wither_cat": { armor: false, weapon: false },
    "mowziesmobs:umvuthana": { armor: false, weapon: false },
    "mowziesmobs:umvuthana_raptor": { armor: false, weapon: false },
    "mythsandlegends:amarok": { armor: false, weapon: false },
    "mythsandlegends:imp": { armor: false, weapon: false },
    "mythsandlegends:imp_clone": { armor: false, weapon: false },
    "mythsandlegends:jiangshi": { armor: false, weapon: false },
    "rottencreatures:glacial_hunter": { armor: false, weapon: false },
    "rottencreatures:hunter_wolf": { armor: false, weapon: false },
    "rottencreatures:scarab": { armor: false, weapon: false },
    "royalvariations:royal_creeper": { armor: false, weapon: false },
    "royalvariations:royal_enderman": { armor: false, weapon: false },
    "enderzoology:wither_witch": { armor: false, weapon: false },
    "legendary_monsters:bomber": { armor: false, weapon: false },
    "monsterplus:abyssologer": { armor: false, weapon: false },
    "monsterplus:desert_acolyte": { armor: false, weapon: false },
    "monsterplus:desert_sorceress": { armor: false, weapon: false },
    "mythsandlegends:alp": { armor: false, weapon: false },
    "mythsandlegends:eidolon": { armor: false, weapon: false },
    "mythsandlegends:lampad": { armor: false, weapon: false },
    "mythsandlegends:omecuaime": { armor: false, weapon: false },
    "rottencreatures:dead_beard": { armor: false, weapon: false },
    "royalvariations:royal_skeleton": { armor: false, weapon: false },
    "monsterplus:ancient_hero_skull": { armor: false, weapon: false },
    "monsterplus:demon_eye": { armor: false, weapon: false },
    "monsterplus:ender_eye": { armor: false, weapon: false },
    "monsterplus:opalescent_eye": { armor: false, weapon: false },
    "monsterplus:spectral_skull": { armor: false, weapon: false },
    "monsterplus:wisp": { armor: false, weapon: false },
    "monsterplus:soul": { armor: false, weapon: false },
    "mowziesmobs:naga": { armor: false, weapon: false },
    "monsterplus:lava_squid": { armor: false, weapon: false },
    "monsterplus:mother_lava_squid": { armor: false, weapon: false },
    "mythsandlegends:abaddon": { armor: false, weapon: false },
    "mythsandlegends:scorched_sentinel": { armor: false, weapon: false },

    "grimoireofgaia:bone_knight": { armor: false, weapon: false },
    "grimoireofgaia:cobble_golem": { armor: false, weapon: false },
    "grimoireofgaia:cobblestone_golem": { armor: false, weapon: false },
    "grimoireofgaia:cyclops": { armor: false, weapon: false },
    "grimoireofgaia:dullahan": { armor: false, weapon: false },
    "grimoireofgaia:gelatinous_slime": { armor: false, weapon: false },
    "grimoireofgaia:mimic": { armor: false, weapon: false },
    "grimoireofgaia:minotaur": { armor: false, weapon: false },
    "grimoireofgaia:mummy": { armor: false, weapon: false },
    "grimoireofgaia:oni": { armor: false, weapon: false },
    "grimoireofgaia:orc": { armor: false, weapon: false },
    "grimoireofgaia:sphinx": { armor: false, weapon: false },
    "grimoireofgaia:spriggan": { armor: false, weapon: false },
    "grimoireofgaia:valkyrie": { armor: false, weapon: false },
    "grimoireofgaia:wither_cow": { armor: false, weapon: false },
    "grimoireofgaia:ant": { armor: false, weapon: false },
    "grimoireofgaia:creep": { armor: false, weapon: false },
    "grimoireofgaia:ender_eye": { armor: false, weapon: false },
    "grimoireofgaia:goblin": { armor: false, weapon: false },
    "grimoireofgaia:goblin_feral": { armor: false, weapon: false },
    "grimoireofgaia:gravemite": { armor: false, weapon: false },
    "grimoireofgaia:kobold": { armor: false, weapon: false },
    "grimoireofgaia:mandragora": { armor: false, weapon: false },
    "grimoireofgaia:matango": { armor: false, weapon: false },
    "grimoireofgaia:mermaid": { armor: false, weapon: false },
    "grimoireofgaia:naga": { armor: false, weapon: false },
    "grimoireofgaia:satyress": { armor: false, weapon: false },
    "grimoireofgaia:sharko": { armor: false, weapon: false },
    "grimoireofgaia:sporeling": { armor: false, weapon: false },
    "grimoireofgaia:toad": { armor: false, weapon: false },
    "grimoireofgaia:werecat": { armor: false, weapon: false },
    "grimoireofgaia:ant_salvager": { armor: false, weapon: false },
    "grimoireofgaia:anubis": { armor: false, weapon: false },
    "grimoireofgaia:arachne": { armor: false, weapon: false },
    "grimoireofgaia:banshee": { armor: false, weapon: false },
    "grimoireofgaia:behender": { armor: false, weapon: false },
    "grimoireofgaia:cecaelia": { armor: false, weapon: false },
    "grimoireofgaia:centaur": { armor: false, weapon: false },
    "grimoireofgaia:dryad": { armor: false, weapon: false },
    "grimoireofgaia:dwarf": { armor: false, weapon: false },
    "grimoireofgaia:ender_dragon_girl": { armor: false, weapon: false },
    "grimoireofgaia:flesh_lich": { armor: false, weapon: false },
    "grimoireofgaia:hunter": { armor: false, weapon: false },
    "grimoireofgaia:minotaurus": { armor: false, weapon: false },
    "grimoireofgaia:nine_tails": { armor: false, weapon: false },
    "grimoireofgaia:shaman": { armor: false, weapon: false },
    "grimoireofgaia:siren": { armor: false, weapon: false },
    "grimoireofgaia:sludge_girl": { armor: false, weapon: false },
    "grimoireofgaia:succubus": { armor: false, weapon: false },
    "grimoireofgaia:witch": { armor: false, weapon: false },
    "grimoireofgaia:yuki_onna": { armor: false, weapon: false },
    "grimoireofgaia:bee": { armor: false, weapon: false },
    "grimoireofgaia:gryphon": { armor: false, weapon: false },
    "grimoireofgaia:harpy": { armor: false, weapon: false },
    "grimoireofgaia:wizard_harpy": { armor: false, weapon: false },
}

const mobGearEffect = (stage, chance, effects) => ({
    stage: stage,
    chance: chance,
    effects: effects.map(effect => ({ id: effect[0], amplifier: effect[1] })),
})

const MOB_GEAR_SPECIAL_PRESETS = {
    brute: [
        mobGearEffect("mob_gear_gold", 0.15, [["minecraft:resistance", 0]]),
        mobGearEffect("mob_gear_iron", 0.15, [["minecraft:strength", 0]]),
        mobGearEffect("mob_gear_diamond", 0.12, [["minecraft:absorption", 1]]),
        mobGearEffect("mob_gear_netherite", 0.15, [["minecraft:resistance", 1], ["minecraft:strength", 1]]),
    ],
    agile: [
        mobGearEffect("mob_gear_gold", 0.15, [["minecraft:speed", 0]]),
        mobGearEffect("mob_gear_iron", 0.15, [["minecraft:strength", 0]]),
        mobGearEffect("mob_gear_diamond", 0.1, [["minecraft:invisibility", 0]]),
        mobGearEffect("mob_gear_netherite", 0.15, [["minecraft:speed", 1], ["minecraft:strength", 1]]),
    ],
    caster: [
        mobGearEffect("mob_gear_gold", 0.15, [["minecraft:speed", 0]]),
        mobGearEffect("mob_gear_iron", 0.15, [["minecraft:resistance", 0]]),
        mobGearEffect("mob_gear_diamond", 0.12, [["minecraft:absorption", 1]]),
        mobGearEffect("mob_gear_netherite", 0.15, [["minecraft:resistance", 1], ["minecraft:fire_resistance", 0]]),
    ],
    flyer: [
        mobGearEffect("mob_gear_gold", 0.15, [["minecraft:speed", 0]]),
        mobGearEffect("mob_gear_iron", 0.15, [["minecraft:resistance", 0]]),
        mobGearEffect("mob_gear_diamond", 0.12, [["minecraft:absorption", 1]]),
        mobGearEffect("mob_gear_netherite", 0.15, [["minecraft:speed", 1], ["minecraft:resistance", 1]]),
    ],
    fiery: [
        mobGearEffect("mob_gear_iron", 0.15, [["minecraft:resistance", 0]]),
        mobGearEffect("mob_gear_diamond", 0.15, [["minecraft:strength", 0]]),
        mobGearEffect("mob_gear_netherite", 0.15, [["minecraft:resistance", 1], ["minecraft:strength", 1]]),
    ],
}

const MOB_GEAR_SPECIALS = {
    "#milf:creepers": [
        { stage: "mob_gear_gold", chance: 0.15, nbt: { Fuse: 20 } },
        { stage: "mob_gear_iron", chance: 0.15, nbt: { ExplosionRadius: 4 } },
        { stage: "mob_gear_diamond", chance: 0.08, nbt: { powered: true } },
        { stage: "mob_gear_netherite", chance: 0.15, nbt: { powered: true, Fuse: 20 } },
    ],
    "minecraft:spider": [
        { stage: "mob_gear_gold", chance: 0.15, effects: [{ id: "minecraft:speed", amplifier: 0 }] },
        { stage: "mob_gear_iron", chance: 0.15, effects: [{ id: "minecraft:strength", amplifier: 0 }] },
        { stage: "mob_gear_diamond", chance: 0.1, effects: [{ id: "minecraft:invisibility", amplifier: 0 }] },
        { stage: "mob_gear_netherite", chance: 0.15, effects: [{ id: "minecraft:speed", amplifier: 1 }, { id: "minecraft:strength", amplifier: 1 }] },
    ],
    "minecraft:cave_spider": [
        { stage: "mob_gear_gold", chance: 0.15, effects: [{ id: "minecraft:speed", amplifier: 0 }] },
        { stage: "mob_gear_diamond", chance: 0.1, effects: [{ id: "minecraft:invisibility", amplifier: 0 }] },
    ],
    "#milf:endermen": [
        { stage: "mob_gear_iron", chance: 0.15, effects: [{ id: "minecraft:strength", amplifier: 0 }] },
        { stage: "mob_gear_diamond", chance: 0.15, effects: [{ id: "minecraft:speed", amplifier: 1 }] },
        { stage: "mob_gear_netherite", chance: 0.15, effects: [{ id: "minecraft:strength", amplifier: 1 }, { id: "minecraft:regeneration", amplifier: 0 }] },
    ],

    "eidolon_repraised:necromancer": [
        { stage: "mob_gear_gold", chance: 0.15, effects: [{ id: "minecraft:speed", amplifier: 0 }] },
        { stage: "mob_gear_iron", chance: 0.15, effects: [{ id: "minecraft:resistance", amplifier: 0 }] },
        { stage: "mob_gear_diamond", chance: 0.15, effects: [{ id: "minecraft:absorption", amplifier: 1 }] },
        { stage: "mob_gear_netherite", chance: 0.15, effects: [{ id: "minecraft:resistance", amplifier: 1 }, { id: "minecraft:fire_resistance", amplifier: 0 }] },
    ],
    "eidolon_repraised:wraith": [
        { stage: "mob_gear_gold", chance: 0.15, effects: [{ id: "minecraft:speed", amplifier: 0 }] },
        { stage: "mob_gear_diamond", chance: 0.12, effects: [{ id: "minecraft:invisibility", amplifier: 0 }] },
        { stage: "mob_gear_netherite", chance: 0.15, effects: [{ id: "minecraft:speed", amplifier: 1 }, { id: "minecraft:strength", amplifier: 1 }] },
    ],

    "darkerdepths:glowshroom_monster": [
        { stage: "mob_gear_gold", chance: 0.15, effects: [{ id: "minecraft:regeneration", amplifier: 0 }] },
        { stage: "mob_gear_iron", chance: 0.15, effects: [{ id: "minecraft:resistance", amplifier: 0 }] },
        { stage: "mob_gear_diamond", chance: 0.15, effects: [{ id: "minecraft:strength", amplifier: 0 }] },
        { stage: "mob_gear_netherite", chance: 0.15, effects: [{ id: "minecraft:regeneration", amplifier: 1 }, { id: "minecraft:resistance", amplifier: 1 }] },
    ],
    "darkerdepths:body_snatcher": [
        { stage: "mob_gear_gold", chance: 0.15, effects: [{ id: "minecraft:speed", amplifier: 0 }] },
        { stage: "mob_gear_iron", chance: 0.15, effects: [{ id: "minecraft:strength", amplifier: 0 }] },
        { stage: "mob_gear_diamond", chance: 0.12, effects: [{ id: "minecraft:invisibility", amplifier: 0 }] },
        { stage: "mob_gear_netherite", chance: 0.15, effects: [{ id: "minecraft:speed", amplifier: 1 }, { id: "minecraft:strength", amplifier: 1 }] },
    ],
    "darkerdepths:void_soul_knight": [
        { stage: "mob_gear_iron", chance: 0.15, effects: [{ id: "minecraft:resistance", amplifier: 0 }] },
        { stage: "mob_gear_diamond", chance: 0.15, effects: [{ id: "minecraft:strength", amplifier: 0 }, { id: "minecraft:fire_resistance", amplifier: 0 }] },
        { stage: "mob_gear_netherite", chance: 0.15, effects: [{ id: "minecraft:resistance", amplifier: 1 }, { id: "minecraft:strength", amplifier: 1 }] },
    ],
    "darkerdepths:scorcher": [
        { stage: "mob_gear_iron", chance: 0.15, effects: [{ id: "minecraft:resistance", amplifier: 0 }] },
        { stage: "mob_gear_diamond", chance: 0.15, effects: [{ id: "minecraft:regeneration", amplifier: 0 }] },
        { stage: "mob_gear_netherite", chance: 0.15, effects: [{ id: "minecraft:resistance", amplifier: 1 }, { id: "minecraft:fire_resistance", amplifier: 0 }] },
    ],

    "cataclysm:koboleton": MOB_GEAR_SPECIAL_PRESETS.brute,
    "cataclysm:deepling_brute": MOB_GEAR_SPECIAL_PRESETS.brute,
    "enderzoology:fallen_mount": MOB_GEAR_SPECIAL_PRESETS.brute,
    "monsterplus:ancient_hero": MOB_GEAR_SPECIAL_PRESETS.brute,
    "mythsandlegends:cogling": MOB_GEAR_SPECIAL_PRESETS.brute,
    "mythsandlegends:draugr": MOB_GEAR_SPECIAL_PRESETS.brute,
    "mythsandlegends:gargoyle": MOB_GEAR_SPECIAL_PRESETS.brute,
    "mythsandlegends:karakondjul": MOB_GEAR_SPECIAL_PRESETS.brute,
    "mythsandlegends:possessed_armor": MOB_GEAR_SPECIAL_PRESETS.brute,
    "mythsandlegends:possessed_armor_archer": MOB_GEAR_SPECIAL_PRESETS.brute,
    "mythsandlegends:possessed_armor_lancer": MOB_GEAR_SPECIAL_PRESETS.brute,
    "royalvariations:royal_zombie": MOB_GEAR_SPECIAL_PRESETS.brute,
    "cataclysm:deepling": MOB_GEAR_SPECIAL_PRESETS.agile,
    "cataclysm:deepling_angler": MOB_GEAR_SPECIAL_PRESETS.agile,
    "cataclysm:lionfish": MOB_GEAR_SPECIAL_PRESETS.agile,
    "enderzoology:concussion_creeper": MOB_GEAR_SPECIAL_PRESETS.agile,
    "enderzoology:dire_wolf": MOB_GEAR_SPECIAL_PRESETS.agile,
    "enderzoology:enderminy": MOB_GEAR_SPECIAL_PRESETS.agile,
    "enderzoology:wither_cat": MOB_GEAR_SPECIAL_PRESETS.agile,
    "mowziesmobs:umvuthana": MOB_GEAR_SPECIAL_PRESETS.agile,
    "mowziesmobs:umvuthana_raptor": MOB_GEAR_SPECIAL_PRESETS.agile,
    "mythsandlegends:amarok": MOB_GEAR_SPECIAL_PRESETS.agile,
    "mythsandlegends:imp": MOB_GEAR_SPECIAL_PRESETS.agile,
    "mythsandlegends:imp_clone": MOB_GEAR_SPECIAL_PRESETS.agile,
    "mythsandlegends:jiangshi": MOB_GEAR_SPECIAL_PRESETS.agile,
    "rottencreatures:glacial_hunter": MOB_GEAR_SPECIAL_PRESETS.agile,
    "rottencreatures:hunter_wolf": MOB_GEAR_SPECIAL_PRESETS.agile,
    "rottencreatures:scarab": MOB_GEAR_SPECIAL_PRESETS.agile,
    "royalvariations:royal_creeper": MOB_GEAR_SPECIAL_PRESETS.agile,
    "royalvariations:royal_enderman": MOB_GEAR_SPECIAL_PRESETS.agile,
    "enderzoology:wither_witch": MOB_GEAR_SPECIAL_PRESETS.caster,
    "legendary_monsters:bomber": MOB_GEAR_SPECIAL_PRESETS.caster,
    "monsterplus:abyssologer": MOB_GEAR_SPECIAL_PRESETS.caster,
    "monsterplus:desert_acolyte": MOB_GEAR_SPECIAL_PRESETS.caster,
    "monsterplus:desert_sorceress": MOB_GEAR_SPECIAL_PRESETS.caster,
    "mythsandlegends:alp": MOB_GEAR_SPECIAL_PRESETS.caster,
    "mythsandlegends:eidolon": MOB_GEAR_SPECIAL_PRESETS.caster,
    "mythsandlegends:lampad": MOB_GEAR_SPECIAL_PRESETS.caster,
    "mythsandlegends:omecuaime": MOB_GEAR_SPECIAL_PRESETS.caster,
    "rottencreatures:dead_beard": MOB_GEAR_SPECIAL_PRESETS.caster,
    "royalvariations:royal_skeleton": MOB_GEAR_SPECIAL_PRESETS.caster,
    "monsterplus:ancient_hero_skull": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "monsterplus:demon_eye": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "monsterplus:ender_eye": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "monsterplus:opalescent_eye": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "monsterplus:spectral_skull": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "monsterplus:wisp": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "monsterplus:soul": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "mowziesmobs:naga": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "monsterplus:lava_squid": MOB_GEAR_SPECIAL_PRESETS.fiery,
    "monsterplus:mother_lava_squid": MOB_GEAR_SPECIAL_PRESETS.fiery,
    "mythsandlegends:abaddon": MOB_GEAR_SPECIAL_PRESETS.fiery,
    "mythsandlegends:scorched_sentinel": MOB_GEAR_SPECIAL_PRESETS.fiery,

    "grimoireofgaia:bone_knight": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:cobble_golem": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:cobblestone_golem": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:cyclops": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:dullahan": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:gelatinous_slime": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:mimic": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:minotaur": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:mummy": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:oni": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:orc": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:sphinx": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:spriggan": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:valkyrie": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:wither_cow": MOB_GEAR_SPECIAL_PRESETS.brute,
    "grimoireofgaia:ant": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:creep": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:ender_eye": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:goblin": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:goblin_feral": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:gravemite": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:kobold": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:mandragora": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:matango": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:mermaid": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:naga": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:satyress": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:sharko": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:sporeling": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:toad": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:werecat": MOB_GEAR_SPECIAL_PRESETS.agile,
    "grimoireofgaia:ant_salvager": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:anubis": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:arachne": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:banshee": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:behender": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:cecaelia": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:centaur": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:dryad": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:dwarf": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:ender_dragon_girl": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:flesh_lich": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:hunter": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:minotaurus": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:nine_tails": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:shaman": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:siren": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:sludge_girl": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:succubus": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:witch": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:yuki_onna": MOB_GEAR_SPECIAL_PRESETS.caster,
    "grimoireofgaia:bee": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "grimoireofgaia:gryphon": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "grimoireofgaia:harpy": MOB_GEAR_SPECIAL_PRESETS.flyer,
    "grimoireofgaia:wizard_harpy": MOB_GEAR_SPECIAL_PRESETS.flyer,
}

const mobGearEntityTagIds = (tag) => {
    if (MOB_GEAR_ENTITY_TAG_CACHE[tag] !== undefined) return MOB_GEAR_ENTITY_TAG_CACHE[tag]
    let ids = []
    let key = $MobGearTagKey.create($Registries.ENTITY_TYPE, $ResourceLocation.parse(tag.substring(1)))
    $BuiltInRegistries.ENTITY_TYPE.getTag(key).ifPresent(set => set.forEach(holder => ids.push(String(holder.unwrapKey().get().location()))))
    MOB_GEAR_ENTITY_TAG_CACHE[tag] = ids
    return ids
}

const mobGearLookup = (map, cache, entity) => {
    let id = String(entity.getEncodeId())
    if (cache[id] !== undefined) return cache[id]
    let tag = map[id] ? null : Object.keys(map).find(key => key.charAt(0) == "#" && mobGearEntityTagIds(key).indexOf(id) != -1)
    cache[id] = map[id] || (tag ? map[tag] : null)
    return cache[id]
}

const mobGearTagItems = (tag) => {
    if (MOB_GEAR_TAG_CACHE[tag] !== undefined) return MOB_GEAR_TAG_CACHE[tag]
    let ids = []
    Ingredient.of(tag).getItemIds().forEach(id => ids.push(String(id)))
    MOB_GEAR_TAG_CACHE[tag] = ids
    return ids
}

const mobGearExpand = (list) => (list || []).reduce((acc, entry) => acc.concat(entry.charAt(0) == "#" ? mobGearTagItems(entry) : [entry]), [])

const mobGearPick = (list) => list[Math.floor(Math.random() * list.length)]

const mobGearRandomInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1))

const mobGearHasStage = (player, stage) => AStages.serverHasStage(stage) || (player != null && AStages.playerHasStage(player, stage))

const mobGearUnlockedTiers = (level, entity) => {
    let player = $MobGearPlayerUtils["getNearestPlayer(net.minecraft.world.level.Level,net.minecraft.core.BlockPos)"](level, entity.blockPosition())
    return MOB_GEAR_TIERS.filter(tier => mobGearHasStage(player, tier.stage))
}

const mobGearRollTier = (tiers, chanceKey) => {
    let descending = tiers.slice().reverse()
    return descending.find(tier => Math.random() < tier[chanceKey])
}

const mobGearMaybeEnchant = (level, entity, stack, enchant) => {
    if (!enchant || Math.random() >= enchant.chance) return stack
    let enchantLevel = mobGearRandomInt(enchant.minLevel, enchant.maxLevel)
    return $MobGearEnchantmentHelper.enchantItem(entity.getRandom(), stack, enchantLevel, level.registryAccess(), $MobGearOptional.empty())
}

const mobGearNoDrop = (itemId) => MOB_GEAR_NO_DROP.some(entry => entry == itemId || (entry.charAt(0) == "@" && itemId.indexOf(entry.substring(1) + ":") == 0) || (entry.charAt(0) == "#" && mobGearTagItems(entry).indexOf(itemId) != -1))

const mobGearEquip = (level, entity, slot, itemId, tier, enchant) => {
    let stack = Item.of(itemId)
    if (stack.isEmpty()) return
    entity.setItemSlot(slot, mobGearMaybeEnchant(level, entity, stack, enchant))
    entity.setDropChance(slot, mobGearNoDrop(itemId) ? 0 : tier.dropChance)
}

const mobGearApplyEffects = (entity, effects) => {
    if (!effects || Math.random() >= effects.chance) return
    let count = mobGearRandomInt(1, effects.maxCount)
    let pool = effects.pool.slice()
    let picked = []
    while (picked.length < count && pool.length > 0) picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
    picked.forEach(effect => entity.potionEffects.add(effect.id, -1, mobGearRandomInt(0, effect.maxAmplifier), false, true))
}

const mobGearSlotOf = (entity, itemId) => {
    if (MOB_GEAR_SLOT_CACHE[itemId] !== undefined) return MOB_GEAR_SLOT_CACHE[itemId]
    let stack = Item.of(itemId)
    MOB_GEAR_SLOT_CACHE[itemId] = stack.isEmpty() ? "" : String(entity.getEquipmentSlotForItem(stack).name())
    return MOB_GEAR_SLOT_CACHE[itemId]
}

const mobGearRollArmorTier = (entity, tiers, slotName) => {
    let candidates = tiers.filter(tier => mobGearExpand(tier.armor).some(id => mobGearSlotOf(entity, id) == slotName))
    return mobGearRollTier(candidates, "armorChance")
}

const mobGearEquipArmorSlot = (level, entity, tiers, slot, enchant) => {
    let slotName = String(slot.name())
    let tier = mobGearRollArmorTier(entity, tiers, slotName)
    if (!tier) return
    let pool = mobGearExpand(tier.armor).filter(id => mobGearSlotOf(entity, id) == slotName)
    mobGearEquip(level, entity, slot, mobGearPick(pool), tier, enchant)
}

const mobGearEquipFromPool = (level, entity, tiers, poolKey, enchant) => {
    let candidates = tiers.filter(tier => mobGearExpand(tier[poolKey]).length > 0)
    let tier = mobGearRollTier(candidates, "weaponChance")
    if (!tier) return false
    mobGearEquip(level, entity, $MobGearEquipmentSlot.MAINHAND, mobGearPick(mobGearExpand(tier[poolKey])), tier, enchant)
    return true
}

const mobGearEquipWeapon = (level, entity, tiers, config, enchant) => {
    let mainHand = entity.getItemBySlot($MobGearEquipmentSlot.MAINHAND)
    let keep = (config.keepMainHand || []).some(id => String(mainHand.id) == id)
    if (!keep) mobGearEquipFromPool(level, entity, tiers, "weapons", enchant)
}

const mobGearEnchantHeld = (level, entity, enchant) => {
    let mainHand = entity.getItemBySlot($MobGearEquipmentSlot.MAINHAND)
    if (!enchant || mainHand.isEmpty() || mainHand.isEnchanted()) return
    entity.setItemSlot($MobGearEquipmentSlot.MAINHAND, mobGearMaybeEnchant(level, entity, mainHand, enchant))
}

const mobGearAddModifier = (entity, buff) => {
    let holder = $BuiltInRegistries.ATTRIBUTE["getHolder(net.minecraft.resources.ResourceLocation)"]($ResourceLocation.parse(buff.id)).orElse(null)
    let instance = holder == null ? null : entity.getAttribute(holder)
    if (instance == null) return
    let amount = buff.min + Math.random() * (buff.max - buff.min)
    instance["removeModifier(net.minecraft.resources.ResourceLocation)"]($ResourceLocation.parse(MOB_GEAR_BUFF_ID))
    instance.addPermanentModifier(new $MobGearAttributeModifier($ResourceLocation.parse(MOB_GEAR_BUFF_ID), amount, $MobGearOperation[buff.op]))
}

const mobGearApplyBuffs = (entity, buffs) => {
    if (!buffs || Math.random() >= buffs.chance) return
    let count = mobGearRandomInt(1, buffs.maxCount)
    let pool = buffs.pool.slice()
    let picked = []
    while (picked.length < count && pool.length > 0) picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
    picked.forEach(buff => mobGearAddModifier(entity, buff))
    entity.setHealth(entity.getMaxHealth())
}

const mobGearApplySpecial = (entity, special) => {
    if (Math.random() >= special.chance) return
    if (special.nbt) entity.mergeNbt(special.nbt)
    if (special.effects) special.effects.forEach(effect => entity.potionEffects.add(effect.id, -1, effect.amplifier, false, true))
}

const mobGearApplySpecials = (level, entity) => {
    let specials = mobGearLookup(MOB_GEAR_SPECIALS, MOB_GEAR_LOOKUP_CACHE.specials, entity)
    if (!specials) return
    let player = $MobGearPlayerUtils["getNearestPlayer(net.minecraft.world.level.Level,net.minecraft.core.BlockPos)"](level, entity.blockPosition())
    specials.filter(special => mobGearHasStage(player, special.stage)).forEach(special => mobGearApplySpecial(entity, special))
}

const mobGearApply = (level, entity, config) => {
    let tiers = mobGearUnlockedTiers(level, entity)
    if (tiers.length == 0) return

    let enchant = tiers.map(tier => tier.enchant).filter(e => e).pop()
    let effects = tiers.map(tier => tier.effects).filter(e => e).pop()

    mobGearApplyEffects(entity, effects)

    if (!config.armor && !config.weapon) {
        mobGearApplySpecials(level, entity)
        mobGearApplyBuffs(entity, tiers.map(tier => tier.buffs).filter(b => b).pop())
    }

    if (Math.random() >= MOB_GEAR_CHANCE) return

    if (config.armor) MOB_GEAR_ARMOR_SLOTS.forEach(slot => mobGearEquipArmorSlot(level, entity, tiers, slot, enchant))
    if (config.weapon) mobGearEquipWeapon(level, entity, tiers, config, enchant)
    else if (!(config.ranged && mobGearEquipFromPool(level, entity, tiers, "bows", enchant))) mobGearEnchantHeld(level, entity, enchant)
}

NativeEvents.onEvent($FinalizeSpawnEvent, event => {
    if (event.getLevel().isClientSide()) return
    if (event.getSpawnType().name() == "CONVERSION") return
    let entity = event.getEntity()
    if (!mobGearLookup(MOB_GEAR_MOBS, MOB_GEAR_LOOKUP_CACHE.mobs, entity)) return
    entity.persistentData.putBoolean(MOB_GEAR_PENDING_KEY, true)
})

NativeEvents.onEvent($EntityJoinLevelEvent, event => {
    let level = event.getLevel()
    if (level.isClientSide()) return
    let entity = event.getEntity()
    let config = mobGearLookup(MOB_GEAR_MOBS, MOB_GEAR_LOOKUP_CACHE.mobs, entity)
    if (!config) return
    if (!entity.persistentData.getBoolean(MOB_GEAR_PENDING_KEY)) return
    entity.persistentData.remove(MOB_GEAR_PENDING_KEY)
    mobGearApply(level, entity, config)
})

ServerEvents.tags("entity_type", event => {
    event.add("milf:creepers", ["minecraft:creeper", "#c:creepers"])
    event.add("milf:endermen", ["minecraft:enderman", /^endermanoverhaul:.+_enderman$/])
    event.remove("milf:endermen", /^endermanoverhaul:.*pet_enderman$/)
})
