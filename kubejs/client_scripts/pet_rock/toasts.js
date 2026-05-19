let $Toast = Java.loadClass("net.minecraft.client.gui.components.toasts.Toast")
let $TooltipRenderUtil = Platform.isClientEnvironment() ? Java.loadClass("net.minecraft.client.gui.screens.inventory.tooltip.TooltipRenderUtil") : null
let $ClientTooltipComponent = Platform.isClientEnvironment() ? Java.loadClass("net.minecraft.client.gui.screens.inventory.tooltip.ClientTooltipComponent") : null
let $Axis = Java.loadClass("com.mojang.math.Axis")

const PET_ROCK_NOTIF_LANG = [
    "milf.pet_rock.notification1",
    "milf.pet_rock.notification2",
    "milf.pet_rock.notification3",
    "milf.pet_rock.notification4",
    "milf.pet_rock.notification5",
]

NetworkEvents.dataReceived('pet_rock', (event) => {

    let isAny = true
    let font = Client.font

    if (event.data.ores == undefined){
        isAny = false
    }

    let randomNotificationIndex = Math.floor(Math.random() * PET_ROCK_NOTIF_LANG.length)

    let randomNotification = Component.translatable(PET_ROCK_NOTIF_LANG[randomNotificationIndex])

    
    //let maxWidth = mainTooltipComponent.getWidth(Client.font)
    let maxWidth = 200
    let clientTooltipComponents = []
    let componentToID = {}

    if (isAny) {
        let oresJS = {}
        event.data.ores.getAllKeys().forEach(key => {
            oresJS[key] = event.data.ores.getInt(key)
        })
        
        for (const [id, count] of Object.entries(oresJS)) {
            let componentToAdd = Component.translatable(Item.getItem(id).getDescriptionId())
            clientTooltipComponents.push(componentToAdd)
            componentToID[componentToAdd] = { id: id, count: count }
        }

        maxWidth = 0
        clientTooltipComponents.forEach(component => {
            const width = font.width(component)
            if (width > maxWidth) maxWidth = width
        })
    }


    const HEIGHT = $Toast.SLOT_HEIGHT - 8

    const TIME = 3500
    const SCALE = 1.5


    let animationTicks = 0

    let mainToast = new JavaAdapter($Toast, {
        render(guiGraphics, toastComponent, timePassed) {

            let mainTooltipComponent = $ClientTooltipComponent.create(randomNotification.visualOrderText)

            //guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)"](toastManager.getMinecraft().font, Component.ofString("TEST"), 30, 18, -1, false)
            let maxInt = 2 ** 32
            const pose = guiGraphics.pose()
            pose.pushPose()
            pose.translate(0, 20, 0)
            $TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 0, 200, HEIGHT, -400,
                // colors as ARGB **signed** integers
                // bg-top, bg-bottom, outline-top, outline-bottom
                0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)

            pose.pushPose()
            pose.translate(4, 0, 0)
            pose.scale(SCALE, SCALE, 1)
            pose.translate(8, 8, 142 + 8)
            pose.mulPose($Axis.YP.rotation(easeInOutCubic(timePassed / TIME) * Math.PI * 2))
            pose.translate(-8, -8, -142 - 8)
            
            guiGraphics.renderFakeItem(Item.of("milf:pet_rock_on_a_leash"), 0, 0)
            pose.popPose()

            pose.pushPose()
            pose.translate(20 * SCALE, 0, 0)
            mainTooltipComponent.renderText(Client.font, 0, 8, pose.last().pose(), guiGraphics.bufferSource())
            pose.popPose()

            //mainTooltipComponent.getWidth(Client.font) + 4


            pose.popPose()
            if (timePassed >= TIME) {
                return $Toast.Visibility.HIDE
            }
            return $Toast.Visibility.SHOW

        }

    })

    Client.getToasts().addToast(mainToast)
    const MAX_TICKS = 45
    const MIN_TICKS = 30

    clientTooltipComponents.forEach(component =>{
        let randomDelay = Math.floor(Math.random() * (MAX_TICKS - MIN_TICKS + 1)) + MIN_TICKS

        let toast = new JavaAdapter($Toast, {
            render(guiGraphics, toastComponent, timePassed) {

                //guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)"](toastManager.getMinecraft().font, Component.ofString("TEST"), 30, 18, -1, false)
                let maxInt = 2 ** 32
                const pose = guiGraphics.pose()
                pose.pushPose()
                pose.translate(0, 20, 0)
                $TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 0, maxWidth + 20 * SCALE + 2, HEIGHT, -400,
                    // colors as ARGB **signed** integers
                    // bg-top, bg-bottom, outline-top, outline-bottom
                    0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)

                pose.pushPose()
                pose.scale(SCALE, SCALE, 1)
                let oreItem = Item.of(componentToID[component].id)
                guiGraphics.renderFakeItem(oreItem, 0, 0)
                guiGraphics.renderItemDecorations(Client.font, oreItem, 0, 0, String(componentToID[component].count))
                pose.popPose()

                pose.pushPose()
                let wrappedLines = font.split(component, 120)
                let addSpace = 0
                switch (wrappedLines.size()) {
                    case 1:
                        addSpace = 8
                        break;
                    case 2:
                        addSpace = 4
                        break;
                    default:
                        addSpace = 0
                        break;
                }
                let lineIndex = 0
                wrappedLines.forEach(line =>{
                    guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.util.FormattedCharSequence,float,float,int,boolean)"](font, line, 20 * SCALE, addSpace + lineIndex * 8, 0xFFFFFF, true)
                    lineIndex++
                })
                //component.renderText(Client.font, 20 * SCALE, 8, pose.last().pose(), guiGraphics.bufferSource())
                pose.popPose()
                pose.popPose()

                if (timePassed >= TIME - (randomDelay / 20) * 1000) {
                    return $Toast.Visibility.HIDE
                }
                return $Toast.Visibility.SHOW
            }

        })

        Client.scheduleInTicks(randomDelay, e =>{
            Client.getToasts().addToast(toast)
        })
    })

    if(!isAny){

        let failNotification = Component.translatable(PET_ROCK_NOTIF_LANG[randomNotificationIndex] + ".f")

        let failToast = new JavaAdapter($Toast, {
            render(guiGraphics, toastComponent, timePassed) {

                let mainTooltipComponent = $ClientTooltipComponent.create(failNotification.visualOrderText)

                //guiGraphics["drawString(net.minecraft.client.gui.Font,net.minecraft.network.chat.Component,int,int,int,boolean)"](toastManager.getMinecraft().font, Component.ofString("TEST"), 30, 18, -1, false)
                let maxInt = 2 ** 32
                const pose = guiGraphics.pose()
                pose.pushPose()
                pose.translate(0, 20, 0)
                $TooltipRenderUtil.renderTooltipBackground(guiGraphics, 0, 0, mainTooltipComponent.getWidth(Client.font) + 20 * SCALE * 2, HEIGHT, -400,
                    // colors as ARGB **signed** integers
                    // bg-top, bg-bottom, outline-top, outline-bottom
                    0xaf202020 - maxInt, 0xaf202020 - maxInt, 0x6f8f8f8f, 0x5f575757)

                pose.pushPose()
                pose.translate(20 * SCALE, 0, 0)
                mainTooltipComponent.renderText(Client.font, 0, 8, pose.last().pose(), guiGraphics.bufferSource())
                pose.popPose()

                //mainTooltipComponent.getWidth(Client.font) + 4


                pose.popPose()
                if (timePassed >= TIME - (MAX_TICKS / 20) * 1000) {
                    return $Toast.Visibility.HIDE
                }
                return $Toast.Visibility.SHOW

            }

        })
        Client.scheduleInTicks(MAX_TICKS, e => {
            Client.getToasts().addToast(failToast)
        })
    }

})
