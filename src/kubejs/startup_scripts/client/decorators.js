if(Platform.isClientEnvironment()){

    let PLACERS_DECORATOR_SCALE = 0.5
    let PLACERS_DECORATOR_TEXTURE = $ResourceLocation.fromNamespaceAndPath("milf", "textures/decorators/placers_decorator.png")

    let STONE_NOSE_DECORATOR_SCALE = 0.5
    let STONE_NOSE_DECORATOR_TEXTURE = $ResourceLocation.fromNamespaceAndPath("milf", "textures/decorators/stone_nose_decorator.png")

    let $IItemDecorator = Java.loadClass("net.neoforged.neoforge.client.IItemDecorator")

    NativeEvents.onEvent("net.neoforged.neoforge.client.event.RegisterItemDecorationsEvent", event => {
        Object.keys(PLACER_BLOCKS).forEach(placer => {
            event.register(Item.of(placer), new JavaAdapter($IItemDecorator, {
                render(guiGraphics, font, itemStack, x, y) {

                    let pose = guiGraphics.pose()

                    pose.pushPose()

                    pose.translate(-1.5, 1.5, 250)

                    guiGraphics.blit(PLACERS_DECORATOR_TEXTURE, x, y, 0, 0, 16, 16, 16, 16)


                    pose.translate(1, -1, 0)


                    pose.translate(x, y + (16 - 16 * PLACERS_DECORATOR_SCALE), -100)

                    pose.scale(PLACERS_DECORATOR_SCALE, PLACERS_DECORATOR_SCALE, 1)

                    let item = itemStack.getItem()
                    let itemId = $BuiltInRegistries.ITEM.getKey(item)
                    let itemToRender = Item.of(PLACER_BLOCKS[itemId])
                    guiGraphics.renderFakeItem(itemToRender, 0, 0)
                    pose.popPose()
                    return false

                }

            }))

        })

        event.register(Item.of("milf:stone_nose"), new JavaAdapter($IItemDecorator, {
            render(guiGraphics, font, itemStack, x, y) {

                let dataComponent = itemStack.get($DataComponents.CUSTOM_DATA)
                if (!dataComponent) return false

                let data = dataComponent.copyTag()

                let pose = guiGraphics.pose()

                pose.pushPose()
                pose.translate(-1.5, 1.5, 250)

                guiGraphics.blit(STONE_NOSE_DECORATOR_TEXTURE, x, y, 0, 0, 16, 16, 16, 16)

                pose.translate(1, -1, 0)
                pose.translate(x, y + (16 - 16 * STONE_NOSE_DECORATOR_SCALE), -100)
                pose.scale(STONE_NOSE_DECORATOR_SCALE, STONE_NOSE_DECORATOR_SCALE, 1)

                let oreId = data.getString("oreId")
                let itemToRender = Item.of(oreId)

                guiGraphics.renderFakeItem(itemToRender, 0, 0)
                pose.popPose()
                return false

            }

        }))
    })
}



