
let $NbtUtils = Java.loadClass("net.minecraft.nbt.NbtUtils")

let rockScanTicks = 0
let isScanned = false
let depositsToRender = {}
let petRockScanScale = 0.75
let visitedDepositsSet = null
let playerPosForDepositsScan = new BlockPos(0,0,0)
let currentScanDistanceSqr = 0

NetworkEvents.dataReceived('milf_pet_rock_deposits_scan', (event) => {

    let data = event.data
    let positions = data.getCompound("depositPositions")

    let oreIds = positions.getAllKeys()

    depositsToRender = {}

    oreIds.forEach(oreId => {
        let blockPosTag = positions.getList(oreId, $Tag.TAG_INT_ARRAY)

        let posArray = []

        blockPosTag.forEach(tag => {
            let tempCompound = new $CompoundTag()
            tempCompound.putIntArray("pos", tag)
            $NbtUtils.readBlockPos(tempCompound, "pos").ifPresent(pos => posArray.push(pos))

        })

        depositsToRender[oreId] = posArray

        //depositsToRender = posArray

    })

    if (Object.keys(depositsToRender).length > 0){
        isScanned = true
        rockScanTicks = 300
        visitedDepositsSet = new $HashSet()
        playerPosForDepositsScan = event.player.blockPosition()
        currentScanDistanceSqr = 0
    }    

})

ClientEvents.tick(event => {
    if (isScanned){
        let elapsedTicks = 300 - rockScanTicks
        let scanProgress = Math.min(1, elapsedTicks / 50)
        currentScanDistanceSqr = Math.min(250000, Math.pow(500 * scanProgress, 2)) 
        rockScanTicks--
        if (rockScanTicks <= 0){
            isScanned = false
        }
    }
})

NativeEvents.onEvent("net.neoforged.neoforge.client.event.RenderGuiLayerEvent$Post", event => {
    if (event.getName().equals($VanillaGuiLayers.CROSSHAIR)) {
        if (Client.options.hideGui) return

        if (!isScanned) return

        renderDepositMarkers(event.getGuiGraphics(), event.getPartialTick())
    }

})

function renderDepositMarkers(guiGraphics, deltaTracker){
    try {
        let pose = guiGraphics.pose()

        for(let [oreId, positions] of Object.entries(depositsToRender)){
            for (let blockPos of positions) {

                if (visitedDepositsSet && !visitedDepositsSet.contains(blockPos) && playerPosForDepositsScan.distSqr(blockPos) <= currentScanDistanceSqr){

                    visitedDepositsSet.add(blockPos)

                    let soundPitch = Math.min(1.4, 0.8 + visitedDepositsSet.size() * 0.05)
                    let soundRelativeToWorldVector = blockPos.getCenter().subtract(playerPosForDepositsScan.getCenter()).normalize().scale(3)

                    let cameraRotation = Client.gameRenderer.getMainCamera().rotation().conjugate()

                    let soundRelativeToPlayerVector = soundRelativeToWorldVector.toVector3f().rotate(cameraRotation)
                    //console.log(soundRelativeToPlayerVector);
                    

                    milfPlayGUISound("minecraft:entity.item.pickup", { pitch: soundPitch, pos: { pos: soundRelativeToPlayerVector , isRelative:true} })
                    
                }

                if (!visitedDepositsSet.contains(blockPos)) continue

                let screenCoordinates = projectPosToScreen(blockPos, Client.gameRenderer, deltaTracker, Client.window.getGuiScale())
                if (screenCoordinates) {

                    pose.pushPose()

                    let item = Item.of(oreId)
                    pose.translate(screenCoordinates.x, screenCoordinates.y, -400)
                    $TooltipRenderUtil.renderTooltipBackground(guiGraphics, -10, -10, 20, 20, 0,
                        0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)
                    guiGraphics.renderFakeItem(item, -8, -8)

                    pose.pushPose()

                    pose.translate(6,6,0)
                    pose.scale(petRockScanScale, petRockScanScale, 1)

                    guiGraphics.renderFakeItem(Item.of("milf:stone_nose"), -8 * (1 / petRockScanScale), -8 * (1 / petRockScanScale))
                    
                    pose.popPose()

                    if (isInTheCenterOfScreen(screenCoordinates, 16)){
                        pose.translate(0, 17, 0)
                        let distanceToDeposit = Client.player.position().distanceTo(blockPos.center)
                        let distanceString = distanceToDeposit.toFixed(1) + "m"
                        pose.translate(0, -0.5, 0)
                        let distanceStringWidth = Client.font.width(distanceString)
                        $TooltipRenderUtil.renderTooltipBackground(guiGraphics, -distanceStringWidth/2, 0, distanceStringWidth, 7, 0,
                            0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)
                        guiGraphics["drawCenteredString(net.minecraft.client.gui.Font,java.lang.String,int,int,int)"](Client.font, distanceString, 0, 0, 0xFFFFFF)
                    }

                    pose.popPose()
                    
                }

            }
        }

        
    } catch (error) {
        console.log(error);
        
    }

    function isInTheCenterOfScreen(screenCoordinates, threshold){
        let centerX = Client.window.getGuiScaledWidth() / 2
        let centerY = Client.window.getGuiScaledHeight() / 2
        let dx = screenCoordinates.x - centerX
        let dy = screenCoordinates.y - centerY
        return (dx * dx + dy * dy) < (threshold * threshold)
    }

}
