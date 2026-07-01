// priority: 90
let $HitResult$Type = Java.loadClass("net.minecraft.world.phys.HitResult$Type")

let $LinkedList = Java.loadClass("java.util.LinkedList")

ClientEvents.highlight(event =>{
    if (event.player.mainHandItem.id != "milf:mi_upgrader") return
    if (event.client.hitResult.type != $HitResult$Type.BLOCK) return
    if (!Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos).blockState.block.hasTag("milf:upgradable")) return
    
    event.addTargetBlock(0xc6b2db)

    // let connectedBlocksPos = getConnectedBlocksPos(event.level, event.getTargetBlock().pos, 20)
    // connectedBlocksPos.forEach(pos => {
    //     event.addBlock(pos, 0xc6b2db)
    // })
    
})


