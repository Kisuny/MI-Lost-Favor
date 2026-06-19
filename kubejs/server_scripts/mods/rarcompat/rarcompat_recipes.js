ServerEvents.recipes(event => {

    miMachineCraft(event, {energy:2, time:600, machine:"modern_industrialization:mixer",
        inputItems:[
            [{item:"eidolon_repraised:soul_shard"}, 2],
            [{item:"occultism:echo_dust"}],
            [{item:"milf:artifact_dust"}],
        ],
        outputItems:[
            [{item:"rarcompat:mimi_dust"}]
        ],
        removeRecipe: true
    })

})