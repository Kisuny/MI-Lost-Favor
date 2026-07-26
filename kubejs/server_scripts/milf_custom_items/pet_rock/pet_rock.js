const oreIds = global.oresWithSamples.reduce((acc, ore) => {
    const normalOre = `${ore.directory}:${ore.itemName}_ore`
    const deepslateOre = `${ore.directory}:deepslate_${ore.itemName}_ore`
    const itemName = ore.itemName
    acc[normalOre] = itemName.charAt(0).toUpperCase() + itemName.slice(1)
    acc[deepslateOre] = itemName.charAt(0).toUpperCase() + itemName.slice(1)
    return acc
}, {"minecraft:waxed_weathered_cut_copper_stairs" : "test",
    "xkdeco:mimic/arts_and_crafts/light_blue_polished_soapstone_wall" : "test",
    "chipped:vertical_disordered_crying_obsidian_bricks" : "test",
    "framedblocks:framed_ext_inner_double_corner_slope_panel": "test",
    "framedblocks:framed_flat_ext_inner_double_slope_panel_corner" : "test"
})

let $HitResult$Type = Java.loadClass("net.minecraft.world.phys.HitResult$Type")

ItemEvents.firstRightClicked("milf:pet_rock_on_a_leash", event => {
    if (event.hand == "OFF_HAND") return false
    if (event.level.isClientSide()) return false
    let item = event.getItem()
    if (event.player.cooldowns.isOnCooldown(item)) return
    let /**@type {$BlockHitResult_} */ hitResult = event.player.pick(event.player.reachDistance, 0, false)
    
    if (hitResult.type != $HitResult$Type.BLOCK) {
        // console.log(hitResult.type)
        // console.log($HitResult$Type.BLOCK)
        return
    }

    item.setDamage(item.damageValue + 1)
    if(item.damageValue == item.maxDamage){
        item.count--
        event.player.give(Item.of("milf:pet_rock"))
        event.player.inventoryMenu.broadcastFullState()
    }

    //let playerPos = event.player.getOnPos()
    let blockHitDirection = hitResult.getDirection()
    let blockHitPos = hitResult.getBlockPos()
    let extensionDirection
    switch (blockHitDirection) {
        case Direction.UP: extensionDirection = Direction.DOWN; break
        case Direction.DOWN: extensionDirection = Direction.UP; break
        case Direction.EAST: extensionDirection = Direction.WEST; break
        case Direction.WEST: extensionDirection = Direction.EAST; break
        case Direction.NORTH: extensionDirection = Direction.SOUTH; break
        case Direction.SOUTH: extensionDirection = Direction.NORTH; break
        default: extensionDirection = blockHitDirection; break
    }
    
    const LENGTH = 60
    const WIDTH = 3

    let halfWidth = (WIDTH - 1) / 2
    let minX, minY, minZ, maxX, maxY, maxZ

    switch (extensionDirection) {
        case Direction.DOWN:
            minX = blockHitPos.getX() - halfWidth
            maxX = blockHitPos.getX() + halfWidth
            minZ = blockHitPos.getZ() - halfWidth
            maxZ = blockHitPos.getZ() + halfWidth
            minY = blockHitPos.getY() - LENGTH
            maxY = blockHitPos.getY()
            break;

        case Direction.UP:
            minX = blockHitPos.getX() - halfWidth
            maxX = blockHitPos.getX() + halfWidth
            minZ = blockHitPos.getZ() - halfWidth
            maxZ = blockHitPos.getZ() + halfWidth
            minY = blockHitPos.getY()
            maxY = blockHitPos.getY() + LENGTH
            break;

        case Direction.NORTH:
            minX = blockHitPos.getX() - halfWidth
            maxX = blockHitPos.getX() + halfWidth
            minY = blockHitPos.getY() - halfWidth
            maxY = blockHitPos.getY() + halfWidth
            minZ = blockHitPos.getZ() - LENGTH
            maxZ = blockHitPos.getZ()
            break;

        case Direction.SOUTH:
            minX = blockHitPos.getX() - halfWidth
            maxX = blockHitPos.getX() + halfWidth
            minY = blockHitPos.getY() - halfWidth
            maxY = blockHitPos.getY() + halfWidth
            minZ = blockHitPos.getZ()
            maxZ = blockHitPos.getZ() + LENGTH
            break;

        case Direction.WEST:
            minY = blockHitPos.getY() - halfWidth
            maxY = blockHitPos.getY() + halfWidth
            minZ = blockHitPos.getZ() - halfWidth
            maxZ = blockHitPos.getZ() + halfWidth
            minX = blockHitPos.getX() - LENGTH
            maxX = blockHitPos.getX()
            break;

        case Direction.EAST:
            minY = blockHitPos.getY() - halfWidth
            maxY = blockHitPos.getY() + halfWidth
            minZ = blockHitPos.getZ() - halfWidth
            maxZ = blockHitPos.getZ() + halfWidth
            minX = blockHitPos.getX()
            maxX = blockHitPos.getX() + LENGTH
            break;

        default:
            console.log("DA HELL?");
            
    }
    

    
    //let aabb = AABB.of(playerPos.x - 1, playerPos.y, playerPos.z - 1, playerPos.x + 1, playerPos.y - 60, playerPos.z +1)
    let aabb = AABB.of(minX, minY, minZ, maxX, maxY, maxZ)

    let isAny = false
    let oresBelow = {}

    BlockPos.betweenClosedStream(aabb).forEach(blockPos =>{
        let state = event.level.getBlockState(blockPos)

        if(!state.isAir()){
            if (oreIds[state.block.id]){
                //event.player.tell(Component.ofString(oreIds[state.block.id]))
                oresBelow[state.block.id] = (oresBelow[state.block.id] || 0) + 1
                isAny = true
            }
        }
    })

    event.player.cooldowns.addCooldown(item, 120 + Math.trunc((Object.keys(oresBelow).length + 1) / 4)  * 120)

    if (!isAny) {
        //event.player.tell(Component.ofString("PILK"))
        event.player.sendData("pet_rock", {
            ores: null
        })
    } else {
        // for (const [ore, amount] of Object.entries(oresBelow)){
        //     event.player.tell(Component.ofString(oreIds[ore] + " x" + amount))
        // }

        event.player.sendData("pet_rock", {
            ores: oresBelow
        })
    }


})