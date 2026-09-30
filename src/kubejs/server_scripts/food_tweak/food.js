ItemEvents.foodEaten(event => {

  const actor = event.player;
  if (!actor) {
    return;
  }

  const player = event.player;
  let eatenItem = event.item;
  let eaten_tags = eatenItem.tags.toArray().join(', ');
  const key = 'poison_notify_count';

  const chance = Math.floor(Math.random() * 7) + 6; // 6..12
  const roll = Math.floor(Math.random() * 100) + 1; // 1..100

  let notifyCount = 0;
  notifyCount = player.persistentData.getInt(key);


  if (!eaten_tags.includes('c:foods/fruit') && !eaten_tags.includes('c:foods/vegetable')) {
    if ( roll <= chance && notifyCount > 0) {
      notifyCount--; 
      try { player.persistentData.putInt(key, notifyCount) } catch (e) { player.persistentData[key] = notifyCount }
      sendImmersiveMessage(
        Text.translatable("milf.food.feel_bit_better"), 
        event.player, 
        Object.assign({}, DEFAULT_WARN_NOTIFICATION_STYLE, {duration: 5, background: false, y: -20}), 
        event.server
      )
    }
    return;
  }

  if (roll > chance) return;

  try { notifyCount = player.persistentData.getInt(key) || 0 } catch (e) { notifyCount = player.persistentData[key] || 0 }
  notifyCount++;
  try { player.persistentData.putInt(key, notifyCount) } catch (e) { player.persistentData[key] = notifyCount }

  
  if (notifyCount === 6) {
    player.potionEffects.add('minecraft:poison', 100, 0);
    player.attack(player, 1.0) 
    sendImmersiveMessage(
      Text.translatable("milf.food.poison_1"), 
      event.player, 
      Object.assign({}, DEFAULT_WARN_NOTIFICATION_STYLE, {duration: 10, background: false, y: -20}), 
      event.server
    )
  } else if (notifyCount === 15) {
    player.potionEffects.add('minecraft:poison', 200, 0);
    player.potionEffects.add('minecraft:nausea', 100, 0);
    player.attack(player, 2.0)
    sendImmersiveMessage(
      Text.translatable("milf.food.poison_2"), 
      event.player, 
      Object.assign({}, DEFAULT_WARN_NOTIFICATION_STYLE, {duration: 15, background: false, y: -20}), 
      event.server
    )
  } else if (notifyCount === 30) {
    player.potionEffects.add('minecraft:poison', 400, 0);
    player.potionEffects.add('minecraft:slowness', 200, 1);
    player.attack(player, 4.0)
    sendImmersiveMessage(
      Text.translatable("milf.food.poison_3"), 
      event.player, 
      Object.assign({}, DEFAULT_WARN_NOTIFICATION_STYLE, {duration: 15, background: false, y: -20}), 
      event.server
    )
  } else if (notifyCount === 50) {
    player.potionEffects.add('minecraft:poison', 400, 2);
    player.potionEffects.add('minecraft:slowness', 440, 3);
    player.potionEffects.add('minecraft:nausea', 120, 0);
    player.attack(player, 6.0)
    sendImmersiveMessage(
      Text.translatable("milf.food.poison_4"), 
      event.player, 
      Object.assign({}, DEFAULT_WARN_NOTIFICATION_STYLE, {duration: 20, background: false, y: -20}), 
      event.server
    )
  } else if (notifyCount >= 100) {
    player.potionEffects.add('minecraft:poison', 1200, 2);
    player.potionEffects.add('minecraft:slowness', 1200, 4);
    player.potionEffects.add('minecraft:nausea', 1200, 0);
    player.attack(player, 15.0)
    sendImmersiveMessage(
      Text.translatable("milf.food.poison_5"), 
      event.player, 
      Object.assign({}, DEFAULT_WARN_NOTIFICATION_STYLE, {duration: 20, background: false, y: -20}), 
      event.server
    )
  } 

});

