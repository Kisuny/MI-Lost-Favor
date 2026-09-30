//priority: 1

const MI_HATCHES = {
    ALL: ["energy_input", "item_input", "item_output", "fluid_input", "fluid_output"],
    ITEM: ["item_input", "item_output"],
    FLUID: ["fluid_input", "fluid_output"],
    ENERGY: ["energy_input", "energy_output"],

    INPUT: {
        ALL: ["energy_input", "item_input", "fluid_input"],
        ITEM: ["item_input"],
        FLUID: ["fluid_input"],
        ENERGY: ["energy_input"],
    },

    OUTPUT: {
        ALL: ["energy_output", "item_output", "fluid_output"],
        ITEM: ["item_output"],
        FLUID: ["fluid_output"],
        ENERGY: ["energy_output"],
    }
}