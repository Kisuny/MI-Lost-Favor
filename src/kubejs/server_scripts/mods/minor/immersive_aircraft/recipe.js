ServerEvents.recipes(event => {
    milfShaped(event, {
        pattern: [
            "FFF",
            "FBF",
            "FFF"
        ],
        key: {
            B: {item:"milf:blank_blueprint"},
            F: {item:"milf:steel_machine_bit"}
        },
        outputItems:[[{"components": {"immersiveengineering:blueprint": "Aircraft components"},"id": "immersiveengineering:blueprint"}, 1]]
    })

    milfShaped(event, {
        pattern: [
            " P ",
            "SBS",
            " H "
        ],
        key: {
            B: {item:"milf:blank_blueprint"},
            H: {item:"immersive_aircraft:hull"},
            S: {item:"immersive_aircraft:sail"},
            P: {item:"immersive_aircraft:propeller"}

        },
        outputItems:[[{"components": {"immersiveengineering:blueprint": "Aircraft machines"},"id": "immersiveengineering:blueprint"}, 1]]
    })

    milfShaped(event, {
        pattern: [
            "SBS"
        ],
        key: {
            B: {item:"milf:blank_blueprint"},
            S: {item:"immersive_aircraft:industrial_gears"},
        },
        outputItems:[[{"components": {"immersiveengineering:blueprint": "Aircraft upgrades"},"id": "immersiveengineering:blueprint"}, 1]]
    })

})