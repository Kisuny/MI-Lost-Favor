ServerEvents.generateData("after_mods", e => {
  const feeding = (foods, amount) => {
    foods = Array.isArray(foods) ? foods : [foods];
    amount = amount || 2;
    return {
      id: 'feeding',
      items: foods,
      conditions: [{ operator: '>=', value: amount, type: 'amount' }],
      even_entity_count: true,
      consumer: { limit_to_stack: true, type: 'consume' },
      cooldown: { base: 1160, delta: 20, limit: 6000, type: 'linear' },
      text_lines: [
        { result_item: foods, visibility: 'ready', short_text: 'display.animal_pen.ready', long_text: 'display.animal_pen.food_ready' },
        { result_item: foods, visibility: 'cooldown', parameters: ['[cooldown]'], short_text: 'display.animal_pen.cooldown', long_text: 'display.animal_pen.food_cooldown' },
        { result_item: foods, visibility: 'not_match', parameters: [amount.toString()], long_text: 'display.animal_pen.requires_food' }
      ],
      run_functions: [{ id: 'animal_pen:feeding' }],
      redstone_signal: 1
    };
  };

  const shearing = (loot, displayItem, tools, sound) => ({
    id: 'shearing',
    items: Array.isArray(tools) ? tools : [tools],
    consumer: { type: "damage", damage: 1 },
    cooldown: { type: "static", base: 1200 },
    loot: { id: loot, drop_limit: 320, per_entity: true },
    finish_functions: [{ id: "animal_pen:mob_set_sheared", value: false }],
    run_functions: [{ id: "animal_pen:mob_set_sheared", value: true }],
    sound: sound || 'minecraft:entity.sheep.shear',
    redstone_signal: 2,
    text_lines: [
      { result_item: [displayItem], visibility: "ready", short_text: "display.animal_pen.ready", long_text: "display.animal_pen.full_ready" },
      { result_item: [displayItem], visibility: "cooldown", parameters: ["[cooldown]"], short_text: "display.animal_pen.cooldown", long_text: "display.animal_pen.wool_cooldown" }
    ]
  });

  const milking = (loot, displayItem) => ({
    id: "milk",
    items: ['minecraft:bucket'],
    consumer: { type: "replace" },
    loot: { id: loot, drop_limit: 2147483647, per_entity: false },
    redstone_signal: 2,
    sound: "minecraft:entity.cow.milk",
    text_lines: [
      { result_item: [displayItem], visibility: "ready", short_text: "display.animal_pen.ready", long_text: "display.animal_pen.full_ready" },
      { result_item: [displayItem], visibility: "cooldown", parameters: ["[cooldown]"], short_text: "display.animal_pen.cooldown", long_text: "display.animal_pen.milk_cooldown" }
    ]
  });

  const eggs = (loot, displayItem, tools) => ({
    id: "eggs",
    items: Array.isArray(tools) ? tools : [tools],
    cooldown: { type: "linear", base: 6000, delta: -20, limit: 200 },
    loot: { id: loot, drop_limit: 80, per_entity: true },
    redstone_signal: 2,
    sound: "minecraft:entity.chicken.egg",
    text_lines: [
      { result_item: [displayItem], visibility: "ready", short_text: "display.animal_pen.ready", long_text: "display.animal_pen.full_ready" },
      { result_item: [displayItem], visibility: "cooldown", parameters: ["[cooldown]"], short_text: "display.animal_pen.cooldown", long_text: "display.animal_pen.egg_cooldown" }
    ]
  });

  const ambient = (sound) => ({
    id: 'ambient',
    cooldown: { min: 1200, max: 6000, type: 'random' },
    sound: sound
  });

  // --- Entity Definitions ---
  let entities = {
    'spectrum:kindling': [
      feeding('#spectrum:kindling_food'),
      shearing('spectrum:gameplay/kindling_clipping', 'spectrum:resplendent_feather', '#c:tools/shear'),
      ambient('spectrum:entity.kindling.ambient')
    ],
    "spectrum:egg_laying_wooly_pig": [
      feeding('spectrum:amaranth_bushel'),
      shearing('animal_pen:animal_interactions/shear/wool', 'minecraft:white_wool', '#c:tools/shear',),
      milking('animal_pen:animal_interactions/bucket/milk_bucket', 'minecraft:milk_bucket'),
      eggs('animal_pen:animal_interactions/bucket/egg', 'minecraft:egg', 'minecraft:bowl'),
      ambient('spectrum:entity.kindling.ambient')
    ],
    "minecraft:bat": [
      feeding('milf:larva'),
      ambient('minecraft:entity.bat.ambient')
    ],
  };

  Object.entries(entities).forEach(([entity, interaction]) => {
    e.json(`milf:animal_interactions/${entity.replace(':', '/')}`,
      {
        entity: entity,
        interactions: interaction
      });
  });
});