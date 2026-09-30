function InfoBoxWidget(x, y, width, height, component) {
    return new JavaAdapter($AbstractWidget, {

        bossName: null,
        bossNameWrapped: [],
        bossID: null,
        bossData: {},
        bossTier: "tier1",

        lootRowToDisplay: 1,
        totalLootRows: 1,
        guiTicks: 1,

        effectRL: null,
        effectModifier: 1,
        effectName: null,
        effectID: null,

        bossDifficultyRL: null,
        bossDifficultyModifier: 1,
        difficultyName: null,
        difficultyID: null,

        lootModifier: 1,

        infoBoxParentScreen: null,
        textScale: 1,

        setParentScreen(screen) {
            this.infoBoxParentScreen = screen
        },

        getDataForCoin() {
            return {
                bossName: this.bossName,
                bossID: this.bossID,
                bossTier: this.bossTier,

                effectName: this.effectName,
                effectID: this.effectID,

                difficultyName: this.difficultyName,
                difficultyID: this.difficultyID,

                lootModifier: this.lootModifier.toFixed(1)
            }
        },

        renderWidget(guiGraphics, mouseX, mouseY, partialTick) {

            try {

                let pose = guiGraphics.pose()
                pose.pushPose()
                pose.translate(x, y, 0)

                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, COIN_ACCEPTOR_WIDTH, REELS_HEIGHT, REELS_WIDTH - COIN_ACCEPTOR_WIDTH, COIN_ACCEPTOR_HEIGHT)

                pose.pushPose()
                pose.translate(6, 7, 0)
                pose.pushPose()
                pose.scale(this.textScale, this.textScale, 1)

                let tempIndex = 0
                this.bossNameWrapped.forEach(line => {
                    guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.util.FormattedCharSequence,int,int,int,boolean)"](
                        Client.font, line, 0, tempIndex * (Client.font.lineHeight + 2), 0xfffef7, true
                    )
                    tempIndex++
                })

                pose.translate(0, tempIndex * (Client.font.lineHeight + 2), 0)
                pose.scale(0.8, 0.8, 1)

                guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)"](
                    Client.font, this.effectName, 0, 0, 0xfffef7, true
                )

                guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)"](
                    Client.font, this.difficultyName, 0, (Client.font.lineHeight + 2), 0xfffef7, true
                )

                pose.popPose()

                pose.translate(0, 56, 0)

                guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)"](
                    Client.font, Component.translatable("milf.divine_mint.gui.possible_loot"), -3, -(Client.font.lineHeight + 3), 0x6f2d1c, false
                )

                tempIndex = 0

                if (this.bossData?.loot) {
                    //let lootSize = this.bossData.loot.length

                    //console.log(lootSize);

                    this.bossData.loot.forEach((itemData, index) => {

                        let right = (this.lootRowToDisplay) * 4 - 1
                        let left = right - 3

                        if (left <= index && index <= right) {
                            let itemID = Object.keys(itemData)[0]
                            let item = Item.of(itemID)

                            let { count, chance } = itemData[itemID]

                            guiGraphics.renderFakeItem(item, 23 * tempIndex, 0)
                            guiGraphics.renderItemDecorations(Client.font, item, 23 * tempIndex, 0, count)
                            tempIndex++

                        }

                    })

                    //if (this.totalLootRows > 1) guiGraphics.renderItemDecorations(Client.font, Item.of("minecraft:dirt"), 23 * tempIndex - 10, 0, "...")
                }



                pose.popPose()

                let modifiersOffsetX = REELS_WIDTH - COIN_ACCEPTOR_WIDTH - 24

                guiGraphics.blit(this.effectRL, modifiersOffsetX, 6, 0, 0, 18, 18, 18, 18)

                guiGraphics.blit(this.bossDifficultyRL, modifiersOffsetX, 6 + 20 + 3, 0, 0, 18, 18, 18, 18)

                guiGraphics.drawCenteredString(Client.font, this.lootModifier.toFixed(1), modifiersOffsetX + 9, 6 + 20 + 3 + 38, 0xfffef7)

                pose.popPose()

            } catch (error) {
                console.log(error);

            }


        },

        tick() {
            if (this.totalLootRows > 1) {
                this.guiTicks++

                if (this.guiTicks >= 38) {
                    this.guiTicks = 0

                    this.lootRowToDisplay = this.lootRowToDisplay == this.totalLootRows ? 1 : this.lootRowToDisplay + 1

                }
            }
        },

        updateBossNameAndID(name, id) {
            this.bossName = name
            this.bossNameWrapped = Client.font.split(name, (REELS_WIDTH - COIN_ACCEPTOR_WIDTH - 36) / this.textScale)
            this.bossID = id
            this.bossData = milfBosses[this.bossTier][id]

            let lootSize = this.bossData.loot?.length || 0
            this.totalLootRows = Math.ceil(lootSize / 4)
            this.lootRowToDisplay = 1

            //console.log(this.totalLootRows);

            //console.log(this.bossData);

        },

        updateBossTier(tier) {
            this.bossTier = tier
        },

        updateBossEffect(effectData) {
            this.effectRL = effectData.resourceLocation
            this.effectModifier = effectData.modifier
            this.lootModifier = this.effectModifier * this.bossDifficultyModifier
            this.effectID = effectData.effectID

            let effect = $BuiltInRegistries.MOB_EFFECT.get($ResourceLocation.parse(effectData.effectID))
            this.effectName = effect ? effect.getDisplayName() : Component.translatable("milf.divine_mint.gui.no_effect")
            this.effectName = Component.of("◆ ").append(this.effectName)
            //console.log(this.effectName);

        },

        updateBossDifficulty(difficultyData) {
            this.bossDifficultyRL = difficultyData.resourceLocation
            this.bossDifficultyModifier = difficultyData.modifier
            this.lootModifier = this.effectModifier * this.bossDifficultyModifier

            this.difficultyID = difficultyData.difficultyID

            this.difficultyName = difficultyData.name
            this.difficultyName = Component.of("◆ ").append(this.difficultyName)
        },

        mouseClicked(mouseX, mouseY, button) {
            return false
        },

        updateWidgetNarration(narrationElementOutput) { }

    },
        x, y, width, height, component
    )
}