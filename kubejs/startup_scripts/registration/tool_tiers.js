ItemEvents.toolTierRegistry(event => {
    event.add('flint', tier => {
        tier.setEnchantmentValue(15)
        tier.setAttackDamageBonus(2)
        tier.setSpeed(5)
        tier.setUses(193)
        tier.setIncorrectBlocksForDropsTag( "minecraft:incorrect_for_iron_tool")
        tier.repairIngredient = Ingredient.of("minecraft:flint")
    })

    event.add('s_silver', tier => {
        tier.setEnchantmentValue(25)
        tier.setUses(4725)
        tier.repairIngredient = Ingredient.of("modern_industrialization:silver_ingot")
    })
})