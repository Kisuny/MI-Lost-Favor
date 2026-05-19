let isDivineCoinSequence = false
let divineCoinTimer = 5
let divineCoinTimerPrev = 5
let divineCoinTimerTicks = 100
let currentCoinData = null

ItemEvents.firstRightClicked("milf:divine_coin", event => {

    if (isDivineCoinSequence) return

    milfPlayGUISound("milf:coin_spin")

    let data = event.getItem().get($DataComponents.CUSTOM_DATA).copyTag()

    Client.player.sendData("milf_divine_coin_validate", data)

})

ItemEvents.modifyTooltips(event => {

    //console.log("WHAT");
    
    event.modify("milf:divine_coin", tooltip =>{
        tooltip.dynamic("milf:divine_coin_tooltip")
    })

})

function onCoinUse(data){
    isDivineCoinSequence = true
    divineCoinTimerTicks = 100
    divineCoinTimer = 5
    divineCoinTimerPrev = 5

    console.log(data);
    
}



ItemEvents.dynamicTooltips("milf:divine_coin_tooltip", event =>{

    let {item} = event

    if(item.get($DataComponents.CUSTOM_DATA)){
        let data = item.get($DataComponents.CUSTOM_DATA).copyTag()

        let registryAccess = Client.level.registryAccess()

        let bossName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("bossNameJson"), registryAccess)
        let effectName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("effectNameJson"), registryAccess)
        let difficultyName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("difficultyNameJson"), registryAccess)

        event.add(bossName)
        event.add(effectName)
        event.add(difficultyName)

    }

})

NetworkEvents.dataReceived('milf_divine_coin_valid', (event) => {

    let data = event.data

    currentCoinData = data
    onCoinUse(data)

})

ClientEvents.tick(event => {
    if (!isDivineCoinSequence) return
    divineCoinTimerPrev = divineCoinTimer
    divineCoinTimerTicks--
    divineCoinTimer -= 1/20

    if (divineCoinTimerTicks == 0){
        Client.player.sendData("milf_divine_coin_spawn_boss", currentCoinData)
        isDivineCoinSequence = false
        
    }
})

NativeEvents.onEvent("net.neoforged.neoforge.client.event.RenderGuiLayerEvent$Post", event => {
    if (event.getName().equals($VanillaGuiLayers.CROSSHAIR)){
        if (!isDivineCoinSequence) return
        if(Client.options.hideGui) return
        renderTimer(event.getGuiGraphics())
    }

})

function renderTimer(guiGraphics){


    guiGraphics.drawCenteredString(Client.font, lerp(divineCoinTimerPrev, divineCoinTimer).toFixed(2), 400, 400, 0xfffef7)


}


