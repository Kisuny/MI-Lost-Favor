KubeJSTweaks.beforeRecipes(event =>{

    const minerals = [
        "immersiveengineering:mineral/alluvial_sift",
        "immersiveengineering:mineral/amethyst_crevasse",
        "immersiveengineering:mineral/ancient_debris",
        "immersiveengineering:mineral/ancient_seabed",
        "immersiveengineering:mineral/auricupride",
        "immersiveengineering:mineral/banded_iron",
        //"immersiveengineering:mineral/beryl",
        //"immersiveengineering:mineral/bituminous_coal",
        //"immersiveengineering:mineral/chalcopyrite",
        "immersiveengineering:mineral/cinnabar",
        "immersiveengineering:mineral/cooled_lava_tube",
        "immersiveengineering:mineral/galena",
        "immersiveengineering:mineral/hardened_clay_pan",
        "immersiveengineering:mineral/igneous_rock",
        "immersiveengineering:mineral/laterite",
        "immersiveengineering:mineral/lazulitic_intrusion",
        "immersiveengineering:mineral/mephitic_quarzite",
        "immersiveengineering:mineral/nether_silt",
        "immersiveengineering:mineral/pentlandite",
        "immersiveengineering:mineral/rich_auricupride",
        "immersiveengineering:mineral/silt",
        "immersiveengineering:mineral/uraninite",
        "immersiveengineering:mineral/wolframite",

        "immersiveengineering:super_mineral_vein"
    ]

    minerals.forEach(id =>{
        event.disable(id)
    })
    

})

ServerEvents.recipes(event => {

    event.forEachRecipe({type: 'immersiveengineering:mineral_mix'}, recipe =>{
        //console.log(recipe);
        //console.log(recipe.getId());
        
        
    })
})