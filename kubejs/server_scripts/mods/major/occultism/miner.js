ServerEvents.recipes(event => {
    const ore_to_remove = [
        "occultism:miner/ores/platinum_ore",
        "occultism:miner/ores/diamond_ore",
        "occultism:miner/ores/copper_ore",
        "occultism:miner/ores/monazite_ore",
        "occultism:miner/ores/salt_ore",
        "occultism:miner/ores/lignite_coal_ore",
        "occultism:miner/ores/nickel_ore",
        "occultism:miner/ores/coal_ore",
        "occultism:miner/ores/antimony_ore",
        "occultism:miner/ores/redstone_ore",
        "occultism:miner/ores/lead_ore",
        "occultism:miner/ores/iron_ore",
        "occultism:miner/ores/lapis_ore",
        "occultism:miner/ores/titanium_ore",
        "occultism:miner/ores/gold_ore",
        "occultism:miner/ores/uranium_ore",
        "occultism:miner/ores/tungsten_ore",
        "occultism:miner/ores/nether_quartz_ore",
        "occultism:miner/ores/nether_gold_ore",
        "occultism:miner/ores/tin_ore",
        "occultism:miner/ores/iridium_ore",
        "occultism:miner/ores/platinum_ore",
        "occultism:miner/ores/bauxite_ore",
        "occultism:miner/ores/emerald_ore",
        "occultism:miner/ores/runic_stone",
        "occultism:miner/ores/arcane_crystal",
        // Deepslate Miners
        "occultism:miner/deeps/deepslate_copper_ore",
        "occultism:miner/deeps/deepslate_iron_ore",
        "occultism:miner/deeps/deepslate_emerald_ore",
        "occultism:miner/deeps/deepslate_coal_ore",
        "occultism:miner/deeps/deepslate_redstone_ore",
        "occultism:miner/deeps/deepslate_diamond_ore",
        "occultism:miner/deeps/deepslate_gold_ore",
        "occultism:miner/deeps/deepslate_lapis_ore",
        "occultism:miner/deeps/deepslate_silver_ore",
        // Master 
        // "occultism:miner/master/stellarite",
        // Eldritch Ancient Miner
        "occultism:miner/eldritch/raw_platinum",
        "occultism:miner/eldritch/raw_gold",
        "occultism:miner/eldritch/lapis",
        "occultism:miner/eldritch/raw_iron",
        "occultism:miner/eldritch/raw_titanium",
        "occultism:miner/eldritch/redstone",
        "occultism:miner/eldritch/raw_nickel",
        "occultism:miner/eldritch/raw_silver",
        "occultism:miner/eldritch/diamond",
        "occultism:miner/eldritch/quartz",
        "occultism:miner/eldritch/sulfur",
        "occultism:miner/eldritch/monazite",
        "occultism:miner/eldritch/raw_tin",
        "occultism:miner/eldritch/ancient_debris",
        "occultism:miner/eldritch/raw_tungsten",
        "occultism:miner/eldritch/bauxite",
        "occultism:miner/eldritch/raw_antimony",
        "occultism:miner/eldritch/lignite_coal",
        "occultism:miner/eldritch/raw_copper",
        "occultism:miner/eldritch/coal",
        "occultism:miner/eldritch/emerald",
        "occultism:miner/eldritch/raw_lead",
        "occultism:miner/eldritch/salt",
        "occultism:miner/eldritch/raw_uranium",
        "occultism:miner/eldritch/raw_iridium",
        "occultism:miner/eldritch/rune",
        "occultism:miner/eldritch/amethyst",
        "occultism:miner/eldritch/arcane_crystal",
        "occultism:miner/eldritch/stellarite",
    ]


    // miner_types: unspecialized, ores, deeps, master, eldritch
    const custom_ores = [
        {name: "malum:deepslate_soulstone_ore", miner_type: "deeps", chance: 200, amount: 1},
        {name: "forbidden_arcanus:arcane_crystal_ore", miner_type: "deeps", chance: 200, amount: 1},
        {name: "forbidden_arcanus:runic_stone", miner_type: "deeps", chance: 200, amount: 1},
        {name: "malum:brilliant_deepslate", miner_type: "deeps", chance: 100, amount: 1},
        {name: "malum:refined_brilliance", miner_type: "eldritch", chance: 100, amount: 9},
        {name: "spectrum:deepslate_shimmerstone_ore", miner_type: "deeps", chance: 200, amount: 1},
        {name: "spectrum:stratine_ore", miner_type: "deeps", chance: 200, amount: 1},
        {name: "malum:cthonic_gold_ore", miner_type: "deeps", chance: 100, amount: 1},
        {name: "spectrum:deepslate_azurite_ore", miner_type: "master", chance: 20, amount: 1},
        {name: "spectrum:radiating_ender", miner_type: "master", chance: 20, amount: 1},
        {name: "malum:block_of_soulstone", miner_type: "eldritch", chance: 50, amount: 1},
        {name: "malum:cthonic_gold_fragment", miner_type: "eldritch", chance: 50, amount: 9},
        {name: "spectrum:azurite_block", miner_type: "eldritch", chance: 50, amount: 1},
        {name: "spectrum:shimmerstone_gem", miner_type: "eldritch", chance: 50, amount: 9},
        {name: "spectrum:stratine_fragments", miner_type: "eldritch", chance: 50, amount: 9},
        {name: "forbidden_arcanus:stellarite_block", miner_type: "eldritch", chance: 20, amount: 1},
        {name: "forbidden_arcanus:rune_block", miner_type: "eldritch", chance: 50, amount: 1},
        {name: "forbidden_arcanus:arcane_crystal_block", miner_type: "eldritch", chance: 50, amount: 1},
        {name: "minecraft:amethyst_shard", miner_type: "eldritch", chance: 200, amount: 9},
        {name: "spectrum:citrine_shard", miner_type: "eldritch", chance: 200, amount: 9},
        {name: "spectrum:topaz_shard", miner_type: "eldritch", chance: 200, amount: 9},

    ]
    

    custom_ores.forEach(ore => {
        event.recipes.occultism.miner(
        WeightedRecipeResult.of(ore.name, ore.amount, ore.chance),
        `#occultism:miners/${ore.miner_type}`
    )
    });
    

    ore_to_remove.forEach(ore => {
        event.remove(ore)
    });
})