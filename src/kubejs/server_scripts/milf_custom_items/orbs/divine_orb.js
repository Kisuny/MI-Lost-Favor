ItemEvents.firstRightClicked("milf:divine_orb", event => {
    if(!applyOrb(event,
        (item) => {
            let enchantmentsCount = item.enchantments.keySet().size()
            return enchantmentsCount >= 1
        },
        (item) => { 
            let changes = []
            let {enchantmentsMap} = getAllEnchantmentsWithCondition(item, (enchantment, level) => {
                let enchantmentRegistry = event.server.registryAccess().registryOrThrow(ENCHANTMENT_REGISTRY_KEY)
                return level < (enchantment.value().getMaxLevel() + 2) && !ORBCRAFT_CURSES.includes(getEnchantmentIdFromRegistry(enchantmentRegistry, enchantment.value()).getPath())
            })
            if(enchantmentsMap.size == 0) {
                sendImmersiveMessage(Text.translatable("milf.orbcraft.error.no_valid"), event.player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
                return false
            }
            enchantmentsMap.forEach((level, enchantment) => {
                /**@type {import("net.minecraft.world.item.enchantment.Enchantment").$Enchantment$$Original}*/ let actualEnchantment = enchantment.value()
                let maxLVL = actualEnchantment.getMaxLevel()
                let roll = Math.random() < 0.5 ? -1 : 1
                let newLVL = level + roll
                if(newLVL <= 0){
                    item.enchantments.enchantments.remove(enchantment)
                    changes.push(Text.of(``).append(actualEnchantment.description()).append(Text.translatable("milf.orbcraft.removed")))
                } else if (newLVL > maxLVL) {
                    changes.push(Text.of(``).append(actualEnchantment.description()).append(Text.translatable("milf.orbcraft.maxed")))
                } else {
                    item.enchantments.enchantments["put(java.lang.Object,int)"](enchantment, newLVL)
                    if(roll == 1) {
                        changes.push(Text.of(``).append(actualEnchantment.description()).append(Text.of(`: ${level} -> ${textAnimatorString(newLVL, "grad", {from:"#55E408", to:"#D3FFAA", f:0.5})}`)))
                    } else {
                        changes.push(Text.of(``).append(actualEnchantment.description()).append(Text.of(`: ${level} -> ${textAnimatorString(newLVL, "grad", {from:"#E40808", to:"#FFAAAA", f:0.5})}`)))
                    }
                }
            })

            orbChangesMessage(event)
            changes.forEach(change =>{
                event.player.tell(change)
            })
        }
    )) { return }
})