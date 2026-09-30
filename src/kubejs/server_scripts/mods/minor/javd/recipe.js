ServerEvents.recipes(event => {
    event.remove({id: 'javd:portal_block'})

    customPedestalCraft(event, {
        tier: 'advanced', time: 1600, topaz: 8, amethyst: 8, citrine: 8, onyx: 32, experience: 4.0,
        pattern: [
            "QQQ",
            "QWQ",
            "QQQ"
        ],
        key: {
            "W": { "tag": "endrem:eyes" },
            "Q": { "item": "minecraft:obsidian" }
        },
        result: {
            "id": "javd:portal_block",
            "count": 1
        },
        advancement: "spectrum:create_onyx_shard"
    });
})