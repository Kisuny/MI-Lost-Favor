// Mod compat with starcatcher
ServerEvents.recipes(event => {
    // const removeById = [
    //     "",
    // ]

    // removeById.forEach(id => {
    //     event.remove({ id: id });
    // });

    event.remove({
        output: [
            'aquaculture:neptunium_fishing_rod',
            'aquaculture:diamond_fishing_rod',
            'aquaculture:gold_fishing_rod',
            'aquaculture:iron_fishing_rod',
            'aquaculture:iron_hook',
            'aquaculture:gold_hook',
            'aquaculture:diamond_hook',
            'aquaculture:light_hook',
            'aquaculture:heavy_hook',
            'aquaculture:double_hook',
            'aquaculture:redstone_hook',
            'aquaculture:note_hook',
            'aquaculture:nether_star_hook',
            'aquaculture:dark_oak_fish_mount',
            'aquaculture:acacia_fish_mount',
            'aquaculture:jungle_fish_mount',
            'aquaculture:birch_fish_mount',
            'aquaculture:spruce_fish_mount',
            'aquaculture:oak_fish_mount',
            'aquaculture:bobber',
            'aquaculture:fishing_line',
            'aquaculture:worm',
            'aquaculture:tackle_box',
            'aquaculture:worm_farm',
        ]
    })


    event.replaceOutput({ output: 'tide:cooked_fish' }, 'tide:cooked_fish', 'starcatcher:cooked_starcaught_fish')




});

