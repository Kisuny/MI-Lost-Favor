ServerEvents.tags('item', event => {
    event.add('c:ropes', "paganbless:rope")
})

ServerEvents.tags('block', event => {
    event.add('milf:rune_slabs', [
        'paganbless:rune_slab_cinnabar',
        'paganbless:rune_slab_amethyst',
        'paganbless:rune_slab_diamond',
        'paganbless:rune_slab_emerald',
        'paganbless:rune_slab_lapis',
        'paganbless:rune_slab_quartz'
    ])
})
