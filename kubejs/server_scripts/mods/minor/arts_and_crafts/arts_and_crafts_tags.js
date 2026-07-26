ServerEvents.tags('item', event => {
    event.add('arts_and_crafts:chalks', [/^arts_and_crafts:[a-z_]*chalk$/])
    event.add('arts_and_crafts:plasters', [/^arts_and_crafts:[a-z_]*plaster$/])
    event.add('arts_and_crafts:flower_pots', [/^arts_and_crafts:[a-z_]*flower_pot$/])
    event.add('arts_and_crafts:mud_bricks', [/^arts_and_crafts:[a-z_]*mud_bricks$/])
})
