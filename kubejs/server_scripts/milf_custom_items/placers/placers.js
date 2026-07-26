//priority: 10
let $FTBChunksAPI = Java.loadClass("dev.ftb.mods.ftbchunks.api.FTBChunksAPI").api()
let $ChunkDimPos = Java.loadClass("dev.ftb.mods.ftblibrary.math.ChunkDimPos")
let $NbtIo = Java.loadClass("net.minecraft.nbt.NbtIo")
/**@type {import("net.minecraft.resources.ResourceLocation").$ResourceLocation$$Original} */
let $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
let $NbtAccounter = Java.loadClass("net.minecraft.nbt.NbtAccounter")


const PLACER_BLOCKS = Object.keys(global.AnotherDefinitelyUniqueNameForPlacerBlocksThisTime)
const BOX_BLOCKS = Object.keys(global.AnotherDefinitelyUniqueNameForBoxes)

const PLACER_BLOCKS_TO_ITEM_NAME_MAP = global.AnotherDefinitelyUniqueNameForPlacerBlocksThisTime
const BOX_BLOCKS_TO_ITEM_NAME_MAP = global.AnotherDefinitelyUniqueNameForBoxes

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



const ANGLE_TO_FACING = {
    270:"east",0:"north",90:"west",180:"south",
    "east":270,"north":0,"west":90,"south":180
}

const PARTICLES = {
    placed:"spectrum:shooting_star",
    dispersed:"minecraft:instant_effect",
    error:"minecraft:gust"
}
const MI_MODS = ["modern_industrialization", "mi_tweaks", "yet_another_industrialization", "extended_industrialization"]
const AIR_ID = "minecraft:air"
const NBT_HELPER = {
    getNBTCompoundTag: (modName, templateName, /**@type {import("net.minecraft.server.MinecraftServer").$MinecraftServer$$Original} */ resourceManager) => {
        try {
            let structureLocation = $ResourceLocation.fromNamespaceAndPath(modName,`structure/multiblocks/${templateName}.nbt`)
            let resource = resourceManager.getResource(structureLocation)
            
            if (!resource.isPresent()) {
                console.log(`Structure not found: ${templateName}`)
                return null
            }

            let inputStream = resource.get().open()
            let nbtData = $NbtIo["readCompressed(java.io.InputStream,net.minecraft.nbt.NbtAccounter)"](inputStream, new $NbtAccounter.unlimitedHeap())
            inputStream.close()
            
            return nbtData
        } catch (error) {
            console.log(error)
        }        
    }
}
//const NBT_FILE_PATHS = {getPath: (modName, templateName) => `${modName}:structure/multiblocks/${templateName}.nbt`}

BlockEvents.rightClicked(PLACER_BLOCKS, event => {

    if(event.getHand()=="OFF_HAND") event.cancel()
    //#region FTB chunks stuff
    const chunkManager = $FTBChunksAPI.getManager()
    const currentChunk = chunkManager.getChunk($ChunkDimPos(event.player))
    for(let i = -1;i <= 1; i++){
        for(let k = -1;k <= 1; k++){
            if (chunkManager.getChunk($ChunkDimPos(event.player).offset(i,k))){
                //if (chunkManager.getChunk($ChunkDimPos(event.player).offset(i,k)).teamData.team.getRankForPlayer(event.player.uuid).isAllyOrBetter()) console.log("ally");
                if (!chunkManager.getChunk($ChunkDimPos(event.player).offset(i,k)).teamData.team.getRankForPlayer(event.player.uuid).isAllyOrBetter()) event.cancel()
            }
        }
    }
    //#endregion

    const {template, modName} = getTemplateData(event, PLACER_BLOCKS_TO_ITEM_NAME_MAP)

    const playerFacing = event.player.getHorizontalFacing()
    const blockFacing = event.block.getProperties().facing
    const blockPos = event.block.getPos()

    const blockProperties = event.block.getProperties()

    let structureDataRelativeToPlayer
    let structureDataRelativeToBlock

    if (event.player.mainHandItem.isEmpty()) {

        if (blockProperties.facing != event.player.getHorizontalFacing()) {
            event.block.set(event.block.id, Object.assign({}, blockProperties, { preview_offset: `0` }))
        } else if (blockProperties.preview_offset != "5" && blockProperties.enabled == "true" && !event.player.isCrouching()) {
            event.block.set(event.block.id, Object.assign({}, blockProperties, { preview_offset: `${parseInt(blockProperties.preview_offset) + 1}` }))
        }

        structureDataRelativeToPlayer = getStructureRelativeData(template, playerFacing, event.block)
        structureDataRelativeToBlock = getStructureRelativeData(template, blockFacing, event.block)

        handlePreview(event, template, structureDataRelativeToPlayer, structureDataRelativeToBlock)
    } else if (event.player.getMainHandItem().getTags().toString().includes("milf:hammers")){

        structureDataRelativeToPlayer = getStructureRelativeData(template, playerFacing, event.block)
        structureDataRelativeToBlock = getStructureRelativeData(template, blockFacing, event.block)

        handlePlacement(event, template, modName, structureDataRelativeToPlayer, structureDataRelativeToBlock)
    }
})

BlockEvents.rightClicked(BOX_BLOCKS, event => {
    if(event.getHand()=="OFF_HAND") event.cancel()
    if(!event.player.mainHandItem.isEmpty() || !event.player.isCrouching()) event.cancel()
    const {template, modName} = getTemplateData(event, BOX_BLOCKS_TO_ITEM_NAME_MAP)

    const blockFacing = event.block.getProperties().facing
    const blockPos = event.block.getPos()

    const structureDataRelativeToBlock = getStructureRelativeData(template, blockFacing, event.block)

    const { blockPosRelativeStart, structureVec3iRotated, angleRad, boxPos, bounds } = structureDataRelativeToBlock

    if (checkStructure(event, template, modName, structureDataRelativeToBlock)) {
        event.block.set(event.block.id.toString().slice(0,-10) + "_placer", Object.assign({}, event.block.getProperties(), {enabled:false}))
        BlockPos.betweenClosedStream(new BlockPos(blockPosRelativeStart), new BlockPos(blockPosRelativeStart.offset(Vec3itoBlockPos(structureVec3iRotated)).offset(Vec3itoBlockPos(rotateVec3i(new Vec3i(-1,-1,-1), angleRad))))).forEach(pos => {
            event.level.setBlock(pos, Blocks.AIR.defaultBlockState(), 18)
        })

        milfPlaySound(event, "minecraft:block.bamboo.break", { pos: new BlockPos(boxPos.x, boxPos.y, boxPos.z) })

        //event.server.runCommandSilent(`playsound block.bamboo.break block @p ${boxPos.x} ${boxPos.y} ${boxPos.z}`)
        particleFrameFromBounds(PARTICLES.dispersed, bounds, event)
    } else {
        event.cancel()
    }
})

BlockEvents.broken(PLACER_BLOCKS, event => {
    const { template } = getTemplateData(event, PLACER_BLOCKS_TO_ITEM_NAME_MAP)

    const blockProperties = event.block.getProperties()
    const blockFacing = blockProperties.facing
    const blockPos = event.block.getPos()

    const structureDataRelativeToBlock = getStructureRelativeData(template, blockFacing, event.block)
    if (blockProperties.enabled == "true") removePreview(event, structureDataRelativeToBlock)
})

function handlePreview(/**@type {import("dev.latvian.mods.kubejs.block.BlockRightClickedKubeEvent").$BlockRightClickedKubeEvent$$Original} */ event, template, playerStructureData, blockStructureData){
    const blockProperties = event.block.getProperties()
    if (event.player.isCrouching()) {
        if (blockProperties.enabled == "true") {
            let { boxPos } = blockStructureData
            removePreview(event, blockStructureData)
            milfPlaySound(event, "minecraft:block.bamboo.break", { pos: new BlockPos(boxPos.x, boxPos.y, boxPos.z) })
        }
        event.cancel()
        return
    }
    if (blockProperties.facing == event.player.getHorizontalFacing() && blockProperties.preview_offset == "5") {
        if (blockProperties.enabled == "true"){
            event.cancel()
            return
        } 
    }

    event.block.set(event.block.id, Object.assign({}, blockProperties, { facing: event.player.getHorizontalFacing() }))

    
    const canPlace = validateArea(event, playerStructureData.bounds)
    if (!canPlace) {
        handlePreviewFailure(event, template, playerStructureData, blockStructureData)
        event.cancel()
        return
    }

    updatePreview(event, template, playerStructureData, blockStructureData)
}

function handlePlacement(event, template, modName, playerStructureData, blockStructureData){
    if(event.block.getProperties().enabled == "false"){
        sendImmersiveMessage(Component.translatable("milf.placers.notification2"), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        event.cancel()
    }
    const blockProperties = event.block.getProperties()
    removePreview(event, blockStructureData, true)
    const canPlace = validateArea(event, blockStructureData.bounds)
    if (!canPlace) {
        handlePreviewFailure(event, template, playerStructureData, blockStructureData)
        event.cancel()
        return
    }

    placeStructure(event, template, modName, blockStructureData, blockProperties)
}

function placeStructure(/**@type {import("dev.latvian.mods.kubejs.block.BlockRightClickedKubeEvent").$BlockRightClickedKubeEvent$$Original} */ event, template, modName, blockStructureData, blockProperties){
    const { blockPosRelativeStart, facing } = blockStructureData    
    event.block.set(event.block.id.toString().slice(0, -7) + "_empty_box", Object.assign({}, blockProperties, {enabled:false}))
    milfPlaySound(event, "minecraft:block.anvil.land", { pos: new BlockPos(blockStructureData.boxPos.x, blockStructureData.boxPos.y, blockStructureData.boxPos.z) })
    //event.server.runCommandSilent(`playsound block.anvil.land block @p ${blockStructureData.boxPos.x} ${blockStructureData.boxPos.y} ${blockStructureData.boxPos.z}`)
    for ( let blockNumber in  template.blocks) {
        let {blockID,  relativePosOffset: rotatedVec3i, relativeBlockProperties} = getTemplateBlockData(template, blockStructureData, blockNumber)
        if (blockID != AIR_ID) {
            let block = Block.withProperties(blockID, relativeBlockProperties)

            event.getLevel().setBlockAndUpdate(blockPosRelativeStart.offset(rotatedVec3i), block)
            if(MI_MODS.includes(modName)){
                let blockEntity = event.getLevel().getBlockEntity(blockPosRelativeStart.offset(rotatedVec3i))
                if (blockEntity != null && MI_MODS.includes(blockEntity.blockState.id.split(":")[0])){
                    // blockEntity.getActiveShape().getActiveShape().simpleMembers.forEach((blockPos, simpleMember) => {
                    //     console.log(simpleMember.getPreviewState());
                    // })
                    blockEntity.placedBy.placerId = event.player.uuid
                    let machineOrientation = blockEntity.orientation
                    switch (directionRelativeTo("south", facing)) {
                        case "east":
                            machineOrientation.facingDirection = Direction.EAST
                            break;
                        case "north":
                            machineOrientation.facingDirection = Direction.NORTH
                            break;
                        case "west":
                            machineOrientation.facingDirection = Direction.WEST
                            break;
                        case "south":
                            machineOrientation.facingDirection = Direction.SOUTH
                            break;
                    }
                    if (event.block.getProperties().machine_shape) {
                        let entityData = event.getLevel().getBlock(blockPosRelativeStart.offset(rotatedVec3i)).entityData
                        let machineShape = parseInt(event.block.getProperties().machine_shape)
                        event.getLevel().getBlock(blockPosRelativeStart.offset(rotatedVec3i)).setEntityData(Object.assign({}, entityData, {activeShape: machineShape})) 
                    }
                    blockEntity.setChanged();
                    blockEntity.sync();
                }

            }

        }
    }
}

function handlePreviewFailure(event, template, playerStructureData, blockStructureData){
    milfPlaySound(event, "minecraft:block.chain.break", { pos: new BlockPos(playerStructureData.boxPos.x, playerStructureData.boxPos.y, playerStructureData.boxPos.z) })
    //event.server.runCommandSilent(`playsound block.chain.break block @p ${playerStructureData.bounds.posX} ${playerStructureData.bounds.posX} ${playerStructureData.bounds.posY}`)
    sendImmersiveMessage(Component.translatable("milf.placers.notification1"), 
        event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
    removePreview(event, playerStructureData)
    //removePreview(event, blockStructureData, true)
    // event.player.sendData("placers", {
    //     xMin:playerStructureData.bounds.xMin,
    //     yMin:playerStructureData.bounds.yMin,
    //     zMin:playerStructureData.bounds.zMin,
    //     xMax:playerStructureData.bounds.xMax,
    //     yMax:playerStructureData.bounds.yMax,
    //     zMax:playerStructureData.bounds.zMax,
    //     posX:playerStructureData.bounds.posX,
    //     posY:playerStructureData.bounds.posY,
    //     posZ:playerStructureData.bounds.posZ
    // })
    event.cancel()
}

function updatePreview(event, template, playerStructureData, blockStructureData){
    const { blockPosRelativeStart, bounds } = playerStructureData

    let boxPos = new BlockPos(playerStructureData.boxPos.x, playerStructureData.boxPos.y, playerStructureData.boxPos.z)
    let boxPosHash = boxPos.hashCode()
    milfPlaySound(event, "minecraft:block.bamboo.hit", { pos: boxPos })


    let players = BOX_TO_PLAYERS_MAP.getPlayers(boxPosHash)
    //if (event.block.getProperties().enabled == "true") removePreview(event, blockStructureData)
    event.block.set(event.block.id, Object.assign({}, event.block.getProperties(), {enabled:true}))



    let blocksToRenderData = []
    let hashedBlocks = {}
    
    for ( let blockNumber in template.blocks) {
        let state = template.blocks.getCompound(blockNumber).state
        let hashToCheck = `${template.palette.getCompound(state).getString("Name").hashCode()}:${template.palette.getCompound(state).getCompound("Properties").hashCode()}`
        
        let blockID, offset, relativeBlockProperties

        if (hashedBlocks[hashToCheck]){
            let data = hashedBlocks[hashToCheck]
            let pos = template.blocks.getCompound(blockNumber).pos
            // let vec3iPos = Vec3i(pos[0], pos[1], pos[2])
            // rotatedVec3i = Vec3itoBlockPos( rotateVec3i(vec3iPos, playerStructureData.angleRad) )

            offset = rotateBlockPos(BlockPos(pos[0], pos[1], pos[2]), playerStructureData.angleDeg)

            blockID = data.blockID
            relativeBlockProperties = data.relativeBlockProperties

        } else {
            let data = getTemplateBlockData(template, playerStructureData, blockNumber)
            blockID = data.blockID
            offset = Vec3itoBlockPos( data.relativePosOffset )
            relativeBlockProperties = data.relativeBlockProperties
            hashedBlocks[hashToCheck] = { blockID: blockID, relativeBlockProperties:relativeBlockProperties}
        }        
        
        if (blockID != AIR_ID) {
            
            let blockPosToAdd = blockPosRelativeStart.offset(offset)
            
            //event.server.runCommandSilent(`summon block_display ${blockPosRelativeStart.offset(rotatedVec3i).getX()} ${blockPosRelativeStart.offset(rotatedVec3i).getY() + 0.5} ${blockPosRelativeStart.offset(rotatedVec3i).getZ()} {interpolation_duration:15,teleport_duration:25,Glowing:1b,view_range:0.3f,transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[-0.5f,-0.5f,-0.5f],scale:[1.001f,1.001f,1.001f]},block_state:{Name:"${blockID}",Properties:${JSON.stringify(relativeBlockProperties)}}}`)
            blocksToRenderData.push({ blockPos: { x: blockPosToAdd.getX(), y: blockPosToAdd.getY(), z: blockPosToAdd.getZ() }, id: blockID, properties: relativeBlockProperties})
        }
    }

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
    // console.log("UPDATE");
    // console.log(BOX_TO_PLAYERS_MAP);
    

    particleFrameFromBounds(PARTICLES.placed, bounds, event)
}

function removePreview(event, structureData, withoutParticles) {
    const { bounds } = structureData

    let boxPos = new BlockPos(structureData.boxPos.x, structureData.boxPos.y, structureData.boxPos.z)

    let boxPosHash = boxPos.hashCode()
    let players = BOX_TO_PLAYERS_MAP.getPlayers(boxPosHash)
    BOX_TO_PLAYERS_MAP.deleteBox(boxPosHash)

    event.block.set(event.block.id, Object.assign({}, event.block.getProperties(), { enabled: false, preview_offset: "0" }))

    players.forEach(player => {
        player.sendData("placers_remove_render", { boxPos: { x: boxPos.x, y: boxPos.y, z: boxPos.z } })
    })

    if (!withoutParticles) particleFrameFromBounds(PARTICLES.dispersed, bounds, event)

    // console.log("REMOVE");
    // console.log(BOX_TO_PLAYERS_MAP);
}

function getTemplateBlockData(template, structureData, blockNumber){
    let pos = template.blocks.getCompound(blockNumber).pos
    let offset = rotateBlockPos(BlockPos(pos[0], pos[1], pos[2]), structureData.angleDeg)
    // let vec3iPos = Vec3i(pos[0],pos[1],pos[2])
    // let rotatedVec3i = rotateVec3i(vec3iPos, structureData.angleRad)
    let state = template.blocks.getCompound(blockNumber).state
    let blockID = template.palette.getCompound(state).getString("Name")
    let blockProperties = template.palette.getCompound(state).getCompound("Properties")
    let relativeBlockProperties = getRelativeBlockProperties(blockProperties, structureData, blockID)
    return {
        blockID: blockID,
        relativePosOffset: offset,
        relativeBlockProperties: relativeBlockProperties,
        hash: `${ blockID.hashCode() }:${ blockProperties.hashCode() }`
    }
}

function getRelativeBlockProperties( /**@type {$CompoundTag_} */blockProperties, structureData, blockID){
    if (blockProperties.isEmpty()) { return {} }
    const { facing } = structureData
    let relativeProperties = { }    

    if (blockProperties.contains("facing")){
        relativeProperties.facing = `${blockID != "immersiveengineering:fluid_pump" ? directionRelativeTo(blockProperties.getString("facing"), facing) : "north"}`
    }
    
    if (blockProperties.contains("type")) { relativeProperties.type = blockProperties.getString("type") }
    if (blockProperties.contains("multiblockslave")) { relativeProperties.multiblockslave = blockProperties.getString("multiblockslave") == "true" }
    if (blockProperties.contains("hanging")) { relativeProperties.hanging = blockProperties.getString("hanging") == "true" }
    if (blockProperties.contains("orientation")) { relativeProperties.orientation = blockProperties.getString("orientation") }

    if(blockProperties.east){
        let property = JSON.parse(blockProperties.east)
        relativeProperties[directionRelativeTo("east", facing)] = property
    }
    if(blockProperties.west){
        let property = JSON.parse(blockProperties.west)
        relativeProperties[directionRelativeTo("west", facing)] = property
    }
    if(blockProperties.south){
        let property = JSON.parse(blockProperties.south)
        relativeProperties[directionRelativeTo("south", facing)] = property
    }
    if(blockProperties.north){
        let property = JSON.parse(blockProperties.north)
        relativeProperties[directionRelativeTo("north", facing)] = property
    }
    if(blockProperties.up){
        let property = JSON.parse(blockProperties.up)
        relativeProperties["up"] = property
    }    
    
    return relativeProperties
}

function validateArea(/**@type {import("dev.latvian.mods.kubejs.block.BlockRightClickedKubeEvent").$BlockRightClickedKubeEvent$$Original} */ event, bounds) {
    const { xMin, xMax, zMin, zMax, yMin, yMax, posX, posY, posZ} = bounds

    
    let aabb = AABB.of(xMin, yMin, zMin, xMax, yMax, zMax)
    aabb = aabb.move(posX, posY, posZ)

    let valid = true

    BlockPos.betweenClosedStream(aabb).forEach(blockPos => {

        if (event.level.getBlock(blockPos) != AIR_ID) {
            event.getLevel().spawnParticles(PARTICLES.error, false, blockPos.x + 0.5, blockPos.y + 0.5, blockPos.z + 0.5, 0.2, 0.2, 0.2, 1, 0)
            valid = false            
        }
    })

    // for(let xa = xMin; xa <= xMax; xa++) {
    //     for(let ya = yMin; ya <= yMax; ya++) {
    //         for(let za = zMin; za <= zMax; za++) {
    //             if(event.level.getBlock(posX + xa, posY + ya, posZ + za) !== AIR_ID) {
    //                 event.getLevel().spawnParticles(PARTICLES.error, false, posX + xa + 0.5, posY + ya + 0.5, posZ + za + 0.5, 0.2, 0.2, 0.2, 1, 0)
    //                 valid = false
    //             }
    //         }
    //     }
    // }
    return valid
}

function getTemplateData(event, blockMap) {
    const templateName = blockMap == PLACER_BLOCKS_TO_ITEM_NAME_MAP ? event.block.getId().toString().slice(5, -7) : event.block.getId().toString().slice(5, -10)
    const modName = blockMap[event.block.getId().toString()].split(':')[0]
    const template = NBT_HELPER.getNBTCompoundTag(modName, templateName, event.server.getResourceManager())
    return { modName:modName, template:template }
}

function getStructureRelativeData(template, facing, /**@type {$BlockContainerJS_} */ block){
    const blockPos = block.pos
    const angle = ANGLE_TO_FACING[facing]
    const angleRad = angle * (Math.PI / 180)
    const structureVec3i = Vec3i(template.size[0], template.size[1], template.size[2])
    const structureVec3iRotated = rotateVec3i(structureVec3i, angleRad)
    const offsetVec3i = new Vec3i(-Math.floor(structureVec3i.getX() / 2), 0, -structureVec3i.getZ() - parseInt(block.getProperties().preview_offset) )
    const blockPosRelativeStart = blockPos.offset(Vec3itoBlockPos(rotateVec3i(offsetVec3i, angleRad)))    

    return {
        facing:facing,
        angleRad:angleRad,
        structureVec3i:structureVec3i,
        structureVec3iRotated:structureVec3iRotated,
        blockPosRelativeStart:blockPosRelativeStart,
        bounds: calculateBounds(structureVec3iRotated, blockPosRelativeStart),
        boxPos: {x:blockPos.getX(), y:blockPos.getY(), z:blockPos.getZ()},
        angleDeg: angle
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

function checkStructure(event, template, modName, blockStructureData){
    let canRemove = true
    const { blockPosRelativeStart } = blockStructureData
    for ( let blockNumber in  template.blocks) {
        let {blockID,  relativePosOffset: rotatedVec3i, relativeBlockProperties} = getTemplateBlockData(template, blockStructureData, blockNumber)

        let nbtBlock = Block.withProperties(blockID, relativeBlockProperties)
        let realBlock = event.getLevel().getBlock(blockPosRelativeStart.offset(rotatedVec3i)).getBlockState()   
        if (realBlock != nbtBlock /* && (modName != "immersiveengineering" || realBlock.block.id != BOX_BLOCKS_TO_ITEM_NAME_MAP[event.block.getId().toString()]) */) {
            canRemove = false
            event.getLevel().spawnParticles(PARTICLES.error, false, blockPosRelativeStart.offset(rotatedVec3i).getX() + 0.5, blockPosRelativeStart.offset(rotatedVec3i).getY() + 0.5, blockPosRelativeStart.offset(rotatedVec3i).getZ() + 0.5, 0.2, 0.2, 0.2, 1, 0)
        }
    }
    if (canRemove) {
        return canRemove
    } else {
        sendImmersiveMessage(Component.translatable("milf.placers.notification3"), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        milfPlaySound(event, "minecraft:block.chain.break", { pos: new BlockPos(blockStructureData.boxPos.x, blockStructureData.boxPos.y, blockStructureData.boxPos.z) })
        //event.server.runCommandSilent(`playsound block.chain.break block @p ${blockStructureData.boxPos.x} ${blockStructureData.boxPos.y} ${blockStructureData.boxPos.z}`)
        return canRemove
    }

}


/**@returns {$Vec3i_} */ 
function rotateVec3i(vec3i, angleRad){
    return Vec3i(Math.round(vec3i.getX() * Math.cos(angleRad) + vec3i.getZ() * Math.sin(angleRad)), vec3i.getY(), Math.round(-vec3i.getX() * Math.sin(angleRad) + vec3i.getZ() * Math.cos(angleRad)))
}

function rotateBlockPos(blockPos, angleDeg) {
    const quarter = (angleDeg / 90) % 90
    const x = blockPos.x, y = blockPos.y, z = blockPos.z

    switch (quarter) {
        case 0: return BlockPos(x, y, z)
        case 1: return BlockPos(z, y, -x)
        case 2: return BlockPos(-x, y, -z)
        case 3: return BlockPos(-z, y, x)
    }
}

function Vec3itoBlockPos(/**@type {$Vec3i_} */ vec3i){
    return BlockPos(vec3i.x, vec3i.y, vec3i.z)
}

/* NetworkEvents.dataReceived("milf:immersiveMessageQueue", event => {
    console.log("hello");
    event.player.persistentData.remove("immersiveMessageQueue")
}) */

function particleFrameFromBounds ( type, bounds, event) {
    particleFrame(type, {x: bounds.posX, y: bounds.posY, z: bounds.posZ}, {x: bounds.sizeX, y: bounds.sizeY, z: bounds.sizeZ}, event)
}


function particleFrame(type, startPos, size, event){
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

    for(let i = xm; i<= xmx; i += 0.1){
        event.getLevel().spawnParticles(type, false, startPos.x + i, startPos.y, startPos.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x - i, startPos.y + size.y, startPos.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x - i, startPos.y, startPos.z + size.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + i, startPos.y + size.y, startPos.z + size.z, 0, 0, 0, 1, 0)

    }
    for(let i = ym; i<= ymx; i += 0.1){
        event.getLevel().spawnParticles(type, false, startPos.x, startPos.y + i, startPos.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x, startPos.y + size.y - i, startPos.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x, startPos.y + i, startPos.z + size.z, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x, startPos.y + size.y - i, startPos.z + size.z, 0, 0, 0, 1, 0)

    }
    for(let i = zm; i<= zmx; i += 0.1){
        event.getLevel().spawnParticles(type, false, startPos.x, startPos.y, startPos.z + i, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x, startPos.y + size.y, startPos.z + i, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x + size.x, startPos.y, startPos.z + size.z - i, 0, 0, 0, 1, 0)
        event.getLevel().spawnParticles(type, false, startPos.x, startPos.y + size.y, startPos.z + size.z - i, 0, 0, 0, 1, 0)

    }
}

function directionRelativeTo(direction, to){
    if (direction === "down" || direction === "up") return direction
    return ANGLE_TO_FACING[(ANGLE_TO_FACING[direction] + ANGLE_TO_FACING[to]) % 360]
}