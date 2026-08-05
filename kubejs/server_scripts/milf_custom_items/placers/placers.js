//const { $BlockRightClickedKubeEvent } = require("@package/dev/latvian/mods/kubejs/block")

//priority: 10

const { 
    PLACER_ENABLED_PROPERTY,
    PLACER_ACTIVE_MACHINE_SHAPE_PROPERTY,
    PLACER_PREVIEW_OFFSET_PROPERTY,
    PLACER_BLOCK_TO_ITEM_NAME_MAP,
    EMPTY_BOX_BLOCK_TO_ITEM_NAME_MAP
} = global

const PLACER_BLOCKS = Object.keys(PLACER_BLOCK_TO_ITEM_NAME_MAP)
const BOX_BLOCKS = Object.keys(EMPTY_BOX_BLOCK_TO_ITEM_NAME_MAP)

const BOX_TO_PLAYERS_MAP = {
    map: {},

    addPlayer(box, player){
        if (!this.map[box]){
            this.map[box] = []
        }
        this.map[box].push(player)
    },

    removePlayer(box, player){
        const array = this.map[box]

        if(!array) return false

        const index = array.indexOf(player)

        if(index == -1) return false

        array.splice(index, 1)

        if(array.length == 0){
            delete this.map[box]
        }

        return true
    },

    getPlayers(box){
        const array = this.map[box]
        return array ? array.slice() : []
    },

    hasBox(box){
        return this.map.hasOwnProperty(box)
    },

    deleteBox(box){
        if(this.map[box]){
            delete this.map[box]
            return true
        }
        return false
    }
}

function getRotationFromDirection(direction){
    switch (direction) {
        case $Direction.EAST:
            return $Rotation.CLOCKWISE_90
        case $Direction.WEST:
            return $Rotation.COUNTERCLOCKWISE_90
        case $Direction.NORTH:
            return $Rotation.NONE
        case $Direction.SOUTH:
            return $Rotation.CLOCKWISE_180
        default:
            return null
    }
}

const PARTICLES = {
    placed:"spectrum:shooting_star",
    dispersed:"minecraft:instant_effect",
    error:"minecraft:gust"
}
const MI_MODS = ["modern_industrialization", "mi_tweaks", "yet_another_industrialization", "extended_industrialization"]
const NBT_HELPER = {

    templatesCache: {},

    getNBTCompoundTag(modName, templateName, /**@type {import("net.minecraft.server.MinecraftServer").$MinecraftServer$$Original} */ resourceManager) {

        let cachedData = this.templatesCache[`${modName}:${templateName}`]

        if (cachedData) {
            //console.log(this.templatesCache);
            
            return cachedData
        }

        try {
            let structureLocation = $ResourceLocation.fromNamespaceAndPath(modName,`structure/multiblocks/${templateName}.nbt`)
            let resource = resourceManager.getResource(structureLocation)
            
            if (!resource.isPresent()) {
                console.log(`Structure not found: ${templateName}`)
                return null
            }

            let inputStream = resource.get().open()
            let nbtData = $NbtIo["readCompressed(java.io.InputStream,net.minecraft.nbt.NbtAccounter)"](inputStream, $NbtAccounter.unlimitedHeap())
            inputStream.close()

            this.templatesCache[`${modName}:${templateName}`] = nbtData
            
            return nbtData
        } catch (error) {
            console.log(error)
        }        
    },
}

BlockEvents.rightClicked(PLACER_BLOCKS, event => {

    if(event.getHand()=="OFF_HAND") event.cancel()
    //#region FTB chunks stuff
    let chunkManager = $FTBChunksAPI.getManager()
    let currentChunk = chunkManager.getChunk($ChunkDimPos(event.player))
    for(let i = -1;i <= 1; i++){
        for(let k = -1;k <= 1; k++){
            if (chunkManager.getChunk($ChunkDimPos(event.player).offset(i,k))){
                //if (chunkManager.getChunk($ChunkDimPos(event.player).offset(i,k)).teamData.team.getRankForPlayer(event.player.uuid).isAllyOrBetter()) console.log("ally");
                if (!chunkManager.getChunk($ChunkDimPos(event.player).offset(i,k)).teamData.team.getRankForPlayer(event.player.uuid).isAllyOrBetter()) {
                    sendImmersiveMessage(Component.translatable("milf.placers.claimed_chunk_nearby"),
                        event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
                    event.cancel()
                }
            }
        }
    }
    //#endregion

    let {template, modName} = getTemplateData(event, PLACER_BLOCK_TO_ITEM_NAME_MAP)

    let blockState = event.block.getBlockState()

    let playerFacing = event.player.getHorizontalFacing()
    let blockFacing = blockState.getValue(BlockProperties.HORIZONTAL_FACING)

    let structureDataRelativeToPlayer
    let structureDataRelativeToBlock

    let previewOffset = blockState.getValue(PLACER_PREVIEW_OFFSET_PROPERTY)

    if (event.player.mainHandItem.isEmpty()) {

        if (blockFacing != playerFacing) {
            setPropertyAndUpdate(event, blockState, [PLACER_PREVIEW_OFFSET_PROPERTY, $Integer.valueOf(0)])
            previewOffset = 0
        } else if (
            previewOffset != 5
            && blockState.getValue(PLACER_ENABLED_PROPERTY) 
            && !event.player.isCrouching()
        ) {
            setPropertyAndUpdate(event, blockState, [PLACER_PREVIEW_OFFSET_PROPERTY, $Integer.valueOf(previewOffset + 1)])

            previewOffset++
        }        

        structureDataRelativeToPlayer = getStructureRelativeData(template, playerFacing, event.block.pos, previewOffset)
        structureDataRelativeToBlock = getStructureRelativeData(template, blockFacing, event.block.pos, previewOffset)        

        handlePreview(event, template, structureDataRelativeToPlayer, structureDataRelativeToBlock)

    } else if (event.player.getMainHandItem().getTags().toString().includes("milf:hammers")){

        structureDataRelativeToPlayer = getStructureRelativeData(template, playerFacing, event.block.pos, previewOffset)
        structureDataRelativeToBlock = getStructureRelativeData(template, blockFacing, event.block.pos, previewOffset)

        handlePlacement(event, template, modName, structureDataRelativeToPlayer, structureDataRelativeToBlock)

    }
})

BlockEvents.rightClicked(BOX_BLOCKS, event => {
    if(event.getHand()=="OFF_HAND") event.cancel()
    if(!event.player.mainHandItem.isEmpty() || !event.player.isCrouching()) event.cancel()
    const {template, modName} = getTemplateData(event, EMPTY_BOX_BLOCK_TO_ITEM_NAME_MAP)

   
    let blockState = event.block.getBlockState()
    let blockFacing = blockState.getValue(BlockProperties.HORIZONTAL_FACING)
   
    let previewOffset = blockState.getValue(PLACER_PREVIEW_OFFSET_PROPERTY)
    const structureDataRelativeToBlock = getStructureRelativeData(template, blockFacing, event.block.pos, previewOffset)

    const { blockPosRelativeStart, structureVec3iRotated, boxPos, bounds, facing } = structureDataRelativeToBlock

    if (checkStructure(event, template, modName, structureDataRelativeToBlock)) {

        let newState = Block.getBlock(event.block.id.toString().slice(0, -10) + "_placer").defaultBlockState()

        newState = Block.withProperties(newState, event.level.getBlock(event.block.pos).properties)

        setPropertyAndUpdate(event, newState, [BlockProperties.HORIZONTAL_FACING, facing])

        BlockPos.betweenClosedStream(
            new BlockPos(blockPosRelativeStart), 
            new BlockPos(
                blockPosRelativeStart
                .offset(structureVec3iRotated)
                .offset(new BlockPos(-1, -1, -1).rotate(getRotationFromDirection(facing)))
            )
        ).forEach(pos => {
            event.level.setBlock(pos, Blocks.AIR.defaultBlockState(), 18)
        })

        milfPlaySound(event, "minecraft:block.bamboo.break", { pos: new BlockPos(boxPos.x, boxPos.y, boxPos.z) })

        particleFrameFromBounds(PARTICLES.dispersed, bounds, event)
    } else {
        event.cancel()
    }
})

BlockEvents.broken(PLACER_BLOCKS, event => {
    const { template } = getTemplateData(event, PLACER_BLOCK_TO_ITEM_NAME_MAP)

    let blockState = event.block.getBlockState()
    let blockFacing = blockState.getValue(BlockProperties.HORIZONTAL_FACING)
    let previewOffset = blockState.getValue(PLACER_PREVIEW_OFFSET_PROPERTY)

    if (blockState.getValue(PLACER_ENABLED_PROPERTY)){
        const structureDataRelativeToBlock = getStructureRelativeData(template, blockFacing, event.block.pos, previewOffset)
        removePreview(event, structureDataRelativeToBlock)
    }

})

function setPropertyAndUpdate(event, blockState, [property, value]){
    let newState = blockState.setValue(
        property, value
    )
    event.level.setBlockAndUpdate(event.block.pos, newState)
}

function handlePreview(event, template, playerStructureData, blockStructureData){
    let blockState = event.level.getBlockState(event.block.pos)
    if (event.player.isCrouching()) {
        if (blockState.getValue(PLACER_ENABLED_PROPERTY)) {
            let { boxPos } = blockStructureData
            removePreview(event, blockStructureData)
            milfPlaySound(event, "minecraft:block.bamboo.break", { pos: new BlockPos(boxPos.x, boxPos.y, boxPos.z) })
        }
        event.cancel()
        return
    }
    if (blockState.getValue(BlockProperties.HORIZONTAL_FACING) == event.player.getHorizontalFacing() 
        && blockState.getValue(PLACER_PREVIEW_OFFSET_PROPERTY) == 5
    ) {
        if (blockState.getValue(PLACER_ENABLED_PROPERTY)){
            event.cancel()
            return
        } 
    }

    setPropertyAndUpdate(event, blockState, [BlockProperties.HORIZONTAL_FACING, event.player.getHorizontalFacing()])
    
    const canPlace = validateArea(event, playerStructureData.bounds)
    if (!canPlace) {
        handlePreviewFailure(event, template, playerStructureData, blockStructureData)
        event.cancel()
        return
    }

    updatePreview(event, template, playerStructureData)
}

function handlePlacement(event, template, modName, playerStructureData, blockStructureData){
    let blockState = event.level.getBlockState(event.block.pos)
    if (!blockState.getValue(PLACER_ENABLED_PROPERTY)){
        sendImmersiveMessage(
            Component.translatable("milf.placers.notification2"), 
            event.getPlayer(), 
            DEFAULT_WARN_NOTIFICATION_STYLE, 
            event.server
        )
        event.cancel()
    }
    //const blockProperties = event.block.getProperties()
    removePreview(event, blockStructureData, true)
    const canPlace = validateArea(event, blockStructureData.bounds)
    if (!canPlace) {
        handlePreviewFailure(event, template, playerStructureData, blockStructureData)
        event.cancel()
        return
    }

    placeStructure(event, template, modName, blockStructureData)
}

function placeStructure(/** @type {$BlockRightClickedKubeEvent} */ event, template, modName, blockStructureData){

    let newState = Block.getBlock(event.block.id.toString().slice(0, -7) + "_empty_box").defaultBlockState()

    newState = Block.withProperties(newState, event.level.getBlock(event.block.pos).properties)
    setPropertyAndUpdate(event, newState, [PLACER_ENABLED_PROPERTY, $Boolean.FALSE])

    const { blockPosRelativeStart, facing, boxPos } = blockStructureData     

    milfPlaySound(event, "minecraft:block.anvil.land", { pos: new BlockPos(boxPos.x, boxPos.y, boxPos.z) })
    let posStateMap = getRotatedPosStateMapFromTemplate(event, template, facing)

    posStateMap.forEach((pos, state) => {
        let relativePos = blockPosRelativeStart.offset(pos)

        event.getLevel().setBlockAndUpdate(relativePos, state)

        if (MI_MODS.includes(modName)) {
            let blockEntity = event.getLevel().getBlockEntity(relativePos)
            if (blockEntity != null && MI_MODS.includes(blockEntity.blockState.id.split(":")[0])) {

                blockEntity.placedBy.placerId = event.player.uuid
                let machineOrientation = blockEntity.orientation

                machineOrientation.facingDirection = facing.getOpposite()

                if (event.block.getProperties().machine_shape) {
                    let controllerBlock = event.getLevel().getBlock(relativePos)
                    let entityData = controllerBlock.entityData
                    let machineShape = parseInt(event.block.getProperties().machine_shape)
                    controllerBlock.setEntityData(Object.assign({}, entityData, { activeShape: machineShape }))
                }
                blockEntity.setChanged()
                blockEntity.sync()
            }

        }

    })

}

function handlePreviewFailure(event, template, playerStructureData, blockStructureData){
    milfPlaySound(event, "minecraft:block.chain.break", { pos: new BlockPos(playerStructureData.boxPos.x, playerStructureData.boxPos.y, playerStructureData.boxPos.z) })
    sendImmersiveMessage(Component.translatable("milf.placers.notification1"), 
        event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
    removePreview(event, playerStructureData)

    event.cancel()
}

function updatePreview(/** @type {$BlockRightClickedKubeEvent} */ event, templateTag, playerStructureData){
    const { blockPosRelativeStart, bounds, facing } = playerStructureData

    let boxPos = new BlockPos(playerStructureData.boxPos.x, playerStructureData.boxPos.y, playerStructureData.boxPos.z)
    let boxPosHash = boxPos.hashCode()
    milfPlaySound(event, "minecraft:block.bamboo.hit", { pos: boxPos })
    
    let blockState = event.level.getBlockState(event.block.pos)

    setPropertyAndUpdate(event, blockState, [PLACER_ENABLED_PROPERTY, $Boolean.TRUE])

    let posStateMap = getRotatedPosStateMapFromTemplate(event, templateTag, facing)

    let blocksToRenderData = []

    let cachedStates = {}

    posStateMap.forEach(( pos, state) => {
        if(state.isAir()) return
        let relativePos = blockPosRelativeStart.offset(pos)
        //console.log(state);

        let stateHash = state.toString()
        
        let cachedState = cachedStates[stateHash]
        let serializedState
        if (cachedState){
            serializedState = cachedState
        } else {
            serializedState = $NbtUtils.writeBlockState(state).getCompound("Properties") || {}
            cachedStates[stateHash] = serializedState
        }
        blocksToRenderData.push({ 
            blockPos: { x: relativePos.getX(), y: relativePos.getY(), z: relativePos.getZ() }, 
            id: state.id, 
            properties: serializedState
        })
    })

    //console.log(cachedStates);
    

    let players = BOX_TO_PLAYERS_MAP.getPlayers(boxPosHash)
    let isNewPlayer = true
    players.forEach(player =>{
        if (player == event.player) {
            isNewPlayer = false
            return
        }
    })
    
    if (isNewPlayer) BOX_TO_PLAYERS_MAP.addPlayer(boxPosHash, event.player)    
    
    BOX_TO_PLAYERS_MAP.getPlayers(boxPosHash).forEach(player =>{
        player.sendData("placers_render", {
            blocks: blocksToRenderData,
            boxPos: { x: boxPos.x, y: boxPos.y, z: boxPos.z }
        })
    })

    particleFrameFromBounds(PARTICLES.placed, bounds, event)
}

const rotatedTemplatesInfoCache = {

} 

function getRotatedPosStateMapFromTemplate(event, templateTag, facing){

    let templateHash = `${templateTag.hashCode()}:${facing.hashCode()}`
    let cachedMap = rotatedTemplatesInfoCache[templateHash]

    if (cachedMap) {
        return cachedMap
    }

    let posStateMap = getPosStateMapFromTemplate(event, templateTag)
    
    let rotation = getRotationFromDirection(facing)

    //console.log(rotation);
    

    return rotatePosStateMap(posStateMap, templateTag, facing, rotation, event.level)

    function rotatePosStateMap(originalMap, templateTag, facing, rotation, level, pivot) {
        pivot = pivot || new BlockPos(0, 0, 0)
        let rotatedMap = new $HashMap()

        originalMap.forEach((pos, state) => {
            let relPos = pos.subtract(pivot)
            let rotatedRelPos = rotatePos(relPos, rotation)
            let finalPos = rotatedRelPos.offset(pivot)

            let rotatedState = state.rotate(level, finalPos, rotation)

            rotatedMap.put(finalPos, rotatedState)
        })

        let templateHash = `${templateTag.hashCode()}:${facing.hashCode()}`
        rotatedTemplatesInfoCache[templateHash] = rotatedMap

        return rotatedMap

        function rotatePos(pos, rotation) {
            let x = pos.getX()
            let y = pos.getY()
            let z = pos.getZ()

            switch (rotation) {
                case $Rotation.CLOCKWISE_90:
                    return new BlockPos(-z, y, x)
                case $Rotation.CLOCKWISE_180:
                    return new BlockPos(-x, y, -z)
                case $Rotation.COUNTERCLOCKWISE_90:
                    return new BlockPos(z, y, -x)
                default:
                    return pos
            }
        }
    }

    function getPosStateMapFromTemplate(event, templateTag) {

        let posStateMap = new $HashMap()

        let paletteTag = templateTag.getList("palette", 10)
        let palette = new $ArrayList()

        for (let i = 0; i < paletteTag.size(); i++) {
            palette.add($NbtUtils.readBlockState(
                event.server.registryAccess().lookupOrThrow($Registries.BLOCK),
                paletteTag.getCompound(i)
            ))
        }

        let blocksTag = templateTag.getList("blocks", 10)

        for (let i = 0; i < blocksTag.size(); i++) {
            let blockTag = blocksTag.getCompound(i)
            let posList = blockTag.getList("pos", 3)

            let pos
            if (posList.size() == 0) {
                posList = blockTag.getIntArray("pos")
                pos = new BlockPos(posList[0], posList[1], posList[2])
            } else {

                pos = new BlockPos(posList.getInt(0), posList.getInt(1), posList.getInt(2))
            }

            let stateId = blockTag.getInt("state")
            let state = palette.get(stateId)

            posStateMap.put(pos, state)
        }

        return posStateMap
    }

}

function removePreview(event, structureData, preserveState) {
    const { bounds, facing } = structureData

    let boxPos = new BlockPos(structureData.boxPos.x, structureData.boxPos.y, structureData.boxPos.z)

    let boxPosHash = boxPos.hashCode()
    let players = BOX_TO_PLAYERS_MAP.getPlayers(boxPosHash)
    BOX_TO_PLAYERS_MAP.deleteBox(boxPosHash)

    players.forEach(player => {
        player.sendData("placers_remove_render", { boxPos: { x: boxPos.x, y: boxPos.y, z: boxPos.z } })
    })

    if (!preserveState) {
        let newState = Block.getBlock(event.block.id).defaultBlockState()
        setPropertyAndUpdate(event, newState, [BlockProperties.HORIZONTAL_FACING, facing])
        particleFrameFromBounds(PARTICLES.dispersed, bounds, event)
    }
}

function validateArea(/** @type {$BlockRightClickedKubeEvent} */ event, bounds) {
    const { xMin, xMax, zMin, zMax, yMin, yMax, posX, posY, posZ} = bounds

    
    let aabb = AABB.of(xMin, yMin, zMin, xMax, yMax, zMax)
    aabb = aabb.move(posX, posY, posZ)

    let valid = true

    BlockPos.betweenClosedStream(aabb).forEach(blockPos => {

        if (!event.level.getBlockState(blockPos).isAir()) {
            event.getLevel().spawnParticles(PARTICLES.error, false, blockPos.x + 0.5, blockPos.y + 0.5, blockPos.z + 0.5, 0.2, 0.2, 0.2, 1, 0)
            valid = false            
        }
    })

    return valid
}

function getTemplateData(event, blockMap) {
    const templateName = blockMap == PLACER_BLOCK_TO_ITEM_NAME_MAP ? event.block.getId().toString().slice(5, -7) : event.block.getId().toString().slice(5, -10)
    const modName = blockMap[event.block.getId().toString()].split(':')[0]
    const template = NBT_HELPER.getNBTCompoundTag(modName, templateName, event.server.getResourceManager())
    return { modName:modName, template:template }
}

function getStructureRelativeData(template, facing, placerPos, previewOffset){

    let templateSizePos = new BlockPos(template.size[0], template.size[1], template.size[2])
    let rotatedTemplateSize = templateSizePos.rotate(getRotationFromDirection(facing))    

    //const placerPos = block.pos

    const offsetVec3i = new BlockPos(
        -Math.floor(templateSizePos.getX() / 2), 
        0, 
        -templateSizePos.getZ() - previewOffset
    )
    const blockPosRelativeStart = placerPos.offset(
        offsetVec3i.rotate(getRotationFromDirection(facing))
    )    

    return {
        facing:facing,
        structureVec3i: templateSizePos,
        structureVec3iRotated: rotatedTemplateSize,
        blockPosRelativeStart:blockPosRelativeStart,
        bounds: calculateBounds(rotatedTemplateSize, blockPosRelativeStart),
        boxPos: {x:placerPos.getX(), y:placerPos.getY(), z:placerPos.getZ()},
    }
}

function calculateBounds(structureVec3i, blockPosRelativeStart) {
    const posX = blockPosRelativeStart.getX(), posY = blockPosRelativeStart.getY(), posZ = blockPosRelativeStart.getZ()
    const sizeX = structureVec3i.getX(), sizeY = structureVec3i.getY(), sizeZ = structureVec3i.getZ()
    
    let xMin = 0, zMin = 0, xMax = sizeX - 1, zMax = sizeZ - 1
    
    if(sizeX < 0) [xMin, xMax] = [sizeX + 1, 0]
    if(sizeZ < 0) [zMin, zMax] = [sizeZ + 1, 0]
    
    return {xMin:xMin, xMax:xMax, zMin:zMin, zMax:zMax, yMin: 0, yMax: sizeY - 1, posX:posX, posY:posY, posZ:posZ, sizeX:sizeX, sizeY:sizeY, sizeZ:sizeZ }
}

function checkStructure(/** @type {$BlockRightClickedKubeEvent} */ event, template, modName, blockStructureData){
    const { blockPosRelativeStart, facing } = blockStructureData
    let posStateMap = getRotatedPosStateMapFromTemplate(event, template, facing)

    let canRemove = true

    posStateMap.forEach((pos, state) => {
        let relativePos = blockPosRelativeStart.offset(pos)

        let worldBlockState = event.getLevel().getBlock(relativePos).getBlockState()

        if (worldBlockState != state) {
            canRemove = false
            event.getLevel().spawnParticles(
                PARTICLES.error, 
                false, 
                relativePos.getX() + 0.5, 
                relativePos.getY() + 0.5, 
                relativePos.getZ() + 0.5, 
                0.2, 0.2, 0.2, 1, 0
            )
        }

    })

    if (canRemove) {
        return canRemove
    } else {
        sendImmersiveMessage(Component.translatable("milf.placers.notification3"), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        milfPlaySound(event, "minecraft:block.chain.break", { pos: new BlockPos(blockStructureData.boxPos.x, blockStructureData.boxPos.y, blockStructureData.boxPos.z) })
        return canRemove
    }

}

function particleFrameFromBounds ( type, bounds, event) {

    let sizeSum = Math.abs(bounds.sizeX) + Math.abs(bounds.sizeY) + Math.abs(bounds.sizeZ)

    let step

    let minSum = 9

    if (sizeSum <= minSum) {
        step = 0.1
    } else {
        step = 0.1 * (1 + Math.log(sizeSum / minSum) / Math.log(1.73))
    }

    //console.log(step)
    

    particleFrame(
        type, 
        {x: bounds.posX, y: bounds.posY, z: bounds.posZ}, 
        {x: bounds.sizeX, y: bounds.sizeY, z: bounds.sizeZ}, 
        event,
        step
    )
}

function particleFrame(type, startPos, size, event, step){
    step = step || 0.1
    let xm = 0, ym = 0, zm = 0
    let xmx = size.x, ymx = size.y, zmx = size.z

    if(size.x < 0){
        [xm,xmx] = [xmx,xm]
        startPos.x += 1
    }
    if(size.z < 0){
        [zm,zmx] = [zmx,zm]
        startPos.z += 1
    }
    if(size.y < 0){[ym,ymx] = [ymx,ym]}

    for (let i = xm; i <= xmx; i += step){
        event.getLevel().spawnParticles(type, false, startPos.x + i, startPos.y, startPos.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x - i, startPos.y + size.y, startPos.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x - i, startPos.y, startPos.z + size.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + i, startPos.y + size.y, startPos.z + size.z, 0, 0, 0, 1, 0)

    }
    for (let i = ym; i <= ymx; i += step){
        event.getLevel().spawnParticles(type, false, startPos.x, startPos.y + i, startPos.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x, startPos.y + size.y - i, startPos.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x, startPos.y + i, startPos.z + size.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x, startPos.y + size.y - i, startPos.z + size.z, 0, 0, 0, 1, 0)

    }
    for (let i = zm; i <= zmx; i += step){
        event.getLevel().spawnParticles(type, false, startPos.x, startPos.y, startPos.z + i, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x, startPos.y + size.y, startPos.z + i, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x, startPos.y, startPos.z + size.z - i, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x, startPos.y + size.y, startPos.z + size.z - i, 0, 0, 0, 1, 0)

    }
}