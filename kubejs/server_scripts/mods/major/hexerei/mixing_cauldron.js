
/**
 * args:
 *  - fluid (string)        : fluid id, default "minecraft:water"
 *  - fluidAmount (number)  : fluid amount, default 1
 *  - ingredients (array)   : ingredients array (**REQUIRED** 8 items if there is less, the recipe will not work!)
 *  - output (string)       : result item id (required)
 *  - amount (number)       : result count, default 1
 *  - grindingTime (string) : mapped to `moonRequirement` — one of the moon phases or "none"
 *  - heat (string)         : `heatRequirement` — "heated", "superheated" or "none"
 *  - removeRecipe (bool)   : if true, also calls `event.remove({ output: args.output })`
 *
 * Notes:
 *  - If `removeRecipe` is true, the recipe matching `output` will be removed.
 *  - Valid moon phases for `moonRequirement`:
 *      "new_moon", "waxing_crescent", "first_quarter", "waxing_gibbous",
 *      "full_moon", "waning_gibbous", "last_quarter", "waning_crescent"
 */
const customMixingCauldron = (event, args) => {
    event.custom({
        "type": "hexerei:mixingcauldron",
        "fluid": {
            "id": args.fluid || "minecraft:water",
            "amount": args.fluidAmount || 1
        },
        "ingredients": args.ingredients,
        "output": {
            "id": args.output,
            "count": args.amount || 1
        },
        "moonRequirement": args.grindingTime || "none",
        "heatRequirement": args.heat || "none"
    });
    if (args.removeRecipe === true) {
        event.remove({ output: args.output });
    }
};

ServerEvents.recipes(event => {


    customMixingCauldron(event, {
        fluid: "minecraft:lava",
        fluidAmount: 1000,
        ingredients: [
            { "tag": "hexerei:flower_biproduct" },
            { "tag": "hexerei:flower_biproduct" },
            { "tag": "c:cobblestones/deepslate" },
            { "tag": "c:cobblestones/deepslate" },
            { "tag": "c:cobblestones/deepslate" },
            { "tag": "c:cobblestones/deepslate" },
            { "tag": "c:cobblestones/deepslate" },
            { "tag": "hexerei:flower_biproduct" },
        ],
        output: "paganbless:rune_slab_inert",
        removeRecipe: true
    })

    customMixingCauldron(event, {
        fluid: "minecraft:water",
        fluidAmount: 500,
        ingredients: [
            { "item": "minecraft:glass_bottle" },
            { "tag": "hexerei:flower_biproduct" },
            { "item": "paganbless:essence_of_the_forest" },
            { "item": "paganbless:cinnabar" },
            { "item": "minecraft:amethyst_shard" },
            { "item": "paganbless:cinnabar" },
            { "item": "paganbless:essence_of_the_forest" },
            { "tag": "hexerei:flower_biproduct" }
        ],
        output: "paganbless:runic_charge",
        removeRecipe: true
    })

    customMixingCauldron(event, {
        ingredients: [
            { "item": "paganbless:winter_berries" },
            { "item": "paganbless:winter_berries" },
            { "item": "minecraft:sugar" },
            { "item": "minecraft:sugar" },
            { "item": "minecraft:sugar" },
            { "item": "minecraft:sugar" },
            { "item": "minecraft:sugar" },
            { "item": "paganbless:winter_berries" },
        ],
        output: "paganbless:glazed_berries",
        amount: 2,
        removeRecipe: true
    })
    
    customMixingCauldron(event, {
        fluid: "minecraft:lava",
        fluidAmount: 500,
        ingredients: [
            { "item": "enchanted:redstone_soup" },
            { "item": "minecraft:polished_blackstone" },
            { "item": "minecraft:redstone" },
            { "item": "minecraft:polished_blackstone" },
            { "item": "minecraft:redstone" },
            { "item": "minecraft:polished_blackstone" },
            { "item": "minecraft:redstone" },
            { "item": "minecraft:polished_blackstone" },
        ],
        output: "hexerei:blood_sigil",
        removeRecipe: true
    })
    
    


})
