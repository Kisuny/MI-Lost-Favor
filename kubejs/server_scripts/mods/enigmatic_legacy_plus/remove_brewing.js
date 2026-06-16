MoreJS.registerPotionBrewing(event => {
    event.removeCustomBrewing({
        ingredient: 'minecraft:ender_eye',
        output: 'enigmaticlegacyplus:recall_potion',
    });
    event.removeCustomBrewing({
        ingredient: 'minecraft:fermented_spider_eye',
        output: 'enigmaticlegacyplus:wormhole_potion',
    });
});
