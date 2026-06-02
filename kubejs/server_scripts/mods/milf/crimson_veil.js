const $BlockPos = Java.loadClass("net.minecraft.core.BlockPos")
const $HeightmapTypes = Java.loadClass("net.minecraft.world.level.levelgen.Heightmap$Types")
const $BedBlock = Java.loadClass("net.minecraft.world.level.block.BedBlock")

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.player.PlayerWakeUpEvent", event => {
    const player = event.getEntity()
    if (!player) return
    if (!(player.getServer())) return

    const dayTime = player.level.getDayTime() % 24000
    if (dayTime >= 12000) return

    const playerName = player.getName().getString()
    // console.log(`${playerName} woke up`)

    const data = player.getPersistentData()
    const hasDrank = data.getBoolean("crimson_veil_potion_drinked")
    // console.log(`crimson_veil_potion_drinked = ${hasDrank}`)
    if (!hasDrank) return

    const server = player.getServer()
    const dimKey = $ResourceKey.create($Registries.DIMENSION, $ResourceLocation.parse("milf:crimson_veil"))
    const targetLevel = server["getLevel(net.minecraft.resources.ResourceKey)"](dimKey)
    // console.log(`targetLevel = ${targetLevel}`)
    if (!targetLevel) return

    const pos = player.blockPosition()
    const x = pos.getX()
    const z = pos.getZ()

    const returnData = new $CompoundTag()
    returnData.putDouble("x", x + 0.5)
    returnData.putDouble("y", pos.getY())
    returnData.putDouble("z", z + 0.5)
    returnData.putString("dimension", player.level.dimension.toString())
    player.getPersistentData().put("crimson_veil_return_pos", returnData)

    targetLevel.getChunk(x >> 4, z >> 4)

    const surfacePos = targetLevel.getHeightmapPos($HeightmapTypes.WORLD_SURFACE, new $BlockPos(x, 0, z))
    const safeY = surfacePos.getY()
    // console.log(`teleporting ${playerName} to ${x} ${safeY} ${z} in milf:crimson_veil`)

    // schedule because the bed is "occupied" after teleportation. 
    // I haven't found an easier way to fix that
    server.scheduleInTicks(20, _ => {
        player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](targetLevel, x + 0.5, safeY, z + 0.5, player.yRot, player.xRot)
        player.getPersistentData().remove("crimson_veil_potion_drinked")
    })
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
})

