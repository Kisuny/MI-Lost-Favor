BlockEvents.broken('minecraft:short_grass', event => {
    const player = event.player
    if (!player) return
    const tool = player.mainHandItem
    if (tool.id != 'ytech:sharp_flint') return
    tool.hurtAndBreak(1, player, 'mainhand')
})
