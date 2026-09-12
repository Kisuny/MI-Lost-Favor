ClientEvents.generateAssets("before_mods", event => {

    let json = {}

    // WIP yet

    // Categories below must appear before all vanilla EMI categories
    // (minecraft:crafting = -1000, the earliest default order in EMI),
    // so they get order < -1000, kept separate from the list below.
    // These crafting stations are usually the only place the actual crafting
    // recipe exists - crafting table/anvil entries for these items are
    // typically just repair/enchant recipes, not the real way to craft them.
    let categoriesBeforeDefaults = [
        "ars_nouveau:budding_conversion",
        "neovitae:ara_vitae",
        "justenoughspirits:spirit_drops",
        "malum:weeping_well",
        "malum:spirit_infusion",
        "eidolon_repraised:rituals",
        "eidolon_repraised:worktable",
    ]

    categoriesBeforeDefaults.forEach((categoryId, index) => {
        json[categoryId] = {
            order: -1001 - index
        }
    })

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

        "minecraft:overworld",
        "minecraft:the_nether",
        "minecraft:the_end",
        "spectrum:deeper_down",
    ]

    categories.forEach((categoryId, index) => {
        
        json[categoryId] = {
            order: index + 1
        }
        
    })    

    event.json(`emi:category/properties/order`, json)

})