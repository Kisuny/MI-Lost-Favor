function SelectAreaWidget(x, y, width, height, component) {
    return new JavaAdapter($AbstractWidget, {

        storedOres: {},
        parentScreenRef: null,
        textureRLocation: null,

        addOre(ore) {
            this.storedOres[ore.id] = ore
            ore.setSelected(true)            
        },

        removeOre(ore) {
            ore.setSelected(false)
            
            delete this.storedOres[ore.id]
        },

        getSelectedOreIds(){
            return Object.keys(this.storedOres)
        },

        setTextureLocation(location) {
            this.textureRLocation = location
        },


        setParentScreen(screen) {
            this.parentScreenRef = screen
        },


        renderWidget(guiGraphics, mouseX, mouseY, partialTick) {

            try {

                let pose = guiGraphics.pose()
                pose.pushPose()
                pose.translate(x, y, 0)

                guiGraphics.blit(PER_ROCK_GUI, 0, 0, 7, PET_ROCK_FACE_HEIGHT, width, height)

                pose.popPose()

            } catch (error) {
                console.log(error);

            }


        },

        tick() {

        },

        mouseClicked(mouseX, mouseY, button) {
            if (button == 0 && this.isMouseOver(mouseX, mouseY)) {

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