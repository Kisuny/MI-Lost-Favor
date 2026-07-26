ItemEvents.firstRightClicked("milf:orb_of_alchemy", event => {
    if(!applyOrb(event,
        (item) => {
            let enchantmentsCount = item.enchantments.keySet().size()
            return (enchantmentsCount <= 4 && enchantmentsCount != 0) || event.player.getMainHandItem().enchantments.keySet().size() != 0
        },
        (/**@type { import("net.minecraft.world.item.ItemStack").$ItemStack$$Original}*/ item) => { 
            let orb = event.player.getMainHandItem()
            let orbCopy = orb.copy()
            orbCopy.setCount(1)
            let orbEnchantmentsMap = getAllEnchantments(orbCopy).enchantmentsMap
            if(orbEnchantmentsMap.size == 0){
                let {enchantmentsMap} = getAllEnchantments(item)
                enchantmentsMap.forEach((level, enchantment) => {
                    orbCopy.enchant(enchantment, level)
                })
                event.player.addItem(orbCopy)
                item.count--
            } else {
                item.enchantments.enchantments.clear()
                orbEnchantmentsMap.forEach((level, enchantment) => {
                    item.enchant(enchantment, level)
                })
            }

        }
    )) { return }
})