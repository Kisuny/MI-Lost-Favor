//priority: 100
ServerEvents.tags('item', event => {
    const allItems = Ingredient.of(`*`)

    const keyWords = ["log", "plank", "fence_gate"].join("|")

    const pattern = $patternJavaClass.compile(`^(?<modID>[^:]+):.*_(?<tagName>(${keyWords})s?)$`)
    allItems.stacks.toList().forEach((itemStack) => {
        let matcher = pattern.matcher(itemStack.id)
        if (matcher.matches()){
            //console.log(matcher.group())
            let matchingPart = matcher.group("tagName")
            let lastChar = matchingPart.substring(matchingPart.length() - 1)
            let isLastS = (lastChar == "s")
            if(isLastS){
                event.add(`minecraft:${matcher.group("tagName")}`, matcher.group())
            } else {
                event.add(`minecraft:${matcher.group("tagName")}s`, matcher.group())
            }
            if(matcher.group("modID") != "minecraft"){
                if(isLastS){
                    event.add(`milf:non_vanilla_${matcher.group("tagName")}`, matcher.group())
                } else {
                    event.add(`milf:non_vanilla_${matcher.group("tagName")}s`, matcher.group())
                }
            }
        }
        
    })

    //event.get("mowziesmobs:wrought_axe").remove("minecraft:axes")
    //event.get("minecraft:axes").remove("mowziesmobs:wrought_axe")

    event.add("arts_and_crafts:cork_logs", [
        "arts_and_crafts:cork_log", 
        "arts_and_crafts:cork_wood",
        "arts_and_crafts:stripped_cork_log",
        "arts_and_crafts:stripped_cork_wood"])

    const AXES = ["mowziesmobs:wrought_axe", "immersiveengineering:axe_steel"]
    event.remove("minecraft:axes", AXES)
    event.add("c:tools", AXES)
    event.add("c:tools/melee_weapon", AXES)
    event.add("c:tools/melee_weapons", AXES)

})