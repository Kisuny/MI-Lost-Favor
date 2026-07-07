ItemEvents.dynamicTooltips("milf:cursed_ring_tooltip", event => {

    let { item } = event
    if(!item) return
    let player = Client.player
    if (!player) return
    if(!event.shift) return

    event.add(Component.translatable("tooltip.enigmaticlegacy.worthyOnesOnly4")
    ["withStyle(net.minecraft.ChatFormatting)"]($EnigmaticHandler.isTheWorthyOne(Client.player) ? $ChatFormatting.GOLD : $ChatFormatting.DARK_RED)
        .append(Component.literal(" "))
        .append(Component.literal($EnigmaticHandler.getSufferingTime(Client.player))
        ["withStyle(net.minecraft.ChatFormatting)"]($ChatFormatting.LIGHT_PURPLE))

    )

    let data = player.getData($EnigmaticAttachments.ENIGMATIC_DATA)

    let timeWithRing = data.getTimeWithCurses()
    let timeWithoutRing = data.getTimeWithoutCurses()
    let totalTime = timeWithRing + timeWithoutRing

    const targetFraction = 0.995

    let neededTicks = (targetFraction * totalTime - timeWithRing) / (1 - targetFraction)

    if (neededTicks < 0) {
        event.add(Text.translatable("milf.cursed_one"))
        return
    }

    let totalSeconds = Math.ceil(neededTicks / 20)
    let hours = Math.floor(totalSeconds / 3600).toFixed()
    let minutes = Math.floor((totalSeconds % 3600) / 60)
    let mm = String(minutes).padStart(2, '0')
    
    let text = Text.translatable("milf.cursed_ring_tooltip.remaining", hours, mm)

    event.add(text.getString())

})
