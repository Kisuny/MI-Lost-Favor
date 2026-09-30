function CoinAcceptorWidget(x, y, width, height, component) {
    return new JavaAdapter($AbstractWidget, {
        coinAcceptorParentScreen: null,
        areReelsSpinning: false,

        isCoinDropped: false,
        coinItemStack: null,
        coinData: null,

        coinTooltip: null,
        coinTooltipHeight: 0,
        coinTooltipWidth: 0,

        coinProgress: 0,
        prevCoinProgress: 0,

        setParentScreen(screen) {
            this.coinAcceptorParentScreen = screen
        },

        renderWidget(guiGraphics, mouseX, mouseY, partialTick) {

            try {

                let pose = guiGraphics.pose()

                pose.pushPose()
                pose.translate(x, y, 0)

                pose.pushPose()
                pose.translate(0, 0, 0)

                //BG
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, 0, REELS_HEIGHT, COIN_ACCEPTOR_WIDTH, COIN_ACCEPTOR_HEIGHT)
                pose.popPose()

                //COIN
                if (this.isCoinDropped) {

                    let coinProgress = this.prevCoinProgress + (this.coinProgress - this.prevCoinProgress) * Client.getTimer().getGameTimeDeltaPartialTick(false)

                    let yOffset = 58 * coinProgress
                    pose.translate(14, yOffset, 0)

                    guiGraphics.enableScissor(
                        x,
                        y + (COIN_ACCEPTOR_HEIGHT - 28),
                        x + COIN_ACCEPTOR_WIDTH,
                        y + COIN_ACCEPTOR_HEIGHT
                    )

                    if (this.isHovered()) {
                        guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, 10, REELS_HEIGHT + COIN_ACCEPTOR_HEIGHT + 34 + 11, 5, 19)
                        guiGraphics.disableScissor()
                        pose.translate(-this.coinTooltipWidth - COIN_ACCEPTOR_WIDTH, -this.coinTooltipHeight + 28, 0)
                        guiGraphics.renderTooltip(Client.font, this.coinTooltip, this.coinItemStack.getTooltipImage(), 0, 0)

                    } else {
                        pose.translate(1, 1, 0)
                        guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, 7, REELS_HEIGHT + COIN_ACCEPTOR_HEIGHT + 34 + 11, 3, 18)
                        guiGraphics.disableScissor()
                    }

                }

                pose.popPose()
            } catch (error) {
                console.log(error);

            }


        },

        tick() {
            if (this.isCoinDropped) {
                this.prevCoinProgress = this.coinProgress

                this.coinProgress = Math.min(1, this.coinProgress + 0.1)
            }

        },

        mouseClicked(mouseX, mouseY, button) {
            if (button == 0 && this.isMouseOver(mouseX, mouseY) && !this.areReelsSpinning && this.isCoinDropped) {
                this.isCoinDropped = false
                milfPlayGUISound("milf:coin_spin")

                Client.player.sendData("milf_divine_mint_give_divine_coin", this.coinData)

                return true
            }
            return false
        },

        mouseReleased(mouseX, mouseY, button) {

            if (this.areReelsSpinning) return this.super$mouseReleased(mouseX, mouseY, button)

            return this.super$mouseReleased(mouseX, mouseY, button)
        },

        dropCoin() {
            let coinStack = Item.of("milf:divine_coin")

            let data = new $CompoundTag()

            let dataForCoin = this.coinAcceptorParentScreen.getInfoBox().getDataForCoin()

            let { bossName, effectName, difficultyName, bossID, effectID, bossTier, difficultyID, lootModifier } = dataForCoin

            let registryAccess = Client.level.registryAccess()

            let jsonBossName = $Component$Serializer.toJson(bossName, registryAccess)
            let jsonEffectName = $Component$Serializer.toJson(effectName, registryAccess)
            let jsonDifficultyName = $Component$Serializer.toJson(difficultyName, registryAccess)

            data.putString("bossNameJson", jsonBossName)
            data.putString("effectNameJson", jsonEffectName)
            data.putString("difficultyNameJson", jsonDifficultyName)

            data.putString("bossID", bossID)
            data.putString("effectID", effectID)
            data.putString("difficultyID", difficultyID)

            data.putString("bossTier", bossTier)
            data.putString("lootModifier", lootModifier)

            coinStack.set($DataComponents.CUSTOM_DATA, data)

            this.coinData = data
            this.coinItemStack = coinStack

            let tooltipComponents = $Screen.getTooltipFromItem(Client, coinStack)
            this.coinTooltip = tooltipComponents

            let tooltipHeight = 0
            let tooltipWidth = 0

            for (let component of tooltipComponents) {
                let componentWidth = Client.font.width(component.getVisualOrderText())
                if (componentWidth > tooltipWidth) tooltipWidth = componentWidth
                tooltipHeight += Client.font.lineHeight + 2
            }

            this.coinTooltipHeight = tooltipHeight
            this.coinTooltipWidth = tooltipWidth

            milfPlayGUISound("milf:coin_drop")

            this.coinProgress = 0
            this.prevCoinProgress = 0

            this.isCoinDropped = true
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