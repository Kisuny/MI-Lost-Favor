function AbstractRLReelWidget(x, y, width, height, component, overrides) {

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
        },

        renderSelected(pose, renderContext, effectData, effectID) {

            let { guiGraphics } = renderContext

            let resourceLocation = effectData.resourceLocation

            pose.scale(this.ICON_SCALE, this.ICON_SCALE, 1)

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

                guiGraphics.blit(resourceLocation, -9, -9, 0, 0, 18, 18, 18, 18)
            }
        }
    }

    overrides = Object.assign({}, BasicRLReelWidget, overrides)

    return ReelWidget(x, y, width, height, component, overrides)

}