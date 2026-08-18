/**
 * @param {Internal.RecipesEventJS} event
 * @param {{
 *   input: { item: string, count?: number },
 *   result: { id: string, count?: number },
 *   extraInputs: Array<{ item: string, count?: number }>,
 *   spirits: Array<{
 *     count: number,
 *     type: 'malum:sacred' | 'malum:wicked' | 'malum:arcane' | 'malum:eldritch' | 'malum:aerial' | 'malum:aqueous' | 'malum:earthen' | 'malum:infernal' | 'malum:umbral'
 *   }>,
 *   removeRecipe?: boolean
 * }} args
 */
const spiritInfusion = (event, args) => {
    event.custom({
        type: "malum:spirit_infusion",
        input: args.input,
        result: args.result,
        extraInputs: args.extraInputs,
        spirits: args.spirits
    })
    if (args.removeRecipe) { event.remove({ output: args.result.id, type: "malum:spirit_infusion" }) }
}

ServerEvents.recipes(event => {

    const removing_by_recipe_id = [
        "malum:copper_nugget_from_ingot",
        "malum:copper_ingot_from_nugget",
        "malum:soulstone_from_deepslate_smelting",
        "malum:soulstone_from_smelting",
        "malum:soulstone_from_raw_smelting",
        "malum:soulstone_from_crushed_smelting",
        "malum:soulstone_from_deepslate_blasting",
        "malum:soulstone_from_blasting",
        "malum:soulstone_from_raw_blasting",
        "malum:soulstone_from_crushed_blasting",
        "malum:blazing_quartz_from_smelting",
        "malum:blazing_quartz_from_blasting",
        "malum:brilliance_from_crushed_smelting",
        "malum:brilliance_from_raw_smelting",
        "malum:brilliance_from_smelting",
        "malum:brilliance_from_deepslate_smelting",
        "malum:brilliance_from_crushed_blasting",
        "malum:brilliance_from_raw_blasting",
        "malum:brilliance_from_blasting",
        "malum:brilliance_from_deepslate_blasting",
    ]

    removing_by_recipe_id.forEach(id => {
        event.remove({ id: id })
    });

    event.remove({ output: "malum:crude_scythe" })


    miMachineRecipe(event, {
        energy: 2, time: 40, machine: "modern_industrialization:blast_furnace",
        inputItems: [
            [{ item: "eidolon_repraised:soul_shard" }, 1],
            [{ tag: "c:stones" }, 1],
        ],
        outputItems: [[{ item: "malum:refined_soulstone" }, 1]]
    })

    customWorktable(event, {
        pattern: [
            " e ",
            "wqw",
            "qqq"
        ],
        reagents: ["rrrr"],
        key: {
            "q": { "item": "malum:runewood_planks" },
            "w": { "item": "embers:dawnstone_ingot" },
            "e": { "item": "malum:refined_soulstone" },
            "r": { "item": "malum:arcane_spirit" },
        },
        result: "malum:spirit_altar",
        removeRecipe: true
    })

    spiritInfusion(event, {
        input: { item: "milf:fire_clay_ball", count: 4 },
        result: { id: "malum:alchemical_calx", count: 4 },
        extraInputs: [],
        spirits: [
            { type: "malum:arcane", count: 2 },
            { type: "malum:earthen", count: 2 },
            { type: "malum:aqueous", count: 2 }
        ],
        removeRecipe: true
    })

    spiritInfusion(event, {
        input: { item: "embers:dawnstone_ingot", count: 1 },
        result: { id: "malum:hallowed_gold_ingot", count: 1 },
        extraInputs: [
            { tag: "c:gems/quartz", count: 4 }
        ],
        spirits: [
            { type: "malum:sacred", count: 2 },
            { type: "malum:arcane", count: 1 }
        ],
        removeRecipe: true
    })

    spiritInfusion(event, {
        input: { item: "modern_industrialization:sulfur_dust", count: 1 },
        result: { id: "malum:hex_ash", count: 1 },
        extraInputs: [],
        spirits: [
            { type: "malum:arcane", count: 1 }
        ],
        removeRecipe: true
    })

    spiritInfusion(event, {
        input: { item: "neovitae:tainted_flesh", count: 2 },
        result: { id: "malum:living_flesh", count: 2 },
        extraInputs: [],
        spirits: [
            { type: "malum:sacred", count: 2 },
            { type: "malum:wicked", count: 2 }
        ],
        removeRecipe: true
    })

    spiritInfusion(event, {
        input: { item: "modern_industrialization:aluminum_double_ingot", count: 1 },
        result: { id: "malum:malignant_pewter_ingot", count: 1 },
        extraInputs: [
            { item: "malum:malignant_lead", count: 1 },
            { item: "malum:null_slate", count: 8 },
            { item: "minecraft:netherite_scrap", count: 2 }
        ],
        spirits: [
            { type: "malum:earthen", count: 16 },
            { type: "malum:eldritch", count: 16 }
        ],
        removeRecipe: true
    })

    spiritInfusion(event, {
        input: { item: "modern_industrialization:steel_ingot", count: 1 },
        result: { id: "malum:soul_stained_steel_ingot", count: 1 },
        extraInputs: [
            { item: "malum:refined_soulstone", count: 4 }
        ],
        spirits: [
            { type: "malum:wicked", count: 3 },
            { type: "malum:earthen", count: 1 },
            { type: "malum:arcane", count: 1 }
        ],
        removeRecipe: true
    })

    spiritInfusion(event, {
        input: { item: "hexerei:infused_fabric", count: 2 },
        result: { id: "malum:soulwoven_silk", count: 4 },
        extraInputs: [
            { tag: "c:strings", count: 2 }
        ],
        spirits: [
            { type: "malum:aerial", count: 3 },
            { type: "malum:earthen", count: 3 }
        ],
        removeRecipe: true
    })

    spiritInfusion(event, {
        input: { item: "ars_nouveau:sourcestone", count: 16 },
        result: { id: "malum:tainted_rock", count: 16 },
        extraInputs: [],
        spirits: [
            { type: "malum:sacred", count: 1 },
            { type: "malum:arcane", count: 1 }
        ],
        removeRecipe: true
    })

    spiritInfusion(event, {
        input: { item: "ars_nouveau:sourcestone", count: 16 },
        result: { id: "malum:twisted_rock", count: 16 },
        extraInputs: [],
        spirits: [
            { type: "malum:wicked", count: 1 },
            { type: "malum:arcane", count: 1 }
        ],
        removeRecipe: true
    })

    miMachineRecipe(event, {
        energy: 4, time: 40, machine: "modern_industrialization:macerator",
        inputItems: [[{ item: "malum:large_strange_crystal" }]],
        outputItems: [[{ item: "malum:strange_crystal" }, 2]]
    })

    miMachineRecipe(event, {
        energy: 4, time: 160, machine: "modern_industrialization:blast_furnace",
        inputItems: [
            [{ item: "malum:raw_brilliance" }, 1],
        ],
        outputItems: [[{ item: "malum:refined_brilliance" }, 1]]
    })

    

})
