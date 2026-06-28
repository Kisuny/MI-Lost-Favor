function PetRockWidget(x, y, width, height, component) {
    function getPupilOffset(eyeCenterX, eyeCenterY, targetX, targetY) {
        let dx = targetX - eyeCenterX
        let dy = targetY - eyeCenterY
        let distance = Math.sqrt(dx * dx + dy * dy)

        let maxDisplacement = (PET_ROCK_EYE_SIZE - PET_ROCK_PUPIL_SIZE) / 2 - 3

        let scale = Math.min(distance, maxDisplacement) / distance
        return {
            x: dx * scale,
            y: dy * scale
        }
    }

    return new JavaAdapter($AbstractWidget, {

        parentScreenRef: null,
        textureRLocation: null,


        setTextureLocation(location) {
            this.textureRLocation = location
        },


        setParentScreen(screen) {
            this.parentScreenRef = screen
        },


        renderWidget(guiGraphics, mouseX, mouseY, partialTick) {

            if(!this.parentScreenRef) return

            try {

                let pose = guiGraphics.pose()
                pose.pushPose()
                pose.translate(x, y, 0)

                let draggedOre = this.parentScreenRef.getCurrentlyDraggedOre()

                let hasTarget = draggedOre ? true : false

                let eyesTargetPos = {x:0, y:0}

                let leftEyeOffsetX = 3
                let leftEyeOffsetY = 25

                let leftPupilOffsetX = 10.5
                let leftPupilOffsetY = 10.5

                let rightPupilOffsetX = 10.5
                let rightPupilOffsetY = 10.5

                let rightEyeOffsetX = leftEyeOffsetX + 38 + PET_ROCK_EYE_SIZE
                let rightEyeOffsetY = leftEyeOffsetY


                if (this.isMouseOver(mouseX, mouseY) && !draggedOre){
                    guiGraphics.blit(PER_ROCK_GUI, 0, 0, PET_ROCK_FACE_WIDTH, 0, PET_ROCK_FACE_WIDTH, PET_ROCK_FACE_HEIGHT+1)
                    eyesTargetPos = { x: x + PET_ROCK_FACE_WIDTH / 2, y: y }
                    hasTarget = true
                } else {
                    guiGraphics.blit(PER_ROCK_GUI, 0, 0, 0, 0, PET_ROCK_FACE_WIDTH, PET_ROCK_FACE_HEIGHT)

                }

                if (draggedOre){
                    eyesTargetPos = draggedOre.pos.copy()
                    eyesTargetPos.x += 8
                    eyesTargetPos.y += 8
                }

                if (hasTarget) {


                    let leftEyeX = x + 3
                    let leftEyeY = y + 25
                    let leftEyeCenterX = leftEyeX + PET_ROCK_EYE_SIZE / 2
                    let leftEyeCenterY = leftEyeY + PET_ROCK_EYE_SIZE / 2

                    let rightEyeX = x + 3 + 38 + PET_ROCK_EYE_SIZE
                    let rightEyeY = y + 25
                    let rightEyeCenterX = rightEyeX + PET_ROCK_EYE_SIZE / 2
                    let rightEyeCenterY = rightEyeY + PET_ROCK_EYE_SIZE / 2

                    let leftOffset = getPupilOffset(leftEyeCenterX, leftEyeCenterY, eyesTargetPos.x, eyesTargetPos.y)

                    leftPupilOffsetX = leftOffset.x + PET_ROCK_EYE_SIZE / 2 - PET_ROCK_PUPIL_SIZE / 2
                    leftPupilOffsetY = leftOffset.y + PET_ROCK_EYE_SIZE / 2 - PET_ROCK_PUPIL_SIZE / 2


                    let rightOffset = getPupilOffset(rightEyeCenterX, rightEyeCenterY, eyesTargetPos.x, eyesTargetPos.y)

                    rightPupilOffsetX = rightOffset.x + PET_ROCK_EYE_SIZE / 2 - PET_ROCK_PUPIL_SIZE / 2
                    rightPupilOffsetY = rightOffset.y + PET_ROCK_EYE_SIZE / 2 - PET_ROCK_PUPIL_SIZE / 2
                }

                pose.pushPose()
                $RenderSystem.enableBlend()

                pose.translate(leftEyeOffsetX, leftEyeOffsetY, 0)
                pose.pushPose()
                pose.translate(leftPupilOffsetX, leftPupilOffsetY, 0)
                guiGraphics.blit(PER_ROCK_GUI, 0, 0, PET_ROCK_VIAL_SIZE, PET_ROCK_FACE_HEIGHT + PET_ROCK_SELECT_AREA_HEIGHT, PET_ROCK_PUPIL_SIZE, PET_ROCK_PUPIL_SIZE)
                pose.popPose()
                guiGraphics.blit(PER_ROCK_GUI, 0, 0, PET_ROCK_VIAL_SIZE + PET_ROCK_PUPIL_SIZE, PET_ROCK_FACE_HEIGHT + PET_ROCK_SELECT_AREA_HEIGHT, PET_ROCK_EYE_SIZE, PET_ROCK_EYE_SIZE)

                pose.popPose()
                pose.pushPose()

                pose.translate(rightEyeOffsetX, rightEyeOffsetY, 0)
                pose.pushPose()
                pose.translate(rightPupilOffsetX, rightPupilOffsetY, 0)
                guiGraphics.blit(PER_ROCK_GUI, 0, 0, PET_ROCK_VIAL_SIZE, PET_ROCK_FACE_HEIGHT + PET_ROCK_SELECT_AREA_HEIGHT, PET_ROCK_PUPIL_SIZE, PET_ROCK_PUPIL_SIZE)
                pose.popPose()
                guiGraphics.blit(PER_ROCK_GUI, 0, 0, PET_ROCK_VIAL_SIZE + PET_ROCK_PUPIL_SIZE, PET_ROCK_FACE_HEIGHT + PET_ROCK_SELECT_AREA_HEIGHT, PET_ROCK_EYE_SIZE, PET_ROCK_EYE_SIZE)

                pose.popPose()

                pose.popPose()
                $RenderSystem.disableBlend()

            } catch (error) {
                console.log(error);

            }


        },

        tick() {

        },

        mouseClicked(mouseX, mouseY, button) {
            if (button == 0 && this.isMouseOver(mouseX, mouseY)) {

                this.parentScreenRef.onOresSelect()

                return true

            }

            return false

        },

        mouseReleased(mouseX, mouseY, button) {
            if (button == 0) {

                return true
            }
            return false
        },

        updateWidgetNarration(narrationElementOutput) { }

    },
        x, y, width, height, component
    )
}