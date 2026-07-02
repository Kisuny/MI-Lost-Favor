ItemEvents.toolTierRegistry(event => {
    event.add('flint', tier => {
        tier.setEnchantmentValue(15)
        tier.setAttackDamageBonus(2)
        tier.setSpeed(5)
        tier.setUses(193)
        tier.setIncorrectBlocksForDropsTag( "minecraft:incorrect_for_iron_tool")
        tier.repairIngredient = Ingredient.of("minecraft:flint")
    })
})