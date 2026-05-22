ItemEvents.modifyTooltips(event => {

    event.modify("milf:divine_coin", tooltip => {
        tooltip.dynamic("milf:divine_coin_tooltip")
    })

})

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
    }

})