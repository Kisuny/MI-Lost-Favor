ServerEvents.tags('item', event => {
    event.add("milf:runes", ['milf:rune_of_piercing', 'milf:rune_of_armor', 'milf:rune_of_bloodshed', 'milf:rune_of_diversity', 'milf:rune_of_fishing', 'milf:rune_of_mining'])

    event.add("milf:sweet_berries", ["minecraft:sweet_berries", "toxony:false_berries"])

    event.add("milf:multiblock_items", [/^milf:[a-z0-9_]+(placer|empty_box)$/])

    const chiselMaterials = [
        'andesite', 'black_concrete', 'blue_concrete', 'bricks', 'brown_concrete',
        'coal_block', 'cobblestone', 'cyan_concrete', 'deepslate', 'diorite',
        'dirt', 'emerald_block', 'end_stone', 'glass', 'glowstone', 'gold_block',
        'granite', 'gray_concrete', 'green_concrete', 'ice', 'iron_block',
        'lapis_block', 'light_blue_concrete', 'light_gray_concrete', 'lime_concrete',
        'magenta_concrete', 'nether_brick', 'orange_concrete', 'pink_concrete',
        'prismarine', 'purple_concrete', 'purpur', 'quartz', 'red_concrete',
        'red_sandstone', 'redstone_block', 'sandstone', 'stone',
        'white_concrete', 'yellow_concrete',
    ]

    const chippedExclusions = {
        'stone':         '(?!.*end_stone)',
        'blue_concrete': '(?!.*light_blue_concrete)',
        'gray_concrete': '(?!.*light_gray_concrete)',
        'sandstone':     '(?!.*red_sandstone)',
        'granite':       '(?!.*dripstone)',
    }

    chiselMaterials.forEach(material => {
        const excl = chippedExclusions[material] || ''
        event.add(`milf:chisel_${material}`, [
            new RegExp(`^rechiseled:${material}(?!.*(?:stairs?|slab))[a-z_]*$`),
            new RegExp(`^chipped:${excl}(?!.*(?:stairs?|slab))(?:[a-z]+_)*${material}(?:_[a-z]+)*$`),
            `#chisel:${material}`,
        ])
    })

})
