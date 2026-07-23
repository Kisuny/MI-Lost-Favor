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

ItemEvents.dynamicTooltips("milf:soul_of_the_helpless_tooltip", event => {

    let player = Client.player
    if (!player) return

    let gold = $EnigmaticHandler.isTheCursedOne(player)

    event.lines.add(1, gold
        ? Text.translatable("tooltip.enigmaticlegacy.cursedOnesOnly1").gold()
        : Text.translatable("tooltip.enigmaticlegacy.cursedOnesOnly1").darkRed())
    event.lines.add(2, gold
        ? Text.translatable("tooltip.enigmaticlegacy.cursedOnesOnly2").gold()
        : Text.translatable("tooltip.enigmaticlegacy.cursedOnesOnly2").darkRed())

})
