function lerp(previous, current){
    return previous + (current - previous) * Client.getTimer().getGameTimeDeltaPartialTick(false)
}

let $Vector4f = Java.loadClass("org.joml.Vector4f")

function projectPosToScreen(pos, gameRenderer, deltaTracker, guiScale) {

    let window = gameRenderer.minecraft.window

    let viewport = [0, 0, window.getWidth(), window.getHeight()]

    let modelViewMatrix = new $Matrix4f()

    let camera = gameRenderer.mainCamera
    modelViewMatrix.rotateX(camera.getXRot() * (Math.PI / 180))
    modelViewMatrix.rotateY((camera.getYRot() + 180) * (Math.PI / 180))

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
    if (guiScale) {
        screenX /= guiScale
        screenY /= guiScale
    }

    return { x: screenX, y: screenY }

}

function getRandomBetween(min, max){
    return Math.random() * (max - min) + min
}

function getPosCompound(pos){
    let posData = new $CompoundTag()
    
    posData.putDouble("x", pos.x)
    posData.putDouble("y", pos.y)
    posData.putDouble("z", pos.z)

    return posData
}
