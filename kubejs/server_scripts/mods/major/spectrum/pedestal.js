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


ServerEvents.recipes(event => {

})



