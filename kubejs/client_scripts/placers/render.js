let placersToRender = new $ConcurrentHashMap()
let placersData = new $ConcurrentHashMap()

const DIRECTIONS = $Direction.values()

NetworkEvents.dataReceived('placers_render_new', (event) => {
    //let stamp = new Date().getTime()
    let {data, server, level} = event

    let boxBlockPosTag = data.getCompound("boxPos")
    let boxPos = new BlockPos(boxBlockPosTag.getInt("x"), boxBlockPosTag.getInt("y"), boxBlockPosTag.getInt("z"))
    let boxPosHash = boxPos.hashCode()

    let relativeStartPosTag = data.getCompound("relativeStartPos")
    let relativeStartPos = new BlockPos(
        relativeStartPosTag.getInt("x"),
        relativeStartPosTag.getInt("y"),
        relativeStartPosTag.getInt("z")
    )

    let initialDirection = $Direction.CODEC.parse(
        $NbtOps.INSTANCE, data.get("initialDirection")
    ).getOrThrow()    

    let blockStatesCache = {}
    let structureData = new $HashMap()

    let blocksList = data.getList("blocks", $Tag.TAG_COMPOUND)

    blocksList.forEach(blockEntry => {
        let blockPosCompoundTag = blockEntry.getCompound("blockPos")

        let blockPos = new BlockPos(
            blockPosCompoundTag.getInt("x"), 
            blockPosCompoundTag.getInt("y"), 
            blockPosCompoundTag.getInt("z")
        )

        let serializedBlockState = blockEntry.getCompound("blockState")

        let stateHash = serializedBlockState.hashCode()

        let blockState

        if (blockStatesCache[stateHash]){
            blockState = blockStatesCache[stateHash]
        } else {
            blockState = $NbtUtils.readBlockState(
                level.registryAccess().lookupOrThrow($Registries.BLOCK),
                serializedBlockState
            )
            blockStatesCache[stateHash] = blockState
        }


        let hashedKey = `${blockPos.hashCode()}:${stateHash}:${boxPosHash}`
        structureData.put(hashedKey, { blockPos: blockPos, blockState: blockState })
        
    })

    let meshData = getMeshData(structureData)

    if (!meshData) return

    let structureVertexBuffer = new $VertexBuffer($VertexBuffer.Usage.STATIC)

    structureVertexBuffer.bind()
    structureVertexBuffer.upload(meshData)
    $VertexBuffer.unbind()

    placersToRender.compute(boxPosHash, (key, renderData) => {
        if (renderData && renderData.vertexBuffer) {
            renderData.vertexBuffer.close()
        }
        return {
            vertexBuffer: structureVertexBuffer,
            direction: initialDirection,
            relativeStartPos: relativeStartPos
        }
    })

    placersData.put(boxPosHash, { isVisible: true, originPos: boxPos })

    
    // Utils.supplyAsync(function()  {
        
    //     return getMeshData(structureData)
    // })
    //     .thenAccept(meshData => {
    //         if (!meshData) return

    //         Client.scheduleInTicks(0, () => {

    //             let structureVertexBuffer = new $VertexBuffer($VertexBuffer.Usage.STATIC)

    //             structureVertexBuffer.bind()
    //             structureVertexBuffer.upload(meshData)
    //             $VertexBuffer.unbind()

    //             placersToRender.compute(boxPosHash, (key, renderData) => {
    //                 if (renderData && renderData.vertexBuffer) {
    //                     renderData.vertexBuffer.close()
    //                 }
    //                 return {
    //                     vertexBuffer: structureVertexBuffer, 
    //                     direction: initialDirection,
    //                     relativeStartPos:relativeStartPos
    //                 }
    //             })

    //             placersData.put(boxPosHash, { isVisible: true, originPos: boxPos })

    //             //console.log(new Date().getTime() - stamp);
    //         })
    //     }
    // )

})

NetworkEvents.dataReceived('placers_render_update', (event) => {

    let { data, server, level } = event

    let newRelativeStartPosTag = event.data.getCompound("newRelativeStartPos")
    let newRelativeStartPos = new BlockPos(
        newRelativeStartPosTag.getInt("x"), 
        newRelativeStartPosTag.getInt("y"), 
        newRelativeStartPosTag.getInt("z")
    )

    let boxBlockPosTag = event.data.getCompound("boxPos")
    let boxPos = new BlockPos(boxBlockPosTag.getInt("x"), boxBlockPosTag.getInt("y"), boxBlockPosTag.getInt("z"))
    let boxPosHash = boxPos.hashCode()

    let newDirection = $Direction.CODEC.parse(
        $NbtOps.INSTANCE, data.get("newDirection")
    ).getOrThrow()



    Client.scheduleInTicks(0, () => {
        placersToRender.compute(boxPosHash, (key, renderData) => {

            if (renderData == null) return null

            let oldDirection = renderData.direction

            if (oldDirection == newDirection) return Object.assign({}, renderData, {
                relativeStartPos: newRelativeStartPos,
            })

        })
    })

})

NetworkEvents.dataReceived('placers_remove_render', (event) => {

    let boxBlockPosTag = event.data.boxPos
    let boxPosHash = new BlockPos(boxBlockPosTag.getInt("x"), boxBlockPosTag.getInt("y"), boxBlockPosTag.getInt("z")).hashCode()

    Client.scheduleInTicks(0, () => {
        if (placersToRender.contains(boxPosHash)) {
            placersToRender.get(boxPosHash).vertexBuffer.close()
        }

        placersToRender.remove(boxPosHash)
        placersData.remove(boxPosHash)
    })



})

ClientEvents.tick(event => {
    const { player } = event
    if (placersData.size() == 0) return
    if (player.tickCount % 100 != 0) return

    placersData.forEach((hash, data) =>{
        let originPos = data.originPos
        let chunkPos = new $ChunkPos(originPos)
        let currentChunk = Client.player.chunkPosition()
        let dx = Math.abs(currentChunk.x - chunkPos.x)
        let dz = Math.abs(currentChunk.z - chunkPos.z)
        let distance = Math.max(dx, dz)

        if (distance >= Client.options.effectiveRenderDistance) {
            placersData.put(hash, { isVisible: false, originPos: originPos })
        } else {
            placersData.put(hash, { isVisible: true, originPos: originPos })
        }
    })    
})


function getMeshData(structureData) {
    if (structureData.isEmpty()) { return null }

    let bakedStatesCache = {}

    let level = Client.level
    let modelManager = Client.getModelManager()
    let randomSource = $RandomSource.create()

    let tesselator = $Tesselator.getInstance()
    let smoothQuadLighter = new $SmoothQuadLighter(Client.getBlockColors())

    let byteBufferBuilder = new $ByteBufferBuilder(4194304)

    let bufferBuilder = new $BufferBuilder(byteBufferBuilder, $VertexFormat.Mode.QUADS, $DefaultVertexFormat.POSITION_COLOR_TEX_LIGHTMAP)
    let tempPoseStack = new $PoseStack()

    let translucentModels = []
    let dummyBlockPos = new BlockPos(0,300,0)
    

    structureData.forEach((hashedKey, { blockPos, blockState }) => {
        addQuadsToBuffer(blockPos, blockState)
    })

    translucentModels.forEach(data => {
        let { blockPos, blockState } = data
        addQuadsToBuffer(blockPos, blockState, true)
    })

    let meshData = bufferBuilder.build()
    
    if (meshData) {
        return meshData
    }

    return null




    function addQuadsToBuffer(blockPos, blockState, isSecondPass) {
        let stateHash = blockState.toString().hashCode()

        if (bakedStatesCache[stateHash]) {
            let { allQuads, isTranslucent } = bakedStatesCache[stateHash]

            if (!isSecondPass && isTranslucent) {
                translucentModels.push({ blockPos, blockState })
                return
            }

            putQuadsData(blockPos, allQuads)
            return
        }

        smoothQuadLighter.setup(level, dummyBlockPos, blockState)

        let model = modelManager.getBlockModelShaper().getBlockModel(blockState)        
        let modelData = model.getModelData(level, blockPos, blockState, $ModelData.EMPTY)

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

            }
        }

        let renderTypeSet = model.getRenderTypes(blockState, randomSource, modelData)
        let renderTypeForModel = renderTypeSet.empty ? $RenderType.translucent() : renderTypeSet.asList().first
        let isTranslucent = renderTypeForModel == $RenderType.translucent()

        let allQuads = []

        let directionalQuadsToLightMap = new $HashMap()
        let directinalQuads = DIRECTIONS.reduce(
            (quadsArray, direction) =>
                quadsArray.concat(model.getQuads(
                    blockState, direction, randomSource, modelData, renderTypeForModel)
                )
            , []
        )

        directinalQuads.forEach(quad => {

            smoothQuadLighter.computeLightingForQuad(quad)

            allQuads.push({
                quad: quad,
                baseBrightness: smoothQuadLighter.getComputedBrightness().slice(),
                lightmapCoords: smoothQuadLighter.getComputedLightmap().slice()
            })
            
        })

        //console.log(directionalQuadsToLightMap);
        

        let generalQuadsToLightMap = new $HashMap()
        let generalQuads = model.getQuads(blockState, null, randomSource, modelData, renderTypeForModel)

        generalQuads.forEach(quad => {

            smoothQuadLighter.computeLightingForQuad(quad)

            allQuads.push({
                quad: quad,
                baseBrightness: smoothQuadLighter.getComputedBrightness().slice(),
                lightmapCoords: smoothQuadLighter.getComputedLightmap().slice()
            })
            
        })

        bakedStatesCache[stateHash] = { allQuads: allQuads, isTranslucent: isTranslucent }

        if (isTranslucent && !isSecondPass) {
            translucentModels.push({ blockPos: blockPos, blockState: blockState })
            return
        }

        putQuadsData(blockPos, allQuads)

        function putQuadsData(blockPos, allQuads){
            tempPoseStack.pushPose()
            tempPoseStack.translate(blockPos.getX(), blockPos.getY(), blockPos.getZ())
            let pose = tempPoseStack.last()

            allQuads.forEach(({ quad, baseBrightness, lightmapCoords })=> {
                bufferBuilder.putBulkData(
                    pose, quad,
                    [baseBrightness[0], baseBrightness[1], baseBrightness[2], baseBrightness[3]],
                    1, 1, 1, 1,
                    [lightmapCoords[0], lightmapCoords[1], lightmapCoords[2], lightmapCoords[3]],
                    $OverlayTexture.NO_OVERLAY, false
                )
            })

            tempPoseStack.popPose()

        }

    }

}

let placersRenderType = $RenderType.translucent() 
const AFTER_TRANSLUCENT_BLOCKS_STAGE = $Stage.AFTER_TRANSLUCENT_BLOCKS

NativeEvents.onEvent("net.neoforged.neoforge.client.event.RenderLevelStageEvent", event => {

    if (placersToRender.size() == 0 || event.getStage() != AFTER_TRANSLUCENT_BLOCKS_STAGE) return

    let placersShader = $GameRenderer.getPositionColorTexLightmapShader()

    placersRenderType.setupRenderState()

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
    let projectionMatrix = event.getProjectionMatrix()

    placersToRender.forEach((hash, renderData) =>{

        let placerData = placersData.get(hash)

        let { originPos, isVisible } = placerData

        if (!isVisible) return

        let { vertexBuffer, relativeStartPos } = renderData

        let localModelViewMatrix = new $Matrix4f(modelViewMatrix)

        localModelViewMatrix.translate(
            relativeStartPos.x,
            relativeStartPos.y,
            relativeStartPos.z
        )

        vertexBuffer.bind()
        vertexBuffer.drawWithShader(
            localModelViewMatrix,
            projectionMatrix,
            placersShader
        )
        $VertexBuffer.unbind()

    })

    placersRenderType.clearRenderState()

})