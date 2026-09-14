//priority: 1

let $Item$Properties = Java.loadClass("net.minecraft.world.item.Item$Properties")
let $ClipContext = Java.loadClass("net.minecraft.world.level.ClipContext")
let $ClipContext$Block = Java.loadClass("net.minecraft.world.level.ClipContext$Block")
let $ClipContext$Fluid = Java.loadClass("net.minecraft.world.level.ClipContext$Fluid")
let $Direction = Java.loadClass("net.minecraft.core.Direction")
let $Style = Java.loadClass("net.minecraft.network.chat.Style")
let $TextColor = Java.loadClass("net.minecraft.network.chat.TextColor")
let $BlockTags = Java.loadClass("net.minecraft.tags.BlockTags")

let $SteamDrillItem = Java.loadClass("aztech.modern_industrialization.items.SteamDrillItem")
let $GeometryHelper = Java.loadClass("aztech.modern_industrialization.util.GeometryHelper")
let $MIText = Java.loadClass("aztech.modern_industrialization.MIText")
let $TextHelper = Java.loadClass("aztech.modern_industrialization.util.TextHelper")
let $MIComponents = Java.loadClass("aztech.modern_industrialization.MIComponents")

let $Item = Java.loadClass("net.minecraft.world.item.Item")
let $IEDataComponents = Java.loadClass("blusunrize.immersiveengineering.common.register.IEDataComponents")
let $SimpleFluidContent = Java.loadClass("net.neoforged.neoforge.fluids.SimpleFluidContent")
let $FluidType = Java.loadClass("net.neoforged.neoforge.fluids.FluidType")
let $FluidUtil = Java.loadClass("net.neoforged.neoforge.fluids.FluidUtil")
let $IEItemFluidHandler = Java.loadClass("blusunrize.immersiveengineering.common.fluids.IEItemFluidHandler")
let $FluidHandler = Java.loadClass("net.neoforged.neoforge.capabilities.Capabilities$FluidHandler")
let $FluidAction = Java.loadClass("net.neoforged.neoforge.fluids.capability.IFluidHandler$FluidAction")
let $IEUtils = Java.loadClass("blusunrize.immersiveengineering.common.util.Utils")
let $InteractionResult = Java.loadClass("net.minecraft.world.InteractionResult")

let $JsonOps = Java.loadClass("com.mojang.serialization.JsonOps")



createNewJavaItem("clunky_drill", { tag: ["minecraft:pickaxes", "minecraft:shovels"] }, 
    () => new JavaAdapter($SteamDrillItem, {

        isHorizontal(stack){
            let component = stack.get($DataComponents.CUSTOM_DATA)
            if (!component) return false
            let compoundTag = component.copyTag()
            if (!compoundTag.contains("milf:isHorizontal")) return false
            return compoundTag.getBoolean("milf:isHorizontal")
        },

        appendHoverText(stack, context, tooltip, flag) {
            let data = this.getTooltipImage(stack).get()

            // Water %
            tooltip.add($MIText.WaterPercent.text(data.waterLevel()).setStyle($TextHelper.WATER_TEXT))
            let barWater = Math.ceil(data.waterLevel() / 5)
            let barVoid = 20 - barWater
            // Water bar
            tooltip.add(Component.literal("|".repeat(barWater)).setStyle($TextHelper.WATER_TEXT)
                .append(Component.literal("|".repeat(barVoid)).setStyle($Style.EMPTY["withColor(net.minecraft.network.chat.TextColor)"]($TextColor.fromRgb(0x6b6b6b)))))
            // Fuel left
            if (data.burnTicks() > 0) {
                tooltip.add($MIText.SecondsLeft.text((data.burnTicks() / 100).toFixed()).setStyle($TextHelper.GRAY_TEXT))
            }
            // 1x3 state
            tooltip.add($MIText.MiningArea
                .text((this.isActivated(stack) ? Text.of("1x3 ").append((this.isHorizontal(stack) ? Text.translatable("milf.clunky_drill.horizontal") : Text.translatable("milf.clunky_drill.vertical"))) : $MIText.MiningArea1x1.text()).setStyle($TextHelper.NUMBER_TEXT))
                .setStyle($TextHelper.GRAY_TEXT.withItalic(false)))
            // Silk touch
            tooltip.add($MIText.SilkTouchState
                .text((!stack["getOrDefault(net.minecraft.core.component.DataComponentType,java.lang.Object)"]($MIComponents.SILK_TOUCH, true) ? $MIText.Deactivated.text().setStyle($TextHelper.RED)
                    : $MIText.Activated.text().setStyle($TextHelper.GREEN)))
                .setStyle($TextHelper.GRAY_TEXT.withItalic(false)))
        },

        getArea(level, player, stack, rayTraceOnly) {

            let should3by1 = this.isActivated(stack) && !player.isShiftKeyDown()

            if (!should3by1) {
                return null
            }


            let rayTraceResult = this._rayTraceSimple(level, player, 0)

            if (rayTraceResult.getType() == $HitResult$Type.BLOCK) {
                let blockResult = rayTraceResult
                let facing = blockResult.direction
                let lookVec = player.getViewVector(0)
                return this._getArea(blockResult.getBlockPos(), facing, lookVec, stack)
            }
            return null

        },

        _getArea(pos, hitFace, lookVec, stack) {
            let faceIndex = hitFace.ordinal()
            let right = $GeometryHelper.FACE_RIGHT[faceIndex]
            let up = $GeometryHelper.FACE_UP[faceIndex]
            let isSideFace = hitFace.step().y() == 0
            if (isSideFace) {
                let side = this.isHorizontal(stack) ? right : up
                let rx = side.x(), ry = side.y(), rz = side.z()
                return new $SteamDrillItem.Area(pos, pos.offset(rx, ry, rz), pos.offset(-rx, -ry, -rz))
            }

            let dotRight = lookVec.x * right.x() + lookVec.y * right.y() + lookVec.z * right.z()
            let dotUp = lookVec.x * up.x() + lookVec.y * up.y() + lookVec.z * up.z()

            let dirX, dirY, dirZ
            if (this.isHorizontal(stack)) {
                if (Math.abs(dotRight) <= Math.abs(dotUp)) {
                    let sign = dotRight > 0 ? 1 : -1
                    dirX = sign * right.x()
                    dirY = sign * right.y()
                    dirZ = sign * right.z()
                } else {
                    let sign = dotUp > 0 ? 1 : -1
                    dirX = sign * up.x()
                    dirY = sign * up.y()
                    dirZ = sign * up.z()
                }
            } else {
                if (Math.abs(dotRight) >= Math.abs(dotUp)) {
                    let sign = dotRight > 0 ? 1 : -1
                    dirX = sign * right.x()
                    dirY = sign * right.y()
                    dirZ = sign * right.z()
                } else {
                    let sign = dotUp > 0 ? 1 : -1
                    dirX = sign * up.x()
                    dirY = sign * up.y()
                    dirZ = sign * up.z()
                }
            }


            return new $SteamDrillItem.Area(
                pos,
                pos.offset(dirX, dirY, dirZ),
                pos.offset(-dirX, -dirY, -dirZ)
            )
        },

        _rayTraceSimple(world, living, partialTicks) {
            let blockReachDistance = living.blockInteractionRange()
            let vec3d = living.getEyePosition(partialTicks)
            let vec3d1 = living.getViewVector(partialTicks)
            let vec3d2 = vec3d.add(vec3d1.x * blockReachDistance, vec3d1.y * blockReachDistance, vec3d1.z * blockReachDistance)
            return world.clip(new $ClipContext(vec3d, vec3d2, $ClipContext$Block.OUTLINE, $ClipContext$Fluid.NONE, living))
        }

    }, new $Item$Properties().stacksTo(1))
)

createNewJavaItem("big_bulky_drill", { tag: ["minecraft:pickaxes"] },
    () => new JavaAdapter($SteamDrillItem, {

        appendHoverText(stack, context, tooltip, flag) {
            let data = this.getTooltipImage(stack).get()

            // Water %
            tooltip.add($MIText.WaterPercent.text(data.waterLevel()).setStyle($TextHelper.WATER_TEXT))
            let barWater = Math.ceil(data.waterLevel() / 5)
            let barVoid = 20 - barWater
            // Water bar
            tooltip.add(Component.literal("|".repeat(barWater)).setStyle($TextHelper.WATER_TEXT)
                .append(Component.literal("|".repeat(barVoid)).setStyle($Style.EMPTY["withColor(net.minecraft.network.chat.TextColor)"]($TextColor.fromRgb(0x6b6b6b)))))
            // Fuel left
            if (data.burnTicks() > 0) {
                tooltip.add($MIText.SecondsLeft.text((data.burnTicks() / 100).toFixed()).setStyle($TextHelper.GRAY_TEXT))
            }
            // 1x3 state
            tooltip.add($MIText.MiningArea
                .text((this.isActivated(stack) ? Text.of("5x3 ") : $MIText.MiningArea1x1.text()).setStyle($TextHelper.NUMBER_TEXT))
                .setStyle($TextHelper.GRAY_TEXT.withItalic(false)))
            // Silk touch
            tooltip.add($MIText.SilkTouchState
                .text((!stack["getOrDefault(net.minecraft.core.component.DataComponentType,java.lang.Object)"]($MIComponents.SILK_TOUCH, true) ? $MIText.Deactivated.text().setStyle($TextHelper.RED)
                    : $MIText.Activated.text().setStyle($TextHelper.GREEN)))
                .setStyle($TextHelper.GRAY_TEXT.withItalic(false)))
            tooltip.add(Text.translatable("milf.big_bulky_drill.tooltip"))
        },

        getArea(level, player, stack, rayTraceOnly) {

            let should5by1 = this.isActivated(stack) && !player.isShiftKeyDown()

            if (!should5by1) {
                return null
            }


            let rayTraceResult = this._rayTraceSimple(level, player, 0)

            if (rayTraceResult.getType() == $HitResult$Type.BLOCK) {
                let blockResult = rayTraceResult
                let facing = blockResult.direction
                let lookVec = player.getViewVector(0)
                let area = this._getArea(blockResult.getBlockPos(), facing, lookVec)
                if (this.checkIfMineableInArea(level, area, player)) return area
                
            }
            return null

        },

        checkIfMineableInArea(world,  area,  miner){
            if (area == null) return true
            let areAllMineable = true
            let centerState = world.getBlockState(area.center())
            if (!this._isAreaMineableBlock(world, centerState, area.center())) {
                return false
            }
            BlockPos.betweenClosed(area.corner1(), area.corner2()).forEach(blockPos => {
                if(area.center().equals(blockPos)) {
                    return
                }

                let tempState = world.getBlockState(blockPos)
                if (!this._isAreaMineableBlock(world, tempState, blockPos)) {
                    //console.log(tempState);
                    areAllMineable = false
                }
            })

            return areAllMineable
        },

        _isAreaMineableBlock( level,  state,  pos) {
            return state.isAir() ||
                (state.is($BlockTags.MINEABLE_WITH_PICKAXE) && state.is($BlockTags.BASE_STONE_OVERWORLD)) &&
                state.getDestroySpeed(level, pos) > 0
        },

        _getArea(pos, hitFace, lookVec) {
            let faceIndex = hitFace.ordinal()
            let right = $GeometryHelper.FACE_RIGHT[faceIndex]
            let up = $GeometryHelper.FACE_UP[faceIndex]
            let isSideFace = hitFace.step().y() == 0
            if (isSideFace) {
                right = right.scale(2)
                let rx = right.x(), ry = right.y(), rz = right.z()
                let ux = up.x(), uy = up.y(), uz = up.z()
                return new $SteamDrillItem.Area(
                    pos, 
                    pos.offset(rx + ux, ry + uy, rz + uz), 
                    pos.offset(-rx - ux, -ry - uy, -rz - uz)
                )
            }

            let dotRight = lookVec.x * right.x() + lookVec.y * right.y() + lookVec.z * right.z()
            let dotUp = lookVec.x * up.x() + lookVec.y * up.y() + lookVec.z * up.z()

            if (Math.abs(dotRight) <= Math.abs(dotUp)) {
                right = right.scale(2)
            } else {
                up = up.scale(2)
            }

            let rSign = dotRight > 0 ? 1 : -1
            let uSign = dotUp > 0 ? 1 : -1
            let dirX = rSign * right.x() + uSign * up.x()
            let dirY = rSign * right.y() + uSign * up.y()
            let dirZ = rSign * right.z() + uSign * up.z()


            return new $SteamDrillItem.Area(
                pos,
                pos.offset(dirX, dirY, dirZ),
                pos.offset(-dirX, -dirY, -dirZ)
            )
        },

        _rayTraceSimple(world, living, partialTicks) {
            let blockReachDistance = living.blockInteractionRange()
            let vec3d = living.getEyePosition(partialTicks)
            let vec3d1 = living.getViewVector(partialTicks)
            let vec3d2 = vec3d.add(vec3d1.x * blockReachDistance, vec3d1.y * blockReachDistance, vec3d1.z * blockReachDistance)
            return world.clip(new $ClipContext(vec3d, vec3d2, $ClipContext$Block.OUTLINE, $ClipContext$Fluid.NONE, living))
        }

    }, new $Item$Properties().stacksTo(1))
)

createNewJavaItem("clay_bucket", {  },
    () => new JavaAdapter($Item, {

        appendHoverText(stack, context, tooltip, flag) {
            let fluidStack = $FluidUtil.getFluidContained(stack)

            fluidStack.ifPresent(fluidStack => tooltip.add($IEItemFluidHandler.fluidItemInfoFlavor(fluidStack, $FluidType.BUCKET_VOLUME)))
        },

        useOn(context){
            // let level = context.getLevel()
            // let blockPos = context.getClickedPos()
            // let stack = context.getItemInHand()

            // if (level.getCapability($FluidHandler.BLOCK, blockPos, null) == null){
            //     let fluidStack = stack["getOrDefault(net.minecraft.core.component.DataComponentType,java.lang.Object)"]($IEDataComponents.GENERIC_FLUID, $SimpleFluidContent.EMPTY).copy()

            //     if (!fluidStack.isEmpty() && $IEUtils.placeFluidBlock(level, blockPos.relative(context.getClickedFace()), fluidStack)){

            //         //cursed kjs bs

            //         let jsonStack = $SimpleFluidContent.CODEC.encodeStart($JsonOps.INSTANCE, $SimpleFluidContent.copyOf(fluidStack)).getOrThrow()

            //         //console.log(jsonStack)

            //         stack.set($IEDataComponents.GENERIC_FLUID, jsonStack)
            //         return $InteractionResult.SUCCESS
            //     }
            // }

            return $InteractionResult.PASS
        },

        hasCraftingRemainingItem(stack){
            return stack.has($IEDataComponents.JERRYCAN_DRAIN) || $FluidUtil.getFluidContained(stack).isPresent()
        },

        getCraftingRemainingItem(stack){
            if (stack.has($IEDataComponents.JERRYCAN_DRAIN)){
                let returnStack = stack.copy()
                let handler = $FluidUtil.getFluidHandler(returnStack).orElse(null)
                if(handler){
                    handler.drain(returnStack.get($IEDataComponents.JERRYCAN_DRAIN), $FluidAction.EXECUTE)
                    returnStack.remove($IEDataComponents.JERRYCAN_DRAIN)
                    return returnStack
                }
            } else if ($FluidUtil.getFluidContained(stack).isPresent()) {
                let returnStack = stack.copy()
                let handler = $FluidUtil.getFluidHandler(returnStack).orElse(null)
                if (handler) {
                    handler.drain($FluidType.BUCKET_VOLUME, $FluidAction.EXECUTE)
                    return returnStack
                }
            }
            return stack
        }

    }, new $Item$Properties().stacksTo(1))
)