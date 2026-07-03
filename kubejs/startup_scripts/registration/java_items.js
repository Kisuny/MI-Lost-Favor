let $Item$Properties = Java.loadClass("net.minecraft.world.item.Item$Properties")
let $ClipContext = Java.loadClass("net.minecraft.world.level.ClipContext")
let $ClipContext$Block = Java.loadClass("net.minecraft.world.level.ClipContext$Block")
let $ClipContext$Fluid = Java.loadClass("net.minecraft.world.level.ClipContext$Fluid")
let $Direction = Java.loadClass("net.minecraft.core.Direction")
let $Style = Java.loadClass("net.minecraft.network.chat.Style")
let $TextColor = Java.loadClass("net.minecraft.network.chat.TextColor")

let $SteamDrillItem = Java.loadClass("aztech.modern_industrialization.items.SteamDrillItem")
let $GeometryHelper = Java.loadClass("aztech.modern_industrialization.util.GeometryHelper")
let $MIText = Java.loadClass("aztech.modern_industrialization.MIText")
let $TextHelper = Java.loadClass("aztech.modern_industrialization.util.TextHelper")
let $MIComponents = Java.loadClass("aztech.modern_industrialization.MIComponents")


StartupEvents.registry('item', event => {

    let CLUNKY_DRILL_ID = "milf:clunky_drill"

    let builder = event.createCustom(CLUNKY_DRILL_ID, () => {
        return new JavaAdapter($SteamDrillItem, {

            isHorizontal: true,

            changeMode(){
                this.isHorizontal = !this.isHorizontal
            },

            appendHoverText( stack, context,  tooltip,  flag) {
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
                    .text((this.isActivated(stack) ? Text.of("1x3 ").append((this.isHorizontal ? Text.translatable("milf.clunky_drill.horizontal") : Text.translatable("milf.clunky_drill.vertical"))) : $MIText.MiningArea1x1.text()).setStyle($TextHelper.NUMBER_TEXT))
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
                    return this._getArea(blockResult.getBlockPos(), facing, lookVec)
                }
                return null

            },

            _getArea(pos, hitFace, lookVec){
                let faceIndex = hitFace.ordinal()
                let right = $GeometryHelper.FACE_RIGHT[faceIndex]
                let up = $GeometryHelper.FACE_UP[faceIndex]
                let isSideFace = hitFace.step().y() == 0
                if (isSideFace) {
                    let side = this.isHorizontal ? right : up
                    let rx = side.x(), ry = side.y(), rz = side.z()
                    return new $SteamDrillItem.Area(pos, pos.offset(rx, ry, rz), pos.offset(-rx, -ry, -rz))
                }

                let dotRight = lookVec.x * right.x() + lookVec.y * right.y() + lookVec.z * right.z()
                let dotUp = lookVec.x * up.x() + lookVec.y * up.y() + lookVec.z * up.z()

                let dirX, dirY, dirZ
                if (this.isHorizontal){
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

            _rayTraceSimple( world,  living,  partialTicks) {
                let blockReachDistance = living.blockInteractionRange()
                let vec3d = living.getEyePosition(partialTicks)
                let vec3d1 = living.getViewVector(partialTicks)
                let vec3d2 = vec3d.add(vec3d1.x * blockReachDistance, vec3d1.y * blockReachDistance, vec3d1.z * blockReachDistance)
                return world.clip(new $ClipContext(vec3d, vec3d2, $ClipContext$Block.OUTLINE, $ClipContext$Fluid.NONE, living))
            }

        }, new $Item$Properties().stacksTo(1))
    })

    let args = { 
        tag: ["minecraft:pickaxes", "minecraft:shovels"]
    }

    addLang(builder, CLUNKY_DRILL_ID, args)
    itemBuilder(builder, args)

})

