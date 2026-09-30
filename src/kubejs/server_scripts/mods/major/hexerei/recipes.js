ServerEvents.recipes(event => {
    const remove_by_id = [
        "hexerei:leather_from_drying_rack",
      "hexerei:mixing_cauldron",
        "hexerei:willow_broom_from_mixing_cauldron",
        "hexerei:witch_hazel_broom_from_mixing_cauldron",
        "hexerei:mahogany_broom_from_mixing_cauldron",
        "ars_hex:archwood_broom_from_mixing_cauldron",
    ];

    remove_by_id.forEach(id => {
        event.remove({ id: id })
    });

    event.remove({ output: [
        'hexerei:mahogany_woodcutter', 
        'hexerei:willow_woodcutter', 
        'hexerei:witch_hazel_woodcutter',
        'hexerei:witch_hazel_planks',
        'hexerei:willow_planks',
        'hexerei:mahogany_planks',
    ] });


    event.shaped("hexerei:mixing_cauldron", [
        "TQT",
        "WRW",
        "WWW"
    ], {
        Q: "paganbless:black_thorn_stick",
        W: "minecraft:iron_ingot",
        R: "minecraft:cauldron",
        T: "minecraft:torch"
    });

    event.replaceInput( { input: 'enchanted:belladonna_seeds' },'enchanted:belladonna_seeds','hexerei:belladonna_plant')
    event.replaceInput( { input: 'enchanted:mandrake_root' },'enchanted:mandrake_root','hexerei:mandrake_root')
    event.replaceInput( { input: 'enchanted:mandrake_seeds' },'enchanted:mandrake_seeds','hexerei:mandrake_flowers')
    event.replaceInput( { input: 'enchanted:belladonna_flower' },'enchanted:belladonna_flower','hexerei:belladonna_flowers')
})