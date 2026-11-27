ServerEvents.tags('block', event => {

    event.add("milf:claim_interact_whitelist",
        [
            '#waystones:is_teleport_target',
            'javd:portal_block',
            '#lootr:containers',
            'yigd:grave',
        ]
    )
})

ServerEvents.tags('entity_type', event => {

    event.add("milf:claim_entity_interact_whitelist",
        [
            'hexerei:broom',  
            '#c:boats',
            'smallships:drakkar',
            'smallships:brigg',
            'smallships:galley',
            'smallships:cog',
            'smallships:caravel',
            'smallships:dhow',
            'smallships:galleon',
            'smallships:rowboat',
            'smallships:war_galley',
            'minecraft:horse',
            'minecraft:donkey',
            'minecraft:mule',
            'minecraft:pig',
            'minecraft:strider',
        ]
    )
})