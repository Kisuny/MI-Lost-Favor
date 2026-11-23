const renderPocketLamp = ctx => {
    let pose = ctx.matrixStack
    let body = ctx.renderLayerParent.getModel().body
    let step = ctx.limbSwing * 0.6662
    let swingX = Math.sin(step - 0.6) * ctx.limbSwingAmount * 0.3 + Math.sin(ctx.ageInTicks * 0.06) * 0.03
    let swingZ = Math.sin(step * 2 - 1.2) * ctx.limbSwingAmount * 0.04

    pose.pushPose()
    body.translateAndRotate(pose)
    pose.translate(0.26, 0.72, -0.03)
    pose.mulPose($Axis.XP.rotation(swingX - body.xRot))
    pose.mulPose($Axis.ZP.rotation(swingZ - 0.14))
    pose.mulPose($Axis.ZP.rotationDegrees(180))

    pose.pushPose()
    pose.scale(0.3, 0.14, 0.3)
    pose.translate(-0.5, -1, -0.5)
    Client.blockRenderer.renderSingleBlock(Blocks.CHAIN.defaultBlockState(), pose, ctx.renderTypeBuffer, ctx.light, $OverlayTexture.NO_OVERLAY)
    pose.popPose()

    pose.translate(0, -0.12, 0)
    pose.scale(0.3, 0.3, 0.3)
    pose.translate(-0.5, -0.6875, -0.5)
    Client.blockRenderer.renderSingleBlock(ctx.stack.item.block.defaultBlockState(), pose, ctx.renderTypeBuffer, $LightTexture.FULL_BRIGHT, $OverlayTexture.NO_OVERLAY)
    pose.popPose()
}

CuriosJSEvents.registerRenderer(event => {
    global.pocketLamps.forEach(id => event.register(Item.of(id).item, renderPocketLamp))
})
