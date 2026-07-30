ItemEvents.modifyTooltips(event => {

    event.add("milf:mi_upgrader", Text.translatable(`milf.mi_upgrader.tooltip`))
    event.add("milf:ms_s_second_order", Text.translatable(`milf.ms_s_second_order.tooltip`))

    event.add("milf:grecall_concoction_t1", Text.translatable(`milf.grecall_concoction.t1.tooltip`))
    event.add("milf:grecall_concoction_t2", Text.translatable(`milf.grecall_concoction.t2.tooltip`))

    event.add("milf:divine_mint", Text.translatable(`milf.divine_mint.tooltip`))

    const orbs = [
        'milf:transmutation_orb', 
        'milf:orb_of_annulment', 
        'milf:orb_of_alchemy', 
        'milf:orb_of_regret', 
        'milf:regal_orb', 
        'milf:orb_of_corruption', 
        'milf:divine_orb', 
        'milf:orb_of_chance', 
        "milf:orb_of_the_forest"
    ]

    orbs.forEach(orb => {
        event.add(orb, Text.translatable(`milf.orbcraft.tooltip.${orb.slice(5)}`))
    })

    Object.entries(global.creditCustomStuff).forEach(([id, langKey]) => {
        event.add(id, Text.translatable(langKey))
    })


})
