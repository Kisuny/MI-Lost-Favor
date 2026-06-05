const dim_list = [
    {name: "minecraft:the_nether", stage: "the_nether_access"}, 
    {name: "minecraft:the_end", stage: "the_end_access"}, 
    {name: "eternal_starlight:starlight", stage: "the_gatekeeper"},
    {name: "javd:void", stage: "void_access"},
    {name: "spectrum:deeper_down", stage: "deeper_down_access"},
    {name: "milf:crimson_veil", stage: "crimson_veil_accses"},
]


dim_list.forEach(dim => {
    AStages.addRestrictionForDimension(`astages/dimension/${dim.name}`, dim.stage, dim.name)
        .setDimensionMessage(() => Text.of([
            Text.translate("milf.text.dim.cant_visit")
        ]))
});
