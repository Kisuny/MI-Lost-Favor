function DivineMintScreen(){
    const screen = new JavaAdapter($Screen, {

        guiScale: Client.window.guiScale,

        effectSelector: null,
        bossSelector: null,
        difficultySelector: null,
        infoBoxWidget: null,
        lever: null,
        tierSelector: null,
        coinAcceptor: null,

        areReelsSpinning: false,
        isCoinSequence: false,

        bossTier: "tier1",

        getInfoBox() { return this.infoBoxWidget },

        init() {

            let entitiesToRender = {}

            Object.entries(milfBosses[this.bossTier]).forEach(([bossId, bossData], index) => {

                let entityType = $BuiltInRegistries.ENTITY_TYPE.get($ResourceLocation.parse(bossId))
                let entity = entityType.create(Client.level)
                entitiesToRender[bossId] = Object.assign({}, bossData, { entity: entity })

            })

            const guiScale = this.guiScale

            let centerX = ((this.width / 2) | 0)
            let centerY = ((this.height / 2) | 0)

            //BOSS_SELECTOR
            this.bossSelector = this.addRenderableWidget(
                EntityReelWidget(
                    ((this.width / 2) | 0) - ONE_REEL_WIDTH / 2,
                    ((this.height / 2) | 0) - ONE_REEL_HEIGHT / 2 + Y_OFFSET_FROM_CENTER,
                    ONE_REEL_WIDTH, ONE_REEL_HEIGHT,
                    Component.literal("TEST")
                )
            )

            this.bossSelector.setItemsToRender(entitiesToRender)
            this.bossSelector.setParentScreen(this)
            this.bossSelector.setCurrentlySelectedID(Object.keys(entitiesToRender)[0])

            //EFFECT_SELECTOR
            this.effectSelector = this.addRenderableWidget(
                EffectReelWidget(
                    ((this.width / 2) | 0) - ONE_REEL_WIDTH / 2 - ONE_REEL_WIDTH - 5,
                    ((this.height / 2) | 0) - ONE_REEL_HEIGHT / 2 + Y_OFFSET_FROM_CENTER,
                    ONE_REEL_WIDTH, ONE_REEL_HEIGHT,
                    Component.literal("TEST")
                )
            )

            this.effectSelector.setItemsToRender(milfEffects)
            this.effectSelector.setCurrentlySelectedID("minecraft:speed")
            this.effectSelector.setParentScreen(this)

            //DIFFICULTY_SELECTOR
            this.difficultySelector = this.addRenderableWidget(
                DifficultyReelWidget(
                    ((this.width / 2) | 0) - ONE_REEL_WIDTH / 2 + ONE_REEL_WIDTH + 5,
                    ((this.height / 2) | 0) - ONE_REEL_HEIGHT / 2 + Y_OFFSET_FROM_CENTER,
                    ONE_REEL_WIDTH, ONE_REEL_HEIGHT,
                    Component.literal("TEST")
                )
            )

            this.difficultySelector.setItemsToRender(milfDifficulties)
            this.difficultySelector.setCurrentlySelectedID("normal")
            this.difficultySelector.setParentScreen(this)


            //LEVER
            this.lever = this.addRenderableWidget(
                LeverWidget(
                    ((this.width / 2) | 0) + REELS_WIDTH / 2 + 8 - (LEVER_TOP_SIZE - LEVER_BG_WIDTH) / 2,
                    ((this.height / 2) | 0) - REELS_HEIGHT / 2 + (REELS_HEIGHT - LEVER_BG_HEIGHT)
                    - (LEVER_ROD_LENGTH + LEVER_TOP_SIZE + LEVER_OFFSET) + Y_OFFSET_FROM_CENTER,
                    LEVER_TOP_SIZE,
                    (LEVER_ROD_LENGTH + LEVER_TOP_SIZE + LEVER_BG_HEIGHT),
                    Component.literal("TEST")
                )
            )

            this.lever.setParentScreen(this)

            //INFO_BOX
            this.infoBoxWidget = this.addRenderableWidget(
                InfoBoxWidget(
                    centerX - REELS_WIDTH / 2 + COIN_ACCEPTOR_WIDTH,
                    centerY - REELS_HEIGHT / 2 + Y_OFFSET_FROM_CENTER + REELS_HEIGHT + 9,
                    REELS_WIDTH - COIN_ACCEPTOR_WIDTH,
                    COIN_ACCEPTOR_HEIGHT,
                    Component.literal("TEST")
                )
            )

            this.infoBoxWidget.updateBossTier(this.bossTier)
            this.infoBoxWidget.updateBossNameAndID(entitiesToRender[this.bossSelector.getCurrentlySelectedID()].entity.getDisplayName(), this.bossSelector.getCurrentlySelectedID())
            this.infoBoxWidget.updateBossEffect({ resourceLocation: $ResourceLocation.parse("minecraft:textures/mob_effect/speed.png"), modifier: 1.4, effectID: "minecraft:speed" })
            this.infoBoxWidget.updateBossDifficulty({ resourceLocation: $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/difficulty/normal.png"), modifier: 1, name: Component.translatable("milf.divine_mint.gui.difficulty.normal") })

            //TIER_SELECTOR
            this.tierSelector = this.addRenderableWidget(
                TierSelectorWidget(
                    centerX - REELS_WIDTH / 2,
                    centerY - REELS_HEIGHT / 2 + Y_OFFSET_FROM_CENTER + REELS_HEIGHT - 1,
                    REELS_WIDTH,
                    11,
                    Component.literal("TEST")
                )
            )

            this.tierSelector.setParentScreen(this)

            //COIN_ACCEPTOR
            this.coinAcceptor = this.addRenderableWidget(
                CoinAcceptorWidget(
                    centerX - REELS_WIDTH / 2,
                    centerY - REELS_HEIGHT / 2 + Y_OFFSET_FROM_CENTER + REELS_HEIGHT + 9,
                    COIN_ACCEPTOR_WIDTH,
                    COIN_ACCEPTOR_HEIGHT,
                    Component.literal("TEST")
                )
            )

            this.coinAcceptor.setParentScreen(this)

        },

        isPauseScreen() { return false },

        tick() {

            this.lever.tick()
            this.bossSelector.tick()
            this.effectSelector.tick()
            this.difficultySelector.tick()
            this.tierSelector.tick()
            this.infoBoxWidget.tick()
            this.coinAcceptor.tick()

            this.super$tick()
        },

        render(guiGraphics, mouseX, mouseY, partialTick) {

            this.super$render(guiGraphics, mouseX, mouseY, partialTick)

        },

        renderBackground(guiGraphics, mouseX, mouseY, partialTick) {

            this.renderTransparentBackground(guiGraphics)

            this.renderReels(guiGraphics, mouseX, mouseY, partialTick)

        },

        renderReels(guiGraphics, mouseX, mouseY, partialTick) {

            let baseX = ((this.width / 2) | 0) - REELS_WIDTH / 2
            let baseY = ((this.height / 2) | 0) - REELS_HEIGHT / 2 + Y_OFFSET_FROM_CENTER

            try {

                let pose = guiGraphics.pose()

                pose.pushPose()
                pose.translate(baseX, baseY, 0)
                //REELS
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, 0, 0, 0, REELS_WIDTH, REELS_HEIGHT)
                //SPIN_TO_MINT
                guiGraphics.blit(DIVINE_MINT_GUI_1, 0, -34 - 4, 0, REELS_HEIGHT + COIN_ACCEPTOR_HEIGHT, REELS_WIDTH, 34)

                pose.popPose()

            } catch (error) {
                console.log(error);
            }


        },


        onLeverPull() {
            this.bossSelector.initiateSpin(60, true)
            this.effectSelector.initiateSpin(60, true)
            this.difficultySelector.initiateSpin(60, true)

            this.onReelsSpinStart()
            this.isCoinSequence = true

            milfPlayGUISound("milf:lever")
        },

        onReelsSpinStart() {
            this.lever.onReelsSpinStart()
            this.tierSelector.onReelsSpinStart()
            this.coinAcceptor.onReelsSpinStart()
            this.areReelsSpinning = true
        },

        onReelsSpinEnd() {
            if (this.areReelsSpinning) {
                this.areReelsSpinning = false
                this.lever.onReelsSpinEnd()
                this.tierSelector.onReelsSpinEnd()
                this.coinAcceptor.onReelsSpinEnd()

                if (this.isCoinSequence) {
                    this.isCoinSequence = false
                    this.coinAcceptor.dropCoin()
                }
            }
        },

        onTierSelect(tier) {
            //console.log(tier);

            this.bossTier = "tier" + tier

            let entitiesToRender = {}

            Object.entries(milfBosses[this.bossTier]).forEach(([bossId, bossData], index) => {

                let entityType = $BuiltInRegistries.ENTITY_TYPE.get(new $ResourceLocation.parse(bossId))
                let entity = entityType.create(Client.level)

                entitiesToRender[bossId] = Object.assign({}, bossData, { entity: entity })

            })

            this.bossSelector.changeItemsToRender(entitiesToRender, 20, { newTier: this.bossTier })

            this.areReelsSpinning = true
            this.lever.onReelsSpinStart()

        }

    }, DIVINE_MINT_SCREEN_TITLE)

    return screen
}