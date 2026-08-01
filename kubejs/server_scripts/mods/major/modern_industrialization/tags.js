
ServerEvents.tags('item', event => {
    event.removeAllTagsFrom([
        'modern_industrialization:netherite_hammer', 
        'modern_industrialization:diamond_hammer', 
    ])

    const modIngredient = Ingredient.of(`@modern_industrialization | @extended_industrialization`)
    const unTaggedParts = ["bolt", "wire", "curved_plate", "large_plate", "ring", "double_ingot", "crushed_dust"].join("|")

    const pattern = $patternJavaClass.compile(`^modern_industrialization:(?<material>.*)(?<![_:](me|fine))_(?<partName>${unTaggedParts})$`)
    modIngredient.stacks.toList().forEach((itemStack) => {
        let matcher = pattern.matcher(itemStack.id)
        if (matcher.matches()){
            //console.log(matcher.group("material") + "   " + matcher.group("partName") + "   " + matcher.group())
            event.add(`c:${matcher.group("partName")}s`, matcher.group())
            event.add(`c:${matcher.group("partName")}s/${matcher.group("material")}`, matcher.group())
        }
    })

    event.add('milf:coke_coal', [
        'modern_industrialization:coke', 
        'modern_industrialization:coke_block', 
        'modern_industrialization:coke_dust', 
    ])

    event.add('c:hammers', [
        'modern_industrialization:iron_hammer',
        'modern_industrialization:steel_hammer'
    ])

    event.add('c:storage_blocks/coal_coke', 'modern_industrialization:coke_block')
    event.add('c:coal_coke', 'modern_industrialization:coke')
    event.add('c:dusts/coal_coke', 'modern_industrialization:coke_dust')
    event.add('c:dusts/wood', 'modern_industrialization:wood_pulp')

})