global.disabledItems = [

    //#region AE
    new DisabledItemBuilder("extendedae:silicon_block"),
    new DisabledItemBuilder("ae2:sky_stone_tank"),
    //#endregion

    //#region MI
    
    new DisabledItemBuilder("industrialization_overdrive:pyrolyse_oven"),
    new DisabledItemBuilder("extended_industrialization:nano_saber"),
    new DisabledItemBuilder("modern_industrialization:steel_block").replaceWith("immersiveengineering:storage_steel"),
    
    //#endregion

    //#region Oritech

    new DisabledItemBuilder("oritech:adamant_dust").replaceWith("modern_industrialization:adamant_dust"),
    new DisabledItemBuilder("oritech:energite_dust").replaceWith("modern_industrialization:energite_dust"),
    new DisabledItemBuilder("oritech:duratium_dust").replaceWith("modern_industrialization:duratium_dust"),
    new DisabledItemBuilder("oritech:biosteel_dust").replaceWith("modern_industrialization:biosteel_dust"),
    new DisabledItemBuilder("oritech:quartz_dust").replaceWith("modern_industrialization:quartz_dust"),
    new DisabledItemBuilder("oritech:coal_dust").replaceWith("modern_industrialization:coal_dust"),

    new DisabledItemBuilder("oritech:steel_ingot"),
    new DisabledItemBuilder("oritech:steel_block"),
    new DisabledItemBuilder("oritech:steel_dust"),

    new DisabledItemBuilder("oritech:deepslate_uranium_ore"),
    new DisabledItemBuilder("oritech:uranium_dust_block"),
    new DisabledItemBuilder("oritech:small_uranium_dust"),
    new DisabledItemBuilder("oritech:uranium_dust"),

    new DisabledItemBuilder("oritech:small_plutonium_dust"),
    new DisabledItemBuilder("oritech:plutonium_dust"),

    new DisabledItemBuilder("oritech:iron_gem"),
    new DisabledItemBuilder("oritech:iron_dust"),
    new DisabledItemBuilder("oritech:small_iron_dust"),

    new DisabledItemBuilder("oritech:copper_gem"),
    new DisabledItemBuilder("oritech:copper_dust"),
    new DisabledItemBuilder("oritech:small_copper_dust"),
    new DisabledItemBuilder("oritech:copper_nugget"),

    new DisabledItemBuilder("oritech:gold_gem"),
    new DisabledItemBuilder("oritech:gold_dust"),
    new DisabledItemBuilder("oritech:small_gold_dust"),

    new DisabledItemBuilder("oritech:nickel_gem"),
    new DisabledItemBuilder("oritech:nickel_ingot"),
    new DisabledItemBuilder("oritech:nickel_nugget"),
    new DisabledItemBuilder("oritech:small_nickel_dust"),
    new DisabledItemBuilder("oritech:nickel_dust"),
    new DisabledItemBuilder("oritech:nickel_ore"),
    new DisabledItemBuilder("oritech:deepslate_nickel_ore"),

    new DisabledItemBuilder("oritech:electrum_ingot"),
    new DisabledItemBuilder("oritech:electrum_dust"),
    new DisabledItemBuilder("oritech:electrum_block"),

    new DisabledItemBuilder("oritech:platinum_ingot"),
    new DisabledItemBuilder("oritech:platinum_dust"),
    new DisabledItemBuilder("oritech:small_platinum_dust"),
    new DisabledItemBuilder("oritech:platinum_gem"),
    new DisabledItemBuilder("oritech:platinum_nugget"),
    new DisabledItemBuilder("oritech:platinum_block"),
    new DisabledItemBuilder("oritech:endstone_platinum_ore"),
    new DisabledItemBuilder("oritech:deepslate_platinum_ore"),

    new DisabledItemBuilder("oritech:raw_silicon"),
    new DisabledItemBuilder("oritech:silicon"),
    new DisabledItemBuilder("oritech:silicon_block"),

    new DisabledItemBuilder("oritech:plastic_block"),

    new DisabledItemBuilder("oritech:machine_core_1"),
    new DisabledItemBuilder("oritech:low_yield_nuke"),
    new DisabledItemBuilder("oritech:nuke"),

    new DisabledItemBuilder("oritech:processing_unit"),
    new DisabledItemBuilder("oritech:motor"),
    new DisabledItemBuilder("oritech:basic_battery"),
    new DisabledItemBuilder("oritech:polymer_resin"),
    new DisabledItemBuilder("oritech:advanced_battery"),
    new DisabledItemBuilder("oritech:clay_catalyst_beads"),

    new DisabledItemBuilder("oritech:creative_tank_block"),
    new DisabledItemBuilder("oritech:fluid_pipe"),
    new DisabledItemBuilder("oritech:framed_fluid_pipe"),
    new DisabledItemBuilder("oritech:fluid_pipe_duct_block"),
    new DisabledItemBuilder("oritech:energy_pipe"),
    new DisabledItemBuilder("oritech:framed_energy_pipe"),
    new DisabledItemBuilder("oritech:energy_pipe_duct_block"),
    new DisabledItemBuilder("oritech:superconductor"),
    new DisabledItemBuilder("oritech:framed_superconductor"),
    new DisabledItemBuilder("oritech:superconductor_duct_block"),
    new DisabledItemBuilder("oritech:item_pipe"),
    new DisabledItemBuilder("oritech:transparent_item_pipe"),
    new DisabledItemBuilder("oritech:framed_item_pipe"),
    new DisabledItemBuilder("oritech:item_pipe_duct_block"),
    new DisabledItemBuilder("oritech:pipe_booster_block"),

    new DisabledItemBuilder(/oritech:raw_(?!biopolymer\b)(\w+)\b/),
    new DisabledItemBuilder(/oritech:\w+_clump/),
    new DisabledItemBuilder(/oritech:resource_node_\w+/),

    //#endregion

    //#region Sophisticated

    new DisabledItemBuilder(/sophisticatedstorage:stack_upgrade_tier_(.+?)_to_tier_(.+?)_conversion/),
    new DisabledItemBuilder("sophisticatedstorage:stack_upgrade_omega_tier"),

    new DisabledItemBuilder("sophisticatedstorage:feeding_upgrade"),
    new DisabledItemBuilder("sophisticatedstorage:advanced_feeding_upgrade"),

    new DisabledItemBuilder("sophisticatedstorage:pickup_upgrade"),
    new DisabledItemBuilder("sophisticatedstorage:advanced_pickup_upgrade"),

    new DisabledItemBuilder("sophisticatedstorage:magnet_upgrade"),
    new DisabledItemBuilder("sophisticatedstorage:advanced_magnet_upgrade"),

    new DisabledItemBuilder("sophisticatedstorage:magnet_upgrade"),
    new DisabledItemBuilder("sophisticatedstorage:advanced_magnet_upgrade"),

    new DisabledItemBuilder("sophisticatedstorage:pump_upgrade"),
    new DisabledItemBuilder("sophisticatedstorage:advanced_pump_upgrade"),
    new DisabledItemBuilder("sophisticatedstorage:xp_pump_upgrade"),

    new DisabledItemBuilder("sophisticatedstorage:infinity_upgrade"),
    new DisabledItemBuilder("sophisticatedstorage:survival_infinity_upgrade"),


    new DisabledItemBuilder(/sophisticatedbackpacks:stack_upgrade_tier_(.+?)_to_tier_(.+?)_conversion/),
    new DisabledItemBuilder(/sophisticatedbackpacks:stack_upgrade_starter_tier_to_tier_(.+?)_conversion/),
    new DisabledItemBuilder("sophisticatedbackpacks:stack_upgrade_omega_tier"),

    new DisabledItemBuilder("sophisticatedbackpacks:pump_upgrade"),
    new DisabledItemBuilder("sophisticatedbackpacks:advanced_pump_upgrade"),
    new DisabledItemBuilder("sophisticatedbackpacks:xp_pump_upgrade"),

    new DisabledItemBuilder("sophisticatedbackpacks:infinity_upgrade"),
    new DisabledItemBuilder("sophisticatedbackpacks:survival_infinity_upgrade"),

    new DisabledItemBuilder("sophisticatedbackpacks:inception_upgrade"),

    //#endregion

    //#region Neo Vitae

    //TODO (一︿一+)

    // new DisabledItemBuilder("neovitae:sulfur").replaceWith("modern_industrialization:sulfur_dust"),
    // new DisabledItemBuilder("neovitae:saltpeter").replaceWith("modern_industrialization:saltpeter_dust"),
    // new DisabledItemBuilder("neovitae:iron_dust").replaceWith("modern_industrialization:iron_dust"),
    // new DisabledItemBuilder("neovitae:gold_dust").replaceWith("modern_industrialization:gold_dust"),
    // new DisabledItemBuilder("neovitae:copper_dust").replaceWith("modern_industrialization:copper_dust"),
    // new DisabledItemBuilder("neovitae:coal_dust").replaceWith("modern_industrialization:coal_dust"),

    //#endregion



    new DisabledItemBuilder(/moderndynamics:\w+_cable/),

    new DisabledItemBuilder("immersiveengineering:mold_wire"),
    new DisabledItemBuilder(/immersiveengineering:wire_\w+/),
    new DisabledItemBuilder(/immersiveengineering:stick_(?!treated\b)(\w+)\b/)
        .replaceWithRegexMapping(material => `modern_industrialization:${material}_rod`),

    new DisabledItemBuilder(createExclusionRegex("immersiveengineering:storage_", ["uranium", "steel"])),

    new DisabledItemBuilder("ytech:bronze_mortar_and_pestle"),

    new DisabledItemBuilder("monsterplus:curseflame_powder"),

    new DisabledItemBuilder("aquaculture:diamond_fillet_knife"),
    new DisabledItemBuilder("aquaculture:gold_fillet_knife"),
    new DisabledItemBuilder("aquaculture:iron_fillet_knife"),
    new DisabledItemBuilder("aquaculture:stone_fillet_knife"),
    new DisabledItemBuilder("aquaculture:wooden_fillet_knife"),
    new DisabledItemBuilder("enigmaticlegacyplus:forbidden_fruit"),
    new DisabledItemBuilder("enigmaticlegacyplus:unholy_grail"),
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