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
    "iron_blocks" : [
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

    "everburning_roots": [
        {
            blockId: "milf:everburning_roots_heart",
            replaceWith: "milf:everburning_roots"
        },
        {
            blockId: "milf:everburning_roots_veins",
            replaceWith: "milf:everburning_roots"
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

            AStages.addRestrictionForLoot(`${stageId}/loot/${id}`, stageId)
                .applyEverywhere()
                .restrictItems([id])
                .replacer(stack => {
                    if (stack.id == id) {
                        return Item.of(replaceWith, stack.getCount())
                    }

                    return stack
                })
        })
    } else {
        AStages.addRestrictionForItem(`${stageId}/item/${blockId}`, stageId, blockId)

        AStages.addRestrictionForOre(`${stageId}/ore/${blockId}`, stageId, blockId, replaceWith)
            .matchAllBlockStates()
            .affectPlayerActions()

        AStages.addRestrictionForLoot(`${stageId}/loot/${blockId}`, stageId)
            .applyEverywhere()
            .restrictItems([blockId])
            .replacer(stack => {
                if (stack.id == blockId) {
                    return Item.of(replaceWith, stack.getCount())
                }

                return stack
            })
    }

}

