function EntityReelWidget(x, y, width, height, component) {

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

            if (entityData.fakeItemToRender) {
                let { guiGraphics } = renderContext

                let item = Item.of(entityData.fakeItemToRender)

                pose.mulPose($Axis.XP.rotation(Math.PI))
                pose.mulPose($Axis.YP.rotation(Math.PI))

                pose.translate(0, 0, -40)

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

            if (entityData.additionalTransformations) entityData.additionalTransformations(pose)

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

                if (entityData.additionalTransformations) entityData.additionalTransformations(pose)

                pose.scale(this.ENTITY_SCALE, this.ENTITY_SCALE, 1)
                pose.scale(scaleFactor, scaleFactor, scaleFactor)

                let brightness = 0x300030

                clientDispatcher.render(entity, 0, 0, 0, 0, 0,
                    pose, clientBuffer, brightness)


                clientBuffer.endBatch()
            }
        },

        onItemsChange(onChangeContext) {
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

    return ReelWidget(x, y, width, height, component, overrides)

}