ItemEvents.modifyTooltips(event => {

    const hint = Text.translate("milf.press_button").color("#f5c25b")
        .append(Text.of("Shift ").bold().color("#ffb319"))
        .append(Text.translate("milf.for_details").color("#f5c25b"));

    const addOre = (items, locations) => {
        const itemList = Array.isArray(items) ? items : [items];
        itemList.forEach(item => {
            event.add(item, { shift: false }, hint);
            locations.forEach(loc => {
                let dimText;
                switch (loc.dim) {
                    case 'nether':            dimText = Text.translate("milf.ore_tooltip.nether").red(); break;
                    case 'eternal_starlight': dimText = Text.translate("milf.ore_tooltip.eternal_starlight").lightPurple(); break;
                    case 'deeper_down':       dimText = Text.translate("milf.ore_tooltip.deeper_down").darkPurple(); break;
                    case 'the_end':           dimText = Text.translate("milf.ore_tooltip.the_end").blue(); break;
                    case 'crimson_veil':      dimText = Text.translate("milf.ore_tooltip.crimson_veil").darkRed(); break;
                    default:                  dimText = Text.translate("milf.ore_tooltip.overworld").green();
                }
                event.add(item, { shift: true }, dimText.copy().append(Text.of(` Y: ${loc.min} ~ ${loc.max}`).gold()));
            });
        });
    };

    const addQuarryOre = (items) => {
        const itemList = Array.isArray(items) ? items : [items];
        itemList.forEach(item => {
            event.add(item, { shift: false }, hint);
            event.add(item, { shift: true }, Text.translate("milf.ore_tooltip.quarry_only").gold());
        });
    };

    const OW = (min, max) => ({ dim: 'overworld', min: min, max: max });
    const NE = (min, max) => ({ dim: 'nether', min: min, max: max });
    const ES = (min, max) => ({ dim: 'eternal_starlight', min: min, max: max });
    const DD = (min, max) => ({ dim: 'deeper_down', min: min, max: max });
    const EN = (min, max) => ({ dim: 'the_end', min: min, max: max });
    const CV = (min, max) => ({ dim: 'crimson_veil', min: min, max: max });

    // ── Vanilla ──────────────────────────────────────────────────────────────
    addOre(['minecraft:coal_ore', 'minecraft:deepslate_coal_ore'], [OW(0, 80)]);
    addOre(['minecraft:iron_ore', 'minecraft:deepslate_iron_ore'], [OW(-64, 64)]);
    addOre(['minecraft:copper_ore', 'minecraft:deepslate_copper_ore'], [OW(-16, 64)]);
    addOre(['minecraft:gold_ore', 'minecraft:deepslate_gold_ore'], [OW(8, 32)]);
    addOre(['minecraft:diamond_ore', 'minecraft:deepslate_diamond_ore'], [OW(-64, 16)]);
    addOre(['minecraft:redstone_ore', 'minecraft:deepslate_redstone_ore'], [OW(-32, 16)]);
    addOre(['minecraft:lapis_ore', 'minecraft:deepslate_lapis_ore'], [OW(-32, 16)]);
    addOre(['minecraft:emerald_ore', 'minecraft:deepslate_emerald_ore'], [OW(-16, 16)]);
    addOre('minecraft:nether_quartz_ore', [NE(8, 118)]);
    addOre('minecraft:nether_gold_ore', [NE(8, 118)]);

    // ── Modern Industrialization ─────────────────────────────────────────────
    addOre(['modern_industrialization:bauxite_ore', 'modern_industrialization:deepslate_bauxite_ore'], [OW(32, 64)]);
    addOre(['modern_industrialization:lignite_coal_ore', 'modern_industrialization:deepslate_lignite_coal_ore'], [OW(0, 80)]);
    addOre(['modern_industrialization:nickel_ore', 'modern_industrialization:deepslate_nickel_ore'], [OW(-64, 64)]);
    addOre(['modern_industrialization:lead_ore', 'modern_industrialization:deepslate_lead_ore'], [OW(-64, 64)]);
    addOre(['modern_industrialization:antimony_ore', 'modern_industrialization:deepslate_antimony_ore'], [OW(-64, 64)]);
    addOre(['modern_industrialization:tin_ore', 'modern_industrialization:deepslate_tin_ore'], [OW(-64, 64)]);
    addOre(['modern_industrialization:salt_ore', 'modern_industrialization:deepslate_salt_ore'], [OW(-64, 64)]);
    addOre(['modern_industrialization:monazite_ore', 'modern_industrialization:deepslate_monazite_ore'], [OW(-64, 24)]);
    addOre('modern_industrialization:quartz_ore', [OW(-64, 16)]);
    addOre('modern_industrialization:iridium_ore', [OW(-64, 16)]);
    addOre(['modern_industrialization:uranium_ore', 'modern_industrialization:deepslate_uranium_ore'], [OW(-64, 16)]);
    addOre(['modern_industrialization:tungsten_ore', 'modern_industrialization:deepslate_tungsten_ore'], [OW(-64, 20)]);
    // Meh but yeah ٩(｡•́‿•̀｡)۶
    event.add('modern_industrialization:raw_silver', { shift: false }, hint);
    event.add('modern_industrialization:raw_silver', { shift: true }, Text.translate("milf.ore_tooltip.silver_byproduct").gold());

    // ── Quarry-only ──────────────────────────────────────────────────────────
    addQuarryOre('modern_industrialization:platinum_ore');
    addQuarryOre('modern_industrialization:titanium_ore');

    // ── Spectrum ────────────────────────────────────────────────────
    addOre(['spectrum:azurite_ore', 'spectrum:deepslate_azurite_ore'], [ES(-64, -32)]);
    addOre(['spectrum:shimmerstone_ore', 'spectrum:deepslate_shimmerstone_ore', 'spectrum:blackslag_shimmerstone_ore'], [OW(-12, 128), ES(-16, 128), DD(-16, 128)]);
    addOre('spectrum:paltaeria_ore', [EN(0, 255)]);
    addOre('spectrum:stratine_ore', [NE(4, 63)]);
    addOre(['spectrum:malachite_ore', 'spectrum:deepslate_malachite_ore', 'spectrum:blackslag_malachite_ore'], [DD(-316, -256)]);

    // ── Malum ────────────────────────────────────────────────────
    addOre(['malum:brilliant_stone', 'malum:brilliant_deepslate'], [ES(-64, 40)]);
    addOre(['malum:natural_quartz_ore', 'malum:deepslate_quartz_ore'], [ES(-64, 10)]);
    addOre(['malum:soulstone_ore', 'malum:deepslate_soulstone_ore'], [ES(-64, 100)]);
    addOre(['malum:cthonic_gold_ore', 'minecraft:deepslate_gold_ore'], [ES(-64, 40)]);
    addOre('malum:blazing_quartz_ore', [NE(-16, 112)]);

    // Removed
    // ── Evilcraft ────────────────────────────────────────────────────
    // addOre(['evilcraft:dark_ore_deepslate', 'evilcraft:dark_ore'], [CV(-64, 80)]);
})
