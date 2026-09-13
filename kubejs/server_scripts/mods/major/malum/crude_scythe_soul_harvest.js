const UNDEAD_ENTITY_TYPES = [
    "minecraft:drowned",
    "minecraft:husk",
    "minecraft:phantom",
    "minecraft:skeleton",
    "minecraft:skeleton_horse",
    "minecraft:stray",
    "minecraft:bogged",
    "minecraft:wither",
    "minecraft:wither_skeleton",
    "minecraft:zoglin",
    "minecraft:zombie",
    "minecraft:zombie_horse",
    "minecraft:zombie_villager",
    "minecraft:zombified_piglin",
    "eidolon_repraised:wraith",
    "eidolon_repraised:zombie_brute",
    "eidolon_repraised:giant_skeleton",
    "eidolon_repraised:necromancer",
]

const SOUL_HARVEST_WEAPONS = [
    "malum:crude_scythe",
    "animusnv:runic_sentient_scythe",
    "animusnv:hand_of_death",
    "neovitae:sentient_scythe",
]

NativeEvents.onEvent($LivingDropsEvent, event => {
    let killed = event.getEntity()
    if (!UNDEAD_ENTITY_TYPES.includes(killed.getType().toString())) return

    let killer = killed.getLastHurtByMob()
    if (!killer || !(killer instanceof $LivingEntity)) return

    let weapon = killer.getMainHandItem()
    if (!SOUL_HARVEST_WEAPONS.includes(weapon.getId())) return

    let count = 2 + Math.floor(Math.random() * 2)
    killed.spawnAtLocation(Item.of("eidolon_repraised:soul_shard", count))
})
