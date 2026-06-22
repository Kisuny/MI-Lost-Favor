const mobRestriction = (modId, mobArray) => {
    mobArray.forEach(mob => {
        AStages.addRestrictionForMob(`${modId}/${mob.id}`, `${modId}_mobs`, mob.mob)
            .disableSpawning()
            .restrictSpawnType("natural", "mob_summoned", "event", "chunk_generation", "jockey")
    });
};