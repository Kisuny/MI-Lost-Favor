let $Screen = Java.loadClass("net.minecraft.client.gui.screens.Screen")
let $RenderGuiLayerEvent$Pre = Java.loadClass("net.neoforged.neoforge.client.event.RenderGuiLayerEvent$Pre")
let $VanillaGuiLayers = Java.loadClass("net.neoforged.neoforge.client.gui.VanillaGuiLayers")
let $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
let $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
let $HashMap = Java.loadClass("java.util.HashMap")
let $Button = Java.loadClass("net.minecraft.client.gui.components.Button")
let $AbstractWidget = Java.loadClass("net.minecraft.client.gui.components.AbstractWidget")


let DIVINE_MINT_SCREEN_TITLE = Component.translatable("milf.divine_mint.gui.title")

let DIVINE_MINT_GUI = $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/divine_mint_gui.png")

const MILF_BOSSES = global.milfBosses
const MILF_BOSSES_SIZE = Object.keys(MILF_BOSSES).length

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


ItemEvents.firstRightClicked("milf:divine_mint", event => {
    Client.setScreen(new JavaAdapter($Screen, {

        guiScale: Client.window.guiScale,

        spawnButton: null,
        bossSelector: null,
        lever: null,

        init(){

            let entitiesToRender = {}

            Object.entries(MILF_BOSSES).forEach(([bossId, bossData], index) => {

                let entityType = $BuiltInRegistries.ENTITY_TYPE.get(new $ResourceLocation.parse(bossId))
                let entity = entityType.create(Client.level)

                entitiesToRender[bossId] = entity

            })

            const guiScale = this.guiScale

            const buttonWidth = 26 * guiScale
            const buttonHeight = 6 * guiScale

            let buttonX = (this.width / 2 - buttonWidth / 2)
            let buttonY = (this.height / 2 - buttonHeight / 2) - 16 * guiScale


            this.spawnButton = this.addRenderableWidget(
                $Button.builder(Component.literal("TEST"), button => {
                    console.log("WHAT")
                    Client.player.sendData("milf_boss_bait", { id: this.bossSelector.currentlySelectedId })
                    //button.setFocused(false)
                }
            )
            .bounds(buttonX, buttonY, buttonWidth, buttonHeight)
            .build())
            

            this.bossSelector = this.addRenderableWidget(
                createReelWidget(
                    ((this.width / 2) | 0) - ONE_REEL_WIDTH / 2, ((this.height / 2) | 0) - ONE_REEL_HEIGHT / 2, ONE_REEL_WIDTH, ONE_REEL_HEIGHT, Component.literal("TEST")
                )
            )

            this.lever = this.addRenderableWidget(
                createLeverWidget(
                    ((this.width / 2) | 0) + REELS_WIDTH / 2 + 16 - (LEVER_TOP_SIZE - LEVER_BG_WIDTH) / 2, 
                    ((this.height / 2) | 0) - REELS_HEIGHT / 2 + (REELS_HEIGHT / 2 - LEVER_BG_HEIGHT / 2) 
                        - (LEVER_ROD_LENGTH + LEVER_TOP_SIZE + LEVER_OFFSET) , 
                    LEVER_TOP_SIZE, 
                    (LEVER_ROD_LENGTH + LEVER_TOP_SIZE + LEVER_BG_HEIGHT), 
                    Component.literal("TEST")
                )
            )

            this.bossSelector.setEntitiesToRender(entitiesToRender)

        },

        isPauseScreen() { return false },

        tick() {
            this.lever.tick()
            this.bossSelector.tick()
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
            let baseY = ((this.height / 2) | 0 ) - REELS_HEIGHT / 2

            try {

                let pose = guiGraphics.pose()

                pose.pushPose()

                pose.translate(baseX, baseY, 0)
                //REELS
                guiGraphics.blit(DIVINE_MINT_GUI, 0, 0, 0, 0, REELS_WIDTH, REELS_HEIGHT)

                guiGraphics.blit(DIVINE_MINT_GUI, -COIN_ACCEPTOR_WIDTH - 16, (REELS_HEIGHT - COIN_ACCEPTOR_HEIGHT) / 2, LEVER_TOP_SIZE + LEVER_BG_WIDTH, REELS_HEIGHT, COIN_ACCEPTOR_WIDTH, COIN_ACCEPTOR_HEIGHT)

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

        mouseReleased(mouseX, mouseY, button) {
            if (button == 0) {
                //divineMintSelectorRot = currentlySelectedIndex * (Math.PI * 2) / MILF_BOSSES_SIZE
                this.spawnButton.visible = true
            }
            return this.super$mouseReleased(mouseX, mouseY, button)
        },

    }, DIVINE_MINT_SCREEN_TITLE))
})

function createReelWidget(x, y, width, height, component){
    return new JavaAdapter($AbstractWidget, {

        toRender: {},

        selectorRot: 0,
        guiTicks: 0,

        currentlySelectedId: null,
        currentlySelectedDec: 0,
        currentlySelectedIndex: 0,
        lastSelectedIndex:0,
        targetRotation:0,
        prevSelectorRot:0,
        isDragging:false,


        setEntitiesToRender(entities) {
            this.toRender = entities
        },

        renderWidget(guiGraphics, mouseX, mouseY, partialTick) {

            let level = Client.level
            let gameRenderer = Client.gameRenderer
            const clientBuffer = Client.renderBuffers().bufferSource()
            const clientDispatcher = Client.getEntityRenderDispatcher()
            const guiScale = Client.window.guiScale
            const ENTITY_SCALE = 7

            let font = Client.font

            const BOSS_BAIT_SELECTOR_OFFSET = Math.PI / MILF_BOSSES_SIZE
            const SELECTOR_RADIUS = 60

            let [baseX, baseY] = [this.getX(), this.getY()]

            const pose = guiGraphics.pose()

            let diff = this.selectorRot - this.prevSelectorRot
            diff = ((diff % TWO_PI) + TWO_PI) % TWO_PI
            if (diff > Math.PI) diff -= TWO_PI

            let selectorRot = this.prevSelectorRot + diff * Client.getTimer().getGameTimeDeltaPartialTick(false)

            let rotAngle = selectorRot + BOSS_BAIT_SELECTOR_OFFSET

            rotAngle = ((rotAngle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI)

            //console.log(rotAngle / Math.PI * 180);


            this.currentlySelectedDec = ((rotAngle - BOSS_BAIT_SELECTOR_OFFSET) / (2 * Math.PI)) * MILF_BOSSES_SIZE

            //console.log(this.currentlySelectedDec);

            this.currentlySelectedIndex = Math.round(this.currentlySelectedDec) % MILF_BOSSES_SIZE

            if (this.lastSelectedIndex != this.currentlySelectedIndex) {
                this.guiTicks = 0
                this.lastSelectedIndex = this.currentlySelectedIndex
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
                let angle = Math.sin(this.guiTicks)

                Object.entries(this.toRender).forEach(([bossId, entity], index) => {                                  

                    pose.pushPose()



                    if (this.currentlySelectedIndex != index) pose.translate(0, 0, -0)

                    pose.mulPose($Axis.XN.rotation(selectorRot))

                    pose.mulPose($Axis.XP.rotation(2 * Math.PI / MILF_BOSSES_SIZE * index))

                    pose.translate(0, 0, SELECTOR_RADIUS)

                    pose.mulPose($Axis.XP.rotation(Math.PI))
                    pose.mulPose($Axis.YP.rotation(Math.PI))


                    let brightness = 0xF000F0

                    if (this.currentlySelectedIndex == index) {

                        if (this.currentlySelectedId != bossId) this.currentlySelectedId = bossId

                        pose.translate(0, -8, 0)

                        pose.scale(ENTITY_SCALE, ENTITY_SCALE, 1)


                        pose.mulPose($Axis.YP.rotation(angle / (2 * 1.5)))
                        pose.mulPose($Axis.ZN.rotation(angle / (7 * 1.5)))

                        brightness = 0xF000F0

                        clientDispatcher.render(entity, 0, 0, 0, 0, 0,
                            pose, clientBuffer, brightness)

                        clientBuffer.endBatch()
                    } else {

                        let difference = index - (this.currentlySelectedDec)
                        difference = ((difference + MILF_BOSSES_SIZE / 2) % MILF_BOSSES_SIZE + MILF_BOSSES_SIZE) % MILF_BOSSES_SIZE - MILF_BOSSES_SIZE / 2
                        let distanceToSelected = Math.abs(difference)

                        let scaleFactor = easeInOutCubic(0.8 / Math.pow(Math.max(distanceToSelected * 1.3, 0.9), 1.5))                        

                        if (scaleFactor > 0.01){
                            pose.translate(0, -8, 0)

                            pose.scale(ENTITY_SCALE, ENTITY_SCALE, 1)
                            pose.scale(scaleFactor, scaleFactor, scaleFactor)

                            brightness = 0x300030

                            clientDispatcher.render(entity, 0, 0, 0, 0, 0,
                                pose, clientBuffer, brightness)


                            clientBuffer.endBatch()
                        }



                    }

                    pose.popPose()

                })


                pose.popPose()
                
                pose.pushPose()

                pose.translate(0, ONE_REEL_HEIGHT * this.currentlySelectedDec / MILF_BOSSES_SIZE * 2, 0)
                guiGraphics.blit(DIVINE_MINT_GUI, 0, 0, REELS_WIDTH, 0, ONE_REEL_WIDTH, 2 * ONE_REEL_HEIGHT)
                pose.translate(0, -ONE_REEL_HEIGHT *2, 0)
                guiGraphics.blit(DIVINE_MINT_GUI, 0, 0, REELS_WIDTH, 0, ONE_REEL_WIDTH, 2 * ONE_REEL_HEIGHT)

                pose.popPose()

                guiGraphics.disableScissor()

                pose.popPose()

            } catch (error) {
                console.log(error);

            }
        },

        mouseClicked(mouseX, mouseY, button) {
            if (button == 0 && this.isMouseOver(mouseX, mouseY)) {
                this.isDragging = true
                return true
            }
            return false
        },

        mouseDragged(mouseX, mouseY, button, deltaX, deltaY) {
            if (button == 0) {
                this.prevSelectorRot = this.selectorRot
                //this.selectorRot += deltaY * 0.03

                //const sensitivity = 0.055
                const sensitivity = 0.085
                let rawDelta = deltaY * sensitivity
                let nextSelectionDelta = Math.min(Math.max(Math.abs(this.currentlySelectedIndex - this.currentlySelectedDec), 0.15), 1)                 
                //console.log(nextSelectionDelta);
                
                const easePower = 1.5

                let adjustedDelta = rawDelta * Math.pow(nextSelectionDelta, easePower)
                this.selectorRot += adjustedDelta
                return true

            }
        },

        tick() {
            if (!this.isDragging) {
                this.prevSelectorRot = this.selectorRot

                let delta = this.targetRotation - this.selectorRot
                
                delta = ((delta % TWO_PI) + TWO_PI) % TWO_PI
                if (delta > Math.PI) {
                    delta -= TWO_PI
                }

                const snapThreshold = 0.04
                if (Math.abs(delta) < snapThreshold) {
                    console.log(this.selectorRot);
                    //this.prevSelectorRot = this.targetRotation
                    this.selectorRot = this.targetRotation
                } else {
                    this.selectorRot += Math.sign(delta) * Math.min(Math.pow(Math.abs(delta), 2), 0.35)
                }
            }
        },



        mouseReleased(mouseX, mouseY, button) {
            //console.log(mouseX);
            this.isDragging = false
            if (button == 0) {
                //this.selectorRot = this.currentlySelectedIndex * (Math.PI * 2) / MILF_BOSSES_SIZE
                this.targetRotation = this.currentlySelectedIndex * (Math.PI * 2) / MILF_BOSSES_SIZE
                console.log(this.selectorRot);
                
                //this.spawnButton.visible = true
            }
            return this.super$mouseReleased(mouseX, mouseY, button)
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
                guiGraphics.blit(DIVINE_MINT_GUI, 0, 0, LEVER_TOP_SIZE, REELS_HEIGHT, LEVER_BG_WIDTH, LEVER_BG_HEIGHT)
                pose.popPose()
                let Y_OFFSET_FOR_LEVER = -(LEVER_ROD_LENGTH + LEVER_TOP_SIZE + LEVER_OFFSET)
                let Y_OFFSET_FROM_PROGRESS = pullingProgress * LEVER_ROD_LENGTH * 2.5
                let Y_OFFSET_FOR_ROD = -(pullingProgress * 3.5 * LEVER_TOP_SIZE)

                pose.translate(0, Y_OFFSET_FOR_LEVER, 0)
                pose.translate(0, Y_OFFSET_FROM_PROGRESS, 0)

                //LEVER_ROD
                pose.pushPose()
                let leverRodAtlasY = REELS_HEIGHT + LEVER_TOP_SIZE
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
                    guiGraphics.blit(DIVINE_MINT_GUI, 0, LEVER_TOP_SIZE - 2, 0, leverRodAtlasY, LEVER_TOP_SIZE, LEVER_ROD_LENGTH)
                } else {
                    scissorsY = scissorsY + (pullingProgress) * LEVER_ROD_LENGTH * 2

                    guiGraphics.enableScissor(
                        x,
                        scissorsY,
                        x + LEVER_TOP_SIZE,
                        scissorsY + LEVER_ROD_LENGTH
                    )
                    guiGraphics.blit(DIVINE_MINT_GUI, 0, LEVER_TOP_SIZE - 2, 0, leverRodAtlasY, LEVER_TOP_SIZE, LEVER_ROD_LENGTH)
                }

                guiGraphics.disableScissor()

                pose.popPose()
                //LEVER_TOP
                guiGraphics.blit(DIVINE_MINT_GUI, 0, 0, 0, REELS_HEIGHT, LEVER_TOP_SIZE, LEVER_TOP_SIZE)


                pose.popPose()
            } catch (error) {
                console.log(error);
                
            }


        },

        tick() {
            if (!this.isDragging) {
                this.prevPullingProgress = this.pullingProgress
                const baseSpeed = 0.05
                const easePower = 6

                let decayFactor = Math.pow(1.6 - this.pullingProgress, easePower)
                let delta = baseSpeed * decayFactor

                this.pullingProgress = Math.max(this.pullingProgress - delta, 0)
            }
        },

        mouseClicked(mouseX, mouseY, button) {
            if (button == 0 && this.isMouseOver(mouseX, mouseY)) {
                this.isDragging = true
                return true
            }
            return false
        },

        mouseDragged(mouseX, mouseY, button, deltaX, deltaY) {
            if (button == 0) {
                const sensitivity = 0.045
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
            return this.super$mouseReleased(mouseX, mouseY, button)
        },

        updateWidgetNarration(narrationElementOutput) { }

    },
        x, y, width, height, component
    )
}

NativeEvents.onEvent($RenderGuiLayerEvent$Pre, event => {

    if (event.getName().equals($VanillaGuiLayers.CROSSHAIR)) {
        let screen = Client.screen
        //console.log(screen.getTitle());

        if (screen && screen.getTitle().getString() == DIVINE_MINT_SCREEN_TITLE.getString()) {
            event.setCanceled(true)
        }

    }

})

/*

        renderBossEntities(guiGraphics, mouseX, mouseY, partialTick){

            let level = Client.level
            let gameRenderer = Client.gameRenderer
            const clientBuffer = Client.renderBuffers().bufferSource()
            const clientDispatcher = Client.getEntityRenderDispatcher()
            const guiScale = Client.window.guiScale
            const ENTITY_SCALE = 4
            const ADDITIONAL_SCALE = 3

            const TOOLTIP_HEIGHT = 64
            const TOOLTIP_WIDTH = 64

            const BOSS_NAME_OFFSET_X = 0

            let font = Client.font

            const Y_OFFSET = -14

            const BOSS_BAIT_SELECTOR_OFFSET = Math.PI / 8
            const SELECTOR_RADIUS = 6


            // const tooltipPosition = $DefaultTooltipPositioner.positionTooltip(
            //     guiGraphics.guiWidth(), guiGraphics.guiHeight(),
            //     guiGraphics.guiWidth() / 2, guiGraphics.guiHeight() / 2,
            //     0, TOOLTIP_HEIGHT
            // )

            //let [baseX, baseY] = [tooltipPosition.x(), tooltipPosition.y()]
            let [baseX, baseY] = [guiGraphics.guiWidth() / 2, guiGraphics.guiHeight() / 2]

            const pose = guiGraphics.pose()

            let rotAngle = divineMintSelectorRot + BOSS_BAIT_SELECTOR_OFFSET

            rotAngle = ((rotAngle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI)


            currentlySelectedDec = (rotAngle / (2 * Math.PI)) * MILF_BOSSES_SIZE
            currentlySelectedIndex = Math.floor(currentlySelectedDec) % MILF_BOSSES_SIZE

            if(lastSelected != currentlySelectedIndex){                
                divineMintGuiTicks = 0
                lastSelected = currentlySelectedIndex
            }
            
            // if (bossBaitSelectorRot + BOSS_BAIT_SELECTOR_OFFSET > 0) {
            //     currentlySelectedDec = ((bossBaitSelectorRot + BOSS_BAIT_SELECTOR_OFFSET) % (Math.PI * 2) / (Math.PI * 2)) * MILF_BOSSES_SIZE
            //     currentlySelected = Math.floor(currentlySelectedDec)
            // } else {
            //     currentlySelectedDec = ((bossBaitSelectorRot + BOSS_BAIT_SELECTOR_OFFSET) % (Math.PI * 2) / (Math.PI * 2)) * MILF_BOSSES_SIZE
            //     currentlySelected = MILF_BOSSES_SIZE + Math.trunc(currentlySelectedDec)
            // }
            //console.log(currentlySelectedDec)

            // if (currentlySelected == MILF_BOSSES_SIZE){
            //     currentlySelected = 0
            // }

            try {

                pose.pushPose()
                pose.translate(baseX - (8 * ENTITY_SCALE), baseY + Y_OFFSET, 100)

                // $TooltipRenderUtil.renderTooltipBackground(guiGraphics, -TOOLTIP_WIDTH / 2 + (8 * ENTITY_SCALE), 0, TOOLTIP_WIDTH, TOOLTIP_HEIGHT, -500,
                //     0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)

                divineMintGuiTicks += partialTick * 0.03
                let angle = Math.sin(divineMintGuiTicks)

                Object.entries(this.entitiesToRender).forEach(([bossId, entity], index) => {
                    // let entityType = $BuiltInRegistries.ENTITY_TYPE.get(new $ResourceLocation.parse(bossId))
                    // let entity = entityType.create(Client.level)

                    pose.pushPose()

                    

                    if (currentlySelectedIndex != index) pose.translate(0, 0, -1000)

                    pose.translate(0, 16 * ENTITY_SCALE / ADDITIONAL_SCALE, 0)

                    pose.translate(0, -16, 0)


                    pose.scale(ENTITY_SCALE * ADDITIONAL_SCALE, ENTITY_SCALE * ADDITIONAL_SCALE, 1)


                    pose.mulPose($Axis.XN.rotation(Math.PI / 8))



                    pose.translate(8 / ADDITIONAL_SCALE, 8 / ADDITIONAL_SCALE, 0)

                    //pose.mulPose($Axis.YN.rotation(2 * Math.PI / MILF_BOSSES_SIZE * currentlySelected))

                    pose.mulPose($Axis.YN.rotation(divineMintSelectorRot))

                    pose.mulPose($Axis.YP.rotation(2 * Math.PI / MILF_BOSSES_SIZE * index))

                    pose.translate(0, 0, SELECTOR_RADIUS)


                    pose.mulPose($Axis.XP.rotation(Math.PI))
                    pose.mulPose($Axis.YP.rotation(Math.PI))


                    let brightness = 0xF000F0

                    if (currentlySelectedIndex == index) {

                        if (currentlySelectedId != bossId) currentlySelectedId = bossId

                        pose.pushPose()

                        pose.mulPose($Axis.XN.rotation(Math.PI))
                        pose.mulPose($Axis.YN.rotation(Math.PI))

                        pose.scale(0.5, 0.5, 1)

                        let bossNameWrapped = font.split(entity.getDisplayName(), 60)

                        let tempIndex = 0

                        bossNameWrapped.forEach(line => {
                            guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.util.FormattedCharSequence,int,int,int,boolean)"](
                                font, line, BOSS_NAME_OFFSET_X, tempIndex * (font.lineHeight + 2), 0xFFFFFF, true
                            )
                            tempIndex++
                        })



                        pose.popPose()

                        brightness = 0xF000F0
                        pose.mulPose($Axis.YP.rotation(angle / 2))
                        pose.mulPose($Axis.ZN.rotation(angle / 7))

                        clientDispatcher.render(entity, 0, 0, 0, 0, 0,
                            pose, clientBuffer, brightness)

                        clientBuffer.endBatch()
                    } else {

                        let difference = index - (currentlySelectedDec - 0.5)
                        difference = ((difference + MILF_BOSSES_SIZE / 2) % MILF_BOSSES_SIZE + MILF_BOSSES_SIZE) % MILF_BOSSES_SIZE - MILF_BOSSES_SIZE / 2
                        let distanceToSelected = Math.abs(difference)

                        let scaleFactor = easeInOutCubic(0.8 / Math.pow(Math.max(distanceToSelected * 1.3, 0.9), 1.7)) 

                        // let abs = Math.abs(index - currentlySelected )
                        // let distanceToSelected = Math.min(abs, MILF_BOSSES_SIZE - abs)

                        // let scaleFactor = 0.8 / distanceToSelected

                        brightness = 0x300030
                        pose.scale(scaleFactor, scaleFactor, scaleFactor)
                        $RenderSystem.enableBlend()
                        $RenderSystem.defaultBlendFunc()
                        $RenderSystem.setShaderColor(1, 1, 1, 0.3)

                        clientDispatcher.render(entity, 0, 0, 0, 0, 0,
                            pose, clientBuffer, brightness)

                        $RenderSystem.disableBlend()

                        clientBuffer.endBatch()

                        $RenderSystem.setShaderColor(1, 1, 1, 1)
                    }

                    pose.popPose()

                })


                pose.popPose()

            } catch (error) {
                console.log(error);

            }            
        },

*/
