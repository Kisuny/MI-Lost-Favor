NativeEvents.onEvent("net.neoforged.neoforge.client.event.RenderGuiLayerEvent$Post", event => {
    if (event.getName().equals($VanillaGuiLayers.CROSSHAIR)) {
        if (Client.options.hideGui) return
        let item = Client.player.getMainHandItem()
        if (!item) return
        if (item.id != "milf:bound_spirit") return
        let data = item.get($DataComponents.CUSTOM_DATA)
        if (!data) return
        let dataCompoundTag = data.copyTag()
        
        if (dataCompoundTag.getCompound("gravePos").getString("dimension") != Client.level.dimension.toString()) return
        renderBoundSpirit(event.getGuiGraphics(), event.getPartialTick(), dataCompoundTag)
        
    }

})

function renderBoundSpirit(guiGraphics, deltaTracker, data){
    try {
        let pose = guiGraphics.pose()
        let posCompound = data.getCompound("gravePos")
        let blockPos = new BlockPos(posCompound.getInt("x"), posCompound.getInt("y"), posCompound.getInt("z"))
        let pos = blockPos.getCenter()
        let screenCoordinates = projectPosToScreen(pos, Client.gameRenderer, deltaTracker, Client.window.getGuiScale())
        if (screenCoordinates) {
            pose.pushPose()
            let item = Item.of("milf:bound_spirit")
            pose.translate(screenCoordinates.x, screenCoordinates.y, -400)
            guiGraphics.renderFakeItem(item, -8, -8)
            pose.popPose()
        }

        

    } catch (error) {
        console.log(error);

    }
}