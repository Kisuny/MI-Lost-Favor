ServerEvents.tags('block', event => {

    event.add("ftbchunks:interact_whitelist",
        [
            '#waystones:is_teleport_target',
            '#lootr:containers',
            'yigd:grave',
        ]
    )
})