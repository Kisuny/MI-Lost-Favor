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



})