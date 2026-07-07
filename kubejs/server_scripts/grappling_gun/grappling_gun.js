let $ChainKnotEntity = Java.loadClass("com.evandev.connectiblechains.entity.ChainKnotEntity")
let $Chainable = Java.loadClass("com.evandev.connectiblechains.entity.Chainable")

NetworkEvents.dataReceived('milf_grappling_gun_zipline', (event) => {

    let { data, player, level } = event

    let item = player.getMainHandItem()

    if (item.id != "milf:grappling_gun") return
    if (player.cooldowns.isOnCooldown(item)) return

    let posData = data.get("pos")

    let { x, y, z } = getXYZFromPosCompound(posData)

    if (player.isUsingItem()) player.releaseUsingItem()

    let fenceId = data.getString("fenceId")
    let blockState = Block.getBlock(fenceId).defaultBlockState()
    let blockPos = new BlockPos(x,y,z)
    let playerBlockPos = player.getOnPos().above()
    
    let fencePosNearPlayer = getNearbyFencePos(playerBlockPos)
    if (fencePosNearPlayer) {
        playerBlockPos = fencePosNearPlayer
    } else {
        if (!checkColumnFromPos(playerBlockPos, 3)) return
    }

    let fencePosNearDestination = getNearbyFencePos(blockPos)
    if (fencePosNearDestination) {
        blockPos = fencePosNearDestination
    } else {
        if (!checkColumnFromPos(blockPos, 3)) return
    }

    if (blockPos.equals(playerBlockPos)) return

    let { isEnough, missingItems } = checkAndRemoveItems(player, [{ id:"milf:zipped_zipline", count:1}])
    
    if (!isEnough){
        sendMissingItemsNotification(player, missingItems, MissingItemsNotificationType.USE)
        return
    }
    
    let chainItem = Item.of("farmersdelight:rope").item

    if (!fencePosNearPlayer){ 
        setColumnFromPos(playerBlockPos, 3)
        playerBlockPos = playerBlockPos.above(2)
    }

    if (!fencePosNearDestination) {
        setColumnFromPos(blockPos, 3)
        blockPos = blockPos.above(2)
    }

    

    let knot1 = new $ChainKnotEntity.getOrCreate(level, blockPos, chainItem, Direction.UP)
    let knot2 = new $ChainKnotEntity.getOrCreate(level, playerBlockPos, chainItem, Direction.UP)

    knot1.attachChain(new $Chainable.ChainData(knot2, chainItem), null, true)

    milfPlaySound(event, "immersive_machinery:hatch_close", { pos: playerBlockPos })

    player.cooldowns.addCooldown(item, 30)



    function checkColumnFromPos(pos, height){
        for (let i = 0; i < height; i++) {
            if (!level.isEmptyBlock(pos.above(i))) return false
        }
        return true
    }

    function setColumnFromPos(pos, height){
        for (let i = 0; i < height; i++) {
            level.setBlockAndUpdate(pos.above(i), blockState)
        }
    }

    function getNearbyFencePos(pos){
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
})

 