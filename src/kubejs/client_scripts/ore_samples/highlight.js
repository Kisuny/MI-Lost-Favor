ClientEvents.highlight(event => {
    if (!event.client.hitResult) return
    if (event.client.hitResult.type != $HitResult$Type.BLOCK) return
    let levelBlock = Client.level.getBlock(/**@type {$BlockHitResult_} */(Client.hitResult).blockPos)
    let block = levelBlock.blockState.block
    if (!block.hasTag("milf:ore_samples")) return

    let sampleId = block.getId()

    let sampleEntry = global.oresWithSamples.find(object => `milf:${object.itemName}_ore_sample`  == sampleId)

    if (sampleEntry){

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

        let playerStages = AStagesClient.getStagesFromPlayer(Client.player)

        let stageName = sampleToStageMap[sampleId]
        
        if (stageName && playerStages.contains(stageName)){
            event.addTargetBlock(sampleEntry.color)

        }

    }
})