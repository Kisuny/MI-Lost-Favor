global.disabledItems = [
    new DisabledItemBuilder("extendedae:silicon_block").build(),

    // new DisabledItemBuilder(/oritech:\w+/).build(),
    // new DisabledItemBuilder(/oritechthings:\w+/).build(),

    //#region Oritech
    new DisabledItemBuilder("oritech:machine_core_1").build(),
    new DisabledItemBuilder("oritech:raw_silicon").build(),
    new DisabledItemBuilder("oritech:nickel_ingot").build(),
    new DisabledItemBuilder("oritech:nickel_nugget").build(),
    new DisabledItemBuilder("oritech:small_nickel_dust").build(),
    new DisabledItemBuilder("oritech:nickel_dust").build(),
    new DisabledItemBuilder("oritech:nickel_ore").build(),
    new DisabledItemBuilder("oritech:deepslate_nickel_ore").build(),
    new DisabledItemBuilder("oritech:silicon").build(),
    new DisabledItemBuilder("oritech:silicon_block").build(),
    new DisabledItemBuilder("oritech:steel_dust").build(),

    new DisabledItemBuilder(/oritech:raw_(?!biopolymer\b)(\w+)\b/).build(),
    new DisabledItemBuilder(/oritech:\w+_clump/).build(),

    new DisabledItemBuilder("oritech:steel_ingot").replaceWith("modern_industrialization:steel_ingot", true).inRecipes(["RECIPE_INPUTS"]).build(),

    //#endregion Oritech

    new DisabledItemBuilder(/moderndynamics:\w+_cable/).build(),

    new DisabledItemBuilder(/immersiveengineering:wire_\w+/).build(),
    new DisabledItemBuilder(/immersiveengineering:stick_(?!treated\b)(\w+)\b/)
        .replaceWithRegexMapping(material => `modern_industrialization:${material}_rod`).build(),

    new DisabledItemBuilder(createExclusionRegex("immersiveengineering:storage_", ["uranium", "steel"])).build(),


    new DisabledItemBuilder("ytech:bronze_mortar_and_pestle").build(),

    new DisabledItemBuilder("monsterplus:curseflame_powder").build(),

    new DisabledItemBuilder("refurbished_furniture:knife").build(),
    new DisabledItemBuilder("aquaculture:diamond_fillet_knife").build(),
    new DisabledItemBuilder("aquaculture:gold_fillet_knife").build(),
    new DisabledItemBuilder("aquaculture:iron_fillet_knife").build(),
    new DisabledItemBuilder("aquaculture:stone_fillet_knife").build(),
    new DisabledItemBuilder("aquaculture:wooden_fillet_knife").build(),
    new DisabledItemBuilder("moredelight:wooden_knife").build(),
    new DisabledItemBuilder("moredelight:stone_knife").build(),
    new DisabledItemBuilder("farmersdelight:flint_knife").replaceWith("ytech:flint_knife", true).inLootTables().build(),

    new DisabledItemBuilder("extradelight:salt").replaceWith("modern_industrialization:salt_dust").build(),
    new DisabledItemBuilder("expandeddelight:salt").replaceWith("modern_industrialization:salt_dust").build(),
]

function createExclusionRegex(base, exclude) {
    let escapedBase = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

    let lookahead = ""
    if (exclude.length > 0) {
        let escapedWords = exclude.map(word =>
            word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b"
        )
        lookahead = `(?!${escapedWords.join('|')})`
    }

    let pattern = `${escapedBase}${lookahead}(\\w+)\\b`

    return `/${pattern}/`
}


function DisabledItemBuilder(id){
    const self = this
    this.id = id,

    this.replaceData = { id: null, in: ["RECIPE_INPUTS", "RECIPE_OUTPUTS", "LOOT_TABLES"], regexMapping: null},
    this.replaceWith = function(id, isNotEverywhere){
        self.replaceData.id = id
        this.inRecipes = function (exact) {
            if (exact){
                self.replaceData.in = exact
                return self
            } else {
                self.replaceData.in = ["RECIPE_INPUTS", "RECIPE_OUTPUTS"]
                return self
            }

        }
        this.inLootTables = function () {
            self.replaceData.in = ["LOOT_TABLES"]
            return self
        }
        if (isNotEverywhere){
            return this
        }
        else return self
    }

    this.replaceWithRegexMapping = function(mapping){
        self.replaceData.regexMapping = mapping
        return self
    }

    this.additionalLootTables = []

    this.alsoRemoveFrom = function(loot_tables){
        self.additionalLootTables = loot_tables
    }

    this.build = function(){
        return { id: self.id, replaceData: self.replaceData, additionalLootTables: self.additionalLootTables }
    }

    return self
}