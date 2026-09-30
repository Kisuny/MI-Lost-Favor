function ReelWidget(x, y, width, height, component, overrides) {

    const AbstractReelWidget = {

        itemsToRenderEntries: {},
        nextItemsToRenderEntries: {},

        selectorRot: 0,
        guiTicks: 0,
        reelParentScreen: null,

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
        spinTicks: 0,

        itemsChangeTicks: 0,
        itemsChangeTotalTicks: 0,
        onChangeContext: {},

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

        getCurrentlySelectedID() {
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
                $RenderSystem.enableBlend()
                pose.translate(0, ONE_REEL_HEIGHT * this.currentlySelectedDec / TO_RENDER_SIZE * 2, 0)
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, REELS_WIDTH, 0, ONE_REEL_WIDTH, 2 * ONE_REEL_HEIGHT)
                pose.translate(0, -ONE_REEL_HEIGHT * 2, 0)
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, REELS_WIDTH, 0, ONE_REEL_WIDTH, 2 * ONE_REEL_HEIGHT)
                $RenderSystem.disableBlend()
                pose.popPose()

                guiGraphics.disableScissor()

                pose.popPose()

            } catch (error) {
                console.log(error);

            }
        },

        getRenderContext(guiGraphics) {
            //all the additional stuff that is required to render stuff
            return {}
        },

        onNewItemSelected(itemID) {
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

        onItemsChange(onChangeContext) {

        },

        changeItemsToRender(items, ticks, onChangeContext) {

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
            if (this.spinTicks > 0) {

                this.prevSelectorRot = this.selectorRot

                this.spinTicks--

                let CEILING_TICKS = 30

                let increment = Math.PI / 5

                if (this.isSpinningWithEasing && this.spinTicks <= CEILING_TICKS) {
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
            if (this.itemsChangeTicks > 0) {
                this.prevSelectorRot = this.selectorRot

                let t = this.itemsChangeTicks / this.itemsChangeTotalTicks

                let increment = Math.PI / 2.3

                increment = increment * easeZeroOneZero(t, 2)

                this.selectorRot += increment

                this.itemsChangeTicks--

                if (this.itemsChangeTicks == (this.itemsChangeTotalTicks / 2) | 0) {
                    this.setItemsToRender(this.nextItemsToRenderEntries)
                    this.onItemsChange(this.onChangeContext)
                }


                if (this.itemsChangeTicks == 0) {
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

        initiateSpin(ticks, withEasing) {
            if (withEasing) this.isSpinningWithEasing = true
            this.isSpinning = true
            this.spinTicks = ticks
        },

        updateWidgetNarration(narrationElementOutput) { }

    }

    let ReelWidgetImpl = Object.assign({}, AbstractReelWidget, overrides)

    return new JavaAdapter($AbstractWidget, ReelWidgetImpl, x, y, width, height, component)

}