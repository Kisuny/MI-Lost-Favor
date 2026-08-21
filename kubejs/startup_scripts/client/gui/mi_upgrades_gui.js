//const { $BlockHitResult } = require("@package/net/minecraft/world/phys")

let $Matrix4f = Java.loadClass("org.joml.Matrix4f")
let $Vector3f = Java.loadClass("org.joml.Vector3f")
let $Vector4f = Java.loadClass("org.joml.Vector4f")
let $AABB = Java.loadClass("net.minecraft.world.phys.AABB")
let $RenderSystem = Platform.isClientEnvironment() ? Java.loadClass("com.mojang.blaze3d.systems.RenderSystem") : null
// let $RenderSystem = Java.loadClass("com.mojang.blaze3d.systems.RenderSystem")
let $Axis = Java.loadClass("com.mojang.math.Axis")
/** @type {typeof import("net.minecraft.world.item.ItemStack").$ItemStack } */
let $ItemStack  = Java.loadClass("net.minecraft.world.item.ItemStack")

NativeEvents.onEvent($RegisterGuiLayersEvent, event => {
    event.registerBelowAll("milf:upgrades_tooltips", (gui, delta) => global.renderUpgradesTooltips(gui, delta))
})

let miAngleTicks = Platform.isClientEnvironment() ? 0 : null

const MI_UPGRADES = global.MI_UPGRADES

/**
 * @param {$GuiGraphics_} guiGraphics
 * @param {$DeltaTracker_} deltaTracker
 */
global.renderUpgradesTooltips = (guiGraphics, deltaTracker) => {
    if (!Client || Client.hitResult.type != $HitResult$Type.BLOCK) return
    if (Client.player.mainHandItem.id != "milf:mi_upgrader") return
    if (!Client.level.getBlock(/**@type {$BlockHitResult} */(Client.hitResult).blockPos).blockState.block.hasTag("milf:upgradable")) return

    let blockPos = (/** @type {$BlockHitResult_} */(Client.hitResult)).blockPos
    let level = Client.level
    let blockState = level.getBlockState(blockPos)
    let block = blockState.block

    let shape = blockState.getShape(level, blockPos)
    let aabb = shape.bounds().move(blockPos.x, blockPos.y, blockPos.z)

    let corners = [
        [aabb.minX, aabb.minY, aabb.minZ], [aabb.maxX, aabb.minY, aabb.minZ],
        [aabb.maxX, aabb.minY, aabb.maxZ], [aabb.minX, aabb.minY, aabb.maxZ],
        [aabb.minX, aabb.maxY, aabb.minZ], [aabb.maxX, aabb.maxY, aabb.minZ],
        [aabb.maxX, aabb.maxY, aabb.maxZ], [aabb.minX, aabb.maxY, aabb.maxZ]
    ]

    let gameRenderer = Client.gameRenderer
    const guiScale = Client.window.guiScale

    let blockCenter = new $Vector3f(
        (aabb.minX + aabb.maxX) / 2,
        (aabb.minY + aabb.maxY) / 2,
        (aabb.minZ + aabb.maxZ) / 2
    )


    let maxX = -Infinity
    let minY = Infinity
    let anyValid = false

    for (const corner of corners) {
        let pos = new $Vector3f(corner[0], corner[1], corner[2])
        let screenCoordinates = projectPosToScreen(pos, gameRenderer, deltaTracker)
        if (screenCoordinates ) {
            anyValid = true
            if (screenCoordinates.x > maxX) maxX = screenCoordinates.x
            if (screenCoordinates.y < minY) minY = screenCoordinates.y
        }
    }

    let screenBlockCenter = projectPosToScreen(blockCenter, gameRenderer, deltaTracker, guiScale)

    if(!screenBlockCenter) return

    if (!anyValid){ 
        Client.player.tell(Component.ofString("WHAT"))
        return
    } else {
        //console.log(maxX);
        //console.log(minY);
        //Client.player.tell(Component.ofString("HOW"))
    }

    
    const TOOLTIP_HEIGHT = 43
    //const tooltipWidth = 150

    const offsetX = (Client.window.getWidth() / 65)
    const offsetY = -TOOLTIP_HEIGHT - (Client.window.getHeight() / 12)
    const pointerOffset = 5

    const baseX = (maxX + offsetX) / guiScale
    const baseY = (minY + offsetY) / guiScale

    const UPGRADE_MATERIAL_SCALE = 1.4
    const UPGRADABLE_SCALE = 2.5
    const PADDING_BETWEEN_ITEMS = 12
    const HAND_ROTATION_OFFSET_Z = 10

    const pose = guiGraphics.pose()
    pose.pushPose()
    pose.translate(baseX, baseY, 0)

    pose.pushPose()
    pose.translate(0, TOOLTIP_HEIGHT, 0)

    let {angle} = toPolar(screenBlockCenter, {x:baseX, y:baseY + TOOLTIP_HEIGHT})

    pose.mulPose($Axis.ZP.rotation(Math.PI * 1.5 + angle))
    pose.translate(-8, pointerOffset, 0)
    
    //guiGraphics.hLine(0, Math.round(length), 0, 0x5f575757)
    guiGraphics.renderFakeItem(Item.of("milf:mi_upgrader"), 0, 0)
    pose.popPose()

    pose.pushPose()
    pose.translate(3, 3, 0)
    $TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 0, 16 * UPGRADABLE_SCALE - 3, 16 * UPGRADABLE_SCALE - 3, -200,
    0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)
    pose.popPose()


    pose.pushPose()
    pose.translate(1.5, 1.5, 0)
    pose.scale(UPGRADABLE_SCALE, UPGRADABLE_SCALE, 1)
    let blockToUpgrade = new $ItemStack(block)
    guiGraphics.renderFakeItem(blockToUpgrade, 0, 0)
    pose.popPose()

    //let currentX = tooltipHeight + tooltipHeight / (UPGRADABLE_SCALE / UPGRADE_MATERIAL_SCALE)
    let currentX = (16 + 1.5) * UPGRADABLE_SCALE + PADDING_BETWEEN_ITEMS * UPGRADE_MATERIAL_SCALE

    pose.pushPose()
    //pose.translate(currentX + 1, tooltipHeight / (2 * UPGRADABLE_SCALE * UPGRADE_MATERIAL_SCALE), 0)
    pose.translate(currentX, TOOLTIP_HEIGHT / 2 - (16 / 2) * UPGRADE_MATERIAL_SCALE, 0)

    //Client.player.tell(Component.ofString(String(totalAngle)))
    let upgradeMaterials = MI_UPGRADES[block.id].upgradeMaterials
    let yOffset = upgradeMaterials.length > 2 ? -11 : 0
    let xOffset = upgradeMaterials.length % 2 == 0 ? -12 : 0
    upgradeMaterials.forEach((entry, index) => {
        let {id, count} = entry
        if (index % 2 == 0 && index != 0) {
            yOffset += 22
            xOffset = -12
        }
        pose.pushPose()
        pose.translate(xOffset, yOffset, 0)
        pose.scale(UPGRADE_MATERIAL_SCALE, UPGRADE_MATERIAL_SCALE, 1)
        let upgradeMaterial = Item.of(id)
        guiGraphics.renderFakeItem(upgradeMaterial, 0, 0)
        guiGraphics.renderItemDecorations(Client.font, upgradeMaterial, 0, 0, String(count))
        xOffset+= 24
        pose.popPose()
    })



    // pose.pushPose()
    // pose.translate(8, 8, (208 - HAND_ROTATION_OFFSET_Z * UPGRADE_MATERIAL_SCALE) / UPGRADE_MATERIAL_SCALE)
    // pose.mulPose($Axis.ZP.rotation(90 * (Math.PI / 180)))
    // pose.translate(0, 0, -100)
    // miAngleTicks += deltaTracker.getGameTimeDeltaTicks() * 0.05
    // // let miAngle = Math.sin(miAngleTicks)
    // let miAngle = miAngleTicks
    // let effectiveAngle = miAngle % (2 * Math.PI)
    // if (effectiveAngle > Math.PI / 2 && effectiveAngle < Math.PI * 1.5) {
    //     pose.translate(0, 0, 200)
    // } else {
    //     //pose.translate(0, 0, 200)
    // }
    // pose.mulPose($Axis.YP.rotation(miAngle))
    // pose.translate(-8, -8, -((208 - HAND_ROTATION_OFFSET_Z * UPGRADE_MATERIAL_SCALE) / UPGRADE_MATERIAL_SCALE))
    
    // guiGraphics.renderFakeItem(Item.of("milf:mi_upgrader"), 0, 0)
    // //$ClientTooltipComponent.create(Component.ofString("x1").visualOrderText).renderText(Client.font, 0, 0, pose.last().pose(), guiGraphics.bufferSource())
    // pose.popPose()

    pose.popPose()

    currentX += 16 * UPGRADE_MATERIAL_SCALE + PADDING_BETWEEN_ITEMS * UPGRADE_MATERIAL_SCALE + 1

    pose.pushPose()
    pose.translate(currentX + 3, 3, 0)
    $TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 0, 16 * UPGRADABLE_SCALE - 3, 16 * UPGRADABLE_SCALE - 3, -200,
    0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)
    pose.popPose()


    pose.pushPose()
    pose.translate(currentX + 1.5, 1.5, 0)
    pose.scale(UPGRADABLE_SCALE, UPGRADABLE_SCALE, 1)
    const upgradesTo = Item.of(MI_UPGRADES[block.id].upgradesTo)
    guiGraphics.renderFakeItem(upgradesTo, 0, 0)
    pose.popPose()

    pose.translate(0, 0, -200)

    $TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 0, currentX + (16 + 1.5) * 2.5, TOOLTIP_HEIGHT, -200,
        0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)

    pose.popPose()
}
