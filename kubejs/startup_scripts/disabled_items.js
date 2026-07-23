global.disabledItems = [
    new DisabledItemBuilder("extendedae:silicon_block").build(),

    new DisabledItemBuilder(/oritech:\w+/).build(),
    new DisabledItemBuilder(/oritechthings:\w+/).build(),

    new DisabledItemBuilder(/moderndynamics:\w+_cable/).build(),

    new DisabledItemBuilder(/immersiveengineering:wire_\w+/).build(),
    new DisabledItemBuilder(/immersiveengineering:stick_(?!treated\b)(\w+)\b/)
        .replaceWithRegexMapping(material => `modern_industrialization:${material}_rod`).build(),

    new DisabledItemBuilder("ytech:bronze_mortar_and_pestle").build(),

    new DisabledItemBuilder("monsterplus:curseflame_powder").build(),

    new DisabledItemBuilder("refurbished_furniture:knife").build(),
    new DisabledItemBuilder("aquaculture:diamond_fillet_knife").build(),
    new DisabledItemBuilder("aquaculture:gold_fillet_knife").build(),
    new DisabledItemBuilder("aquaculture:iron_fillet_knife").build(),
    new DisabledItemBuilder("aquaculture:stone_fillet_knife").build(),
    new DisabledItemBuilder("aquaculture:wooden_fillet_knife").build(),
    new DisabledItemBuilder("farmersdelight:flint_knife").replaceWith("ytech:flint_knife", true).inLootTables().build(),

]

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