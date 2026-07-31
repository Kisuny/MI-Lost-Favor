/**
 * IE bottling machine recipe
 *  - `args`:
 *      - `inputItems` : Array (max 3 elements) - each element looks like this : [{ tag|item : name }, amount], amount defaults to 1 if not specified
 *      - `outputItems` : Array (max 3 elements) - each element looks like this : [{ item : name }, amount], amount defaults to 1 if not specified
 *      - `inputFluids` : Array (max 1 elements) - each element looks like this : [{ fluid : name }, amount], amount defaults to 1000 if not specified
 *      - --------
 *      - `removeRecipe`: Boolean - if true: removes all other default recipes with this outputs
 *      - `compatOff`: Boolean - if true : function will NOT add compatible mi recipe, if not specified then recipe WILL be added
*/
const ieBottlingMachineRecipe = (event, args) => {
    let recipe = {
        type: "immersiveengineering:bottling_machine",
        inputs: [],
        results: [],
        fluid: Object.assign({},args.inputFluids[0][0], {amount: args.inputFluids[0][1] || 1000}),
    }
    args.inputItems.forEach((input) => {recipe.inputs.push(Object.assign({},{"basePredicate": input[0]}, {count:input[1] || 1}))})
    args.outputItems.forEach((out) => {recipe.results.push(Object.assign({},{"basePredicate": out[0]}, {count:out[1] || 1}))})
    if(!args.compatOff){
        miMachineRecipe(event, {energy:8, time:100, machine:"modern_industrialization:assembler",
            inputItems:args.inputItems,
            outputItems:args.outputItems,
            inputFluids:args.inputFluids
        })
    }
    if(args.removeRecipe){args.outputItems.forEach((out) => event.remove({output: out[0].item}))}
    if (args.removeRecipeType) {
        args.outputItems.forEach((out) => {
            event.remove({ output: out[0]?.item || `#${out[0].tag}`, type: args.removeRecipeType })
        })
    }
    event.custom(recipe)
}

ServerEvents.recipes(event => {

    ieBottlingMachineRecipe(event, {
        outputItems:[
            [{item:"modern_industrialization:plastic_plate"}],
            [{item:"immersiveengineering:mold_plate"}, 1]
        ],
        inputFluids:[
            [{fluid:"milf:liquid_plastic"}, 100]
        ],
        inputItems:[
            [{item:"immersiveengineering:mold_plate"}, 1]
        ],
        compatOff:true
    })

    // ieBottlingMachineRecipe(event, {
    //     outputItems:[
    //         [{item:"milf:basic_machine_bit"}, 8],
    //         [{item:"milf:bits_mold"}, 1]
    //     ],
    //     inputFluids:[
    //         [{fluid:"milf:liquid_plastic"}, 1000]
    //     ],
    //     inputItems:[
    //         [{item:"milf:bits_mold"}, 1]
    //     ],
    //     compatOff:true
    // })

    // ieBottlingMachineRecipe(event, {
    //     outputItems: [
    //         [{ item: "modern_industrialization:basic_machine_hull" }, 1]
    //     ],
    //     inputFluids: [
    //         [{ fluid: "milf:liquid_plastic" }, 1500]
    //     ],
    //     inputItems: [
    //         [{ item: "modern_industrialization:tin_cable" }, 4],
    //         [{ item: "modern_industrialization:portable_storage_unit" }],
    //         [{ item: "milf:tempered_glass" }]
    //     ],
    //     compatOff: true
    // })

    function bottling_recipe(inputs, fluid, outputs) {
        ieBottlingMachineRecipe(event, {
            inputItems:inputs,
            outputItems:outputs,
            inputFluids:[[{fluid:fluid[0]}, fluid[1]]],
            compatOff:true
        })
    }

    function ae_processor (printedCircuit, output) {
        bottling_recipe(
            [
                [ { "item": "ae2:printed_silicon" }, 1 ],
                [ { "item": printedCircuit }, 1 ]
            ],
            [ "modern_industrialization:molten_redstone", 250 ],
            [
                [ { "item": output }, 1 ]
            ]
        );
    }

    function ae_item_cell (cellComponent, output) {
        bottling_recipe(
            [
                [ { "item": "ae2:quartz_glass" }, 2 ],
                [ { "item": "ae2:item_cell_housing" }, 1 ],
                [ { "item": cellComponent }, 1 ]
            ],
            [ "modern_industrialization:molten_redstone", 500 ],
            [
                [ { "item": output }, 1 ]
            ]
        );
    }

    function ae_fluid_cell (cellComponent, output) {
        bottling_recipe(
            [
                [ { "item": "ae2:quartz_glass" }, 2 ],
                [ { "item": "ae2:fluid_cell_housing" }, 1 ],
                [ { "item": cellComponent }, 1 ]
            ],
            [ "modern_industrialization:molten_redstone", 500 ],
            [
                [ { "item": output }, 1 ]
            ]
        );
    }

    ae_processor("ae2:printed_logic_processor", "ae2:logic_processor")
    ae_processor("ae2:printed_engineering_processor", "ae2:engineering_processor")
    ae_processor("ae2:printed_calculation_processor", "ae2:calculation_processor")


    ae_item_cell("ae2:cell_component_1k", "ae2:item_storage_cell_1k")
    ae_item_cell("ae2:cell_component_4k", "ae2:item_storage_cell_4k")
    ae_item_cell("ae2:cell_component_16k", "ae2:item_storage_cell_16k")
    ae_item_cell("ae2:cell_component_64k", "ae2:item_storage_cell_64k")
    ae_item_cell("ae2:cell_component_256k", "ae2:item_storage_cell_256k")

    ae_fluid_cell("ae2:cell_component_1k", "ae2:fluid_storage_cell_1k")
    ae_fluid_cell("ae2:cell_component_4k", "ae2:fluid_storage_cell_4k")
    ae_fluid_cell("ae2:cell_component_16k", "ae2:fluid_storage_cell_16k")
    ae_fluid_cell("ae2:cell_component_64k", "ae2:fluid_storage_cell_64k")
    ae_fluid_cell("ae2:cell_component_256k", "ae2:fluid_storage_cell_256k")

    // AE Cores
    bottling_recipe(
        [
            [ { "item": "ae2:quartz_glass" }, 4 ],
            [ { "item": "ae2:calculation_processor" }, 2 ],
            [ { "item": "milf:core_hull" }, 1 ]
        ],
        [ "modern_industrialization:polyethylene", 500 ],
        [
            [ { "item": "ae2:annihilation_core" }, 1 ]
        ]
    )

    bottling_recipe(
        [
            [ { "item": "ae2:quartz_glass" }, 4 ],
            [ { "item": "ae2:engineering_processor" }, 2 ],
            [ { "item": "milf:core_hull" }, 1 ]
        ],
        [ "modern_industrialization:polyethylene", 500 ],
        [
            [ { "item": "ae2:formation_core" }, 1 ]
        ]
    )

    ieBottlingMachineRecipe(event, {
        outputItems: [
            [{ item: "immersiveengineering:electric_lantern" }, 1],
        ],
        inputFluids: [
            [{ fluid: "modern_industrialization:soldering_alloy" }, 200]
        ],
        inputItems: [
            [{ item: "milf:steel_infused_glass" }, 2],
            [{ item: "immersiveengineering:light_bulb" }, 1],
            [{ item: "modern_industrialization:copper_wire" }, 2]
        ],
        removeRecipe:true
    })

})