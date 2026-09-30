ServerEvents.tags('block', event => {

    //TODO: immersive_aircraft But is that really necessary? Any aircraft can be stolen
    event.add("ftbchunks:interact_whitelist",
        [
            '#waystones:is_teleport_target',
            'javd:portal_block',
            '#lootr:containers',
            'yigd:grave',
        ]
    )
})

ServerEvents.tags('entity_type', event => {

    event.add("ftbchunks:entity_interact_whitelist",
        [
            'hexerei:broom',  
            '#c:boats',
            'smallships:drakkar',
            'smallships:brigg',
            'smallships:galley',
            'smallships:cog',
            'smallships:cog',
        ]
    )
})