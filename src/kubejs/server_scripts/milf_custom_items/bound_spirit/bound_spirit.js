

PlayerEvents.respawned(event => {
    if(event.isEndConquered()) return
    let player = event.player
    let level = event.level
    if (level.isClientSide()) return
    let lastGrave = getLastGrave(player)

    if (lastGrave) {

        let gravePos = lastGrave.getPos()
        let graveDim = lastGrave.getWorldRegistryKey().location().toString()

        let spiritItem = Item.of("milf:bound_spirit")
        let data = new $CompoundTag()

        let gravePosData = new $CompoundTag()
        gravePosData.putInt("x", gravePos.x)
        gravePosData.putInt("y", gravePos.y)
        gravePosData.putInt("z", gravePos.z)

        gravePosData.putString("dimension", graveDim)

        data.put("gravePos", gravePosData)
        spiritItem.set($DataComponents.CUSTOM_DATA, data)

        player.getInventory().add(spiritItem)
    }
    
})

function getLastGrave(player) {
    let profile = new $ResolvableProfile(player.getGameProfile())
    let graves = new $ArrayList($DeathInfoManager.INSTANCE.getBackupData(profile))

    graves.removeIf(graveComponent => graveComponent.getStatus() != $GraveStatus.UNCLAIMED)
    if (graves.isEmpty()) {
        return null
    }

    let lastGrave = graves.getLast()

    return lastGrave
}
