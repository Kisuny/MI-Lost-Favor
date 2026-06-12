// There's too much clutter here; we'll have to reorganize everything in the future to make it more read-friendly.

ItemEvents.modifyTooltips(event => {
    //#region simple shift text
    // tooltip: "hold SHIFT for more information" displaying a simple lang code when the SHIFT key is pressed
    let simpleShiftText = (args) => {
        const raw = args.items ?? args.item;
        const items = Array.isArray(raw) ? raw : [raw];

        const hint = Text.translate("milf.press_button").color("#f5c25b")
            .append(Text.of("Shift ").bold().color("#ffb319"))
            .append(Text.translate("milf.for_details").color("#f5c25b"));

        const details = Text.translate(args.text).color(args.color);

        items.forEach(item => {
            event.add(item, { shift: false }, hint);
            event.add(item, { shift: true }, details);
        });
    };

    simpleShiftText({ item: "milf:amber_visage", text: "milf.amber_visage.tooltip", color: "#5ca5e0" })
    simpleShiftText({ item: "ars_elemental:curio_bag", text: "milf.curio_bag.tooltip", color: "#f5c25b" })
    simpleShiftText({ item: "ars_elemental:caster_bag", text: "milf.curio_bag.tooltip", color: "#f5c25b" })
    simpleShiftText({ item: "milf:blaze_core", text: "milf.how_to_get_blaze_core.tooltip", color: "#645D89" })
    simpleShiftText({ item: "milf:electronic_ender_core", text: "milf.how_to_get_electronice_ender_core.tooltip", color: "#645D89" })
    simpleShiftText({ item: "milf:crimson_veil_elixir", text: "milf.crimson_veil_elixir.tooltip", color: "#A71237" })
    event.add("#magnumtorch:torches", Text.translate("milf.mi_pipe_recolor.tooltip").color("#8F19A2"));
    
    //#region

    //#region various changes

    // very cursed item, when insert text in 2-line - text appears explaining how to use the item, without the tooltip, this text is not displayed 🤯 
    event.modify("devices:magical_pouch", tooltip => { 
        tooltip.insert(3, Text.translate("milf.money_pouch.tooltip").color("#f5c25b")) 
    })

    event.modify("devices:devices_pouch", tooltip => { 
        tooltip.removeLine(2)
        tooltip.insert(2, Text.translate("milf.money_pouch.tooltip").color("#f5c25b")) 
    })
    

    //#region

    //#region Seeds
    const seeds_tooltip = [
        'rusticdelight:cotton_seeds',
        'rusticdelight:bell_pepper_seeds',
        'fruitsdelight:durian_sapling',
        'fruitsdelight:lemon_seeds',
        'fruitsdelight:hamimelon_seeds',
        'enchanted:water_artichoke_seeds',
        'enchanted:snowbell_seeds',
        'minecraft:wheat_seeds',
        'minecraft:pumpkin_seeds',
        'minecraft:melon_seeds',
        'minecraft:beetroot_seeds',
        'supplementaries:flax_seeds',
        'immersiveengineering:seed',
        'hexerei:sage_seed',
        'farmersdelight:cabbage_seeds',
        'farmersdelight:tomato_seeds',
        'enchanted:wolfsbane_seeds',
        'hexerei:belladonna_plant',
        'hexerei:mandrake_plant',
    ];

    seeds_tooltip.forEach(seed => {
        event.add(seed, Text.translate("milf.how_to_seed.tooltip").color("#43BD24"));
    });
    //#region

    //#region Orbs
    const orbs = ['milf:transmutation_orb', 'milf:orb_of_annulment', 'milf:orb_of_alchemy', 'milf:orb_of_regret', 'milf:regal_orb', 'milf:orb_of_corruption', 'milf:divine_orb', 'milf:orb_of_chance', "milf:orb_of_the_forest"]

    orbs.forEach(orb => {
        event.add(orb, Text.translatable(`milf.orbcraft.tooltip.${orb.slice(5)}`))
    })
    simpleShiftText({ item: "milf:orb_of_the_forest", text: "milf.orb_of_the_forest.tooltip", color: "#1CC433" })

    //#region

    event.add("milf:mi_upgrader", Text.translatable(`milf.mi_upgrader.tooltip`))

    event.add("milf:grecall_concoction_t1", Text.translatable(`milf.grecall_concoction.t1.tooltip`))
    event.add("milf:grecall_concoction_t2", Text.translatable(`milf.grecall_concoction.t2.tooltip`))

    event.add("milf:divine_mint", Text.translatable(`milf.divine_mint.tooltip`))


    //#region WIP items tooltip
    const wip_tooltip = [
        /fluxnetworks:.*/,
        /replication:.*/,
    ]
    wip_tooltip.forEach(element => {
        event.add(element, Text.of(textAnimatorString("[Work in progress]", "glitch")).color("#CC4D4D"))
    });
    //#region

    //#region You can interact with this in the claimed chunks
    const claim_interact_tooltip = [
         'hexerei:witch_hazel_broom',
         'hexerei:willow_broom', 
         'hexerei:mahogany_broom',
         '#waystones:is_teleport_target',
         '#minecraft:boats',
         '#lootr:containers',
         'yigd:grave',
         '#smallships:ships',
        ]
    claim_interact_tooltip.forEach(element => {
        event.add(element, Text.of(textAnimatorString("🛈 You can interact with this in the claimed chunks", "fade")).color("#4EC847"))
    });
    
    //#region

})