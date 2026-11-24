const customDistillingCraft = (event, args) => {
  const recipe = event.custom({
    type: "enchanted:distilling",
    ingredients: args.ingredients || [],
    results: args.results || []
  });

  if (args.removeById) {
    event.remove({ id: args.removeById });
  }
  
  if (args.id) {
    recipe.id(args.id);
  }
};
