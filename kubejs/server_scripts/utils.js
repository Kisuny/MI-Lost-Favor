let $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
let $SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource")

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function milfPlaySoundForPlayer(/**@type {$ServerPlayer_} */ player, resourceLocation, args){
    args = args || {}
    let source = args.source ? $SoundSource[args.source] : $SoundSource.AMBIENT
    let pos = args.pos ? args.pos : player.blockPosition()
    let soundEvent = $BuiltInRegistries.SOUND_EVENT.get($ResourceLocation.parse(resourceLocation))
    let playLocal = args.playLocal !== false

    if (playLocal) {
        player["playNotifySound(net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)"](soundEvent, source, args.volume || 1, args.pitch || 1)
    } else {
        player.level["playSound(net.minecraft.world.entity.player.Player,net.minecraft.core.BlockPos,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)"]
            (null, pos, soundEvent, source, args.volume || 1, args.pitch || 1)
    }
}

function milfPlaySound(/**@type {$BlockRightClickedKubeEvent_} */ event, resourceLocation, args){
    args = args || {}
    let level = event.level
    let player = args.playLocal ? event.player : null
    let pos = args.pos ? args.pos : event.player.blockPosition()
    let source = args.source ? $SoundSource[args.source] : $SoundSource.BLOCKS

    let soundEvent = $BuiltInRegistries.SOUND_EVENT.get(resourceLocation)    

    level["playSound(net.minecraft.world.entity.player.Player,net.minecraft.core.BlockPos,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)"]
        (player, pos, soundEvent, source, args.volume || 1, args.pitch || 1)
}

function getXYZFromPosCompound(posCompound){
    let x = posCompound.getDouble("x")
    let y = posCompound.getDouble("y")
    let z = posCompound.getDouble("z")

    return {x:x, y:y, z:z}
}

function checkAndRemoveItems(player, itemEntries){

    let isEnough = true
    let missingItems = []

    if (player.creative) return { isEnough: isEnough, missingItems: missingItems }

    for (let entry of itemEntries) {
        let { id, count } = entry

        let item = Item.of(id)

        let playerCount = player.getInventory().count(item)

        if (playerCount < count) {
            isEnough = false
            missingItems.push(id)
        }

    }

    if (isEnough){

        for (let entry of itemEntries) {
                let { id, count } = entry

                let item = Item.of(id)

                let playerCount = player.getInventory().clearOrCountMatchingItems(
                    stack => stack.is(item),
                    count,
                    player.inventoryMenu.getCraftSlots()
                )

            }

            player.containerMenu.broadcastChanges()

        
    }

    return { isEnough: isEnough, missingItems: missingItems }

}

function sendMissingItemsNotification(player, missingItems, notificationType){
        let ticksOffset = 0

        missingItems.forEach(id => {
            let notification = notificationType(Component.translatable(Item.getItem(id).getDescriptionId()))


            player.server.scheduleInTicks(ticksOffset, callback => {
                sendImmersiveMessage(notification, player, DEFAULT_WARN_NOTIFICATION_STYLE, player.server)
            })
            
            ticksOffset+=5
        })
}

const MissingItemsNotificationType = {
    UPGRADE(itemName) { return Component.translatable("milf.notification.missing_items.to_upgrade", itemName)},
    USE(itemName) { return Component.translatable("milf.notification.missing_items.to_use", itemName) }
}