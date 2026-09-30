ServerEvents.recipes(event => {

    yTechShaped(event, {
        pattern: [
            "G#G",
            "CPC",
            "GCG"
        ],
        key: {
            P: { item: "ytech:pebble" },
            "#": { tag: "c:hammers" },
            G: { tag: "c:gravels" },
            C: { tag: "c:cobblestones" }
        },
        outputItems: [[{ id: "milf:pet_rock" }, 1]],
    })

    milfShaped(event, {
        pattern: [
            "lSL",
            "SS ",
            "R  "
        ],
        key: {
            R: { item: "milf:pet_rock" },
            L: { item: "minecraft:lead" },
            S: { tag: "ytech:leather_strips" },
            l: { item: "minecraft:leather" }
        },
        outputItems: [[{ id: "milf:pet_rock_on_a_leash" }, 1]],
    })

})