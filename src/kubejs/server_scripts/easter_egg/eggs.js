
BlockEvents.rightClicked("grimoireofgaia:deco_garden_gnome", event => {
    const player = event.entity;
    const server = player.server;
    const key = "gnomeCooldown";
    if (player.persistentData[key]) return;

    player.persistentData.putBoolean(key, true);
    server.scheduleInTicks(1 * 20, _ => player.persistentData.remove(key));

    const playerName = player.profile.name;
    player.server.runCommandSilent(`/playsound milf:wooo ambient ${playerName} ${player.x} ${player.y} ${player.z}`);
});

BlockEvents.rightClicked(['milf:kisuny_plush', 'milf:saeta_plush'], event => {
    const player = event.entity;
    const server = player.server;
    const key = "plushCooldown";
    if (player.persistentData[key]) return;

    player.persistentData.putBoolean(key, true);
    server.scheduleInTicks(1 * 20, _ => player.persistentData.remove(key));

    const playerName = player.profile.name;
    player.server.runCommandSilent(`/playsound milf:plush ambient ${playerName} ${player.x} ${player.y} ${player.z}`);

    

});

BlockEvents.rightClicked("immersiveengineering:concrete", event => {
    if (event.getHand() == "OFF_HAND") return
    if (!event.player.mainHandItem.is(Item.of("modern_industrialization:steel_rod"))) return
    let {level, block} = event
    let item = event.player.mainHandItem
    item.count--
    level.setBlockAndUpdate(block.pos, Blocks.AIR.defaultBlockState())
    $Block.popResource(level, block.pos, Item.of("milf:concrete_popsicle"))

    milfPlaySound(event, "minecraft:entity.bee.sting")
    
})

const PIPE_ITEMS = [
    'immersiveengineering:stick_iron',
    'immersiveengineering:stick_netherite',
    'immersiveengineering:stick_aluminum',
    'immersiveengineering:stick_steel',
    'modern_industrialization:cadmium_rod',
    'modern_industrialization:aluminum_rod',
    'modern_industrialization:tumbaga_rod',
    'modern_industrialization:bronze_rod',
    'modern_industrialization:silicon_steel_rod',
    'modern_industrialization:certus_quartz_rod',
    'modern_industrialization:copper_rod',
    'modern_industrialization:bioresistant_alloy_rod',
    'modern_industrialization:eclipse_alloy_rod',
    'modern_industrialization:gold_rod',
    'modern_industrialization:he_mox_rod',
    'modern_industrialization:he_uranium_rod',
    'modern_industrialization:invar_rod',
    'modern_industrialization:iron_rod',
    'modern_industrialization:le_mox_rod',
    'modern_industrialization:le_uranium_rod',
    'modern_industrialization:lead_rod',
    'modern_industrialization:netherite_rod',
    'modern_industrialization:stainless_steel_rod',
    'modern_industrialization:stainless_steel_rod_magnetic',
    'modern_industrialization:steel_rod',
    'modern_industrialization:steel_rod_magnetic',
    'modern_industrialization:tin_rod',
    'modern_industrialization:titanium_rod',
    'modern_industrialization:uranium_rod'
];

ItemEvents.dropped(PIPE_ITEMS, event => {
    const player = event.entity;
    const server = player.server;
    const key = "pipeDropCooldown";

    if (player.persistentData[key]) return;

    player.persistentData.putBoolean(key, true);
    server.scheduleInTicks(5 * 20, _ => player.persistentData.remove(key));

    const playerName = player.profile.name;
    server.runCommandSilent(`/playsound milf:metal_pipe ambient ${playerName} ${player.x} ${player.y} ${player.z}`);
});

PlayerEvents.loggedOut(event => {
    if (event.player.persistentData.gnomeCooldown) event.player.persistentData.remove("gnomeCooldown");
    if (event.player.persistentData.plushCooldown) event.player.persistentData.remove("plushCooldown");
    if (event.player.persistentData.pipeDropCooldown) event.player.persistentData.remove("pipeDropCooldown");
})

ServerEvents.recipes(event => {
    miMachineRecipe(event, {
        energy: 109, time: 109, machine: "modern_industrialization:blast_furnace",
        inputItems: [[{ item: "milf:meze_109" }]],
        outputItems: [[{ item: "milf:meze_109", components: { enchantments: { levels: { "minecraft:punch": 9 } }, lore: [`{text:"Who said that headphones burn-in ain't real?"}`] } }]]
    })
})