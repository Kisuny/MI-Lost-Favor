NetworkEvents.dataReceived('milf_ms_s_second_order_tp', (event) => {

    let {data, player, level} = event

    let item = player.getMainHandItem()

    if (item.id != "milf:ms_s_second_order") return
    if(player.cooldowns.isOnCooldown(item)) return

    let posData = data.get("pos")

    let x = posData.getDouble("x")
    let y = posData.getDouble("y")
    let z = posData.getDouble("z")

    if (player.isUsingItem()) player.releaseUsingItem()




    player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](level, x, y, z, player.getYaw(), player.getPitch())
    player.cooldowns.addCooldown(item, 30)

    player.sendData("milf_ms_s_second_order_tp_end")

})