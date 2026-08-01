ServerEvents.recipes(event => {

    miMachineRecipe(event, {energy:8, time:2000, machine:"modern_industrialization:radio_transcriber",
        inputItems:[
            [{tag:"c:paper"}, 1],
            [{ item: "immersiveengineering:component_electronic_adv" }, 1, 0]
        ],
        outputItems:[[{ item: "milf:punched_card" }, 1, 0.37]],
    })

})