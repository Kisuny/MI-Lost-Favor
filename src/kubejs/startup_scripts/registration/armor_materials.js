StartupEvents.registry('armor_material', event => {

    event.create("milf:egg")
    .defense({
        helmet: 3,
        chestplate: 1,
        leggings: 1,
        boots: 1
    })
        .enchantmentValue(24)
        .repairIngredient(() => Ingredient.of("milf:saeta_plush"))
        .toughness(2)
        .knockbackResistance(0.15)

})