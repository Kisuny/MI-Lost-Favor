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

NetworkEvents.dataReceived('milf_divine_coin_valid', (event) => {

    let data = event.data
    currentCoinData = data
    //Client.player.sendData("milf_divine_coin_boss_particles", currentCoinData)
    onCoinUse(data)

})

function onCoinUse(data){
    isDivineCoinSequence = true
    divineCoinTimerTicks = 134
    divineCoinTimer = 5
    divineCoinTimerPrev = 5

    let spawnPos = data.get("spawnPos")
    let posVector = new Vec3d(spawnPos.getDouble("x"), spawnPos.getDouble("y") + 1, spawnPos.getDouble("z"))

    let particle = Client.particleEngine.createParticle("spectrum:falling_liquid_crystal", posVector.x(), posVector.y() + 1, posVector.z(), 0, 0, 0)
    //console.log(particle);
    
    if(particle){
        particle.setLifetime(134)
    }
}

function onBossSpawn() {
    Client.player.sendData("milf_divine_coin_spawn_boss", currentCoinData)
    isDivineCoinSequence = false
    milfPlayGUISound("milf:whisper")
}



ClientEvents.tick(event => {
    if (!isDivineCoinSequence) return
    divineCoinTimerPrev = divineCoinTimer

    divineCoinTimerTicks--
    divineCoinTimer -= 1/20

    if (divineCoinTimerTicks % 50 == 0) {
        Client.player.sendData("milf_divine_coin_boss_particles", currentCoinData)
    }

    if (divineCoinTimerTicks == 0) {
        onBossSpawn()
    }
})

// NativeEvents.onEvent("net.neoforged.neoforge.client.event.RenderGuiLayerEvent$Post", event => {
//     if (event.getName().equals($VanillaGuiLayers.CROSSHAIR)){
//         if (!isDivineCoinSequence) return
//         if(Client.options.hideGui) return
//         renderTimer(event.getGuiGraphics())
//     }

// })

function renderTimer(guiGraphics){

    guiGraphics.drawCenteredString(Client.font, lerp(divineCoinTimerPrev, divineCoinTimer).toFixed(2), 400, 400, 0xfffef7)

}


