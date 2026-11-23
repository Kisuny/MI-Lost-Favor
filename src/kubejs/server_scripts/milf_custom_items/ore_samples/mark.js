global.oresWithSamples.forEach(oreEntry => {

    let oreName = oreEntry.itemName
    oreName = oreName.charAt(0).toUpperCase() + oreName.slice(1)

    BlockEvents.rightClicked(`milf:${ oreEntry.itemName }_ore_sample`, event => {

        let blockPos = event.getBlock().pos

        let sampleToStageMap = {

            "milf:lead_ore_sample": "lead_ore",
            "milf:tin_ore_sample": "tin_ore",
            "milf:copper_ore_sample": "copper_ore",
            "milf:iron_ore_sample": "iron_ore",
            "milf:coal_ore_sample": "coal_ore",

            "milf:redstone_ore_sample": "redstone_ore",
            "milf:lapis_ore_sample": "lapis_ore",
            "milf:gold_ore_sample": "gold_ore",
            "milf:quartz_ore_sample": "quartz_ore",
            "milf:salt_ore_sample": "salt_ore",

            "milf:emerald_ore_sample": "emerald_ore",
            "milf:diamond_ore_sample": "diamond_ore",
            "milf:nickel_ore_sample": "nickel_ore",
            "milf:nether_quartz_ore_sample": "nether_quartz_ore",

            "milf:antimony_ore_sample": "antimony_ore",
            "milf:ancient_debris_ore_sample": "ancient_debris_ore",
            "milf:bauxite_ore_sample": "bauxite_ore",
            "milf:uranium_ore_sample": "uranium_ore",
            "milf:monazite_ore_sample": "monazite_ore",

        }

        let playerStages = AStages.getStagesFromPlayer(event.player)

        let stageName = sampleToStageMap[event.block.id]

        if (stageName && playerStages.contains(stageName)) {
            
            if (event.player.isShiftKeyDown()) {
                event.player.sendData("milf_remove_marker", {
                    pos: {
                        x: blockPos.getX(),
                        y: blockPos.getY(),
                        z: blockPos.getZ()
                    },
                    dimension: String(event.level.dimension),
                    icon: "embersatlas:pickaxe"
                })
            } else {

                milfPlaySound(event, "enchanted:chalk_write")

                event.player.sendData("milf_add_marker", {
                    pos: {
                        x: blockPos.getX(),
                        y: blockPos.getY(),
                        z: blockPos.getZ()
                    },
                    name: oreName,
                    dimension: String(event.level.dimension),
                    icon: "embersatlas:pickaxe",
                    color: oreEntry.color,
                    group: "Ores"
                })
            }

        }





    })

})

