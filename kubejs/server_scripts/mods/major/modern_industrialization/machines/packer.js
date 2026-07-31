ServerEvents.recipes(event => {

    //ae stuff
    /*
    var tier1token = "milf:mysterious_disk"
    var tier2token = "milf:storage_disk"
    var tier3token = "milf:automation_disk"
    var tier4token = "milf:quantum_disk"
    */

    var tier1token = "#mi_lost_favor:tier_1_recipes"
    var tier2token = "#mi_lost_favor:tier_2_recipes"
    var tier3token = "#mi_lost_favor:tier_3_recipes"
    var tier4token = "#mi_lost_favor:tier_4_recipes"

    function ae_press_recipes (pressForm, input, output, token) {
        event.recipes.modern_industrialization.packer(8, 40)
        .itemIn(input)
        .itemIn(pressForm,0)
        .itemIn(token,0)
        .itemOut(output)
    }
    //tier 2
    ae_press_recipes ("ae2:silicon_press", "#c:ingots/silicon", "ae2:printed_silicon", tier3token)
    ae_press_recipes ("ae2:logic_processor_press", "#c:ingots/gold", "ae2:printed_logic_processor", tier3token)
    ae_press_recipes ("milf:cell_press", "#c:plates/iron", "milf:cell_half", tier3token)

    //tier 3
    ae_press_recipes ("ae2:calculation_processor_press", "#c:gems/certus_quartz", "ae2:printed_calculation_processor", tier3token)
    ae_press_recipes ("ae2:engineering_processor_press", "#c:ingots/aluminum", "ae2:printed_engineering_processor", tier3token)
    ae_press_recipes ("milf:hemispherical_press_mold", "#c:plates/iron", "milf:core_hull", tier3token)

    //tier 4
    ae_press_recipes ("advanced_ae:quantum_processor_press", "advanced_ae:quantum_alloy", "advanced_ae:printed_quantum_processor", tier4token)
    ae_press_recipes ("megacells:accumulation_processor_press", "megacells:sky_steel_ingot", "megacells:printed_accumulation_processor", tier4token)

    //tier 5
    //ae_press_recipes ("extendedae:concurrent_processor_press", "extendedae:entro_crystal", "extendedae:concurrent_processor_print", tier4token)


    miMachineRecipe(event, {energy:4, time:300, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"sophisticatedstorage:compacting_upgrade"}]
        ],
        inputItems:[
            [{tag:"sophisticatedstorage:all_storage"}],
            [{item:"minecraft:piston"}, 4],
            [{item:"sophisticatedstorage:upgrade_base"}],
        ],
        removeRecipe:true
    })

    miMachineRecipe(event, {energy:4, time:300, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"modern_industrialization:trash_can"}]
        ],
        inputItems:[
            [{item:"modern_industrialization:steel_upgrade"}, 1],
            [{item:"minecraft:magma_block"}, 4],
        ],
        removeRecipe:true
    })

    miMachineRecipe(event, {energy:8, time:300, machine:"modern_industrialization:packer",
        outputItems:[
            [{item:"sophisticatedstorage:advanced_compacting_upgrade"}]
        ],
        inputItems:[
            [{tag:"sophisticatedstorage:all_storage"}],
            [{item:"modern_industrialization:piston"}, 4],
            [{item:"sophisticatedstorage:compacting_upgrade"}],
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

    miMachineRecipe(event, {
        energy: 8, time: 1000, machine: "modern_industrialization:packer",
        outputItems: [
            [{ item: "modern_industrialization:electric_quarry" }]
        ],
        inputItems: [
            [{ item: "modern_industrialization:advanced_machine_hull" }],
            [{ item: "milf:excavator_full_placer" }, 1],
            [{ item: "modern_industrialization:robot_arm" }, 4],
        ],
        removeRecipe: true
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
            [{item:"modern_industrialization:fire_clay_bricks"}]
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
        outputItems:[[{item:"ytech:unfired_brick"}, 3]]
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:packer",
        inputItems: [[{ item: "immersiveengineering:ersatz_leather" }, 2]],
        outputItems: [[{ item: "minecraft:leather" }]]
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:packer",
        inputItems: [
            [{ item: "modern_industrialization:coal_dust" }, 1],
            [{ item: "modern_industrialization:bronze_machine_casing" }, 1]
        ],
        outputItems: [[{ item: "moderndynamics:machine_extender" }, 1]]
    })

})