// Mod compat with starcatcher
ServerEvents.recipes(event => {
    const removeById = [
        "farmersdelight:cutting/fish_slice_cutting",
    ]

    removeById.forEach(id => {
        event.remove({ id: id });
    });

    event.remove({
        output: [
            "tide:fishing_hook",
            "tide:iron_fishing_hook",
            "tide:lavaproof_fishing_hook",
            /tide:.*_fishing_bobber/,
            /tide:.*_fishing_rod/,
            /tide:.*_line/,
            'tide:wooden_crate', 
            'tide:obsidian_crate', 
            'tide:purpur_crate', 
            'tide:angling_table',
            'tide:fishing_journal',
            /tide:.*_bait/,
        ]
    })


    event.replaceOutput({ output: 'tide:cooked_fish' }, 'tide:cooked_fish', 'starcatcher:cooked_starcaught_fish')




});

