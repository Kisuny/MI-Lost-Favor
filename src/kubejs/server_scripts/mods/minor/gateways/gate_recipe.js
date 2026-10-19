const customGateRecipe = (event, args) => {
    event.custom({
        "type": "gateways:gate_recipe",
        "group": "gateways",
        "pattern": args.pattern,
        "key": args.keys,
        "result": {
            "id": "gateways:gate_pearl"
        },
        "gateway": args.gateway
    });
};

ServerEvents.recipes(event => {


    customGateRecipe(event, {
        gateway: "gateways:basic/deer",
        pattern: [
            "B#B",
            "#A#",
            "B#B"
        ],
        keys: {
            "#": {
                "item": "ytech:antler"
            },
            "A": {
                "item": "modern_industrialization:bronze_plate"
            },
            "B": {
                "item": "minecraft:leather"
            }
        }
    })
    
    customGateRecipe(event, {
        gateway: "gateways:basic/villager",
        pattern: [
            "B#B",
            "#A#",
            "B#B"
        ],
        keys: {
            "#": {
                "item": "devices:gold_coin"
            },
            "A": {
                "item": "modern_industrialization:bronze_plate"
            },
            "B": {
                "item": "minecraft:emerald"
            }
        }
    })

    customPedestalCraft(event, {
        time: 800,
        tier: "basic",
        experience: 2.0,
        citrine: 12,
        topaz: 8,
        amethyst: 24,
        pattern: [
            'rtr',
            'qeq',
            'www'
        ],
        key: {
            q: 'enchanted:foul_fume',
            w: 'apotheosis:gem_dust',
            e: '#c:ender_pearls',
            r: 'crittersandcompanions:dragonfly_wing',
            t: 'milf:recall_concoction',
        },
        result: {
            "id": "gateways:gate_pearl",
            "count": 1,
            "components": {
                "gateways:gateway": "gateways:tiered/haven"
            }
        },
        advancement: "spectrum:place_pedestal"
    });

    customPedestalCraft(event, {
        time: 1200,
        tier: "advanced",
        experience: 10.0,
        citrine: 30,
        topaz: 30,
        amethyst: 30,
        onyx: 10,
        pattern: [
            'qtq',
            'ewe',
            'rrr'
        ],
        key: {
            q: 'spectrum:raw_azurite',
            w: 'thaumaturge:primordial_pearl',
            e: 'toxony:warproot',
            r: 'apotheosis:gem_dust',
            t: 'cognition:cognitive_crystal',
        },
        result: {
            "id": "gateways:gate_pearl",
            "count": 1,
            "components": {
                "gateways:gateway": "gateways:tiered/legends"
            }
        },
        advancement: "spectrum:create_onyx_shard"
    });

})
