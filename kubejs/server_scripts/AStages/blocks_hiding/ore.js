const ores = [
    { stage: "tier_1_access_ore", id: "ore_redstone", origin: "minecraft:redstone_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_redstone", origin: "minecraft:deepslate_redstone_ore", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_emerald", origin: "minecraft:emerald_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_emerald", origin: "minecraft:deepslate_emerald_ore", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_lapis", origin: "minecraft:lapis_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_lapis", origin: "minecraft:deepslate_lapis_ore", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_diamond", origin: "minecraft:diamond_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_diamond", origin: "minecraft:deepslate_diamond_ore", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_gold", origin: "minecraft:gold_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_raw_gold", origin: "minecraft:raw_gold_block", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_gold", origin: "minecraft:deepslate_gold_ore", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_ancient_silver", origin: "toxony:ancient_silver", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_antimony", origin: "modern_industrialization:antimony_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_antimony", origin: "modern_industrialization:deepslate_antimony_ore", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_raw_antimony", origin: "modern_industrialization:raw_antimony_block", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_bauxite", origin: "modern_industrialization:bauxite_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_bauxite", origin: "modern_industrialization:deepslate_bauxite_ore", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_lead", origin: "modern_industrialization:lead_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_raw_lead", origin: "modern_industrialization:raw_lead_block", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_lead", origin: "modern_industrialization:deepslate_lead_ore", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_monazite", origin: "modern_industrialization:monazite_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_monazite", origin: "modern_industrialization:deepslate_monazite_ore", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_nickel", origin: "modern_industrialization:nickel_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_nickel", origin: "modern_industrialization:deepslate_nickel_ore", replace: "minecraft:deepslate" },
    { stage: "tier_1_access_ore", id: "ore_raw_nickel", origin: "modern_industrialization:raw_nickel_block", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "nether_quartz_ore", origin: "minecraft:nether_quartz_ore", replace: "minecraft:netherrack" },
    { stage: "tier_1_access_ore", id: "ancient_debris", origin: "minecraft:ancient_debris", replace: "minecraft:netherrack" },
    { stage: "tier_1_access_ore", id: "ore_salt", origin: "modern_industrialization:salt_ore", replace: "minecraft:stone" },
    { stage: "tier_1_access_ore", id: "ore_deepslate_salt", origin: "modern_industrialization:deepslate_salt_ore", replace: "minecraft:deepslate" },

    { stage: "tier_2_access_ore", id: "ore_iridium", origin: "modern_industrialization:iridium_ore", replace: "minecraft:stone" },
    { stage: "tier_2_access_ore", id: "ore_raw_iridium", origin: "modern_industrialization:raw_iridium_block", replace: "minecraft:stone" },
    { stage: "tier_2_access_ore", id: "ore_platinum", origin: "modern_industrialization:platinum_ore", replace: "minecraft:stone" },
    { stage: "tier_2_access_ore", id: "ore_raw_platinum", origin: "modern_industrialization:raw_platinum_block", replace: "minecraft:stone" },
    { stage: "tier_2_access_ore", id: "ore_titanium", origin: "modern_industrialization:titanium_ore", replace: "minecraft:stone" },
    { stage: "tier_2_access_ore", id: "ore_raw_titanium", origin: "modern_industrialization:raw_titanium_block", replace: "minecraft:stone" },
    { stage: "tier_2_access_ore", id: "ore_tungsten", origin: "modern_industrialization:tungsten_ore", replace: "minecraft:stone" },
    { stage: "tier_2_access_ore", id: "ore_deepslate_tungsten", origin: "modern_industrialization:deepslate_tungsten_ore", replace: "minecraft:deepslate" },
    { stage: "tier_2_access_ore", id: "ore_raw_tungsten", origin: "modern_industrialization:raw_tungsten_block", replace: "minecraft:stone" },
    { stage: "tier_2_access_ore", id: "ore_uranium", origin: "modern_industrialization:uranium_ore", replace: "minecraft:stone" },
    { stage: "tier_2_access_ore", id: "ore_deepslate_uranium", origin: "modern_industrialization:deepslate_uranium_ore", replace: "minecraft:deepslate" },
    { stage: "tier_2_access_ore", id: "ore_raw_uranium", origin: "modern_industrialization:raw_uranium_block", replace: "minecraft:stone" },
    { stage: "malum_access_ore", id: "ore_blazing_quartz", origin: "malum:blazing_quartz_ore", replace: "minecraft:netherrack" },
    { stage: "malum_access_ore", id: "ore_soulstone", origin: "malum:soulstone_ore", replace: "minecraft:stone" },
    { stage: "malum_access_ore", id: "ore_natural_quartz", origin: "malum:natural_quartz_ore", replace: "minecraft:stone" },
    { stage: "malum_access_ore", id: "ore_brilliant_stone", origin: "malum:brilliant_stone", replace: "minecraft:stone" },
    { stage: "malum_access_ore", id: "ore_deepslate_natural_quartz", origin: "malum:deepslate_quartz_ore", replace: "minecraft:deepslate" },
    { stage: "malum_access_ore", id: "ore_deepslate_soulstone", origin: "malum:deepslate_soulstone_ore", replace: "minecraft:deepslate" },
    { stage: "malum_access_ore", id: "ore_brilliant_deepslate", origin: "malum:brilliant_deepslate", replace: "minecraft:deepslate" },
]
ores.forEach(element => {
    AStages.addRestrictionForOre(`astages/ore_${element.id}`, element.stage, element.origin, element.replace).matchAllBlockStates()
});

const facing = [
    { id: 'north', direction: Facing.NORTH },
    { id: 'east', direction: Facing.EAST },
    { id: 'south', direction: Facing.SOUTH },
    { id: 'west', direction: Facing.WEST }
]

const ore_samples = [
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "gold" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "diamond" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "emerald" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "lapis" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "redstone" },
    { rock_type: "rocks:netherrack_rock", stage: "tier_1_access_ore", sample_name: "ancient_debris" },
    { rock_type: "rocks:netherrack_rock", stage: "tier_1_access_ore", sample_name: "nether_quartz" },
    { rock_type: "rocks:netherrack_rock", stage: "tier_1_access_ore", sample_name: "nether_gold" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "antimony" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "bauxite" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "iridium" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "lead" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "monazite" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "nickel" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "platinum" },
    { rock_type: "rocks:rock", stage: "tier_1_access_ore", sample_name: "salt" },
    { rock_type: "rocks:rock", stage: "tier_2_access_ore", sample_name: "titanium" },
    { rock_type: "rocks:rock", stage: "tier_2_access_ore", sample_name: "tungsten" },
    { rock_type: "rocks:rock", stage: "tier_2_access_ore", sample_name: "uranium" },
]

ore_samples.forEach(element => {
    facing.forEach(facing => {
        AStages.addRestrictionForOre(
            `astages/samples/${element.sample_name}_sample_${facing.id}`,
            element.stage,
            Block.getBlock(`milf:${element.sample_name}_ore_sample`).defaultBlockState().setValue(BlockProperties.HORIZONTAL_FACING, facing.direction),
            element.rock_type
        ).matchAllBlockStates()
    })
})