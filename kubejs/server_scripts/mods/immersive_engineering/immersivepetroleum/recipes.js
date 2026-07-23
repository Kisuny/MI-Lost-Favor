KubeJSTweaks.beforeRecipes(event =>{

    const disableByRecipeID = [
        "immersivepetroleum:arcfurnace/steel",
        "immersivepetroleum:refinery/phenol",
        "immersivepetroleum:refinery/gasoline",
        "immersivepetroleum:distillationtower/oil",
        "immersivepetroleum:distillationtower/kerosene",
        "immersivepetroleum:coking/petcoke",
        "immersivepetroleum:hydrotreater/sulfur_recovery",
        "immersivepetroleum:hydrotreater/lubricant_cracking",
        "immersivepetroleum:hydrotreater/naphtha_cracking",
    ]

    disableByRecipeID.forEach(id =>{
        event.disable(id)
    })
    

})

ServerEvents.recipes(event => {

    ieShapedFluid(event, {
        pattern: [
            "SCS",
            "GBG",
            "SCS"
        ],
        key: {
            "B": {
                "type": "immersiveengineering:fluid_stack",
                "amount": 1000,
                "tag": "minecraft:water"
            },
            "C": {
                "item": "immersivepetroleum:bitumen"
            },
            "G": {
                "tag": "c:gravels"
            },
            "S": {
                "tag": "c:sands"
            }
        },
        outputItems: [[{ id: "immersivepetroleum:asphalt" }, 8]],
        removeRecipe: true,
        compatOff:true
    })

    miMachineRecipe(event, {
        energy: 2, time: 100, machine: "modern_industrialization:mixer",
        inputItems: [
            [{ item: "immersivepetroleum:bitumen" }, 2],
            [{ tag: "c:gravels" }, 2],
            [{ tag: "c:sands" }, 4]
        ],
        inputFluids: [
            [{ tag: "minecraft:water" }, 1000],
        ],
        outputItems: [
            [{ item: "immersivepetroleum:asphalt" }, 8]
        ]
    })

})