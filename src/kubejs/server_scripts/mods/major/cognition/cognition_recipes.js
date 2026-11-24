ServerEvents.recipes(event => {
    event.replaceInput({ mod: 'cognition' }, 'minecraft:emerald', 'enchanted:attuned_stone')
    event.replaceInput({ mod: 'cognition' }, 'minecraft:copper_ingot', 'embers:dawnstone_ingot')

    miMachineRecipe(event, {energy:2, time:100, machine:"modern_industrialization:mixer",
        inputItems:[
            [{tag:'milf:basic_gemstone_powders'}, 4],
        ],
        inputFluids: [
            [{ fluid: "milf:shimmersteel_essence" }, 20],
        ],
        outputItems:[[{item:"cognition:cognitive_flux"}, 6]],
        removeRecipe: true
    })

    embersStampingRecipe(event, {
        inputItems: [
            [{ item: "embers:flat_stamp" }],
            [{ tag: "milf:basic_gemstone_powders" }],
        ],
        inputFluids: [
            [{ fluid: "milf:shimmersteel_essence" }, 10]
        ],
        outputItems: [
            [{ id: "cognition:cognitive_flux" }, 1],
        ]
    })




    pedestalFromRecipe(event, {
        id: "cognition:molecular_metamorpher",
        tier: "basic",
        time: 400,
        experience: 1.0,
        topaz: 20,
        advancement: "spectrum:place_pedestal",
        yield_upgrades: false
    });

});
