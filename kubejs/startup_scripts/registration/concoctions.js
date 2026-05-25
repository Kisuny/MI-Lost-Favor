let $Registries = Java.loadClass("net.minecraft.core.registries.Registries")
let $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
let $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
let $JavaArrayList = Java.loadClass("java.util.ArrayList")

createNewItem('recall_concoction', { 
    stackSize: 17,
    lang: { "en_us": "Recall Concoction", "ru_ru": "Зелье Возвращения" },
    use: {
        animation: "drink", 
        duration: 80, 
        finishUsing(itemstack, level, entity){

            if (level.isClientSide()) return itemstack
            let player = entity

            let retX, retY, retZ, retDimensionID, spawnPos

            let yRot = player.yRot, xRot = player.xRot

            if (player.persistentData.contains("milf_recall_concoction_return_data")) {
                let retData = player.persistentData.get("milf_recall_concoction_return_data")

                retX = retData.getDouble("x")
                retY = retData.getDouble("y")
                retZ = retData.getDouble("z")

                // xRot = retData.getFloat("xRot")
                // yRot = retData.getFloat("yRot")

                retDimensionID = retData.getString("dimension")
            } else if (player.getRespawnPosition()) {
                spawnPos = player.getRespawnPosition()

                retX = spawnPos.getX()
                retY = spawnPos.getY()
                retZ = spawnPos.getZ()

                retDimensionID = player.getRespawnDimension().location().toString()
            } else {
                spawnPos = player.level.getSharedSpawnPos()

                retX = spawnPos.getX()
                retY = spawnPos.getY()
                retZ = spawnPos.getZ()

                retDimensionID = "minecraft:overworld"
            }
            let returnDimKey = $ResourceKey.create($Registries.DIMENSION, $ResourceLocation.parse(retDimensionID))
            let returnDim = player.getServer()["getLevel(net.minecraft.resources.ResourceKey)"](returnDimKey)

            player.cooldowns.addCooldown(itemstack, 40)

            player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](returnDim, retX, retY, retZ, yRot, xRot)

            player.sendData("milf_recall_concoction_playsound")

            itemstack.shrink(1)
            return itemstack
        } 
    }
})

let $DeathInfoManager = Java.loadClass("com.b1n_ry.yigd.data.DeathInfoManager")
let $ResolvableProfile = Java.loadClass("net.minecraft.world.item.component.ResolvableProfile")
let $GraveStatus = Java.loadClass("com.b1n_ry.yigd.data.GraveStatus")

createNewItem('grecall_concoction_t1', {
    stackSize: 1,
    lang: { "en_us": "Grecall Concoction" },
    use: {
        animation: "drink",
        duration: 80,
        finishUsing(itemstack, level, entity) {

            let  player = entity
            if (level.isClientSide()) return itemstack

            let grave = getLastGrave(player, level)
            if (!grave) {
                sendImmersiveMessage(Component.translatable("milf.grecall_concoction.no_grave"), player, NOTIFICATION_MESSAGE_ARGS, player.getServer())
                return itemstack
            }

            if (!isGraveInTheSameDimension(grave, level)) {
                sendImmersiveMessage(Component.translatable("milf.grecall_concoction.wrong_dimension"), player, NOTIFICATION_MESSAGE_ARGS, player.getServer())
                return itemstack
            }

            if (!isGraveInRange(grave, player, 1000)){
                sendImmersiveMessage(Component.translatable("milf.grecall_concoction.grave_too_far"), player, NOTIFICATION_MESSAGE_ARGS, player.getServer())
                return itemstack
            }

            retrieveGrave(grave, player, level)
            player.sendData("milf_grecall_concoction_playsound")
            player.cooldowns.addCooldown(itemstack, 1200)
            itemstack.shrink(1)
            return itemstack
        
        }
    }
})

createNewItem('grecall_concoction_t2', {
    stackSize: 1,
    lang: { "en_us": "The Intercontinental Ballistic Missile Grecall Concoction" },
    use: {
        animation: "drink",
        duration: 80,
        finishUsing(itemstack, level, entity) {

            let player = entity

            if (level.isClientSide()) return itemstack

            let grave = getLastGrave(player, level)
            if (!grave) {
                sendImmersiveMessage(Component.translatable("milf.grecall_concoction.no_grave"), player, NOTIFICATION_MESSAGE_ARGS, player.getServer())
                return itemstack
            }

            retrieveGrave(grave, player, level)

            player.sendData("milf_grecall_concoction_playsound")
            player.cooldowns.addCooldown(itemstack, 1200)
            itemstack.shrink(1)
            return itemstack

        }
    }
})

function getLastGrave(player, level) {
    let profile = new $ResolvableProfile(player.getGameProfile())
    let graves = new $JavaArrayList($DeathInfoManager.INSTANCE.getBackupData(profile))

    graves.removeIf(graveComponent => graveComponent.getStatus() != $GraveStatus.UNCLAIMED)
    if (graves.isEmpty()) {
        return null
    }

    let lastGrave = graves.getLast()

    return lastGrave
}

function isGraveInRange(grave, player, range) {
    let gravePos = grave.getPos()
    let playerPos = player.getOnPos()

    return gravePos.closerThan(playerPos, range)
}

function isGraveInTheSameDimension(grave, level) {
    let graveDim = grave.getWorldRegistryKey()

    return graveDim == level.dimension
}

function retrieveGrave(grave, player, level) {
    grave.applyToPlayer(player, level, player.position(), false)
    grave.setStatus($GraveStatus.CLAIMED)
    grave.removeGraveBlock()
}

const NOTIFICATION_MESSAGE_ARGS = {
    anchor: "MIDDLE_RIGHT",
    slideIn: "right",
    fadeIn: 1,
    fadeOut: 0.3,
    background: true,
    y: 140,
    queue: true,
    applyWarn: true
}

function sendImmersiveMessage(text, /**@type {import("net.minecraft.server.level.ServerPlayer").$ServerPlayer$$Original}*/ player, args, /**@type {import("net.minecraft.server.MinecraftServer").$MinecraftServer$$Original}*/ server) {
    if (player.persistentData.immersiveMessageQueue) {
        return
    }
    player.sendData("immersive_message", {
        text: text,
        args: args
    })
    if (args.queue) {
        let duration = args.duration || 2.2
        player.persistentData.putBoolean("immersiveMessageQueue", true);
        (server).scheduleInTicks(duration * 20, _ => player.persistentData.remove("immersiveMessageQueue"))
    }
} 
