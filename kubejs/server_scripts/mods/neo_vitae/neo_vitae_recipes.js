ServerEvents.recipes(event => {
    alterationRecipe(event, {
        input: 'minecraft:enchanting_table',
        result: 'neovitae:ara_vitae',
        removeRecipe: true
    });
    alterationRecipe(event, {
        input: 'paganbless:athame',
        result: 'neovitae:sacrificial_dagger',
        removeRecipe: true
    });

    customWorktable(event, {
        pattern: [
            " t ",
            " w ",
            " e "
        ],
        reagents: ["u   "],
        key: {
            "w": { "item": "eidolon_edoni:stimulating_incense" },
            "e": { "tag": "c:drinks/watery" },
            "t": { "item": "eidolon_repraised:soul_harvest_incense" },
            "u": { "tag": "eidolon_repraised:patron_symbol" },
        },
        result: "milf:crimson_veil_elixir",
        count: 8
    })
})

