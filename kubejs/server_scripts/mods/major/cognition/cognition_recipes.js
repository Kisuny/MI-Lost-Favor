ServerEvents.recipes(event => {
    // event.remove({id: "cognition:cognitive_flux"})
    event.replaceInput({ mod: 'cognition' }, 'minecraft:emerald', 'enchanted:attuned_stone')
    event.replaceInput({ mod: 'cognition' }, 'minecraft:copper_ingot', 'embers:dawnstone_ingot')

    miMachineRecipe(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{tag:'milf:basic_gemstone_powders'}, 4],
            [{item:"minecraft:soul_sand"}, 1, 0.5],
            [{item:"minecraft:lapis_lazuli"}],
        ],
        inputFluids: [
            [{ fluid: "milf:shimmersteel_essence" }, 20],
        ],
        outputItems:[[{item:"cognition:cognitive_flux"}, 6]],
        removeRecipe: true
    })

});
