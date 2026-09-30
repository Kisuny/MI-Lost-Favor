/*
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⣀⠐⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣄⠀⣀⡑⠫⡀⡆⢀⣤⠀⠀⠀⠀⠀⠀
⠀⠀⠀⡀⠀⠠⣀⣀⣀⠠⠿⠚⠉⠀⠈⢂⣀⡵⠋⣽⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠱⣄⠀⢀⣁⠠⠤⠀⢀⣀⠀⠀⢠⠃⠀⢠⠋⠀⠀⠀⠀⠀ AE Horse
⠀⠀⠀⠀⠈⠂⠀⣀⡤⠒⠉⢀⡀⠤⠒⠙⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀
⠀⣀⠀⠈⠓⠎⠩⠁⠀⡀⣴⣍⠀⠀⠀⠀⠀⠀⣰⠀⠀⠀⠀⠀⠀⠀
⠀⠉⠙⠕⢦⡀⠀⠀⠀⠸⡁⠍⠀⠀⠀⠀⡀⠘⡉⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠀⠈⠁⣒⣈⡠⠋⡆⠀⢰⠀⠀⠃⠀⡇⠀⠀⠀⠀⠀⠀⠀
⠀⡰⠊⠉⠉⠉⠉⣉⠄⠀⢀⠑⡀⠈⠀⠀⠀⡐⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠁⣠⠄⠒⠈⠁⠀⠀⡐⢸⠀⢡⡀⠀⠀⡄⠀⡄⠀⠀⠀⠀⠀⠀⠀
⠀⢰⢃⠠⠤⠤⠀⡠⠊⠀⡄⠀⠸⡷⠀⠰⢧⠀⡇⠀⣀⠀⠀⠀⠀⠀
⠀⢸⠃⠀⠀⡤⠚⠁⢀⠂⠃⠀⠘⠤⢄⡤⠌⠀⡷⡀⠀⠉⠒⢤⠀⠀
⠀⠘⠀⠀⣼⠁⠀⡔⠁⢸⠀⠀⠀⠀⠀⠀⠀⠀⡇⢡⠀⠀⠀⠀⠱⠀
⠀⠀⠀⠀⢻⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⡄⠀⠀⠀⠀⠇
⠀⠀⠀⠀⠀⠙⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⡇⠀⠀⠀⠀⠠
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠈
*/

ServerEvents.recipes(event => {

    event.remove({ type: 'ae2:inscriber' })
    event.remove({ type: 'extendedae:circuit_cutter' })

    const ingotToPlateAE2Replace = ["iron", "gold", ]
    ingotToPlateAE2Replace.forEach(element => {
        event.replaceInput(
            { mod: "ae2" },
            `minecraft:${element}_ingot`,
            `modern_industrialization:${element}_plate`
        )
    })


    milfShapeless(event, {
        inputItems: [
            [{ "item": "extendedae:ex_pattern_provider_part" }, 1],
            [{ "item": "milf:blank_card" }, 1],
        ],
        outputItems: [[{ "id": "extendedae:pattern_provider_upgrade" }]],
        removeRecipe: true
    })

    milfShapeless(event, {
        inputItems: [
            [{ "item": "extendedae:ex_interface_part" }, 1],
            [{ "item": "milf:blank_card" }, 1],
        ],
        outputItems: [[{ "id": "extendedae:interface_upgrade" }]],
        removeRecipe: true
    })

    milfShapeless(event, {
        inputItems: [
            [neoCompound([
                { item: "extendedae:ex_export_bus_part" },
                { item: "extendedae:ex_import_bus_part" }
            ]), 1],
            [{ "item": "milf:blank_card" }, 1],
        ],
        outputItems: [[{ "id": "extendedae:io_bus_upgrade" }]],
        removeRecipe: true
    })

    milfShapeless(event, {
        inputItems: [
            [{ "item": "extendedae:ex_pattern_access_part" }, 1],
            [{ "item": "milf:blank_card" }, 1],
        ],
        outputItems: [[{ "id": "extendedae:pattern_terminal_upgrade" }]],
        removeRecipe: true
    })

    milfShapeless(event, {
        inputItems: [
            [{ "item": "extendedae:ex_drive" }, 1],
            [{ "item": "milf:blank_card" }, 1],
        ],
        outputItems: [[{ "id": "extendedae:drive_upgrade" }]],
        removeRecipe: true
    })

    milfShapeless(event, {
        inputItems: [
            [{ "item": "extendedae:wireless_hub" }, 1],
            [{ "item": "milf:blank_card" }, 1],
        ],
        outputItems: [[{ "id": "extendedae:wireless_connector_upgrade" }]],
        removeRecipe: true
    })

    milfShaped(event, {
        pattern: [
            " BC",
            " RB",
            "R  "
        ],
        key: {
            B: { item: "modern_industrialization:steel_bolt" },
            R: { item: "modern_industrialization:iron_rod" },
            C: { item: "ae2:charged_certus_quartz_crystal" },
        },
        outputItems: [[{ id: "ae2:charged_staff" }, 1]],
        removeRecipe: true
    })


})

KubeJSTweaks.beforeRecipes(event => {

    const disableByRecipeID = [

        "ae2:smelting/silicon_from_certus_quartz_dust",
        "ae2:blasting/silicon_from_certus_quartz_dust",
        "ae2:decorative/quartz_glass",
        "ae2:decorative/quartz_vibrant_glass",

        "extendedae:blasting/quartz_blend",
        "extendedae:smelting/quartz_blend",

        "extendedae:quartz_blend_alt",
        "extendedae:quartz_blend",

        "advanced_ae:smallappupgrade",


        "spectrum:mod_integration/ae2/cinderhearth/silicon",
        "spectrum:mod_integration/ae2/cinderhearth/silicon_from_rock_crystal"
    ]

    disableByRecipeID.forEach(id => {
        event.disable(id)
    })

})