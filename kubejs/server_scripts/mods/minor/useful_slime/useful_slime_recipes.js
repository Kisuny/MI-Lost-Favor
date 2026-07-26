ServerEvents.recipes(event => {

    const slime_armor = [
        {
            result: "usefulslime:slime_helmet",
            pattern: [
                "sas", 
                "s s", 
                "   "
            ],
            key: { 
                "s": { "item": "minecraft:slime_ball" }, 
                "a": { "item": "minecraft:leather_helmet" },
                "q": { "item": "paganbless:essence_of_the_forest" },
            }
        },
        {
            result: "usefulslime:slime_chestplate",
            pattern: [
                "s s", 
                "sas", 
                "sss"
            ],
            key: { 
                "s": { "item": "minecraft:slime_ball" }, 
                "a": { "item": "minecraft:leather_chestplate" },
                "q": { "item": "paganbless:essence_of_the_forest" },
            }
        },
        {
            result: "usefulslime:slime_leggings",
            pattern: [
                "sas",
                "s s",
                "s s"
            ],
            key: {
                "s": { "item": "minecraft:slime_ball" },
                "a": { "item": "minecraft:leather_leggings" },
                "q": { "item": "paganbless:essence_of_the_forest" },
            }
        },
        {
            result: "usefulslime:slime_boots",
            pattern: [
                "   ", 
                "s s", 
                "sas"
            ],
            key: { 
                "s": { "item": "minecraft:slime_ball" }, 
                "a": { "item": "minecraft:leather_boots" },
                "q": { "item": "paganbless:essence_of_the_forest" },
            }
        },
        {
            result: "usefulslime:slime_sling",
            pattern: [
                "s s", 
                " a ", 
                "s s"
            ],
            key: { 
                "s": { "item": "minecraft:slime_ball" }, 
                "a": { "item": "supplementaries:slingshot" },
                "q": { "item": "paganbless:essence_of_the_forest" },
            }
        }
    ]

    slime_armor.forEach(element => {
        customWorktable(event, {
            pattern: element.pattern,
            reagents: ["qqqq"],
            key: element.key,
            result: element.result,
            removeRecipe: true
        })
    });


})