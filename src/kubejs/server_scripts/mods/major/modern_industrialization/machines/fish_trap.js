ServerEvents.recipes(event => {


    Object.entries({
        "starcatcher:dripstone_bait": "minecraft:cod",
        "starcatcher:lush_bait": "minecraft:salmon",
        "starcatcher:cherry_bait": "minecraft:tropical_fish",
        "starcatcher:murkwater_bait": "minecraft:pufferfish"
    }).forEach(([baitId, fishId]) => {
        miMachineRecipe(event, {
            energy: 1, time: 666, machine: "modern_industrialization:fish_trap",
            inputItems: [
                [{ item: baitId }, 1, 0.5],
                [{ item: "milf:fish_net" }, 1]
            ],
            outputItems: [
                [{ item: fishId }, 1],
                [{ item: "milf:fish_net" }, 1, 0.72]
            ],
            open_water_condition: {
                range: 3,
                fill: 0.4
            }
        })
    })

    miMachineRecipe(event, {
        energy: 1, time: 666, machine: "modern_industrialization:fish_trap",
        inputItems: [
            [{ tag: "milf:ba_bits" }, 1, 0.5],
            [{ item: "milf:fish_net" }, 1]
        ],
        outputItems: [
            [{ item: "milf:fih_cube" }, 1],
            [{ item: "milf:fish_net" }, 1, 0.72]
        ],
        open_water_condition: {
            range: 3,
            fill: 0.4
        }
    })


})