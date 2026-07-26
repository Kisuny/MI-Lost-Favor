BlockEvents.broken(['ae2:sky_stone_block', 'ae2:mysterious_cube'], event => {

    let player_hand_item = event.player.mainHandItem.componentString

    if (event.player.mainHandItem == "immersiveengineering:buzzsaw" && player_hand_item.includes("immersiveengineering:grindingdisk")) return
    event.player.tell(Text.translate("milf.cannot.mine.block").gold())
    event.cancel()
})

ServerEvents.tags('block', event => {
    event.add('immersiveengineering:mineable/grinding_disk',['ae2:sky_stone_block', 'ae2:mysterious_cube'])
    event.remove('minecraft:mineable/pickaxe', ['ae2:sky_stone_block', 'ae2:mysterious_cube'])
    
})

LootJS.modifiers(event => {
    event
    .addTableModifier("ae2:blocks/mysterious_cube")
    .removeLoot("*")
    .addLoot("ae2:mysterious_cube")
})