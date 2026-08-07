global.disabledItems = [
    new DisabledItemBuilder("extendedae:silicon_block"),

    // new DisabledItemBuilder(/oritech:\w+/),
    // new DisabledItemBuilder(/oritechthings:\w+/),

    new DisabledItemBuilder("modern_industrialization:steel_block").replaceWith("immersiveengineering:storage_steel"),

    //#region Oritech
    new DisabledItemBuilder("oritech:machine_core_1"),
    new DisabledItemBuilder("oritech:raw_silicon"),
    new DisabledItemBuilder("oritech:nickel_ingot"),
    new DisabledItemBuilder("oritech:nickel_nugget"),
    new DisabledItemBuilder("oritech:small_nickel_dust"),
    new DisabledItemBuilder("oritech:nickel_dust"),
    new DisabledItemBuilder("oritech:nickel_ore"),
    new DisabledItemBuilder("oritech:deepslate_nickel_ore"),
    new DisabledItemBuilder("oritech:silicon"),
    new DisabledItemBuilder("oritech:silicon_block"),
    new DisabledItemBuilder("oritech:steel_dust"),

    new DisabledItemBuilder(/oritech:raw_(?!biopolymer\b)(\w+)\b/),
    new DisabledItemBuilder(/oritech:\w+_clump/),

    new DisabledItemBuilder("oritech:steel_ingot").replaceWith("modern_industrialization:steel_ingot", true).inRecipes(["RECIPE_INPUTS"]),

    //#endregion Oritech

    new DisabledItemBuilder(/moderndynamics:\w+_cable/),

    new DisabledItemBuilder("immersiveengineering:mold_wire"),
    new DisabledItemBuilder(/immersiveengineering:wire_\w+/),
    new DisabledItemBuilder(/immersiveengineering:stick_(?!treated\b)(\w+)\b/)
        .replaceWithRegexMapping(material => `modern_industrialization:${material}_rod`),

    new DisabledItemBuilder(createExclusionRegex("immersiveengineering:storage_", ["uranium", "steel"])),
    
    new DisabledItemBuilder("extended_industrialization:nano_saber"),

    new DisabledItemBuilder("ytech:bronze_mortar_and_pestle"),

    new DisabledItemBuilder("monsterplus:curseflame_powder"),

    new DisabledItemBuilder("aquaculture:diamond_fillet_knife"),
    new DisabledItemBuilder("aquaculture:gold_fillet_knife"),
    new DisabledItemBuilder("aquaculture:iron_fillet_knife"),
    new DisabledItemBuilder("aquaculture:stone_fillet_knife"),
    new DisabledItemBuilder("aquaculture:wooden_fillet_knife"),
    new DisabledItemBuilder("farmersdelight:flint_knife").replaceWith("ytech:flint_knife", true).inLootTables(),

].map(builder => builder.build())

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