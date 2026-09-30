MoreJS.registerPotionBrewing(event => {
    event.removeCustomBrewing({
        ingredient: 'minecraft:ender_eye',
        output: 'enigmaticlegacyplus:recall_potion',
    });

    event.removeCustomBrewing({
        input: 'enigmaticlegacyplus:recall_potion',
        ingredient: 'minecraft:fermented_spider_eye',
        output: 'enigmaticlegacyplus:wormhole_potion',
    });
    
    event.removeCustomBrewing({
        input: 'enigmaticlegacyplus:recall_potion',
        ingredient: 'enigmaticlegacyplus:twisted_heart',
        output: 'enigmaticlegacyplus:twisted_potion',
    });

});
