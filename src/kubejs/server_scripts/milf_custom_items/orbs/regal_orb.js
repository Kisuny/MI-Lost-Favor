ItemEvents.firstRightClicked("milf:regal_orb", event => {
    if(!applyOrb(event,
        (item) => {
            let enchantmentsCount = item.enchantments.keySet().size()
            return( enchantmentsCount >= 2 && enchantmentsCount < 4)
        },
        (item) => { addRandomEnchantment(event, item) }
    )) { return }
})