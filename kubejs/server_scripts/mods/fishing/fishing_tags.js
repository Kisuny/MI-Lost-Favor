// Mod compat with starcatcher
ServerEvents.tags('item', event => {
    event.removeAll('tide:bait_plants')
    event.add("tide:fish", ["#starcatcher:starcaught_fishes", "#aquaculture:aquaculture_fishes"])
    event.add("aquaculture:aquaculture_fishes", ['aquaculture:starshell_turtle', 'aquaculture:arrau_turtle', 'aquaculture:box_turtle', 'aquaculture:goldfish', 'aquaculture:leech', 'aquaculture:tuna', 'aquaculture:red_grouper', 'aquaculture:jellyfish', 'aquaculture:red_shrooma', 'aquaculture:brown_shrooma', 'aquaculture:tambaqui', 'aquaculture:piranha', 'aquaculture:arapaima', 'aquaculture:perch', 'aquaculture:muskellunge', 'aquaculture:minnow', 'aquaculture:gar', 'aquaculture:catfish', 'aquaculture:carp', 'aquaculture:brown_trout', 'aquaculture:bluegill', 'aquaculture:smallmouth_bass', 'aquaculture:synodontis', 'aquaculture:capitaine', 'aquaculture:bayad', 'aquaculture:boulti', 'aquaculture:rainbow_trout', 'aquaculture:pollock', 'aquaculture:pink_salmon', 'aquaculture:atlantic_herring', 'aquaculture:atlantic_halibut', 'aquaculture:pacific_halibut', 'aquaculture:blackfish', 'aquaculture:atlantic_cod'])
    //TODO fix displaying in future 
    // event.add("starcatcher:placeable_in_display", "#tide:fish")


    // event.add("starcatcher:epic_fishes", "")
    event.add("starcatcher:rare_fishes", "spectrum:koi")
    event.add("starcatcher:common_fishes", "spectrum:crawfish")
})