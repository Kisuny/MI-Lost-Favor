//priority: 3
let milfBosses = global.milfBosses
let milfEffects = global.milfEffects
let milfDifficulties = global.milfDifficulties

let isFirstOpen = true
let DIVINE_MINT_SCREEN_TITLE = Component.translatable("milf.divine_mint.gui.title")

ItemEvents.firstRightClicked("milf:divine_mint", event => {
    if(isFirstOpen) {
        isFirstOpen = false
        Client.player.sendData("milf_divine_mint_sync_loot", { bosses: milfBosses })
    }

    Client.setScreen(DivineMintScreen())
})

NativeEvents.onEvent($RenderGuiLayerEvent$Pre, event => {

    if (event.getName().equals($VanillaGuiLayers.CROSSHAIR)) {

        let screen = Client.screen

        if (screen && screen.getTitle().getString() == DIVINE_MINT_SCREEN_TITLE.getString()) {
            event.setCanceled(true)
        }

    }

})

