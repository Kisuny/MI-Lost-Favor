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


const parsePedestalSpec = spec => {
  if (typeof spec === "string") {
    return spec.startsWith("#")
      ? { type: "tag", id: spec.slice(1) }
      : { type: "item", id: spec };
  }
  if (spec.tag) return { type: "tag", id: spec.tag };
  return { type: "item", id: spec.item };
};

const pedestalSpecMatches = (node, from) => {
  if (!node || typeof node !== "object") return false;
  return from.type === "tag" ? node.tag === from.id : node.item === from.id;
};

const pedestalSpecToJSON = to => (to.type === "tag" ? { tag: to.id } : { item: to.id });

const replacePedestalIngredient = (node, from, to) => {
  if (Array.isArray(node)) return node.map(n => replacePedestalIngredient(n, from, to));
  if (node && typeof node === "object") {
    if (pedestalSpecMatches(node, from)) return pedestalSpecToJSON(to);
    let result = {};
    for (let k in node) result[k] = replacePedestalIngredient(node[k], from, to);
    return result;
  }
  return node;
};

const pedestalFromRecipe = (event, args) => {
  let ids = Array.isArray(args.id) ? args.id : [args.id];
  let replacements = (args.replace || []).map(r => ({
    from: parsePedestalSpec(r.from),
    to: parsePedestalSpec(r.to)
  }));

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
        let key = rJSON.key;
        for (const { from, to } of replacements) key = replacePedestalIngredient(key, from, to);
        customPedestalCraft(event, Object.assign({}, common, {
          pattern: rJSON.pattern,
          key: key
        }));
      } else if (rJSON.type === "minecraft:crafting_shapeless") {
        let ingredients = rJSON.ingredients;
        for (const { from, to } of replacements) ingredients = replacePedestalIngredient(ingredients, from, to);
        customPedestalCraftShapeless(event, Object.assign({}, common, {
          ingredients: ingredients
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
  //   replace: [
  //     { from: "minecraft:iron_ingot", to: "#forge:ingots/copper" }, // item -> tag
  //     { from: "#minecraft:planks", to: "minecraft:oak_planks" }, // tag -> item
  //     { from: "minecraft:stick", to: "minecraft:blaze_rod" }, // item -> item
  //     { from: "#forge:gems", to: "#forge:dusts" },  // tag -> tag
  //   ],
  //   tier: "simple",
  //   time: 100,
  //   citrine: 2,
  //   topaz: 1,
  //   experience: 0.5,
  // });
})



