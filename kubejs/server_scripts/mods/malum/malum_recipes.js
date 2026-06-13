ServerEvents.recipes(event => {
    
    event.remove({id: "malum:copper_nugget_from_ingot"})
    event.remove({id: "malum:copper_ingot_from_nugget"})
    event.remove({output: "malum:crude_scythe"})
    
})