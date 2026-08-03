let placersToRender = new Map()
let placersData = new Map()

const DIRECTIONS = $Direction.values()
const RENDER_TYPE_TRANSLUCENT = $RenderType.translucent()
const OVERLAY_NO_OVERLAY = $OverlayTexture.NO_OVERLAY
const MODEL_DATA_EMPTY = $ModelData.EMPTY

NetworkEvents.dataReceived('placers_render', (event) => {

    let boxBlockPosTag = event.data.boxPos
    let boxPos = new BlockPos(boxBlockPosTag.getInt("x"), boxBlockPosTag.getInt("y"), boxBlockPosTag.getInt("z"))
    let boxPosHash = boxPos.hashCode()

    //console.log(event.data);
    let hashedBlockStates = {}
    let structureData = new Map()

    for (let data of event.data.blocks){

        let id = data.getString("id")
        let properties = I_HATE_COMPOUND_TAGS(data.properties)
        let blockPosCTag  = data.blockPos

        let idAndPropertiesHash = `${id.hashCode()}:${data.properties.hashCode()}`

        let blockPos = new BlockPos(blockPosCTag.getInt("x"), blockPosCTag.getInt("y"), blockPosCTag.getInt("z"))
        /**@type {$BlockState_}*/ let blockState
        if (hashedBlockStates[idAndPropertiesHash]){
            blockState = hashedBlockStates[idAndPropertiesHash]
        } else {
            blockState = Block.withProperties(Block.getBlock(id).defaultBlockState(), properties)
            hashedBlockStates[idAndPropertiesHash] = blockState            
        }

        //let hash = blockPos.hashCode() + data.properties.hashCode() + id.hashCode() + boxPosHash
        let hashedKey = `${blockPos.hashCode()}:${idAndPropertiesHash}:${boxPosHash}`

        structureData.set(hashedKey,  {blockPos: blockPos, blockState: blockState})

    }

    let vertexBuffer = getVertexBuffer(structureData)

    if (vertexBuffer) {
        if (placersToRender.has(boxPosHash)) {
            placersToRender.get(boxPosHash).close()
        }
        placersToRender.set(boxPosHash, vertexBuffer)
        placersData.set(boxPosHash, { isVisible: true, originPos: boxPos })
    }

})

NetworkEvents.dataReceived('placers_remove_render', (event) => {

    let boxBlockPosTag = event.data.boxPos
    let boxPosHash = new BlockPos(boxBlockPosTag.getInt("x"), boxBlockPosTag.getInt("y"), boxBlockPosTag.getInt("z")).hashCode()

    if (placersToRender.has(boxPosHash)){
        placersToRender.get(boxPosHash).close()
    }

    placersToRender.delete(boxPosHash)
    placersData.delete(boxPosHash)

})

ClientEvents.tick(event => {
    const { player } = event
    if (placersData.size == 0) return
    if (player.tickCount % 100 != 0) return

    placersData.forEach((data, hash) =>{
        let originPos = data.originPos
        let chunkPos = new $ChunkPos(originPos)
        let currentChunk = Client.player.chunkPosition()
        let dx = Math.abs(currentChunk.x - chunkPos.x)
        let dz = Math.abs(currentChunk.z - chunkPos.z)
        let distance = Math.max(dx, dz)

        if (distance >= Client.options.effectiveRenderDistance) {
            placersData.set(hash, { isVisible: false, originPos: originPos })
        } else {
            placersData.set(hash, { isVisible: true, originPos: originPos })
        }
    })    
})

function getVertexBuffer(structureToAdd) {
    if (structureToAdd.size == 0) { return null }

    let level = Client.level
    let modelManager = Client.getModelManager()
    let randomSource = level.getRandom()

    let tesselator = $Tesselator.getInstance()
    let smoothQuadLighter = new $SmoothQuadLighter($BlockColors.createDefault())

    //let bufferBuilder = Client.renderBuffers().bufferSource().getBuffer(renderType)
    let bufferBuilder = tesselator.begin($VertexFormat.Mode.QUADS, $DefaultVertexFormat.POSITION_COLOR_TEX_LIGHTMAP)

    let tempPoseStack = new $PoseStack()

    let translucentModels = []

    for (const data of structureToAdd.values()) {
        let { blockPos, blockState } = data
        addQuadsToBuffer(blockPos, blockState)
    }

    translucentModels.forEach(data => {
        let { blockPos, blockState } = data
        addQuadsToBuffer(blockPos, blockState, true)
    })

    let meshData = bufferBuilder.build()
    if (meshData) {
        let structureVertexBuffer = new $VertexBuffer($VertexBuffer.Usage.STATIC)
        structureVertexBuffer.bind()
        structureVertexBuffer.upload(meshData)
        $VertexBuffer.unbind()
        return structureVertexBuffer
    } else {
        return null
    }

    function addQuadsToBuffer(blockPos, /**@type {$BlockState_}*/ blockState, isTranslucent) {

        smoothQuadLighter.setup(level, blockPos, blockState)

        let model = modelManager.getBlockModelShaper().getBlockModel(blockState)        

        let modelData = model.getModelData(level, blockPos, blockState, MODEL_DATA_EMPTY)

        handleEntities()
        function handleEntities(){
            if (blockState.hasBlockEntity()) {

                let block = blockState.getBlock()
                let blockEntityInstance = block.blockEntityInstance

                if (blockEntityInstance) {
                    blockEntityInstance.orientation.facingDirection = Client.player.getNearestViewDirection().getOpposite()
                    modelData = blockEntityInstance.getModelData()
                    return
                }

                // let entity = block.newBlockEntity(blockPos, blockState)
                // if (entity.sideConfig){

                //     entity.sideConfig["put(java.lang.Object,boolean)"](Direction.WEST, false)
                //     let compoundTag = new $CompoundTag()
                //     compoundTag.putByte("connections", 3)
                //     console.log(compoundTag);
                //     console.log(entity);

                //     console.log(entity.sideConfig);
                    
                    
                //     entity.level = Client.level
                //     //entity.writeCustomNBT(compoundTag, false, Client.level.registryAccess())
                //     console.log(entity.updateConnectionByte(Direction.WEST));
                //     console.log(entity.getAvailableConnectionByte());
                    
                //     console.log(entity.level);
                    
                //     modelData = entity.getModelData()
                //     console.log(modelData.getProperties());
                    
                // }

            }
        }

        let renderTypeSet = model.getRenderTypes(blockState, randomSource, modelData)
        let renderTypeForModel = renderTypeSet.empty ? RENDER_TYPE_TRANSLUCENT : renderTypeSet.asList().first

        if (renderTypeForModel == RENDER_TYPE_TRANSLUCENT && !isTranslucent) {
            translucentModels.push({ blockPos:blockPos, blockState:blockState })
            return
        }


        tempPoseStack.pushPose()
        tempPoseStack.translate(blockPos.getX(), blockPos.getY(), blockPos.getZ())
        let pose = tempPoseStack.last()

        for (let dir of DIRECTIONS) {

            let quads = model.getQuads(blockState, dir, randomSource, modelData, renderTypeForModel)
            for (let quad of quads) {

                smoothQuadLighter.computeLightingForQuad(quad)

                let baseBrightness = smoothQuadLighter.getComputedBrightness()
                let lightmapCoords = smoothQuadLighter.getComputedLightmap()

                bufferBuilder.putBulkData(pose, quad, [baseBrightness[0], baseBrightness[1], baseBrightness[2], baseBrightness[3]],
                    1, 1, 1, 1, [lightmapCoords[0], lightmapCoords[1], lightmapCoords[2], lightmapCoords[3]], OVERLAY_NO_OVERLAY, false)

                // let shade = Client.level.getShade(quad.getDirection(), quad.isShade())
                // let light = $LevelRenderer.getLightColor(Client.level, blockPos)

                //bufferBuilder.putBulkData(pose, quad, [shade, shade, shade, shade], 1, 1, 1, 1, [light, light, light, light] , $OverlayTexture.NO_OVERLAY, false)
                //bufferBuilder.putBulkData(pose, quad, 1, 1, 1, 1, $LevelRenderer.getLightColor(Client.level, blockPos), $OverlayTexture.NO_OVERLAY)

            }

        }

        let generalQuads = model.getQuads(blockState, null, randomSource, modelData, renderTypeForModel)
        for (let quad of generalQuads) {

            smoothQuadLighter.computeLightingForQuad(quad)

            let baseBrightness = smoothQuadLighter.getComputedBrightness()
            let lightmapCoords = smoothQuadLighter.getComputedLightmap()

            bufferBuilder.putBulkData(pose, quad, [baseBrightness[0], baseBrightness[1], baseBrightness[2], baseBrightness[3]],
                1, 1, 1, 1, [lightmapCoords[0], lightmapCoords[1], lightmapCoords[2], lightmapCoords[3]], OVERLAY_NO_OVERLAY, false)

            // let shade = Client.level.getShade(quad.getDirection(), quad.isShade())
            // let light = $LevelRenderer.getLightColor(Client.level, blockPos)

            //bufferBuilder.putBulkData(pose, quad, [shade, shade, shade, shade], 1, 1, 1, 1, [light, light, light, light], $OverlayTexture.NO_OVERLAY, false)
            //bufferBuilder.putBulkData(pose, quad, 1, 1, 1, 1, $LevelRenderer.getLightColor(Client.level, blockPos), $OverlayTexture.NO_OVERLAY)

        }

        tempPoseStack.popPose()

    }

}

let placersRenderType = $RenderType.translucent() 
const AFTER_TRANSLUCENT_BLOCKS_STAGE = $Stage.AFTER_TRANSLUCENT_BLOCKS

NativeEvents.onEvent("net.neoforged.neoforge.client.event.RenderLevelStageEvent", event => {

    if (placersToRender.size == 0 || event.getStage() != AFTER_TRANSLUCENT_BLOCKS_STAGE) return

    let placersShader = $GameRenderer.getPositionColorTexLightmapShader()
    //let placersShader = $GameRenderer.getRendertypeSolidShader()
    //let placersShader = $RenderSystem.getShader()
    //let placersShader = $GameRenderer.getRendertypeTranslucentShader()
    //let placersShader = $GameRenderer.getRendertypeCutoutShader()
    //let placersShader = $GameRenderer.getRendertypeTranslucentMovingBlockShader()
    //let placersShader = $GameRenderer.getRendertypeOutlineShader()

    //console.log(placersShader.FOG_START + " " + placersShader.FOG_END + " " + placersShader.FOG_SHAPE + " " + placersShader.FOG_COLOR)
    // $RenderSystem.setShaderFogColor(1,1,1)
    // $RenderSystem.setShaderFogStart(1)
    // $RenderSystem.setShaderFogEnd(5)
    // $RenderSystem.setShaderFogShape($FogShape.SPHERE)

    placersRenderType.setupRenderState();
    //$RenderSystem.depthMask(false)

    let gameRenderer = Client.gameRenderer
    let modelViewMatrix = new $Matrix4f()
    let modelViewMatrixEvent = event.getModelViewMatrix()
    let camera = gameRenderer.mainCamera

    modelViewMatrixEvent.translate(
        -camera.getPosition().x,
        -camera.getPosition().y,
        -camera.getPosition().z,
        modelViewMatrix
    )
    //console.log(modelViewMatrix + " " + modelViewMatrixEvent);
    let projectionMatrix = event.getProjectionMatrix()

    placersToRender.forEach((vertexBuffer, hash) =>{

        if (!placersData.get(hash).isVisible) return

        vertexBuffer.bind()
        vertexBuffer.drawWithShader(
            modelViewMatrix,
            projectionMatrix,
            placersShader
        )
        $VertexBuffer.unbind()

    })
    //$RenderSystem.depthMask(true)

    placersRenderType.clearRenderState()
        

})