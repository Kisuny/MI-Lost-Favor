ServerEvents.recipes(event => {
    event.remove({output: [
        'simplemagnets:basicmagnet',
        'simplemagnets:advancedmagnet',
    ]})

    
    event.replaceInput({mod: 'simplemagnets'}, 'minecraft:iron_ingot', 'modern_industrialization:iron_plate')
    event.replaceInput({mod: 'simplemagnets'}, 'minecraft:redstone', 'immersiveengineering:wirecoil_redstone')
    event.replaceInput({mod: 'simplemagnets'}, 'minecraft:gold_ingot', 'modern_industrialization:gold_plate')

    event.recipes.modern_industrialization.polarizer(8, 400)
        .itemIn('milf:demagnetized_magnet_part')
        .itemOut('milf:magnet_part')

    event.recipes.modern_industrialization.assembler(8, 200)
        .itemIn('2x milf:magnet_part')
        .itemIn('6x minecraft:red_dye')
        .itemIn('6x minecraft:blue_dye')
        .itemIn('6x immersiveengineering:wirecoil_redstone')
        .itemIn('architects_palette:ender_pearl_block')
        .itemOut('simplemagnets:basicmagnet')
        .id('milf:basicmagnet')

    event.recipes.modern_industrialization.mixer(8, 400)
        .itemIn('2x modern_industrialization:nickel_ingot')
        .itemIn('modern_industrialization:aluminum_ingot')
        .itemIn('minecraft:iron_ingot')
        .itemOut('milf:demagnetized_magnet_part')

});
