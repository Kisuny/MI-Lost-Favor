// ItemEvents.foodEaten("milf:recall_concoction", event => {
//     if (event.player.level.clientSide) return
//     let player = event.player

//     let retX, retY, retZ, retDimensionID, spawnPos

//     let yRot = player.yRot, xRot = player.xRot

//     if (player.persistentData.contains("milf_recall_concoction_return_data")) {
//         let retData = player.persistentData.get("milf_recall_concoction_return_data")

//         retX = retData.getDouble("x")
//         retY = retData.getDouble("y")
//         retZ = retData.getDouble("z")

//         // xRot = retData.getFloat("xRot")
//         // yRot = retData.getFloat("yRot")

//         retDimensionID = retData.getString("dimension")
//     } else if (player.getRespawnPosition()) {
//         spawnPos = player.getRespawnPosition()

//         retX = spawnPos.getX()
//         retY = spawnPos.getY()
//         retZ = spawnPos.getZ()

//         retDimensionID = player.getRespawnDimension().location().toString()
//     } else {
//         spawnPos = player.level.getSharedSpawnPos()

//         retX = spawnPos.getX()
//         retY = spawnPos.getY()
//         retZ = spawnPos.getZ()

//         retDimensionID = "minecraft:overworld"
//     }
//     let returnDimKey = $ResourceKey.create($Registries.DIMENSION, $ResourceLocation.parse(retDimensionID))
//     let returnDim = player.getServer()["getLevel(net.minecraft.resources.ResourceKey)"](returnDimKey)

//     event.player.cooldowns.addCooldown(event.getItem(), 40)

//     player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](returnDim, retX, retY, retZ, yRot, xRot)

//     player.sendData("milf_recall_concoction_playsound")
// })




ServerEvents.tags('block', event => {

    let MILF_RECALL_CONCOCTION_BLOCKS = [
        "minecraft:campfire",
        "minecraft:soul_campfire",
        "dungeonsdelight:living_campfire",
        "minecraft:yellow_bed",
        "minecraft:lime_bed",
        "ytech:grass_bed",
        "spectrum:resplendent_bed",
        "minecraft:orange_bed",
        "arts_and_crafts:bleached_bed",
        "minecraft:gray_bed",
        "minecraft:green_bed",
        "minecraft:light_blue_bed",
        "minecraft:cyan_bed",
        "minecraft:pink_bed",
        "minecraft:purple_bed",
        "minecraft:red_bed",
        "minecraft:brown_bed",
        "minecraft:light_gray_bed",
        "minecraft:blue_bed",
        "minecraft:black_bed",
        "minecraft:magenta_bed",
        "minecraft:white_bed"
    ]    

    event.add('milf:recall_concoction_block', MILF_RECALL_CONCOCTION_BLOCKS)
})


BlockEvents.rightClicked(event => {
    if (event.getHand() == "OFF_HAND") return
    if (event.player.mainHandItem.id != "milf:recall_concoction") return
    let item = event.getItem()
    if (event.player.cooldowns.isOnCooldown(item)) return

    if (!event.block.hasTag("milf:recall_concoction_block")) return

    let {player, level} = event
    let playerPos = player.position()
    let { x, y, z } = playerPos

    let data = new $CompoundTag()

    data.putDouble("x", x)
    data.putDouble("y", y)
    data.putDouble("z", z)

    // data.putFloat("xRot", player.xRot)
    // data.putFloat("yRot", player.yRot)

    data.putString("dimension", level.dimension.toString())

    player.persistentData.put("milf_recall_concoction_return_data", data)

    sendImmersiveMessage(Text.translatable("milf.recall_concoction.new_pos"), player, Object.assign({}, DEFAULT_CHUNK_CLAIM_NOTIFICATION_STYLE, { duration: 2.5 }) , event.server)

    event.cancel(true)
})

