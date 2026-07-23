ServerEvents.tags('item', event => {

    var tier1token = "milf:mysterious_disk"
    var tier2token = "milf:storage_disk"
    var tier3token = "milf:automation_disk"
    var tier4token = "milf:quantum_disk"

    var tier1recipe = "mi_lost_favor:tier_1_recipes"
    var tier2recipe = "mi_lost_favor:tier_2_recipes"
    var tier3recipe = "mi_lost_favor:tier_3_recipes"
    var tier4recipe = "mi_lost_favor:tier_4_recipes"

    event.add(tier1recipe, tier1token)
    event.add(tier1recipe, tier2token)
    event.add(tier1recipe, tier3token)
    event.add(tier1recipe, tier4token)

    event.add(tier2recipe, tier2token)
    event.add(tier2recipe, tier3token)
    event.add(tier2recipe, tier4token)

    event.add(tier3recipe, tier3token)
    event.add(tier3recipe, tier4token)

    event.add(tier4recipe, tier4token)

})