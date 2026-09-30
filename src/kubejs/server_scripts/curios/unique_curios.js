CuriosJSEvents.canEquip(event => {
    const { entity, stack } = event

    if (entity.isCuriosEquipped(stack.item)) {
        event.setResult('FALSE')

        if (entity.isPlayer && !entity.persistentData.getBoolean('milf_curio_equip_warned')) {
            entity.persistentData.putBoolean('milf_curio_equip_warned', true)
            entity.server.scheduleInTicks(10, () => entity.persistentData.remove('milf_curio_equip_warned'))

            sendImmersiveMessage(
                Text.translate('milf.text.curios.already_equipped')
                    .append("<magic>" + Text.of(stack.getHoverName().getString()).getString() + "</magic>"),
                entity,
                DEFAULT_WARN_NOTIFICATION_STYLE,
                entity.server
            )

        }
    }
})
