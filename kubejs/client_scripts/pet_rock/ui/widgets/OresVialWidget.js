function OresVialWidget(x, y, width, height, component) {
    return new JavaAdapter($AbstractWidget, {

        oresToRender: [],
        vialParentScreen: null,
        oreToDrag: null,
        isDragging: false,
        textureRLocation: null,
        tierName:null,

        hoveredOreRef: null,
        isOreHovered: false,
        oresRotationAngle: 0,

        getOresRotationSpeed() {
            if (this.isOreHovered) return 0.0005
            return 0.007
        },

        setOreHovered(isHovered){
            this.isOreHovered = isHovered
        },


        setTextureLocation(location){
            this.textureRLocation = location
        },

        setTierComponent(component){
            this.tierName = component
        },

        setOres(ores) {

            ores.forEach((oreID, index) => {
                let ore = new PetRockOre(oreID)
                ore.setVial(this)
                ore.setIndex(index)
                ore.setVialMaxIndex(ores.length - 1)
                ore.vialCenterPos.set(x + width / 2, y + height / 2)
                this.oresToRender.push(ore)
            })

            this.shuffleOres()

        },

        setParentScreen(screen) {
            this.vialParentScreen = screen
        },


        renderWidget(guiGraphics, mouseX, mouseY, partialTick) {

            try {

                let pose = guiGraphics.pose()
                pose.pushPose()
                pose.translate(x, y, 0)

                guiGraphics.blit(PER_ROCK_GUI, 0, 0, 0, PET_ROCK_FACE_HEIGHT + PET_ROCK_SELECT_AREA_HEIGHT, width, height)
                
                pose.translate(width / 2 - 5.5, height / 2 - 4, 0)
                if(this.tierName){
                    guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)"](
                        Client.font, this.tierName, 0, 0, 0xa3cbc8, true
                    )
                }

                pose.popPose()

                this.oresToRender.forEach(oreEntry => {

                    oreEntry.render(guiGraphics, pose, mouseX, mouseY)

                })

            } catch (error) {
                console.log(error);

            }


        },

        tick() {
            if (!this.isOreHovered) this.oresRotationAngle += Math.PI * this.getOresRotationSpeed()
            
            this.oresToRender.forEach(oreEntry => {
                oreEntry.tick()
            })
        },

        mouseClicked(mouseX, mouseY, button) {
            
            if (button == 0) {

                for(let ore of this.oresToRender){
                    let { id, pos, size } = ore
                    let itemX = pos.x
                    let itemY = pos.y

                    if (ore.isMouseOver(mouseX, mouseY)) {
                        ore.isDragged = true
                        this.oreToDrag = ore
                        this.vialParentScreen.setCurrentlyDraggedOre(ore)
                        this.isDragging = true
                        return true
                    }
                }
            }

            return false

        },

        mouseDragged(mouseX, mouseY, button, deltaX, deltaY) {
            if (button == 0 && this.oreToDrag) {

                this.oreToDrag.onDragging(mouseX, mouseY, deltaX, deltaY)

                return true
            }
            return this.super$mouseDragged(mouseX, mouseY, button, deltaX, deltaY);
        },

        mouseReleased(mouseX, mouseY, button) {
            if (button == 0 && this.oreToDrag) {

                let droppedOre = this.oreToDrag
                this.oreToDrag = null
                this.isDragging = false
                this.vialParentScreen.clearCurrentlyDraggedOre()
                droppedOre.onDragStop()

                this.vialParentScreen.onOreDropped(mouseX, mouseY, droppedOre, this)

                return true
            }
            return false
        },

        shuffleOres() {
            this.oresToRender.forEach(oreEntry => {
                let orbitalPosition = oreEntry.getOrbitalPosition()
                oreEntry.pos.set(orbitalPosition.x, orbitalPosition.y)

            })
        },

        returnOre(ore){
            let orbitalPosition = ore.getOrbitalPosition()
            ore.returnTo(orbitalPosition.x, orbitalPosition.y)
        },

        updateWidgetNarration(narrationElementOutput) { }

    },
        x, y, width, height, component
    )
}