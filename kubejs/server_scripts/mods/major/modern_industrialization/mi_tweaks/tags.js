ServerEvents.tags('block', event => {

    event.add('minecraft:mineable/pickaxe', global.miTweaksTags)
    event.add('minecraft:needs_stone_tool', global.miTweaksTags)

})

ServerEvents.tags('item', event => {

    event.add('milf:large_steam_machines', /mi_tweaks:large_steam_\w+/)

})