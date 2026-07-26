function milfElectromagnetRecipe(input, output, energy){
    BlockEvents.rightClicked("immersiveengineering:electromagnet", event => {
        if (event.getHand() == "OFF_HAND") return
        if (!event.player.mainHandItem.is(Item.of(input))) return
        let { level, block, player } = event

        let blockEntity = block.entity
        if (!blockEntity) return

        let entityData = block.getEntityData()

        if (entityData.energy >= energy) {

            block.setEntityData(Object.assign({}, entityData, { energy: entityData.energy - energy }))

            blockEntity.setChanged()

            let item = event.player.mainHandItem
            item.count--

            $Block.popResource(level, block.pos.above(), Item.of(output))

            milfPlaySound(event, "immersiveengineering:electromagnet")
        } else {
            sendImmersiveMessage(
                Component.translatable("milf.notification.missing_energy.fe", String(energy)),
                player, DEFAULT_WARN_NOTIFICATION_STYLE, player.server
            )
        }

    })

}
