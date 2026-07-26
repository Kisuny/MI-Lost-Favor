ItemEvents.firstRightClicked("milf:transmutation_orb", event => {
    if(!applyOrb(event,
        (item) => {
            let enchantmentsCount = item.enchantments.keySet().size()
            return enchantmentsCount < 2
        },
        (item) => { addRandomEnchantment(event, item) }
    )) { return }
})