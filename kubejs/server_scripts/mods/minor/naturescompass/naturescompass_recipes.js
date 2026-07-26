ServerEvents.recipes(event => {
    customWorktable(event, {
        pattern: [
            " r ",
            "ewe",
            " e "
        ],
        reagents: ["tyty"],
        key: {
            "w": { "item": "minecraft:compass" },
            "e": { "item": "paganbless:black_thorn_log" },
            "r": { "item": "hexerei:dowsing_rod" },
            "t": { "item": "eidolon_repraised:mirecap" },
            "y": { "item": "eidolon_repraised:avennian_sprig" },
        },
        result: "naturescompass:naturescompass",
        removeRecipe: true
    })
})