MoreJS.villagerTrades(event => {
    event.removeModdedTypedTrades([
        "immersiveengineering:outfitter",
        "immersiveengineering:gunsmith",
        "immersiveengineering:electrician",
        "immersiveengineering:machinist",
        "immersiveengineering:engineer",
        "ae2:fluix_researcher",
        "ars_nouveau:shady_wizard",
    ], [1, 5]
    )

})

MoreJS.updateOffer(event => {
    
    if (event.offer.result.id === "tide:village_fishing_rod") {
        event.cancel()
    }

})