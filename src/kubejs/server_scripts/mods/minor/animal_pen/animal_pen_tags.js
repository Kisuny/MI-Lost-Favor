ServerEvents.tags("item", event => {
  event.add("animal_pen:can_attack_aviary", "#simplyswords:swords");
  event.add("animal_pen:can_attack_aquarium", "#simplyswords:swords");
  event.add("animal_pen:can_attack_pen", "#simplyswords:swords");
});

ServerEvents.tags("entity_type", event => {
  event.add("animal_pen:animal_cage_pickable", ["spectrum:kindling", "spectrum:egg_laying_wooly_pig", "minecraft:bat"]);
  event.add("animal_pen:bird_catcher_pickable", ["minecraft:bat"]);
});