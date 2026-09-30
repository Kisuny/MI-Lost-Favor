ServerEvents.tags('item', event => {
    event.add("toxony:possible_ingredients", [
        '#toxony:ingredients/poisonous', 
        '#toxony:plants/poisonous'
    ])
})