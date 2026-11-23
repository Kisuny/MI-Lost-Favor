ServerEvents.tags('item', event => {
    const backpacks = ['', 'copper_', 'iron_', 'gold_', 'diamond_', 'netherite_'].map(tier => `sophisticatedbackpacks:${tier}backpack`)
    const toolBelts = ['', 'copper_', 'iron_', 'gold_', 'diamond_', 'netherite_'].map(tier => `travelertoolbelt:${tier}belt`)

    event.remove('curios:back', backpacks)
    event.add('curios:backpack', backpacks)

    event.remove('curios:belt', toolBelts)
    event.add('curios:tool_belt', toolBelts)

    event.removeAll('curios:rings')
    event.add('curios:ring', 'cataclysm:ring_of_grudged')

    event.add('curios:atlas', '#milf:atlases')
    event.add('curios:time_sand_pouch', 'gag:time_sand_pouch')
    event.add('curios:pocket_lamp', global.pocketLamps)
})
