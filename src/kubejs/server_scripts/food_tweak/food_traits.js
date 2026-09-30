// [WIP]

// const FOOD_CATEGORIES = [
//     { id: 'fruit', tag: 'c:foods/fruit' },
//     { id: 'cooked_meats', tag: 'c:foods/cooked_meats' },
//     { id: 'bread', tag: 'c:foods/bread' },
// ]

// const INTOLERANCE_HUNGER_PENALTY = 2
// const INTOLERANCE_SATURATION_PENALTY = 1.5
// const PRIORITY_HUNGER_BONUS = 1
// const PRIORITY_SATURATION_BONUS = 1

// function getFoodLevel(player) {
//     try { return player.foodData.getFoodLevel() } catch (e) { return player.foodData.foodLevel }
// }

// function setFoodLevel(player, value) {
//     const clamped = Math.max(0, Math.min(20, Math.round(value)))
//     try { player.foodData.setFoodLevel(clamped) } catch (e) { player.foodData.foodLevel = clamped }
// }

// function getSaturation(player) {
//     try { return player.foodData.getSaturationLevel() } catch (e) { return player.foodData.saturationLevel }
// }

// function setSaturation(player, value) {
//     const clamped = Math.max(0, value)
//     try {
//         player.foodData.setSaturation(clamped)
//     } catch (e) {
//         try { player.foodData.setSaturationLevel(clamped) } catch (e2) { player.foodData.saturationLevel = clamped }
//     }
// }

// function adjustFoodData(player, hungerDelta, saturationDelta) {
//     setFoodLevel(player, getFoodLevel(player) + hungerDelta)
//     setSaturation(player, getSaturation(player) + saturationDelta)
// }

// PlayerEvents.loggedIn(event => {
//     const player = event.player
//     if (!player || player.persistentData.getBoolean('food_traits_rolled')) return
//     player.persistentData.putBoolean('food_traits_rolled', true)

//     const pool = FOOD_CATEGORIES.map(category => category.id)
//     const intolerance = pool[Math.floor(Math.random() * pool.length)]
//     let priority = pool[Math.floor(Math.random() * pool.length)]
//     while (priority === intolerance && pool.length > 1) {
//         priority = pool[Math.floor(Math.random() * pool.length)]
//     }

//     player.persistentData.putString('food_intolerance', intolerance)
//     player.persistentData.putString('food_priority', priority)

//     const traitsMessage = Text.translatable(`milf.food.traits_rolled.${priority}.${intolerance}`)
//     player.tell(traitsMessage)
//     sendImmersiveMessage(
//         traitsMessage,
//         player,
//         DEFAULT_MILESTONE_NOTIFICATION_STYLE,
//         event.server
//     )
// })

// ItemEvents.foodEaten(event => {
//     const player = event.player
//     const item = event.item
//     if (!player) return

//     const intolerance = player.persistentData.getString('food_intolerance')
//     const priority = player.persistentData.getString('food_priority')
//     if (!intolerance && !priority) return

//     const tags = item.tags.toArray()

//     const intoleranceCategory = FOOD_CATEGORIES.find(category => category.id === intolerance)
//     if (intoleranceCategory && tags.includes(intoleranceCategory.tag)) {
//         adjustFoodData(player, -INTOLERANCE_HUNGER_PENALTY, -INTOLERANCE_SATURATION_PENALTY)
//     }

//     const priorityCategory = FOOD_CATEGORIES.find(category => category.id === priority)
//     if (priorityCategory && tags.includes(priorityCategory.tag)) {
//         adjustFoodData(player, PRIORITY_HUNGER_BONUS, PRIORITY_SATURATION_BONUS)
//     }
// })
