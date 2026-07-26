ServerEvents.recipes(event => {
    event.smelting("minecraft:cooked_chicken", "ars_nouveau:starbuncle_charm")
    event.smelting("minecraft:cooked_cod", "ars_elemental:siren_charm")
    event.smelting("minecraft:stick", "ars_nouveau:whirlisprig_charm")
    event.smelting("rocks:seashell", "ars_nouveau:alakarkinos_charm")
    event.remove({output: "starbunclemania:drygmy_horns"})
    event.smelting("starbunclemania:drygmy_horns", "ars_nouveau:drygmy_charm")

})