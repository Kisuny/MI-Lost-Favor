ItemEvents.modifyTooltips(event => {

    const remove_tooltips = [
        {name: 'hexerei:sage_seed', line: 1},
        // {name: 'devices:devices_pouch', line: 2},
        {name: 'devices:magical_pouch', line: 2},
        {name: 'ars_elemental:curio_bag', line: 2},
        {name: 'ars_elemental:caster_bag', line: 2},
    ];

    remove_tooltips.forEach(item => {
        event.modify(item.name, tooltip => {
            tooltip.removeLine(item.line);
        });
    });
});