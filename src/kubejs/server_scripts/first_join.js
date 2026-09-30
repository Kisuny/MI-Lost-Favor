PlayerEvents.loggedIn(event => {
    const { player, server } = event
    if (!player || player.persistentData.getBoolean('first_join')) return

    player.persistentData.putBoolean('first_join', true)

    player.inventory.clear()
    player.give(Item.of('ftbquests:book', 1))
    player.give(Item.of('minecraft:lantern', 1))
    player.give(Item.of('map_atlases:atlas', '[map_atlases:empty_maps={vanilla:9}]'))
    player.give(Item.of("sophisticatedbackpacks:backpack", 1))
    player.tell(Text.translate("milf.text.first_join"))
    sendImmersiveMessage(
        Text.translate('milf.text.first_join'),
        event.player,
        DEFAULT_MILESTONE_NOTIFICATION_STYLE,
        event.server
    )

    player.tell(Text.translate("milf.text.recommendation_1"))
})