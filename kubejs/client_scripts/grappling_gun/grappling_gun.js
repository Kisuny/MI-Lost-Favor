NativeEvents.onEvent($RenderLevelStageEvent, event => {
    if (event.getStage() != $Stage.AFTER_TRANSLUCENT_BLOCKS) return
    let player = Client.player
    let pose = event.getPoseStack()
    let partialTick = event.getPartialTick()
    if (player != null && player.isUsingItem() && player.getUseItem().id == "milf:grappling_gun" && player.onGround()) {
        if (!player.cooldowns.isOnCooldown(player.getUseItem())) {
            renderZiplinePlacement(player, pose, partialTick, event.camera)
        }
    }
})

NativeEvents.onEvent($InputEvent$MouseButton$Pre, event => {
    let isLeftClick = event.getButton() == $GLFW.GLFW_MOUSE_BUTTON_LEFT
    let isPress = event.getAction() == $GLFW.GLFW_PRESS
    if (isLeftClick && isPress) {
        let player = Client.player
        if (player != null && player.isUsingItem() && player.getUseItem().id == "milf:grappling_gun") {
            if (currentZiplinePos && !player.cooldowns.isOnCooldown(player.getUseItem()) && player.onGround()) {

                let dataToSend = new $CompoundTag()
                let posData = getPosCompound(currentZiplinePos)
                dataToSend.put("pos", posData)
                dataToSend.putString("fenceId", "minecraft:birch_fence")

                Client.player.sendData("milf_grappling_gun_zipline", dataToSend)

                //milfPlayGUISound("immersive_machinery:hatch_close")

            }
        }
    }
})

let currentZiplinePos = null
let fencePosCache = {
    nearPlayer: null,
    nearDestination: null
}

function renderZiplinePlacement(player, pose, partialTick, camera){
    try {
        let ziplinePlacementPos = getLookingAtBlockPos(player, 28)
        currentZiplinePos = ziplinePlacementPos
        if (!ziplinePlacementPos) return

        let level = player.level
        let playerBlockPos = player.getOnPos().above()
        let birchFenceState = Block.getBlock("minecraft:birch_fence").defaultBlockState()


        let checkIfAir = (pos) => checkColumnFromPos(level, pos, 3)
        let getFencePosNear = (pos, cacheName) => {
            let cachedFencePos = fencePosCache[cacheName]
            if (cachedFencePos && (level.getBlockState(cachedFencePos))["is(net.minecraft.world.level.block.Block)"](birchFenceState.block)) {
                return cachedFencePos
            } else {
                fencePosCache[cacheName] = null
                let fencePos = getNearbyFencePos(level, pos, birchFenceState)
                //console.log(fencePos);

                return fencePos
            }

        }

        let bufferSource = Client.renderBuffers().bufferSource()
        let fencePosNearDestination = getFencePosNear(ziplinePlacementPos, "nearDestination")
        let fencePosNearPlayer = getFencePosNear(playerBlockPos, "nearPlayer")
        let cameraPos = camera.getPosition()

        if (fencePosNearDestination && fencePosNearPlayer && fencePosNearDestination.equals(fencePosNearPlayer)) return

        let renderFence = (fencePos, fallbackPos, realPosCallback) => {

            pose.pushPose()
            let fenceOffset = 6 / 16

            render: if (fencePos) {
                pose.translate(fencePos.getX() - cameraPos.x,
                    fencePos.getY() - cameraPos.y,
                    fencePos.getZ() - cameraPos.z
                )

                

                $LevelRenderer.renderLineBox(
                    pose, bufferSource.getBuffer($RenderType.lines()),
                    fenceOffset, 0, fenceOffset,
                    1 - fenceOffset, 1, 1 - fenceOffset,
                    0.953, 0.784, 0.969, 1

                )

                realPosCallback(fencePos)
            } else {

                if (!checkIfAir(fallbackPos)) break render

                pose.translate(fallbackPos.getX() - cameraPos.x,
                    fallbackPos.getY() - cameraPos.y,
                    fallbackPos.getZ() - cameraPos.z
                )

                $LevelRenderer.renderLineBox(
                    pose, bufferSource.getBuffer($RenderType.lines()),
                    fenceOffset, 0, fenceOffset,
                    1 - fenceOffset, 3, 1 - fenceOffset,
                    0.953, 0.784, 0.969, 1

                )

                // Client.getBlockRenderer().renderSingleBlock(
                //     birchFenceState, pose, bufferSource, 15728880, OverlayTexture.NO_OVERLAY
                // )

                // pose.translate(0, 1, 0)

                // Client.getBlockRenderer().renderSingleBlock(
                //     birchFenceState, pose, bufferSource, 15728880, OverlayTexture.NO_OVERLAY
                // )

                // pose.translate(0, 1, 0)

                // Client.getBlockRenderer().renderSingleBlock(
                //     birchFenceState, pose, bufferSource, 15728880, OverlayTexture.NO_OVERLAY
                // )

                realPosCallback(fallbackPos.above(2))
            }

            pose.popPose()

        }

        let pos1, pos2

        renderFence(fencePosNearDestination, ziplinePlacementPos, (realPos) => pos1 = realPos)
        renderFence(fencePosNearPlayer, playerBlockPos, (realPos) => pos2 = realPos)

        if (pos1 && pos2) renderZipline(
            pos1.getCenter().add(0,0.3,0), 
            pos2.getCenter().add(0, 0.3, 0), 
            25, 
            pose, 
            bufferSource.getBuffer($RenderType.lines()),
            cameraPos,
            Math.max((Math.sqrt(pos1.distSqr(pos2)) / 28 * 2.5), 0.8)
        )

        

    } catch (error) {
        console.log(error);
        
    }

}

function checkColumnFromPos(level, pos, height) {
    for (let i = 0; i < height; i++) {
        if (!level.isEmptyBlock(pos.above(i))) return false
    }
    return true
}

function getNearbyFencePos(level, pos, blockState) {
    //pos = pos.above(2)

    for (let i = -3; i <= 3; i++) {
        for (let j = -3; j <= 3; j++) {
            for (let k = -3; k <= 3; k++) {
                let posToCheck = pos.east(i).south(j).below(k)
                let stateToCheck = level.getBlockState(posToCheck)
                if ((stateToCheck)["is(net.minecraft.world.level.block.Block)"](blockState.block)) return posToCheck
            }
        }
    }

    return null
}

function getQuadraticBezierPoint(fromPos,  controlPos,  toPos,  t) {
    let u = 1 - t
    let tt = t * t
    let uu = u * u

    let x = (uu * fromPos.x) + (2 * u * t * controlPos.x) + (tt * toPos.x)
    let y = (uu * fromPos.y) + (2 * u * t * controlPos.y) + (tt * toPos.y)
    let z = (uu * fromPos.z) + (2 * u * t * controlPos.z) + (tt * toPos.z)

    return new $Vec3(x, y, z)
}

function renderBezierCurve( pose,  consumer, fromPos,  controlPos,  toPos,  
    cameraPos, segments,  r,  g,  b,  a) {
    
    let matrix = pose.last().pose();
    let previousPoint = fromPos

    for (let i = 1; i <= segments; i++) {
        let t =  i / segments
        let currentPoint = getQuadraticBezierPoint(fromPos, controlPos, toPos, t)

        consumer.addVertex(matrix,
            (previousPoint.x - cameraPos.x),
            (previousPoint.y - cameraPos.y),
            (previousPoint.z - cameraPos.z)
        ).setColor(r, g, b, a).setNormal(0, 1, 0)

        consumer.addVertex(matrix,
            (currentPoint.x - cameraPos.x),
            (currentPoint.y - cameraPos.y),
            (currentPoint.z - cameraPos.z)
        ).setColor(r, g, b, a).setNormal(0, 1, 0)

        previousPoint = currentPoint
    }
}

function renderZipline(fromPos, toPos, segments, pose, consumer, cameraPos, sag){
    
    let midPos = fromPos.add(toPos).scale(0.5)
    let controlPos = midPos.add(0, -sag, 0)

    renderBezierCurve(pose, consumer, fromPos, controlPos, toPos, cameraPos, segments, 0.953, 0.784, 0.969, 1)

}

function getLookingAtBlockPos(player, maxDistance){
        let eyePosition = player.getEyePosition(Client.getTimer().getGameTimeDeltaPartialTick(false))
        let lookVector = player.getLookAngle()
    
        let traceEnd = eyePosition.add(lookVector.scale(maxDistance))
        let blockHit = player.level.clip(new $ClipContext(
            eyePosition,
            traceEnd,
            $ClipContext$Block.COLLIDER,
            $ClipContext$Fluid.NONE,
            player
        ))
        
    
        if (blockHit.getType() != $HitResult$Type.MISS) {
            let direction = blockHit.direction
            let isBottomFace = direction.step().y() == -1
            let isSideFace = direction.step().y() == 0
            let blockPos = blockHit.getBlockPos()
    
            if (isBottomFace) {
                return null
            }

            return blockPos.above()

            // if (!isSideFace) {
            //     return blockPos.above()
            // }

            // if (player.level.getBlockState(blockPos.above()).isAir()) {
            //     return blockPos.above()
            // } else if (player.level.getBlockState(blockPos.above().above()).isAir()) {
            //     return blockPos.above().above()
            // }
            
        }
    
        return null
}

 