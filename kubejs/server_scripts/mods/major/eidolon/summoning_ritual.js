const toIngredient = (entry) =>
    typeof entry === "string" ? { "item": entry } : entry

const brazierSummon = (event, args) => {
    event.custom({
        "type": "eidolon_repraised:ritual_brazier_summoning",
        "focus_items": args.focus != null ? toIngredient(args.focus) : [],
        "output": args.output,
        "pedestal_items": args.pedestals.map(toIngredient),
        "reagent": toIngredient(args.reagent)
    })
}
// example with tag:
// brazierSummon(event, {
//         output: "goblintraders:goblin_trader",
//         focus: "minecraft:golden_apple",
//         pedestals: ["devices:gold_coin", { "tag": "forge:gems/soul_shard" }],
//         reagent: "devices:orichalcum_coin"
//     })
ServerEvents.recipes(event => {

    brazierSummon(event, {
        output: "goblintraders:goblin_trader",
        pedestals: ["devices:gold_coin", "eidolon_repraised:soul_shard"],
        reagent: "minecraft:golden_apple"
    })
    
    brazierSummon(event, {
        output: "goblintraders:goblin_trader",
        pedestals: ["minecraft:barrier", "eidolon_repraised:soul_shard"], // "forbidden_arcanus:bat_wing"
        reagent: "milf:larva"
    })


})
