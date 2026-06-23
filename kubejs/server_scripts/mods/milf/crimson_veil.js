const $BlockPos = Java.loadClass("net.minecraft.core.BlockPos")
const $HeightmapTypes = Java.loadClass("net.minecraft.world.level.levelgen.Heightmap$Types")
const $BedBlock = Java.loadClass("net.minecraft.world.level.block.BedBlock")

ServerEvents.tick(event => {
    for (let player of event.server.getPlayerList().getPlayers()) {
        let persistentData = player.getPersistentData()

        if (!player.isSleeping()) {
            persistentData.remove("crimson_veil_sleep_ticks")
            continue
        }

        if (!persistentData.getBoolean("crimson_veil_potion_drinked")) continue

        let sleepTicks = persistentData.getInt("crimson_veil_sleep_ticks") + 1
        persistentData.putInt("crimson_veil_sleep_ticks", sleepTicks)
        if (sleepTicks < 100) continue

        persistentData.remove("crimson_veil_sleep_ticks")

        let playerName = player.getName().getString()
        // console.log(`${playerName} slept long enough`)

        player.stopSleepInBed(true, true)

        let server = player.getServer()
        let dimKey = $ResourceKey.create($Registries.DIMENSION, $ResourceLocation.parse("milf:crimson_veil"))
        let targetLevel = server["getLevel(net.minecraft.resources.ResourceKey)"](dimKey)
        // console.log(`targetLevel = ${targetLevel}`)
        if (!targetLevel) continue

        let pos = player.blockPosition()
        let x = pos.getX()
        let z = pos.getZ()

        let returnData = new $CompoundTag()
        returnData.putDouble("x", x + 0.5)
        returnData.putDouble("y", pos.getY())
        returnData.putDouble("z", z + 0.5)
        returnData.putString("dimension", player.level.dimension.toString())
        player.getPersistentData().put("crimson_veil_return_pos", returnData)

        targetLevel.getChunk(x >> 4, z >> 4)

        let surfacePos = targetLevel.getHeightmapPos($HeightmapTypes.WORLD_SURFACE, new $BlockPos(x, 0, z))
        let safeY = surfacePos.getY()
        // console.log(`teleporting ${playerName} to ${x} ${safeY} ${z} in milf:crimson_veil`)

        // schedule because the bed is "occupied" right after stopSleepInBed/teleportation.
        // I haven't found an easier way to fix that
        server.scheduleInTicks(20, _ => {
            player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](targetLevel, x + 0.5, safeY, z + 0.5, player.yRot, player.xRot)
            player.getPersistentData().remove("crimson_veil_potion_drinked")
            player.potionEffects.add("minecraft:blindness", 200)
            player.potionEffects.add("minecraft:darkness", 200)
            sendImmersiveMessage(
                Text.translatable("milf.crimson_veil.enter"),
                player,
                Object.assign({"vibrate":true,"vibrateAmp":0.2,"vibrateFreq":20}, DEFAULT_MILESTONE_NOTIFICATION_STYLE),
                server
            )
            milfPlaySoundForPlayer(player, "minecraft:entity.breeze.idle_ground", { volume: 1.0, pitch: 0.50 })
        })
    }
})

ItemEvents.foodEaten("risus:guilty_apple", event => {
    const player = event.player
    if (player.level.clientSide) return

    const returnData = player.getPersistentData().getCompound("crimson_veil_return_pos")
    if (!returnData || returnData.isEmpty()) return

    const retX = returnData.getDouble("x")
    const retY = returnData.getDouble("y")
    const retZ = returnData.getDouble("z")
    const retDimensionID = returnData.getString("dimension")

    const returnDimKey = $ResourceKey.create($Registries.DIMENSION, $ResourceLocation.parse(retDimensionID))
    const returnDim = player.getServer()["getLevel(net.minecraft.resources.ResourceKey)"](returnDimKey)
    if (!returnDim) return

    player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](returnDim, retX, retY, retZ, player.yRot, player.xRot)
    player.getPersistentData().remove("crimson_veil_return_pos")
    player.potionEffects.add("minecraft:blindness", 400)
    player.potionEffects.add("minecraft:darkness", 400)
})

