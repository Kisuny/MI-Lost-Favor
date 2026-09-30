MoreJS.updateOffer(event => {
    if (!event.isWanderer()) return
    // if (event.offer.result.id === "occultism:datura") {
    //     event.cancel()
    // }
    event.offer.replaceEmeralds(Item.of("devices:gold_coin"))

    
})

MoreJS.wandererTrades(event => {
    event.addTrade(
        2,
        [
            TradeItem.of("devices:orichalcum_coin", 2, 50),
            Item.of("minecraft:book", 1)],
        "enigmaticlegacyplus:enchantment_transposer"
    ).transform((offer) => {
        offer.maxUses = 4
    })

    event.addTrade(
        1,
        [TradeItem.of("devices:gold_coin", 5, 22)],
        TradeItem.of("clavis:lock_pick", 4, 12)
    ).transform((offer) => {
        offer.maxUses = 20
    })

    Ingredient.of("#milf:artifacts").itemIds.forEach(relicId => {
        event.addTrade(
            2,
            [
                TradeItem.of("devices:orichalcum_coin", 10, 50),
                TradeItem.of("milf:artifact_dust", 1, 8),
            ],
            relicId
        ).transform((offer) => {
            offer.maxUses = 1
        })
    })
})

