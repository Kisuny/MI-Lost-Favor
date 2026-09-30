ServerEvents.recipes(event => {

    miMachineRecipe(event, {energy:4, time:400, machine:"extended_industrialization:alloy_smelter",
        inputItems:[
            [{tag:`c:glass_blocks`}, 2],
            [{tag:`c:dusts/iron`}, 1]
        ],
        outputItems:[
            [{item:`immersiveengineering:insulating_glass`}, 2],
        ]
    })

})