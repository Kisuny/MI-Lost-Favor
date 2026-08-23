ClientEvents.generateAssets("before_mods", event => {

    let json = {}

    let categories = [

        "immersiveengineering:blueprint",
        "ytech:milling",
        "modern_industrialization:bronze_macerator",
        "modern_industrialization:steel_macerator",
        "ars_nouveau:crush",
        "modern_industrialization:electric_macerator",
        "oritech:pulverizer",
        "immersiveengineering:crusher",
        "modern_industrialization:assembler",

        
        "ali:chest_loot",
        "ali:entity_loot",
        "ali:fishing_loot",
        "ali:gameplay_loot",
        "ali:trial_chambers",
        "ali:archaeology_loot",
        "ali:block_loot",
    ]

    categories.forEach((categoryId, index) => {
        
        json[categoryId] = {
            order: index + 1
        }
        
    })    

    event.json(`emi:category/properties/order`, json)

})