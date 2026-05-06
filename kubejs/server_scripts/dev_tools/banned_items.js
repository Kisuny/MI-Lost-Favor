let bannedItems = [
  ['mowziesmobs:elokosa_paw_full', 'Server crash'],
  ['mowziesmobs:elokosa_paw_gibbous', 'Server crash'],
  ['mowziesmobs:elokosa_paw_half', 'Server crash'],
  ['mowziesmobs:elokosa_paw_crescent', 'Server crash'],
  ['mowziesmobs:elokosa_paw_new', 'Server crash'],
];

const bannedMessage = (player, id, reason) => {
  player.tell([
    "Item ",
    Text.yellow(id.split(":")[1]),
    " has been ",
    Text.red("temporarily removed"),
    ".\nReason: ",
    Text.red(reason),
  ]);
};

bannedItems.forEach((pair) => {
  PlayerEvents.inventoryChanged(pair[0], event => {
    bannedMessage(event.player, pair[0], pair[1]);
    event.player.inventory.removeItem(event.getSlot(), event.item.count);
    event.player.inventory.clear(pair[0]);
  });

  ItemEvents.rightClicked(pair[0], event => {
    bannedMessage(event.player, pair[0], pair[1]);
    event.player.inventory.clear(pair[0]);
  });
});
