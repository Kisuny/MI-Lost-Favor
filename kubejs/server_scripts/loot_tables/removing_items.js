LootJS.modifiers(event => {
    const removed_items = [
        { item_name: "ars_nouveau:wilden_horn", except_loot_type: [LootType.ENTITY] },
        { item_name: "ars_nouveau:wilden_spike", except_loot_type: [LootType.ENTITY]},
        { item_name: "ars_nouveau:wilden_wing", except_loot_type: [LootType.ENTITY]},
        { item_name: /ars_additions:.*/ },
        { item_name: "forbidden_arcanus:aureal_bottle" },
        { item_name: "ars_nouveau:source_gem" },
        { item_name: "ars_nouveau:sourceberry_bush" },
        { item_name: "ars_nouveau:drygmy_shard" },
        { item_name: "ars_nouveau:starbuncle_shards" },
        { item_name: "ars_nouveau:whirlisprig_shards" },
        { item_name: "ars_nouveau:wixie_shards" },
        { item_name: "ars_elemental:siren_shards" },
        { item_name: "ars_nouveau:alakarkinos_token" },
        { item_name: "ars_nouveau:amplify_arrow" },
        { item_name: "ars_nouveau:split_arrow" },
        { item_name: "ars_nouveau:pierce_arrow" },
        { item_name: "ars_nouveau:warp_scroll" },
        { item_name: 'ars_nouveau:ritual_burrowing' },
        { item_name: 'ars_nouveau:ritual_challenge' },
        { item_name: 'ars_nouveau:ritual_binding' },
        { item_name: 'ars_nouveau:ritual_awakening' },
        { item_name: 'ars_nouveau:ritual_disintegration' },
        { item_name: 'ars_nouveau:ritual_sunrise' },
        { item_name: 'ars_elemental:ritual_tesla_coil' },
        { item_name: 'ars_elemental:ritual_squirrels' },
        { item_name: 'ars_elemental:ritual_attraction' },
        { item_name: 'ars_nouveau:ritual_conjure_island_plains' },
        { item_name: 'ars_nouveau:ritual_flight' },
        { item_name: 'ars_nouveau:ritual_cloudshaping' },
        { item_name: 'ars_elemental:ritual_repulsion' },
        { item_name: 'ars_nouveau:ritual_restoration' },
        { item_name: 'ars_nouveau:ritual_animal_summon' },
        { item_name: 'ars_nouveau:ritual_forestation' },
        { item_name: 'ars_nouveau:ritual_warping' },
        { item_name: 'ars_nouveau:ritual_moonfall' },
        { item_name: 'ars_nouveau:ritual_containment' },
        { item_name: 'ars_nouveau:ritual_scrying' },
        { item_name: 'ars_nouveau:ritual_gravity' },
        { item_name: 'ars_nouveau:ritual_flowering' },
        { item_name: 'ars_elemental:ritual_archwood_forest' },
        { item_name: 'ars_nouveau:ritual_sanctuary' },
        { item_name: 'ars_elemental:ritual_detection' },
        { item_name: 'ars_nouveau:ritual_fertility' },
        { item_name: 'ars_nouveau:ritual_overgrowth' },
        { item_name: 'ars_elemental:ritual_archwood_forestation' },
        { item_name: 'ars_nouveau:ritual_conjure_island_desert' },
        { item_name: 'ars_nouveau:ritual_harvest' },
        { item_name: 'ars_nouveau:ritual_wilden_summon' },
        { item_name: 'minecraft:iron_nugget' },
        { item_name: 'minecraft:gold_nugget' },
        { item_name: 'ars_additions:lost_codex_entry' },
        { item_name: 'ars_additions:ancient_codex_entry' },
        { item_name: 'hexerei:blood_sigil' },
        { item_name: 'minecraft:flint_and_steel' },
        { item_name: 'devices:magical_pouch' },
        { item_name: 'devices:devices_pouch' },
        { item_name: 'cognition:astute_assembly' },
        { item_name: 'cognition:cognitive_flux' },
        { item_name: 'cognition:forgotten_dust' },
        { item_name: 'forbidden_arcanus:tentacle' },
        { item_name: 'grimoireofgaia:box_overworld' },
        { item_name: 'grimoireofgaia:box_iron' },
        { item_name: 'grimoireofgaia:box_diamond' },
        { item_name: 'grimoireofgaia:bag_record' },
        { item_name: 'grimoireofgaia:box_hat' },
        { item_name: 'grimoireofgaia:bag_book' },
        { item_name: 'yo_hooks:gold_hook_head' },
        { item_name: 'yo_hooks:diamond_hook_head' },
        { item_name: '#minecraft:saplings' },
        { item_name: 'eidolon_repraised:lead_ingot' },
        { item_name: 'enigmaticlegacyplus:recall_potion' },
        { item_name: 'tide:obsidian_fragment' },
        { item_name: 'tide:fish_bone' },
        { item_name: /tide:.*_fishing_rod/, },
    ]
    
    const loot_types = [LootType.CHEST, LootType.ENTITY, LootType.FISHING, LootType.ARCHAEOLOGY, LootType.VAULT, LootType.GIFT, LootType.PIGLIN_BARTER, LootType.GENERIC]

    removed_items.forEach(item => {
        const except = Array.isArray(item.except_loot_type) ? item.except_loot_type : [];
        const exceptNames = except.map(e => {
            if (typeof e === 'string') return e;
            if (e && typeof e.name === 'function') return e.name();
            return String(e);
        });

        loot_types.forEach(loot_type => {
            const lootName = (loot_type && typeof loot_type.name === 'function') ? loot_type.name() : String(loot_type);
            if (exceptNames.includes(lootName)) return; 
            event
                .addTableModifier(loot_type)
                .removeLoot(item.item_name);
        });
    });

    event.addEntityModifier("eidolon_repraised:raven").removeLoot("eidolon_repraised:raven_feather")

})