ServerEvents.tags('block', event => {

    event.add('minecraft:mineable/pickaxe', global.miTweaksTags)
    event.add('minecraft:needs_stone_tool', global.miTweaksTags)

})