LootJS.modifiers(event => {

    // CreeperOverhaul creepers drop creeper_heart when killed with arthana (same as vanilla creeper)
    const creeperOverhaulCreepers = [
        "creeperoverhaul:badlands_creeper",
        "creeperoverhaul:bamboo_creeper",
        "creeperoverhaul:beach_creeper",
        "creeperoverhaul:birch_creeper",
        "creeperoverhaul:cave_creeper",
        "creeperoverhaul:dark_oak_creeper",
        "creeperoverhaul:desert_creeper",
        "creeperoverhaul:dripstone_creeper",
        "creeperoverhaul:hills_creeper",
        "creeperoverhaul:jungle_creeper",
        "creeperoverhaul:mushroom_creeper",
        "creeperoverhaul:ocean_creeper",
        "creeperoverhaul:savannah_creeper",
        "creeperoverhaul:snowy_creeper",
        "creeperoverhaul:spruce_creeper",
        "creeperoverhaul:swamp_creeper",
    ]

    creeperOverhaulCreepers.forEach(creeper => {
        event.addEntityModifier(creeper).pool(pool => {
            pool.when(c => c.matchMainHand("enchanted:arthana").randomChanceWithEnchantment("minecraft:looting", [0.2, 0.4, 0.6, 0.8, 1.0, 1.0, 1.0, 1.0, 1.0]))
            pool.addEntry(LootEntry.of("enchanted:creeper_heart"))
        })
    })

    const blaze_core_bosses = [
        "mythsandlegends:black_charro",
        "mowziesmobs:umvuthi",
        "mowziesmobs:frostmaw",
        "mowziesmobs:ferrous_wroughtnaut",
        "cataclysm:amethyst_crab",
    ]

    const electronic_ender_core_bosses = [
        "fdbosses:geburah",
        "fdbosses:chesed",
        "fdbosses:malkuth",
    ]
    blaze_core_bosses.forEach(boss => {
        event.addEntityModifier(boss).addLoot("milf:blaze_core").matchMainHand("#c:tools/wrench").randomChance(0.5)
    });

    electronic_ender_core_bosses.forEach(boss => {
        event.addEntityModifier(boss).addLoot("milf:electronic_ender_core").matchMainHand("#c:tools/wrench").randomChance(0.5)
    });

    event.addEntityModifier("hexerei:crow").addLoot("eidolon_repraised:raven_feather").applyEnchantmentBonus("minecraft:looting", [0, 1])

    //Add items only if player is cursed from enigmatic legacy
    event.addEntityModifier([
        "minecraft:cat", 
        "minecraft:axolotl", 
        "cnb:lilytad", 
        "cnb:little_grebe", 
        "cnb:minipad", 
        "cnb:sporeling", 
        "crittersandcompanions:otter",
        "crittersandcompanions:dumbo_octopus",
        "crittersandcompanions:ferret",
        "crittersandcompanions:ladybug",
        "crittersandcompanions:red_panda",
        "crittersandcompanions:shima_enaga"
    ]).pool(pool => {
        pool.when(c => c.killedByPlayer().matchPlayerCustom(player => {
            const cursed = $EnigmaticHandler.isTheCursedOne(player)
            // console.log(`isCursed = ${cursed}`)
            return cursed
        }))
        pool.addEntry(LootEntry.of("milf:soul_of_the_helpless").applyEnchantmentBonus("minecraft:looting", [0, 1]))
    })

})
