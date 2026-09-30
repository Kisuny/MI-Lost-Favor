ServerEvents.recipes(event => {

    function bench_cutting(input,output,tool,cuts,tryDamage){
        tryDamage = tryDamage || false
        cuts = cuts || 5
        input[0].count = input[1] || 1
        output[0].count = output[1] || 1

        let recipe = {
            "type": "paganbless:bench_cutting",
            "cuts": cuts,
              "ingredient": input[0],
            "result": output[0],
            "tool": tool,
            "try_damage": tryDamage

        }
        event.custom(recipe)
    }

bench_cutting( 
    [{ "tag": "minecraft:planks" }, 1],
    [{ "id": 'minecraft:stick' }, 3],
    {"tag": "minecraft:axes"}, 7, true
)


})