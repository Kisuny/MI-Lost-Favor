ItemEvents.firstRightClicked("milf:orb_of_corruption", event => {
    if(!applyOrb(event,
        (item) => {
            let {enchantments} = getAllEnchantments(item)
            if(enchantments.length < 4 ){
                return false
            }
            if(enchantments.toString().includes("vanishing_curse")){
                return false
            }
            return true
        },
        (item) => { 
            addRandomEnchantment(event, item, -2, (id, enchantment) => {return (id.getPath() != "vanishing_curse" && enchantment.getMaxLevel() >= 3)})
            addRandomEnchantment(event, item, -1, (id) => {return id.getPath() == "vanishing_curse"})
        }
    )) { return }
})