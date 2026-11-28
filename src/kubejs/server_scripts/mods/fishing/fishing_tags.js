// Mod compat with starcatcher
ServerEvents.tags('item', event => {
    event.add("aquaculture:aquaculture_fishes", ['aquaculture:starshell_turtle', 'aquaculture:arrau_turtle', 'aquaculture:box_turtle', 'aquaculture:goldfish', 'aquaculture:leech', 'aquaculture:tuna', 'aquaculture:red_grouper', 'aquaculture:jellyfish', 'aquaculture:red_shrooma', 'aquaculture:brown_shrooma', 'aquaculture:tambaqui', 'aquaculture:piranha', 'aquaculture:arapaima', 'aquaculture:perch', 'aquaculture:muskellunge', 'aquaculture:minnow', 'aquaculture:gar', 'aquaculture:catfish', 'aquaculture:carp', 'aquaculture:brown_trout', 'aquaculture:bluegill', 'aquaculture:smallmouth_bass', 'aquaculture:synodontis', 'aquaculture:capitaine', 'aquaculture:bayad', 'aquaculture:boulti', 'aquaculture:rainbow_trout', 'aquaculture:pollock', 'aquaculture:pink_salmon', 'aquaculture:atlantic_herring', 'aquaculture:atlantic_halibut', 'aquaculture:pacific_halibut', 'aquaculture:blackfish', 'aquaculture:atlantic_cod'])
    //TODO fix displaying in future 


    // event.add("starcatcher:epic_fishes", "")
    event.add("starcatcher:rare_fishes", "spectrum:koi")
    event.add("starcatcher:common_fishes", "spectrum:crawfish")
    event.add("milf:fishes/amethyst", [
        "starcatcher:amethystback",
        "starcatcher:bright_amethyst_snapper",
        "starcatcher:dark_amethyst_snapper",
        "starcatcher:geode_eel",
    ])
    event.add("milf:fishes/frozen", [
        "starcatcher:frostgill_chub",
        "starcatcher:frostjaw_trout",
        "starcatcher:cryospine",
        "starcatcher:icetooth_sturgeon",
        "starcatcher:wintery_pike",
        "starcatcher:blue_ice_pike",
    ])
    event.add("milf:fishes/mossy", [
        "starcatcher:vivid_moss",
        "starcatcher:mossfin",
        "starcatcher:sludge_catfish",
        "starcatcher:sporefish",
        "starcatcher:lush_pike",
    ])
    event.add("milf:fishes/stone", [
        "starcatcher:rockgill",
        "starcatcher:stonefish",
        "starcatcher:deepslatefish",
    ])
    event.add("milf:fishes/iron", [
        "starcatcher:ironjaw_herring",
    ])
    event.add("milf:fishes/dripstone", [
        "starcatcher:dripfin",
    ])
    event.add("milf:fishes/golden", [
        "starcatcher:gold_fan",
        "starcatcher:peakdweller",
    ])
    event.add("milf:fishes/echo", [
        "starcatcher:sculkfish",
        "starcatcher:shadowfin",
    ])
})