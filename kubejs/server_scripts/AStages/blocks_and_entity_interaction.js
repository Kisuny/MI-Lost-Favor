const item_interact_block = [
    { id: "blast_furnace", item: "minecraft:blast_furnace", stage: "blast_furnace" },
    { id: "spawner", item: "minecraft:spawner", stage: "early_items" },
    { id: "iron_nugget", item: "minecraft:iron_nugget", stage: "post_iron" },
    { id: "iron_block", item: "minecraft:iron_block", stage: "post_iron" },
    { id: "gold_nugget", item: "minecraft:gold_nugget", stage: "post_iron" },
    { id: "gold_block", item: "minecraft:gold_block", stage: "post_iron" },
    { id: "augmenting_table", item: "apotheosis:augmenting_table", stage: "apotheosis_augmenting_table" },
    { id: "reforging_table", item: "apotheosis:reforging_table", stage: "apotheosis_reforging_table" },
    { id: "simple_reforging_table", item: "apotheosis:simple_reforging_table", stage: "apotheosis_simple_reforging_table" },
    { id: "trading_post", item: "tradingpost:trading_post", stage: "early_items" },
]

const entity_interact_block = [
    { id: "gatekeeper", entity: "eternal_starlight:the_gatekeeper", langKey: "entity.eternal_starlight.the_gatekeeper", stage: "the_gatekeeper" },
    { id: "villager", entity: "minecraft:villager", langKey: "entity.minecraft.villager", stage: "early_items" },
    { id: "wandering_trader", entity: "minecraft:wandering_trader", langKey: "entity.minecraft.wandering_trader", stage: "early_items" },
]


item_interact_block.forEach(element => {
    let itemName = Item.of(element.item).hoverName

    AStages.addRestrictionForItem(`astages/${element.id}`, element.stage, element.item)
        .pickupDelay(60)
        .disableBlockInteraction()
        .useMessage(() => Text.of(
            [
                [
                    Text.translate("milf.text.entity.interact.part2").gray(),
                    itemName
                ]
            ]
        ).darkGray())
});

entity_interact_block.forEach(element => {
    if (element.customeText) {
        AStages.addRestrictionForMob(`astages/${element.id}`, element.stage, element.entity)
            .interactionMessage(() => Text.of(
                [
                    Text.translate(element.customeText).gray(),
                    Text.translate(element.langKey).darkGray(),
                ]
            ))
            .disableRightClick()
    }
    else {
        AStages.addRestrictionForMob(`astages/${element.id}`, element.stage, element.entity)
            .interactionMessage(() => Text.of(
                [
                    Text.translate("milf.text.entity.interact.part0").gray(),
                    Text.translate(element.langKey).darkGray(),
                    Text.translate("milf.text.entity.interact.part1").gray()
                ]
            ))
            .disableRightClick()
    }
});

