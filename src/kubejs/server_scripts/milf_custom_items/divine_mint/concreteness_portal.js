BlockEvents.rightClicked('milf:concreteness_portal', (event) => {

    let level = event.getLevel()
    if (level.isClientSide()) return

    let player = event.getPlayer()
    let blockPos = event.block.pos

    let { x, y, z } = blockPos

    let retData = player.persistentData.get("milf_abstraction_portal_return_data")

    let retX = retData.getDouble("x")
    let retY = retData.getDouble("y")
    let retZ = retData.getDouble("z")

    let retDimensionName = retData.getString("dimension")

    let returnDimKey = $ResourceKey.create($Registries.DIMENSION, $ResourceLocation.parse(retDimensionName))
    let returnDim = player.getServer()["getLevel(net.minecraft.resources.ResourceKey)"](returnDimKey)

    player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](returnDim, retX, retY, retZ, 0, 0)
    milfPlaySound(event, "milf:static", { pos: new BlockPos(retX | 0, retY | 0 + 1, retZ | 0) })
})