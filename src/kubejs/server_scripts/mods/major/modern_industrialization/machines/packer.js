ServerEvents.recipes(event => {

    miMachineRecipe(event, {energy:4, time:300, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"modern_industrialization:trash_can"}, 3]
        ],
        inputItems:[
            [{item:"modern_industrialization:steel_upgrade"}, 1],
            [{item:"minecraft:magma_block"}, 3],
        ],
        removeRecipe:true
    })

    miMachineRecipe(event, {energy:4, time:300, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"modern_industrialization:configurable_tank"}]
        ],
        inputItems:[
            [{ item:"immersiveengineering:component_electronic"}],
            [{item:"milf:basic_pump"}, 2],
            [{item:"modern_industrialization:aluminum_tank"}],
        ],
        removeRecipe:true
    })

    miMachineRecipe(event, {energy:8, time:300, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"modern_industrialization:silicon_ingot"}]
        ],
        inputItems:[
            [{item:"ae2:silicon"}, 2],
        ]
    })

    miMachineRecipe(event, {energy:4, time:300, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"modern_industrialization:fire_clay_bricks"}, 3]
        ],
        inputItems:[
            [{item:"modern_industrialization:fire_clay_brick"}, 4],
            [{item:"architects_palette:cerebral_plate"}, 5]
        ],
        removeRecipe:true
    })

    miMachineRecipe(event, {
        energy:4, time:100, machine:"modern_industrialization:packer",
        inputItems:[
            [{item: "milf:fire_clay_ball"}, 2],
            [{item: "ytech:brick_mold" }, 1, 0]
        ],
        outputItems:[[{item:"milf:unfired_fire_clay_brick"}, 2]]
    })

    miMachineRecipe(event, {
        energy:4, time:100, machine:"modern_industrialization:packer",
        inputItems:[
            [{item: "minecraft:clay_ball"}, 2],
            [{item: "ytech:brick_mold" }, 1, 0]
        ],
        outputItems:[[{item:"milf:unfired_brick"}, 3]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "embers:caminite_blend" }, 2],
            [{ item: "ytech:brick_mold" }, 1, 0]
        ],
        outputItems: [[{ item: "milf:unfired_caminite_brick" }, 5]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "embers:caminite_blend" }, 2],
            [{ item: "embers:plate_stamp" }, 1, 0]
        ],
        outputItems: [[{ item: "embers:raw_caminite_plate" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "minecraft:redstone" }, 2],
            [{ item: "embers:item_pipe" }, 1],
            [{ item: "embers:caminite_plate" }, 1]
        ],
        outputItems: [[{ item: "embers:item_extractor" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "minecraft:redstone" }, 2],
            [{ item: "embers:fluid_pipe" }, 1],
            [{ item: "embers:caminite_plate" }, 1]
        ],
        outputItems: [[{ item: "embers:fluid_extractor" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:tin_bolt" }, 1],
            [{ item: "milf:bronze_glass" }, 1],
            [{ item: "modern_industrialization:iron_plate" }, 1]
        ],
        outputItems: [[{ item: "embers:fluid_dial" }, 2]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:tin_bolt" }, 1],
            [{ item: "milf:bronze_glass" }, 1],
            [{ item: "modern_industrialization:lead_plate" }, 1]
        ],
        outputItems: [[{ item: "embers:item_dial" }, 2]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:tin_bolt" }, 1],
            [{ item: "milf:bronze_glass" }, 1],
            [{ item: "modern_industrialization:copper_plate" }, 1]
        ],
        outputItems: [[{ item: "embers:ember_dial" }, 2]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:tin_bolt" }, 1],
            [{ item: "milf:bronze_glass" }, 1],
            [{ item: "modern_industrialization:silver_plate" }, 1]
        ],
        outputItems: [[{ item: "embers:clockwork_attenuator" }, 2]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 400, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:iron_gear" }, 1],
            [{ item: "milf:steel_infused_glass" }, 1],
            [{ item: "milf:small_steel_fluid_container" }, 1]
        ],
        outputItems: [[{ item: "immersiveengineering:component_iron" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 400, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:bronze_gear" }, 1],
            [{ item: "milf:bronze_glass" }, 1],
            [{ item: "milf:small_copper_fluid_container" }, 1]
        ],
        outputItems: [[{ item: "milf:bronze_mechanical_component" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 109*2, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:steel_plate" }, 2],
            [{ item: "modern_industrialization:steel_bolt" }, 2],
        ],
        outputItems: [[{ item: "milf:small_steel_fluid_container" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 109*2, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:copper_plate" }, 2],
            [{ item: "modern_industrialization:copper_bolt" }, 2],
        ],
        outputItems: [[{ item: "milf:small_copper_fluid_container" }, 1]]
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:packer",
        inputItems: [[{ item: "immersiveengineering:ersatz_leather" }, 2]],
        outputItems: [[{ item: "minecraft:leather" }]]
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "immersiveengineering:wirecoil_electrum" }, 1],
            [{ item: "immersiveengineering:hemp_fabric" }, 1],

        ],
        outputItems: [[{ item: "immersiveengineering:wirecoil_electrum_ins" }, 1]],
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "immersiveengineering:wirecoil_copper" }, 1],
            [{ item: "immersiveengineering:hemp_fabric" }, 1],

        ],
        outputItems: [[{ item: "immersiveengineering:wirecoil_copper_ins" }, 1]],
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:copper_drill_head" }, 1],
            [{ item: "modern_industrialization:tin_gear" }, 1],
            [{ item: "milf:steel_machine_bit" }, 1]

        ],
        outputItems: [[{ item: "modern_industrialization:copper_drill" }, 4]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 3, time: 160, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:copper_drill" }, 1],
            [{ item: "modern_industrialization:gold_drill_head" }, 1],
            [{ item: "immersiveengineering:component_iron" }, 1]

        ],
        outputItems: [[{ item: "modern_industrialization:gold_drill" }, 4]],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 3, time: 160, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:copper_drill" }, 1],
            [{ item: "modern_industrialization:bronze_drill_head" }, 1],
            [{ item: "milf:bronze_mechanical_component" }, 1]

        ],
        outputItems: [[{ item: "modern_industrialization:bronze_drill" }, 4]],
        removeRecipe: true
    })

})