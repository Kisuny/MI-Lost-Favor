ItemEvents.firstRightClicked("milf:orb_of_chance", event => {
    
    let {enchantments, totalLVL, randomEnchantment} = getAllEnchantmentsWithCondition(event.player.getOffHandItem(), (enchantment, level) => {return level >= 3 && level < (enchantment.value().getMaxLevel() + 2)})

    if(!applyOrb(event,
        () => { return totalLVL >= 10 },
        (item) => {
            if(randomEnchantment == undefined){
                sendImmersiveMessage(Text.translatable("milf.orbcraft.error.no_valid"), event.player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
                return false
            }
            let chanceToSucceed = getExponentialSuccessChance(item.enchantments.enchantments.size(), 4, 0.5, 2)
            if(Math.random() < chanceToSucceed){
                orbChangesMessage(event)
                event.player.tell(Text.translatable("milf.orbcraft.overenchantment"))
                item.enchantments.enchantments["put(java.lang.Object,int)"](randomEnchantment, randomEnchantment.value().getMaxLevel() + 2)
            } else {
                event.player.tell(Text.translatable("milf.orbcraft.destroyed"))
                item.count--
            }
        }
    )) { return }
})