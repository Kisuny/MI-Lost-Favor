//priority: 2

let $Screen = Java.loadClass("net.minecraft.client.gui.screens.Screen")
let $RenderGuiLayerEvent$Pre = Java.loadClass("net.neoforged.neoforge.client.event.RenderGuiLayerEvent$Pre")
let $VanillaGuiLayers = Java.loadClass("net.neoforged.neoforge.client.gui.VanillaGuiLayers")
let $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
let $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
let $HashMap = Java.loadClass("java.util.HashMap")
let $Button = Java.loadClass("net.minecraft.client.gui.components.Button")
let $AbstractWidget = Java.loadClass("net.minecraft.client.gui.components.AbstractWidget")
let $DataComponents = Java.loadClass("net.minecraft.core.component.DataComponents")
let $Component$Serializer = Java.loadClass("net.minecraft.network.chat.Component$Serializer")


let DIVINE_MINT_SCREEN_TITLE = Component.translatable("milf.divine_mint.gui.title")

let DIVINE_MINT_GUI_1 = $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/divine_mint_gui_1.png")
let DIVINE_MINT_GUI_2 = $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/divine_mint_gui_2.png")

let MILF_BOSSES = global.milfBosses
let MILF_EFFECTS = global.milfEffects
let MILF_DIFFICULTIES = global.milfDifficulties

const maxInt = 2 ** 32
const TWO_PI = Math.PI * 2

let REELS_WIDTH = 176
let REELS_HEIGHT = 102

let ONE_REEL_WIDTH = 50
let ONE_REEL_HEIGHT = 86

let LEVER_TOP_SIZE = 33
let LEVER_ROD_LENGTH = 56
let LEVER_OFFSET = -20
let LEVER_BG_WIDTH = 23
let LEVER_BG_HEIGHT = 62

let COIN_ACCEPTOR_WIDTH= 33
let COIN_ACCEPTOR_HEIGHT = 86

let Y_OFFSET_FROM_CENTER = -26

let isFirstOpen = true


ItemEvents.firstRightClicked("milf:divine_mint", event => {
    if(isFirstOpen) {
        isFirstOpen = false
        Client.player.sendData("milf_divine_mint_sync_loot", { bosses: MILF_BOSSES })
    }

    Client.setScreen(new JavaAdapter($Screen, {

        guiScale: Client.window.guiScale,
        
        effectSelector: null,
        bossSelector: null,
        difficultySelector: null,
        infoBoxWidget: null,
        lever: null,
        tierSelector:null,
        coinAcceptor:null,

        areReelsSpinning:false,
        isCoinSequence: false,

        bossTier: "tier1",

        getInfoBox(){ return this.infoBoxWidget },

        init(){

            let entitiesToRender = {}

            Object.entries(MILF_BOSSES[this.bossTier]).forEach(([bossId, bossData], index) => {

                let entityType = $BuiltInRegistries.ENTITY_TYPE.get(new $ResourceLocation.parse(bossId))
                let entity = entityType.create(Client.level)
                entitiesToRender[bossId] = Object.assign({}, bossData, { entity: entity }) 

            })

            const guiScale = this.guiScale

            // const buttonWidth = 26 * guiScale
            // const buttonHeight = 6 * guiScale

            let centerX = ((this.width / 2) | 0)
            let centerY = ((this.height / 2) | 0)


            // this.spawnButton = this.addRenderableWidget(
            //     $Button.builder(Component.literal("TEST"), button => {
            //         //console.log("WHAT")
            //         Client.player.sendData("milf_divine_mint_boss", { id: this.bossSelector.getCurrentlySelectedID() })
            //         Client.player.sendData("milf_divine_mint_sync_loot", { bosses: MILF_BOSSES })
            //         //console.log(this.bossSelector.getCurrentlySelectedID());
                    
            //         //button.setFocused(false)
            //     }
            // )
            //         .bounds(centerX - buttonWidth / 2, centerY - buttonHeight / 2 - REELS_HEIGHT - 40, buttonWidth, buttonHeight)
            // .build())

            //BOSS_SELECTOR
            this.bossSelector = this.addRenderableWidget(
                createBossReelWidget(
                    ((this.width / 2) | 0) - ONE_REEL_WIDTH / 2, 
                    ((this.height / 2) | 0) - ONE_REEL_HEIGHT / 2 + Y_OFFSET_FROM_CENTER, 
                    ONE_REEL_WIDTH, ONE_REEL_HEIGHT, 
                    Component.literal("TEST")
                )
            )

            this.bossSelector.setItemsToRender(entitiesToRender)
            this.bossSelector.setParentScreen(this)
            this.bossSelector.setCurrentlySelectedID(Object.keys(entitiesToRender)[0])

            //EFFECT_SELECTOR
            this.effectSelector = this.addRenderableWidget(
                createEffectReelWidget(
                    ((this.width / 2) | 0) - ONE_REEL_WIDTH / 2 - ONE_REEL_WIDTH - 5, 
                    ((this.height / 2) | 0) - ONE_REEL_HEIGHT / 2 + Y_OFFSET_FROM_CENTER, 
                    ONE_REEL_WIDTH, ONE_REEL_HEIGHT, 
                    Component.literal("TEST")
                )
            )

            this.effectSelector.setItemsToRender(MILF_EFFECTS)

            this.effectSelector.setCurrentlySelectedID("minecraft:speed")
            this.effectSelector.setParentScreen(this)

            //DIFFICULTY_SELECTOR
            this.difficultySelector = this.addRenderableWidget(
                createDifficultyReelWidget(
                    ((this.width / 2) | 0) - ONE_REEL_WIDTH / 2 + ONE_REEL_WIDTH + 5,
                    ((this.height / 2) | 0) - ONE_REEL_HEIGHT / 2 + Y_OFFSET_FROM_CENTER,
                    ONE_REEL_WIDTH, ONE_REEL_HEIGHT,
                    Component.literal("TEST")
                )
            )

            this.difficultySelector.setItemsToRender(MILF_DIFFICULTIES)

            this.difficultySelector.setCurrentlySelectedID("normal")
            this.difficultySelector.setParentScreen(this)


            //LEVER
            this.lever = this.addRenderableWidget(
                createLeverWidget(
                    ((this.width / 2) | 0) + REELS_WIDTH / 2 + 8 - (LEVER_TOP_SIZE - LEVER_BG_WIDTH) / 2, 
                    ((this.height / 2) | 0) - REELS_HEIGHT / 2 + (REELS_HEIGHT - LEVER_BG_HEIGHT ) 
                        - (LEVER_ROD_LENGTH + LEVER_TOP_SIZE + LEVER_OFFSET) + Y_OFFSET_FROM_CENTER, 
                    LEVER_TOP_SIZE, 
                    (LEVER_ROD_LENGTH + LEVER_TOP_SIZE + LEVER_BG_HEIGHT), 
                    Component.literal("TEST")
                )
            )

            this.lever.setParentScreen(this)

            //INFO_BOX
            this.infoBoxWidget = this.addRenderableWidget(
                createInfoBoxWidget(
                    centerX - REELS_WIDTH / 2 + COIN_ACCEPTOR_WIDTH,
                    centerY - REELS_HEIGHT / 2 + Y_OFFSET_FROM_CENTER + REELS_HEIGHT + 9,
                    REELS_WIDTH - COIN_ACCEPTOR_WIDTH,
                    COIN_ACCEPTOR_HEIGHT,
                    Component.literal("TEST")
                )
            )

            this.infoBoxWidget.updateBossTier(this.bossTier)
            this.infoBoxWidget.updateBossNameAndID(entitiesToRender[this.bossSelector.getCurrentlySelectedID()].entity.getDisplayName(), this.bossSelector.getCurrentlySelectedID())
            this.infoBoxWidget.updateBossEffect({ resourceLocation: $ResourceLocation.parse("minecraft:textures/mob_effect/speed.png"), modifier: 1.4, effectID: "minecraft:speed" })
            this.infoBoxWidget.updateBossDifficulty({ resourceLocation: $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/difficulty/normal.png"), modifier: 1, name: Component.translatable("milf.divine_mint.gui.difficulty.normal") })

            //TIER_SELECTOR
            this.tierSelector = this.addRenderableWidget(
                createTierSelectorWidget(
                    centerX - REELS_WIDTH / 2,
                    centerY - REELS_HEIGHT / 2 + Y_OFFSET_FROM_CENTER + REELS_HEIGHT - 1,
                    REELS_WIDTH,
                    11,
                    Component.literal("TEST")
                )
            )

            this.tierSelector.setParentScreen(this)

            //COIN_ACCEPTOR
            this.coinAcceptor = this.addRenderableWidget(
                createCoinAcceptorWidget(
                    centerX - REELS_WIDTH / 2,
                    centerY - REELS_HEIGHT / 2 + Y_OFFSET_FROM_CENTER + REELS_HEIGHT + 9,
                    COIN_ACCEPTOR_WIDTH,
                    COIN_ACCEPTOR_HEIGHT,
                    Component.literal("TEST")
                )
            )

            this.coinAcceptor.setParentScreen(this)

        },

        isPauseScreen() { return false },

        tick() {
            this.lever.tick()

            this.bossSelector.tick()
            this.effectSelector.tick()
            this.difficultySelector.tick()

            this.tierSelector.tick()

            this.infoBoxWidget.tick()

            this.coinAcceptor.tick()

            this.super$tick()
            
        },

        render(guiGraphics, mouseX, mouseY, partialTick){

            //this.renderGoddess(guiGraphics, mouseX, mouseY, partialTick)

            this.super$render(guiGraphics, mouseX, mouseY, partialTick)


        },

        renderBackground(guiGraphics, mouseX, mouseY, partialTick){
            this.renderTransparentBackground(guiGraphics)

            this.renderReels(guiGraphics, mouseX, mouseY, partialTick)
        },

        renderReels(guiGraphics, mouseX, mouseY, partialTick){

            let baseX = ((this.width / 2) | 0) - REELS_WIDTH / 2
            let baseY = ((this.height / 2) | 0) - REELS_HEIGHT / 2 + Y_OFFSET_FROM_CENTER

            try {

                let pose = guiGraphics.pose()

                pose.pushPose()

                pose.translate(baseX, baseY, 0)
                //REELS
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, 0, 0, REELS_WIDTH, REELS_HEIGHT)
                //SPIN_TO_MINT
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, -34 - 4, 0, REELS_HEIGHT + COIN_ACCEPTOR_HEIGHT, REELS_WIDTH, 34)
                //COIN_ACCEPTOR
                //guiGraphics.blit(DIVINE_MINT_GUI_1, 0, REELS_HEIGHT + 9, 0, REELS_HEIGHT, COIN_ACCEPTOR_WIDTH, COIN_ACCEPTOR_HEIGHT)
                //INFO_BOX
                //guiGraphics.blit(DIVINE_MINT_GUI_1, COIN_ACCEPTOR_WIDTH, REELS_HEIGHT + 4, COIN_ACCEPTOR_WIDTH, REELS_HEIGHT, REELS_WIDTH - COIN_ACCEPTOR_WIDTH, COIN_ACCEPTOR_HEIGHT)
                
                pose.popPose()

                
            } catch (error) {
                console.log(error);
                
            }

            
        },

        renderGoddess(guiGraphics, mouseX, mouseY, partialTick){
            const guiScale = this.guiScale
            const Y_OFFSET = -14 * guiScale

            let baseX = (this.width / 2 )
            let basey = (this.height / 2) + Y_OFFSET

            try {
                guiGraphics.drawCenteredString(this.font, Component.translatable("milf.divine_mint.gui.goddess"), baseX, basey, 0xFFFFFF)
            } catch (error) {
                
            }


        },

        // mouseClicked(mouseX, mouseY, button){
        //     if(button == 0){
        //         if (this.spawnButton && !this.spawnButton.isHovered()) {
        //             this.spawnButton.visible = false
        //             return true
        //         }
        //     }
        //     let result = this.super$mouseClicked(mouseX, mouseY, button)
        //     this.setFocused(null)
        //     return result
        // },

        // mouseReleased(mouseX, mouseY, button) {
        //     if (button == 0) {
        //         this.spawnButton.visible = true
        //     }
        //     return this.super$mouseReleased(mouseX, mouseY, button)
        // },

        onLeverPull(){
            //console.log("WAHT");

            this.bossSelector.initiateSpin(60, true)
            this.effectSelector.initiateSpin(60, true)
            this.difficultySelector.initiateSpin(60, true)

            this.onReelsSpinStart()
            this.isCoinSequence = true

            milfPlayGUISound("milf:lever")
        },

        onReelsSpinStart(){
            this.lever.onReelsSpinStart()
            this.tierSelector.onReelsSpinStart()
            this.coinAcceptor.onReelsSpinStart()
            this.areReelsSpinning = true
        },

        onReelsSpinEnd(){
            if(this.areReelsSpinning){
                this.areReelsSpinning = false
                this.lever.onReelsSpinEnd()
                this.tierSelector.onReelsSpinEnd()
                this.coinAcceptor.onReelsSpinEnd()
                
                if(this.isCoinSequence){
                    this.isCoinSequence = false
                    this.coinAcceptor.dropCoin()
                }
            }
        },

        onTierSelect(tier){
            //console.log(tier);

            this.bossTier = "tier" + tier

            let entitiesToRender = {}

            Object.entries(MILF_BOSSES[this.bossTier]).forEach(([bossId, bossData], index) => {

                let entityType = $BuiltInRegistries.ENTITY_TYPE.get(new $ResourceLocation.parse(bossId))
                let entity = entityType.create(Client.level)
                // if (bossId == "mythsandlegends:black_charro") {
                //     entity.getAnimatableInstanceCache()
                //         .getManagerForId(entity.getId())
                //         .getAnimationControllers()
                //         .get("controller")
                //         .tryTriggerAnimation("rage")
                //     for (let index = 0; index < 60; index++) {
                //         entity.tick()
                //     }
                    
                    
                // }
                entitiesToRender[bossId] = Object.assign({}, bossData, { entity: entity }) 

            })

            this.bossSelector.changeItemsToRender(entitiesToRender, 20, { newTier: this.bossTier })

            // this.bossSelector.setItemsToRender(entitiesToRender)
            // this.bossSelector.setCurrentlySelectedID(Object.keys(entitiesToRender)[0])

            //this.bossSelector.mouseReleased(0, 0, 0)
            //this.bossSelector.initiateSpin(15, true)
            this.areReelsSpinning = true
            this.lever.onReelsSpinStart()

            // this.infoBoxWidget.updateBossTier(this.bossTier)
            // this.infoBoxWidget.updateBossNameAndID(entitiesToRender[this.bossSelector.getCurrentlySelectedID()].entity.getDisplayName(), this.bossSelector.getCurrentlySelectedID())


        }

    }, DIVINE_MINT_SCREEN_TITLE))
})

function createBossReelWidget(x, y, width, height, component){
    
    let overrides = {
        ENTITY_SCALE: 7,

        getRenderContext(guiGraphics) {
            return {
                clientDispatcher: Client.getEntityRenderDispatcher(),
                clientBuffer: guiGraphics.bufferSource(),
                guiGraphics: guiGraphics
            }
        },

        poseIndexTransformations(pose, index, selectorRot) {
            pose.mulPose($Axis.XN.rotation(selectorRot))
            pose.mulPose($Axis.XP.rotation(TWO_PI / this.TO_RENDER_SIZE * index))
            pose.translate(0, 0, this.SELECTOR_RADIUS)

            pose.mulPose($Axis.XP.rotation(Math.PI))
            pose.mulPose($Axis.YP.rotation(Math.PI))
        },

        renderSelected(pose, renderContext, entityData, bossId) {

            //console.log(entityData);
            
            let angle = Math.sin(this.guiTicks)

            if (entityData.fakeItemToRender){
                let { guiGraphics } = renderContext

                let item = Item.of(entityData.fakeItemToRender)

                pose.mulPose($Axis.XP.rotation(Math.PI))
                pose.mulPose($Axis.YP.rotation(Math.PI))

                pose.translate(0,0,-40)

                pose.scale(2, 2, 1)

                //pose.translate(-8, -8, 0)

                //pose.mulPose($Axis.YP.rotation(angle / (2 * 1.5)))
                pose.mulPose($Axis.ZN.rotation(angle / (5 * 1.5)))



                guiGraphics.renderFakeItem(item, -8, -8)

                return
                
            }

            let { clientDispatcher, clientBuffer } = renderContext

            let entity = entityData.entity

            pose.translate(0, -8, 0)

            pose.scale(this.ENTITY_SCALE, this.ENTITY_SCALE, 1)

            pose.mulPose($Axis.YP.rotation(angle / (2 * 1.5)))
            pose.mulPose($Axis.ZN.rotation(angle / (7 * 1.5)))

            let brightness = 0xF000F0

            clientDispatcher.render(entity, 0, 0, 0, 0, 0,
                pose, clientBuffer, brightness)

            clientBuffer.endBatch()
        },

        renderOther(pose, renderContext, entityData, index) {
            let difference = index - (this.currentlySelectedDec)
            const TO_RENDER_SIZE = this.TO_RENDER_SIZE
            difference = ((difference + TO_RENDER_SIZE / 2) % TO_RENDER_SIZE + TO_RENDER_SIZE) % TO_RENDER_SIZE - TO_RENDER_SIZE / 2
            let distanceToSelected = Math.abs(difference)

            let scaleFactor = easeInOutCubic(0.8 / Math.pow(Math.max(distanceToSelected * 1.3, 0.9), 1.5))

            if (scaleFactor > 0.1) {

                if (entityData.fakeItemToRender) {
                    let { guiGraphics } = renderContext

                    let item = Item.of(entityData.fakeItemToRender)

                    pose.mulPose($Axis.XP.rotation(Math.PI))
                    pose.mulPose($Axis.YP.rotation(Math.PI))

                    pose.translate(0, 0, -40)

                    pose.scale(2, 2, 1)
                    pose.scale(scaleFactor, scaleFactor, scaleFactor)

                    guiGraphics.renderFakeItem(item, -8, -8)

                    return

                }

                let entity = entityData.entity
                let { clientDispatcher, clientBuffer } = renderContext
                pose.translate(0, -8, 0)

                pose.scale(this.ENTITY_SCALE, this.ENTITY_SCALE, 1)
                pose.scale(scaleFactor, scaleFactor, scaleFactor)

                let brightness = 0x300030

                clientDispatcher.render(entity, 0, 0, 0, 0, 0,
                    pose, clientBuffer, brightness)


                clientBuffer.endBatch()
            }
        },

        onItemsChange(onChangeContext){
            this.reelParentScreen.getInfoBox().updateBossTier(onChangeContext.newTier)
            this.reelParentScreen.getInfoBox().updateBossNameAndID(this.itemsToRenderEntries[this.getCurrentlySelectedID()].entity.getDisplayName(), this.getCurrentlySelectedID())
        },

        onNewItemSelected(bossID) {
            this.reelParentScreen.getInfoBox().updateBossNameAndID(this.itemsToRenderEntries[bossID].entity.getDisplayName(), bossID)
        },

        onMouseReleaseAdditional() {
            //this.reelParentScreen.getInfoBox().updateBossName(this.itemsToRenderEntries[this.currentlySelectedId].entity.getDisplayName())
        },

    }

    return createReelWidget(x, y, width, height, component, overrides)

}

function createEffectReelWidget(x, y, width, height, component) {

    let overrides = {
        onNewItemSelected(effectID) {
            let effectData = this.itemsToRenderEntries[effectID]
            this.reelParentScreen.getInfoBox().updateBossEffect(Object.assign({}, effectData, { effectID: effectID }) )
        }
    }

    return createBasicRLReelWidget(x, y, width, height, component, overrides)

}

function createDifficultyReelWidget(x, y, width, height, component) {

    let overrides = {
        onNewItemSelected(difficulty) {
            let difficultyData = this.itemsToRenderEntries[difficulty]
            this.reelParentScreen.getInfoBox().updateBossDifficulty(Object.assign({}, difficultyData, { difficultyID: difficulty }))
        }
    }

    return createBasicRLReelWidget(x, y, width, height, component, overrides)

}

function createBasicRLReelWidget(x, y, width, height, component, overrides) {

    const BasicRLReelWidget = {
        ICON_SCALE: 2,

        getRenderContext(guiGraphics) {
            return {
                guiGraphics: guiGraphics
            }
        },

        poseIndexTransformations(pose, index, selectorRot) {
            pose.mulPose($Axis.XN.rotation(selectorRot))
            pose.mulPose($Axis.XP.rotation(TWO_PI / this.TO_RENDER_SIZE * index))
            pose.translate(0, 0, this.SELECTOR_RADIUS)

            // pose.mulPose($Axis.XP.rotation(Math.PI))
            // pose.mulPose($Axis.YP.rotation(Math.PI))
        },

        renderSelected(pose, renderContext, effectData, effectID) {

            let { guiGraphics } = renderContext

            let resourceLocation = effectData.resourceLocation

            pose.scale(this.ICON_SCALE, this.ICON_SCALE, 1)

            //pose.translate(-8, -8, 0)

            let angle = Math.sin(this.guiTicks)
            pose.mulPose($Axis.YP.rotation(angle / (2 * 1.5)))
            pose.mulPose($Axis.ZN.rotation(angle / (7 * 1.5)))

            guiGraphics.blit(resourceLocation, -9, -9, 0, 0, 18, 18, 18, 18)
        },

        renderOther(pose, renderContext, effectData, index) {
            let difference = index - (this.currentlySelectedDec)
            const TO_RENDER_SIZE = this.TO_RENDER_SIZE
            difference = ((difference + TO_RENDER_SIZE / 2) % TO_RENDER_SIZE + TO_RENDER_SIZE) % TO_RENDER_SIZE - TO_RENDER_SIZE / 2
            let distanceToSelected = Math.abs(difference)

            let scaleFactor = easeInOutCubic(0.8 / Math.pow(Math.max(distanceToSelected * 1.3, 0.9), 1.5))

            if (scaleFactor > 0.01) {
                let resourceLocation = effectData.resourceLocation
                let { guiGraphics } = renderContext

                pose.scale(this.ICON_SCALE, this.ICON_SCALE, 1)
                pose.scale(scaleFactor, scaleFactor, scaleFactor)

                //pose.translate(-8, -8, 0)


                guiGraphics.blit(resourceLocation, -9, -9, 0, 0, 18, 18, 18, 18)
            }
        }
    }

    overrides = Object.assign({}, BasicRLReelWidget, overrides)

    return createReelWidget(x, y, width, height, component, overrides)

}

function createReelWidget(x, y, width, height, component, overrides) {

    const AbstractReelWidget = {

        itemsToRenderEntries: {},
        nextItemsToRenderEntries: {},

        selectorRot: 0,
        guiTicks: 0,
        reelParentScreen:null,

        currentlySelectedId: null,
        currentlySelectedDec: 0,
        currentlySelectedIndex: 0,
        lastSelectedIndex: 0,
        targetRotation: 0,
        prevSelectorRot: 0,

        isDragging: false,

        TO_RENDER_SIZE: 0,
        SELECTOR_RADIUS: 60,

        isSpinningWithEasing: false,
        isSpinning: false,
        spinTicks:0,

        itemsChangeTicks: 0,
        itemsChangeTotalTicks: 0,
        onChangeContext: { },

        setItemsToRender(items) {
            this.itemsToRenderEntries = items
            this.TO_RENDER_SIZE = Object.keys(items).length
            this.setCurrentlySelectedID(Object.keys(items)[0])
        },

        setParentScreen(screen) {
            this.reelParentScreen = screen
        },

        setCurrentlySelectedID(ID) {
            this.currentlySelectedId = ID
        },

        getCurrentlySelectedID(){
            return this.currentlySelectedId
        },

        renderWidget(guiGraphics, mouseX, mouseY, partialTick) {

            //const ENTITY_SCALE = this.ENTITY_SCALE
            const TO_RENDER_SIZE = this.TO_RENDER_SIZE

            const BOSS_BAIT_SELECTOR_OFFSET = Math.PI / TO_RENDER_SIZE
            const SELECTOR_RADIUS = this.SELECTOR_RADIUS
            const [baseX, baseY] = [this.getX(), this.getY()]

            const pose = guiGraphics.pose()

            let diff = this.selectorRot - this.prevSelectorRot
            diff = ((diff % TWO_PI) + TWO_PI) % TWO_PI
            if (diff > Math.PI) diff -= TWO_PI

            let selectorRot = this.isDragging ? this.selectorRot : this.prevSelectorRot + diff * Client.getTimer().getGameTimeDeltaPartialTick(false)
            let rotAngle = selectorRot + BOSS_BAIT_SELECTOR_OFFSET
            rotAngle = ((rotAngle % TWO_PI) + TWO_PI) % TWO_PI


            this.currentlySelectedDec = ((rotAngle - BOSS_BAIT_SELECTOR_OFFSET) / TWO_PI) * TO_RENDER_SIZE
            this.currentlySelectedIndex = Math.round(this.currentlySelectedDec) % TO_RENDER_SIZE

            if (this.lastSelectedIndex != this.currentlySelectedIndex) {
                this.guiTicks = 0
                this.lastSelectedIndex = this.currentlySelectedIndex
                milfPlayGUISound("milf:reels_tick", { pitch: Math.random() * (1.3 - 0.9) + 0.9 })
            }

            try {

                guiGraphics.enableScissor(
                    baseX,
                    baseY,
                    baseX + ONE_REEL_WIDTH,
                    baseY + ONE_REEL_HEIGHT
                )

                pose.pushPose()

                pose.translate(baseX, baseY, 10)

                pose.pushPose()

                pose.translate(ONE_REEL_WIDTH / 2, ONE_REEL_HEIGHT / 2, 100)

                this.guiTicks += partialTick * 0.03

                let renderContext = this.getRenderContext(guiGraphics)

                Object.entries(this.itemsToRenderEntries).forEach(([itemID, itemData], index) => {

                    pose.pushPose()
                    this.poseIndexTransformations(pose, index, selectorRot)

                    if (this.currentlySelectedIndex == index) {
                        if (this.currentlySelectedId != itemID) {
                            this.currentlySelectedId = itemID
                            this.onNewItemSelected(itemID)
                        }
                        this.renderSelected(pose, renderContext, itemData, itemID)
                    } else {
                        this.renderOther(pose, renderContext, itemData, index)
                    }

                    pose.popPose()

                })


                pose.popPose()

                pose.pushPose()

                pose.translate(0, ONE_REEL_HEIGHT * this.currentlySelectedDec / TO_RENDER_SIZE * 2, 0)
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, REELS_WIDTH, 0, ONE_REEL_WIDTH, 2 * ONE_REEL_HEIGHT)
                pose.translate(0, -ONE_REEL_HEIGHT * 2, 0)
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, REELS_WIDTH, 0, ONE_REEL_WIDTH, 2 * ONE_REEL_HEIGHT)

                pose.popPose()

                guiGraphics.disableScissor()

                pose.popPose()

            } catch (error) {
                console.log(error);

            }
        },

        getRenderContext(guiGraphics) {
            //all the additional stuff that is required to render stuff
            return { }
        },

        onNewItemSelected(itemID){
            //runs whenever a new item is selected
        },

        poseIndexTransformations(pose, index, selectorRot) {
            //how to apply current selector rotation to pose
        },

        renderSelected(pose, renderContext, itemData, itemId) {
            //how to render the currently selected item
        },

        renderOther(pose, renderContext, itemData, index) {
            //how to render the other items
        },

        onMouseReleaseAdditional() {
            //to pass data or smt
        },

        onItemsChange(onChangeContext){

        },

        changeItemsToRender(items, ticks, onChangeContext){

            this.nextItemsToRenderEntries = items
            this.onChangeContext = onChangeContext

            this.isSpinning = true
            this.itemsChangeTicks = ticks
            this.itemsChangeTotalTicks = ticks
        },

        mouseClicked(mouseX, mouseY, button) {
            if (button == 0 && this.isMouseOver(mouseX, mouseY) && !this.isSpinning) {
                this.isDragging = true
                return true
            }
            return false
        },

        mouseDragged(mouseX, mouseY, button, deltaX, deltaY) {
            if (button == 0 && !this.isSpinning) {
                this.prevSelectorRot = this.selectorRot

                const sensitivity = 0.11
                let rawDelta = deltaY * sensitivity
                let nextSelectionDelta = Math.min(Math.max(Math.abs(this.currentlySelectedIndex - this.currentlySelectedDec), 0.15), 1)

                const easePower = 1.5
                let adjustedDelta = rawDelta * Math.pow(nextSelectionDelta, easePower)
                this.selectorRot += adjustedDelta
                return true

            }
        },

        tick() {
            if (!this.isDragging && this.spinTicks == 0 && this.itemsChangeTicks == 0) {
                this.prevSelectorRot = this.selectorRot

                let delta = this.targetRotation - this.selectorRot

                delta = ((delta % TWO_PI) + TWO_PI) % TWO_PI
                if (delta > Math.PI) {
                    delta -= TWO_PI
                }

                const snapThreshold = 0.04
                if (Math.abs(delta) < snapThreshold) {
                    this.selectorRot = this.targetRotation
                } else {
                    this.selectorRot += Math.sign(delta) * Math.min(Math.pow(Math.abs(delta), 2), 0.35)
                }
            }
            if(this.spinTicks > 0){

                this.prevSelectorRot = this.selectorRot

                this.spinTicks--

                let CEILING_TICKS = 30

                let increment = Math.PI / 5

                if (this.isSpinningWithEasing && this.spinTicks <= CEILING_TICKS){
                    let t = this.spinTicks / CEILING_TICKS
                    increment = increment * (1 - Math.pow(1 - t, 2))
                }


                this.selectorRot += increment
    
                if (this.spinTicks == 0) {
                    this.isSpinning = false
                    this.isSpinningWithEasing = false
                    this.targetRotation = this.currentlySelectedIndex * (TWO_PI) / this.TO_RENDER_SIZE
                    this.reelParentScreen.onReelsSpinEnd()
                }
            }
            if(this.itemsChangeTicks > 0){
                this.prevSelectorRot = this.selectorRot

                let t = this.itemsChangeTicks / this.itemsChangeTotalTicks

                let increment = Math.PI / 2.3
                
                increment = increment * easeZeroOneZero(t, 2)                         

                this.selectorRot += increment

                this.itemsChangeTicks--

                if (this.itemsChangeTicks == (this.itemsChangeTotalTicks / 2) | 0){
                    this.setItemsToRender(this.nextItemsToRenderEntries)
                    this.onItemsChange(this.onChangeContext)
                }


                if (this.itemsChangeTicks == 0){
                    this.isSpinning = false
                    this.targetRotation = this.currentlySelectedIndex * (TWO_PI) / this.TO_RENDER_SIZE
                    this.reelParentScreen.onReelsSpinEnd()
                }
            }
        },

        mouseReleased(mouseX, mouseY, button) {
            this.isDragging = false
            if (button == 0 && !this.isSpinning) {
                this.targetRotation = this.currentlySelectedIndex * (TWO_PI) / this.TO_RENDER_SIZE
                this.onMouseReleaseAdditional()
            }
            return this.super$mouseReleased(mouseX, mouseY, button)
        },

        initiateSpin(ticks, withEasing){
            if (withEasing) this.isSpinningWithEasing = true
            this.isSpinning = true
            this.spinTicks = ticks
        },

        updateWidgetNarration(narrationElementOutput) { }

    }

    let ReelWidgetImpl = Object.assign({}, AbstractReelWidget, overrides)

    return new JavaAdapter($AbstractWidget, ReelWidgetImpl, x, y, width, height, component)
    
}

function createInfoBoxWidget(x, y, width, height, component) {
    return new JavaAdapter($AbstractWidget, {

        bossName: null,
        bossNameWrapped: [],
        bossID:null,
        bossData: {},
        bossTier: "tier1",

        lootRowToDisplay:1,
        totalLootRows:1,
        guiTicks:1,

        effectRL: null,
        effectModifier: 1,
        effectName:null,
        effectID: null,

        bossDifficultyRL: null,
        bossDifficultyModifier: 1,
        difficultyName:null,
        difficultyID: null,

        lootModifier: 1,

        infoBoxParentScreen: null,
        textScale: 1,

        setParentScreen(screen) {
            this.infoBoxParentScreen = screen
        },

        getDataForCoin(){
            return {
                bossName: this.bossName,
                bossID: this.bossID,
                bossTier: this.bossTier,

                effectName: this.effectName,
                effectID: this.effectID,

                difficultyName: this.difficultyName,
                difficultyID: this.difficultyID,

                lootModifier: this.lootModifier.toFixed(1)
            }
        },

        renderWidget(guiGraphics, mouseX, mouseY, partialTick) {

            try {

                let pose = guiGraphics.pose()
                pose.pushPose()
                pose.translate(x, y, 0)

                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, COIN_ACCEPTOR_WIDTH, REELS_HEIGHT, REELS_WIDTH - COIN_ACCEPTOR_WIDTH, COIN_ACCEPTOR_HEIGHT)

                pose.pushPose()
                pose.translate(6, 7, 0)
                pose.pushPose()
                pose.scale(this.textScale, this.textScale, 1)

                let tempIndex = 0
                this.bossNameWrapped.forEach(line => {
                    guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.util.FormattedCharSequence,int,int,int,boolean)"](
                        Client.font, line, 0, tempIndex * (Client.font.lineHeight + 2), 0xfffef7, true
                    )
                    tempIndex++
                })

                pose.translate(0, tempIndex * (Client.font.lineHeight + 2), 0)
                pose.scale(0.8, 0.8, 1)

                guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)"](
                    Client.font, this.effectName, 0, 0, 0xfffef7, true
                )

                guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)"](
                    Client.font, this.difficultyName, 0, (Client.font.lineHeight + 2), 0xfffef7, true
                )

                pose.popPose()

                pose.translate(0, 56, 0)

                guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)"](
                    Client.font, Component.translatable("milf.divine_mint.gui.possible_loot"), -3, -(Client.font.lineHeight + 3), 0x6f2d1c, false
                )

                tempIndex = 0

                if(this.bossData?.loot){
                    //let lootSize = this.bossData.loot.length

                    //console.log(lootSize);
                    
                    this.bossData.loot.forEach((itemData, index) =>{

                        let right = (this.lootRowToDisplay) * 4 - 1
                        let left = right - 3

                        if(left <= index && index <= right){
                            let itemID = Object.keys(itemData)[0]
                            let item = Item.of(itemID)

                            let { count, chance } = itemData[itemID]

                            guiGraphics.renderFakeItem(item, 23 * tempIndex, 0)
                            guiGraphics.renderItemDecorations(Client.font, item, 23 * tempIndex, 0, count)
                            tempIndex++
                            
                        }

                    })

                    //if (this.totalLootRows > 1) guiGraphics.renderItemDecorations(Client.font, Item.of("minecraft:dirt"), 23 * tempIndex - 10, 0, "...")
                }

                

                pose.popPose()

                let modifiersOffsetX = REELS_WIDTH - COIN_ACCEPTOR_WIDTH - 24

                guiGraphics.blit(this.effectRL, modifiersOffsetX, 6, 0, 0, 18, 18, 18, 18)

                guiGraphics.blit(this.bossDifficultyRL, modifiersOffsetX, 6 + 20 + 3, 0, 0, 18, 18, 18, 18)

                guiGraphics.drawCenteredString(Client.font, this.lootModifier.toFixed(1), modifiersOffsetX + 9, 6 + 20 + 3 + 38, 0xfffef7)

                pose.popPose()

            } catch (error) {
                console.log(error);

            }


        },

        tick() {
            if(this.totalLootRows > 1){
                this.guiTicks++

                if (this.guiTicks >= 38){
                    this.guiTicks = 0

                    this.lootRowToDisplay = this.lootRowToDisplay == this.totalLootRows ? 1 : this.lootRowToDisplay + 1

                }
            }
        },

        updateBossNameAndID(name, id){
            this.bossName = name
            this.bossNameWrapped = Client.font.split(name, (REELS_WIDTH - COIN_ACCEPTOR_WIDTH - 36) / this.textScale)
            this.bossID = id
            this.bossData = MILF_BOSSES[this.bossTier][id]

            let lootSize = this.bossData.loot?.length || 0
            this.totalLootRows = Math.ceil(lootSize / 4)
            this.lootRowToDisplay = 1

            //console.log(this.totalLootRows);
            
            //console.log(this.bossData);
            
        },

        updateBossTier(tier){
            this.bossTier = tier
        },

        updateBossEffect(effectData) {
            this.effectRL = effectData.resourceLocation
            this.effectModifier = effectData.modifier
            this.lootModifier = this.effectModifier * this.bossDifficultyModifier
            this.effectID = effectData.effectID

            let effect = $BuiltInRegistries.MOB_EFFECT.get($ResourceLocation.parse(effectData.effectID))
            this.effectName = effect ? effect.getDisplayName() : Component.translatable("milf.divine_mint.gui.no_effect")
            this.effectName = Component.of("◆ ").append(this.effectName)
            //console.log(this.effectName);
            
        },

        updateBossDifficulty(difficultyData) {
            this.bossDifficultyRL = difficultyData.resourceLocation
            this.bossDifficultyModifier = difficultyData.modifier
            this.lootModifier = this.effectModifier * this.bossDifficultyModifier

            this.difficultyID = difficultyData.difficultyID

            this.difficultyName = difficultyData.name
            this.difficultyName = Component.of("◆ ").append(this.difficultyName)
        },

        mouseClicked(mouseX, mouseY, button) {
            return false
        },

        updateWidgetNarration(narrationElementOutput) { }

    },
        x, y, width, height, component
    )
}

function createLeverWidget(x, y, width, height, component) {
    return new JavaAdapter($AbstractWidget, {

        pullingProgress: 0,
        prevPullingProgress: 0,
        isDragging:false,
        leverParentScreen: null,

        areReelsSpinning: false,

        setParentScreen(screen){            
            this.leverParentScreen = screen
        },

        renderWidget(guiGraphics, mouseX, mouseY, partialTick) {

            let pullingProgress = this.isDragging ? this.pullingProgress : this.prevPullingProgress + (this.pullingProgress - this.prevPullingProgress) * Client.getTimer().getGameTimeDeltaPartialTick(false)
            try {

                let pose = guiGraphics.pose()
                let Y_OFFSET_TO_CENTER = (LEVER_ROD_LENGTH + LEVER_TOP_SIZE + LEVER_OFFSET)
                pose.pushPose()
                pose.translate(x, y + Y_OFFSET_TO_CENTER, 0)
                pose.pushPose()
                pose.translate((LEVER_TOP_SIZE - LEVER_BG_WIDTH) / 2, 0, 0)

                //LEVER_BG
                guiGraphics.blit(DIVINE_MINT_GUI_2, 0, 0, LEVER_TOP_SIZE, 0, LEVER_BG_WIDTH, LEVER_BG_HEIGHT)
                pose.popPose()
                let Y_OFFSET_FOR_LEVER = -(LEVER_ROD_LENGTH + LEVER_TOP_SIZE + LEVER_OFFSET)
                let Y_OFFSET_FROM_PROGRESS = pullingProgress * LEVER_ROD_LENGTH * 2.5
                let Y_OFFSET_FOR_ROD = -(pullingProgress * 3.5 * LEVER_TOP_SIZE)

                pose.translate(0, Y_OFFSET_FOR_LEVER, 0)
                pose.translate(0, Y_OFFSET_FROM_PROGRESS, 0)

                //LEVER_ROD
                pose.pushPose()
                let leverRodAtlasY = LEVER_TOP_SIZE
                pose.translate(0, Y_OFFSET_FOR_ROD, 0)

                let scissorsY = y
                    + Y_OFFSET_TO_CENTER
                    + Y_OFFSET_FOR_LEVER
                    + Y_OFFSET_FROM_PROGRESS
                    + Y_OFFSET_FOR_ROD
                    + (LEVER_TOP_SIZE - 2)


                if (pullingProgress > 0.5){
                    leverRodAtlasY += LEVER_ROD_LENGTH
                    scissorsY = scissorsY + LEVER_ROD_LENGTH
                    
                    pose.translate(0, LEVER_ROD_LENGTH, 0)

                    guiGraphics.enableScissor(
                        x,
                        scissorsY,
                        x + LEVER_TOP_SIZE,
                        scissorsY + LEVER_ROD_LENGTH * (pullingProgress - 0.5) * 2
                    )
                    guiGraphics.blit(DIVINE_MINT_GUI_2, 0, LEVER_TOP_SIZE - 2, 0, leverRodAtlasY, LEVER_TOP_SIZE, LEVER_ROD_LENGTH)
                } else {
                    scissorsY = scissorsY + (pullingProgress) * LEVER_ROD_LENGTH * 2

                    guiGraphics.enableScissor(
                        x,
                        scissorsY,
                        x + LEVER_TOP_SIZE,
                        scissorsY + LEVER_ROD_LENGTH
                    )
                    guiGraphics.blit(DIVINE_MINT_GUI_2, 0, LEVER_TOP_SIZE - 2, 0, leverRodAtlasY, LEVER_TOP_SIZE, LEVER_ROD_LENGTH)
                }

                guiGraphics.disableScissor()

                pose.popPose()
                //LEVER_TOP
                guiGraphics.blit(DIVINE_MINT_GUI_2, 0, 0, 0, 0, LEVER_TOP_SIZE, LEVER_TOP_SIZE)


                pose.popPose()
            } catch (error) {
                console.log(error);
                
            }


        },

        tick() {
            this.prevPullingProgress = this.pullingProgress
            if (!this.isDragging && this.pullingProgress != 0) {
                const baseSpeed = 0.05
                const easePower = 6

                let decayFactor = Math.pow(1.6 - this.pullingProgress, easePower)
                let delta = baseSpeed * decayFactor

                this.pullingProgress = Math.max(this.pullingProgress - delta, 0)
                //milfPlayGUISound("milf:reels_tick", { pitch: Math.random() * (1.3 - 0.9) + 0.9 })

            }
        },

        mouseClicked(mouseX, mouseY, button) {
            if (button == 0 && this.isMouseOver(mouseX, mouseY) && !this.areReelsSpinning) {
                this.isDragging = true
                return true
            }
            return false
        },

        mouseDragged(mouseX, mouseY, button, deltaX, deltaY) {
            if (button == 0 && !this.areReelsSpinning) {
                const sensitivity = 0.065
                let rawDelta = deltaY * sensitivity
                let progress = this.pullingProgress

                let t = Math.abs(progress - 0.5) * 2
                t = Math.min(1, Math.max(0, t))

                const easePower = 3
                const minFactor = 0.03

                let factor = minFactor + (1 - minFactor) * Math.pow(t, easePower)

                let adjustedDelta = rawDelta * factor
                this.prevPullingProgress = this.pullingProgress
                this.pullingProgress = Math.min(Math.max(this.pullingProgress + adjustedDelta, 0), 1)
                return true
            }
            return this.super$mouseDragged(mouseX, mouseY, button, deltaX, deltaY);
        },

        mouseReleased(mouseX, mouseY, button) {
            this.isDragging = false
            if (this.pullingProgress >= 0.96){
                this.leverParentScreen.onLeverPull()
            }
            return this.super$mouseReleased(mouseX, mouseY, button)
        },

        onReelsSpinStart(){
            this.areReelsSpinning = true
        },

        onReelsSpinEnd() {
            this.areReelsSpinning = false
        },

        updateWidgetNarration(narrationElementOutput) { }

    },
        x, y, width, height, component
    )
}

function createTierSelectorWidget(x, y, width, height, component) {
    return new JavaAdapter($AbstractWidget, {

        distanceProgress: (6 - 4) * (1 / (REELS_WIDTH - 7)),
        prevDistanceProgress: (6 - 4) * (1 / (REELS_WIDTH - 7)),
        targetProgress: (6 - 4) * (1 / (REELS_WIDTH - 7)),

        firstPointProgress: 6 * (1 / (REELS_WIDTH - 7)),
        pointsOffsetProgress: 55 * (1 / (REELS_WIDTH - 7)),

        isDragging: false,
        tierSelectorParentScreen: null,
        currentlySelectedTier: 1,

        areReelsSpinning: false,
        

        setParentScreen(screen) {
            this.tierSelectorParentScreen = screen
        },

        renderWidget(guiGraphics, mouseX, mouseY, partialTick) {

            let distanceProgress = this.isDragging ? this.distanceProgress : this.prevDistanceProgress + (this.distanceProgress - this.prevDistanceProgress) * Client.getTimer().getGameTimeDeltaPartialTick(false)
            try {                

                let pose = guiGraphics.pose()
                pose.pushPose()
                pose.translate(x, y, 0)
                pose.pushPose()
                pose.translate(0, 0, 0)

                //BG
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, 0, REELS_HEIGHT + COIN_ACCEPTOR_HEIGHT + 34, REELS_WIDTH, 11)
                pose.popPose()

                //SELECTOR
                pose.translate((REELS_WIDTH - 7) * distanceProgress, 0, 0)
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, 0, REELS_HEIGHT + COIN_ACCEPTOR_HEIGHT + 34 + 11, 7, 11)
                pose.popPose()
            } catch (error) {
                console.log(error);

            }


        },

        tick() {
            if (!this.isDragging) {
                this.prevDistanceProgress = this.distanceProgress

                let delta = this.targetProgress - this.distanceProgress

                const snapThreshold = 0.04

                if (Math.abs(delta) < snapThreshold) {
                    this.distanceProgress = this.targetProgress
                } else {
                    this.distanceProgress += Math.sign(delta) * Math.min(Math.pow(Math.abs(delta), 2), 0.1)
                }
            }
        },

        mouseClicked(mouseX, mouseY, button) {
            if (button == 0 && this.isMouseOver(mouseX, mouseY) && !this.areReelsSpinning ) {
                this.isDragging = true
                return true
            }
            return false
        },

        mouseDragged(mouseX, mouseY, button, deltaX, deltaY) {
            if (button == 0 && !this.areReelsSpinning) {
                const sensitivity = 0.015
                let rawDelta = deltaX * sensitivity
                let progress = this.distanceProgress

                let firstPoint = this.firstPointProgress
                let pointsOffset = this.pointsOffsetProgress

                let t = Math.abs(Math.sin((progress - firstPoint) * Math.PI / pointsOffset))
                //t = Math.min(1, Math.max(0, t))

                const easePower = 2
                const minFactor = 0.01

                let factor = minFactor + (1 - minFactor) * Math.pow(t, easePower)

                let adjustedDelta = rawDelta * factor
                this.prevDistanceProgress = this.distanceProgress
                this.distanceProgress = Math.min(Math.max(this.distanceProgress + adjustedDelta, 0), 1)
                return true
            }
            return this.super$mouseDragged(mouseX, mouseY, button, deltaX, deltaY);
        },

        mouseReleased(mouseX, mouseY, button) {

            if (this.areReelsSpinning) return this.super$mouseReleased(mouseX, mouseY, button)
            this.isDragging = false

            let offset = this.pointsOffsetProgress
            let first = this.firstPointProgress

            let t = (this.distanceProgress - first) / offset
            //console.log(t)
            
            let index = Math.round(t)
            //console.log(index);
            
            index = Math.max(0, Math.min(3, index))
            let nearestPoint = index
            
            this.targetProgress = first + nearestPoint * offset - 4 * (1 / (REELS_WIDTH - 7))
            //this.prevDistanceProgress = this.distanceProgress

            let selectedTier = index + 1

            if (this.currentlySelectedTier != selectedTier){
                this.tierSelectorParentScreen.onTierSelect(selectedTier)
                this.currentlySelectedTier = selectedTier
            }
            
            
            return this.super$mouseReleased(mouseX, mouseY, button)
        },

        onReelsSpinStart() {
            this.areReelsSpinning = true
        },

        onReelsSpinEnd() {
            this.areReelsSpinning = false
        },

        updateWidgetNarration(narrationElementOutput) { }

    },
        x, y, width, height, component
    )
}

function createCoinAcceptorWidget(x, y, width, height, component) {
    return new JavaAdapter($AbstractWidget, {


        coinAcceptorParentScreen: null,
        areReelsSpinning: false,

        isCoinDropped: false,
        coinItemStack: null,
        coinData: null,

        coinTooltip: null,
        coinTooltipHeight: 0,
        coinTooltipWidth: 0,

        coinProgress:0,
        prevCoinProgress:0,


        setParentScreen(screen) {
            this.coinAcceptorParentScreen = screen
        },

        renderWidget( guiGraphics, mouseX, mouseY, partialTick) {

            try {

                let pose = guiGraphics.pose()
                pose.pushPose()
                pose.translate(x, y, 0)
                pose.pushPose()
                pose.translate(0, 0, 0)

                //BG
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, 0, REELS_HEIGHT, COIN_ACCEPTOR_WIDTH, COIN_ACCEPTOR_HEIGHT)
                pose.popPose()

                //COIN
                if(this.isCoinDropped){

                    let coinProgress = this.prevCoinProgress + (this.coinProgress - this.prevCoinProgress) * Client.getTimer().getGameTimeDeltaPartialTick(false)

                    let yOffset = 58 * coinProgress
                    pose.translate(14, yOffset, 0)

                    guiGraphics.enableScissor(
                        x,
                        y + (COIN_ACCEPTOR_HEIGHT - 28),
                        x + COIN_ACCEPTOR_WIDTH,
                        y + COIN_ACCEPTOR_HEIGHT
                    )

                    if (this.isHovered()){
                        //pose.translate(14, 58, 0)
                        guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, 10, REELS_HEIGHT + COIN_ACCEPTOR_HEIGHT + 34 + 11, 5, 19)
                        guiGraphics.disableScissor()
                        pose.translate(-this.coinTooltipWidth - COIN_ACCEPTOR_WIDTH, -this.coinTooltipHeight + 28, 0)
                        guiGraphics.renderTooltip(Client.font, this.coinTooltip, this.coinItemStack.getTooltipImage(), 0, 0)

                    } else {
                        pose.translate(1, 1, 0)
                        guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, 7, REELS_HEIGHT + COIN_ACCEPTOR_HEIGHT + 34 + 11, 3, 18)
                        guiGraphics.disableScissor()
                    }


                    

                }

                pose.popPose()
            } catch (error) {
                console.log(error);

            }


        },

        tick() {
            if (this.isCoinDropped){
                this.prevCoinProgress = this.coinProgress

                this.coinProgress = Math.min(1, this.coinProgress + 0.1) 
            }

        },

        mouseClicked(mouseX, mouseY, button) {
            if (button == 0 && this.isMouseOver(mouseX, mouseY) && !this.areReelsSpinning && this.isCoinDropped) {
                this.isCoinDropped = false
                milfPlayGUISound("milf:coin_spin")

                Client.player.sendData("milf_divine_mint_give_divine_coin", this.coinData)

                return true
            }
            return false
        },

        mouseReleased(mouseX, mouseY, button) {

            if (this.areReelsSpinning) return this.super$mouseReleased(mouseX, mouseY, button)

            return this.super$mouseReleased(mouseX, mouseY, button)
        },

        dropCoin() {
            let coinStack = Item.of("milf:divine_coin")

            let data = new $CompoundTag()

            let dataForCoin = this.coinAcceptorParentScreen.getInfoBox().getDataForCoin()

            let { bossName, effectName, difficultyName, bossID, effectID, bossTier, difficultyID, lootModifier } = dataForCoin

            let registryAccess = Client.level.registryAccess()

            let jsonBossName = $Component$Serializer.toJson(bossName, registryAccess)
            let jsonEffectName = $Component$Serializer.toJson(effectName, registryAccess)
            let jsonDifficultyName = $Component$Serializer.toJson(difficultyName, registryAccess)
            
            data.putString("bossNameJson", jsonBossName)
            data.putString("effectNameJson", jsonEffectName)
            data.putString("difficultyNameJson", jsonDifficultyName)

            data.putString("bossID", bossID)
            data.putString("effectID", effectID)
            data.putString("difficultyID", difficultyID)

            data.putString("bossTier", bossTier)
            data.putString("lootModifier", lootModifier)

            coinStack.set($DataComponents.CUSTOM_DATA, data)

            this.coinData = data
            this.coinItemStack = coinStack

            let tooltipComponents = $Screen.getTooltipFromItem(Client, coinStack)
            this.coinTooltip = tooltipComponents

            let tooltipHeight = 0
            let tooltipWidth = 0

            for (let component of tooltipComponents){
                let componentWidth = Client.font.width(component.getVisualOrderText())
                if (componentWidth > tooltipWidth) tooltipWidth = componentWidth
                tooltipHeight += Client.font.lineHeight + 2
            }

            this.coinTooltipHeight = tooltipHeight
            this.coinTooltipWidth = tooltipWidth

            milfPlayGUISound("milf:coin_drop")

            this.coinProgress = 0
            this.prevCoinProgress = 0

            this.isCoinDropped = true
        },

        onReelsSpinStart() {
            this.areReelsSpinning = true
        },

        onReelsSpinEnd() {
            this.areReelsSpinning = false
        },

        updateWidgetNarration(narrationElementOutput) { }

    },
        x, y, width, height, component
    )
}

NetworkEvents.dataReceived('milf_divine_mint_server_loot_data', (event) => {

    let player = event.getPlayer()

    let data = event.data

    for (let tierID of data.getAllKeys()) {

        let tierBosses = data.get(tierID)

        //console.log(tierBosses);


        for (let bossID of tierBosses.getAllKeys()) {

            let itemArray = tierBosses.get(bossID)
            let jsItemArray = []

            itemArray.forEach(compoundTag => {

                for (let itemID of compoundTag.getAllKeys()) {
                    let itemDataTag = compoundTag.get(itemID)

                    let chance = itemDataTag.getFloat("chance")
                    let count = itemDataTag.getString("count")

                    //console.log(bossID + " " + itemID + " " + chance + " " + count);

                    let jsObject = {}

                    jsObject[itemID] = { chance: chance, count: count }

                    jsItemArray.push(jsObject)

                }

            })

            MILF_BOSSES[tierID][bossID] = Object.assign({}, MILF_BOSSES[tierID][bossID], { loot: jsItemArray })

        }

    }



    //console.log(MILF_BOSSES);


    //console.log(data)

})

NativeEvents.onEvent($RenderGuiLayerEvent$Pre, event => {

    if (event.getName().equals($VanillaGuiLayers.CROSSHAIR)) {
        let screen = Client.screen
        //console.log(screen.getTitle());

        if (screen && screen.getTitle().getString() == DIVINE_MINT_SCREEN_TITLE.getString()) {
            event.setCanceled(true)
        }

    }

})

