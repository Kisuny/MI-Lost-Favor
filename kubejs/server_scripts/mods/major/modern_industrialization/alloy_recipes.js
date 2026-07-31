function addAlloyRecipes(event, materialName, components, args){

    args = args || {}

    let baseEnergy = args.baseEnergy || 2
    let baseTime = args.baseTime || 100
    let totalAmount = components.reduce((accumulator, currentComponent) => {
        return accumulator + currentComponent.amount
    }, 0)

    miMachineRecipe(event, {
        energy: baseEnergy, time: baseTime, machine: "modern_industrialization:mixer",
        inputItems: components.map(component => [{ item: `modern_industrialization:${component.name}_tiny_dust` }, component.amount]),
        outputItems: [[{ item: `modern_industrialization:${materialName}_tiny_dust` }, totalAmount]],
        removeRecipeType: "modern_industrialization:mixer"
    })

    miMachineRecipe(event, {
        energy: baseEnergy, time: baseTime, machine: "modern_industrialization:mixer",
        inputItems: components.map(component => [{ item: `modern_industrialization:${component.name}_dust` }, component.amount]),
        outputItems: [[{ item: `modern_industrialization:${materialName}_dust` }, totalAmount]],
        removeRecipeType: "modern_industrialization:mixer"
    })

    miMachineRecipe(event, {
        machine: "extended_industrialization:alloy_smelter",
        energy: baseEnergy * 2,
        time: baseTime * 2,
        inputItems: components.map(component => ([
            { 
                type: "neoforge:compound",
                amount: component.amount * 9,
                children: [
                    { item: `modern_industrialization:${component.name}_tiny_dust` },
                    { item: `${component.nuggetMod || "modern_industrialization"}:${component.name}_nugget` }
                ]
                
            }
        ])),
        outputItems: [[{ item: `modern_industrialization:${materialName}_ingot` }, totalAmount]],
        removeRecipeType: "extended_industrialization:alloy_smelter"
    })

    miMachineRecipe(event, {
        machine: "extended_industrialization:alloy_smelter",
        energy: baseEnergy * 2,
        time: baseTime * 2,
        inputItems: components.map(component => ([
            {
                type: "neoforge:compound",
                amount: component.amount,
                children: [
                    { item: `modern_industrialization:${component.name}_dust` },
                    { item: `${component.ingotMod || "modern_industrialization"}:${component.name}_ingot` }
                ]

            }
        ])),
        outputItems: [[{ item: `modern_industrialization:${materialName}_ingot` }, totalAmount]],
        removeRecipeType: "extended_industrialization:alloy_smelter"
    })

    if(args.blockRecipe){
        miMachineRecipe(event, {
            energy: baseEnergy * 9, time: baseTime * 2, machine: "extended_industrialization:alloy_smelter",
            inputItems: components.map(component => [
                { item: `${component.blockMod ? component.blockMod : "modern_industrialization"}:${component.name}_block` }, component.amount]
            ),
            outputItems: [[{ item: `modern_industrialization:${materialName}_block` }, totalAmount]],
            removeRecipeType: "modern_industrialization:mixer"
        })
    }




}

ServerEvents.recipes(event => {
    addAlloyRecipes(event, "tumbaga", [
        { name: "copper", amount: 2, ingotMod: "minecraft" , blockMod: "minecraft"}, 
        { name: "gold", amount: 1, ingotMod: "minecraft", nuggetMod: "minecraft", blockMod: "minecraft" }
    ])
    addAlloyRecipes(event, "constantan", [
        { name: "copper", amount: 1, ingotMod: "minecraft", blockMod: "minecraft" }, 
        { name: "nickel", amount: 1 }
    ],{
        blockRecipe: true
    })
    addAlloyRecipes(event, "cupronickel", [
        { name: "copper", amount: 1, ingotMod: "minecraft", blockMod: "minecraft" }, 
        { name: "constantan", amount: 1 }
    ],
    {
        baseEnergy: 16,
        blockRecipe: true
    })


})