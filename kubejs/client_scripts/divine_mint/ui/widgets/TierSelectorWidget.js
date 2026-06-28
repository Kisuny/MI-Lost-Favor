function TierSelectorWidget(x, y, width, height, component) {
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

            let distanceProgress = this.isDragging ? this.distanceProgress : lerp(this.prevDistanceProgress, this.distanceProgress)

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
            if (button == 0 && this.isMouseOver(mouseX, mouseY) && !this.areReelsSpinning) {
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

            if (this.currentlySelectedTier != selectedTier) {
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