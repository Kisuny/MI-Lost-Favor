function LeverWidget(x, y, width, height, component) {
    return new JavaAdapter($AbstractWidget, {

        pullingProgress: 0,
        prevPullingProgress: 0,
        isDragging: false,
        leverParentScreen: null,

        areReelsSpinning: false,

        setParentScreen(screen) {
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


                if (pullingProgress > 0.5) {
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
            if (this.pullingProgress >= 0.96) {
                this.leverParentScreen.onLeverPull()
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