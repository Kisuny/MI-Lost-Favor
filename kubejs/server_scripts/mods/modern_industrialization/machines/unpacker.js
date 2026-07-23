ServerEvents.recipes(event => {

    miMachineRecipe(event, {energy:4, time:300, machine:"modern_industrialization:unpacker",
        outputItems:[
            [{item:"mi_tweaks:not_so_multi_but_still_block_packer_2099_3x3x3_edition"}, 2]
        ],
        inputItems:[
            [{item:"mi_tweaks:multiblock_packer_3000_safety_regulations_edition"}, 1],
        ]
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:unpacker",
        outputItems: [
            [{ item: "milf:larva" }, 1, 0.5]
        ],
        inputItems: [
            [{ item: "minecraft:rotten_flesh" }, 1],
        ]
    })


})