ServerEvents.recipes(event => {
    alterationRecipe(event, {
        input: 'minecraft:enchanting_table',
        result: 'neovitae:ara_vitae',
        removeRecipe: true
    });

    customWorktable(event, {
        pattern: [
            "   ",
            " w ",
            " e "
        ],
        reagents: ["u   "],
        key: {
            "w": { "item": "milf:miasma_orb" },
            "e": { "tag": "c:drinks/watery" },
            "u": { "tag": "eidolon_repraised:patron_symbol" },
        },
        result: "milf:crimson_veil_elixir",
        count: 8
    })
})

