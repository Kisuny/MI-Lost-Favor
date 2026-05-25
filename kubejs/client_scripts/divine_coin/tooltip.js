
ItemEvents.modifyTooltips(event => {

    event.modify("milf:divine_coin", tooltip => {
        tooltip.dynamic("milf:divine_coin_tooltip")
    })

})

let $InputConstants = Java.loadClass("com.mojang.blaze3d.platform.InputConstants")
let $GLFW = Java.loadClass("org.lwjgl.glfw.GLFW")

ItemEvents.dynamicTooltips("milf:divine_coin_tooltip", event => {

    let { item } = event

    if (item.get($DataComponents.CUSTOM_DATA)) {
        let data = item.get($DataComponents.CUSTOM_DATA).copyTag()

        let registryAccess = Client.level.registryAccess()

        let bossName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("bossNameJson"), registryAccess)
        let effectName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("effectNameJson"), registryAccess)
        let difficultyName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("difficultyNameJson"), registryAccess)

        let lootModifier = Component.translatable("milf.divine_coin.tooltip.loot_modifier").append(Component.ofString(data.getString("lootModifier")))

        event.add(bossName)
        event.add(effectName)
        event.add(difficultyName)
        event.add(lootModifier)

        let screen = Client.screen

        if (screen && screen.getTitle().getString() == DIVINE_MINT_SCREEN_TITLE.getString()) {
            return
        }

        if ($InputConstants.isKeyDown(Client.getWindow().getWindow(), $GLFW.GLFW_KEY_LEFT_SHIFT)){
            let entityData = dcBossesData[data.getString("bossTier")][data.getString("bossID")]

            let resurrectionItems = entityData.resurrectionItems

            if (resurrectionItems) {

                for (let entry of resurrectionItems) {
                    let { id, count } = entry

                    let item = Item.of(id)

                    event.add(Component.translatable(item.getDescriptionId()).append(Component.ofString(" x" + count)).color("#D4B1EB"))
                }
            }
        } else {
            event.add(Component.translatable("milf.press_button").color("#D4B1EB")
                .append(Component.ofString("Shift ").bold().color("#D4B1EB"))
                .append(Component.translatable("milf.divine_coin.tooltip.to_check_resurrection_toll").color("#D4B1EB")))
        }

    }

})
