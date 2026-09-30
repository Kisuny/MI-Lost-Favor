ItemEvents.firstRightClicked("milf:orb_of_annulment", event => {
    if(!applyOrb(event,
        (item) => {
            let enchantmentsCount = item.enchantments.keySet().size()
            return enchantmentsCount >= 1
        },
        (item) => { removeRandomEnchantment(event, item) }
    )) { return }
})