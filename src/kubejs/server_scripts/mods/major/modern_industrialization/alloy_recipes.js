function addAlloyRecipes(event, outputMaterial, components, args){

    args = args || {}

    let baseEnergy = args.baseEnergy || 2
    let baseTime = args.baseTime || 100
    let totalAmount = components.reduce((accumulator, currentComponent) => {
        return accumulator + currentComponent[1]
    }, 0)

    miMachineRecipe(event, {
        energy: baseEnergy, time: baseTime, machine: "modern_industrialization:mixer",
        inputItems: components.map(component => [{ item: component[0].tiny_dust }, component[1]]),
        outputItems: [[{ item: outputMaterial.tiny_dust }, totalAmount]],
        removeRecipeType: "modern_industrialization:mixer"
    })

    miMachineRecipe(event, {
        energy: baseEnergy, time: baseTime, machine: "modern_industrialization:mixer",
        inputItems: components.map(component => [{ item: component[0].dust }, component[1]]),
        outputItems: [[{ item: outputMaterial.dust }, totalAmount]],
        removeRecipeType: "modern_industrialization:mixer"
    })

    if(components.length != 2) return

    miMachineRecipe(event, {
        machine: "extended_industrialization:alloy_smelter",
        energy: baseEnergy * 2,
        time: baseTime * 2,
        inputItems: components.map(component => ([
            { 
                type: "neoforge:compound",
                amount: component[1] * 9,
                children: [
                    { item: component[0].tiny_dust },
                    { item: component[0].nugget }
                ]
                
            }
        ])),
        outputItems: [[{ item: outputMaterial.ingot }, totalAmount]],
        removeRecipeType: "extended_industrialization:alloy_smelter"
    })

    miMachineRecipe(event, {
        machine: "extended_industrialization:alloy_smelter",
        energy: baseEnergy * 2,
        time: baseTime * 2,
        inputItems: components.map(component => ([
            {
                type: "neoforge:compound",
                amount: component[1],
                children: [
                    { item: component[0].dust },
                    { item: component[0].ingot }
                ]

            }
        ])),
        outputItems: [[{ item: outputMaterial.ingot }, totalAmount]],
        removeRecipeType: "extended_industrialization:alloy_smelter"
    })

    if(args.blockRecipe){
        miMachineRecipe(event, {
            energy: baseEnergy * 9, time: baseTime * 2, machine: "extended_industrialization:alloy_smelter",
            inputItems: components.map(component => [
                { item: component[0].block }, component[1]]
            ),
            outputItems: [[{ item: outputMaterial.block }, totalAmount]],
            removeRecipeType: "extended_industrialization:alloy_smelter"
        })
    }




}

ServerEvents.recipes(event => {

    let copper = new MIMaterialBuilder("copper")
        .setPart(MIMaterialBuilder.PartType.ingot, "minecraft:copper_ingot")
        .setPart(MIMaterialBuilder.PartType.block, "minecraft:copper_block")
        .build()

    let gold = new MIMaterialBuilder("gold")
        .setPart(MIMaterialBuilder.PartType.ingot, "minecraft:gold_ingot")
        .setPart(MIMaterialBuilder.PartType.block, "minecraft:gold_block")
        .setPart(MIMaterialBuilder.PartType.nugget, "minecraft:gold_nugget")
        .build()

    let redstone = new MIMaterialBuilder("redstone")
        .setPart(MIMaterialBuilder.PartType.ingot, null)
        .setPart(MIMaterialBuilder.PartType.block, "minecraft:redstone_block")
        .setPart(MIMaterialBuilder.PartType.dust, "minecraft:redstone")
        .setPart(MIMaterialBuilder.PartType.nugget, null)
        .build()

    let dawnstone = new MIMaterialBuilder("dawnstone")
        .setPart(MIMaterialBuilder.PartType.ingot, "embers:dawnstone_ingot")
        .setPart(MIMaterialBuilder.PartType.block, "embers:dawnstone_block")
        .build()

    let nickel = new MIMaterialBuilder("nickel").build()
    let constantan = new MIMaterialBuilder("constantan").build()
    let cupronickel = new MIMaterialBuilder("cupronickel").build()
    let tumbaga = new MIMaterialBuilder("tumbaga").build()

    addAlloyRecipes(event, dawnstone, [
        [copper, 1],
        [gold, 1]
    ], {
        blockRecipe: true
    })

    addAlloyRecipes(event, constantan, [
        [copper, 1],
        [nickel, 1]
    ],{
        blockRecipe: true
    })

    addAlloyRecipes(event, cupronickel, [
        [copper, 1],
        [constantan, 1]
    ],
    {
        baseEnergy: 16,
        blockRecipe: true
    })

    addAlloyRecipes(event, tumbaga, [
        [copper, 1],
        [redstone, 1],
        [dawnstone, 1]
    ], {
        baseEnergy: 4,
        baseTime: 200
    })

})

function MIMaterialBuilder(name){
    this.name = name

    this.config = {
        ingot: `modern_industrialization:${name}_ingot`,
        dust: `modern_industrialization:${name}_dust`,
        tiny_dust: `modern_industrialization:${name}_tiny_dust`,
        block: `modern_industrialization:${name}_block`,
        nugget: `modern_industrialization:${name}_nugget`,
    }

    this.setPart = function(partType, id){
        this.config[partType] = id
        return this
    }

    this.build = function(){
        return this.config
    }

}

MIMaterialBuilder.PartType = {
    ingot: "ingot",
    dust: "dust",
    tiny_dust: "tiny_dust",
    block: "block",
    nugget: "nugget"
}