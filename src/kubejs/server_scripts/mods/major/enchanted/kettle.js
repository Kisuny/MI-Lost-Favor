const customKettleCraft = (event, args) => {
  const cookColour = args.cookColour || args.cook_colour || "000000";
  const finalColour = args.finalColour || args.final_colour || "ffffff";
  const ingredients = Array.isArray(args.ingredients) ? args.ingredients : [];
  const result = args.result || { id: "", count: 1 };

  event.custom({
    type: "enchanted:kettle",
    cook_colour: cookColour,
    final_colour: finalColour,
    ingredients: ingredients,
    power: args.power || 0,
    requires_bottle: args.requiresBottle || false,
    result: {
      id: result.id,
      count: result.count ?? 1
    }
  });

  if (args.removeRecipe) {
    event.remove({ output: result.id });
  }
};


ServerEvents.recipes(event => {
  customKettleCraft(event, {
    cookColour: "706615",
    finalColour: "DBC72A",
    power: 3000,
    requiresBottle: true,
    removeRecipe: true,
    ingredients: [
      { id: "enchanted:redstone_soup", count: 1 },
      {
        id: "minecraft:potion",
        count: 1,
        components: { "minecraft:potion_contents": { potion: "minecraft:long_swiftness" } }
      },
      { id: "embers:ember_crystal_cluster", count: 1 },
      { id: "minecraft:feather", count: 1 },
      { id: "enchanted:wool_of_bat", count: 1 },
      { id: "enchanted:belladonna_flower", count: 1 }
    ],
    result: { id: "enchanted:flying_ointment", count: 1 }
  });

  customKettleCraft(event, {
    cookColour: "594000",
    finalColour: "C29B00",
    power: 3000,
    removeRecipe: true,
    ingredients: [
      { id: "enchanted:mandrake_root", count: 1 },
      { id: "devices:gold_coin", count: 1 },
      { id: "enchanted:ritual_chalk", count: 1 }
    ],
    result: { id: "enchanted:golden_chalk", count: 1 }
  });

  customKettleCraft(event, {
    cookColour: "183016",
    finalColour: "1C5E16",
    power: 3000,
    requiresBottle: true,
    removeRecipe: true,
    ingredients: [
      { id: "enchanted:redstone_soup", count: 1 },
      {
        id: "minecraft:potion",
        count: 1,
        components: { "minecraft:potion_contents": { potion: "minecraft:strong_strength" } }
      },
      { id: "embers:ember_crystal_cluster", count: 1 },
      { id: "enchanted:rowan_sapling", count: 1 },
      { id: "enchanted:creeper_heart", count: 1 },
      { id: "enchanted:demonic_blood", count: 1 }
    ],
    result: { id: "enchanted:mystic_unguent", count: 1 }
  });
})