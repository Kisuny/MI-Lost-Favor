//priority: 1000
let $TooltipRenderUtil = Platform.isClientEnvironment() ? Java.loadClass("net.minecraft.client.gui.screens.inventory.tooltip.TooltipRenderUtil") : null
let $ClientTooltipComponent = Platform.isClientEnvironment() ? Java.loadClass("net.minecraft.client.gui.screens.inventory.tooltip.ClientTooltipComponent") : null
let $DefaultTooltipPositioner = Platform.isClientEnvironment() ? Java.loadClass("net.minecraft.client.gui.screens.inventory.tooltip.DefaultTooltipPositioner").INSTANCE : null

let $Quaternionf = Platform.isClientEnvironment() ? Java.loadClass("org.joml.Quaternionf") : null
let $DataComponents = Java.loadClass("net.minecraft.core.component.DataComponents")
let $StringTag = Java.loadClass("net.minecraft.nbt.StringTag")
let $ListTag = Java.loadClass("net.minecraft.nbt.ListTag")
let $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag")


let $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
let $RegisterGuiLayersEvent = Java.loadClass("net.neoforged.neoforge.client.event.RegisterGuiLayersEvent")
let $HitResult$Type = Java.loadClass("net.minecraft.world.phys.HitResult$Type")

let $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
let $DeferredRegister  = Java.loadClass("net.neoforged.neoforge.registries.DeferredRegister")

const maxInt = 2 ** 32


/**
 * @param {$Vector3f_} pos
 * @param {$GameRenderer_} gameRenderer
 * @param {$DeltaTracker_} deltaTracker
 */

function projectPosToScreen(pos, gameRenderer, deltaTracker, guiScale){

    let window = gameRenderer.minecraft.window

    let viewport = [0, 0, window.getWidth(), window.getHeight()]

    let modelViewMatrix = new $Matrix4f()

    let camera = gameRenderer.mainCamera
    modelViewMatrix.rotateX( camera.getXRot() * (Math.PI / 180))
    modelViewMatrix.rotateY( (camera.getYRot() + 180) * (Math.PI / 180))

    modelViewMatrix.translate(
        -camera.getPosition().x,
        -camera.getPosition().y,
        -camera.getPosition().z
    )

    let projectionMatrix = gameRenderer.getProjectionMatrix(
        gameRenderer.getFov(camera, deltaTracker.getGameTimeDeltaPartialTick(true), true)
    )

    const clip = new $Vector4f(pos.x, pos.y, pos.z, 1.0)
    clip.mul(modelViewMatrix)
    clip.mul(projectionMatrix)
    if (clip.w() <= 0.0) return null;
    const normalizedX = clip.x() / clip.w()
    const normalizedY = clip.y() / clip.w()
    let screenX = (normalizedX * 0.5 + 0.5) * viewport[2] + viewport[0]
    let screenY = (normalizedY * 0.5 + 0.5) * viewport[3] + viewport[1]
    screenY = viewport[3] - screenY
    if(guiScale){
        screenX /= guiScale
        screenY /= guiScale
    }

    return { x: screenX, y: screenY }

}

function toPolar(point1, point2){
    let dx = point1.x - point2.x
    let dy = point1.y - point2.y

    let length = Math.sqrt(dx * dx + dy * dy)
    let angle = Math.atan2(dy, dx)

    return {length:length , angle:angle}
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}