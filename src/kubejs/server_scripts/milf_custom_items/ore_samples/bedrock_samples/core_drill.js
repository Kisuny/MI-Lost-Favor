let $FluidUtil = Java.loadClass("net.neoforged.neoforge.fluids.FluidUtil")
let $FluidAction = Java.loadClass("net.neoforged.neoforge.fluids.capability.IFluidHandler$FluidAction")

BlockEvents.rightClicked("immersiveengineering:sample_drill", event => {
    if (event.getHand() == "OFF_HAND") return
    let {player, level, block} = event
    let stack = player.getMainHandItem()
    if (stack.id != "immersivepetroleum:oil_can") return

    let blockPos = block.pos

    if (level.getBlock(blockPos.below() ).id != "minecraft:bedrock") return

    let blockEntity = level.getBlockEntity(blockPos)
    if (blockEntity.isRunning){

        if(blockPos.getY( ) != -59){
            sendImmersiveMessage(Component.translatable("milf.core_drill.y_pos"), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
            return
        }

        let ores = getAllOreIdsInRadius(level, player, 10)

        let chunkPos = new $ChunkPos(blockPos)

        let bedrockAABB = AABB.of(
            chunkPos.getMinBlockX(), -60, chunkPos.getMinBlockZ(),
            chunkPos.getMaxBlockX(), -59, chunkPos.getMaxBlockZ()
        )

        let isSampleInChunk = false
        let sampleState = Blocks.AIR.defaultBlockState()

        for (let ore of ores) {            


            let oreName = global.oresWithSamples.find(entry => entry.oreData?.displayItem == ore)?.itemName

            let sampleId = `milf:bedrock_${oreName}_ore_sample`            

            let sampleBlock = Block.getBlock(sampleId)



            isSampleInChunk = BlockPos.betweenClosedStream(bedrockAABB).anyMatch(blockPos => {

                return level.getBlockState(blockPos)["is(net.minecraft.world.level.block.Block)"](sampleBlock)

            })

            if (!isSampleInChunk) {
                sampleState = sampleBlock.defaultBlockState()

                break

            }
        }

        if (isSampleInChunk){
            sendImmersiveMessage(Component.translatable("milf.core_drill.sample_in_chunk"), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
            return
        }


        //console.log(ores)

        let fluidComponent = stack.components.get("immersivepetroleum:ip_fluid_item")

        if (fluidComponent) {
            let fluidId = $BuiltInRegistries.FLUID.getKey(fluidComponent.getFluid())
            let amount = fluidComponent.getAmount()

            //console.log(fluidId, amount);


            if (fluidId == "modern_industrialization:lubricant" && amount >= 4000 ) {

                if (!sampleState.isAir()){

                    let handler = $FluidUtil.getFluidHandler(stack).ifPresent(handler => {
                        handler.drain(Fluid.of("modern_industrialization:lubricant", 4000), $FluidAction.EXECUTE)
                    })

                    event.server.scheduleInTicks(6, callback => {

                        particleFrame(PARTICLES.dispersed, block.getPos(), { x: 1, y: 3, z: 1 }, event)
                        milfPlaySound(event, "immersive_machinery:tunnel_digger_drilling", { pos: blockPos, volume: 0.8, pitch:1.2 })

                    })

                    event.server.scheduleInTicks(40, callback => {

                        particleFrame(PARTICLES.dispersed, block.getPos(), { x: 1, y: 3, z: 1 }, event)
                        milfPlaySound(event, "immersive_machinery:tunnel_digger_drilling", { pos: blockPos, volume: 1, pitch: 0.9 })

                    })

                    event.server.scheduleInTicks(71, callback => {

                        particleFrame(PARTICLES.dispersed, block.getPos(), { x: 1, y: 3, z: 1 }, event)
                        milfPlaySound(event, "immersive_machinery:tunnel_digger_drilling", { pos: blockPos, volume: 1.3, pitch: 0.5 })


                    })

                    event.server.scheduleInTicks(93, callback => {

                        let bEntity = level.getBlockEntity(blockPos)

                        if (bEntity && $BuiltInRegistries.BLOCK_ENTITY_TYPE.getKey(bEntity.getType()) == "immersiveengineering:sampledrill_master") {

                            level.setBlockAndUpdate(blockPos.below(), sampleState)

                            level.setBlockAndUpdate(blockPos, Blocks.AIR.defaultBlockState())
                            milfPlaySound(event, "supplementaries:explosion.bomb", { pos: blockPos, volume: 1, pitch: 0.7 })

                            event.getLevel().spawnParticles(
                                "minecraft:explosion",
                                false,
                                blockPos.getX() + 0.5,
                                blockPos.getY() + 0.5,
                                blockPos.getZ() + 0.5,
                                0.2, 0.2, 0.2, 3, 0.2
                            )

                            event.getLevel().spawnParticles(
                                "minecraft:campfire_cosy_smoke",
                                false,
                                blockPos.getX() + 0.5,
                                blockPos.getY() + 0.5,
                                blockPos.getZ() + 0.5,
                                0, 0.34, 0, 1, 0.01
                            )

                            event.getLevel().spawnParticles(
                                "minecraft:campfire_cosy_smoke",
                                false,
                                blockPos.getX() + 0.5,
                                blockPos.getY() + 0.5,
                                blockPos.getZ() + 0.5,
                                0, 0.78, 0, 1, 0.01
                            )

                            event.getLevel().spawnParticles(
                                "minecraft:campfire_cosy_smoke",
                                false,
                                blockPos.getX() + 0.5,
                                blockPos.getY() + 0.5,
                                blockPos.getZ() + 0.5,
                                0, 0.09, 0, 4, 0
                            )

                        }


                    })





                } else {
                    sendImmersiveMessage(Component.translatable("milf.core_drill.no_valid_deposits"), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
                }
                

            } else {

                if (amount < 4000){
                    sendImmersiveMessage(Component.translatable("milf.core_drill.not_enough_fluid"), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)

                }

                if (fluidId != "modern_industrialization:lubricant"){
                    sendImmersiveMessage(Component.translatable("milf.core_drill.wrong_fluid"), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)

                }
            }
        } else {
            sendImmersiveMessage(Component.translatable("milf.core_drill.not_enough_fluid"), event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        }

        
    }
    
})

function getAllOreIdsInRadius(level, player, radius) {
    let worldTargets = $WorldTargets.get(level)
    let playerPos = player.blockPosition()
    let foundOreIds = new $HashSet()

    const DEPOSIT_TO_ORE = (() => {
        let map = new $HashMap()
        for (let oreId in ORE_ID_TO_DEPOSIT_NAMES) {
            for (let depositName of ORE_ID_TO_DEPOSIT_NAMES[oreId]) {
                map.put(depositName, oreId)
            }
        }
        return map
    })()

    let radiusSq = radius * radius

    worldTargets.generated()
        .entrySet()
        .stream()
        .forEach(entry => {
            let pos = entry.getKey()
            let target = entry.getValue()

            let dx = pos.getX() - playerPos.getX()
            let dz = pos.getZ() - playerPos.getZ()
            let distanceSq = (dx * dx) + (dz * dz)


            if (distanceSq <= radiusSq) {
                let oreId = DEPOSIT_TO_ORE.get(target.name)
                if (oreId) {
                    foundOreIds.add(oreId)
                }
            }
        })

    return foundOreIds
}

