ServerEvents.recipes(event => {

})



// MIRecipeEvents.customCondition(event => {
//     let coatings = ["bioactive_coating", "thermophilic_dermis", "symbiote_membrane"]
//     coatings.forEach(coating =>{
//         event.register(`milf:microbial_fabricator_${coating}`,
//                 (context, recipe) => {
//                     if(context.level.getBlock(context.blockEntity.blockPos).entityData.upgradesItemStack.id == `milf:${coating}`){
//                         return true
//                     } 
//                     return false
//                 },
//                 Text.of(`A ${idToName(coating)} must be used as a machine upgrade`));
//     })

//     function idToName(id) {
//         return id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
//     }

// })