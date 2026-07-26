ServerEvents.tags('item', event => {
    event.add("hexerei:brooms", [
        'hexerei:witch_hazel_broom', 
        'hexerei:willow_broom', 
        'hexerei:mahogany_broom',
    ])
    
    event.add("hexerei:willow_logs", ['hexerei:stripped_willow_wood', 'hexerei:stripped_willow_log', 'hexerei:willow_wood', 'hexerei:willow_log'])
    event.add("hexerei:witch_hazel_logs", ['hexerei:stripped_witch_hazel_wood', 'hexerei:stripped_witch_hazel_log', 'hexerei:witch_hazel_wood', 'hexerei:witch_hazel_log'])
    event.add("hexerei:mahogany_logs", ['hexerei:stripped_mahogany_wood', 'hexerei:stripped_mahogany_log', 'hexerei:mahogany_wood', 'hexerei:mahogany_log'])

    event.remove('c:enchantables', 'hexerei:broom_thruster_brush')
})
