BlockEvents.rightClicked('milf:abstraction_portal', (event) => {

    let level = event.getLevel()
    if (level.isClientSide()) return

    if (level.dimension != "milf:abstraction"){
        let player = event.getPlayer()
        let blockPos = event.block.pos

        let tpPos = blockPos.center

        let { x, y, z } = blockPos

        let data = new $CompoundTag()

        data.putDouble("x", x)
        data.putDouble("y", y + 1)
        data.putDouble("z", z)

        data.putString("dimension", level.dimension.toString())

        player.persistentData.put("milf_abstraction_portal_return_data", data)

        let abstractionDimKey = $ResourceKey.create($Registries.DIMENSION, $ResourceLocation.fromNamespaceAndPath("milf", "abstraction"))
        let abstractionDim = player.getServer()["getLevel(net.minecraft.resources.ResourceKey)"](abstractionDimKey)

        player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](abstractionDim, tpPos.x(), 15, tpPos.z(), 0, 0)

        abstractionDim.setBlock(new BlockPos(x, 14, z), Block.getBlock("spectrum:invisible_wall").defaultBlockState(), 3)
        abstractionDim.setBlock(new BlockPos(x, 13, z), Block.getBlock("milf:concreteness_portal").defaultBlockState(), 3)
        milfPlaySound(event, "milf:static", { pos: new BlockPos(x, 15, z) })
    }

})