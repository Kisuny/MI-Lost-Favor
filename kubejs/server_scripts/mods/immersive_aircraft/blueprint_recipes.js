ServerEvents.recipes(event =>{
    let components = "Aircraft components"
    let aircrafts = "Aircraft machines"
    let aircraftUpgrades = "Aircraft upgrades"
    function blueprint_recipe(inputs, output, blueprint) {
        ieBlueprintRecipe(event, {
            inputItems: inputs,
            outputItems: [[output]],
            category: blueprint,
            removeRecipe: true
        })
    }

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:steel_ring" }, 1],
            [{ "item": "immersive_aircraft:propeller" }, 1],
            [{ "item": "modern_industrialization:bronze_blade" }, 4]
        ],
        { "item": "immersive_aircraft:enhanced_propeller" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:iron_plate" }, 2],
            [{ "item": "modern_industrialization:iron_ring" }, 4],
            [{ "item": "modern_industrialization:copper_curved_plate" }, 6]
        ],
        { "item": "immersive_aircraft:sturdy_pipes" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:iron_large_plate" }, 4],
            [{ "item": "modern_industrialization:steel_bolt" }, 8],
            [{ "item": "immersive_aircraft:boiler" }, 1]
        ],
        { "item": "immersive_aircraft:steel_boiler" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:hull" }, 4],
            [{ "item": "modern_industrialization:iron_bolt" }, 8],
            [{ "item": "modern_industrialization:iron_rod" }, 2]
        ],
        { "item": "immersive_aircraft:hull_reinforcement" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:rubber_sheet" }, 8],
            [{ "item": "modern_industrialization:iron_bolt" }, 8],
            [{ "item": "modern_industrialization:iron_gear" }, 1],
            [{ "item": "modern_industrialization:iron_rod" }, 2]
        ],
        { "item": "immersive_aircraft:improved_landing_gear" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:engine" }, 1],
            [{ "item": "minecraft:slime_ball" }, 8],
            [{ "tag": "minecraft:leaves" }, 4],
            [{ "item": "modern_industrialization:invar_plate" }, 4]
        ],
        { "item": "immersive_aircraft:eco_engine" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:engine" }, 1],
            [{ "item": "minecraft:fire_charge" }, 4],
            [{ "item": "minecraft:netherrack" }, 64],
            [{ "item": "modern_industrialization:netherite_rod" }, 4],
            [{ "item": "minecraft:crimson_fungus" }, 4]
        ],
        { "item": "immersive_aircraft:nether_engine" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:iron_large_plate" }, 4],
            [{ "item": "modern_industrialization:iron_gear" }, 2],
            [{ "item": "minecraft:iron_block" }, 3],
        ],
        { "item": "immersive_machinery:iron_drill" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_machinery:iron_drill" }, 1],
            [{ "item": "modern_industrialization:diamond_plate" }, 4],
            [{ "item": "modern_industrialization:diamond_dust" }, 6],
        ],
        { "item": "immersive_machinery:diamond_drill" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_machinery:diamond_drill" }, 1],
            [{ "item": "modern_industrialization:netherite_nugget" }, 18],
            [{ "item": "modern_industrialization:netherite_dust" }, 6],
        ],
        { "item": "immersive_machinery:netherite_drill" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "minecraft:spyglass" }, 1],
            [{ "item": "modern_industrialization:copper_plate" }, 6],
            [{ "item": "modern_industrialization:rubber_sheet" }, 4],
        ],
        { "item": "immersive_aircraft:telescope" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:industrial_gears" }, 1],
            [{ "item": "modern_industrialization:copper_plate" }, 6],
            [{ "item": "modern_industrialization:iron_rod" }, 4],
            [{ "item": "modern_industrialization:iron_bolt" }, 8],
        ],
        { "item": "immersive_aircraft:rotary_cannon" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:industrial_gears" }, 1],
            [{ "item": "modern_industrialization:steel_curved_plate" }, 2],
            [{ "item": "modern_industrialization:steel_plate" }, 4],
            [{ "item": "modern_industrialization:iron_bolt" }, 8],
        ],
        { "item": "immersive_aircraft:bomb_bay" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "minecraft:crossbow" }, 2],
            [{ "item": "minecraft:tripwire_hook" }, 2],
            [{ "tag": "c:ropes" }, 4]
        ],
        { "item": "immersive_aircraft:heavy_crossbow" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "minecraft:compass" }, 1],
            [{ "item": "minecraft:comparator" }, 2],
            [{ "item": "modern_industrialization:copper_wire" }, 4],
            [{ "item": "immersiveengineering:component_electronic" }, 1]
        ],
        { "item": "immersive_aircraft:gyroscope" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:gyroscope" }, 1],
            [{ "item": "modern_industrialization:electrum_plate" }, 2],
            [{ "item": "modern_industrialization:electrum_wire" }, 4],
            [{ "item": "modern_industrialization:analog_circuit" }, 1]
        ],
        { "item": "immersive_aircraft:gyroscope_hud" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:gyroscope_hud" }, 1],
            [{ "item": "modern_industrialization:steel_plate" }, 2],
            [{ "item": "modern_industrialization:lead_wire" }, 4],
            [{ "item": "modern_industrialization:tin_rod" }, 1],
            [{ "item": "immersiveengineering:electron_tube" }, 2]
        ],
        { "item": "immersive_aircraft:gyroscope_dials" }, aircraftUpgrades
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:steel_ring" }, 2],
            [{ "item": "immersiveengineering:hemp_fabric" }, 8],
            [{ "tag": "c:ropes" }, 2]
        ],
        { "item": "immersive_aircraft:sail" }, components
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:tin_blade" }, 2],
            [{ "item": "modern_industrialization:iron_ring" }, 1],
            [{ "item": "modern_industrialization:iron_plate" }, 4],
            [{ "item": "modern_industrialization:iron_bolt" }, 8],
        ],
        { "item": "immersive_aircraft:propeller" }, components
    );

    blueprint_recipe(
        [
            [{ "item": "milf:small_copper_fluid_container" }, 1],
            [{ "item": "modern_industrialization:steel_rod" }, 4],
            [{ "item": "modern_industrialization:steel_bolt" }, 8],
            [{ "item": "modern_industrialization:copper_curved_plate" }, 4],
        ],
        { "item": "immersive_aircraft:boiler" }, components
    );

    blueprint_recipe(
        [
            [{ "tag": "minecraft:logs" }, 6],
            [{ "item": "modern_industrialization:iron_rod" }, 3],
            [{ "item": "modern_industrialization:iron_bolt" }, 12],
        ],
        { "item": "immersive_aircraft:hull" }, components
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:copper_gear" }, 1],
            [{ "item": "modern_industrialization:iron_gear" }, 1],
            [{ "item": "immersiveengineering:hemp_fiber" }, 1]
        ],
        { "item": "immersive_aircraft:industrial_gears" }, components
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:copper_gear" }, 1],
            [{ "item": "minecraft:repeater" }, 1],
            [{ "item": "minecraft:comparator" }, 1],
            [{ "item": "minecraft:redstone" }, 6],
            [{ "item": "modern_industrialization:copper_plate" }, 4]
        ],
        { "item": "immersive_machinery:redstone_mechanism" }, components
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:boiler" }, 1],
            [{ "item": "modern_industrialization:steel_rod" }, 6],
            [{ "item": "modern_industrialization:steel_gear" }, 2],
            [{ "item": "modern_industrialization:steel_large_plate" }, 2],
            [{ "item": "modern_industrialization:lead_dust" }, 2],
            [{ "item": "immersiveengineering:toolupgrade_drill_lube" }, 1],
        ],
        { "item": "immersive_aircraft:engine" }, components
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:propeller" }, 1],
            [{ "item": "immersive_aircraft:hull" }, 2],
            [{ "item": "immersive_aircraft:sail" }, 2],
            [{ "item": "minecraft:stick" }, 6],
            [{ "item": "minecraft:stone" }, 1]
        ],
        { "item": "immersive_aircraft:gyrodyne" }, aircrafts
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:propeller" }, 1],
            [{ "item": "immersive_aircraft:hull" }, 4],
            [{ "item": "immersive_aircraft:sail" }, 6],
            [{ "item": "immersive_aircraft:boiler" }, 1],
            [{ "item": "modern_industrialization:steel_large_plate" }, 2]
        ],
        { "item": "immersive_aircraft:airship" }, aircrafts
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:propeller" }, 1],
            [{ "item": "immersive_aircraft:hull" }, 2],
            [{ "tag": "minecraft:logs" }, 4],
            [{ "item": "immersive_aircraft:boiler" }, 1],
            [{ "item": "modern_industrialization:steel_large_plate" }, 4]
        ],
        { "item": "immersive_aircraft:biplane" }, aircrafts
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:propeller" }, 2],
            [{ "item": "immersive_aircraft:hull" }, 2],
            [{ "item": "immersive_aircraft:airship" }, 1],
            [{ "item": "minecraft:chest" }, 4]
        ],
        { "item": "immersive_aircraft:cargo_airship" }, aircrafts
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:biplane" }, 1],
            [{ "item": "minecraft:bamboo_block" }, 16],
            [{ "item": "minecraft:stripped_bamboo_block" }, 16],
            [{ "item": "immersive_aircraft:propeller" }, 2],
            [{ "item": "modern_industrialization:steel_large_plate" }, 6],
            [{ "item": "immersive_aircraft:hull" }, 4]
        ],
        { "item": "immersive_aircraft:bamboo_hopper" }, aircrafts
    );

    blueprint_recipe(
        [
            [{ "item": "minecraft:stripped_bamboo_block" }, 4],
            [{ "item": "immersive_aircraft:propeller" }, 4],
            [{ "item": "immersive_aircraft:boiler" }, 1],
            [{ "item": "immersive_aircraft:hull" }, 2]
        ],
        { "item": "immersive_aircraft:quadrocopter" }, aircrafts
    );

    blueprint_recipe(
        [
            [{ "item": "minecraft:stripped_bamboo_block" }, 2],
            [{ "item": "immersive_aircraft:propeller" }, 4],
            [{ "item": "immersive_aircraft:boiler" }, 1],
            [{ "item": "immersive_machinery:redstone_mechanism" }, 1],
        ],
        { "item": "immersive_machinery:bamboo_bee" }, aircrafts
    );

    blueprint_recipe(
        [
            [{ "item": "minecraft:observer" }, 1],
            [{ "item": "modern_industrialization:analog_circuit" }, 4],
            [{ "item": "immersive_aircraft:engine" }, 1],
            [{ "item": "immersive_machinery:redstone_mechanism" }, 4],
        ],
        { "item": "immersive_machinery:redstone_sheep" }, aircrafts
    );

    blueprint_recipe(
        [
            [{ "item": "immersive_aircraft:propeller" }, 4],
            [{ "item": "immersive_aircraft:hull" }, 12],
            [{ "item": "immersive_aircraft:sail" }, 18],
            [{ "item": "immersive_aircraft:engine" }, 2],
            [{ "item": "modern_industrialization:steel_large_plate" }, 16],
            [{ "item": "minecraft:chest" }, 4]
        ],
        { "item": "immersive_aircraft:warship" }, aircrafts
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:rubber_sheet" }, 32],
            [{ "item": "modern_industrialization:steel_drill_head" }, 4],
            [{ "item": "immersive_aircraft:engine" }, 2],
            [{ "item": "modern_industrialization:steel_large_plate" }, 16],
            [{ "item": "modern_industrialization:steel_barrel" }, 4],
            [{ "item": "modern_industrialization:bronze_gear" }, 7]
        ],
        { "item": "immersive_machinery:tunnel_digger" }, aircrafts
    );

    blueprint_recipe(
        [
            [{ "item": "modern_industrialization:copper_bolt" }, 32],
            [{ "item": "immersive_aircraft:enhanced_propeller" }, 1],
            [{ "item": "immersive_aircraft:engine" }, 2],
            [{ "item": "modern_industrialization:copper_curved_plate" }, 12],
            [{ "item": "modern_industrialization:steel_plate" }, 16],
            [{ "item": "milf:steel_infused_glass" }, 12]
        ],
        { "item": "immersive_machinery:copperfin" }, aircrafts
    );

})