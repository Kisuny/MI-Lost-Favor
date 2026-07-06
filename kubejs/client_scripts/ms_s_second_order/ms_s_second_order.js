let currentSecondOrderTPData = { vector: null, interpolateX: false, interpolateY: false, interpolateZ: false, lastValidPos: null, lastValidPosTicks: 0, isInTheAir: true}
let secondOrderTPSequenceData = {pos:null, isTpSequence: false, isTeleported:false, remainingTicks: 0, prevRemainingTicks:0, fullTicks: 6, progress:0}
let isSecondOrderActive = false

let SECOND_ORDER_BASE_INTENSITY = 0.3
let SECOND_ORDER_BASE_RANGE = 8
let SECOND_ORDER_ADDITIONAL_RANGE = 15

NativeEvents.onEvent($InputEvent$MouseButton$Pre, event => {
    let isLeftClick = event.getButton() == $GLFW.GLFW_MOUSE_BUTTON_LEFT
    let isPress = event.getAction() == $GLFW.GLFW_PRESS
    if (isLeftClick && isPress){    

        let player = Client.player

        if (player != null && player.isUsingItem() && player.getUseItem().id == "milf:ms_s_second_order") {
            if ((currentSecondOrderTPData.vector || currentSecondOrderTPData.lastValidPos) && !player.cooldowns.isOnCooldown(player.getUseItem())){

                if (!secondOrderTPSequenceData.isTpSequence){
                    secondOrderTPSequenceData.isTpSequence = true
                    secondOrderTPSequenceData.isTeleported = false
                    secondOrderTPSequenceData.fullTicks = 6
                    secondOrderTPSequenceData.remainingTicks = secondOrderTPSequenceData.fullTicks
                    secondOrderTPSequenceData.prevRemainingTicks = secondOrderTPSequenceData.fullTicks
                    secondOrderTPSequenceData.pos = currentSecondOrderTPData.vector || currentSecondOrderTPData.lastValidPos

                    let pitch = getRandomBetween(0.9, 1.1)
                    milfPlayGUISound("milf:static", { volume: 3, pitch: pitch })

                    if (player.isUsingItem()) player.releaseUsingItem()
                }


            }
        }
    }
})

NetworkEvents.dataReceived('milf_ms_s_second_order_tp_end', (event) => {
    if (secondOrderTPSequenceData.isTpSequence) secondOrderTPSequenceData.isTeleported = true
})


function tpToCurrentSOPos(){
    let dataToSend = new $CompoundTag()
    let posData = new $CompoundTag()
    let pos = secondOrderTPSequenceData.pos
    posData.putDouble("x", pos.x)
    posData.putDouble("y", pos.y)
    posData.putDouble("z", pos.z)
    dataToSend.put("pos", posData)
    Client.player.sendData("milf_ms_s_second_order_tp", dataToSend)
}

let effectResourceLocation = $ResourceLocation.fromNamespaceAndPath("milf","shaders/post/distort_edges.json")

let shaderProgress = 0
let isShaderActive = false
let activePostChain = null

ClientEvents.tick(event => {

    if (secondOrderTPSequenceData.isTpSequence){
        if (secondOrderTPSequenceData.isTpSequence && secondOrderTPSequenceData.isTeleported && secondOrderTPSequenceData.progress <= 0.001) {
            secondOrderTPSequenceData.isTpSequence = false
        }
        secondOrderTPSequenceData.prevRemainingTicks = secondOrderTPSequenceData.remainingTicks
        if (!secondOrderTPSequenceData.isTeleported) {
            secondOrderTPSequenceData.remainingTicks--
        } else {
            secondOrderTPSequenceData.remainingTicks++
        }

        if (secondOrderTPSequenceData.remainingTicks < -100){
            secondOrderTPSequenceData.isTpSequence = false
        }
        
        if (secondOrderTPSequenceData.progress >= 0.95 && !secondOrderTPSequenceData.isTeleported) {
            tpToCurrentSOPos()
        }
    }

    if (currentSecondOrderTPData.lastValidPos){
        currentSecondOrderTPData.lastValidPosTicks--
        if (currentSecondOrderTPData.lastValidPosTicks < 0){
            currentSecondOrderTPData.lastValidPos = null
        }
    }


    let player = Client.player
    if (player != null && player.isUsingItem() && player.getUseItem().id == "milf:ms_s_second_order") {
        isSecondOrderActive = true
    } else {
        isSecondOrderActive = false 
    }

    let renderer = Client.gameRenderer

    if (!secondOrderTPSequenceData.isTpSequence){
        if (isSecondOrderActive && !isShaderActive) {
            activePostChain = new $PostChain(Client.getTextureManager(), Client.getResourceManager(), Client.getMainRenderTarget(), effectResourceLocation)
            activePostChain.resize(Client.getWindow().getWidth(), Client.getWindow().getHeight())
            isShaderActive = true
        }

        if (!isSecondOrderActive && isShaderActive) {
            activePostChain.close()
            activePostChain = null
            isShaderActive = false
        }

        if (activePostChain) {
            activePostChain.setUniform("Intensity", SECOND_ORDER_BASE_INTENSITY)
            activePostChain.setUniform("Time", getRandomBetween(0.2, 0.8))
        }
    } else{
        if (activePostChain) {
            activePostChain.setUniform("Time", getRandomBetween(0.2, 0.8))
        }
    }





})

NativeEvents.onEvent($RenderFrameEvent$Post, event => {
    let player = Client.player
    let partialTick = event.getPartialTick()
    if (activePostChain) {
        try {
           
            activePostChain.process(partialTick.getGameTimeDeltaTicks())
            if (secondOrderTPSequenceData.isTpSequence){
                let interpolatedTicks = lerp(secondOrderTPSequenceData.prevRemainingTicks, secondOrderTPSequenceData.remainingTicks)
                let progress = (secondOrderTPSequenceData.fullTicks - interpolatedTicks) / secondOrderTPSequenceData.fullTicks
                
                secondOrderTPSequenceData.progress = Math.max(0, Math.min(1, easeOutQuart(progress)))
                //console.log(secondOrderTPSequenceData.progress);
                activePostChain.setUniform("Intensity", SECOND_ORDER_BASE_INTENSITY + secondOrderTPSequenceData.progress * 1.2)
            }
        } catch (error) {
            console.log(error);
        }
    }
})

NativeEvents.onEvent($RenderLevelStageEvent, event => {
    if (event.getStage() != $Stage.AFTER_TRANSLUCENT_BLOCKS) return
    let player = Client.player
    let pose = event.getPoseStack()
    let partialTick = event.getPartialTick()
    if (player != null && player.isUsingItem() && player.getUseItem().id == "milf:ms_s_second_order") {
        if (!player.cooldowns.isOnCooldown(player.getUseItem())) {
            renderSecondOrderTp(player, pose, partialTick, event.camera)
        }
    }
})

function renderSecondOrderTp(player, pose, partialTick, camera) {
    try {

        let tpPosData = getSecondOrderTPPos(player, SECOND_ORDER_BASE_RANGE)
        if (secondOrderTPSequenceData.isTpSequence) { tpPosData = currentSecondOrderTPData }
        if (!tpPosData) {
            if (currentSecondOrderTPData.vector && !currentSecondOrderTPData.isInTheAir){
                currentSecondOrderTPData.lastValidPos = currentSecondOrderTPData.vector
                currentSecondOrderTPData.vector = null
                currentSecondOrderTPData.lastValidPosTicks = 20
            }
            if (!currentSecondOrderTPData.lastValidPos){
                return
            }
            tpPosData = { vector: currentSecondOrderTPData.lastValidPos}
            
        }
        let position = tpPosData.vector
        let cameraPos = camera.getPosition()

        pose.pushPose()

        // let renderX = interpolateX ? lerp(player.xo, player.x) + (position.x - player.x) - cameraPos.x : position.x - cameraPos.x
        // let renderY = interpolateY ? lerp(player.yo, player.y) + (position.y - player.y) - cameraPos.y : position.y - cameraPos.y
        // let renderZ = interpolateZ ? lerp(player.zo, player.z) + (position.z - player.z) - cameraPos.z : position.z - cameraPos.z

        let renderX = position.x - cameraPos.x
        let renderY = position.y - cameraPos.y
        let renderZ = position.z - cameraPos.z


        pose.translate(renderX, renderY, renderZ)

        let renderDispatcher = Client.getEntityRenderDispatcher()
        let bufferSource = Client.renderBuffers().bufferSource()

        let rotation = lerp(player.yRotLast, player.yRot)

        $RenderSystem.enableBlend()
        $RenderSystem.setShaderColor(1, 1, 1, 0.4)

        renderDispatcher.render(
            player,
            0, 0, 0,
            rotation,
            partialTick.getGameTimeDeltaPartialTick(true),
            pose,
            bufferSource,
            15728880
        )

        bufferSource.endBatch()

        $RenderSystem.disableBlend()
        $RenderSystem.setShaderColor(1, 1, 1, 1)
        

        pose.popPose()

        if (tpPosData.vector != currentSecondOrderTPData.lastValidPos) {
            currentSecondOrderTPData.vector = tpPosData.vector
            currentSecondOrderTPData.isInTheAir = tpPosData.isInTheAir
        }
        
    } catch (error) {
        console.log(error);
        
    }

}

function getSecondOrderTPPos(player, maxDistance){
    let eyePosition = player.getEyePosition(Client.getTimer().getGameTimeDeltaPartialTick(false))
    let lookVector = player.getLookAngle()

    let traceEnd = eyePosition.add(lookVector.scale(maxDistance))

    let blockHit = player.level.clip(new $ClipContext(
        eyePosition,
        traceEnd.add(lookVector.scale(SECOND_ORDER_ADDITIONAL_RANGE)),
        $ClipContext$Block.COLLIDER,
        $ClipContext$Fluid.NONE,
        player
    ))
    

    if (blockHit.getType() != $HitResult$Type.MISS) {
        let direction = blockHit.direction
        let isSideFace = direction.step().y() == 0
        let isBottomFace = direction.step().y() == -1
        let blockHitLocation = blockHit.getLocation()

        if (isBottomFace) {
            return null
        }

        if (!isSideFace){
            return { vector: blockHitLocation}
        } 


        let blockPos = blockHit.getBlockPos()
        if (player.level.getBlockState(blockPos.above()).isAir()) {
            let vector = new Vec3d(blockHitLocation.x, blockPos.getCenter().add(0, 0.5, 0).y, blockHitLocation.z)
            return { vector: vector}
            //return blockPos.getCenter().add(0, 0.5, 0)
        } else if (player.level.getBlockState(blockPos.above().above()).isAir()) {
            let vector = new Vec3d(blockHitLocation.x, blockPos.above().getCenter().add(0, 0.5, 0).y, blockHitLocation.z)
            return { vector: vector }
        } else {
            return null
        }

        
    }

    return { vector: traceEnd, isInTheAir:true }
}
