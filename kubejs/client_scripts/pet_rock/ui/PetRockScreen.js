function PetRockScreen(){
    const screen = new JavaAdapter($Screen, {

        selectArea: null,
        oreVialT0: null,
        oreVialT1: null,
        oreVialT2: null,
        oreVialT3: null,
        petRock: null,

        draggedOre: null,

        setCurrentlyDraggedOre(ore) {
            this.draggedOre = ore
        },

        clearCurrentlyDraggedOre() {
            this.draggedOre = null
        },

        getCurrentlyDraggedOre() {
            return this.draggedOre
        },

        getInfoBox() { return this.infoBoxWidget },

        init() {

            let tier0Ores = [
                "modern_industrialization:raw_tin",
                "minecraft:raw_copper",
                "minecraft:raw_iron",
                "minecraft:coal",
                "modern_industrialization:raw_lead"
            ]

            let tier1Ores = [
                "minecraft:raw_gold",
                "minecraft:emerald",
                "minecraft:diamond",
                "minecraft:lapis_lazuli",
                "minecraft:quartz"
            ]

            let tier2Ores = [
                "minecraft:redstone",
                "modern_industrialization:bauxite_dust",
                "modern_industrialization:raw_nickel",
                "modern_industrialization:salt_dust",
                "modern_industrialization:raw_antimony"
            ]

            let tier3Ores = [
                "modern_industrialization:raw_uranium",
                "modern_industrialization:raw_tungsten",
                "minecraft:netherite_scrap",
                "modern_industrialization:raw_platinum",
                "modern_industrialization:monazite_dust"
            ]

            this.oreVialT0 = this.addRenderableWidget(
                OresVialWidget(
                    (((this.width / 2) | 0) - 100 - PET_ROCK_VIAL_SIZE),
                    ((this.height / 2) | 0) - 50,
                    PET_ROCK_VIAL_SIZE, PET_ROCK_VIAL_SIZE,
                    Component.literal("TEST")
                )
            )

            this.oreVialT0.setOres(tier0Ores)
            this.oreVialT0.setParentScreen(this)
            this.oreVialT0.setTierComponent(Component.ofString("T0"))

            this.oreVialT1 = this.addRenderableWidget(
                OresVialWidget(
                    (((this.width / 2) | 0) - 50 - PET_ROCK_VIAL_SIZE),
                    ((this.height / 2) | 0),
                    PET_ROCK_VIAL_SIZE, PET_ROCK_VIAL_SIZE,
                    Component.literal("TEST")
                )
            )

            this.oreVialT1.setOres(tier1Ores)
            this.oreVialT1.setParentScreen(this)
            this.oreVialT1.setTierComponent(Component.ofString("T1"))

            this.oreVialT2 = this.addRenderableWidget(
                OresVialWidget(
                    ((this.width / 2) | 0) + 50,
                    ((this.height / 2) | 0),
                    PET_ROCK_VIAL_SIZE, PET_ROCK_VIAL_SIZE,
                    Component.literal("TEST")
                )
            )

            this.oreVialT2.setOres(tier2Ores)
            this.oreVialT2.setParentScreen(this)
            this.oreVialT2.setTierComponent(Component.ofString("T2"))

            this.oreVialT3 = this.addRenderableWidget(
                OresVialWidget(
                    (((this.width / 2) | 0) + 100),
                    ((this.height / 2) | 0) - 50,
                    PET_ROCK_VIAL_SIZE, PET_ROCK_VIAL_SIZE,
                    Component.literal("TEST")
                )
            )

            this.oreVialT3.setOres(tier3Ores)
            this.oreVialT3.setParentScreen(this)
            this.oreVialT3.setTierComponent(Component.ofString("T3"))

            this.selectArea = this.addRenderableWidget(
                SelectAreaWidget(
                    ((this.width / 2) | 0) - ((PET_ROCK_SELECT_AREA_WIDTH / 2) | 0),
                    ((this.height / 2) | 0) + 30,
                    PET_ROCK_SELECT_AREA_WIDTH, PET_ROCK_SELECT_AREA_HEIGHT,
                    Component.literal("TEST")
                )
            )


            this.petRock = this.addRenderableWidget(
                PetRockWidget(
                    ((this.width / 2) | 0) - ((PET_ROCK_FACE_WIDTH / 2) | 0),
                    ((this.height / 2) | 0) + 30 - PET_ROCK_FACE_HEIGHT - 4,
                    PET_ROCK_FACE_WIDTH, PET_ROCK_FACE_HEIGHT,
                    Component.literal("TEST")
                )
            )

            this.petRock.setParentScreen(this)

        },

        isPauseScreen() { return false },

        tick() {

            this.super$tick()
            this.oreVialT0.tick()
            this.oreVialT1.tick()
            this.oreVialT2.tick()
            this.oreVialT3.tick()

        },

        render(guiGraphics, mouseX, mouseY, partialTick) {

            this.super$render(guiGraphics, mouseX, mouseY, partialTick)

        },

        renderBackground(guiGraphics, mouseX, mouseY, partialTick) {
            this.renderTransparentBackground(guiGraphics)

        },

        onOreDropped(mouseX, mouseY, ore, vial) {
            if (this.selectArea.isMouseOver(mouseX, mouseY)) {
                this.selectArea.addOre(ore)

            } else {
                if (!vial.isMouseOver(mouseX, mouseY)) {
                    vial.returnOre(ore)
                }
                this.selectArea.removeOre(ore)

            }

        },


        onOresSelect() {
            let selectedOreIds = this.selectArea.getSelectedOreIds()
            let oresToScan = new $ListTag()
            selectedOreIds.forEach(oreId => {
                oresToScan.add($StringTag.valueOf(oreId))
            })

            let data = new $CompoundTag()
            data.put("oresToScan", oresToScan)

            Client.player.sendData("milf_pet_rock_deposits_to_scan", data)
            this.onClose()

        },

    }, PET_ROCK_SCREEN_TITLE)

    return screen
}