global.disabledItems = [

    new DisabledItemBuilder("milf:embers_dummy_chart_block_crate"),

    //#region AE
    new DisabledItemBuilder("extendedae:silicon_block"),
    new DisabledItemBuilder("ae2:sky_stone_tank"),
    //#endregion

    //#region MI
    new DisabledItemBuilder("industrialization_overdrive:pyrolyse_oven"),
    new DisabledItemBuilder("extended_industrialization:nano_saber"),
    new DisabledItemBuilder("modern_industrialization:steel_block").replaceWith("immersiveengineering:storage_steel"),
    new DisabledItemBuilder("modern_industrialization:netherite_hammer"),
    new DisabledItemBuilder("modern_industrialization:diamond_hammer"),
    new DisabledItemBuilder("modern_industrialization:iron_barrel"),
    new DisabledItemBuilder("modern_industrialization:iron_tank"),
    //#endregion

    //#region Oritech

    new DisabledItemBuilder("oritech:adamant_dust"),
    new DisabledItemBuilder("oritech:energite_dust"),
    new DisabledItemBuilder("oritech:duratium_dust"),
    new DisabledItemBuilder("oritech:biosteel_dust"),
    new DisabledItemBuilder("oritech:quartz_dust"),
    new DisabledItemBuilder("oritech:coal_dust"),

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

    //#region ytech

    new DisabledItemBuilder(/ytech:(?!stone)(\w+)_mortar_and_pestle\b/),
    new DisabledItemBuilder(/ytech:(?!flint|bronze|lead)(\w+)_knife\b/),
    new DisabledItemBuilder(/ytech:(?!flint)(\w+)_spear\b/),
    new DisabledItemBuilder(/ytech:(?!bronze|lead)(\w+)_hoe\b/),
    new DisabledItemBuilder(/ytech:(?!bronze|lead)(\w+)_hammer\b/),
    new DisabledItemBuilder(/ytech:(\w+)_hammer_head_part\b/),
    new DisabledItemBuilder(/ytech:(?!bronze|lead)(\w+)_file\b/),
    new DisabledItemBuilder(/ytech:(?!bronze|lead)(\w+)_saw\b/),
    new DisabledItemBuilder(/ytech:(?!bronze)(\w+)_shears\b/),
    new DisabledItemBuilder(/ytech:(?!bronze|lead)(\w+)_shovel\b/),
    new DisabledItemBuilder(/ytech:(?!bronze|lead)(\w+)_sword\b/),
    new DisabledItemBuilder(/ytech:(\w+)_sword_blade_part\b/),
    new DisabledItemBuilder(/ytech:(?!flint|bronze|lead)(\w+)_axe\b/),
    new DisabledItemBuilder(/ytech:(\w+)_axe_head_part\b/),
    new DisabledItemBuilder(/ytech:(?!antler|bronze|lead)(\w+)_pickaxe\b/),
    new DisabledItemBuilder(/ytech:(\w+)_pickaxe_head_part\b/),

    new DisabledItemBuilder(/ytech:(?!wooden)(\w+)_plate\b/),
    new DisabledItemBuilder(/ytech:(?!brick)(\w+)_mold\b/),
    new DisabledItemBuilder(/ytech:(\w+)_pattern\b/),
    new DisabledItemBuilder(/ytech:dried_(\w+)\b/),
    new DisabledItemBuilder(/ytech:(?!unfired)(\w+)_clay_bucket\b/),

    new DisabledItemBuilder(/ytech:clay_bucket\b/).replaceWith("milf:clay_crucible"),


    new DisabledItemBuilder(/ytech:(\w+)_block\b/),
    new DisabledItemBuilder(/ytech:(\w+)_helmet\b/),
    new DisabledItemBuilder(/ytech:(\w+)_chestplate\b/),
    new DisabledItemBuilder(/ytech:(\w+)_leggings\b/),
    new DisabledItemBuilder(/ytech:(\w+)_boots\b/),

    new DisabledItemBuilder(/ytech:(\w+)_ore\b/),
    new DisabledItemBuilder(/ytech:(\w+)_deposit\b/),

    new DisabledItemBuilder(/ytech:(\w+)_drying_rack\b/),

    new DisabledItemBuilder(/ytech:(?!divining)(\w+)_rod\b/)
        .replaceWithRegexMapping(material => `modern_industrialization:${material == "golden" ? "gold" : material}_rod`),
    new DisabledItemBuilder(/ytech:(\w+)_ingot\b/)
        .replaceWithRegexMapping(material => `modern_industrialization:${material == "golden" ? "gold" : material}_ingot`),
    new DisabledItemBuilder(/ytech:(?!wooden)(\w+)_bolt\b/)
        .replaceWithRegexMapping(material => `modern_industrialization:${material == "golden" ? "gold" : material}_bolt`),

    new DisabledItemBuilder("ytech:crushed_copper").replaceWith("milf:crushed_copper"),
    new DisabledItemBuilder("ytech:crushed_gold").replaceWith("milf:crushed_gold"),
    new DisabledItemBuilder("ytech:crushed_iron").replaceWith("milf:crushed_iron"),
    new DisabledItemBuilder("ytech:crushed_galena").replaceWith("milf:crushed_lead"),
    new DisabledItemBuilder("ytech:crushed_cassiterite").replaceWith("milf:crushed_tin"),

    new DisabledItemBuilder("ytech:raw_galena").replaceWith("modern_industrialization:raw_lead"),
    new DisabledItemBuilder("ytech:raw_cassiterite").replaceWith("modern_industrialization:raw_tin"),

    new DisabledItemBuilder("ytech:reinforced_bricks"),
    new DisabledItemBuilder("ytech:bread_dough"),
    new DisabledItemBuilder("ytech:flour"),
    new DisabledItemBuilder("ytech:iron_bloom"),
    new DisabledItemBuilder("ytech:unfired_clay_bucket"),
    new DisabledItemBuilder("ytech:fire_pit"),
    new DisabledItemBuilder("ytech:primitive_alloy_smelter"),
    new DisabledItemBuilder("ytech:primitive_smelter"),
    new DisabledItemBuilder("ytech:reinforced_brick_chimney"),
    new DisabledItemBuilder("ytech:brick_chimney"),
    new DisabledItemBuilder("ytech:bronze_anvil"),


    //#endregion

    new DisabledItemBuilder(/moderndynamics:\w+_cable/),

    //#region IE

    new DisabledItemBuilder("immersiveengineering:mold_wire"),
    
    new DisabledItemBuilder(/immersiveengineering:stick_(?!treated\b)(\w+)\b/)
        .replaceWithRegexMapping(material => `modern_industrialization:${material}_rod`)
        .replaceIn(["LOOT_TABLES"]),

    new DisabledItemBuilder(/immersiveengineering:ingot_(\w+)\b/)
        .replaceWithRegexMapping(material => `modern_industrialization:${material}_ingot`)
        .replaceIn(["RECIPE_INPUTS"]),
    new DisabledItemBuilder(/immersiveengineering:wire_(\w+)\b/)
        .replaceWithRegexMapping(material => `modern_industrialization:${material}_wire`)
        .replaceIn(["RECIPE_INPUTS"]),

    new DisabledItemBuilder(/immersiveengineering:storage_(?!uranium|steel\b)(\w+)\b/),
    new DisabledItemBuilder(/immersiveengineering:slab_storage_(?!uranium|steel\b)(\w+)\b/),

    new DisabledItemBuilder(/immersiveengineering:dust_(\w+)\b/),
    new DisabledItemBuilder(/immersiveengineering:raw_(\w+)\b/),
    new DisabledItemBuilder(/immersiveengineering:nugget_(\w+)\b/),
    new DisabledItemBuilder(/immersiveengineering:ingot_(\w+)\b/),
    new DisabledItemBuilder(/immersiveengineering:plate_(\w+)\b/),
    new DisabledItemBuilder(/immersiveengineering:ore_(\w+)\b/),
    new DisabledItemBuilder(/immersiveengineering:deepslate_ore_(\w+)\b/),

    new DisabledItemBuilder(/immersiveengineering:.*coke.*/),

    new DisabledItemBuilder(/immersiveposts:stick_(\w+)\b/),

    //#endregion


    //#region Embers

    new DisabledItemBuilder("embers:lead_shovel"),
    new DisabledItemBuilder("embers:dawnstone_shovel"),

    new DisabledItemBuilder("embers:lead_hoe"),
    new DisabledItemBuilder("embers:dawnstone_hoe"),

    new DisabledItemBuilder("embers:lead_pickaxe"),
    new DisabledItemBuilder("embers:dawnstone_pickaxe"),

    new DisabledItemBuilder("embers:lead_axe"),
    new DisabledItemBuilder("embers:dawnstone_axe"),

    new DisabledItemBuilder("embers:lead_sword"),
    new DisabledItemBuilder("embers:dawnstone_sword"),

    new DisabledItemBuilder("embers:copper_nugget"),
    new DisabledItemBuilder("embers:lead_nugget"),
    new DisabledItemBuilder("embers:silver_nugget"),
    new DisabledItemBuilder("embers:dawnstone_nugget"),

    new DisabledItemBuilder("embers:raw_lead"),
    new DisabledItemBuilder("embers:raw_silver"),

    new DisabledItemBuilder("embers:lead_ingot"),
    new DisabledItemBuilder("embers:silver_ingot"),

    new DisabledItemBuilder("embers:copper_plate"),
    new DisabledItemBuilder("embers:iron_plate"),
    new DisabledItemBuilder("embers:lead_plate"),
    new DisabledItemBuilder("embers:silver_plate"),
    new DisabledItemBuilder("embers:mithril_plate"),
    new DisabledItemBuilder("embers:dawnstone_plate"),
    new DisabledItemBuilder(/embers:mithril_(\w+)\b/),

    //#endregion

    new DisabledItemBuilder("minecraft:wooden_spear"),
    new DisabledItemBuilder("minecraft:stone_spear"),
    new DisabledItemBuilder("minecraft:iron_spear"),
    new DisabledItemBuilder("minecraft:wooden_spear"),

    new DisabledItemBuilder("monsterplus:curseflame_powder"),

    new DisabledItemBuilder("aquaculture:diamond_fillet_knife"),
    new DisabledItemBuilder("aquaculture:gold_fillet_knife"),
    new DisabledItemBuilder("aquaculture:iron_fillet_knife"),
    new DisabledItemBuilder("aquaculture:stone_fillet_knife"),
    new DisabledItemBuilder("aquaculture:wooden_fillet_knife"),
    new DisabledItemBuilder("enigmaticlegacyplus:forbidden_fruit"),
    new DisabledItemBuilder("enigmaticlegacyplus:unholy_grail"),
    new DisabledItemBuilder("malum:aluminum_impetus"),
    new DisabledItemBuilder("malum:aluminum_node"),
    new DisabledItemBuilder("malum:fractured_aluminum_impetus"),
    new DisabledItemBuilder("gaze:enchantment_workbench"),
    new DisabledItemBuilder("malum:natural_quartz"),
    new DisabledItemBuilder("malum:natural_quartz_ore"),
    new DisabledItemBuilder("malum:deepslate_quartz_ore"),
    new DisabledItemBuilder("realmrpg_balloons:common_treasure_balloon"),
    new DisabledItemBuilder("realmrpg_balloons:uncommon_treasure_balloon"),
    new DisabledItemBuilder("realmrpg_balloons:rare_treasure_balloon"),
    new DisabledItemBuilder("realmrpg_balloons:epic_treasure_balloon"),
    new DisabledItemBuilder("realmrpg_balloons:legendary_treasure_balloon"),
    new DisabledItemBuilder("realmrpg_balloons:unknown_treasure_balloon"),
    new DisabledItemBuilder("realmrpg_balloons:balloon_clock"),
    new DisabledItemBuilder("spectrum:bottle_of_forfeiture"),
    new DisabledItemBuilder("hexerei:creative_waxing_kit"),
    new DisabledItemBuilder("functionalstorage:creative_vending_upgrade"),
    new DisabledItemBuilder("neovitae:activation_crystal_creative"),
    new DisabledItemBuilder("oritech:creative_storage_block"),
    new DisabledItemBuilder("embers:creative_ember_source"),
    new DisabledItemBuilder("thaumaturge:thaumonomicon_cheat"),
    new DisabledItemBuilder("thaumaturge:creative_node_placer"),
    new DisabledItemBuilder("thaumaturge:creative_flux_sponge"),
    new DisabledItemBuilder("spectrum:creative_particle_spawner"),
    new DisabledItemBuilder("thaumaturge:plate_iron"),
    new DisabledItemBuilder("thaumaturge:plate_brass"),
    new DisabledItemBuilder("thaumaturge:plate_thaumium"),
    new DisabledItemBuilder("thaumaturge:plate_void"),
    new DisabledItemBuilder("farmersdelight:flint_knife")
        .replaceWith("ytech:flint_knife").replaceIn(["LOOT_TABLES"]),

].map(builder => builder.build())

function DisabledItemBuilder(id){
    const self = this
    this.id = id,

    this.replaceData = { id: null, in: ["RECIPE_INPUTS", "RECIPE_OUTPUTS", "LOOT_TABLES"], regexMapping: null},
    this.replaceWith = function(id){
        self.replaceData.id = id
        return self
    }

    this.replaceIn = function(types){
        this.replaceData.in = types
        return self
    }

    this.replaceWithRegexMapping = function(mapping){
        self.replaceData.regexMapping = mapping
        return self
    }

    this.build = function(){
        return { id: self.id, replaceData: self.replaceData}
    }

    return self
}