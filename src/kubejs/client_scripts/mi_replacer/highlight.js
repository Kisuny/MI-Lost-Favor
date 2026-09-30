
let $LinkedList = Java.loadClass("java.util.LinkedList")

let lastKnownSetOfReplaceableBlocks = []
let lastKnownReplaceableBlockPos = null
let isMiReplacerActive = false
let $Vector3f = Java.loadClass("org.joml.Vector3f")
let $ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack")



let MI_REPLACEABLE = global.MI_REPLACEABLE

ClientEvents.highlight(event => {
    if (event.player.mainHandItem.id != "milf:mi_replacer") {
            isMiReplacerActive = false
            return
        }
    let targetBlock = event.getTargetBlock()
    if (event.client.hitResult.type != $HitResult$Type.BLOCK) {
        isMiReplacerActive = false
        return
    } else {

    }
    if (!Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos).blockState.block.hasTag("milf:replaceable")) {
        isMiReplacerActive = false
        return
    } 

    // event.addTargetBlock(0xc6b2db)
    isMiReplacerActive = true
    if (!targetBlock.pos.equals(lastKnownReplaceableBlockPos)){
        console.log(targetBlock.pos, lastKnownReplaceableBlockPos);
        // isMiReplacerActive = true
        lastKnownReplaceableBlockPos = targetBlock.pos
        lastKnownSetOfReplaceableBlocks = getConnectedBlocksPos(event.level, targetBlock.pos, 96)
        console.log("NEW");
        
    } else {
        //isMiReplacerActive = true
    }
    lastKnownSetOfReplaceableBlocks.forEach(pos => {
        event.addBlock(pos, 0xc6b2db)
    })

})

ItemEvents.firstRightClicked("milf:mi_replacer", event => {
    if (isMiReplacerActive){
        let blockPosTag = new $ListTag()

        lastKnownSetOfReplaceableBlocks.forEach((blockPos) => {
            blockPosTag.add($NbtUtils.writeBlockPos(blockPos))
        })

        let dataToSend = new $CompoundTag()
        dataToSend.put("blocksToUpgradePositions", blockPosTag)
        let targetBlockId = Client.level.getBlock(Client.hitResult.blockPos).blockState.block.id
        dataToSend.putString("upgradeFromId", targetBlockId)
        dataToSend.putString("upgradeToId", MI_REPLACEABLE[targetBlockId].upgradesTo)

        dataToSend.putIntArray("targetBlockPos",$NbtUtils.writeBlockPos(lastKnownReplaceableBlockPos))

        Client.player.sendData("milf_mi_replacer_replace", dataToSend)        
    }
    
})

NativeEvents.onEvent($RenderGuiLayerEvent$Post, event => {
    if (event.getName().equals($VanillaGuiLayers.CROSSHAIR)) {
        if (Client.options.hideGui) return
        if (!isMiReplacerActive) return
        if (!Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos).blockState.block.hasTag("milf:replaceable")){
            isMiReplacerActive = false
            return
        }
        renderMiReplacerGui(event.getGuiGraphics(), event.getPartialTick())
    }

})

function renderMiReplacerGui(guiGraphics, deltaTracker){
    try {
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
        let guiScale = Client.window.guiScale

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
            if (screenCoordinates) {
                anyValid = true
                if (screenCoordinates.x > maxX) maxX = screenCoordinates.x
                if (screenCoordinates.y < minY) minY = screenCoordinates.y
            }
        }

        let screenBlockCenter = projectPosToScreen(blockCenter, gameRenderer, deltaTracker, guiScale)

        if (!screenBlockCenter) return

        if (!anyValid) {
            Client.player.tell(Component.ofString("WHAT"))
            return
        } else {
            //console.log(maxX);
            //console.log(minY);
            //Client.player.tell(Component.ofString("HOW"))
        }


        let TOOLTIP_HEIGHT = 43
        //const tooltipWidth = 150

        let offsetX = (Client.window.getWidth() / 65)
        let offsetY = -TOOLTIP_HEIGHT - (Client.window.getHeight() / 12)
        let pointerOffset = 5

        let baseX = (maxX + offsetX) / guiScale
        let baseY = (minY + offsetY) / guiScale

        let UPGRADE_MATERIAL_SCALE = 1.4
        let UPGRADABLE_SCALE = 2.5
        let PADDING_BETWEEN_ITEMS = 12
        let HAND_ROTATION_OFFSET_Z = 10

        let pose = guiGraphics.pose()
        pose.pushPose()
        pose.translate(baseX, baseY, 0)

        pose.pushPose()
        pose.translate(0, TOOLTIP_HEIGHT, 0)

        let { angle } = toPolar(screenBlockCenter, { x: baseX, y: baseY + TOOLTIP_HEIGHT })

        pose.mulPose($Axis.ZP.rotation(Math.PI * 1.5 + angle))
        pose.translate(-8, pointerOffset, 0)

        guiGraphics.renderFakeItem(Item.of("milf:mi_replacer"), 0, 0)
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

        let currentX = (16 + 1.5) * UPGRADABLE_SCALE + PADDING_BETWEEN_ITEMS * UPGRADE_MATERIAL_SCALE

        pose.pushPose()
        pose.translate(currentX, TOOLTIP_HEIGHT / 2 - (16 / 2) * UPGRADE_MATERIAL_SCALE, 0)

        let upgradeMaterials = [{id:MI_REPLACEABLE[block.id].upgradesTo}]
        let yOffset = upgradeMaterials.length > 2 ? -11 : 0
        let xOffset = upgradeMaterials.length % 2 == 0 ? -12 : 0
        upgradeMaterials.forEach((entry, index) => {
            let { id } = entry
            if (index % 2 == 0 && index != 0) {
                yOffset += 22
                xOffset = -12
            }
            pose.pushPose()
            pose.translate(xOffset, yOffset, 0)
            pose.scale(UPGRADE_MATERIAL_SCALE, UPGRADE_MATERIAL_SCALE, 1)
            let upgradeMaterial = Item.of(id)
            guiGraphics.renderFakeItem(upgradeMaterial, 0, 0)
            guiGraphics.renderItemDecorations(Client.font, upgradeMaterial, 0, 0, String(lastKnownSetOfReplaceableBlocks.size()))
            xOffset += 24
            pose.popPose()
        })

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
        let upgradesTo = Item.of(MI_REPLACEABLE[block.id].upgradesTo)
        guiGraphics.renderFakeItem(upgradesTo, 0, 0)
        pose.popPose()

        pose.translate(0, 0, -200)

        $TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 0, currentX + (16 + 1.5) * 2.5, TOOLTIP_HEIGHT, -200,
            0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)

        pose.popPose()
    } catch (error) {
        console.log(error);
        
    }
    
}

function toPolar(point1, point2) {
    let dx = point1.x - point2.x
    let dy = point1.y - point2.y

    let length = Math.sqrt(dx * dx + dy * dy)
    let angle = Math.atan2(dy, dx)

    return { length: length, angle: angle }
}


function getConnectedBlocksPos(level, startPos, maxBlocks) {

    let visited = new $HashSet()
    let queue = new $LinkedList()

    let startState = level.getBlockState(startPos)

    queue.add(startPos)
    visited.add(startPos)

    while (!queue.isEmpty() && visited.size() < maxBlocks) {

        let currentPos = queue.poll()

        for (let direction of DIRECTIONS) {
            let neighborPos = currentPos.relative(direction)

            if (!visited.contains(neighborPos)) {
                let neighborState = level.getBlockState(neighborPos)

                if (neighborState.is(startState.getBlock())) {
                    visited.add(neighborPos)
                    queue.add(neighborPos)
                }
            }
        }
    }
    return visited
}
