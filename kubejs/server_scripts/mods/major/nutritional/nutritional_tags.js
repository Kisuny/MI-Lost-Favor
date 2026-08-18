ServerEvents.tags('item', event => {

    event.add('nutritional:nutrient/source', ['#ars_nouveau:magic_food'])

    event.add('nutritional:nutrient/fruit', [
        '#arsdelight:jelly',

        'arsdelight:mendosteen_pie_slice',
        'arsdelight:bastion_pie_slice',
        'arsdelight:bombegrante_pie_slice',
        'arsdelight:frostaya_pie_slice',
        'arsdelight:flashpine_pie_slice',
        'arsdelight:dawnberry_pie_slice',
        'arsdelight:lightchee_pie_slice',
        'arsdelight:source_berry_pie_slice',

        'arsdelight:source_berry_cookie',

        'arsdelight:mendosteen_tea',
        'arsdelight:bastion_tea',
        'arsdelight:bombegrante_tea',
        'arsdelight:frostaya_tea',
        'arsdelight:source_berry_tea',

        'arsdelight:mendosteen_hornbeer',
        'arsdelight:bastion_hornbeer',
        'arsdelight:bombegrante_hornbeer',
        'arsdelight:frostaya_hornbeer',
        'arsdelight:source_berry_hornbeer',

        'arsdelight:activated_mendosteen_jam',
        'arsdelight:activated_bastion_jam',
        'arsdelight:neutralized_bombegrante_jam',
        'arsdelight:neutralized_frostaya_jam',
        'arsdelight:source_berry_jam',
    ])

    event.add('nutritional:nutrient/protein', [
        '#arsdelight:raw_wilden_meat',
        '#arsdelight:cooked_wilden_meat',
        '#arsdelight:raw_chimera',
        '#arsdelight:cooked_chimera',

        'arsdelight:wilden_skewer',
        'arsdelight:grilled_wilden_skewer',
        'arsdelight:chimera_skewer',
        'arsdelight:grilled_chimera_skewer',

        'arsdelight:wilden_sauce',

        'arsdelight:arch_soup',
        'arsdelight:wilden_stew',
        'arsdelight:bowl_of_wilden_salad',
        'arsdelight:bowl_of_honey_glazed_chimera',

        'arsdelight:mendosteen_chicken',
        'arsdelight:bastion_pork',
        'arsdelight:bombegrante_steak',
        'arsdelight:frostaya_mutton',
    ])

    event.add('nutritional:nutrient/grain', [
        'arsdelight:mendosteen_pie_slice',
        'arsdelight:bastion_pie_slice',
        'arsdelight:bombegrante_pie_slice',
        'arsdelight:frostaya_pie_slice',
        'arsdelight:flashpine_pie_slice',
        'arsdelight:dawnberry_pie_slice',
        'arsdelight:lightchee_pie_slice',
        'arsdelight:source_berry_pie_slice',

        'arsdelight:source_berry_cookie',
        'arsdelight:source_berry_cupcake',
        'arsdelight:horn_roll',
    ])

    event.add('nutritional:nutrient/vegetable', [
        'arsdelight:arch_sauce',
        'arsdelight:arch_soup',
        'arsdelight:wilden_stew',
        'arsdelight:bowl_of_wilden_salad',
    ])

    event.add('nutritional:nutrient/dairy', [
        'arsdelight:source_berry_cupcake',
    ])

})
