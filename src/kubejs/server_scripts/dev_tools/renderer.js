if(Platform.isClientEnvironment()){
    NativeEvents.onEvent("net.neoforged.neoforge.client.event.RenderLevelStageEvent", event => {
        if (nbtPenModeState == 0 && devPenState == 0) return
        let $Stage = Java.loadClass("net.neoforged.neoforge.client.event.RenderLevelStageEvent$Stage")
        if (event.getStage() == $Stage.AFTER_TRIPWIRE_BLOCKS) {
            let $RenderType = Java.loadClass("net.minecraft.client.renderer.RenderType")
            let camera = Client.gameRenderer.getMainCamera().getPosition()
            let posestack = event.getPoseStack()
            posestack.pushPose()
            posestack.translate(-camera.x(), -camera.y(), -camera.z())
            if (nbtPenModeState != 0) {
                let vertexConsumer1 = Client.renderBuffers().bufferSource().getBuffer($RenderType.lines())
                event.levelRenderer.renderLineBox(posestack, vertexConsumer1, nbtPenAabb, 0.2, 1, 0.5, 100)
            }
            if (devPenState != 0) {
                let vertexConsumer2 = Client.renderBuffers().bufferSource().getBuffer($RenderType.lines())
                event.levelRenderer.renderLineBox(posestack, vertexConsumer2, devPenAABB, 1, 0.2, 0.2, 100)
            }
            posestack.popPose()
        }
    })
}