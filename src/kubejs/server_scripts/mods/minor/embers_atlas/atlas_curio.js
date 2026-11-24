PlayerEvents.tick(event => {
    let player = event.player
    if (player.tickCount % 20 != 0) return

    let slot = player.getCuriosStacksHandler('atlas').orElse(null)
    let hasAtlas = slot && !slot.stacks.getStackInSlot(0).isEmpty()
    let hasEffect = player.potionEffects.isActive('milf:atlas_bearer')

    if (hasAtlas && !hasEffect) player.potionEffects.add('milf:atlas_bearer', -1, 0, true, false)
    if (!hasAtlas && hasEffect) player.removeEffect('milf:atlas_bearer')
})
