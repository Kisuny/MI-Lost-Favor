let $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
let $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
let $MobSpawnType = Java.loadClass("net.minecraft.world.entity.MobSpawnType")

NetworkEvents.dataReceived('milf_boss_bait', (event) => {

   let level = event.getLevel()
   if(level.isClientSide()) return

   let player = event.getPlayer()
   let playerBlockPos = player.blockPosition()

   let { x, y, z } = playerBlockPos   

   if (level.dimension != "milf:abstraction") {
      let data = new $CompoundTag()

      data.putDouble("x", x)
      data.putDouble("y", y)
      data.putDouble("z", z)

      data.putString("dimension", level.dimension.toString())

      player.persistentData.put("milf_abstraction_return_data", data)

      console.log(data);
      
   } else {

      let retData = player.persistentData.get("milf_abstraction_return_data")

      let retX = retData.getDouble("x")
      let retY = retData.getDouble("y")
      let retZ = retData.getDouble("z")      

      let retDimensionName = retData.getString("dimension")

      let returnDimKey = $ResourceKey.create($Registries.DIMENSION, $ResourceLocation.parse(retDimensionName))
      let returnDim = player.getServer()["getLevel(net.minecraft.resources.ResourceKey)"](returnDimKey)

      player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](returnDim, retX, retY, retZ, 0, 0)
      return
   }



   let abstractionDimKey = $ResourceKey.create($Registries.DIMENSION, $ResourceLocation.fromNamespaceAndPath("milf", "abstraction"))
   let abstractionDim = player.getServer()["getLevel(net.minecraft.resources.ResourceKey)"](abstractionDimKey)

   player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](abstractionDim, x, 5, z, 0, 0)


   // let bossId = event.data.getString("id")
   // let entityType = $BuiltInRegistries.ENTITY_TYPE.get(new $ResourceLocation.parse(bossId))

   // entityType.spawn(level, blockPos, $MobSpawnType.COMMAND)
   // let entity = entityType.create(level)

   // entity.moveTo(pos.x, pos.y, pos.z, level.random.nextFloat(), 0)
   // level.addFreshEntity(entity)

})