//priority: 2

//TODO TODO TODO

//IMPORTANT!!! ( ⓛ ω ⓛ *)

// ┏┓ ┏┓ ┏┓
// ┃┃ ┃┃ ┃┃
// ┃┃ ┃┃ ┃┃
// ┗┛ ┗┛ ┗┛
// ┏┓ ┏┓ ┏┓
// ┗┛ ┗┛ ┗┛

//THIS PIECE OF ESOTERIC PROGRAMMING EXERCISE HAS TO BE MADE INTO A SEPARATE MOD, AND I SHOULD MAKE IT ASAP
//It's all fun and giggles to make stuff like this in KJS, but this particular thing is FrAGILE AS HELL
//Basically it'll crash the game anytime ANYTHING wants to use any of JavaAdapters' methods on multiple threads at the same time

//IN NO CIRCUMSTANCES SHOULD THIS CODE BE ALLOWED TO SHIP
//Sincerely, Ms. S (^・ω・^ )

let $Shapes = Java.loadClass("net.minecraft.world.phys.shapes.Shapes")
let $MaterialType = Java.loadClass("com.yanny.ytech.configuration.MaterialType")
let $BlockBehaviour$Properties = Java.loadClass("net.minecraft.world.level.block.state.BlockBehaviour$Properties")
let $BlockItem = Java.loadClass("net.minecraft.world.item.BlockItem")
let $BlockStateProperties = Java.loadClass("net.minecraft.world.level.block.state.properties.BlockStateProperties")
let $Fluids = Java.loadClass("net.minecraft.world.level.material.Fluids")
let $BlockPlaceContext = Java.loadClass('net.minecraft.world.item.context.BlockPlaceContext')
let $BaseEntityBlock = Java.loadClass('net.minecraft.world.level.block.BaseEntityBlock')
let $RenderShape = Java.loadClass('net.minecraft.world.level.block.RenderShape')
let $BlockEntity = Java.loadClass('net.minecraft.world.level.block.entity.BlockEntity')
let $ItemStackHandler = Java.loadClass('net.neoforged.neoforge.items.ItemStackHandler')
let $FluidTank = Java.loadClass('net.neoforged.neoforge.fluids.capability.templates.FluidTank')
let $BlockEntityType$Builder = Java.loadClass('net.minecraft.world.level.block.entity.BlockEntityType$Builder')
let $Block = Java.loadClass('net.minecraft.world.level.block.Block')
let $KubeJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS')
let $NonNullList = Java.loadClass('net.minecraft.core.NonNullList')
let $ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack")
let $IItemHandler = Java.loadClass("net.neoforged.neoforge.items.IItemHandler")
let $Tag = Java.loadClass("net.minecraft.nbt.Tag")
let $ItemInteractionResult = Java.loadClass("net.minecraft.world.ItemInteractionResult")
let $ClientboundBlockEntityDataPacket = Java.loadClass("net.minecraft.network.protocol.game.ClientboundBlockEntityDataPacket")
let $SoundType = Java.loadClass("net.minecraft.world.level.block.SoundType")
let $ParticleTypes = Java.loadClass("net.minecraft.core.particles.ParticleTypes")
let $ServerLevel = Java.loadClass("net.minecraft.server.level.ServerLevel")
let $BlockEntityTicker = Java.loadClass("net.minecraft.world.level.block.entity.BlockEntityTicker")
let $FluidStack = Java.loadClass("net.neoforged.neoforge.fluids.FluidStack")
let $SoundEvents = Java.loadClass("net.minecraft.sounds.SoundEvents")
let $SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource")

// cursed (‾◡◝)

// createNewJavaBlock("clay_crucible", {},
//     () => new ClayCrucibleBlock(
//         $BlockBehaviour$Properties.of()
//             .strength(2, 3)
//             .sound($SoundType.DECORATED_POT)
//     )
// )

// let MILF_BLOCK_ENTITIES = $DeferredRegister["create(net.minecraft.core.Registry,java.lang.String)"]($BuiltInRegistries.BLOCK_ENTITY_TYPE, "milf")

// let CLAY_CRUCIBLE_TYPE = MILF_BLOCK_ENTITIES["register(java.lang.String,java.util.function.Supplier)"](
//     "clay_crucible", () => $BlockEntityType$Builder.of(
//         (pos, state) => new ClayCrucibleBlockEntity(pos, state),
//         Block.getBlock("milf:clay_crucible")
//     ).build(null)
// )

// //ehm, I sure HOPE it'll be fine =￣ω￣=
// MILF_BLOCK_ENTITIES.register($KubeJS.modEventBus)

// function ClayCrucibleBlock(properties){

//     let ticker = new JavaAdapter($BlockEntityTicker, {
//         tick: (level, pos, state, blockEntity) => {
//             if (level && !level.isClientSide() && level instanceof $ServerLevel) {

//                 blockEntity.serverTick(level, pos, state)

//                 if (level.getTime() % 5 != 0) return

//                 if (blockEntity.isLit()) {
//                     level.sendParticles(
//                         $ParticleTypes.FLAME,
//                         pos.getX() + 0.5, pos.getY() + 0.75, pos.getZ() + 0.5,
//                         3,
//                         0.16, 0.1, 0.16,
//                         0.004
//                     )

//                     if(Math.random() < 0.3){
//                         level["playSound(net.minecraft.world.entity.Entity,net.minecraft.core.BlockPos,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)"](
//                             null, pos,
//                             $SoundEvents.FIRE_AMBIENT,
//                             $SoundSource.BLOCKS,
//                             1, 1
//                         )
//                     }
//                 }
//             }
//         }
//     })

//     let self
//     let shape = $Block.box(3, 0, 3, 13, 10, 13)

//     self = new JavaAdapter($BaseEntityBlock, {

//         getRenderShape(state) {
//             return $RenderShape.MODEL
//         },


//         newBlockEntity(pos, state) {
//             return new ClayCrucibleBlockEntity(pos, state)
//         },

//         useItemOn(stack, state, level, pos, player, hand, hitResult) {

//             if (stack && !stack.isEmpty()){
//                 let itemId = $BuiltInRegistries.ITEM.getKey(stack.getItem())
//                 if (itemId == "milf:firestarter"){
//                     return $ItemInteractionResult.PASS_TO_DEFAULT_BLOCK_INTERACTION
//                 }
//             }

//             if (level.isClientSide() || !player) {
//                 return $ItemInteractionResult.SUCCESS
//             }

//             let blockEntity = level.getBlockEntity(pos)
//             if (blockEntity && $FluidUtil.interactWithFluidHandler(player, hand, blockEntity.getFluidTank())) {
//                 return $ItemInteractionResult.SUCCESS
//             }

//             let itemHandler = blockEntity.getItemHandler()

//             if (!stack.isEmpty()) {
//                 let remainingStack = itemHandler.insertAnywhere(stack.copyWithCount(1))
//                 if (remainingStack.isEmpty()) {
//                     stack.shrink(1)
//                     player.setItemInHand(hand, stack)
//                     level["playSound(net.minecraft.world.entity.Entity,net.minecraft.core.BlockPos,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)"](
//                         null, pos,
//                         $SoundEvents.DECORATED_POT_INSERT,
//                         $SoundSource.BLOCKS,
//                         1, 1
//                     )
//                     return $ItemInteractionResult.SUCCESS
//                 } else {
//                     level["playSound(net.minecraft.world.entity.Entity,net.minecraft.core.BlockPos,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)"](
//                         null, pos,
//                         $SoundEvents.DECORATED_POT_INSERT_FAIL,
//                         $SoundSource.BLOCKS,
//                         1, 1
//                     )
//                 }
//             } else {
//                 if (player.isShiftKeyDown() && stack.isEmpty() && !blockEntity.isLit()) {
//                     for (let i = 0; i < itemHandler.getSlots(); i++) {
//                         let outputStack = itemHandler.extractItem(i, 64, false)
//                         if (!outputStack.isEmpty()) {
//                             $Block.popResource(level, pos, outputStack)
//                             blockEntity.setIsFull(itemHandler.isFull())
//                             return $ItemInteractionResult.SUCCESS
//                         }
//                     }

//                 }

//                 blockEntity.setIsFull(itemHandler.isFull())

//             }


//             return $ItemInteractionResult.PASS_TO_DEFAULT_BLOCK_INTERACTION
//         },



//         getShape(state, level, pos, content) {
//             return shape
//         },

//         onRemove(state, level, pos, newState, movedByPiston) {
//             if (!state["is(net.minecraft.world.level.block.Block)"](newState.getBlock())) {
//                 let blockEntity = level.getBlockEntity(pos)

//                 if (blockEntity) {
//                     let itemHandler = blockEntity.getItemHandler()
//                     if (itemHandler) {
//                         for (let i = 0; i < itemHandler.getSlots(); i++) {
//                             let stack = itemHandler.getStackInSlot(i)
//                             if (stack && !stack.isEmpty()) {
//                                 $Block.popResource(level, pos, stack)
//                             }
//                         }
//                     }
//                 }

//                 this.super$onRemove(state, level, pos, newState, movedByPiston)
//             }
//         },

//         getTicker(level, state, blockEntityType){
//             if(level.isClientSide()) return null

//             if (blockEntityType != CLAY_CRUCIBLE_TYPE.get()) return null

//             return ticker

//         }


//     }, properties)

//     return self
// }

// function ClayCrucibleBlockEntity(pos, state) {

//     let self
//     let stacks = [null, null]

//     let isFull = false
//     let isLit = false
//     let hasFluid = false

//     let progress = 0
//     let maxProgress = 109

//     let CRUSHED_ORES = new $HashSet([
//         "milf:crushed_copper",
//         "milf:crushed_tin",
//         "milf:crushed_gold",
//         "milf:crushed_lead"
//     ])

//     let COALS = new $HashSet([
//         "minecraft:coal"
//     ])

//     let RESULT_MAP = new $HashMap({
//         "milf:crushed_copper": "embers:molten_copper",
//         "milf:crushed_tin": "embers:molten_tin",
//         "milf:crushed_lead": "embers:molten_lead",
//         "milf:crushed_gold": "embers:molten_gold"
//     })

//     function isValidInput(slot, stack){
//         if (stack.isEmpty()) return false
//         if (!fluidTank.isEmpty()) return false
//         let itemId = $BuiltInRegistries.ITEM.getKey(stack.getItem()).toString()
//         if(slot == 0){
//             return CRUSHED_ORES.contains(itemId)
//         } else {
//             return COALS.contains(itemId)
//         }


//     }

//     let itemHandler = new JavaAdapter($IItemHandler, {
//         getSlots() { 
//             return 2 
//         },

//         getStackInSlot(slot) {
//             return stacks[slot] || $ItemStack.EMPTY
//         },

//         insertItem(slot, stack, simulate) {
//             if (slot < 0 || slot >= 2 || stack.isEmpty()) return stack

//             if(!isValidInput(slot, stack)) return stack

//             let currentStack = stacks[slot] || $ItemStack.EMPTY

//             if (!currentStack.isEmpty() && !$ItemStack.isSameItemSameComponents(currentStack, stack)) return stack

//             let slotLimit = this.getSlotLimit(slot)

//             let max = Math.min(slotLimit, stack.getMaxStackSize()) - currentStack.getCount()
//             if (max <= 0) return stack

//             let n = Math.min(stack.getCount(), max)

//             if (!simulate) {
//                 if (currentStack.isEmpty()) stacks[slot] = stack.copyWithCount(n)
//                 else currentStack.grow(n)
//                 self.setChanged()
//             }

//             let remainingStack = stack.copy()
//             remainingStack.shrink(n)
//             return remainingStack.isEmpty() ? $ItemStack.EMPTY : remainingStack
//         },

//         extractItem(slot, amount, simulate) {
//             if (slot < 0 || slot >= 2 || amount <= 0) return $ItemStack.EMPTY
//             let currentStack = stacks[slot] || $ItemStack.EMPTY
//             if (currentStack.isEmpty()) return $ItemStack.EMPTY
//             let n = Math.min(amount, currentStack.getCount())
//             let outputStack = currentStack.copyWithCount(n)
//             if (!simulate) {
//                 currentStack.shrink(n)
//                 if (currentStack.isEmpty()) stacks[slot] = null
//                 self.setChanged()
//             }
//             return outputStack
//         },

//         getSlotLimit(slot) { 
//             if(slot == 0) {
//                 return 8
//             } else {
//                 return 4
//             }
            
//         },
//         isItemValid(slot, stack) { 
//             return isValidInput(slot, stack) 
//         },

//         insertAnywhere(stack) {
//             let remainingStack = stack
//             for (let i = 0; i < 2; i++) {
//                 remainingStack = this.insertItem(i, remainingStack, false)
//                 if (remainingStack.isEmpty()) break
//             }
//             return remainingStack
//         },

//         isFull(){
            
//             let stack0 = this.getStackInSlot(0)
//             if(stack0.isEmpty()) return false
//             let stack1 = this.getStackInSlot(1)
//             if (stack1.isEmpty()) return false
//             return stack0.getCount() + stack1.getCount() >= 12
//         }

//     })

//     let fluidTank = new JavaAdapter($FluidTank, {

//         onContentsChanged() {
//             self.setChanged()
//         },

//     }, 1000)

//     self = new JavaAdapter($BlockEntity, {

//         level: this.super$level,

//         getItemHandler(){
//             return itemHandler
//         },

//         getFluidTank() {
//             return fluidTank
//         },

//         saveAdditional(tag, registries) {
//             this.super$saveAdditional(tag, registries)

//             let itemStacks = new $ListTag()
//             for (let i = 0; i < 2; i++) {
//                 let stack = stacks[i]
//                 itemStacks.add(stack ? stack.save(registries) : new $CompoundTag())
//             }
//             tag.put("items", itemStacks)

//             tag.put("fluid", fluidTank.writeToNBT(registries, new $CompoundTag()))

//             tag.put("isFull", isFull)

//             tag.put("isLit", isLit)

//             tag.put("hasFluid", hasFluid)

//             tag.putInt("progress", progress)
//         },


//         loadAdditional(tag, registries) {
//             this.super$loadAdditional(tag, registries)

//             let itemStacks = tag.getList("items", $Tag.TAG_COMPOUND)
//             for (let i = 0; i < 2 && i < itemStacks.size(); i++) {
//                 let stackCompound = itemStacks.getCompound(i)
//                 stacks[i] = stackCompound.isEmpty() ? null : $ItemStack.parse(registries, stackCompound).orElse($ItemStack.EMPTY)
//             }

//             if (tag.contains("fluid")) {
//                 fluidTank.readFromNBT(registries, tag.getCompound("fluid"))
//             }

//             if(tag.contains("isFull")){
//                 isFull = tag.getBoolean("isFull")
//             }

//             if (tag.contains("isLit")) {
//                 isLit = tag.getBoolean("isLit")
//             }

//             if (tag.contains("hasFluid")) {
//                 hasFluid = tag.getBoolean("hasFluid")
//             }

//             if (tag.contains("progress")) {
//                 progress = tag.getInt("progress")
//             }
//         },

//         serverTick(level, pos, state){
//             if (!isLit) return

//             progress++

//             if(progress >= maxProgress){
//                 progress = 0

//                 let inputStack = itemHandler.getStackInSlot(0)

//                 let inputId = $BuiltInRegistries.ITEM.getKey(inputStack.getItem()).toString()
//                 let fluidId = RESULT_MAP.get(inputId)

//                 if (!fluidId) return

//                 let fluid = $BuiltInRegistries.FLUID.get(fluidId)
//                 let fluidStack = new $FluidStack(fluid, 1000)

//                 fluidTank.fill(fluidStack, $FluidAction.EXECUTE)

//                 itemHandler.extractItem(0,8,false)
//                 itemHandler.extractItem(1, 4, false)

//                 isLit = false
//                 isFull = false

//                 this.setChanged()
//                 return
//             }

//             if(progress % 10 == 0){
//                 this.setChanged()
//             }
//         },

//         setIsFull(boolean) {
//             isFull = boolean
//             this.setChanged()
//         },

//         isFull() {
//             return isFull
//         },

//         setLit(boolean){
//             isLit = boolean
//             this.setChanged()
//         },

//         isLit() {
//             return isLit
//         },

//         setChanged(){
//             this.super$setChanged()
//             if (this.level != null && !this.level.isClientSide()){
//                 this.level.sendBlockUpdated(this.worldPosition, this.getBlockState(), this.getBlockState(), 3)
//             }
//         },

//         getUpdatePacket() {
//             return $ClientboundBlockEntityDataPacket.create(this)
//         },

//         getUpdateTag(registries){
//             return this.saveWithoutMetadata(registries)
//         }

//     }, CLAY_CRUCIBLE_TYPE.get(), pos, state)

//     return self
// }

// let $BlockEntityRenderer = Platform.isClientEnvironment() ? Java.loadClass("net.minecraft.client.renderer.blockentity.BlockEntityRenderer") : null
// let $ItemDisplayContext = Platform.isClientEnvironment() ? Java.loadClass("net.minecraft.world.item.ItemDisplayContext") : null
// let $EntityRenderersEvent$RegisterRenderers = Platform.isClientEnvironment() ? Java.loadClass("net.neoforged.neoforge.client.event.EntityRenderersEvent$RegisterRenderers") : null
// let $ItemBlockRenderTypes = Platform.isClientEnvironment() ? Java.loadClass("net.minecraft.client.renderer.ItemBlockRenderTypes") : null
// let $ModelData = Platform.isClientEnvironment() ? Java.loadClass("net.neoforged.neoforge.client.model.data.ModelData") : null
// let $IClientFluidTypeExtensions = Platform.isClientEnvironment() ? Java.loadClass("net.neoforged.neoforge.client.extensions.common.IClientFluidTypeExtensions") : null
// let $InventoryMenu = Platform.isClientEnvironment() ? Java.loadClass("net.minecraft.world.inventory.InventoryMenu") : null
// let $RenderType = Platform.isClientEnvironment() ? Java.loadClass("net.minecraft.client.renderer.RenderType") : null

// function ClayCrucibleRenderer(context) {

//     let self
//     let blockRenderer = context.getBlockRenderDispatcher()
//     let itemRenderer = context.getItemRenderer()

//     self = new JavaAdapter($BlockEntityRenderer, {

//         render(blockEntity, partialTick, poseStack, bufferSource, combinedLight, combinedOverlay) {

//             if(!blockEntity) return

//             let itemHandler = blockEntity.getItemHandler()
//             if (!itemHandler) return

//             let fluidTank = blockEntity.getFluidTank()
//             if (!fluidTank) return

//             if (!fluidTank.isEmpty()) {

//                 let fluidStack = fluidTank.getFluid().copy()

//                 let extensions = $IClientFluidTypeExtensions.of(fluidStack.getFluid())

//                 let sprite = Client
//                     .getTextureAtlas($InventoryMenu.BLOCK_ATLAS)
//                     .apply(extensions.getStillTexture())

//                 let minX = 4 / 16
//                 let maxX = 12 / 16
//                 let minZ = 4 / 16
//                 let maxZ = 12 / 16

//                 let minY = 2 / 16
//                 let percent = fluidStack.getAmount() / 1000
//                 let maxY = minY + (percent * (6 / 16))

//                 let color = extensions.getTintColor(fluidStack)
//                 let a = ((color >> 24) & 255) / 255
//                 let r = ((color >> 16) & 255) / 255
//                 let g = ((color >> 8) & 255) / 255
//                 let b = (color & 255) / 255

//                 let consumer = bufferSource.getBuffer($RenderType.translucent())
//                 let matrix = poseStack.last().pose()

//                 let u0 = sprite.getU0()
//                 let u1 = sprite.getU1()
//                 let v0 = sprite.getV0()
//                 let v1 = sprite.getV1()

//                 consumer.addVertex(matrix, minX, maxY, minZ).setColor(r, g, b, a).setUv(u0, v0).setOverlay(combinedOverlay).setLight(combinedLight).setNormal(0, 1, 0)
//                 consumer.addVertex(matrix, minX, maxY, maxZ).setColor(r, g, b, a).setUv(u0, v1).setOverlay(combinedOverlay).setLight(combinedLight).setNormal(0, 1, 0)
//                 consumer.addVertex(matrix, maxX, maxY, maxZ).setColor(r, g, b, a).setUv(u1, v1).setOverlay(combinedOverlay).setLight(combinedLight).setNormal(0, 1, 0)
//                 consumer.addVertex(matrix, maxX, maxY, minZ).setColor(r, g, b, a).setUv(u1, v0).setOverlay(combinedOverlay).setLight(combinedLight).setNormal(0, 1, 0)

//             }

//             if (blockEntity.isFull()){

//                 let blockId = blockEntity.isLit() ? "minecraft:magma_block" : "minecraft:coal_block"
//                 poseStack.pushPose()
//                 poseStack.translate(0.25, 0, 0.25)
//                 poseStack.scale(0.5, 0.5, 0.5)
//                 blockRenderer.renderSingleBlock(
//                     Block.getBlock(blockId).defaultBlockState(),
//                     poseStack,
//                     bufferSource,
//                     combinedLight,
//                     combinedOverlay,
//                     $ModelData.EMPTY,
//                     null
//                 )
//                 poseStack.popPose()
//                 return
//             }

//             let pos = blockEntity.getBlockPos()
//             let seed = pos.hashCode()

//             let stack0 = itemHandler.getStackInSlot(0)
//             let totalI = 0

//             if (stack0 && !stack0.isEmpty()) {
//                 for (let i = 0; i < stack0.getCount(); i++) {

//                     poseStack.pushPose()

//                     poseStack.translate(0.5, 1 / 16, 0.5)
//                     poseStack.scale(0.8, 0.8, 0.8)
//                     poseStack.translate(0, 1.5 / 16 * i * 0.5, 0)
//                     poseStack.mulPose($Axis.XN.rotationDegrees(90))
//                     poseStack.mulPose($Axis.ZP.rotationDegrees(Math.abs(Math.sin(seed + i * 109109) % 1) * 360))

//                     itemRenderer.renderStatic(
//                         stack0,
//                         $ItemDisplayContext.GROUND,
//                         combinedLight,
//                         combinedOverlay,
//                         poseStack,
//                         bufferSource,
//                         blockEntity.getLevel(),
//                         0
//                     )

//                     poseStack.popPose()

//                     totalI++

//                 }
//             }

//             let stack1 = itemHandler.getStackInSlot(1)
//             if (stack1 && !stack1.isEmpty()) {
//                 for (let i = totalI; i < stack1.getCount() + totalI; i++) {

//                     poseStack.pushPose()

//                     poseStack.translate(0.5, 1 / 16, 0.5)
//                     poseStack.scale(0.8, 0.8, 0.8)
//                     poseStack.translate(0, 1.5 / 16 * i * 0.5, 0)
//                     poseStack.mulPose($Axis.XN.rotationDegrees(90))
//                     poseStack.mulPose($Axis.ZP.rotationDegrees(Math.abs(Math.sin(seed + i * 109109) % 1) * 360))

//                     itemRenderer.renderStatic(
//                         stack1,
//                         $ItemDisplayContext.GROUND,
//                         combinedLight,
//                         combinedOverlay,
//                         poseStack,
//                         bufferSource,
//                         blockEntity.getLevel(),
//                         0
//                     )

//                     poseStack.popPose()

//                 }
//             }

//         }

//     })

//     return self
// }

// if (Platform.isClientEnvironment()) {

//     NativeEvents.onEvent($EntityRenderersEvent$RegisterRenderers, event => {
//         event.registerBlockEntityRenderer(
//             CLAY_CRUCIBLE_TYPE.get(),
//             (context) => new ClayCrucibleRenderer(context)
//         )
//     })
// }