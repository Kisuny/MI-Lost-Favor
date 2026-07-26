const customSpiningWheel = (event, args) => {
    event.custom({
        "type": "enchanted:wheel",
        "ingredients": args.ingredients,
        "power": args.power || 0,
        "result": {
            "id": args.output,
            "count": args.amount || 1
        },
    });
    if (args.removeRecipe === true) {
        event.remove({ output: args.output });
    }
};

ServerEvents.recipes(event => {


});