global.disabledItems = [
    new DisabledItemBuilder("ytech:bronze_mortar_and_pestle").build(),
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

function DisabledItemBuilder(id){
    const self = this
    this.id = id,

    this.replaceData = { id: null, in: ["RECIPE_INPUTS", "RECIPE_OUTPUTS", "LOOT_TABLES"]},
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

    this.additionalLootTables = []

    this.alsoRemoveFrom = function(loot_tables){
        self.additionalLootTables = loot_tables
    }

    this.build = function(){
        return { id: self.id, replaceData: self.replaceData, additionalLootTables: self.additionalLootTables }
    }

    return self
}