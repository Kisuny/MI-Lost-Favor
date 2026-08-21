ServerEvents.recipes(event => {

    miMachineRecipe(event, {energy:8, time:200, machine:"modern_industrialization:radio_transcriber",
        inputItems:[
            [{tag:"c:paper"}, 4],
            [{ item: "immersiveengineering:component_electronic_adv" }, 1, 0]
        ],
        outputItems:[[{ item: "milf:punched_card" }, 1, 0.37]],
    })

})