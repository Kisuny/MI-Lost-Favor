let nbtPenModeState = 0
let nbtPenAabb = AABB.CUBE
let nbtPenMIBlockEntity

ItemEvents.firstRightClicked("milf:nbt_pen", event => {
    if(!event.getTarget()?.block.getPos()) return
    let blockpos = event.getTarget().block.getPos()
    switch (nbtPenModeState) {
        case 0:
            nbtPenAabb = AABB.ofBlock(blockpos.offset(0,1,0))
            break;
        case 1:

            nbtPenAabb = nbtPenAabb.minmax(AABB.ofBlock(blockpos.offset(0, -1, 0)))
            event.player.tell(Text.info(`RMB on controller to save, Shift+RMB to cancel`))
            break;
        case 2:
            let {level, player} = event

            if(player.crouching) break

            let block = event.getTarget().block
            nbtPenMIBlockEntity = block.getEntity()

            if(!nbtPenMIBlockEntity) break
            
            if(nbtPenMIBlockEntity.getActiveShape() instanceof $ActiveShapeComponent) {
                nbtPenMIBlockEntity = nbtPenMIBlockEntity.getActiveShape()
            }
            let NBTData = getNBTDataFromAABB(nbtPenAabb, level, player.getHorizontalFacing())

            let shape = ""
            //console.log(event.getTarget().block.entityData);
            
            if (event.getTarget().block.entityData.activeShape &&  event.getTarget().block.entityData.activeShape != 0){
                shape = `_shape_${event.getTarget().block.entityData.activeShape}`
            }
            let path = `kubejs/data/${event.getTarget().block.getId().split(":")[0]}/structure/multiblocks/${event.getTarget().block.getId().split(":")[1] + shape}.nbt`
            NBTIO.write(path, NBTData)
            event.player.tell(Text.info(`Saved to: ${path}`))

            console.log(NBTData);
            
    }
    nbtPenModeState ++
    nbtPenModeState %= 3
    return
})

function getNBTDataFromAABB(/** @type {nbtPenAabb} */ aabb, level, /** @type {$Direction} */ playerDirection ){
    
    let tempTemplate = new $StructureTemplate()
    
    let tempTemplateSize = new Vec3i(
        aabb.xsize,
        aabb.ysize,
        aabb.zsize
    )


    let startPos = BlockPos.containing(aabb.getMinPosition()).immutable()

    console.log(startPos);
    console.log(tempTemplateSize);

    let kjsWhy = new BlockPos(
        aabb.xsize,
        aabb.ysize,
        aabb.zsize).immutable()

    
    tempTemplate.fillFromWorld(
        level,
        startPos,
        kjsWhy,
        false,
        null
    )

    let zeroPos = BlockPos.ZERO
    let relativeRotation = getRelativeRotation()
    let inverseRotation = getInverseRotation(relativeRotation)

    let rotatedBounds = $StructureTemplate["transform(net.minecraft.core.BlockPos,net.minecraft.world.level.block.Mirror,net.minecraft.world.level.block.Rotation,net.minecraft.core.BlockPos)"](
        zeroPos.offset(kjsWhy).immutable(),
        $Mirror.NONE,
        relativeRotation,
        zeroPos
    )

    let normalizedSize = new Vec3i(
        Math.abs(rotatedBounds.getX()),
        Math.abs(rotatedBounds.getY()),
        Math.abs(rotatedBounds.getZ())
    )

    let settings = new $StructurePlaceSettings()
    let templateBlocks = []

    tempTemplate.palettes.forEach(palette => 
        palette.blocks().forEach(blockInfo => 
            templateBlocks.push(blockInfo)) )

    let posStateMap = new $HashMap()


    templateBlocks.forEach( blockInfo => {
        let rotatedPos = $StructureTemplate["transform(net.minecraft.core.BlockPos,net.minecraft.world.level.block.Mirror,net.minecraft.world.level.block.Rotation,net.minecraft.core.BlockPos)"](
            blockInfo.pos(), 
            $Mirror.NONE,
            relativeRotation, 
            zeroPos
        )
        rotatedPos = offsetToPositiveSpace(rotatedPos)
        let rotatedState = blockInfo.state().rotate(level, rotatedPos, inverseRotation)

        posStateMap.put(rotatedPos, rotatedState)
    })
    

    return convertPosStateMapToNBT(posStateMap)

    function getInverseRotation(/** @type {$Rotation} */ rotation) {
        if (rotation == $Rotation.CLOCKWISE_90) return $Rotation.COUNTERCLOCKWISE_90
        if (rotation == $Rotation.COUNTERCLOCKWISE_90) return $Rotation.CLOCKWISE_90
        if (rotation == $Rotation.CLOCKWISE_180) return $Rotation.NONE
        return rotation
    }


    function getRelativeRotation(){
        switch (playerDirection) {
            case Direction.NORTH:
                return $Rotation.CLOCKWISE_180
            case Direction.WEST:
                return $Rotation.COUNTERCLOCKWISE_90
            case Direction.EAST:
                return $Rotation.CLOCKWISE_90
            default:
                return $Rotation.NONE
        }
    }

    function offsetToPositiveSpace(rotatedPos){
        switch (relativeRotation) {
            case $Rotation.CLOCKWISE_90:
                return rotatedPos.offset(tempTemplateSize.getZ() - 1, 0, 0)
            case $Rotation.CLOCKWISE_180:
                return rotatedPos.offset(tempTemplateSize.getX() - 1, 0, tempTemplateSize.getZ() - 1)
            case $Rotation.COUNTERCLOCKWISE_90:
                return rotatedPos.offset(0, 0, tempTemplateSize.getX() - 1)
            default:
                return rotatedPos
        }
    }
    
}

function convertPosStateMapToNBT(posStateMap){
    let minX = 10000, minY = 10000, minZ = 10000
    let maxX = -10000, maxY = -10000, maxZ = -10000

    posStateMap.keySet().forEach(pos => {
        minX = Math.min(minX, pos.getX())
        minY = Math.min(minY, pos.getY())
        minZ = Math.min(minZ, pos.getZ())
        maxX = Math.max(maxX, pos.getX())
        maxY = Math.max(maxY, pos.getY())
        maxZ = Math.max(maxZ, pos.getZ())
    })

    const sizeX = maxX - minX + 1
    const sizeY = maxY - minY + 1
    const sizeZ = maxZ - minZ + 1

    let paletteList = new $ArrayList()
    let paletteIndexMap = {}

    posStateMap.values().forEach(state => {
        if (!paletteIndexMap[state]) {
            paletteIndexMap[state] = paletteList.size()
            paletteList.add(state)
        }
    })

    let blocksList = new $ListTag()
    posStateMap.forEach((blockPos, blockState) => {

        let relativeX = sizeX - 1 - blockPos.getX() + minX
        let relativeY = blockPos.getY() - minY
        let relativeZ = sizeZ - 1 - blockPos.getZ() + minZ

        let blockCompound = new $CompoundTag()
        blockCompound.put("pos", NBT.intArrayTag([relativeX, relativeY, relativeZ]))

        blockCompound.putInt("state", paletteIndexMap[blockState])

        blocksList.add(blockCompound)
    })

    let paletteTag = new $ListTag()
    paletteList.forEach(state => {
        paletteTag.add(serializeBlockState(state))
    })

    let root = new $CompoundTag()
    root.put("size", NBT.intArrayTag([sizeX, sizeY, sizeZ]))
    root.put("palette", paletteTag)
    root.put("blocks", blocksList)
    root.put("entities", new $ListTag())

    return root
}

function getNBTDataFromMembersAndController(map, block){

    let posStateMap = new $HashMap()

    posStateMap.put(new BlockPos(0,0,0), block.getBlockState())

    map.forEach((blockPos, simpleMember) => {
        let blockState = simpleMember.getPreviewState().rotate($Rotation.CLOCKWISE_180)
        posStateMap.put(blockPos, blockState)
    })

    return convertPosStateMapToNBT(posStateMap)
    
}

function serializeBlockState(state){
    // let tag = new $CompoundTag()

    // tag.putString("Name", state.getBlock().builtInRegistryHolder().key().location().toString())

    // if (!state.getProperties().isEmpty()) {
    //     let propertiesTag = new $CompoundTag()

    //     state.getProperties().forEach( property => {
    //         let value = state.getValue(property).toString()
    //         propertiesTag.putString(property.getName(), value)
    //     })
    //     tag.put("Properties", propertiesTag)
    // }

    // console.log(tag);
    
    // return tag

    let tag = $BlockState.CODEC.encodeStart($NbtOps.INSTANCE, state).getOrThrow()
    //console.log(tag);
    return tag
}