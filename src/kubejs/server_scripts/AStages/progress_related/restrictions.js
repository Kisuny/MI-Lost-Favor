// IMPORTANT !!! /ᐠ｡ꞈ｡ᐟ\

// the actual quest where this stage is granted should be the one prior to acquiring the block, as otherwise there will
// be no way to get the block this stage is hiding, so it is probably a good idea to make this prior quest require
// all the resources you need to make the hidden block so that there is no way to cheese this thingie

Object.entries({
    "crafting_table": [
        {
            blockId: "minecraft:crafting_table",
            replaceWith: "farmersdelight:wooden_basket"
        }
    ],
    "furnace": [
        {
            blockId: "minecraft:furnace",
            replaceWith: "chipped:stacked_cobblestone_bricks"
        }
    ],
    "blast_furnace": [
        {
            blockId: "minecraft:blast_furnace",
            replaceWith: "chipped:stacked_cobblestone_bricks"
        }
    ],
    "smooth_stone": [
        {
            blockId: "minecraft:smooth_stone",
            replaceWith: "minecraft:stone"
        }
    ],
    "stonecutter": [
        {
            blockId: "minecraft:stonecutter",
            replaceWith: "supplementaries:turn_table"
        }
    ],
    "mixing_cauldron": [
        {
            blockId: "hexerei:mixing_cauldron",
            replaceWith: "minecraft:cauldron"
        }
    ],
    "farmersdelight_blocks": [
        {
            blockId: "farmersdelight:cutting_board",
            replaceWith: "cookingforblockheads:cutting_board"
        },
        {
            blockId: "farmersdelight:cooking_pot",
            replaceWith: "milf:stone_basin"
        },
        {
            blockId: "farmersdelight:stove",
            replaceWith: "cookingforblockheads:connector"
        }
    ],
    "ie_blocks": [
        {
            blockId: "immersiveengineering:workbench",
            replaceWith: "chipped:dark_oak_crate"
        },
        {
            blockId: "immersiveengineering:crate",
            replaceWith: "chipped:dark_oak_crate"
        },
        {
            blockId: "immersiveengineering:turntable",
            replaceWith: "supplementaries:turn_table"
        },
    ],
    "anvils_everywhere" : [
        {
            blockId: "minecraft:hopper",
            replaceWith: "woodenhopper:wooden_hopper"
        },
        {
            blockId: ["minecraft:anvil", "minecraft:chipped_anvil", "minecraft:damaged_anvil"],
            replaceWith: "milf:stone_anvil"
        }
    ],

    "metal_blocks": [
        {
            blockId: "minecraft:iron_block",
            replaceWith: "spectral_decorations:iron_tubing"
        },
        {
            blockId: "minecraft:gold_block",
            replaceWith: "spectral_decorations:gold_tubing"
        },
        {
            blockId: ["minecraft:copper_block", "minecraft:waxed_copper_block"],
            replaceWith: "spectral_decorations:copper_tubing"
        }
    ],

    "always_hidden" : [
        {
            blockId: "minecraft:enchanting_table",
            replaceWith: "minecraft:lectern"
        },
    ]
}).forEach(([stageId, blockEntries]) => {

    AStages.customizeStage(stageId).whenGranted(event => {

        let player = event.getPlayer()
        if (player) {
            player.sendData("milf_new_stage", {
                stage: stageId
            })
        }

    })

    blockEntries.forEach(blockEntry => {
        blockRestriction(stageId, blockEntry)
    })
})

function blockRestriction(stageId, blockEntry) {

    let {blockId, replaceWith} = blockEntry

    if (Array.isArray(blockId)){

        AStages.addRestrictionForItem(`${stageId}/item/${blockId[0]}`, stageId, blockId)

        blockId.forEach(id => {
            AStages.addRestrictionForOre(`${stageId}/ore/${id}`, stageId, id, replaceWith)
                .matchAllBlockStates()
                .affectPlayerActions()
        })
    } else {
        AStages.addRestrictionForItem(`${stageId}/item/${blockId}`, stageId, blockId)

        AStages.addRestrictionForOre(`${stageId}/ore/${blockId}`, stageId, blockId, replaceWith)
            .matchAllBlockStates()
            .affectPlayerActions()
    }

}

Object.entries({
    //#region First Steps

    "lead_ore": {
        oreId: "modern_industrialization:lead_ore",
        hide: ["modern_industrialization:raw_lead"],
        lootReplace: {
            "modern_industrialization:raw_lead": "ytech:pebble"
        },
        oreTag: "c:ores/lead",
        withDeepslate: true
    },

    "tin_ore": {
        oreId: "modern_industrialization:tin_ore",
        hide: ["modern_industrialization:raw_tin"],
        lootReplace: {
            "modern_industrialization:raw_tin": "minecraft:flint"
        },
        withDeepslate: true
    },
    "copper_ore": {
        oreId: "minecraft:copper_ore",
        hide: ["minecraft:raw_copper"],
        lootReplace: {
            "minecraft:raw_copper": "ytech:pebble",
        },
        replace: [{
            "minecraft:raw_copper_block": "chipped:smooth_raw_copper_block_column"
        }],
        withDeepslate: true
    },

    "iron_ore": {
        oreId: "minecraft:iron_ore",
        hide: ["minecraft:raw_iron"],
        lootReplace: {
            "minecraft:raw_iron": "farmersdelight:rope"
        },
        replace: [{
            "minecraft:raw_iron_block": "chipped:smooth_raw_iron_block_column"
        }],
        withDeepslate: true
    },
    "coal_ore": {
        oreId: "minecraft:coal_ore",
        additionalIds: ["modern_industrialization:lignite_coal_ore"],
        replace: [{
            "minecraft:coal_block": "architects_palette:charcoal_block"
        }],
        hide: ["modern_industrialization:lignite_coal", "minecraft:coal"],
        lootReplace: {
            "minecraft:coal": "supplementaries:ash",
            "modern_industrialization:lignite_coal": "supplementaries:ash"
        },
        withDeepslate: true
    },

    //#endregion

    //#region Rock And STEAM

    "redstone_ore": {
        oreId: "minecraft:redstone_ore",
        replace: [{
            "minecraft:redstone_block": "spectrum:redstone_sand"
        }],
        lootReplace: {
            "minecraft:redstone": "modern_industrialization:wood_pulp",
        },
        hide: ["minecraft:redstone"],
        withDeepslate: true
    },

    "lapis_ore": {
        oreId: "minecraft:lapis_ore",
        replace: [{
            "minecraft:lapis_block": "abyssal_decor:lapis_pillar"
        }],
        lootReplace: {
            "minecraft:lapis_lazuli": "minecraft:clay_ball",
        },
        hide: ["minecraft:lapis_lazuli"],
        withDeepslate: true
    },
    "gold_ore": {
        oreId: "minecraft:gold_ore",
        replace: [{
            "minecraft:raw_gold_block": "architects_palette:chiseled_gold_ore_bricks"
        }],
        hide: ["minecraft:raw_gold"],
        lootReplace: {
            "minecraft:raw_gold": "minecraft:bone",
        },
        withDeepslate: true
    },

    "quartz_ore": {
        oreId: "modern_industrialization:quartz_ore",
        hide: ["minecraft:quartz"],
        lootReplace: {
            "minecraft:quartz": "minecraft:string",
        },
        //withDeepslate: true
    },
    "salt_ore": {
        oreId: "modern_industrialization:salt_ore",
        hide: ["modern_industrialization:salt_crushed_dust"],
        withDeepslate: true
    },

    //#endregion

    //#region Steamy Hot Machinery

    "emerald_ore": {
        oreId: "minecraft:emerald_ore",
        replace: [{
            "minecraft:emerald_block": "architects_palette:chiseled_emerald_ore_bricks"
        }],
        hide: ["minecraft:emerald"],
        lootReplace: {
            "minecraft:emerald": "paganbless:essence_of_the_forest",
        },
        withDeepslate: true
    },
    "diamond_ore": {
        oreId: "minecraft:diamond_ore",
        replace: [{
            "minecraft:diamond_block": "architects_palette:chiseled_diamond_ore_bricks"
        }],
        hide: ["minecraft:diamond"],
        lootReplace: {
            "minecraft:diamond": "abyssal_decor:white_pearl",
        },
        withDeepslate: true
    },

    "nickel_ore": {
        oreId: "modern_industrialization:nickel_ore",
        hide: ["modern_industrialization:raw_nickel"],
        withDeepslate: true
    },

    "nether_quartz_ore": {
        oreId: "minecraft:nether_quartz_ore",
        builderCallback: (bulder) => {
            bulder.setReplaceId("minecraft:netherrack")
            bulder.setSampleReplaceId("rocks:netherrack_rock")
        }
    },

    //#endregion

    //#region Simple Machinery

    "antimony_ore": {
        oreId: "modern_industrialization:antimony_ore",
        hide: ["modern_industrialization:raw_antimony"],
        withDeepslate: true
    },

    "ancient_debris_ore": {
        oreId: "minecraft:ancient_debris",
        hide: ["minecraft:netherite_scrap"],
        lootReplace: {
            "minecraft:netherite_scrap": "minecraft:ender_pearl",
        },
        additionalIds: ["minecraft:nether_gold_ore"],
        builderCallback: (bulder) => {
            bulder.setReplaceId("minecraft:netherrack")
            bulder.setSampleReplaceId("rocks:netherrack_rock")
        }
    },

    "bauxite_ore": {
        hide: ["modern_industrialization:bauxite_crushed_dust"],
        oreId: "modern_industrialization:bauxite_ore",
        withDeepslate: true
    },

    //#endregion

    //#region Less-Simple Machinery

    "uranium_ore": {
        hide: ["modern_industrialization:raw_uranium"],
        oreId: "modern_industrialization:uranium_ore",
        withDeepslate: true
    },

    //#endregion

    //#region Automation 'n' Stuff

    
    //#endregion

    //#region Petrochemical Party

    "monazite_ore": {
        hide: ["modern_industrialization:monazite_crushed_dust"],
        oreId: "modern_industrialization:monazite_ore",
        withDeepslate: true
    },

    //#endregion

    //#region Da Digitalization

    "titanium_ore": {
        hide: ["modern_industrialization:raw_titanium"],
        oreId: "modern_industrialization:titanium_ore",
        //withDeepslate: true
    },
    "platinum_ore": {
        hide: ["modern_industrialization:raw_platinum"],
        oreId: "modern_industrialization:platinum_ore",
        //withDeepslate: true
    },


    "tungsten_ore": {
        hide: ["modern_industrialization:raw_tungsten"],
        oreId: "modern_industrialization:tungsten_ore",
        withDeepslate: true
    },

    //#endregion

    //#region Endgame

    "iridium_ore": {
        hide: ["modern_industrialization:raw_iridium"],
        oreId: "modern_industrialization:iridium_ore",
        //withDeepslate: true
    },

    //#endregion

}).forEach(([stageId, data]) => {


    let { oreId, additionalIds, builderCallback, oreTag , hide} = data

    AStages.customizeStage(stageId).whenGranted(event => {
        
        let player = event.getPlayer()
        if (player) {
            player.sendData("milf_new_stage", {
                stage: stageId
            })
        }

    })

    let builder = new OreEntryBuilder(oreId, `milf:${stageId}_sample`)

    if (builderCallback) {
        builderCallback(builder)
    }

    if(oreTag){
        builder.setOreTag(oreTag)
    }

    if(hide){
        AStages.addRestrictionForItem(`${stageId}/item/${oreId}/hide`, stageId, hide)
    }


    oreRestriction(stageId, builder.build())

    //console.log(builder.build());

    if (additionalIds){
        additionalIds.forEach(additionalId => {
            let additionalBuilder = new OreEntryBuilder(additionalId)

            if (builderCallback) {
                builderCallback(additionalBuilder)
            }

            additionalBuilder.setSampleReplaceId(null)
            
            //console.log(additionalBuilder.build());
            oreRestriction(stageId, additionalBuilder.build())

            if (data.withDeepslate) {
                additionalBuilder.deepslate()
                //console.log(additionalBuilder.build());
                oreRestriction(stageId, additionalBuilder.build())
            }
        })
    }

    if (data.replace) {
        data.replace.forEach(entry => {
            Object.entries(entry).forEach(([fromId, toId]) => {
                oreRestriction(stageId, {
                    oreId: fromId,
                    replaceWith: toId
                })



            })
        })

    }

    if (data.lootReplace) {
        Object.entries(data.lootReplace).forEach(([fromId, toId]) => {
            
            AStages.addRestrictionForLoot(`${stageId}/loot/${oreId}/${fromId}`, stageId)
                .applyEverywhere()
                .restrictItems([fromId])
                .replacer(stack => {
                    if (stack.id == fromId) {
                        return Item.of(toId, stack.getCount())
                    }

                    return stack
                })
        })

    }

    if (data.withDeepslate) {
        builder.deepslate()
        oreRestriction(stageId, builder.build())
        //console.log(builder.build());
    }


    
})


function oreRestriction(stageId, oreEntry) {
    let { oreId, sampleId, replaceWith, replaceSampleWith, oreTag } = oreEntry

    AStages.addRestrictionForItem(`${stageId}/item/${oreId}`, stageId, oreId)

    if (oreTag) {
        AStages.addRestrictionForTag(`${stageId}/tag/${oreTag}`, stageId, oreTag)
    }

    AStages.addRestrictionForOre(`${stageId}/ore/${oreId}`, stageId, oreId, replaceWith)
        .matchAllBlockStates()
        .affectPlayerActions()

    AStages.addRestrictionForLoot(`${stageId}/loot/${oreId}`, stageId)
        .applyEverywhere()
        .restrictItems([oreId])
        .replacer(stack => {
            if (stack.id == oreId) {
                return Item.of(replaceWith, stack.getCount())
            }

            return stack
        })

    if (replaceSampleWith){
        AStages.addRestrictionForOre(`${stageId}/${sampleId}`, stageId, sampleId, replaceSampleWith)
            .matchAllBlockStates()
            .affectPlayerActions()
    }
}

function OreEntryBuilder(oreId, sampleId){
    this.oreId = oreId


    this.config = {
        oreId: oreId,
        sampleId: sampleId,
        replaceWith: "minecraft:stone",
        replaceSampleWith: "rocks:rock",
        oreTag: null
    }

    this.deepslate = function(){
        this.config.oreId = this.config.oreId.replace(":", ":deepslate_")
        this.config.replaceWith = "minecraft:deepslate"
        return this
    }

    this.setReplaceId = function(id){
        this.config.replaceWith = id
        return this
    }

    this.setSampleReplaceId = function (id) {
        this.config.replaceSampleWith = id
        return this
    }

    this.setOreTag = function (tag) {
        this.config.oreTag = tag
        return this
    }

    this.build = function(){
        return this.config
    }
}