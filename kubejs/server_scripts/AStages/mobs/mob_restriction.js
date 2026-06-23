const mobRestriction = (modId, mobArray) => {
    mobArray.forEach(mob => {
        AStages.addRestrictionForMob(`${modId}/${mob.id}`, `${modId}_mobs`, mob.mob)
            .set(Attributes.MOB_SPAWNING, true)
            .restrictSpawnType("natural", "chunk_generation", "breeding", "mob_summoned", "jockey", "event", "conversion", "reinforcement", "triggered", "command", "spawn_egg", "dispenser", "patrol", "bucket")
    });
};