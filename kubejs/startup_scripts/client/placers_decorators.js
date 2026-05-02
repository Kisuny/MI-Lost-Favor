if(Platform.isClientEnvironment()){

    let PLACERS_SCALE = 0.5
    let DECORATOR_TEXTURE = $ResourceLocation.fromNamespaceAndPath("milf", "textures/decorators/placers_decorator.png")

    let $IItemDecorator = Java.loadClass("net.neoforged.neoforge.client.IItemDecorator")

    NativeEvents.onEvent("net.neoforged.neoforge.client.event.RegisterItemDecorationsEvent", event => {
        Object.keys(PLACER_BLOCKS).forEach(placer => {
            event.register(Item.of(placer), new JavaAdapter($IItemDecorator, {
                render(guiGraphics, font, itemStack, x, y) {

                    let pose = guiGraphics.pose()

                    pose.pushPose()

                    pose.translate(-1.5, 1.5, 250)

                    guiGraphics.blit(DECORATOR_TEXTURE, x, y, 0, 0, 16, 16, 16, 16)


                    pose.translate(1, -1, 0)


                    pose.translate(x, y + (16 - 16 * PLACERS_SCALE), -100)

                    pose.scale(PLACERS_SCALE, PLACERS_SCALE, 1)

                    let item = itemStack.getItem()
                    let itemId = $BuiltInRegistries.ITEM.getKey(item)
                    let itemToRender = Item.of(PLACER_BLOCKS[itemId])
                    guiGraphics.renderFakeItem(itemToRender, 0, 0)
                    pose.popPose()
                    return false

                }

            }))
        })
    })
}



