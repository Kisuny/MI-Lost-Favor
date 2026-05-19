ServerEvents.recipes(event => {

    yTechShaped(event, {
        pattern: [
            "Q#Q",
            "CMC",
            " Q ",
        ],
        key: {
            "C": { "item": "spectrum:citrine_shard" },
            "#": { "tag": "c:files" },
            "Q": { "tag": "c:gems/quartz" },
            "M": { "item": "enchanted:reek_of_misfortune" },
        },
        outputItems: [[{ id: "milf:amber_visage" }, 1]]
    })

    yTechShaped(event, {
        pattern: [
            "N#s",
            "BMB",
            "SES"
        ],
        key: {
            "#": { tag: "c:mortar_and_pestles" },
            N: { item: "milf:nutmeg" },
            E: { tag: "c:eggs" },
            B: { item: "minecraft:cocoa_beans" },
            S: { item: "minecraft:sugar" },
            M: { item: "minecraft:milk_bucket" },
            s: { item: "minecraft:stick" },
        },
        outputItems: [[{ id: "milf:eggnog" }, 1]],
        compatOff:true
    })

})
