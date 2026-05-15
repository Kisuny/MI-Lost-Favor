let $DataComponents = Java.loadClass("net.minecraft.core.component.DataComponents")
let $Component$Serializer = Java.loadClass("net.minecraft.network.chat.Component$Serializer")

NetworkEvents.dataReceived('milf_divine_mint_give_divine_coin', (event) => {

    //console.log(event.data);

    let data = event.data

    let registryAccess = event.player.level.registryAccess()

    // let bossName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("bossNameJson"), registryAccess)
    // let effectName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("effectNameJson"), registryAccess)
    // let difficultyName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("difficultyNameJson"), registryAccess)

    let coinStack = Item.of("milf:divine_coin")

    // let data = new $CompoundTag()

    // let dataForCoin = this.coinAcceptorParentScreen.getInfoBox().getDataForCoin()

    // let bossNameComponent = dataForCoin.bossName
    // let effectNameComponent = dataForCoin.effectName
    // let difficultyNameComponent = dataForCoin.difficultyName

    // let registryAccess = Client.level.registryAccess()

    // let jsonBossName = $Component$Serializer.toJson(bossNameComponent, registryAccess)
    // let jsonEffectName = $Component$Serializer.toJson(effectNameComponent, registryAccess)
    // let jsonDifficultyName = $Component$Serializer.toJson(difficultyNameComponent, registryAccess)
    
    // data.putString("bossNameJson", jsonBossName)
    // data.putString("effectNameJson", jsonEffectName)
    // data.putString("difficultyNameJson", jsonDifficultyName)

    coinStack.set($DataComponents.CUSTOM_DATA, data)

    console.log(coinStack);

    event.player.getInventory().add(coinStack)
    
    
})