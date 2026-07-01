// Remove IE recipes
ServerEvents.recipes(event => {
    // (`･Θ･´) - Some recipes are located in data because it is easier to change a recipe there and delete the previous recipe at the same time (overwrite)
    const materials_for_replacing_to_plate = ["gold", "iron", "copper", "diamond"]


    materials_for_replacing_to_plate.forEach(material => {
        const input = material === "diamond" ? material : `${material}_ingot`
        const output = `modern_industrialization:${material}_plate`;

        ["sophisticatedstorage", "sophisticatedbackpacks"].forEach(mod => {
            event.replaceInput({ mod: mod }, input, output)
        })
    });

    ["sophisticatedstorage", "sophisticatedbackpacks"].forEach(mod => {
        event.replaceInput({ mod: mod }, "minecraft:redstone_torch", "modern_industrialization:analog_circuit")
        event.replaceInput({ mod: mod }, "minecraft:lever", "modern_industrialization:analog_circuit")
    })

    //WIP
    event.remove({id:/sophisticatedstorage:generic*/})


    milfShaped(event, {
        pattern: [
            ' P ',
            'PSP',
            ' P '
        ],
        key: {
            P: { item: "modern_industrialization:copper_plate" },
            S: { item: "modern_industrialization:analog_circuit" }
        },
        outputItems: [[{ id: "sophisticatedstorage:basic_to_copper_tier_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            ' P ',
            'PUP',
            ' P '
        ],
        key: {
            P: { item: "modern_industrialization:iron_plate" },
            
            U: { item: "sophisticatedstorage:basic_to_copper_tier_upgrade" },
        },
        outputItems: [[{ id: "sophisticatedstorage:basic_to_iron_tier_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            ' P ',
            'PSP',
            'LPL'
        ],
        key: {
            P: { item: "modern_industrialization:iron_plate" },
            L: { item: "modern_industrialization:iron_large_plate" },
            S: { item: "modern_industrialization:analog_circuit" }
        },
        outputItems: [[{ id: "sophisticatedstorage:basic_to_iron_tier_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            ' P ',
            'PUP',
            ' P '
        ],
        key: {
            P: { item: "modern_industrialization:iron_plate" },
            U: { item: "modern_industrialization:iron_ring" }
        },
        outputItems: [[{ id: "sophisticatedstorage:copper_to_iron_tier_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'PPP',
            'PUP',
            'PPP'
        ],
        key: {
            P: { item: "modern_industrialization:gold_plate" },
            U: { item: "modern_industrialization:iron_ring" }
        },
        outputItems: [[{ id: "sophisticatedstorage:iron_to_gold_tier_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            'PPP',
            'PUP',
            'PPP'
        ],
        key: {
            P: { item: "modern_industrialization:diamond_plate" },
            U: { item: "modern_industrialization:gold_ring" }
        },
        outputItems: [[{ id: "sophisticatedstorage:gold_to_diamond_tier_upgrade" }, 1]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            ' PU',
        ],
        key: {
            P: { item: "modern_industrialization:diamond_plate" },
            U: { item: "minecraft:netherite_ingot" }
        },
        outputItems: [[{ id: "sophisticatedstorage:diamond_to_netherite_tier_upgrade" }, 1]],
        removeRecipe: true
    })

})

ServerEvents.tags("item", event => {


    const chests = event.get("sophisticatedstorage:all_storage").getObjectIds()
    const types = ["copper", "iron", "gold", "diamond", "netherite"]
    types.forEach( type => {
        let regex = new RegExp(`sophisticatedstorage:.*${type}.*`)
        chests.forEach(chest =>{
            if(regex.test(chest.toString())) event.add(`milf:${type}_storage`, chest)
            // console.log(chest);
        })
    })

})