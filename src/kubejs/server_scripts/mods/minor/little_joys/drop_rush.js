const $DropRushHandler = Java.loadClass("net.blay09.mods.littlejoys.handler.DropRushHandler")
NativeEvents.onEvent("it.crystalnest.harvest_with_ease.api.event.HarvestEvents$BeforeHarvestEvent", event => {
    if (!event.isFirst()) return
    $DropRushHandler.rollForDropRush(event.getLevel(), event.getPos(), event.getCrop(), event.getEntity())
})

const dropRushBushes = {
    "paganbless:winter_berry_bush": "3",
    "ars_nouveau:sourceberry_bush": "3",
    "toxony:false_berry_bush": "3",
    "spectrum:sawblade_holly_bush": "7",
}

BlockEvents.rightClicked(Object.keys(dropRushBushes), event => {
    if (String(event.hand) != "MAIN_HAND") return
    let block = event.block
    if (block.properties.age != dropRushBushes[block.id]) return

    $DropRushHandler.rollForDropRush(event.level, block.pos, block.blockState, event.player)
})
