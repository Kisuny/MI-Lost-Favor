ServerEvents.recipes(event => {

    miMachineRecipe(event, {energy:8, time:2000, machine:"modern_industrialization:radio_transcriber",
        inputItems:[
            [{tag:"c:paper"}, 1],
            [{ item: "immersiveengineering:manual" }, 1, 0]
        ],
        outputItems:[[{ item: "milf:punched_card" }, 1]],
    })

})