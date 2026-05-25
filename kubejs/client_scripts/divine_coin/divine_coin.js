//priority: 2

let isDivineCoinSequence = false
let isPostDivineCoinSequence = false

let isAnyItemShaking = false
let itemShakingTicks = 0
let itemsToShakeSet = null

let isErrorDisplayed = false
let errorDisplayTicks = 0
let currentErrorMessage = null

let divineCoinTimer = 5
let divineCoinTimerPrev = 5
let divineCoinTimerTicks = 100
let divineCoinTimerTicksPrev = 100
let currentCoinData = null

let DIVINE_COIN_SEQUENCE_TICKS = 134

let $Tag = Java.loadClass("net.minecraft.nbt.Tag")

ItemEvents.firstRightClicked("milf:divine_coin", event => {

    if (isDivineCoinSequence) return

    let data = event.getItem().get($DataComponents.CUSTOM_DATA).copyTag()
    Client.player.sendData("milf_divine_coin_validate", data)

})

NetworkEvents.dataReceived('milf_divine_coin_valid', (event) => {

    let data = event.data
    currentCoinData = data
    //Client.player.sendData("milf_divine_coin_boss_particles", currentCoinData)
    onCoinUse(data)

})

NetworkEvents.dataReceived('milf_divine_coin_not_enough_items', (event) => {
    let data = event.data

    let itemsToShakeTag = data.getList("itemsToShake", $Tag.TAG_STRING)

    itemsToShakeSet = new $HashSet()

    for(let i = 0; i < itemsToShakeTag.size(); i++){
        itemsToShakeSet.add(itemsToShakeTag.getString(i))
    }

    milfPlayGUISound("milf:error")

    isAnyItemShaking = true
    itemShakingTicks = 20

})

NetworkEvents.dataReceived('milf_divine_coin_wrong_spawn_conditions', (event) => {
    onError(Component.translatable("milf.divine_coin.error.spawn_conditions"))
})

NetworkEvents.dataReceived('milf_divine_coin_structure_exclusive', (event) => {
    onError(Component.translatable("milf.divine_coin.error.structure_exclusive"))
})

function onError(errorMessage){
    milfPlayGUISound("milf:error")
    currentErrorMessage = errorMessage
    isErrorDisplayed = true
    errorDisplayTicks = 60

    
}





function onCoinUse(data){
    isDivineCoinSequence = true
    divineCoinTimerTicks = DIVINE_COIN_SEQUENCE_TICKS
    divineCoinTimerTicksPrev = DIVINE_COIN_SEQUENCE_TICKS
    divineCoinTimer = 5
    divineCoinTimerPrev = 5

    milfPlayGUISound("milf:coin_spin")

    let spawnPos = data.get("spawnPos")
    let posVector = new Vec3d(spawnPos.getDouble("x"), spawnPos.getDouble("y") + 1, spawnPos.getDouble("z"))

    let particle = Client.particleEngine.createParticle("spectrum:falling_liquid_crystal", posVector.x(), posVector.y() + 1, posVector.z(), 0, 0, 0)
    //console.log(particle);
    
    if(particle){
        particle.setLifetime(DIVINE_COIN_SEQUENCE_TICKS)
    }
}

function onBossSpawn() {
    Client.player.sendData("milf_divine_coin_spawn_boss", currentCoinData)
    isDivineCoinSequence = false
    isPostDivineCoinSequence = true
    milfPlayGUISound("milf:whisper")
}



ClientEvents.tick(event => {

    if (isDivineCoinSequence) {
        divineCoinTimerPrev = divineCoinTimer
        divineCoinTimerTicksPrev = divineCoinTimerTicks
        divineCoinTimerTicks--
        divineCoinTimer -= 1 / 20

        if (divineCoinTimerTicks % 50 == 0) {
            Client.player.sendData("milf_divine_coin_boss_particles", currentCoinData)
        }

        if (divineCoinTimerTicks <= 0) {
            onBossSpawn()
        }

        return
    }

    if (isPostDivineCoinSequence){
        divineCoinTimerTicksPrev = divineCoinTimerTicks
        divineCoinTimerTicks += 4

        if (divineCoinTimerTicks >= 100) {
            isPostDivineCoinSequence = false
        }
    }

    if(isAnyItemShaking){
        itemShakingTicks--
        if (itemShakingTicks <= 0) {
            isAnyItemShaking = false
        }
    }

    if (isErrorDisplayed) {
        errorDisplayTicks--
        
        if (errorDisplayTicks <= 0) {
            isErrorDisplayed = false
        }
    }


})

NativeEvents.onEvent("net.neoforged.neoforge.client.event.RenderGuiLayerEvent$Post", event => {
    if (event.getName().equals($VanillaGuiLayers.CROSSHAIR)){
        if(Client.options.hideGui) return

        if (isDivineCoinSequence) {
            let coinData = currentCoinData
            renderCoinInfo(event.getGuiGraphics(), coinData)
            return
        }

        let item = Client.player.getMainHandItem()
        if(!item) return
        if (item.id != "milf:divine_coin") return
        let data = item.get($DataComponents.CUSTOM_DATA)
        if (!data) return
        renderCoinInfo(event.getGuiGraphics(), data.copyTag())
    }

})

let DIVINE_COIN_INFO_WIDTH = 138
let DIVINE_COIN_INFO_HEIGHT = 138
let DIVINE_COIN_INFO_PADDING = 26

let cachedEntities = {}
let DC_ENTITY_SCALE = 20
let DC_ITEM_SCALE = 6

let dcBossesData = global.milfBosses

function renderCoinInfo(guiGraphics, data){
    try {

        let registryAccess = Client.level.registryAccess()

        let bossName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("bossNameJson"), registryAccess)
        let effectName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("effectNameJson"), registryAccess)
        let difficultyName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("difficultyNameJson"), registryAccess)

        let lootModifier = Component.translatable("milf.divine_coin.tooltip.loot_modifier").append(Component.ofString(data.getString("lootModifier")))
        
        let bossID = data.getString("bossID")
        let bossTier = data.getString("bossTier")
        let entityData = dcBossesData[bossTier][bossID]

        let pose = guiGraphics.pose()
        pose.pushPose()

        let baseX = guiGraphics.guiWidth() - DIVINE_COIN_INFO_WIDTH - 6
        let baseY = guiGraphics.guiHeight() - DIVINE_COIN_INFO_HEIGHT - 6
        pose.translate(baseX, baseY, -5000)

        let interpolatedTicks = lerp(divineCoinTimerTicksPrev, divineCoinTimerTicks)

        if (isDivineCoinSequence || isPostDivineCoinSequence) {
            
            let progressP2 = Math.max(0, Math.min(1, (50 - interpolatedTicks) / 50))
            progressP2 = easeOutQuart(progressP2)

            //pose.translate(0, progressP2 * (DIVINE_COIN_INFO_HEIGHT + 10), 0)
            pose.translate(progressP2 * (DIVINE_COIN_INFO_WIDTH + 10), 0, 0)
            //pose.scale(1 - progressP2, 1 - progressP2, 1)
        }



        $TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 0, DIVINE_COIN_INFO_WIDTH, DIVINE_COIN_INFO_HEIGHT, 0,
            0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)

        pose.translate(DIVINE_COIN_INFO_WIDTH / 2, 2, 0)

        pose.pushPose()
        pose.translate(0, 0, 200)
        //guiGraphics["drawCenteredString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int)"](Client.font, Component.translatable("milf.divine_coin.gui.resurrection_toll"), 0, 0, 0xFFFFFF)
        pose.translate(0, -24, 0)

        let resurrectionItems = entityData.resurrectionItems



        if (resurrectionItems){

            let itemsToRenderWidth = resurrectionItems.length * 20

            if (isDivineCoinSequence || isPostDivineCoinSequence){
                let progressP1 = Math.max(0, Math.min(1, (100 - interpolatedTicks) / 50))
                progressP1 = easeOutQuart(progressP1)

                pose.translate(0, progressP1 * 20, 0)
                //pose.scale(1 - progressP1, 1 - progressP1, 1)
            }

            guiGraphics.enableScissor(
                baseX,
                baseY - 24,
                baseX + DIVINE_COIN_INFO_WIDTH + 10,
                baseY - 2
            )
            
            pose.translate(-(0.5 * itemsToRenderWidth), 0, 0)

            $TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 2, itemsToRenderWidth, 15, 0,
                0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f , 0x6f8f8f8f )

            pose.translate(2, 0, 0)

            let tempIndex = 0
            for (let entry of resurrectionItems) {
                let {id, count} = entry
                pose.pushPose()
                let countString = String(count)
                if(isAnyItemShaking && itemsToShakeSet.contains(id)){
                    pose.translate(Math.random() * 3 - 1.5, Math.random() * 1 - 0.5, 0)
                    
                    //countString = MilfEffects.GRAD.NEGATIVE(countString)

                    //countString = MilfEffects.GLITCH(countString)
                    //console.log(countString)

                    countString = "§c" + countString
                    
                }
                let item = Item.of(id)
                guiGraphics.renderFakeItem(item, 20 * tempIndex, 1)
                pose.popPose()
                guiGraphics.renderItemDecorations(Client.font, item, 20 * tempIndex, 1, countString)
                tempIndex++

                
            }

            guiGraphics.disableScissor()
        }



        pose.popPose()
        
        
        pose.translate(0, DIVINE_COIN_INFO_HEIGHT - 10, 0)

        guiGraphics["drawCenteredString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int)"](Client.font, bossName, 0, 0, 0xFFFFFF)

        pose.translate(0, -10, 0)

        pose.pushPose()
        pose.scale(0.8, 0.8, 1)
        guiGraphics["drawCenteredString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int)"](Client.font, Component.join(effectName,Component.ofString(" "), difficultyName) , 0, 0, 0xFFFFFF)
        pose.popPose()

        let angle = Math.sin(Utils.systemTime / 1000)

        if (entityData.fakeItemToRender) {

            pose.pushPose()

            pose.translate(0, -DIVINE_COIN_INFO_HEIGHT + 12 * DC_ITEM_SCALE, 100)

            let item = Item.of(entityData.fakeItemToRender)

            pose.scale(DC_ITEM_SCALE, DC_ITEM_SCALE, 1)
            pose.mulPose($Axis.ZN.rotation(angle / (5 * 1.5)))

            guiGraphics.renderFakeItem(item, -8, -8)

            pose.popPose()

        } else {
            let entity

            if (cachedEntities[bossID]) {
                entity = cachedEntities[bossID]

            } else {
                let entityType = $BuiltInRegistries.ENTITY_TYPE.get($ResourceLocation.parse(bossID))
                entity = entityType.create(Client.level)
                cachedEntities[bossID] = entity
            }

            pose.pushPose()

            pose.translate(0, -20, 100)

            let clientDispatcher = Client.getEntityRenderDispatcher()
            let clientBuffer = guiGraphics.bufferSource()
            let brightness = $LightTexture.FULL_BRIGHT

            pose.mulPose($Axis.XP.rotation(Math.PI))
            pose.mulPose($Axis.YP.rotation(Math.PI))

            if (entityData.additionalTransformations) entityData.additionalTransformations(pose)
            pose.scale(DC_ENTITY_SCALE, DC_ENTITY_SCALE, 1)

            pose.mulPose($Axis.YP.rotation(angle / (2 * 1.5)))
            pose.mulPose($Axis.ZN.rotation(angle / (7 * 1.5)))

            clientDispatcher.render(entity, 0, 0, 0, 0, 0,
                pose, clientBuffer, brightness)

            clientBuffer.endBatch()

            pose.popPose()
        }

        if(isErrorDisplayed){
            pose.translate(0,-20,200)
            let errorComponents = Client.font.split(currentErrorMessage, DIVINE_COIN_INFO_WIDTH - 20)

            let componentsSize = errorComponents.size()

            errorComponents.forEach(component => {
                guiGraphics["drawCenteredString(net.minecraft.client.gui.Font,net.minecraft.util.FormattedCharSequence,int,int,int)"](Client.font, component, 0, -12 - 10 * (componentsSize - 1), 0xFFFFFF)
                componentsSize--
            })
            
        }

        pose.popPose()
    } catch (error) {
        console.log(error);
        
    }
}


