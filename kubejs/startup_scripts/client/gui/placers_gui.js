let $InputConstants = Platform.isClientEnvironment() ? Java.loadClass("com.mojang.blaze3d.platform.InputConstants") : null
let $GLFW = Platform.isClientEnvironment() ? Java.loadClass("org.lwjgl.glfw.GLFW") : null

NativeEvents.onEvent($RegisterGuiLayersEvent, event => {
	event.registerBelowAll("milf:placers_tooltips", (gui, delta) => global.renderPlacerTooltips(gui, delta))
})

let placersGuiTicks = Platform.isClientEnvironment() ? 0 : null
let placersGuiAnimationTV = Platform.isClientEnvironment() ? 1 : null


/**@type {Object} */ const PLACER_BLOCKS = global.PLACER_BLOCK_TO_ITEM_NAME_MAP
/**@type {Object} */ const BOX_BLOCKS = global.EMPTY_BOX_BLOCK_TO_ITEM_NAME_MAP

/**
 * @param {$GuiGraphics_} guiGraphics
 * @param {$DeltaTracker_} deltaTracker
 */
global.renderPlacerTooltips = (guiGraphics, deltaTracker) => {
	if (!Client || Client.hitResult.type != $HitResult$Type.BLOCK) return
	if (!Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos).blockState.block.hasTag("milf:placers") && !Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos).blockState.block.hasTag("milf:empty_box")) return

	const block = Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos).blockState.block
	const textComponents = block.hasTag("milf:placers") ? [
		block.name.visualOrderText,
		Component.info(Component.translatable(`milf.placers.gui1`)).visualOrderText,
		Component.info(Component.translatable(`milf.placers.gui2`)).visualOrderText,
		Component.info(Component.keybind("key.sneak").append(Component.translatable(`milf.placers.gui3`))).visualOrderText,
	] : [
		block.name.visualOrderText,
		Component.info(Component.translatable(`milf.empty_box.gui1`)).visualOrderText,
		Component.info(Component.translatable(`milf.empty_box.gui2_1`).append(Component.keybind("key.sneak").append(Component.translatable(`milf.empty_box.gui2_2`)))).visualOrderText,
		Component.info(Component.translatable(`milf.empty_box.gui3_1`).append(Component.red(Component.translatable(`milf.empty_box.gui3_2`))).append(Component.translatable("milf.empty_box.gui3_3"))).visualOrderText,
	]

	const font = Client.font

	const ANIMATION_SPEED = 0.01 * deltaTracker.getGameTimeDeltaTicks() * 7
	const ALT_TEXTURE = $ResourceLocation.fromNamespaceAndPath("simplyswords", "textures/icon/icon_alt_key_extra.png")
	
	let isAltDown = $InputConstants.isKeyDown(Client.getWindow().getWindow(), $GLFW.GLFW_KEY_LEFT_ALT)
	if (isAltDown) {
		placersGuiAnimationTV = Math.max(placersGuiAnimationTV - ANIMATION_SPEED, 0)
	} else {
		placersGuiAnimationTV = Math.min(placersGuiAnimationTV + ANIMATION_SPEED, 1)
	}

	let animationTV = easeInOutCubic(placersGuiAnimationTV)

	const TOOLTIP_HEIGHT = 43
	const ICON_ANIMATION_SCALING_FACTOR = 2

	let structureItemScale = 2.5
	structureItemScale = structureItemScale * (animationTV * ICON_ANIMATION_SCALING_FACTOR + 1)

	let maxTextWidth = 0
	textComponents.forEach(component => {
		const width = font.width(component)
		if (width > maxTextWidth) maxTextWidth = width
	})
	maxTextWidth += TOOLTIP_HEIGHT + 3

	/** @type {$Vector2ic_} */
	const tooltipPosition = $DefaultTooltipPositioner.positionTooltip(
		guiGraphics.guiWidth(), guiGraphics.guiHeight(),
		guiGraphics.guiWidth()/2, guiGraphics.guiHeight()/2 + 24,
		maxTextWidth, TOOLTIP_HEIGHT
	)
	let [baseX, baseY] = [tooltipPosition.x(), tooltipPosition.y()]

	const pose = guiGraphics.pose()

	pose.pushPose()
	pose.translate(baseX, baseY, 0)

	if (animationTV > 0.9){
		pose.pushPose()
		pose.translate(16 * structureItemScale + 3 - 23 - 1, 1.5, 0)
		guiGraphics.blit(ALT_TEXTURE, 0, 0, 0, 0, 23, 10, 23, 10)
		pose.popPose()
	}

	if(animationTV < 0.1){
		pose.pushPose()
		pose.translate(16 * structureItemScale + 3 + 3, 1.5, 0)
		let currentY = 0
		textComponents.forEach(component => {
			guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.util.FormattedCharSequence,float,float,int,boolean)"](font, component, 0, 0 + currentY, 0xFFFFFF, true)
			//component.renderText(Client.font, 0, 0 + currentY, pose.last().pose(), guiGraphics.bufferSource())
			currentY += font.lineHeight + 1
		})
		pose.popPose()
	}



	pose.pushPose()
	pose.translate(3, 3, 0)
	
	$TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 0, 16 * structureItemScale - 3, 16 * structureItemScale - 3, -500,
		0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)
	pose.popPose()


	pose.pushPose()
	pose.translate(1.5, 1.5, 0)
	pose.translate(8 * animationTV, 8 * animationTV, 0)
	let actualScale = structureItemScale - 1 * animationTV
	pose.scale(actualScale, actualScale, 1)
	const itemModel = block.hasTag("milf:placers") ? Item.of(PLACER_BLOCKS[block.id.toString()]) : Item.of(BOX_BLOCKS[block.id.toString()])

	pose.translate(8, 8, 142 + 8)
	//pose.mulPose($Axis.XP.rotation(30 * (Math.PI / 180)))

	placersGuiTicks += deltaTracker.getGameTimeDeltaTicks() * 0.03
	let angle = Math.sin(placersGuiTicks)
	pose.mulPose($Axis.YP.rotation(angle / 4))
	pose.mulPose($Axis.ZN.rotation(angle / 9))
	pose.translate(-8, -8, -142 - 8)

	guiGraphics.renderFakeItem(itemModel, 0, 0)
	
	pose.popPose()

	pose.pushPose()
	pose.translate(0, 0, -200)
	let bgMinX = 16 * structureItemScale + 3
	$TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 0, bgMinX + (maxTextWidth - bgMinX) * Math.abs(animationTV - 1), 
		TOOLTIP_HEIGHT + TOOLTIP_HEIGHT * animationTV * ICON_ANIMATION_SCALING_FACTOR - 3 * animationTV * ICON_ANIMATION_SCALING_FACTOR, -500,
		// colors as ARGB **signed** integers
		// bg-top, bg-bottom, outline-top, outline-bottom
		0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)

	pose.popPose()

	// pose.pushPose()
	// guiGraphics.fill($RenderType.gui(), 0, 0, 16.5 * structureItemScale, 16.5 * structureItemScale, 0x6f8f8f8f)
	// pose.popPose()

	pose.popPose()
}