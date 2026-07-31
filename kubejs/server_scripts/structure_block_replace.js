const BLOCK_REPLACEMENTS = {
    'minecraft:enchanting_table': 'minecraft:lectern',
    'minecraft:blast_furnace': 'ytech:primitive_smelter',
    'minecraft:crafting_table': 'minecraft:bookshelf',
    'minecraft:hopper': 'woodenhopper:wooden_hopper',
    'immersiveengineering:workbench': 'supplementaries:clock_block',
    'immersiveengineering:crate': 'minecraft:barrel',
    'eidolon_repraised:lead_block': 'modern_industrialization:lead_block',
    'minecraft:iron_block': 'minecraft:raw_iron_block',
    'minecraft:gold_block': 'minecraft:raw_gold_block',
    'eidolon_repraised:crucible': 'minecraft:cauldron',
    'minecraft:anvil' :  "minecraft:grindstone",
    'minecraft:chipped_anvil' : "minecraft:grindstone",
    'minecraft:damaged_anvil': "minecraft:grindstone",
};

MoreJS.structureLoad((event) => {
    event.forEachPalettes((palette) => {
        palette.forEach((blockInfo) => {
            const replacement = BLOCK_REPLACEMENTS[blockInfo.id];
            if (replacement) {
                // console.log(`[milf] ${event.id}: ${blockInfo.id} -> ${replacement}`);
                blockInfo.setBlock(replacement);
                return;
            }

            if (blockInfo.id === 'minecraft:jigsaw') {
                const finalState = blockInfo.getNbt().getString('final_state');
                const jigsawReplacement = BLOCK_REPLACEMENTS[finalState];
                if (jigsawReplacement) {
                    // console.log(`[milf] ${event.id}: jigsaw final_state ${finalState} -> ${jigsawReplacement}`);
                    blockInfo.nbt().putString('final_state', jigsawReplacement);
                }
            }
        });
    });
});
