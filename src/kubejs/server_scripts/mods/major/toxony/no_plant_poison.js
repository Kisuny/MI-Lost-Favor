const $MobEffectApplicableResult = Java.loadClass("net.neoforged.neoforge.event.entity.living.MobEffectEvent$Applicable$Result")

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.MobEffectEvent$Applicable", event => {
    let entity = event.getEntity()
    if (entity.level.isClientSide()) return

    if (event.getEffectSource() != null) return
    if (event.getEffectInstance().getEffect().getRegisteredName() != "minecraft:poison") return

    let level = entity.level
    let box = entity.getBoundingBox().deflate(1e-7)
    let x, y, z

    for (x = Math.floor(box.minX); x <= Math.floor(box.maxX); x++) {
        for (y = Math.floor(box.minY); y <= Math.floor(box.maxY); y++) {
            for (z = Math.floor(box.minZ); z <= Math.floor(box.maxZ); z++) {
                if (level.getBlock(x, y, z).hasTag("toxony:plants/poisonous")) {
                    event.setResult($MobEffectApplicableResult.DO_NOT_APPLY)
                    return
                }
            }
        }
    }
})
