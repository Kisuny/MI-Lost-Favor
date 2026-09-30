ItemEvents.firstRightClicked("milf:orb_of_regret", event => {

    let {enchantments, enchantmentsCount, randomEnchantment} = getAllEnchantments(event.player.getOffHandItem())

    if(!applyOrb(event,
        () => { return enchantmentsCount >= 4 },
        (item) => {
            item.enchantments.enchantments.clear()
            orbChangesMessage(event)
            event.player.tell(Text.of(``).append(randomEnchantment.value().description()).append(Text.translatable("milf.orbcraft.absorbed")))
            item.enchantments.enchantments["put(java.lang.Object,int)"](randomEnchantment, randomEnchantment.value().getMaxLevel())

        }
    )) { return }

})