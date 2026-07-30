// basic: Cyan, Magenta and Yellow pedestal variants
// simple: CMY pedestal variant with matching structure
// advanced: Onyx pedestal variant with matching structure
// complex: Moonstone pedestal variant with matching structure
const customPedestalCraft = (event, args) => {
  event.custom({
    "type": "spectrum:pedestal",
    "time": args.time,
    "tier": args.tier || "basic",
    "colors": {
      "spectrum:magenta": args.amethyst || 0,
      "spectrum:yellow": args.citrine || 0,
      "spectrum:cyan": args.topaz || 0,
      "spectrum:black": args.onyx || 0,
      "spectrum:white": args.moonstone || 0
    },
    "experience": args.experience || 0.0,
    "pattern": args.pattern,
    "key": args.key,
    "result": args.result,
    "required_advancement": args.advancement,
    "disable_yield_upgrades": args.yield_upgrades || false,
  });
  if(args.removeRecipe){event.remove({output: args.result.id})}
};

const customPedestalCraftShapeless = (event, args) => {
  event.custom({
    "type": "spectrum:pedestal_shapeless",
    "time": args.time,
    "tier": args.tier || "basic",
    "colors": {
      "spectrum:magenta": args.amethyst || 0,
      "spectrum:yellow": args.citrine || 0,
      "spectrum:cyan": args.topaz || 0,
      "spectrum:black": args.onyx || 0,
      "spectrum:white": args.moonstone || 0
    },
    "experience": args.experience || 0.0,
    "ingredients": args.ingredients || [],
    "result": args.result,
    "required_advancement": args.advancement
  });
};


// Converts an item(s) existing minecraft:crafting_shaped/shapeless recipe into a pedestal
// craft (keeping the original ingredients) and removes the original recipe.
// args: id (result item id), tier, time, experience, advancement, yield_upgrades,
//       amethyst/citrine/topaz/onyx/moonstone (color counts)
const pedestalFromRecipe = (event, args) => {
  const ids = Array.isArray(args.id) ? args.id : [args.id];

  for (const id of ids) {
    event.forEachRecipe({ output: id }, recipe => {
      const rJSON = JSON.parse(recipe.json);
      const common = {
        tier: args.tier,
        time: args.time,
        amethyst: args.amethyst,
        citrine: args.citrine,
        topaz: args.topaz,
        onyx: args.onyx,
        moonstone: args.moonstone,
        experience: args.experience,
        result: rJSON.result,
        advancement: args.advancement,
        yield_upgrades: args.yield_upgrades
      };

      if (rJSON.type === "minecraft:crafting_shaped") {
        customPedestalCraft(event, Object.assign({}, common, {
          pattern: rJSON.pattern,
          key: rJSON.key
        }));
      } else if (rJSON.type === "minecraft:crafting_shapeless") {
        customPedestalCraftShapeless(event, Object.assign({}, common, {
          ingredients: rJSON.ingredients
        }));
      } else {
        return;
      }

      event.remove({ id: recipe.getId() });
    });
  }
};

ServerEvents.recipes(event => {

  //Exmaple (dont forget to add advancement that unlocks the item, if necessary)
  // pedestalFromRecipe(event, {
  //   id: "starbunclemania:fluid_sourcelink",
  //   tier: "simple",
  //   time: 100,
  //   citrine: 2,
  //   topaz: 1,
  //   experience: 0.5,
  // });
})



