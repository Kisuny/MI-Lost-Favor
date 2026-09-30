MIRecipeEvents.customCondition(event => {

    event.registerWithIcon(`cd_reader`,
        (context, recipe) => {
            let block = context.level.getBlock(context.blockEntity.blockPos)
            let data = block.getEntityData()
            let upgradeCompound = data.getCompound("upgradesItemStack")
            if (!upgradeCompound) return
            let upgradeId = upgradeCompound.getString("id")

            return upgradeId == "milf:cd_reader"
        },
        Item.of("milf:cd"),
        Text.translatable(`milf.mi_condition.cd_reader`)
    )

    event.registerWithIcon(`solar_powered`,
        (context, recipe) => {
            let time = context.level.getDayTime() % 24000
            return time >= 0 && time <= 12000
        },
        Item.of("oritech:big_solar_panel_block"),
        Text.translatable(`milf.mi_condition.solar_powered`)
    )

})