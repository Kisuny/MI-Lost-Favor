//requires: roots
ServerEvents.recipes(event => {

    event.remove({output: [
        "roots:silver_ingot",
        "roots:silver_block",
        "roots:raw_silver_block",
        "occultism:silver_nugget",
        "roots:raw_silver",
        "roots:copper_nugget",
        "roots:flour",
    ]})

    const removeById = [
        "roots:bread_from_flour",
        "roots:bread_from_smoking",
        "roots:bread_from_campfire_cooking",
        "roots:copper_ingot_from_nuggets",
    ]

    removeById.forEach(element => {
        event.remove({id: element})
    });
    

})