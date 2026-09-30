ClientEvents.highlight(event =>{
    if (!event.client.hitResult) return
    if (event.client.hitResult.type != $HitResult$Type.BLOCK) return
    let levelBlock = Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos)
    let block = levelBlock.blockState.block
    if (!event.player.mainHandItem.isEmpty() && !event.player.mainHandItem.hasTag("milf:hammers")) return
    if (!block.hasTag("milf:placers") && !block.hasTag("milf:empty_box")) return
    if (block.hasTag("milf:empty_box") && (event.player.mainHandItem.hasTag("milf:hammers") || !event.player.isCrouching() )) return


    let color = 0xc6b2db
    
    if((event.player.isCrouching() && event.player.mainHandItem.isEmpty()) || (levelBlock.getProperties().enabled == "false" && event.player.mainHandItem.hasTag("milf:hammers"))){
        color = 0xdb446f
    }
    event.addTargetBlock(color)
})

// let testAABB = null

// NetworkEvents.dataReceived('placers', (event) => {

//     console.log(event.data);

//     let data = event.data

    

//     let xMin = data.getInt("xMin")
//     let yMin = data.getInt("yMin")
//     let zMin = data.getInt("zMin")
//     let xMax = data.getInt("xMax")
//     let yMax = data.getInt("yMax")
//     let zMax = data.getInt("zMax")
//     let posX = data.getInt("posX")
//     let posY = data.getInt("posY")
//     let posZ = data.getInt("posZ")

//     console.log(posX);
    

//     testAABB = AABB.of(xMin + posX, yMin + posY, zMin + posZ, xMax + posX, yMax + posY, zMax + posZ)

//     console.log(testAABB)

// })

// ClientEvents.highlight(event => {
//     if (testAABB){
//         event.addBlocks(testAABB.getMinPosition(), testAABB.getMaxPosition(), 0xdb446f)
//     }
// })
