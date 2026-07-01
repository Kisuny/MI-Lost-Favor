global.MI_REPLACEABLE = {
    "modern_industrialization:cupronickel_coil": { upgradesTo: "modern_industrialization:kanthal_coil" },
    "modern_industrialization:kanthal_coil": { upgradesTo: "modern_industrialization:superconductor_coil", downgradesTo:"modern_industrialization:cupronickel_coil" },
    "modern_industrialization:superconductor_coil": { upgradesTo: "modern_industrialization:cupronickel_coil", downgradesTo: "modern_industrialization:kanthal_coil" }
}