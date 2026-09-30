ServerEvents.recipes(event => {
    
    // I removed this recipe because if I leave it in, there's no need for ender storage.
    event.remove({output: "tankstorage:tank_link"})
    event.remove({output: "bankstorage:bank_link"})
    for (let i = 1; i <= 7; i++) {
        event.remove({output: `bankstorage:bank_${i}`})
        event.remove({output: `tankstorage:tank_${i}`})
    }

    milfShaped(event, {
        pattern: [
            "AAA", 
            "ABA", 
            "AAA"
        ],
        key: {
            A: {item: "modern_industrialization:bronze_plate"},
            B: {item: "hexerei:small_satchel"}
        },
        outputItems: [[{id: "bankstorage:bank_1"}, 1]],
        compatOff: true
    })

    milfShaped(event, {
        pattern: [
            "AAA", 
            "ABA", 
            "AAA"]
            ,
        key: {
            A: {item: "modern_industrialization:bronze_plate"},
            B: {item: "toxony:potion_flask"}
        },
        outputItems: [[{id: "tankstorage:tank_1"}, 1]],
        compatOff: true
    })

    const upgradeMaterials = [
        "modern_industrialization:steel_plate",             // t1 -> t2
        "modern_industrialization:aluminum_plate",          // t2 -> t3
        "modern_industrialization:stainless_steel_plate",   // t3 -> t4
        "modern_industrialization:titanium_plate",          // t4 -> t5
        "modern_industrialization:blastproof_alloy_plate",  // t5 -> t6
        "modern_industrialization:singularity"            // t6 -> t7
    ]

    for (let i = 1; i <= 6; i++) {
        event.custom({
            type: "bankstorage:copy_components_or_assign_uuid",
            pattern: [
                "AAA", 
                "ABA", 
                "AAA"
            ],
            key: {
                A: {item: upgradeMaterials[i - 1]},
                B: {item: `bankstorage:bank_${i}`}
            },
            result: {
                id: `bankstorage:bank_${i + 1}`,
                count: 1
            }
        })
    }

    for (let i = 1; i <= 6; i++) {
        event.custom({
            type: "tankstorage:tank_upgrade",
            pattern: [
                "AAA", 
                "ABA", 
                "AAA"
            ],
            key: {
                A: {item: upgradeMaterials[i - 1]},
                B: {item: `tankstorage:tank_${i}`}
            },
            result: {
                id: `tankstorage:tank_${i + 1}`,
                count: 1
            }
        })
    }

})
