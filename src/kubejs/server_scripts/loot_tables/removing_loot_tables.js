LootJS.modifiers(event => {
    const remove_loot_tables = [
        "immersiveengineering:chests/engineers_house",
        "immersiveengineering:gameplay/hero_of_the_village/machinist",
        "immersiveengineering:gameplay/hero_of_the_village/engineer",
        "immersiveengineering:gameplay/hero_of_the_village/electrician",
        "immersiveengineering:gameplay/hero_of_the_village/gunsmith",
        "immersiveengineering:gameplay/hero_of_the_village/outfitter",
        "ae2:gameplay/hero_of_the_village/fluix_researcher_gifts",
        "modern_industrialization:gameplay/hero_of_the_village/industrialist_gift",
        "hexerei:chests/courier_package",
    ]

    remove_loot_tables.forEach(table => {
        event.addTableModifier(table).removeLoot(Ingredient.all)
    });
})