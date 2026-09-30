ServerEvents.recipes(event => {
    const remove_by_id = [
        'minecraft:iron_nugget_from_smelting',
        /modern_industrialization:materials\/.*\/smelting\/tiny_dust_to_nugget_smelting/
    ]

    remove_by_id.forEach(id => {
        event.remove({type: "minecraft:smelting", id: id})
        
    });
    
})

KubeJSTweaks.beforeRecipes(event =>{

    const disableByRecipeID = [
       "minecraft:nether_brick",
    ]

    disableByRecipeID.forEach(id =>{
        event.disable(id)
    })
    

})