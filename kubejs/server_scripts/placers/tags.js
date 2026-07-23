ServerEvents.tags('item', event => {
    const hammers = ['another_furniture:furniture_hammer', 'ytech:iron_hammer', 'grimoireofgaia:minotaur_hammer', 'ytech:copper_hammer', 'immersiveengineering:hammer', 'framedblocks:framed_hammer', 'ytech:tin_hammer', 'modern_industrialization:diamond_hammer', 'modern_industrialization:netherite_hammer', 'ytech:bronze_hammer', 'modern_industrialization:iron_hammer', 'ytech:golden_hammer', 'ytech:lead_hammer', 'hexerei:warhammer', 'ytech:stone_hammer', 'modern_industrialization:steel_hammer',]
    hammers.forEach(hammer =>{
        event.add('milf:hammers', hammer)
    })
})
