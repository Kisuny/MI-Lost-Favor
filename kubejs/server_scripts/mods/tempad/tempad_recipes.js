ServerEvents.recipes(event => {
    
    event.replaceInput({ id: "tempad:chronon_cell" }, "minecraft:iron_ingot", "forbidden_arcanus:deorum_ingot")
    event.replaceInput({ id: "tempad:chronon_cell" }, "minecraft:copper_ingot", "modern_industrialization:steel_ingot")
    event.replaceInput({ id: "tempad:chronon_cell" }, "minecraft:amethyst_shard", "spectrum:onyx_shard")
    event.replaceInput({ id: "tempad:location_broadcaster" }, "minecraft:iron_ingot", "forbidden_arcanus:deorum_ingot")
    event.replaceInput({ id: "tempad:chronon_generator" }, "minecraft:iron_ingot", "forbidden_arcanus:deorum_ingot")
    event.replaceInput({ id: "tempad:chronon_generator" }, "minecraft:iron_ingot", "forbidden_arcanus:deorum_ingot")
    event.replaceInput({ id: "tempad:timedoor_marker" }, "minecraft:iron_ingot", "forbidden_arcanus:deorum_ingot")
    event.replaceInput({ id: "tempad:timedoor_marker" }, "minecraft:iron_block", "forbidden_arcanus:deorum_block")
    event.replaceInput({ id: "tempad:timedoor_projector" }, "minecraft:iron_block", "forbidden_arcanus:deorum_block")
    event.replaceInput({ id: "tempad:timedoor_projector" }, "minecraft:copper_ingot", "modern_industrialization:steel_ingot")

    event.remove({ output: "tempad:time_steel" })
    addHephaestusRitual("tempad_time_steel", {
        enhancers: "forbidden_arcanus:elementarium",
        essences: { },
        mainIngredient: "minecraft:iron_ingot",
        inputs: [
            { item: "modern_industrialization:stainless_steel_ingot", amount: 2 },
            { item: "minecraft:netherite_ingot", amount: 2 },
        ],
        resultCount: 2,
        result: "tempad:time_steel",
    })
}) 